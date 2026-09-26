import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Flame,
  Link,
  Maximize2,
  MessageCircle,
  Play,
  Quote,
  Send,
  Share2,
  Sparkles,
  Star,
  User,
  Users,
  Video,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EditorSampleClip {
  title: string;
  category: string;
  technique: string;
  metrics: string;
  videoUrl: string;
  thumbnailUrl: string;
}

interface ClientFeedbackDetail {
  id: string;
  clientName: string;
  clientHandle: string;
  clientRole: string;
  avatar: string;
  rating: number;
  date: string;
  deliverySpeed: string;
  snippet: string;
  fullReview: string;
  project: {
    title: string;
    style: string;
    metrics: string;
    projectUrl: string;
    previewVideoUrl: string;
    tags: string[];
  };
}

const HIMANSHU_FEEDBACK: ClientFeedbackDetail[] = [
  {
    id: 'rohan',
    clientName: 'Rohan Mehta',
    clientHandle: '@rohanlifts',
    clientRole: 'Fitness Creator • 185k Followers',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Verified Client • 2 weeks ago',
    deliverySpeed: 'Delivered in 14 hours (Fast-Track)',
    snippet: 'Gained 40k followers in 2 weeks with his Hormozi captions. Best ₹10 ever spent!',
    fullReview:
      'Himanshu transformed my raw gym workout footage into an absolute retention magnet! The kinetic Hormozi-style subtitles pop at exactly the right second, with sound effects timed to every key word. The first 3 seconds hooked viewers instantly, pushing my average watch percentage over 92%. I gained 40k followers in just two weeks from a single batch of reels. At ₹10, this is the highest ROI investment in my content career.',
    project: {
      title: 'Viral Gym Transformation & Mindset Reel',
      style: 'Alex Hormozi Kinetic Captions & Punch-In Zooms',
      metrics: '1.4M Views • +42K New Followers • 94.2% Retention',
      projectUrl: 'https://instagram.com/reel/sample-fitness-transformation',
      previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-in-a-gym-with-dumbbells-41484-large.mp4',
      tags: ['Kinetic Captions', 'Sound FX', '3s Retention Hook', 'Zoom Cuts'],
    },
  },
  {
    id: 'aarav',
    clientName: 'Aarav Kapoor',
    clientHandle: '@aaravtech',
    clientRole: 'Tech & AI Host • 420k Subscribers',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Verified Client • 1 month ago',
    deliverySpeed: 'Delivered in 18 hours',
    snippet: 'Insane hook! The 3-second pacing completely exploded my YouTube Shorts reach.',
    fullReview:
      'My retention rate was stalling around 65% before working with Himanshu. He re-architected the opening 3 seconds with dynamic text tracking, b-roll overlays, and subtle whooshes. The video immediately triggered the YouTube Shorts algorithm, hitting 980K views within 48 hours. His speed and attention to visual cadence are top-tier agency standard.',
    project: {
      title: 'Top 5 AI Productivity Tools in 60 Seconds',
      style: 'Fast-Paced Screen Overlays & Color-Coded Subtitles',
      metrics: '980K YouTube Views • 12K Shares • 89% Retention',
      projectUrl: 'https://youtube.com/shorts/sample-tech-ai-tools',
      previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-43405-large.mp4',
      tags: ['Shorts Retention', 'B-Roll Sync', 'Kinetic Typography'],
    },
  },
  {
    id: 'sneha',
    clientName: 'Sneha Roy',
    clientHandle: '@snehacreates',
    clientRole: 'Lifestyle & Travel Creator • 95k Followers',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Verified Client • 3 weeks ago',
    deliverySpeed: 'Delivered in 12 hours (Fast-Track)',
    snippet: 'Delivered in 18 hours. Sound effects & kinetic captions were 10/10.',
    fullReview:
      'I sent my rough phone clips at 11 PM and had the final polished cut ready before noon the next day. The cinematic warm grading, seamless transitions, and subtle acoustic sound design made my vlog feel like an indie documentary. Brands immediately reached out after seeing the production quality.',
    project: {
      title: 'Cinematic Tokyo 48-Hour Travel Vlog Reel',
      style: 'Cinematic Color Grading & Rhythm Beats',
      metrics: '620K Views • 38K Likes • 4 Brand Sponsorship Inquiries',
      projectUrl: 'https://instagram.com/reel/sample-tokyo-travel-aesthetic',
      previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
      tags: ['Cinematic Grade', 'Smooth Transitions', 'Acoustic Sound Design'],
    },
  },
];

