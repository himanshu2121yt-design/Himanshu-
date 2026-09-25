import React, { useState } from 'react';
import {
  ArrowRight,
  Eye,
  Flame,
  Layers,
  Play,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Video,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PortfolioItem } from '../types';

interface PortfolioPageProps {
  setActiveTab: (tab: string) => void;
  selectedItem: PortfolioItem | null;
  setSelectedItem: (item: PortfolioItem | null) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  setActiveTab,
  selectedItem,
  setSelectedItem,
}) => {
  const { portfolio } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showBeforeAfter, setShowBeforeAfter] = useState<'after' | 'before'>('after');

  const categories = [
    'All',
    'Instagram Reels',
    'YouTube Shorts',
    'Brand Promotions',
    'Product Videos',
    'Before/After Edits',
    'Creative Edits',
  ];

  const filteredItems =
    activeCategory === 'All'
      ? portfolio
      : portfolio.filter((item) => item.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20">
          <Sparkles className="h-3.5 w-3.5" /> Proven Track Record
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
          Portfolio & Showcase Gallery
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Explore high-converting video edits produced for top influencers, fitness creators, tech
          reviewers, and commercial brands.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0e1320] transition-all hover:border-amber-500/40 shadow-xl flex flex-col justify-between"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-black shadow-lg shadow-amber-500/30 transform scale-90 group-hover:scale-100 transition-transform"
                >
                  <Play className="h-6 w-6 fill-black ml-1" />
                </button>
              </div>

              <div className="absolute top-3 left-3">
                <span className="rounded-md bg-black/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white border border-white/10">
                  {item.category}
                </span>
              </div>

              {item.views && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                  <Eye className="h-3 w-3" />
                  <span>{item.views}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-heading text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Stats row */}
                {(item.retention || item.likes) && (
                  <div className="flex items-center gap-3 text-[11px] text-slate-300 pt-1">
                    {item.retention && (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> {item.retention} Retention
                      </span>
                    )}
                    {item.likes && (
                      <span className="text-slate-400 font-medium">
                        ❤️ {item.likes} Likes
                      </span>
                    )}
                  </div>
                )}

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
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setActiveTab('hire-me');
                  }}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 py-2.5 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Hire Me for Similar Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d121d] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Video Player or Before/After switch */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black mb-4">
              {selectedItem.beforeUrl && selectedItem.afterUrl ? (
                <div className="relative h-full w-full">
                  <img
                    src={showBeforeAfter === 'after' ? selectedItem.afterUrl : selectedItem.beforeUrl}
                    alt={selectedItem.title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 z-10 flex gap-2">
                    <button
                      onClick={() => setShowBeforeAfter('before')}
                      className={`rounded-lg px-3 py-1 text-xs font-bold ${
                        showBeforeAfter === 'before'
                          ? 'bg-red-500 text-white'
                          : 'bg-black/60 text-slate-300'
                      }`}
                    >
                      Raw Footage (Before)
                    </button>
                    <button
                      onClick={() => setShowBeforeAfter('after')}
                      className={`rounded-lg px-3 py-1 text-xs font-bold ${
                        showBeforeAfter === 'after'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-black/60 text-slate-300'
                      }`}
                    >
                      Edited Result (After)
                    </button>
                  </div>
                </div>
              ) : (
                <video
                  src={selectedItem.videoUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-cover"
                  poster={selectedItem.thumbnailUrl}
                />
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-400 uppercase">
                  {selectedItem.category}
                </span>
                {selectedItem.views && (
                  <span className="text-xs text-slate-400">
                    Views: <strong className="text-white">{selectedItem.views}</strong>
                  </span>
                )}
              </div>

              <h3 className="font-heading text-xl font-bold text-white">{selectedItem.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedItem.description}</p>

              <div className="flex flex-wrap gap-2 pt-1">
                {selectedItem.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setActiveTab('hire-me');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
                >
                  <Sparkles className="h-4 w-4 fill-black" />
                  <span>Hire Me for Similar Edit (Starts ₹10)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold text-slate-300 hover:bg-white/10"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
