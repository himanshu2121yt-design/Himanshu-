import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Check,
  CheckCircle,
  Clock,
  Compass,
  DollarSign,
  Eye,
  Flame,
  Heart,
  Instagram,
  Layers,
  MessageCircle,
  Play,
  Repeat,
  RotateCcw,
  Send,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
  Video,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PortfolioItem } from '../types';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onSelectPortfolioItem: (item: PortfolioItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onSelectPortfolioItem }) => {
  const { settings, portfolio, reviews, openCheckout } = useApp();

  // Reel preview state
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Quick Quote Calculator state
  const [calcVideos, setCalcVideos] = useState(1);
  const [calcLength, setCalcLength] = useState<'short' | 'medium' | 'long'>('short');
  const [calcComplexity, setCalcComplexity] = useState<'basic' | 'creator' | 'advanced'>('basic');
  const [calcDeadline, setCalcDeadline] = useState<'standard' | 'express'>('standard');

  // Calculate estimated price
  const calculateEstimatedQuote = () => {
    let base = settings.baseShortVideoPrice; // starts at ₹10
    if (calcComplexity === 'creator') base = 49;
    if (calcComplexity === 'advanced') base = 99;

    if (calcLength === 'medium') base = Math.round(base * 1.5);
    if (calcLength === 'long') base = Math.round(base * 2.2);

    if (calcDeadline === 'express') base = Math.round(base * 1.3);

    const total = base * calcVideos;
    return Math.max(10, total);
  };

  const estimatedTotal = calculateEstimatedQuote();

  // Why choose us items
  const whyChooseUs = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      desc: 'Get your reels delivered within 24–48 hours, ready to post and ride the algorithm.',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Video,
      title: 'Professional Editing',
      desc: 'Industry-standard color grading, dynamic sound design, beat-sync cuts, and punch zooms.',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      desc: 'Creator-friendly rates starting at just ₹10 per video. High production without high budgets.',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: Smartphone,
      title: 'Social Media Ready',
      desc: 'Optimized 9:16 vertical formatting for Instagram Reels, YouTube Shorts, and TikTok algorithms.',
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
      icon: Sparkles,
      title: 'Creative Effects',
      desc: 'Viral kinetic typography, motion graphics, audio waveforms, sound effects, and eye-catching hooks.',
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    },
    {
      icon: Heart,
      title: 'Creator Friendly',
      desc: 'We save your brand colors, fonts, and editing style so you never have to repeat instructions.',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      icon: Tag,
      title: 'Brand Collaboration',
      desc: 'Full-service influencer and UGC promotional packages tailored to brands and product launches.',
      color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    },
    {
      icon: RotateCcw,
      title: 'Revision Support',
      desc: 'Direct in-dashboard revision requests with timecodes to make sure your video is 100% perfect.',
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        {/* Glow backdrop effects */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-500/15 via-purple-500/10 to-transparent blur-[120px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Creator Pill Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-amber-300">
                  Lead Editor & Creator: {settings.creatorName}
                </span>
                <span className="text-slate-500">•</span>
                <a
                  href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline"
                >
                  <Instagram className="h-3 w-3" />
                  {settings.instagramHandle}
                </a>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Your Videos.{' '}
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                  Our Edits.
                </span>{' '}
                <br />
                More Impact.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Professional video editing for creators, influencers, and brands — starting at just{' '}
                <span className="font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  ₹10 per video
                </span>
                . High retention, viral hooks, and broadcast color grading.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('hire-me')}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 px-6 py-3.5 text-sm font-black text-black shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all active:scale-95"
                >
                  <Sparkles className="h-4 w-4 fill-black" />
                  <span>Hire Me</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 hover:border-white/30 transition-all active:scale-95"
                >
                  <Play className="h-4 w-4 text-amber-400" />
                  <span>View Portfolio</span>
                </button>

                <button
                  onClick={() => setActiveTab('brand-collaboration')}
                  className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-3.5 text-sm font-bold text-amber-300 hover:bg-amber-500/20 transition-all"
                >
                  <Tag className="h-4 w-4" />
                  <span>Brand Collaboration</span>
                </button>
              </div>

              {/* Feature Badges Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
                <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 p-2 text-xs">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span className="font-semibold text-slate-200">Fast Editing</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 p-2 text-xs">
                  <Heart className="h-4 w-4 text-pink-400" />
                  <span className="font-semibold text-slate-200">Creator Friendly</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 p-2 text-xs">
                  <DollarSign className="h-4 w-4 text-emerald-400" />
                  <span className="font-semibold text-slate-200">Affordable Pricing</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 p-2 text-xs">
                  <Tag className="h-4 w-4 text-purple-400" />
                  <span className="font-semibold text-slate-200">Brand Promotions</span>
                </div>
              </div>
            </div>

            {/* Right: Animated Interactive Reel Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative mx-auto w-full max-w-[320px]">
                {/* Glow ring */}
                <div className="absolute -inset-1.5 rounded-[40px] bg-gradient-to-r from-amber-500 via-purple-600 to-amber-500 opacity-30 blur-lg animate-pulse" />

                {/* Smartphone Device Frame */}
                <div className="relative overflow-hidden rounded-[36px] border-4 border-slate-700/80 bg-black shadow-2xl">
                  {/* Top speaker notch */}
                  <div className="absolute top-2 left-1/2 z-30 h-4 w-28 -translate-x-1/2 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-700 mr-2" />
                    <div className="h-1 w-8 rounded-full bg-slate-800" />
                  </div>

                  {/* Reel Content */}
                  <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-950">
                    <img
                      src="/src/assets/images/reel_mockup_1790318858716.jpg"
                      alt="Himanshu Video Edit Sample"
                      className={`h-full w-full object-cover transition-transform duration-700 ${
                        isPlaying ? 'scale-105' : 'scale-100'
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay for Instagram UI Feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

                    {/* Live Caption & Audio Overlay Simulation */}
                    <div className="absolute bottom-4 left-3 right-3 space-y-2 pointer-events-auto">
                      {/* Kinetic Caption badge */}
                      <div className="inline-block rounded-md bg-amber-400 px-2 py-1 text-xs font-black text-black shadow-lg">
                        VIRAL HOOK EDIT 🚀
                      </div>

                      <p className="text-xs font-bold text-white leading-snug drop-shadow-md">
                        "Your videos deserve edits that hook viewers in the first 3 seconds."
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
                        <span className="flex items-center gap-1 font-semibold text-amber-300">
                          <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                          Edited by {settings.creatorName}
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">Starts @ ₹10</span>
                      </div>
                    </div>

                    {/* Interactive overlay controls */}
                    <div className="absolute top-8 right-3 flex flex-col gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 hover:bg-black/90 transition-all"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <span className="h-2.5 w-2.5 bg-amber-400 rounded-sm" /> : <Play className="h-3.5 w-3.5 fill-white text-white" />}
                      </button>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 hover:bg-black/90 transition-all"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="h-3.5 w-3.5 text-slate-300" /> : <Volume2 className="h-3.5 w-3.5 text-amber-400" />}
                      </button>
                    </div>

                    {/* Right side social icons */}
                    <div className="absolute bottom-20 right-3 flex flex-col items-center gap-3 text-white">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </div>
                        <span className="text-[9px] font-bold mt-0.5">142K</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                          <MessageCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-[9px] font-bold mt-0.5">3.8K</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Starting ₹10 tag */}
                <div className="absolute -bottom-4 -left-4 rounded-xl border border-amber-500/40 bg-[#0d1424] p-3 shadow-xl backdrop-blur-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Starting Price
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-xl font-extrabold text-amber-400">₹10</span>
                    <span className="text-xs text-slate-300">/ video</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK QUOTE CALCULATOR SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-b from-[#0e1422] to-[#0a0d16] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="max-w-2xl mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Instant Estimator
            </span>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Quick Quote Calculator
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Select your requirements below to calculate an instant estimated price starting from ₹10/video.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Form Controls */}
            <div className="lg:col-span-8 space-y-6">
              {/* Number of videos */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-200 mb-2">
                  <span>Number of Videos:</span>
                  <span className="text-amber-400 text-sm font-extrabold">{calcVideos} {calcVideos === 1 ? 'Video' : 'Videos'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={calcVideos}
                  onChange={(e) => setCalcVideos(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1 Single Video</span>
                  <span>10 Videos</span>
                  <span>20 Videos</span>
                  <span>30 Videos Batch</span>
                </div>
              </div>

              {/* Video length */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-2">Video Duration:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'short', label: '15 – 30 sec', desc: 'Standard Reel / Short' },
                    { id: 'medium', label: '30 – 60 sec', desc: 'Extended Story Reel' },
                    { id: 'long', label: '1 – 3 mins', desc: 'Mini-Vlog / Tutorial' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCalcLength(item.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        calcLength === item.id
                          ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500/40'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <p className="text-xs font-bold text-white">{item.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Editing complexity */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-2">Editing Complexity:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'basic', label: 'Basic Cuts', desc: 'Trim, music & clean subtitles (Starts ₹10)' },
                    { id: 'creator', label: 'Trending Reel', desc: 'Kinetic captions, beat sync & zooms' },
                    { id: 'advanced', label: 'Motion Graphics', desc: 'VFX, sound design & 3D titles' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCalcComplexity(item.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        calcComplexity === item.id
                          ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500/40'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <p className="text-xs font-bold text-white">{item.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Deadline */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-2">Delivery Speed:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcDeadline('standard')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      calcDeadline === 'standard'
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-white/10 bg-white/5 text-slate-400'
                    }`}
                  >
                    <p className="text-xs font-bold text-white">Standard Delivery (48 Hours)</p>
                    <p className="text-[10px] text-slate-400">Regular queue turnaround</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCalcDeadline('express')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      calcDeadline === 'express'
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-white/10 bg-white/5 text-slate-400'
                    }`}
                  >
                    <p className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Zap className="h-3 w-3 fill-amber-400" />
                      Express (Within 24 Hours)
                    </p>
                    <p className="text-[10px] text-slate-400">Top priority editor assignment</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Estimated Quote Card */}
            <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl">
              <div className="space-y-4">
                <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  Estimated Estimate
                </span>
                <div>
                  <span className="font-heading text-4xl sm:text-5xl font-black text-amber-400">
                    ₹{estimatedTotal}
                  </span>
                  <span className="text-xs text-slate-400 ml-2">Total Estimated</span>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-3 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Videos:</span>
                    <span className="font-bold text-white">{calcVideos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rate / Video:</span>
                    <span className="font-bold text-white">₹{Math.round(estimatedTotal / calcVideos)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Turnaround:</span>
                    <span className="font-bold text-white">{calcDeadline === 'express' ? '24 Hours' : '48 Hours'}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-amber-500/10 p-2.5 text-[11px] text-amber-300/90 border border-amber-500/20 leading-relaxed">
                  ⚠️ Note: Starting price from ₹10/video. Final price may vary depending on video length, complexity, revisions and requirements.
                </div>
              </div>

              <div className="pt-6 space-y-2">
                <button
                  onClick={() => {
                    openCheckout({
                      title: `${calcVideos}x Videos Edit (${calcComplexity} style)`,
                      amount: estimatedTotal,
                      serviceType: 'Short Video Editing',
                    });
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
                >
                  <Sparkles className="h-4 w-4 fill-black" />
                  Order With This Estimate
                </button>

                <button
                  onClick={() => setActiveTab('hire-me')}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-bold text-white hover:bg-white/10 transition-colors"
                >
                  Custom Project Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20">
            Professional Offerings
          </span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-black text-white">
            Designed for Creators, Influencers & Brands
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Choose individual editing, comprehensive packages, or commercial brand collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Service 1: Short Video Editing */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0e1320] p-6 sm:p-8 hover:border-amber-500/40 transition-all duration-300 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-bold uppercase text-amber-400 border border-amber-500/30">
                  Best Seller
                </span>
                <span className="font-heading text-xl font-black text-amber-400">
                  Starts ₹10
                  <span className="text-xs font-normal text-slate-400">/video</span>
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white">Short Video Editing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                For Instagram Reels, YouTube Shorts, and viral short-form clips. Fast cuts, beat-syncing,
                and high viewer retention.
              </p>

              <div className="space-y-2 border-t border-white/10 pt-4">
                <p className="text-xs font-bold text-white">Includes:</p>
                <ul className="space-y-2 text-xs text-slate-300">
                  {[
                    'Clean cuts & dead air removal',
                    'Smooth dynamic transitions',
                    'Bold synchronized captions',
                    'Trending background music & SFX',
                    'Basic visual effects & zooms',
                    'Color correction & enhancement',
                    '9:16 Reels/Shorts formatting',
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setActiveTab('hire-me')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-extrabold text-black hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
              >
                <span>Order Now (From ₹10)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Service 2: Advanced Video Editing */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0e1320] p-6 sm:p-8 hover:border-sky-500/40 transition-all duration-300 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-sky-500/20 px-3 py-1 text-[11px] font-bold uppercase text-sky-400 border border-sky-500/30">
                  Customizable
                </span>
                <span className="font-heading text-lg font-bold text-sky-400">
                  Custom Pricing
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white">Advanced Video Editing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                For creators who need bespoke storytelling, motion graphics, audio mastering, and custom
                visual identities.
              </p>

              <div className="space-y-2 border-t border-white/10 pt-4">
                <p className="text-xs font-bold text-white">Pricing customizable by:</p>
                <ul className="space-y-2 text-xs text-slate-300">
                  {[
                    'Video length (Short to Long-form)',
                    'Editing complexity & script depth',
                    '3D title cards & Motion Graphics',
                    'Custom stylized kinetic captions',
                    'Multi-camera angle switching',
                    'Express 24h turnaround time',
                    'Unlimited revision rounds',
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setActiveTab('hire-me')}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 py-3 text-xs font-extrabold text-sky-300 hover:bg-sky-500/20 transition-all"
              >
                <span>Get a Quote</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Service 3: Brand Promotion */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#131928] to-[#0d121e] p-6 sm:p-8 hover:border-amber-400 transition-all duration-300 shadow-xl shadow-amber-500/5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-[11px] font-black uppercase text-black">
                  For Brands & D2C
                </span>
                <span className="font-heading text-lg font-black text-amber-400">
                  ₹300 – ₹10,000+
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white">Brand Promotion</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Allow brands to hire Himanshu for high-converting promotional videos, sponsored reels,
                and social-media campaigns.
              </p>

              <div className="space-y-2 border-t border-white/10 pt-4">
                <p className="text-xs font-bold text-white">Brand options:</p>
                <ul className="space-y-2 text-xs text-slate-300">
                  {[
                    'Product unboxing & feature showcase',
                    'Dedicated Instagram Reel promotion',
                    'High-impact UGC-style creator videos',
                    'Social media paid advertisements',
                    'Brand awareness campaigns',
                    'Short promotional commercial edits',
                    'Full campaign packages & licensing',
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setActiveTab('brand-collaboration')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
              >
                <span>Hire for Brand Promotion</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Pricing notice disclaimer */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
          <p className="text-xs text-slate-400">
            Important Notice:{' '}
            <span className="text-white font-medium">
              “Final price may vary depending on video length, complexity, revisions and requirements.”
            </span>
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US CARDS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white">
            Why Choose Himanshu Edit Hub?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Built by a creator for creators and businesses who value velocity, engagement, and excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#0d131f] p-5 hover:border-amber-500/30 transition-all hover:-translate-y-1 shadow-md"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${item.color} mb-3`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-white">{item.title}</h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PORTFOLIO HIGHLIGHTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Selected Work
            </span>
            <h2 className="font-heading text-3xl font-black text-white mt-1">
              Recent Edits & Showcases
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('portfolio')}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
          >
            <span>View All Works ({portfolio.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0e1320] transition-all hover:border-amber-500/40 shadow-xl"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => onSelectPortfolioItem(item)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-black shadow-lg shadow-amber-500/30 transform scale-90 group-hover:scale-100 transition-transform"
                  >
                    <Play className="h-5 w-5 fill-black ml-0.5" />
                  </button>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="rounded-md bg-black/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white border border-white/10">
                    {item.category}
                  </span>
                </div>

                {item.views && (
                  <div className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                    {item.views} Views
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 space-y-3">
                <h3 className="font-heading text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-300 font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10">
                  <button
                    onClick={() => {
                      setActiveTab('hire-me');
                    }}
                    className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 py-2 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Hire Me for Similar Edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Trusted by 500+ Creators
            </span>
            <h2 className="font-heading text-3xl font-black text-white mt-1">
              What Creators & Brands Say
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('reviews')}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
          >
            <span>View All & Write Review</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews
            .filter((r) => r.approved)
            .slice(0, 4)
            .map((rev) => (
              <div
                key={rev.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d131f] p-5 shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{rev.review}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2.5">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="h-8 w-8 rounded-full object-cover border border-amber-500/30"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{rev.name}</h4>
                    {rev.instagram && (
                      <p className="text-[10px] text-amber-400">{rev.instagram}</p>
                    )}
                    <span className="text-[9px] text-slate-500 block">{rev.service}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* MEET YOUR CORE TEAM (SHOWN TO CUSTOMERS) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#111728] via-[#0d121e] to-[#090d16] p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20">
              <Award className="h-3.5 w-3.5" /> Creative & Technical Leadership
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white">
              Meet the Core Team Behind Your Edits
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Direct access to industry-grade video editing and responsive software engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Lead Video Editor: Vaibhav */}
            <div className="group rounded-2xl border border-sky-500/30 bg-[#0b101c] p-6 hover:border-sky-400 transition-all shadow-xl space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Vaibhav"
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-sky-400/50 shadow-md group-hover:scale-105 transition-transform"
                />
                <div>
                  <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-sky-300 tracking-wider">
                    Creative Production Lead
                  </span>
                  <h3 className="font-heading text-2xl font-black text-white mt-1">Vaibhav</h3>
                  <p className="text-xs font-semibold text-sky-400">Lead Video Editor & Motion Artist</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Specializing in high-retention vertical reels, kinetic typography, pacing, color grading, and viral Alex Hormozi style captions that keep viewers glued.
              </p>

              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="rounded bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 text-sky-300 font-semibold">
                  🎬 Premiere Pro & After Effects
                </span>
                <span className="rounded bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 text-sky-300 font-semibold">
                  ⚡ Sound Design & SFX
                </span>
                <span className="rounded bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 text-sky-300 font-semibold">
                  🔥 Viral Retention Hooks
                </span>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">Assigned Editor on Your Orders</span>
                <button
                  onClick={() => setActiveTab('hire-me')}
                  className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1"
                >
                  <span>Book with Vaibhav</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Lead Developer: Himanshu */}
            <div className="group rounded-2xl border border-amber-500/30 bg-[#0b101c] p-6 hover:border-amber-400 transition-all shadow-xl space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src="/src/assets/images/himanshu_profile_1790318843205.jpg"
                  alt="Himanshu"
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-amber-400/50 shadow-md group-hover:scale-105 transition-transform"
                />
                <div>
                  <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">
                    Studio Founder & Engineer
                  </span>
                  <h3 className="font-heading text-2xl font-black text-white mt-1">Himanshu</h3>
                  <p className="text-xs font-semibold text-amber-400">Platform Developer & Studio Lead</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Architect of the Edit Hub platform, handling real-time UTR payment verification systems, automated delivery pipelines, and creator collaboration tooling.
              </p>

              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="rounded bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-amber-300 font-semibold">
                  💻 Full-Stack Architecture
                </span>
                <span className="rounded bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-amber-300 font-semibold">
                  🛡️ Instant UTR Settlement
                </span>
                <span className="rounded bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-amber-300 font-semibold">
                  🚀 Rapid Delivery Tech
                </span>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">System & Verification Lead</span>
                <button
                  onClick={() => setActiveTab('hire-me')}
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREATOR ONBOARDING & MONTHLY PACKAGES BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-black uppercase text-black">
              Save Up to 60% with Monthly Plans
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white">
              Ready to automate your video output?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join the Starter, Growth, or Pro creator plan. Get up to 150 edited short videos a month
              with a dedicated editor, saved brand kit, and guaranteed priority turnaround.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('creator-plans')}
                className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
              >
                Explore Creator Plans (Starts ₹299/mo)
              </button>
              <button
                onClick={() => setActiveTab('packages')}
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-xs font-bold text-white hover:bg-white/10"
              >
                One-Time Packages (From ₹99)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
