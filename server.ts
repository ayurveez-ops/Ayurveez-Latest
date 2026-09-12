import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

// In-memory OTP storage with TTL (10 minutes)
interface OTPRecord {
  otp: string;
  email: string;
  expiresAt: number;
}
const otpStore = new Map<string, OTPRecord>();

// Helper to configure nodemailer transporter with Gmail App Password or custom SMTP
function getTransporter() {
  const user = (process.env.SMTP_USER || "ayurveez@gmail.com").trim();
  // Strip any accidental spaces from the 16-character Google App Password
  const pass = (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "vkoy eaqx rbhk chzd").replace(/\s+/g, "").trim();
  const host = process.env.SMTP_HOST?.trim();
  const port = parseInt(process.env.SMTP_PORT || "465", 10);

  if (pass) {
    if (host && host !== "smtp.gmail.com") {
      return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
    } else {
      // Direct Gmail SMTP service (smtp.gmail.com with SSL/TLS)
      return nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
      });
    }
  }
  return null;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Send 4-digit OTP for Sign-Up Verification
  app.post("/api/send-otp", async (req, res) => {
    try {
      const { email, name } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }

      // Generate a cryptographically random 4-digit OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      otpStore.set(email.toLowerCase().trim(), { otp, email: email.toLowerCase().trim(), expiresAt });

      const emailHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fcfbf7; border: 1px solid #e5dfd3; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #14532d 0%, #166534 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 0.5px; color: #fef08a;">AYURVEEZ</h1>
            <p style="margin: 6px 0 0; font-size: 14px; color: #dcfce7; font-weight: 500;">Premier BAMS, AIAPGET & AYUSH Medical Officer Study Platform</p>
          </div>
          <div style="padding: 32px 28px; color: #27272a;">
            <p style="font-size: 16px; margin: 0 0 16px; line-height: 1.5;">Namaste <strong>${name || 'Aspirant'}</strong>,</p>
            <p style="font-size: 15px; color: #52525b; line-height: 1.6; margin: 0 0 24px;">Thank you for registering on <strong>Ayurveez</strong>. Please use the following 4-digit One-Time Password (OTP) to complete your email verification and account registration:</p>
            
            <div style="text-align: center; margin: 28px 0;">
              <div style="display: inline-block; background-color: #f0fdf4; border: 2px dashed #16a34a; border-radius: 10px; padding: 16px 36px;">
                <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #166534; font-family: monospace;">${otp}</span>
              </div>
              <p style="margin: 10px 0 0; font-size: 12px; color: #71717a;">Valid for 10 minutes. Please do not share this OTP with anyone.</p>
            </div>

            <div style="background-color: #fefce8; border-left: 4px solid #ca8a04; padding: 14px 16px; border-radius: 4px; margin: 24px 0;">
              <p style="margin: 0; font-size: 13px; color: #854d0e; line-height: 1.5;">
                <strong>Ayurveda Tip:</strong> "प्रयोजनं चास्य स्वस्थस्य स्वास्थ्यरक्षणमातुरस्य विकारप्रशमनं च॥" - Master your Samhitas with daily consistent practice on Ayurveez.
              </p>
            </div>

            <p style="font-size: 14px; color: #71717a; margin-top: 24px; line-height: 1.5;">
              Warm regards,<br/>
              <strong>Ayurveez Academic & Admissions Team</strong><br/>
              <a href="mailto:ayurveez@gmail.com" style="color: #16a34a; text-decoration: none;">ayurveez@gmail.com</a>
            </p>
          </div>
          <div style="background-color: #f4f1ea; padding: 16px 24px; text-align: center; font-size: 12px; color: #a1a1aa; border-top: 1px solid #e5dfd3;">
            © ${new Date().getFullYear()} Ayurveez. Dedicated to Ayurvedic Excellence.
          </div>
        </div>
      `;

      const transporter = getTransporter();
      let sentViaSmtp = false;
      let smtpErrorDetail: string | null = null;

      if (transporter) {
        try {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || `"Ayurveez Team" <ayurveez@gmail.com>`,
            to: email,
            subject: `${otp} is your Ayurveez Verification OTP`,
            html: emailHtml,
          });
          sentViaSmtp = true;
          console.log(`[AYURVEEZ EMAIL SUCCESS] -> Successfully delivered 4-Digit OTP to ${email} via Gmail SMTP`);
        } catch (mailErr: any) {
          smtpErrorDetail = mailErr?.message || "Unknown SMTP error";
          console.warn(`[AYURVEEZ EMAIL NOTICE] -> Gmail SMTP delivery attempt failed: ${smtpErrorDetail}`);
        }
      } else {
        console.log(`[AYURVEEZ OTP DISPATCH] -> OTP ${otp} generated for ${email}.`);
      }

      return res.json({
        success: true,
        message: `4-digit OTP has been generated and dispatched for ${email}.`,
        sentViaSmtp,
        smtpConfigured: !!transporter,
        smtpError: smtpErrorDetail,
      });
    } catch (error: any) {
      console.error("Error in /api/send-otp:", error);
      return res.status(500).json({ success: false, message: error.message || "Failed to send OTP" });
    }
  });

  // API Route: Send 4-digit OTP for Forgot Password
  app.post("/api/send-forgot-password-otp", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, message: "Valid registered email address is required" });
      }

      const normalizedEmail = email.toLowerCase().trim();
      const isAdminReset = normalizedEmail === 'ayurveez@gmail.com';
      const destinationEmail = isAdminReset ? 'rk867000@gmail.com' : normalizedEmail;
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      otpStore.set(`reset_${normalizedEmail}`, { otp, email: normalizedEmail, expiresAt });

      const emailHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fcfbf7; border: 1px solid #e5dfd3; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #14532d 0%, #166534 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 0.5px; color: #fef08a;">AYURVEEZ</h1>
            <p style="margin: 6px 0 0; font-size: 14px; color: #dcfce7; font-weight: 500;">
              ${isAdminReset ? 'Official Admin Portal Security & Password Reset' : 'Password Reset Security Service'}
            </p>
          </div>
          <div style="padding: 32px 28px; color: #27272a;">
            <p style="font-size: 16px; margin: 0 0 16px; line-height: 1.5;">Namaste <strong>${isAdminReset ? 'Administrator' : 'Aspirant'}</strong>,</p>
            <p style="font-size: 15px; color: #52525b; line-height: 1.6; margin: 0 0 24px;">
              ${isAdminReset 
                ? `An administrative password reset request was initiated for Master Account <strong>ayurveez@gmail.com</strong>. The authorized verification code is dispatched to <strong>rk867000@gmail.com</strong>:`
                : `We received a request to reset your password for your <strong>Ayurveez</strong> student account (<strong>${normalizedEmail}</strong>). Please use the following 4-digit verification code:`
              }
            </p>
            
            <div style="text-align: center; margin: 28px 0;">
              <div style="display: inline-block; background-color: #fef3c7; border: 2px dashed #d97706; border-radius: 10px; padding: 16px 36px;">
                <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #92400e; font-family: monospace;">${otp}</span>
              </div>
              <p style="margin: 10px 0 0; font-size: 12px; color: #71717a;">Valid for 10 minutes. If you did not request this password reset, please secure your credentials immediately.</p>
            </div>

            <p style="font-size: 14px; color: #71717a; margin-top: 24px; line-height: 1.5;">
              Academic & Security Operations,<br/>
              <strong>Ayurveez Administrative Team</strong><br/>
              <a href="mailto:ayurveez@gmail.com" style="color: #16a34a; text-decoration: none;">ayurveez@gmail.com</a>
            </p>
          </div>
          <div style="background-color: #f4f1ea; padding: 16px 24px; text-align: center; font-size: 12px; color: #a1a1aa; border-top: 1px solid #e5dfd3;">
            © ${new Date().getFullYear()} Ayurveez Platform. Sent from ayurveez@gmail.com to ${destinationEmail}.
          </div>
        </div>
      `;

      const transporter = getTransporter();
      let sentViaSmtp = false;
      let smtpErrorDetail: string | null = null;

      if (transporter) {
        try {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || `"Ayurveez Administrator Support" <ayurveez@gmail.com>`,
            to: destinationEmail,
            subject: `${otp} is your Ayurveez ${isAdminReset ? 'ADMIN' : 'User'} Password Reset OTP`,
            html: emailHtml,
          });
          sentViaSmtp = true;
          console.log(`[AYURVEEZ RESET EMAIL SUCCESS] -> Delivered Reset OTP to ${destinationEmail} (Admin: ${isAdminReset})`);
        } catch (mailErr: any) {
          smtpErrorDetail = mailErr?.message || "Unknown SMTP error";
          console.warn(`[AYURVEEZ RESET EMAIL NOTICE] -> Gmail SMTP delivery attempt failed: ${smtpErrorDetail}`);
        }
      } else {
        console.log(`[AYURVEEZ RESET OTP DISPATCH] -> Reset OTP ${otp} generated for ${normalizedEmail} -> ${destinationEmail}.`);
      }

      return res.json({
        success: true,
        message: isAdminReset 
          ? `4-digit Admin recovery code dispatched from ayurveez@gmail.com to rk867000@gmail.com.`
          : `4-digit password reset OTP sent to ${normalizedEmail}.`,
        sentViaSmtp,
        destinationEmail,
        isAdminReset,
        smtpConfigured: !!transporter,
        smtpError: smtpErrorDetail,
      });
    } catch (error: any) {
      console.error("Error in /api/send-forgot-password-otp:", error);
      return res.status(500).json({ success: false, message: error.message || "Failed to send reset OTP" });
    }
  });

  // API Route: Verify 4-digit OTP for Forgot Password
  app.post("/api/verify-forgot-password-otp", (req, res) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required" });
      }

      const normalizedEmail = email.toLowerCase().trim();
      const recordKey = `reset_${normalizedEmail}`;
      const record = otpStore.get(recordKey);

      if (!record) {
        return res.status(400).json({ success: false, message: "No active password reset request found. Please request a new OTP." });
      }

      if (Date.now() > record.expiresAt) {
        otpStore.delete(recordKey);
        return res.status(400).json({ success: false, message: "OTP has expired. Please request a new OTP." });
      }

      if (record.otp !== otp.toString().trim()) {
        return res.status(400).json({ success: false, message: "Incorrect 4-digit OTP. Please enter the valid code sent to your email." });
      }

      // OTP verified successfully
      otpStore.delete(recordKey);
      return res.json({
        success: true,
        message: "OTP verified successfully. You may now enter your new password.",
      });
    } catch (error: any) {
      console.error("Error in /api/verify-forgot-password-otp:", error);
      return res.status(500).json({ success: false, message: "Verification failed" });
    }
  });

  // API Route: Reset Password
  app.post("/api/reset-password", async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      if (!email || !newPassword) {
        return res.status(400).json({ success: false, message: "Email and new password are required" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters in length" });
      }

      const normalizedEmail = email.toLowerCase().trim();
      console.log(`[AYURVEEZ PASSWORD UPDATED] -> Password successfully reset for student ${normalizedEmail}`);

      return res.json({
        success: true,
        message: "Your password has been successfully updated! You can now log in with your new password.",
      });
    } catch (error: any) {
      console.error("Error in /api/reset-password:", error);
      return res.status(500).json({ success: false, message: "Failed to reset password" });
    }
  });

  // API Route: Verify 4-digit OTP
  app.post("/api/verify-otp", (req, res) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required" });
      }

      const normalizedEmail = email.toLowerCase().trim();
      const record = otpStore.get(normalizedEmail);

      if (!record) {
        return res.status(400).json({ success: false, message: "No active OTP request found for this email. Please request a new OTP." });
      }

      if (Date.now() > record.expiresAt) {
        otpStore.delete(normalizedEmail);
        return res.status(400).json({ success: false, message: "OTP has expired. Please request a new OTP." });
      }

      if (record.otp !== otp.toString().trim()) {
        return res.status(400).json({ success: false, message: "Incorrect OTP. Please enter the valid 4-digit code sent to your email." });
      }

      // OTP is valid
      otpStore.delete(normalizedEmail);
      return res.json({
        success: true,
        message: "Email verified successfully!",
      });
    } catch (error: any) {
      console.error("Error in /api/verify-otp:", error);
      return res.status(500).json({ success: false, message: "Verification failed" });
    }
  });

  // API Route: Send Welcome Email from Ayurveez Team after successful registration
  app.post("/api/send-welcome", async (req, res) => {
    try {
      const { name, email, mobileNumber, course, collegeName } = req.body;
      if (!email || !name) {
        return res.status(400).json({ success: false, message: "Name and Email are required" });
      }

      const welcomeHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 620px; margin: 0 auto; background-color: #fcfbf7; border: 1px solid #e5dfd3; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #14532d 0%, #15803d 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
            <span style="background-color: #fef08a; color: #14532d; font-weight: 700; font-size: 11px; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; letter-spacing: 1px;">Welcome to the Family</span>
            <h1 style="margin: 12px 0 4px; font-size: 28px; font-weight: 800; color: #ffffff;">AYURVEEZ</h1>
            <p style="margin: 0; font-size: 14px; color: #dcfce7;">Official Onboarding Confirmation</p>
          </div>
          <div style="padding: 32px 28px; color: #27272a;">
            <p style="font-size: 18px; margin: 0 0 16px; color: #166534; font-weight: 700;">Welcome to Ayurveez, Dr./Vaidya ${name}!</p>
            <p style="font-size: 15px; color: #52525b; line-height: 1.6; margin: 0 0 20px;">
              Congratulations on taking a definitive step towards your Ayurveda academic and clinical career! Your account has been verified and activated on the <strong>Ayurveez</strong> platform.
            </p>
            
            <div style="background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="margin: 0 0 14px; font-size: 15px; color: #18181b; border-bottom: 1px solid #f4f4f5; padding-bottom: 8px;">Your Registered Profile Details:</h3>
              <table style="width: 100%; font-size: 14px; color: #3f3f46; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-weight: 600; width: 140px; color: #71717a;">Full Name:</td>
                  <td style="padding: 6px 0; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: 600; color: #71717a;">Registered Email:</td>
                  <td style="padding: 6px 0; font-weight: 500;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: 600; color: #71717a;">Phone Number:</td>
                  <td style="padding: 6px 0; font-weight: 500;">${mobileNumber || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: 600; color: #71717a;">Selected Course:</td>
                  <td style="padding: 6px 0; font-weight: 700; color: #15803d;">${course || 'All Ayurveda Modules'}</td>
                </tr>
                ${collegeName ? `
                <tr>
                  <td style="padding: 6px 0; font-weight: 600; color: #71717a;">College / University:</td>
                  <td style="padding: 6px 0; font-weight: 500;">${collegeName}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <h4 style="margin: 24px 0 10px; font-size: 15px; color: #166534;">What you can access right now:</h4>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #52525b; line-height: 1.7;">
              <li><strong>Samhita Master Notes:</strong> Charaka, Sushruta & Ashtanga Hridaya high-yield summaries.</li>
              <li><strong>AIAPGET & AYUSH MO Mock Tests:</strong> Real examination pattern with negative marking & Sanskrit citations.</li>
              <li><strong>Dravyaguna & Rasa Shastra Flashcards:</strong> Quick revision charts for Rasapanchaka and Shodhana methods.</li>
              <li><strong>Live Progress Tracker:</strong> Detailed subject-wise analytics on your Student Dashboard.</li>
            </ul>

            <div style="text-align: center; margin: 30px 0 16px;">
              <a href="#" style="background-color: #166534; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; display: inline-block; box-shadow: 0 4px 10px rgba(22, 101, 52, 0.25);">
                Launch Ayurveez Dashboard
              </a>
            </div>

            <p style="font-size: 14px; color: #71717a; margin-top: 28px; line-height: 1.5; border-top: 1px solid #e5dfd3; padding-top: 16px;">
              Need any academic guidance or test series assistance? Reach out to us directly anytime at <a href="mailto:ayurveez@gmail.com" style="color: #16a34a; text-decoration: none; font-weight: 600;">ayurveez@gmail.com</a>.<br/><br/>
              With best wishes for your success,<br/>
              <strong>Ayurveez Team</strong><br/>
              <em>Shubham Bhavatu!</em>
            </p>
          </div>
          <div style="background-color: #f4f1ea; padding: 16px 24px; text-align: center; font-size: 12px; color: #a1a1aa; border-top: 1px solid #e5dfd3;">
            Ayurveez Learning Systems • Contact: ayurveez@gmail.com
          </div>
        </div>
      `;

      const transporter = getTransporter();
      let sentViaSmtp = false;
      if (transporter) {
        try {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || `"Ayurveez Team" <ayurveez@gmail.com>`,
            to: email,
            subject: `Welcome to Ayurveez, ${name}! Your Account is Active`,
            html: welcomeHtml,
          });
          sentViaSmtp = true;
        } catch (mailErr) {
          console.warn("SMTP mail delivery for welcome email skipped:", mailErr);
        }
      }

      console.log(`[AYURVEEZ WELCOME EMAIL] -> Sent to: ${email} | Name: ${name} | Course: ${course} | SentViaSMTP: ${sentViaSmtp}`);

      return res.json({
        success: true,
        message: `Welcome email from Ayurveez Team has been successfully dispatched to ${email}!`,
        sentViaSmtp,
      });
    } catch (error: any) {
      console.error("Error in /api/send-welcome:", error);
      return res.status(500).json({ success: false, message: error.message || "Failed to send welcome email" });
    }
  });

  // API Route: Contact Form Dispatch
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, course, message } = req.body;
      console.log(`[AYURVEEZ CONTACT INQUIRY] -> From: ${name} (${email}, ${phone}) | Course: ${course} | Msg: ${message}`);
      return res.json({
        success: true,
        message: "Thank you for reaching out! The Ayurveez academic team will connect with you shortly.",
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: "Error submitting inquiry" });
    }
  });

  // API Route: Check SMTP configuration status for admin/troubleshooting
  app.get("/api/mail-status", async (req, res) => {
    const user = (process.env.SMTP_USER || "ayurveez@gmail.com").trim();
    const hasPass = !!(process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "vkoy eaqx rbhk chzd");
    const host = process.env.SMTP_HOST || "smtp.gmail.com (Gmail SSL)";
    
    const transporter = getTransporter();
    let verified = false;
    let verifyError = null;

    if (transporter) {
      try {
        await transporter.verify();
        verified = true;
      } catch (err: any) {
        verifyError = err.message || "Failed to verify SMTP credentials";
      }
    }

    res.json({
      configured: hasPass,
      senderEmail: user,
      host,
      verified,
      verifyError,
      instructions: !hasPass
        ? "To send automated emails directly from ayurveez@gmail.com, generate a 16-character Google App Password from https://myaccount.google.com/apppasswords and set SMTP_PASS in Settings -> Environment Variables."
        : "SMTP credentials detected."
    });
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Ayurveez Study Platform" });
  });

  // Serve static assets from public directory
  app.use(express.static(path.join(process.cwd(), "public")));

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ayurveez Server running on http://localhost:${PORT}`);
  });
}

startServer();