const EDITOR_SAMPLES: Record<string, { editorName: string; role: string; avatar: string; clips: EditorSampleClip[] }> = {
  himanshu: {
    editorName: 'Himanshu Pandit',
    role: 'Studio Founder & Lead Visual Artist',
    avatar: '/src/assets/images/himanshu_profile_1790318843205.jpg',
    clips: [
      {
        title: 'Viral Alex Hormozi Kinetic Caption Reel',
        category: 'Kinetic Typography & SFX',
        technique: 'Bold yellow/white kinetic pop-up text, animated emojis, sound design & 3-second hook retention.',
        metrics: '1.4M+ Views • 94% Retention',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnailUrl: '/src/assets/images/reel_mockup_1790318858716.jpg',
      },
      {
        title: 'Tech Podcast Micro-Hook Short',
        category: 'Split-Screen & B-Roll',
        technique: 'Automated zoom-ins, dynamic animated overlays, and pacing that maximizes watch time.',
        metrics: '720K+ Views • 86% Retention',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
      },
      {
        title: 'Luxury Brand Matte Black Commercial',
        category: 'Product Commercial Promo',
        technique: 'Cinematic lighting grade, 3D macro accents, speed ramps & sub-bass audio polish.',
        metrics: '860K+ Views • 88% Retention',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      },
      {
        title: 'High-Retention Storytelling Reel',
        category: 'Creator Brand Growth',
        technique: 'Pacing polish, pause-removal cut flow, and sound effects that trigger algorithm engagement.',
        metrics: '510K+ Views • 92% Retention',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },
  vaibhav: {
    editorName: 'Vaibhav',
    role: 'Senior Motion & Beat-Sync Editor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    clips: [
      {
        title: 'Raw Gym Vlog to Cinematic Fitness Reel',
        category: 'Action Beat Sync',
        technique: 'Aggressive speed ramps, 808 sub-bass drops, motion blur, and motivational audio timing.',
        metrics: '540K+ Views • 91% Retention',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
      },
      {
        title: 'Cyberpunk Action Beat-Sync Montage',
        category: 'Gaming & VFX Montage',
        technique: 'Millisecond audio-reactive cuts, glitch transitions, color LUT and punch zooms.',
        metrics: '990K+ Views • 96% Retention',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
      },
      {
        title: 'Sneakers Brand UGC Showcase Reel',
        category: 'Lifestyle & Loop Cut',
        technique: 'Whip pans, speed ramping transitions, and seamless infinite loop ending for repeat views.',
        metrics: '430K+ Views • 89% Retention',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
      },
      {
        title: 'High-Impact Fitness Beat Drop',
        category: 'Energy Workout Reel',
        technique: 'Heavy bass hits synced with weight lifts, zoom-in punch cuts & intense audio polish.',
        metrics: '670K+ Views • 93% Retention',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnailUrl: '/src/assets/images/reel_mockup_1790318858716.jpg',
      },
    ],
  },
  both: {
    editorName: 'Both Editors (Himanshu Pandit & Vaibhav)',
    role: 'Collaborative Duo Master Cut',
    avatar: '/src/assets/images/himanshu_profile_1790318843205.jpg',
    clips: [
      {
        title: 'Viral Master Cut: Kinetic Hooks + Beat Drops',
        category: 'Duo Collab Master',
        technique: 'Himanshu crafts the hook, captions & SFX; Vaibhav executes the aggressive beat sync & transitions.',
        metrics: '1.4M+ Views • 95% Retention',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnailUrl: '/src/assets/images/reel_mockup_1790318858716.jpg',
      },
      {
        title: 'Commercial Product UGC Masterpiece',
        category: 'Duo Collab Master',
        technique: 'Dual-editor polish: Cinematic color grading, punchy sound design, and speed-ramped product cuts.',
        metrics: '860K+ Views • 90% Retention',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      },
      {
        title: 'Cinematic Lifestyle & Fitness Dynamic Cut',
        category: 'Duo Collab Master',
        technique: 'Story-driven pacing combined with intense rhythmic cuts and bass drop transitions.',
        metrics: '780K+ Views • 93% Retention',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
      },
      {
        title: 'Podcast Viral Micro-Hook & Kinetic Overlays',
        category: 'Duo Collab Master',
        technique: 'Golden nugget extract with split-screen multi-cam cut, kinetic typography & sound FX.',
        metrics: '920K+ Views • 91% Retention',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },
};

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [subView, setSubView] = useState<'main' | 'hire-editor' | 'video-brief'>('main');

  // Lightweight Video Brief Form State
  const [briefVideoLink, setBriefVideoLink] = useState('');
  const [briefStyle, setBriefStyle] = useState('Alex Hormozi Viral Kinetic Captions');
  const [briefEditor, setBriefEditor] = useState<'Himanshu Pandit' | 'Vaibhav' | 'Both Editors'>('Himanshu Pandit');
  const [briefNotes, setBriefNotes] = useState('');

  // Fast-Track Priority Delivery State per editor card
  const [fastTrack, setFastTrack] = useState<{ himanshu: boolean; vaibhav: boolean; both: boolean }>({
    himanshu: false,
    vaibhav: false,
    both: false,
  });

  const toggleFastTrack = (key: 'himanshu' | 'vaibhav' | 'both') => {
    setFastTrack((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Availability status state per editor card ('Accepting New Projects' vs 'Fully Booked')
  const [availabilityStatus, setAvailabilityStatus] = useState<{
    himanshu: 'available' | 'booked';
    vaibhav: 'available' | 'booked';
    both: 'available' | 'booked';
  }>({
    himanshu: 'available',
    vaibhav: 'available',
    both: 'available',
  });

  // Category Filter for Hire Editor Sub-Menu ('All', 'Kinetic', 'Beat-Sync', 'Cinematic')
  const [editorCategory, setEditorCategory] = useState<'All' | 'Kinetic' | 'Beat-Sync' | 'Cinematic'>('All');

  const toggleAvailability = (key: 'himanshu' | 'vaibhav' | 'both') => {
    setAvailabilityStatus((prev) => ({
      ...prev,
      [key]: prev[key] === 'available' ? 'booked' : 'available',
    }));
  };

  // Share profile state
  const [copiedShareKey, setCopiedShareKey] = useState<string | null>(null);

  const handleShareProfile = async (editorKey: string, editorName: string, role: string) => {
    const shareUrl = window.location.href;
    const shareText = `Check out ${editorName} (${role}) on Pandit Ji Video Editing Studio! Professional video editing starting at only ₹10.`;
    const shareData = {
      title: `${editorName} • Video Editor (Starts ₹10)`,
      text: shareText,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error)?.name !== 'AbortError') {
          await copyToClipboard(shareUrl, editorKey);
        }
      }
    } else {
      await copyToClipboard(shareUrl, editorKey);
    }
  };

  const copyToClipboard = async (text: string, editorKey: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedShareKey(editorKey);
      setTimeout(() => {
        setCopiedShareKey(null);
      }, 2000);
    } catch {
      // ignore clipboard error
    }
  };

  // Samples Carousel Modal State
  const [samplesEditorKey, setSamplesEditorKey] = useState<'himanshu' | 'vaibhav' | 'both' | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Full-screen Testimonial Detail Modal State
  const [selectedTestimonial, setSelectedTestimonial] = useState<ClientFeedbackDetail | null>(null);

  // Close testimonial modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTestimonial(null);
      }
    };
    if (selectedTestimonial) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedTestimonial]);

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  const openPopup = () => {
    setIsRendered(true);
    setSubView('main');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true);
        setIsOpen(true);
      });
    });
  };

  const closePopup = () => {
    setIsAnimating(false);
    setIsOpen(false);
    setTimeout(() => {
      setIsRendered(false);
      setSubView('main');
    }, 220);
  };

  const togglePopup = () => {
    if (isOpen) {
      closePopup();
    } else {
      openPopup();
    }
  };

  const openWhatsAppWithMessage = (text: string) => {
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    closePopup();
    setSamplesEditorKey(null);
  };

  // Handle Lightweight Brief Form Submission
  const handleSendVideoBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!briefVideoLink.trim()) return;

    const messageLines = [
      `Hi Himanshu! I want to get my video edited (starting at ₹10):`,
      ``,
      `🔗 Video/Footage Link: ${briefVideoLink.trim()}`,
      `🎨 Editing Style: ${briefStyle}`,
      `👤 Preferred Editor: ${briefEditor}`,
      briefNotes.trim() ? `📝 Special Note: ${briefNotes.trim()}` : '',
      ``,
      `Please let me know the delivery timeline and how to proceed!`,
    ].filter(Boolean);

    openWhatsAppWithMessage(messageLines.join('\n'));
  };

  // Open Samples Modal
  const openSamplesModal = (editorKey: 'himanshu' | 'vaibhav' | 'both') => {
    setSamplesEditorKey(editorKey);
    setCurrentSlideIndex(0);
  };

  const closeSamplesModal = () => {
    setSamplesEditorKey(null);
  };

  const activeSampleData = samplesEditorKey ? EDITOR_SAMPLES[samplesEditorKey] : null;
  const currentClip = activeSampleData ? activeSampleData.clips[currentSlideIndex] : null;

  const nextSlide = () => {
    if (!activeSampleData) return;
    setCurrentSlideIndex((prev) => (prev + 1) % activeSampleData.clips.length);
  };

  const prevSlide = () => {
    if (!activeSampleData) return;
    setCurrentSlideIndex((prev) => (prev - 1 + activeSampleData.clips.length) % activeSampleData.clips.length);
  };

  return (
    <>
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end">
        {/* Quick message popup card with smooth enter and scale-down exit */}
        {isRendered && (
          <div
            className={`mb-3 w-88 rounded-3xl border border-emerald-500/30 bg-[#0d151c]/95 p-4 shadow-2xl backdrop-blur-xl origin-bottom-right transition-all duration-200 ${
              isOpen && isAnimating
                ? 'scale-100 opacity-100 translate-y-0 ease-out'
                : 'scale-75 opacity-0 translate-y-3 pointer-events-none ease-in'
            }`}
          >
            {/* Top Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full overflow-hidden border border-emerald-400">
                  <img
                    src="/src/assets/images/himanshu_profile_1790318843205.jpg"
                    alt="Himanshu Pandit"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    Himanshu Pandit <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-medium">Online • Fast Response</p>
                </div>
              </div>
              <button
                onClick={closePopup}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Top Quick Navigation Tabs */}
            <div className="grid grid-cols-3 rounded-xl bg-white/5 p-1 border border-white/10 text-[11px] font-bold gap-1 mb-3">
              <button
                type="button"
                onClick={() => setSubView('main')}
                className={`py-1.5 rounded-lg text-center transition-all ${
                  subView === 'main' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Topics
              </button>
              <button
                type="button"
                onClick={() => setSubView('video-brief')}
                className={`py-1.5 rounded-lg text-center transition-all flex items-center justify-center gap-1 ${
                  subView === 'video-brief'
                    ? 'bg-emerald-500 text-black shadow'
                    : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                <Sparkles className="h-3 w-3" />
                <span>Fast Brief</span>
              </button>
              <button
                type="button"
                onClick={() => setSubView('hire-editor')}
                className={`py-1.5 rounded-lg text-center transition-all ${
                  subView === 'hire-editor'
                    ? 'bg-amber-500 text-black shadow'
                    : 'text-amber-400 hover:text-amber-300'
                }`}
              >
                Editors
              </button>
            </div>

            {/* VIEW 1: LIGHTWEIGHT VIDEO BRIEF FORM */}
            {subView === 'video-brief' ? (
              <form
                onSubmit={handleSendVideoBrief}
                className="space-y-3 animate-in fade-in slide-in-from-right-3 duration-150"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400">
                      ⚡
                    </span>
                    <span className="text-xs font-bold text-white">Send Video Brief</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold">Starts ₹10/vid</span>
                </div>

                {/* 1. Video link input */}
                <div>
                  <label className="text-[11px] font-bold text-slate-200 block mb-1">
                    Video / Reel / Drive Link *
                  </label>
                  <div className="relative">
                    <Link className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="url"
                      required
                      value={briefVideoLink}
                      onChange={(e) => setBriefVideoLink(e.target.value)}
                      placeholder="https://instagram.com/reel/... or Google Drive"
                      className="w-full rounded-xl border border-white/10 bg-black/60 pl-8 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2. Style Preference Dropdown */}
                <div>
                  <label className="text-[11px] font-bold text-slate-200 block mb-1">
                    Editing Style Preference *
                  </label>
                  <select
                    value={briefStyle}
                    onChange={(e) => setBriefStyle(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs text-white focus:border-emerald-400 focus:outline-none"
                  >
                    <option value="Alex Hormozi Viral Kinetic Captions">
                      Alex Hormozi Style (Bold Yellow/White + SFX)
                    </option>
                    <option value="Ali Abdaal Clean Minimalist">
                      Ali Abdaal Style (Clean, calm paper aesthetic)
                    </option>
                    <option value="High-Energy Gym/Fitness Beat Drop">
                      High-Energy Workout (Beat-sync bass drops)
                    </option>
                    <option value="Aesthetic Pastel Lifestyle Vlog">
                      Aesthetic Lifestyle (Lo-fi chill film grain)
                    </option>
                    <option value="Tech & Product Specs Overlays">
                      Tech & Product (Spec callouts & 3D sound)
                    </option>
                    <option value="Custom / Match My Profile Style">
                      Custom (Match my personal profile)
                    </option>
                  </select>
                </div>

                {/* 3. Target Editor selection */}
                <div>
                  <label className="text-[11px] font-bold text-slate-200 block mb-1">
                    Preferred Video Editor
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setBriefEditor('Himanshu Pandit')}
                      className={`p-1.5 rounded-lg border text-center transition-all ${
                        briefEditor === 'Himanshu Pandit'
                          ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      Himanshu
                    </button>
                    <button
                      type="button"
                      onClick={() => setBriefEditor('Vaibhav')}
                      className={`p-1.5 rounded-lg border text-center transition-all ${
                        briefEditor === 'Vaibhav'
                          ? 'border-sky-400 bg-sky-500/20 text-sky-300'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      Vaibhav
                    </button>
                    <button
                      type="button"
                      onClick={() => setBriefEditor('Both Editors')}
                      className={`p-1.5 rounded-lg border text-center transition-all ${
                        briefEditor === 'Both Editors'
                          ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      Both (Collab)
                    </button>
                  </div>
                </div>

                {/* 4. Optional Special Note */}
                <div>
                  <label className="text-[11px] font-bold text-slate-200 block mb-1">
                    Special Note / Hook Instruction (Optional)
                  </label>
                  <input
                    type="text"
                    value={briefNotes}
                    onChange={(e) => setBriefNotes(e.target.value)}
                    placeholder="e.g. Focus on first 3 seconds, add punch zooms"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                {/* Live Message Preview Pill */}
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2 text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-300">Generated WhatsApp message:</span>
                  <p className="mt-0.5 font-mono text-[9px] text-emerald-300/80 truncate">
                    "Hi Himanshu! 🔗 {briefVideoLink || 'https://...'} • 🎨 {briefStyle} • 👤 {briefEditor}"
                  </p>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 py-2.5 text-xs font-black text-black hover:from-emerald-400 hover:to-emerald-500 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Project on WhatsApp 🚀</span>
                </button>
              </form>
            ) : subView === 'hire-editor' ? (
              /* VIEW 2: HIRE EDITOR SELECTION SUB-MENU */
              <div className="space-y-3 animate-in fade-in slide-in-from-right-3 duration-150">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <button
                    type="button"
                    onClick={() => setSubView('main')}
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Topics</span>
                  </button>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Select Editor
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h5 className="text-xs font-bold text-white">Choose Editor for WhatsApp:</h5>
                  <p className="text-[11px] text-slate-300">
                    Filter by primary expertise or connect immediately:
                  </p>
                </div>

                {/* Category Filter Menu */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {(
                    [
                      { id: 'All', label: 'All', icon: '✨' },
                      { id: 'Kinetic', label: 'Kinetic', icon: '✍️' },
                      { id: 'Beat-Sync', label: 'Beat-Sync', icon: '🎵' },
                      { id: 'Cinematic', label: 'Cinematic', icon: '🎬' },
                    ] as const
                  ).map((cat) => {
                    const isActive = editorCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setEditorCategory(cat.id)}
                        className={`shrink-0 flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-bold transition-all ${
                          isActive
                            ? 'bg-amber-400 text-black shadow-sm shadow-amber-400/25 scale-[1.02]'
                            : 'border border-white/10 bg-black/40 text-slate-300 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-2.5">
                  {/* 1. Himanshu Pandit */}
                  {(editorCategory === 'All' || editorCategory === 'Kinetic' || editorCategory === 'Cinematic') && (
                    <div className="relative rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 space-y-2.5 transition-all duration-300 hover:border-amber-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/25 animate-in fade-in slide-in-from-bottom-2.5 duration-300 fill-mode-both">
                    {/* Top-Right: Availability Status Badge & Share Profile Button */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAvailability('himanshu');
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold border transition-all cursor-pointer shadow-sm select-none ${
                          availabilityStatus.himanshu === 'available'
                            ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                            : 'border-rose-500/40 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                        }`}
                        title="Click to toggle availability"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            availabilityStatus.himanshu === 'available'
                              ? 'bg-emerald-400 animate-pulse'
                              : 'bg-rose-400'
                          }`}
                        />
                        <span>
                          {availabilityStatus.himanshu === 'available'
                            ? 'Accepting New Projects'
                            : 'Fully Booked'}
                        </span>
                      </button>

                      {/* Share Profile Icon Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShareProfile(
                            'himanshu',
                            'Himanshu Pandit',
                            'Founder & Lead Visual Artist (Alex Hormozi Captions & Hooks)'
                          );
                        }}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 border border-white/10 transition-colors shadow-sm"
                        title={copiedShareKey === 'himanshu' ? 'Profile link copied!' : 'Share Profile'}
                        aria-label="Share Himanshu Pandit Profile"
                      >
                        {copiedShareKey === 'himanshu' ? (
                          <Check className="h-2.5 w-2.5 text-emerald-400" />
                        ) : (
                          <Share2 className="h-2.5 w-2.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2.5 pt-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border border-amber-400 shrink-0">
                        <img
                          src="/src/assets/images/himanshu_profile_1790318843205.jpg"
                          alt="Himanshu Pandit"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h6 className="font-bold text-xs text-white truncate">Himanshu Pandit</h6>
                          <span className="text-[10px] font-mono font-bold text-amber-400">₹10/vid</span>
                        </div>
                        <p className="text-[10px] text-amber-300 font-medium truncate">
                          Founder & Lead Visual Artist
                        </p>
                        <p className="text-[9px] text-slate-400 truncate">
                          Alex Hormozi Captions & 3s Retention Hooks
                        </p>
                        <div className="flex items-center gap-1 pt-1">
                          <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[8px] font-bold text-amber-300">Kinetic</span>
                          <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[8px] font-bold text-amber-300">Cinematic</span>
                        </div>
                      </div>
                    </div>

                    {/* Client Feedback Snippet Section (Clickable to Expand Full Screen) */}
                    <div className="rounded-xl border border-white/10 bg-black/40 p-2 space-y-1">
                      <div className="flex items-center justify-between text-[9px] font-bold">
                        <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <span>Client Feedback</span>
                          <span className="text-[8px] text-amber-400/80 font-normal lowercase">(tap snippet to expand ↗)</span>
                        </span>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                          <span className="font-mono text-[9px]">5.0 (42 reviews)</span>
                        </div>
                      </div>
                      <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory py-0.5">
                        {HIMANSHU_FEEDBACK.map((fb) => (
                          <div
                            key={fb.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTestimonial(fb);
                            }}
                            role="button"
                            tabIndex={0}
                            className="min-w-[215px] shrink-0 snap-start rounded-lg border border-amber-500/25 bg-amber-500/5 hover:bg-amber-500/15 hover:border-amber-400/70 p-2 text-[9px] space-y-1 transition-all cursor-pointer group shadow-sm active:scale-95 select-none"
                            title="Click to view full testimonial with project link"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-0.5 text-amber-400">
                                {[...Array(fb.rating)].map((_, i) => (
                                  <Star key={i} className="h-2 w-2 fill-amber-400 text-amber-400" />
                                ))}
                                <span className="text-[8px] text-slate-400 ml-1 font-sans">Verified</span>
                              </div>
                              <span className="flex items-center gap-0.5 text-[8px] font-bold text-amber-300 opacity-80 group-hover:opacity-100 group-hover:text-amber-200 transition-all">
                                <span>Expand</span>
                                <Maximize2 className="h-2 w-2" />
                              </span>
                            </div>
                            <p className="text-slate-300 italic leading-snug line-clamp-2">
                              "{fb.snippet}"
                            </p>
                            <div className="flex items-center justify-between text-[8px] pt-1 border-t border-amber-500/15">
                              <span className="text-amber-300 font-bold truncate max-w-[120px]">
                                — {fb.clientName}
                              </span>
                              <span className="text-[7.5px] text-amber-400 font-mono flex items-center gap-0.5">
                                <span>Project Link</span>
                                <ExternalLink className="h-2 w-2" />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fast-Track Priority Checkbox */}
                    <label
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 cursor-pointer transition-all select-none ${
                        fastTrack.himanshu
                          ? 'border-amber-400/60 bg-amber-500/20'
                          : 'border-white/10 bg-black/40 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={fastTrack.himanshu}
                          onChange={() => toggleFastTrack('himanshu')}
                          className="h-3.5 w-3.5 rounded border-white/20 bg-black/60 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-amber-500"
                        />
                        <span className="text-[10px] font-bold text-slate-200 flex items-center gap-1">
                          ⚡ Fast-Track Delivery <span className="text-amber-400 font-semibold">(Priority 12–24h)</span>
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-amber-300">
                        +₹50
                      </span>
                    </label>

                    {/* Action buttons row */}
                    <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => openSamplesModal('himanshu')}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-amber-500/40 bg-black/40 py-1.5 px-2 text-[11px] font-bold text-amber-300 hover:bg-amber-500/20 transition-all"
                      >
                        <Play className="h-3 w-3 fill-amber-300" />
                        <span>View Samples (4)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openWhatsAppWithMessage(
                            availabilityStatus.himanshu === 'booked'
                              ? `Hi Himanshu Pandit, I see you are currently fully booked, but I would like to reserve a spot for video editing with ${fastTrack.himanshu ? 'Fast-Track Priority (₹60)' : 'Standard Delivery (₹10)'}. Please let me know your waitlist!`
                              : fastTrack.himanshu
                              ? 'Hi Himanshu Pandit, I want to hire you specifically for video editing with Fast-Track Delivery (Priority 12–24h, ₹60). Please let me know your availability!'
                              : 'Hi Himanshu Pandit, I want to hire you specifically for video editing (starting ₹10). Please let me know your availability!'
                          )
                        }
                        className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 text-[11px] font-black transition-all shadow-sm ${
                          availabilityStatus.himanshu === 'booked'
                            ? 'bg-rose-500 hover:bg-rose-400 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-black'
                        }`}
                      >
                        <Send className="h-3 w-3" />
                        <span>
                          {availabilityStatus.himanshu === 'booked' ? 'Waitlist' : 'Chat & Hire'} • ₹{fastTrack.himanshu ? 60 : 10}
                        </span>
                      </button>
                    </div>
                  </div>
                  )}

                  {/* 2. Vaibhav */}
                  {(editorCategory === 'All' || editorCategory === 'Beat-Sync') && (
                    <div className="relative rounded-2xl border border-sky-500/30 bg-sky-500/10 p-3 space-y-2.5 transition-all duration-300 hover:border-sky-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-sky-500/25 animate-in fade-in slide-in-from-bottom-2.5 duration-300 delay-75 fill-mode-both">
                    {/* Top-Right: Availability Status Badge & Share Profile Button */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAvailability('vaibhav');
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold border transition-all cursor-pointer shadow-sm select-none ${
                          availabilityStatus.vaibhav === 'available'
                            ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                            : 'border-rose-500/40 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                        }`}
                        title="Click to toggle availability"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            availabilityStatus.vaibhav === 'available'
                              ? 'bg-emerald-400 animate-pulse'
                              : 'bg-rose-400'
                          }`}
                        />
                        <span>
                          {availabilityStatus.vaibhav === 'available'
                            ? 'Accepting New Projects'
                            : 'Fully Booked'}
                        </span>
                      </button>

                      {/* Share Profile Icon Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShareProfile(
                            'vaibhav',
                            'Vaibhav',
                            'Senior Motion & Beat-Sync Editor (Speed Ramps & Action Cuts)'
                          );
                        }}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 border border-white/10 transition-colors shadow-sm"
                        title={copiedShareKey === 'vaibhav' ? 'Profile link copied!' : 'Share Profile'}
                        aria-label="Share Vaibhav Profile"
                      >
                        {copiedShareKey === 'vaibhav' ? (
                          <Check className="h-2.5 w-2.5 text-emerald-400" />
                        ) : (
                          <Share2 className="h-2.5 w-2.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2.5 pt-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border border-sky-400 shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                          alt="Vaibhav"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h6 className="font-bold text-xs text-white truncate">Vaibhav</h6>
                          <span className="text-[10px] font-mono font-bold text-sky-400">₹10/vid</span>
                        </div>
                        <p className="text-[10px] text-sky-300 font-medium truncate">
                          Senior Motion & Beat-Sync Editor
                        </p>
                        <p className="text-[9px] text-slate-400 truncate">
                          Dynamic Cuts, Beat Drops & Speed Ramps
                        </p>
                        <div className="flex items-center gap-1 pt-1">
                          <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[8px] font-bold text-sky-300">Beat-Sync</span>
                          <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[8px] font-bold text-sky-300">Motion Cuts</span>
                        </div>
                      </div>
                    </div>

                    {/* Client Feedback Snippet Section */}
                    <div className="rounded-xl border border-white/10 bg-black/40 p-2 space-y-1">
                      <div className="flex items-center justify-between text-[9px] font-bold">
                        <span className="text-slate-400 uppercase tracking-wider">Client Feedback</span>
                        <div className="flex items-center gap-0.5 text-sky-400">
                          <Star className="h-2.5 w-2.5 fill-sky-400 text-sky-400" />
                          <span className="font-mono text-[9px]">5.0 (39 reviews)</span>
                        </div>
                      </div>
                      <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory py-0.5">
                        <div className="min-w-[200px] shrink-0 snap-start rounded-lg border border-sky-500/20 bg-sky-500/5 p-1.5 text-[9px] space-y-0.5">
                          <div className="flex items-center gap-0.5 text-sky-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-2 w-2 fill-sky-400 text-sky-400" />
                            ))}
                            <span className="text-[8px] text-slate-400 ml-1 font-sans">Verified Order</span>
                          </div>
                          <p className="text-slate-300 italic leading-snug">
                            "His gym beat drops are unmatched. The aggressive speed ramps hit every single time!"
                          </p>
                          <span className="block text-[8px] text-sky-300/80 font-bold">— Vikram S. (Athlete & Coach)</span>
                        </div>
                        <div className="min-w-[200px] shrink-0 snap-start rounded-lg border border-sky-500/20 bg-sky-500/5 p-1.5 text-[9px] space-y-0.5">
                          <div className="flex items-center gap-0.5 text-sky-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-2 w-2 fill-sky-400 text-sky-400" />
                            ))}
                            <span className="text-[8px] text-slate-400 ml-1 font-sans">Verified Order</span>
                          </div>
                          <p className="text-slate-300 italic leading-snug">
                            "Gaming montage reached 990k views. Frame-perfect sync on the audio beat drop."
                          </p>
                          <span className="block text-[8px] text-sky-300/80 font-bold">— Dev R. (Gaming Creator)</span>
                        </div>
                        <div className="min-w-[200px] shrink-0 snap-start rounded-lg border border-sky-500/20 bg-sky-500/5 p-1.5 text-[9px] space-y-0.5">
                          <div className="flex items-center gap-0.5 text-sky-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-2 w-2 fill-sky-400 text-sky-400" />
                            ))}
                            <span className="text-[8px] text-slate-400 ml-1 font-sans">Verified Order</span>
                          </div>
                          <p className="text-slate-300 italic leading-snug">
                            "Smooth transitions and loop cuts kept viewers watching on repeat."
                          </p>
                          <span className="block text-[8px] text-sky-300/80 font-bold">— Tanmay P. (Streetwear Brand)</span>
                        </div>
                      </div>
                    </div>

                    {/* Fast-Track Priority Checkbox */}
                    <label
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 cursor-pointer transition-all select-none ${
                        fastTrack.vaibhav
                          ? 'border-sky-400/60 bg-sky-500/20'
                          : 'border-white/10 bg-black/40 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={fastTrack.vaibhav}
                          onChange={() => toggleFastTrack('vaibhav')}
                          className="h-3.5 w-3.5 rounded border-white/20 bg-black/60 text-sky-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-sky-500"
                        />
                        <span className="text-[10px] font-bold text-slate-200 flex items-center gap-1">
                          ⚡ Fast-Track Delivery <span className="text-sky-400 font-semibold">(Priority 12–24h)</span>
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-sky-300">
                        +₹50
                      </span>
                    </label>

                    {/* Action buttons row */}
                    <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => openSamplesModal('vaibhav')}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-sky-500/40 bg-black/40 py-1.5 px-2 text-[11px] font-bold text-sky-300 hover:bg-sky-500/20 transition-all"
                      >
                        <Play className="h-3 w-3 fill-sky-300" />
                        <span>View Samples (4)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openWhatsAppWithMessage(
                            availabilityStatus.vaibhav === 'booked'
                              ? `Hi Vaibhav, I see you are currently fully booked, but I would like to reserve a spot for video editing with ${fastTrack.vaibhav ? 'Fast-Track Priority (₹60)' : 'Standard Delivery (₹10)'}. Please let me know your waitlist!`
                              : fastTrack.vaibhav
                              ? 'Hi Vaibhav, I want to hire you specifically for video editing with Fast-Track Delivery (Priority 12–24h, ₹60). Please let me know your availability!'
                              : 'Hi, I want to hire Vaibhav for video editing (starting ₹10). Please connect me with Vaibhav!'
                          )
                        }
                        className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 text-[11px] font-black transition-all shadow-sm ${
                          availabilityStatus.vaibhav === 'booked'
                            ? 'bg-rose-500 hover:bg-rose-400 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-black'
                        }`}
                      >
                        <Send className="h-3 w-3" />
                        <span>
                          {availabilityStatus.vaibhav === 'booked' ? 'Waitlist' : 'Chat & Hire'} • ₹{fastTrack.vaibhav ? 60 : 10}
                        </span>
                      </button>
                    </div>
                  </div>
                  )}

                  {/* 3. Both Editors (Collab Duo) */}
                  {(editorCategory === 'All' || editorCategory === 'Kinetic' || editorCategory === 'Beat-Sync' || editorCategory === 'Cinematic') && (
                    <div className="relative rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-2.5 transition-all duration-300 hover:border-emerald-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25 animate-in fade-in slide-in-from-bottom-2.5 duration-300 delay-150 fill-mode-both">
                    {/* Top-Right: Availability Status Badge & Share Profile Button */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAvailability('both');
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold border transition-all cursor-pointer shadow-sm select-none ${
                          availabilityStatus.both === 'available'
                            ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                            : 'border-rose-500/40 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                        }`}
                        title="Click to toggle availability"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            availabilityStatus.both === 'available'
                              ? 'bg-emerald-400 animate-pulse'
                              : 'bg-rose-400'
                          }`}
                        />
                        <span>
                          {availabilityStatus.both === 'available'
                            ? 'Accepting New Projects'
                            : 'Fully Booked'}
                        </span>
                      </button>

                      {/* Share Profile Icon Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShareProfile(
                            'both',
                            'Himanshu Pandit & Vaibhav',
                            'Collaborative Duo (Visual Hook Artist & Senior Motion Editor)'
                          );
                        }}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 border border-white/10 transition-colors shadow-sm"
                        title={copiedShareKey === 'both' ? 'Profile link copied!' : 'Share Profile'}
                        aria-label="Share Collab Duo Profile"
                      >
                        {copiedShareKey === 'both' ? (
                          <Check className="h-2.5 w-2.5 text-emerald-400" />
                        ) : (
                          <Share2 className="h-2.5 w-2.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2.5 pt-3">
                      <div className="flex -space-x-2 shrink-0">
                        <img
                          src="/src/assets/images/himanshu_profile_1790318843205.jpg"
                          alt="Himanshu Pandit"
                          className="h-9 w-9 rounded-full border border-amber-400 object-cover"
                        />
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                          alt="Vaibhav"
                          className="h-9 w-9 rounded-full border border-sky-400 object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h6 className="font-bold text-xs text-emerald-300 truncate">
                            Both Editors (Collab)
                          </h6>
                          <span className="text-[10px] font-mono font-bold text-emerald-400">₹10/vid</span>
                        </div>
                        <p className="text-[10px] text-slate-300 font-medium truncate">
                          Dual Polish & Collaborative Master Cut
                        </p>
                        <p className="text-[9px] text-slate-400 truncate">
                          Double quality & maximum engagement
                        </p>
                        <div className="flex items-center gap-1 pt-1">
                          <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold text-emerald-300">Kinetic</span>
                          <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold text-emerald-300">Beat-Sync</span>
                          <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold text-emerald-300">Cinematic</span>
                        </div>
                      </div>
                    </div>

                    {/* Client Feedback Snippet Section */}
                    <div className="rounded-xl border border-white/10 bg-black/40 p-2 space-y-1">
                      <div className="flex items-center justify-between text-[9px] font-bold">
                        <span className="text-slate-400 uppercase tracking-wider">Client Feedback</span>
                        <div className="flex items-center gap-0.5 text-emerald-400">
                          <Star className="h-2.5 w-2.5 fill-emerald-400 text-emerald-400" />
                          <span className="font-mono text-[9px]">5.0 (65 reviews)</span>
                        </div>
                      </div>
                      <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory py-0.5">
                        <div className="min-w-[200px] shrink-0 snap-start rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-1.5 text-[9px] space-y-0.5">
                          <div className="flex items-center gap-0.5 text-emerald-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-2 w-2 fill-emerald-400 text-emerald-400" />
                            ))}
                            <span className="text-[8px] text-slate-400 ml-1 font-sans">Verified Order</span>
                          </div>
                          <p className="text-slate-300 italic leading-snug">
                            "Having both edit my reel was cheat code level. Top tier typography + explosive beat sync."
                          </p>
                          <span className="block text-[8px] text-emerald-300/80 font-bold">— Kabir V. (Brand Founder)</span>
                        </div>
                        <div className="min-w-[200px] shrink-0 snap-start rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-1.5 text-[9px] space-y-0.5">
                          <div className="flex items-center gap-0.5 text-emerald-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-2 w-2 fill-emerald-400 text-emerald-400" />
                            ))}
                            <span className="text-[8px] text-slate-400 ml-1 font-sans">Verified Order</span>
                          </div>
                          <p className="text-slate-300 italic leading-snug">
                            "Dual polish made our commercial look like a ₹50,000 agency production!"
                          </p>
                          <span className="block text-[8px] text-emerald-300/80 font-bold">— Neha D. (E-com Lead)</span>
                        </div>
                        <div className="min-w-[200px] shrink-0 snap-start rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-1.5 text-[9px] space-y-0.5">
                          <div className="flex items-center gap-0.5 text-emerald-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-2 w-2 fill-emerald-400 text-emerald-400" />
                            ))}
                            <span className="text-[8px] text-slate-400 ml-1 font-sans">Verified Order</span>
                          </div>
                          <p className="text-slate-300 italic leading-snug">
                            "Pacing hook from Himanshu + transitions from Vaibhav = viral reel guaranteed."
                          </p>
                          <span className="block text-[8px] text-emerald-300/80 font-bold">— Sahil T. (Podcast Host)</span>
                        </div>
                      </div>
                    </div>

                    {/* Fast-Track Priority Checkbox */}
                    <label
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 cursor-pointer transition-all select-none ${
                        fastTrack.both
                          ? 'border-emerald-400/60 bg-emerald-500/20'
                          : 'border-white/10 bg-black/40 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={fastTrack.both}
                          onChange={() => toggleFastTrack('both')}
                          className="h-3.5 w-3.5 rounded border-white/20 bg-black/60 text-emerald-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-emerald-500"
                        />
                        <span className="text-[10px] font-bold text-slate-200 flex items-center gap-1">
                          ⚡ Fast-Track Delivery <span className="text-emerald-400 font-semibold">(Priority 12–24h)</span>
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-300">
                        +₹50
                      </span>
                    </label>

                    {/* Action buttons row */}
                    <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => openSamplesModal('both')}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-emerald-500/40 bg-black/40 py-1.5 px-2 text-[11px] font-bold text-emerald-300 hover:bg-emerald-500/20 transition-all"
                      >
                        <Play className="h-3 w-3 fill-emerald-300" />
                        <span>View Samples (4)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openWhatsAppWithMessage(
                            availabilityStatus.both === 'booked'
                              ? `Hi Himanshu Pandit & Vaibhav, I see you are currently fully booked, but I would like to reserve a spot for collaborative video editing with ${fastTrack.both ? 'Fast-Track Priority (₹60)' : 'Standard Delivery (₹10)'}. Please let me know your waitlist!`
                              : fastTrack.both
                              ? 'Hi Himanshu Pandit & Vaibhav, I want to hire both editors collaboratively for my video with Fast-Track Delivery (Priority 12–24h, ₹60)! How do we get started?'
                              : 'Hi Himanshu Pandit & Vaibhav, I want to hire both editors collaboratively for my video (₹10)! How do we get started?'
                          )
                        }
                        className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 text-[11px] font-black transition-all shadow-sm ${
                          availabilityStatus.both === 'booked'
                            ? 'bg-rose-500 hover:bg-rose-400 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-black'
                        }`}
                      >
                        <Send className="h-3 w-3" />
                        <span>
                          {availabilityStatus.both === 'booked' ? 'Waitlist' : 'Chat & Hire'} • ₹{fastTrack.both ? 60 : 10}
                        </span>
                      </button>
                    </div>
                  </div>
                  )}
                </div>
              </div>
            ) : (
              /* VIEW 3: MAIN TOPICS MENU */
              <div className="space-y-3">
                <p className="text-xs text-slate-300">
                  Hey! Select an action or message directly on WhatsApp:
                </p>

                <div className="space-y-2">
                  {/* Button 1: Send Video Link & Brief (Lightweight Form) */}
                  <button
                    type="button"
                    onClick={() => setSubView('video-brief')}
                    className="flex w-full items-center justify-between rounded-xl border border-emerald-500/40 bg-gradient-to-r from-emerald-500/15 via-[#0e1919] to-emerald-500/10 p-2.5 text-left text-xs font-semibold text-white hover:border-emerald-400 hover:bg-emerald-500/25 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                        ⚡
                      </span>
                      <div>
                        <span className="block font-bold text-emerald-300">
                          Send Video Link & Style (Fast Quote)
                        </span>
                        <span className="block text-[10px] text-slate-400">
                          Pre-fill message with your video link
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-emerald-400" />
                  </button>

                  {/* Button 2: Hire Video Editor (Sub-menu with samples) */}
                  <button
                    type="button"
                    onClick={() => setSubView('hire-editor')}
                    className="flex w-full items-center justify-between rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-[#131d27] to-amber-500/10 p-2.5 text-left text-xs font-semibold text-white hover:border-amber-400 hover:bg-amber-500/25 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                        🎬
                      </span>
                      <div>
                        <span className="block font-bold text-amber-300">
                          Hire Video Editor (Starts ₹10)
                        </span>
                        <span className="block text-[10px] text-slate-400">
                          Choose Vaibhav or Himanshu Pandit
                        </span>
                      </div>
                    </div>
                    <span className="flex items-center text-[10px] font-bold text-amber-400">
                      Samples <Play className="h-3 w-3 fill-amber-400 ml-1" />
                    </span>
                  </button>

                  {/* Button 3: Brand Collaboration */}
                  <button
                    type="button"
                    onClick={() =>
                      openWhatsAppWithMessage('Hi Himanshu, I’m interested in a brand collaboration.')
                    }
                    className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 p-2 text-left text-xs font-medium text-slate-200 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-colors"
                  >
                    <span>🏷️ Brand Collaboration Proposal</span>
                    <Send className="h-3 w-3 text-emerald-400" />
                  </button>

                  {/* Button 4: Creator Subscription Packages */}
                  <button
                    type="button"
                    onClick={() =>
                      openWhatsAppWithMessage('Hi Himanshu, I want to discuss monthly creator subscription packages.')
                    }
                    className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 p-2 text-left text-xs font-medium text-slate-200 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-colors"
                  >
                    <span>📦 Creator Monthly Packages</span>
                    <Send className="h-3 w-3 text-emerald-400" />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-3 pt-2 border-t border-white/10 text-center">
              <span className="text-[10px] text-slate-400">
                WhatsApp: {settings.whatsappNumber}
              </span>
            </div>
          </div>
        )}

        {/* Floating Trigger button */}
        <button
          onClick={togglePopup}
          className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 hover:scale-105 hover:bg-emerald-400 active:scale-95 transition-all"
          title="Chat on WhatsApp"
          aria-label="Toggle WhatsApp chat window"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </span>
          <MessageCircle className="h-7 w-7 text-black fill-black" />
        </button>
      </div>

      {/* TEMPORARY MODAL CAROUSEL FOR EDITOR SAMPLES */}
      {samplesEditorKey && activeSampleData && currentClip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#0d141e] p-5 sm:p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden border border-amber-400 shrink-0">
                  <img
                    src={activeSampleData.avatar}
                    alt={activeSampleData.editorName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-white leading-tight">
                    {activeSampleData.editorName}
                  </h4>
                  <p className="text-[11px] text-amber-400 font-medium">
                    {activeSampleData.role} • Sample Showcase
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeSamplesModal}
                className="rounded-full bg-white/10 p-1.5 text-slate-400 hover:text-white hover:bg-white/20 transition-colors"
                aria-label="Close sample modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Carousel Slide Container */}
            <div className="relative rounded-2xl bg-black overflow-hidden border border-white/10">
              {/* Video Player */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <video
                  key={currentClip.videoUrl}
                  src={currentClip.videoUrl}
                  poster={currentClip.thumbnailUrl}
                  controls
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Prev / Next Carousel Arrow Controls */}
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-amber-500 hover:text-black border border-white/20 backdrop-blur-md transition-all shadow-lg"
                title="Previous sample clip"
                aria-label="Previous sample"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-amber-500 hover:text-black border border-white/20 backdrop-blur-md transition-all shadow-lg"
                title="Next sample clip"
                aria-label="Next sample"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Slide Counter badge */}
              <div className="absolute top-2.5 right-2.5 rounded-full bg-black/80 border border-white/20 px-2.5 py-0.5 text-[10px] font-mono font-bold text-white backdrop-blur-md">
                {currentSlideIndex + 1} / {activeSampleData.clips.length}
              </div>
            </div>

            {/* Clip Information & Technique details */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="rounded bg-amber-500/20 text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {currentClip.category}
                </span>
                <span className="text-[11px] font-bold text-emerald-400">
                  {currentClip.metrics}
                </span>
              </div>

              <h5 className="font-heading text-sm font-bold text-white pt-0.5">
                {currentClip.title}
              </h5>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                💡 <strong className="text-white">Technique:</strong> {currentClip.technique}
              </p>
            </div>

            {/* Dots Pagination Indicator */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {activeSampleData.clips.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlideIndex
                      ? 'w-6 bg-amber-400'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Direct Hire CTA from inside the modal */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  const editorHireText =
                    samplesEditorKey === 'himanshu'
                      ? 'Hi Himanshu Pandit, I just watched your sample reel clips and want to hire you for video editing (₹10)!'
                      : samplesEditorKey === 'vaibhav'
                      ? 'Hi Vaibhav, I just watched your sample action cuts and want to hire you for video editing (₹10)!'
                      : 'Hi Himanshu Pandit & Vaibhav, I watched your duo collab samples and want both of you to edit my video (₹10)!';
                  openWhatsAppWithMessage(editorHireText);
                }}
                className="w-full flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 py-3 text-xs font-black text-black hover:from-emerald-400 hover:to-emerald-500 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Hire {activeSampleData.editorName.split(' ')[0]} on WhatsApp (₹10)</span>
              </button>

              <button
                type="button"
                onClick={closeSamplesModal}
                className="w-full sm:w-auto rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-bold text-slate-300 hover:bg-white/10 transition-colors"
              >
                Close Samples
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Detailed Client Feedback Testimonial Modal */}
      {selectedTestimonial && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedTestimonial(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#1a140a] via-[#101010] to-[#0a0a0a] p-5 sm:p-6 shadow-2xl shadow-amber-500/20 text-white overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
            <div className="absolute bottom-0 left-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

            {/* Modal Header */}
            <div className="relative z-10 flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 shadow-md shadow-amber-400/20">
                  <img
                    src={selectedTestimonial.avatar}
                    alt={selectedTestimonial.clientName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading text-base font-bold text-white">
                      {selectedTestimonial.clientName}
                    </h4>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      ✓ Verified Order
                    </span>
                  </div>
                  <p className="text-xs text-amber-300/90 font-medium">
                    {selectedTestimonial.clientRole}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {selectedTestimonial.clientHandle} • {selectedTestimonial.date}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedTestimonial(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
                aria-label="Close testimonial"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Body Content */}
            <div className="relative z-10 overflow-y-auto space-y-4 py-4 pr-1 text-xs">
              {/* Star Rating & Delivery Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(selectedTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-300">5.0 Star Experience</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md px-2 py-0.5">
                  ⚡ {selectedTestimonial.deliverySpeed}
                </span>
              </div>

              {/* Detailed Testimonial Quote */}
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                <Quote className="h-6 w-6 text-amber-400/40" />
                <p className="text-slate-200 text-sm leading-relaxed italic">
                  "{selectedTestimonial.fullReview}"
                </p>
              </div>

              {/* Project Showcase & Link Card */}
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-black to-black p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Project Delivered by Himanshu
                  </span>
                  <span className="rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] px-2 py-0.5">
                    {selectedTestimonial.project.metrics}
                  </span>
                </div>

                <div className="space-y-1">
                  <h5 className="font-heading text-sm font-bold text-white">
                    {selectedTestimonial.project.title}
                  </h5>
                  <p className="text-xs text-slate-300">
                    <strong className="text-amber-300">Editing Style:</strong> {selectedTestimonial.project.style}
                  </p>
                </div>

                {/* Preview Video Player */}
                <div className="relative rounded-xl overflow-hidden aspect-video bg-black/60 border border-white/15">
                  <video
                    src={selectedTestimonial.project.previewVideoUrl}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2 pointer-events-none rounded bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold text-amber-300">
                    Reel Clip Preview
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {selectedTestimonial.project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-white/10 text-slate-300 px-2 py-0.5 text-[10px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Project External Link Button */}
                <a
                  href={selectedTestimonial.project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full rounded-xl border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 py-2 px-3 text-xs font-bold text-amber-300 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>View Project Reel Link & Comments</span>
                </a>
              </div>

              {/* Testimonial Carousel Switcher */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  Testimonial {HIMANSHU_FEEDBACK.findIndex((f) => f.id === selectedTestimonial.id) + 1} of {HIMANSHU_FEEDBACK.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      const currIdx = HIMANSHU_FEEDBACK.findIndex((f) => f.id === selectedTestimonial.id);
                      const prevIdx = currIdx > 0 ? currIdx - 1 : HIMANSHU_FEEDBACK.length - 1;
                      setSelectedTestimonial(HIMANSHU_FEEDBACK[prevIdx]);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                    title="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const currIdx = HIMANSHU_FEEDBACK.findIndex((f) => f.id === selectedTestimonial.id);
                      const nextIdx = currIdx < HIMANSHU_FEEDBACK.length - 1 ? currIdx + 1 : 0;
                      setSelectedTestimonial(HIMANSHU_FEEDBACK[nextIdx]);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                    title="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  const hireMsg = `Hi Himanshu Pandit, I read ${selectedTestimonial.clientName}'s review for "${selectedTestimonial.project.title}" and want to hire you for a video with the same style (₹10)! How do we get started?`;
                  openWhatsAppWithMessage(hireMsg);
                  setSelectedTestimonial(null);
                }}
                className="w-full flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 py-3 text-xs font-black text-black hover:from-emerald-400 hover:to-emerald-500 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Hire Himanshu with this Style (₹10)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTestimonial(null)}
                className="w-full sm:w-auto rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-bold text-slate-300 hover:bg-white/10 transition-colors"
              >
                Back to Profiles
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
