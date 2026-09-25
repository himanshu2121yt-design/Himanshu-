import React, { useState } from 'react';
import {
  CheckCircle2,
  Instagram,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
  Youtube,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { settings } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20">
          <MessageCircle className="h-3.5 w-3.5" /> Get in Touch
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
          Contact Himanshu Edit Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Have an inquiry, custom editing project, or sponsorship proposal? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Creator Info Card */}
        <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#0d121e] p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-black">
              <img
                src="/src/assets/images/himanshu_profile_1790318843205.jpg"
                alt="Himanshu"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-white">{settings.creatorName}</h3>
              <p className="text-xs text-amber-400 font-medium">Founder & Lead Video Editor</p>
              <p className="text-[11px] text-slate-400">Himanshu Edit Hub</p>
            </div>
          </div>

          <div className="space-y-3 text-xs border-t border-white/10 pt-4">
            <a
              href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-pink-500/30 bg-pink-500/10 p-3 text-pink-300 hover:bg-pink-500/20 transition-colors"
            >
              <Instagram className="h-5 w-5 text-pink-400" />
              <div>
                <span className="font-bold block">Instagram Direct Message</span>
                <span className="text-[11px] text-pink-200">{settings.instagramHandle}</span>
              </div>
            </a>

            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hi Himanshu, I want to talk about video editing.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
            >
              <MessageCircle className="h-5 w-5 text-emerald-400" />
              <div>
                <span className="font-bold block">WhatsApp Chat</span>
                <span className="text-[11px] text-emerald-200">{settings.whatsappNumber}</span>
              </div>
            </a>

            <a
              href={`mailto:${settings.emailAddress}`}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200 hover:bg-white/10 transition-colors"
            >
              <Mail className="h-5 w-5 text-amber-400" />
              <div>
                <span className="font-bold block">Email Inquiries</span>
                <span className="text-[11px] text-slate-400">{settings.emailAddress}</span>
              </div>
            </a>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] text-amber-300/90 text-center">
            ⚡ Typical response time: Under 2 hours during active studio hours.
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0d121e] p-6 sm:p-8 shadow-xl">
          <h3 className="font-heading text-xl font-bold text-white mb-2">Send a Message</h3>
          <p className="text-xs text-slate-400 mb-6">
            Leave your contact details and message, and Himanshu will respond via email or WhatsApp.
          </p>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-base">Message Sent!</h4>
              <p className="text-xs text-slate-300">
                Thank you, {name}. We will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mayank Rawat"
                    className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">WhatsApp / Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Your Message / Inquiry *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help your content or brand?"
                  className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 shadow-md transition-all"
              >
                Send Direct Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
