import React, { useState, useRef, useMemo } from 'react';
import { 
  Play, 
  Sparkles, 
  ExternalLink, 
  BookOpen, 
  FileSpreadsheet, 
  Flame, 
  Eye, 
  Clock, 
  X,
  PlusCircle,
  Video,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Newspaper,
  BookMarked
} from 'lucide-react';
import { YouTubeMedia } from '../types';
import { getYouTubeVideos, extractYouTubeId } from '../data/adminStore';

interface SpotlightVideoSectionProps {
  onOpenAdmin?: () => void;
  isAdmin?: boolean;
}

const CATEGORY_FILTERS = [
  { id: 'All', label: 'All Topics', icon: Flame },
  { id: 'BAMS', label: 'BAMS', icon: GraduationCap },
  { id: 'AIAPGET', label: 'AIAPGET', icon: BookMarked },
  { id: 'Medical Officer', label: 'Medical Officer', icon: Briefcase },
  { id: 'Admission', label: 'Admission', icon: BookOpen },
  { id: 'Motivation', label: 'Motivation', icon: Sparkles },
  { id: 'Career', label: 'Career', icon: TrendingUp },
  { id: 'News', label: 'News', icon: Newspaper },
];

export const SpotlightVideoSection: React.FC<SpotlightVideoSectionProps> = ({
  onOpenAdmin,
  isAdmin = false
}) => {
  const [videos] = useState<YouTubeMedia[]>(() => getYouTubeVideos());
  const [activeVideoModal, setActiveVideoModal] = useState<YouTubeMedia | null>(null);
  
  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchInput, setSearchInput] = useState<string>('');
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>('');

  const rowScrollRef = useRef<HTMLDivElement>(null);

  // Execute Search
  const handleExecuteSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setActiveSearchTerm(searchInput.trim().toLowerCase());
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setActiveSearchTerm('');
  };

  // Filtered Video List
  const filteredVideos = useMemo(() => {
    return videos.filter((vid) => {
      // Category check
      const matchesCategory = () => {
        if (selectedCategory === 'All') return true;
        const cat = vid.category?.toLowerCase() || '';
        const title = vid.title?.toLowerCase() || '';
        const desc = vid.description?.toLowerCase() || '';
        
        switch (selectedCategory) {
          case 'BAMS':
            return cat.includes('bams') || cat.includes('dravyaguna') || cat.includes('rachana') || title.includes('bams');
          case 'AIAPGET':
            return cat.includes('aiapget') || cat.includes('samhita') || title.includes('aiapget');
          case 'Medical Officer':
            return cat.includes('medical officer') || cat.includes('mo') || cat.includes('clinical') || title.includes('officer') || title.includes('clinical');
          case 'Admission':
            return cat.includes('admission') || cat.includes('counseling') || title.includes('admission') || title.includes('counseling') || title.includes('aaccc');
          case 'Motivation':
            return cat.includes('motivation') || title.includes('journey') || title.includes('ranker') || title.includes('motivation');
          case 'Career':
            return cat.includes('career') || title.includes('career') || title.includes('after bams') || title.includes('salary');
          case 'News':
            return cat.includes('news') || cat.includes('ncism') || title.includes('news') || title.includes('update') || title.includes('curriculum');
          default:
            return cat.toLowerCase().includes(selectedCategory.toLowerCase()) || title.toLowerCase().includes(selectedCategory.toLowerCase());
        }
      };

      if (!matchesCategory()) return false;

      // Text search check
      if (activeSearchTerm) {
        const titleMatch = vid.title?.toLowerCase().includes(activeSearchTerm);
        const descMatch = vid.description?.toLowerCase().includes(activeSearchTerm);
        const catMatch = vid.category?.toLowerCase().includes(activeSearchTerm);
        return titleMatch || descMatch || catMatch;
      }

      return true;
    });
  }, [videos, selectedCategory, activeSearchTerm]);

  // Scroll Row Controls (No Auto-slide, manual scroll)
  const scrollLeft = () => {
    if (rowScrollRef.current) {
      rowScrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (rowScrollRef.current) {
      rowScrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section id="academic-spotlights-section" className="py-10 sm:py-14 bg-gradient-to-b from-[#fbfaf6] via-[#f7f3ea] to-[#fbfaf6] border-y border-[#e6dfd1] relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#1b4332_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2 shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Ayurveda Academic Spotlights</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 tracking-tight">
              Ayurveez Academic Spotlight &amp; Video Hub
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
              Curated masterclasses, 60s memory tricks, counseling updates, and clinical lectures across BAMS, AIAPGET, and AYUSH Medical Officer.
            </p>
          </div>

          {/* Top Actions: Search + Admin */}
          <div className="flex items-center gap-2.5 shrink-0">
            {isAdmin && onOpenAdmin && (
              <button
                id="btn-spotlight-admin-add"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b4332] text-amber-300 hover:bg-[#2d6a4f] text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Upload Media</span>
              </button>
            )}
            <a
              id="btn-visit-youtube-channel"
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#d8d0c2] text-stone-800 hover:text-red-600 hover:border-red-300 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <Video className="w-3.5 h-3.5 text-red-600" />
              <span>YouTube Channel</span>
            </a>
          </div>
        </div>

        {/* Search Bar & Filter Bar Controls */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#e2dacf] shadow-2xs mb-6 space-y-3">
          
          {/* Search Input Row */}
          <form onSubmit={handleExecuteSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="spotlight-search-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search lectures, topics, mnemonics, BAMS papers, counseling..."
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#fbfaf6] border border-[#dcd4c5] text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] transition-all"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <button
              id="spotlight-search-btn"
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-amber-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </form>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-1 text-[11px] font-bold text-stone-500 pr-1 shrink-0">
              <Filter className="w-3 h-3 text-[#2d6a4f]" />
              <span>Filter:</span>
            </div>

            {CATEGORY_FILTERS.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`filter-pill-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1b4332] text-amber-300 shadow-xs scale-102'
                      : 'bg-[#f4f0e6] text-stone-700 hover:bg-[#ede6d5] hover:text-stone-900 border border-[#dfd7c8]'
                  }`}
                >
                  <Icon className={`w-3 h-3 ${isSelected ? 'text-amber-300' : 'text-[#2d6a4f]'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Header with Arrow Controls for Desktop */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="text-xs font-bold text-stone-600">
            Showing <span className="text-[#1b4332] font-black">{filteredVideos.length}</span> Spotlight {filteredVideos.length === 1 ? 'Video' : 'Videos'}
            {selectedCategory !== 'All' && <span className="text-stone-500 font-normal"> in {selectedCategory}</span>}
            {activeSearchTerm && <span className="text-stone-500 font-normal"> matching "{activeSearchTerm}"</span>}
          </div>

          {/* Row Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              id="spotlight-scroll-left-btn"
              onClick={scrollLeft}
              className="p-1.5 rounded-lg bg-white border border-[#d8d0c2] text-stone-700 hover:bg-[#eaf2eb] hover:text-[#1b4332] hover:border-[#2d6a4f] transition-all shadow-2xs cursor-pointer"
              title="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="spotlight-scroll-right-btn"
              onClick={scrollRight}
              className="p-1.5 rounded-lg bg-white border border-[#d8d0c2] text-stone-700 hover:bg-[#eaf2eb] hover:text-[#1b4332] hover:border-[#2d6a4f] transition-all shadow-2xs cursor-pointer"
              title="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EXACTLY ONE ROW: NOT AUTO SLIDING (MANUAL HORIZONTAL SCROLL)              */}
        {/* ========================================================================= */}
        {filteredVideos.length > 0 ? (
          <div 
            ref={rowScrollRef}
            id="spotlight-single-row-container"
            className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-stone-300"
          >
            {filteredVideos.map((video) => {
              const ytId = video.youtubeId || extractYouTubeId(video.videoUrl);
              const isReel = video.type === 'reel' || video.type === 'shorts';

              return (
                <div
                  key={video.id}
                  id={`spotlight-card-${video.id}`}
                  className="w-[270px] xs:w-[300px] sm:w-[320px] md:w-[340px] shrink-0 bg-white rounded-2xl border border-[#e3dcd0] hover:border-[#2d6a4f] shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col snap-start text-left group"
                >
                  {/* Thumbnail Container */}
                  <div 
                    className="relative aspect-video bg-stone-900 cursor-pointer overflow-hidden group/thumb"
                    onClick={() => setActiveVideoModal(video)}
                  >
                    <img
                      src={video.thumbnailUrl || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                      alt={video.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 group-hover/thumb:bg-red-600 transition-transform">
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <span className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${
                        isReel 
                          ? 'bg-purple-600 text-white shadow-xs' 
                          : 'bg-emerald-800 text-amber-200 shadow-xs'
                      }`}>
                        {isReel ? '60s Reel' : 'Lecture'}
                      </span>

                      {video.duration && (
                        <span className="px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] sm:text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs">
                          <Clock className="w-2.5 h-2.5 text-amber-400" />
                          <span>{video.duration}</span>
                        </span>
                      )}
                    </div>

                    {/* Category & Views */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px] pointer-events-none">
                      <span className="font-semibold px-2 py-0.5 bg-black/60 rounded backdrop-blur-xs text-stone-200 truncate max-w-[150px]">
                        {video.category}
                      </span>
                      {video.viewsCount && (
                        <span className="flex items-center gap-1 text-stone-300 font-medium text-[9px]">
                          <Eye className="w-2.5 h-2.5 text-amber-300" />
                          <span>{video.viewsCount}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 
                        onClick={() => setActiveVideoModal(video)}
                        className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#1b4332] line-clamp-2 leading-snug cursor-pointer transition-colors"
                      >
                        {video.title}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>

                    {/* Actions Row */}
                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-1.5">
                      <button
                        id={`btn-watch-${video.id}`}
                        onClick={() => setActiveVideoModal(video)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1b4332] hover:text-[#2d6a4f] cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Watch Now</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        {video.driveLinkUrl && (
                          <a
                            href={video.driveLinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-[10px] font-bold inline-flex items-center gap-1"
                            title="Open attached Google Drive Study Notes"
                          >
                            <BookOpen className="w-2.5 h-2.5" />
                            <span>PDF</span>
                          </a>
                        )}

                        {video.formLinkUrl && (
                          <a
                            href={video.formLinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 text-[10px] font-bold inline-flex items-center gap-1"
                            title="Open attached Google Form"
                          >
                            <FileSpreadsheet className="w-2.5 h-2.5" />
                            <span>Form</span>
                          </a>
                        )}

                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Watch on YouTube"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#e2dacf] p-8 text-center max-w-md mx-auto my-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">No spotlight videos found</h3>
            <p className="text-xs text-stone-500 mt-1">
              No results found for your search or filter. Try clearing filters or searching for different keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                handleClearSearch();
              }}
              className="mt-3.5 px-4 py-2 rounded-xl bg-[#1b4332] text-white text-xs font-bold hover:bg-[#2d6a4f] cursor-pointer"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        )}

      </div>

      {/* Embedded YouTube Play Modal */}
      {activeVideoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveVideoModal(null)}
        >
          <div 
            className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 bg-stone-950/80 border-b border-stone-800 text-white">
              <div className="flex items-center gap-2 pr-4 truncate">
                <span className="px-2 py-0.5 bg-amber-400 text-stone-950 rounded text-[10px] font-black uppercase">
                  {activeVideoModal.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-stone-100 truncate">
                  {activeVideoModal.title}
                </h4>
              </div>
              <button
                id="close-video-modal-btn"
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* YouTube Embed Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeId || extractYouTubeId(activeVideoModal.videoUrl)}?autoplay=1&rel=0`}
                title={activeVideoModal.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-3.5 sm:p-4 bg-stone-950 text-stone-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="line-clamp-2 max-w-2xl text-[11px] sm:text-xs">{activeVideoModal.description}</p>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeVideoModal.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
