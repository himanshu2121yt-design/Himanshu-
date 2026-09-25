import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How much does editing cost?',
      a: 'Individual short video editing starts at just ₹10 per video for basic cuts, music, and subtitles. Final pricing depends on project length, editing complexity, motion graphics, and revision requirements. For recurring volume, our monthly Creator Plans start at ₹299/mo (30 videos). Brand promotions range from ₹300 to ₹10,000+.',
    },
    {
      q: 'How do I send my videos and raw footage?',
      a: 'You can upload video files directly through our web app (MP4, MOV, AVI, ZIP up to 500MB) or paste a link to Google Drive, Dropbox, or WeTransfer in the order form. Once submitted, our editors pull the assets and begin assembly.',
    },
    {
      q: 'How long does editing take?',
      a: 'Our standard queue delivery is 24 to 48 hours for short-form reels and shorts. If you select Express Delivery in the order form, your video will be prioritized and delivered within 12–24 hours.',
    },
    {
      q: 'Can I request revisions?',
      a: 'Yes, absolutely! You can request revisions directly from your Customer Dashboard. Simply specify the exact timestamps (e.g. 0:14) and instructions. We revise until your reel matches your vision.',
    },
    {
      q: 'Do you edit Instagram Reels and YouTube Shorts?',
      a: 'Yes, 9:16 vertical formatting with high-retention typography (Alex Hormozi style, dynamic emojis, sound effects, beat-sync cuts, and hook optimization) is our core specialty.',
    },
    {
      q: 'Do you work with brands and commercial clients?',
      a: 'Yes! We collaborate with brands for sponsored reels, UGC-style promotional videos, product unboxings, and paid advertisement creatives. Visit our Brand Collaboration page to submit a brief.',
    },
    {
      q: 'How can a brand hire Himanshu?',
      a: 'Brands can submit a campaign proposal on our Brand Collaboration page or reach out directly on WhatsApp. We provide a customized quote, media kit, and storyboard proposal within 12 hours.',
    },
    {
      q: 'How do monthly Creator Subscription Credits work?',
      a: 'When you subscribe (e.g., Growth Creator with 75 credits), 1 standard short video edit consumes 1 credit. Advanced VFX edits may consume 2 credits. You simply click "Use Credit", submit your clip, and your remaining balance updates automatically.',
    },
    {
      q: 'What payment methods are supported?',
      a: 'We support all major Indian payment options: UPI (Google Pay, PhonePe, Paytm using handle himanshu2121@fam with instant 1-tap mobile intent), Razorpay, Credit & Debit Cards (Visa, Mastercard, RuPay), and 50+ Net Banking banks.',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20">
          <HelpCircle className="h-3.5 w-3.5" /> Frequently Asked Questions
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
          Everything You Need to Know
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Clear answers about pricing starting at ₹10, video turnaround, files, and brand partnerships.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'border-amber-500/40 bg-[#0e1422] shadow-lg'
                  : 'border-white/10 bg-[#0a0d16] hover:border-white/20'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-heading text-sm sm:text-base font-bold text-white pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-amber-400 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
