import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Package,
  Sliders,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PackagesPageProps {
  setActiveTab: (tab: string) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ setActiveTab }) => {
  const { packages, openCheckout } = useApp();

  // Custom package builder
  const [customCount, setCustomCount] = useState(25);
  const customPackagePrice = Math.max(99, Math.round(customCount * 9.5));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20">
          <Package className="h-3.5 w-3.5" /> One-Time Bundles
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
          Creator Package Marketplace
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Need a set batch of videos without committing to a recurring monthly subscription?
          Grab a one-time reel pack at bulk discounted rates.
        </p>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`flex flex-col justify-between rounded-3xl border p-6 shadow-xl transition-all hover:-translate-y-1 ${
              pkg.popular
                ? 'border-amber-500/50 bg-gradient-to-b from-[#141b29] to-[#0c121e] ring-1 ring-amber-500/30'
                : 'border-white/10 bg-[#0e1320] hover:border-white/20'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                  {pkg.videosCount} Videos
                </span>
                {pkg.popular && (
                  <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-black uppercase text-black">
                    Popular
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-heading text-xl font-bold text-white">{pkg.title}</h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">{pkg.tagline}</p>
              </div>

              <div className="border-t border-white/10 pt-3">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Starting at</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-3xl font-black text-amber-400">
                    ₹{pkg.startingPrice}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    (~₹{Math.round(pkg.startingPrice / pkg.videosCount)}/vid)
                  </span>
                </div>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-3">
                <span className="text-[10px] font-bold uppercase text-slate-400">Highlights:</span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  openCheckout({
                    title: pkg.title,
                    amount: pkg.startingPrice,
                    serviceType: 'Creator Package',
                    packageId: pkg.id,
                    creditsToCredit: pkg.videosCount,
                  });
                }}
                className={`w-full flex items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-black transition-all ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20'
                    : 'border border-white/20 bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span>Buy Package</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Package Builder Card */}
      <div className="rounded-3xl border border-white/10 bg-[#0d121f] p-8 shadow-2xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sliders className="h-3.5 w-3.5" /> Custom Package Builder
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Need a Custom Number of Videos?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Drag the slider to choose the exact quantity of videos you need edited for your upcoming
              content push.
            </p>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-200 mb-2">
                <span>Selected Bundle:</span>
                <span className="text-amber-400 font-mono text-sm">{customCount} Short Videos</span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                value={customCount}
                onChange={(e) => setCustomCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>5 Videos</span>
                <span>50 Videos</span>
                <span>100 Videos</span>
                <span>150 Videos</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-black/50 p-6 text-center space-y-4">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Configured One-Time Bundle
            </span>
            <div>
              <span className="font-heading text-4xl font-black text-amber-400">
                ₹{customPackagePrice}
              </span>
              <span className="text-xs text-slate-400 block mt-1">
                (~₹{Math.round(customPackagePrice / customCount)}/video)
              </span>
            </div>

            <button
              onClick={() => {
                openCheckout({
                  title: `Custom Package (${customCount} Videos)`,
                  amount: customPackagePrice,
                  serviceType: 'Creator Package',
                  creditsToCredit: customCount,
                });
              }}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
            >
              Order Custom Pack
            </button>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
        <p className="text-xs text-slate-400">
          💡 Package videos can be used anytime over 6 months. High-retention editing, beat-sync, and
          formatting included in every order.
        </p>
      </div>
    </div>
  );
};
