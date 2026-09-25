import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface LegalPagesProps {
  type: 'terms' | 'privacy';
}

export const LegalPages: React.FC<LegalPagesProps> = ({ type }) => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-white/10 pb-4">
        <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider">
          Legal & Trust
        </span>
        <h1 className="font-heading text-3xl font-black text-white mt-1">
          {type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
        </h1>
        <p className="text-xs text-slate-400">
          Last revised: October 2025 • Himanshu Edit Hub
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[#0d121e] p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        {type === 'terms' ? (
          <>
            <div>
              <h3 className="font-heading text-base font-bold text-white mb-2">
                1. Video Editing Services & Scope
              </h3>
              <p>
                Himanshu Edit Hub provides professional post-production editing services for short-form
                vertical content (Instagram Reels, YouTube Shorts), long-form editing, and commercial brand
                campaigns. Individual editing starts at ₹10 per video. Final quotes depend on footage length,
                special effects, and complexity.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-base font-bold text-white mb-2">
                2. Revisions & Satisfaction Guarantee
              </h3>
              <p>
                Every order comes with dedicated revision rounds. Revisions must be requested within 7 days
                of preview delivery using our dashboard timecode tool. Revisions cover text changes, audio
                levels, transition swaps, and pace timing.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-base font-bold text-white mb-2">
                3. Payment, UPI & Gateway Security
              </h3>
              <p>
                Payments are processed via authorized Indian payment methods including UPI (official ID:
                himanshu2121@fam) and Razorpay gateway. We never store or log raw credit/debit card numbers.
                Payment receipts are digitally generated upon completion.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-base font-bold text-white mb-2">
                4. Ownership & Intellectual Property
              </h3>
              <p>
                Clients retain full ownership of all raw footage and final rendered videos. Himanshu Edit Hub
                reserves the right to display edited clips in public showreels and portfolios unless an NDA
                or private delivery is requested prior to ordering.
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <h3 className="font-heading text-base font-bold text-white mb-2">
                1. Footage Confidentiality & Data Protection
              </h3>
              <p>
                Your raw video files, audio tracks, and reference assets are strictly confidential. We never
                sell, distribute, or publicly leak unedited customer footage or private creator media.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-base font-bold text-white mb-2">
                2. Information Collected
              </h3>
              <p>
                We collect your name, email, WhatsApp number, Instagram username, and brand kit preferences
                solely to provide video editing fulfillment, communication, and order status updates.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-base font-bold text-white mb-2">
                3. File Retention Policy
              </h3>
              <p>
                Raw video files and project files are safely archived on secure cloud storage for 30 days
                following project delivery, after which raw project archives are purged unless the creator is
                subscribed to a continuous monthly plan.
              </p>
            </div>
          </>
        )}

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 flex items-center gap-3 text-xs text-emerald-300">
          <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>
            Compliant with Indian IT Act and digital service consumer protection guidelines.
          </span>
        </div>
      </div>
    </div>
  );
};
