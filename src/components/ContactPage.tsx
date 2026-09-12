import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  HelpCircle,
  RefreshCw,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { saveInquiry } from '../firebase';
import { CourseType } from '../types';
import { FAQSection } from './FAQSection';

interface ContactPageProps {
  onOpenSignUp?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState<CourseType>('AIAPGET');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedMessage) {
      return setError('Please fill in all the required fields.');
    }

    setLoading(true);

    try {
      // 1. Save inquiry to Firebase Firestore
      await saveInquiry({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        course,
        message: trimmedMessage,
        createdAt: new Date().toISOString(),
      });

      // 2. Notify backend
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            phone: trimmedPhone,
            course,
            message: trimmedMessage,
          }),
        });
      } catch (_) {}

      // 3. Construct WhatsApp Message with all filled data
      const whatsappText = `*New Academic Inquiry - Ayurveez*
👤 *Name:* ${trimmedName}
📧 *Email:* ${trimmedEmail}
📱 *Phone:* ${trimmedPhone}
📚 *Course:* ${course}
💬 *Query / Message:* ${trimmedMessage}`;

      const whatsappUrl = `https://wa.me/918271890090?text=${encodeURIComponent(whatsappText)}`;

      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');

      // Redirect with all filled data to WhatsApp 8271890090
      setTimeout(() => {
        window.open(whatsappUrl, '_blank') || (window.location.href = whatsappUrl);
      }, 400);

    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry. Please try again or message directly on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-[#fbfaf6] text-stone-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaf2eb] border border-[#c4dec8] text-[#1b4332] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Ayurveez Academic Helpdesk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Connect with Ayurveez Team
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Have questions about BAMS university syllabus, AIAPGET test series enrollment, or AYUSH Medical Officer preparation? Our academic advisors are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Official Contact Details */}
          <div className="space-y-6">
            
            <div className="bg-white border border-[#e5dfd3] rounded-3xl p-6 space-y-6 shadow-md">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Ayurveez Contact Hub</span>
              </h3>

              {/* WhatsApp Direct */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">WhatsApp & Helpline</h4>
                  <a 
                    href="https://wa.me/918271890090?text=Namaste%20Ayurveez%20Team%2C%20I%20need%20guidance%20regarding%20Ayurveda%20courses" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-sm font-bold text-emerald-800 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>+91 82718 90090</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] text-stone-500">Direct Academic Mentorship</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#eaf2eb] text-[#1b4332] border border-[#c4dec8] rounded-2xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Official Email</h4>
                  <a href="mailto:ayurveez@gmail.com" className="text-sm font-bold text-[#1b4332] hover:underline block mt-0.5">
                    ayurveez@gmail.com
                  </a>
                  <span className="text-[11px] text-stone-500">24x7 Academic & Admissions Support</span>
                </div>
              </div>

              {/* Operational Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-2xl shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Counseling Hours</h4>
                  <p className="text-sm font-semibold text-stone-800 mt-0.5">
                    Monday – Saturday: 9:00 AM – 8:00 PM IST
                  </p>
                  <span className="text-[11px] text-stone-500">Sunday: Mock Test Analysis Sessions</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#fbfaf6] text-stone-700 border border-stone-200 rounded-2xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Academic Headquarters</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Ayurveez Learning Systems, Institutional Area, Ayurveda Knowledge Corridor, New Delhi - 110029, India
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right 2 Columns: Interactive Inquiry Form */}
          <div className="lg:col-span-2 bg-white border border-[#e5dfd3] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md space-y-6">
            <div>
              <h3 className="text-2xl font-black text-stone-900">Send Academic Inquiry</h3>
              <p className="text-xs text-stone-500 mt-1">
                Fill the details below. Submitting will automatically redirect your details to our WhatsApp helpline (8271890090) for instant response from faculty.
              </p>
            </div>

            {submitted && (
              <div className="p-4 bg-[#eaf2eb] border border-[#c4dec8] rounded-2xl flex items-start gap-3 text-[#1b4332] text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#2d6a4f] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-stone-900 block">Inquiry Sent! Redirecting to WhatsApp...</strong>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Your details have been saved and dispatched to WhatsApp helpline (+91 82718 90090). If WhatsApp did not open automatically,{' '}
                    <a
                      href="https://wa.me/918271890090"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold underline text-emerald-800"
                    >
                      click here to message now
                    </a>.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name <span className="text-amber-700">*</span>
                  </label>
                  <input
                    id="contact-name-input"
                    type="text"
                    required
                    placeholder="e.g. Dr. Pooja Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#2d6a4f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address <span className="text-amber-700">*</span>
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    required
                    placeholder="e.g. pooja.verma@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#2d6a4f]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile / WhatsApp Number <span className="text-amber-700">*</span>
                  </label>
                  <input
                    id="contact-phone-input"
                    type="tel"
                    required
                    placeholder="10-digit Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#2d6a4f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Course of Interest <span className="text-amber-700">*</span>
                  </label>
                  <select
                    id="contact-course-select"
                    value={course}
                    onChange={(e) => setCourse(e.target.value as CourseType)}
                    className="w-full px-3.5 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2d6a4f] cursor-pointer"
                  >
                    <option value="BAMS">BAMS (1st to Final Prof University)</option>
                    <option value="AIAPGET">AIAPGET (MD/MS Ayurveda PG Entrance)</option>
                    <option value="AYUSH MEDICAL OFFICER">AYUSH MEDICAL OFFICER (State PSC / UPSC AMO)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Message or Query <span className="text-amber-700">*</span>
                </label>
                <textarea
                  id="contact-message-input"
                  required
                  rows={4}
                  placeholder="How can we guide you? (e.g. Syllabus doubt, test series schedule, Samhita study strategy...)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#fbfaf6] border border-stone-300 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#2d6a4f]"
                ></textarea>
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:shadow-lg"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>Submit & Connect on WhatsApp (8271890090)</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Embedded Comprehensive FAQ Section on Contact Us page */}
        <div className="pt-8 border-t border-[#dfd6c5]">
          <FAQSection />
        </div>

      </div>
    </div>
  );
};
