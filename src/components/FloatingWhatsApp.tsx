import React, { useState } from 'react';
import { ExternalLink, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  const openWhatsAppWithMessage = (text: string) => {
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end">
      {/* Quick message popup card */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl border border-emerald-500/30 bg-[#0d151c]/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden border border-emerald-400">
                <img
                  src="/src/assets/images/himanshu_profile_1790318843205.jpg"
                  alt="Himanshu"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  Himanshu <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-[10px] text-emerald-400 font-medium">Online • Fast Response</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-3">
            Hey! Select a quick topic or message me directly on WhatsApp:
          </p>

          <div className="space-y-2">
            <button
              onClick={() =>
                openWhatsAppWithMessage('Hi Himanshu, I want to hire you for video editing.')
              }
              className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 p-2 text-left text-xs font-medium text-slate-200 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-colors"
            >
              <span>🎬 Hire for Video Editing</span>
              <Send className="h-3 w-3 text-emerald-400" />
            </button>

            <button
              onClick={() =>
                openWhatsAppWithMessage('Hi Himanshu, I’m interested in a brand collaboration.')
              }
              className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 p-2 text-left text-xs font-medium text-slate-200 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-colors"
            >
              <span>🏷️ Brand Collaboration Proposal</span>
              <Send className="h-3 w-3 text-emerald-400" />
            </button>

            <button
              onClick={() =>
                openWhatsAppWithMessage('Hi Himanshu, I want to discuss monthly creator subscription packages.')
              }
              className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 p-2 text-left text-xs font-medium text-slate-200 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-colors"
            >
              <span>📦 Creator Monthly Packages</span>
              <Send className="h-3 w-3 text-emerald-400" />
            </button>

            <button
              onClick={() =>
                openWhatsAppWithMessage('Hi Himanshu, I have a custom editing requirement.')
              }
              className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 p-2 text-left text-xs font-medium text-slate-200 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-colors"
            >
              <span>⚡ Custom Quote Request</span>
              <Send className="h-3 w-3 text-emerald-400" />
            </button>
          </div>

          <div className="mt-3 pt-2 border-t border-white/10 text-center">
            <span className="text-[10px] text-slate-400">
              WhatsApp: {settings.whatsappNumber}
            </span>
          </div>
        </div>
      )}

      {/* Floating Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 hover:scale-105 hover:bg-emerald-400 active:scale-95 transition-all"
        title="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </span>
        <MessageCircle className="h-7 w-7 text-black fill-black" />
      </button>
    </div>
  );
};
