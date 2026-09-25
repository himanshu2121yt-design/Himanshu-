import React from 'react';
import {
  ExternalLink,
  Heart,
  Instagram,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
  Video,
  Youtube,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { settings } = useApp();

  return (
    <footer className="border-t border-white/10 bg-[#06080d] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-xl border border-amber-500/30 bg-black">
                <img
                  src="/src/assets/images/himanshu_logo_1790318824908.jpg"
                  alt="Himanshu Edit Hub"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-heading text-lg font-bold text-white tracking-wide">
                  HIMANSHU EDIT HUB
                </span>
                <p className="text-xs text-amber-400 font-medium">Edit. Create. Grow.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Premium video editing for content creators, influencers, and brands. High-retention
              Instagram Reels, YouTube Shorts, and brand promotional campaigns starting at just
              ₹10 per video.
            </p>

            {/* Social media connections */}
            <div className="space-y-2 pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Follow My Work
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {settings.instagramHandle && (
                  <a
                    href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 text-xs font-semibold text-pink-400 hover:bg-pink-500/20 transition-colors"
                  >
                    <Instagram className="h-3.5 w-3.5" />
                    <span>{settings.instagramHandle}</span>
                  </a>
                )}

                {settings.whatsappNumber && (
                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      'Hi Himanshu, I want to hire you for video editing.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}

                {settings.youtubeUrl && (
                  <a
                    href={settings.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <Youtube className="h-3.5 w-3.5" />
                    <span>YouTube</span>
                  </a>
                )}

                {settings.telegramUrl && (
                  <a
                    href={settings.telegramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-400 hover:bg-sky-500/20 transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Telegram</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Short Video Editing (₹10+)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Advanced Video Editing
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('brand-collaboration')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Brand Promotion (₹300 - ₹10,000+)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('creator-plans')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Monthly Creator Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('packages')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Reels Packages (10 - 100 vids)
                </button>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Portfolio & Showreel
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('faq')}
                  className="hover:text-amber-400 transition-colors"
                >
                  FAQ & Turnaround
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact Himanshu
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Trust & Terms</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('terms')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('owner-login')}
                  className="text-amber-400/80 hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Owner Portal
                </button>
              </li>
            </ul>

            {/* UPI Handle badge */}
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-2.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Official UPI Handle
              </span>
              <span className="font-mono text-xs font-bold text-amber-400">
                {settings.upiId}
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-center">
          <p className="text-xs text-amber-300 font-medium">
            💡 <strong className="text-white">Pricing Note:</strong> Video editing starts at ₹10
            per video. Final price may vary depending on video length, complexity, revisions, and
            specific requirements. Brand collaborations range from ₹300 to ₹10,000+.
          </p>
        </div>

        {/* Bottom copyright & payment security */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row text-xs">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-slate-400">
              © {new Date().getFullYear()} Himanshu Edit Hub. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-300">
              Core Team: <strong className="text-white">Vaibhav</strong> (Lead Video Editor) •{' '}
              <strong className="text-amber-400">Himanshu</strong> (Platform Developer & Founder)
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              100% Safe Payments
            </span>
            <span>•</span>
            <span>UPI ({settings.upiId})</span>
            <span>•</span>
            <span>Razorpay</span>
            <span>•</span>
            <span>Cards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
