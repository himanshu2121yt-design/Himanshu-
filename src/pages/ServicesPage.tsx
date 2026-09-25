import React from 'react';
import {
  ArrowRight,
  Check,
  Clock,
  DollarSign,
  Flame,
  HelpCircle,
  Layers,
  Palette,
  ShieldAlert,
  Sparkles,
  Tag,
  Video,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ServicesPageProps {
  setActiveTab: (tab: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ setActiveTab }) => {
  const { settings, openCheckout } = useApp();

  const addOns = [
    { title: 'Extra Video Credit', price: '₹10+', desc: 'Add extra video edits to your existing package' },
    { title: 'Viral Custom Thumbnail', price: '₹20+', desc: 'High-CTR YouTube Shorts or Reel cover design' },
    { title: 'Advanced Motion Graphics', price: '₹50+', desc: '3D lower thirds, animated callouts, and VFX' },
    { title: 'Express 12h Turnaround', price: '₹40+', desc: 'Jump to the very front of the editing queue' },
    { title: 'Extra Revision Round', price: '₹15+', desc: 'Additional detailed tweaks and styling passes' },
    { title: 'Long-Form to Shorts Repurpose', price: '₹75+', desc: 'Turn 1 podcast or YouTube video into 5 viral shorts' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20">
          <Sparkles className="h-3.5 w-3.5" /> Editing Catalog
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
          Our Video Editing Services
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          From ₹10 quick vertical edits for budding creators to full commercial campaigns for
          leading brands.
        </p>
      </div>

      {/* Main 3 Services Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Service 1 */}
        <div className="rounded-3xl border border-amber-500/30 bg-[#0e1422] p-8 flex flex-col justify-between shadow-2xl relative">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-extrabold text-amber-400 border border-amber-500/30">
                Most Popular
              </span>
              <div className="text-right">
                <span className="font-heading text-2xl font-black text-amber-400">
                  Starts ₹{settings.baseShortVideoPrice}
                </span>
                <span className="text-xs text-slate-400 block">/video</span>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-white">Short Video Editing</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                For Instagram Reels, YouTube Shorts, and short-form creators who need fast,
                high-retention edits delivered on a budget.
              </p>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                What's Included:
              </span>
              <ul className="space-y-2.5 text-xs text-slate-200">
                {[
                  'Cuts & dead-space removal',
                  'Dynamic smooth transitions',
                  'Synchronized bold subtitles / captions',
                  'Trending background music & SFX',
                  'Basic punch zooms & effects',
                  'Color correction & brightness balance',
                  'Optimal 9:16 vertical formatting',
                  'Fast 24-48h turnaround',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => setActiveTab('hire-me')}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3.5 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              <span>Order Now (From ₹10)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Service 2 */}
        <div className="rounded-3xl border border-sky-500/30 bg-[#0e1422] p-8 flex flex-col justify-between shadow-2xl relative">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-extrabold text-sky-400 border border-sky-500/30">
                Pro Creators
              </span>
              <div className="text-right">
                <span className="font-heading text-xl font-black text-sky-400">
                  Custom Quote
                </span>
                <span className="text-xs text-slate-400 block">Based on specs</span>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-white">Advanced Video Editing</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                For creators who require bespoke storytelling, custom typography, complex motion
                graphics, and cinematic sound design.
              </p>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Customizable Factors:
              </span>
              <ul className="space-y-2.5 text-xs text-slate-200">
                {[
                  'Custom video length (Short to Long-form)',
                  'Editing complexity & script pacing',
                  'Number and type of visual effects',
                  'Alex Hormozi / Ali Abdaal style captions',
                  'Custom 2D/3D motion graphics & callouts',
                  'Sound design with Foley and risers',
                  'Turnaround time (Express 24h available)',
                  'Multiple revision rounds included',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sky-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => setActiveTab('hire-me')}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 py-3.5 text-xs font-black text-sky-300 hover:bg-sky-500/20 shadow-lg shadow-sky-500/10 transition-all active:scale-95"
            >
              <span>Get a Quote</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Service 3 */}
        <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#131024] to-[#0d0c18] p-8 flex flex-col justify-between shadow-2xl relative">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-extrabold text-purple-300 border border-purple-500/30">
                Brands & Campaigns
              </span>
              <div className="text-right">
                <span className="font-heading text-xl font-black text-purple-400">
                  ₹300 – ₹10,000+
                </span>
                <span className="text-xs text-slate-400 block">Package tiers</span>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-white">Brand Promotion</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Allow brands, startups, and agencies to hire Himanshu for high-impact promotional
                videos, sponsored reels, and UGC campaigns.
              </p>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Brand Options:
              </span>
              <ul className="space-y-2.5 text-xs text-slate-200">
                {[
                  'Product promotion & unboxing showcase',
                  'Dedicated Instagram Reel promotion',
                  'High-converting brand awareness videos',
                  'UGC-style authentic creator videos',
                  'Paid social media advertisements (Meta/YouTube)',
                  'Product feature spotlight and aesthetics',
                  'Short promotional video campaigns',
                  'Commercial usage rights & raw assets',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => setActiveTab('brand-collaboration')}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 py-3.5 text-xs font-black text-white hover:from-purple-400 hover:to-indigo-500 shadow-lg shadow-purple-500/20 transition-all active:scale-95"
            >
              <span>Hire for Brand Promotion</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Notice */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-center">
        <p className="text-xs sm:text-sm text-amber-300 font-medium">
          ⚠️ <strong className="text-white">Important Business Policy:</strong> "Final price may
          vary depending on video length, complexity, revisions, and requirements. Individual video
          editing starts at ₹10/video. Brand collaborations range from ₹300 to ₹10,000+."
        </p>
      </div>

      {/* Add-ons Marketplace */}
      <div className="space-y-6 pt-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            A La Carte Add-ons
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
            Supercharge Any Project
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addOns.map((add, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-[#0d121e] p-5 flex flex-col justify-between hover:border-amber-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading text-sm font-bold text-white">{add.title}</h4>
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-400 font-mono">
                    {add.price}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{add.desc}</p>
              </div>
              <button
                onClick={() => {
                  openCheckout({
                    title: add.title,
                    amount: parseInt(add.price.replace(/[^0-9]/g, '')) || 25,
                    serviceType: 'Add-on Service',
                  });
                }}
                className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
