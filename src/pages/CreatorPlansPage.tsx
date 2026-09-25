import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Clock,
  Coins,
  Crown,
  HelpCircle,
  Minus,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CreatorPlansPageProps {
  setActiveTab: (tab: string) => void;
}

export const CreatorPlansPage: React.FC<CreatorPlansPageProps> = ({ setActiveTab }) => {
  const { userSubscription, openCheckout } = useApp();

  // Custom plan interactive estimator
  const [customVideos, setCustomVideos] = useState(200);
  const [customMotionGraphics, setCustomMotionGraphics] = useState(true);
  const [customThumbnails, setCustomThumbnails] = useState(true);
  const [customDedicatedEditor, setCustomDedicatedEditor] = useState(true);

  const calculateCustomFee = () => {
    let base = customVideos * 10;
    if (customMotionGraphics) base += 500;
    if (customThumbnails) base += 350;
    if (customDedicatedEditor) base += 650;
    return base;
  };

  const plans = [
    {
      id: 'starter' as const,
      name: 'Starter Creator',
      tagline: 'Ideal for budding creators posting 1 reel a day.',
      price: 299,
      period: '/month',
      credits: 30,
      badge: 'Starter',
      color: 'border-white/10 hover:border-amber-500/30',
      buttonText: 'Subscribe Now (₹299)',
      features: [
        'Up to 30 short videos / month',
        '30 Monthly Video Credits',
        'Basic cuts & dead air trim',
        'Trending background music',
        'Clean simple transitions',
        'Basic readable subtitles',
        '9:16 vertical formatting',
        'Standard 48h delivery',
        'In-dashboard order tracking',
      ],
    },
    {
      id: 'growth' as const,
      name: 'Growth Creator',
      tagline: 'Best for daily active creators scaling follower growth.',
      price: 699,
      period: '/month',
      credits: 75,
      popular: true,
      badge: 'Most Popular',
      color: 'border-amber-500/50 bg-gradient-to-b from-[#141b29] to-[#0c121e]',
      buttonText: 'Subscribe Now (₹699)',
      features: [
        'Up to 75 short videos / month',
        '75 Monthly Video Credits',
        'Advanced cuts & zoom-ins',
        'Alex Hormozi dynamic captions',
        'Trending kinetic transitions',
        'Basic color correction & grade',
        'Sound effects (Whooshes, Pops)',
        'Reel & Short hook optimization',
        'Priority 24h editing queue',
        'Limited revisions per video',
      ],
    },
    {
      id: 'pro' as const,
      name: 'Pro Creator',
      tagline: 'High volume output for influencers & full-time creators.',
      price: 1499,
      period: '/month',
      credits: 150,
      badge: 'Maximum Value',
      color: 'border-purple-500/40 bg-gradient-to-b from-[#181329] to-[#0d0a18]',
      buttonText: 'Subscribe Now (₹1,499)',
      features: [
        'Up to 150 short videos / month',
        '150 Monthly Video Credits',
        'Advanced cinematic editing',
        'Professional animated typography',
        'Custom 2D/3D motion graphics',
        'Cinematic LUT color grading',
        'Bespoke sound design & Foley',
        'Creative custom transitions',
        'Express priority turnaround',
        'Multiple revisions rounds',
        'Dedicated editor & direct chat support',
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20">
          <Crown className="h-3.5 w-3.5" /> Recurring Plans
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
          Creator Subscriptions & Monthly Packages
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Put your video production on autopilot. Purchase a predictable monthly credit package
          instead of ordering individual videos one by one.
        </p>

        {userSubscription && userSubscription.status === 'active' && (
          <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>
              You are currently subscribed to <strong>{userSubscription.planName}</strong> (
              {userSubscription.remainingCredits} / {userSubscription.totalMonthlyCredits} credits
              available).
            </span>
          </div>
        )}
      </div>

      {/* 3 Main Pricing Cards */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {plans.map((p) => {
          const isCurrent = userSubscription?.planId === p.id && userSubscription.status === 'active';
          return (
            <div
              key={p.id}
              className={`relative flex flex-col justify-between rounded-3xl border ${p.color} p-8 shadow-2xl transition-all hover:scale-[1.01]`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-1 text-[11px] font-black uppercase text-black tracking-wider shadow-lg">
                  {p.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl font-black text-white">{p.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{p.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-4xl sm:text-5xl font-black text-amber-400">
                    ₹{p.price}
                  </span>
                  <span className="text-sm text-slate-400">{p.period}</span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Monthly Credits:</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1 font-mono">
                    <Coins className="h-3.5 w-3.5" /> {p.credits} Credits
                  </span>
                </div>

                <div className="space-y-2.5 border-t border-white/10 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Plan Inclusions:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {p.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                {isCurrent ? (
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="w-full rounded-xl border border-emerald-500/40 bg-emerald-500/20 py-3 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition-all"
                  >
                    Active Plan (Go to Dashboard)
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      openCheckout({
                        title: `${p.name} Monthly Subscription`,
                        amount: p.price,
                        serviceType: 'Creator Subscription',
                        subscriptionPlanId: p.id,
                      });
                    }}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-black shadow-lg transition-all active:scale-95 ${
                      p.popular
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 shadow-amber-500/20'
                        : 'border border-white/20 bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <span>{p.buttonText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Plan 4: Creator Custom Plan Calculator */}
      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-[#0d121f] via-[#101726] to-[#0d121f] p-8 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/30">
              Plan 4 — Creator Custom
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
              Need Larger Volumes or Special Workflows?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              For high-volume creators, production teams, and podcast networks requiring bespoke
              monthly quotas, custom dedicated editors, and accelerated turnaround.
            </p>

            {/* Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-200 mb-2">
                <span>Monthly Videos Required:</span>
                <span className="text-amber-400 font-mono text-sm">{customVideos} Videos / month</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                step="25"
                value={customVideos}
                onChange={(e) => setCustomVideos(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>100 Videos</span>
                <span>250 Videos</span>
                <span>500 Videos / mo</span>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10">
                <input
                  type="checkbox"
                  checked={customMotionGraphics}
                  onChange={(e) => setCustomMotionGraphics(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <span className="text-xs text-white font-medium">3D Motion Graphics</span>
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10">
                <input
                  type="checkbox"
                  checked={customThumbnails}
                  onChange={(e) => setCustomThumbnails(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <span className="text-xs text-white font-medium">Thumbnail Concepting</span>
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10">
                <input
                  type="checkbox"
                  checked={customDedicatedEditor}
                  onChange={(e) => setCustomDedicatedEditor(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <span className="text-xs text-white font-medium">Dedicated Lead Editor</span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl text-center space-y-4">
            <span className="text-[11px] uppercase font-bold text-slate-400">
              Estimated Monthly Retainer
            </span>
            <div>
              <span className="font-heading text-4xl font-black text-amber-400">
                ₹{calculateCustomFee()}
              </span>
              <span className="text-xs text-slate-400 block mt-1">/ month billed</span>
            </div>

            <button
              onClick={() => {
                openCheckout({
                  title: `Custom Creator Plan (${customVideos} videos/mo)`,
                  amount: calculateCustomFee(),
                  serviceType: 'Creator Subscription',
                  subscriptionPlanId: 'custom',
                });
              }}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
            >
              Get Custom Quote & Activate
            </button>
          </div>
        </div>
      </div>

      {/* Credit System Explainer */}
      <div className="rounded-3xl border border-white/10 bg-[#0c101c] p-8 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            How Credits Work
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
            Fair & Transparent Video Credit System
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every subscription issues monthly video credits. Simple edits use 1 credit, while complex
            requests use proportionate credits:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Basic Reel</h4>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
                1 Credit
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Standard cuts, music sync, 9:16 format, and clean subtitles.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Advanced Reel</h4>
              <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-400">
                2 Credits
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Kinetic typography, sound design, color grading, and speed ramps.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Heavy Motion Graphics</h4>
              <span className="rounded bg-purple-500/20 px-2 py-0.5 text-xs font-bold text-purple-400">
                3+ Credits
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Complex 3D animations, custom intro/outro, and VFX composite scenes.
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Comparison Table */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
            Plan Feature Comparison
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Compare every feature side-by-side to choose the right fit.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d121e]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-white/10 bg-white/5 text-slate-300">
              <tr>
                <th className="p-4 font-bold">Feature</th>
                <th className="p-4 font-bold text-center">Starter (₹299)</th>
                <th className="p-4 font-bold text-center text-amber-400">Growth (₹699)</th>
                <th className="p-4 font-bold text-center text-purple-400">Pro (₹1,499)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="p-4 font-semibold text-white">Monthly Videos Included</td>
                <td className="p-4 text-center font-bold">30</td>
                <td className="p-4 text-center font-bold text-amber-400">75</td>
                <td className="p-4 text-center font-bold text-purple-400">150</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Basic Editing & Trims</td>
                <td className="p-4 text-center text-emerald-400">✓</td>
                <td className="p-4 text-center text-emerald-400">✓</td>
                <td className="p-4 text-center text-emerald-400">✓</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Captions / Subtitles</td>
                <td className="p-4 text-center text-emerald-400">✓ (Basic)</td>
                <td className="p-4 text-center text-emerald-400">✓ (Kinetic)</td>
                <td className="p-4 text-center text-emerald-400">✓ (Custom Pro)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Advanced Cuts & Transitions</td>
                <td className="p-4 text-center text-slate-600">—</td>
                <td className="p-4 text-center text-emerald-400">✓</td>
                <td className="p-4 text-center text-emerald-400">✓</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Color Correction</td>
                <td className="p-4 text-center text-slate-600">—</td>
                <td className="p-4 text-center text-emerald-400">✓</td>
                <td className="p-4 text-center text-emerald-400">✓</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Motion Graphics</td>
                <td className="p-4 text-center text-slate-600">—</td>
                <td className="p-4 text-center text-amber-400">Limited</td>
                <td className="p-4 text-center text-emerald-400">✓ Full VFX</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Priority Delivery</td>
                <td className="p-4 text-center text-slate-600">—</td>
                <td className="p-4 text-center text-emerald-400">✓ 24 Hours</td>
                <td className="p-4 text-center text-emerald-400">✓ Fast-Track</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Dedicated Editor Pod</td>
                <td className="p-4 text-center text-slate-600">—</td>
                <td className="p-4 text-center text-slate-600">—</td>
                <td className="p-4 text-center text-emerald-400">✓ Dedicated</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Revisions Support</td>
                <td className="p-4 text-center">1 Round</td>
                <td className="p-4 text-center">2 Rounds</td>
                <td className="p-4 text-center font-bold text-purple-400">Multiple</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
