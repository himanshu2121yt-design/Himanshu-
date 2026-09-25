import React, { useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileText,
  Paperclip,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingUp,
  Upload,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BrandCollabPageProps {
  setActiveTab: (tab: string) => void;
}

export const BrandCollabPage: React.FC<BrandCollabPageProps> = ({ setActiveTab }) => {
  const { submitBrandInquiry, settings } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('+91 ');
  const [instagramOrWebsite, setInstagramOrWebsite] = useState('');
  const [productService, setProductService] = useState('');
  const [campaignType, setCampaignType] = useState('UGC-style promotional videos');
  const [numberOfVideos, setNumberOfVideos] = useState(2);
  const [campaignDeadline, setCampaignDeadline] = useState('');
  const [budget, setBudget] = useState('₹1,500 – ₹3,000');
  const [requirements, setRequirements] = useState('');
  const [briefFileName, setBriefFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitBrandInquiry({
      companyName,
      contactPerson,
      email,
      whatsapp,
      instagramOrWebsite,
      productService,
      campaignType,
      numberOfVideos,
      campaignDeadline: campaignDeadline || '2 Weeks',
      budget,
      requirements,
      briefFileName: briefFileName || undefined,
    });
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20">
          <Briefcase className="h-3.5 w-3.5" /> Commercial Partnerships
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-white">
          Brand Collaboration & Influencer Promotion
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Hire Himanshu for sponsored Instagram Reels, UGC-style promotional clips, and high-impact
          video marketing campaigns. Budget range: ₹300 – ₹10,000+.
        </p>
      </div>

      {submitted ? (
        /* Proposal Received */
        <div className="rounded-3xl border border-emerald-500/40 bg-[#0d161d] p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <CheckCircle2 className="h-12 w-12" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
              Brand Proposal Sent!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Thank you, <strong>{contactPerson}</strong>. Himanshu will review{' '}
              <strong>{companyName}</strong>'s campaign brief and respond with a customized proposal,
              media kit, and formal quotation within 12 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('home')}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg"
            >
              Back to Home
            </button>
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hi Himanshu, I just submitted a brand collaboration proposal for ${companyName}.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold text-white hover:bg-white/10"
            >
              Follow-up on WhatsApp
            </a>
          </div>
        </div>
      ) : (
        /* Form */
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#0d121e] p-6 sm:p-10 shadow-2xl space-y-8"
        >
          {/* Company Details */}
          <div>
            <h3 className="font-heading text-base font-bold text-white flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                1
              </span>
              Company & Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Brand / Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Nutrition Co."
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Ananya Sen (Marketing Head)"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Official Business Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="collab@brand.com"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  WhatsApp / Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Instagram Handle or Website *
                </label>
                <input
                  type="text"
                  required
                  value={instagramOrWebsite}
                  onChange={(e) => setInstagramOrWebsite(e.target.value)}
                  placeholder="https://brand.com or @brand_official"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Campaign Details */}
          <div>
            <h3 className="font-heading text-base font-bold text-white flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                2
              </span>
              Campaign Strategy & Scope
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Product / Service to Promote *
                </label>
                <input
                  type="text"
                  required
                  value={productService}
                  onChange={(e) => setProductService(e.target.value)}
                  placeholder="e.g. Wireless Noise-cancelling Headphone Launch"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Campaign Type *
                </label>
                <select
                  value={campaignType}
                  onChange={(e) => setCampaignType(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="UGC-style promotional videos">UGC-Style Promotional Videos</option>
                  <option value="Instagram Reel promotion">Dedicated Instagram Reel Promotion</option>
                  <option value="Product promotion & unboxing">Product Unboxing & Feature Showcase</option>
                  <option value="Brand awareness videos">High-Paced Brand Awareness Clips</option>
                  <option value="Social media advertisements">Paid Social Media Ads (Meta/YouTube)</option>
                  <option value="Short promotional campaigns">Multi-Reel Short Promotional Campaign</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Number of Videos Required *
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={numberOfVideos}
                  onChange={(e) => setNumberOfVideos(parseInt(e.target.value) || 1)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Campaign Budget Range *
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="₹300 – ₹1,000">₹300 – ₹1,000 (Micro UGC)</option>
                  <option value="₹1,000 – ₹3,000">₹1,000 – ₹3,000 (Standard Single Reel)</option>
                  <option value="₹3,000 – ₹6,000">₹3,000 – ₹6,000 (Multi-Video Campaign)</option>
                  <option value="₹6,000 – ₹10,000+">₹6,000 – ₹10,000+ (Comprehensive Brand Package)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Target Launch Deadline *
                </label>
                <input
                  type="date"
                  value={campaignDeadline}
                  onChange={(e) => setCampaignDeadline(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Campaign Requirements & Key Messaging *
                </label>
                <textarea
                  rows={3}
                  required
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Tell us what makes your product unique, must-have call to actions, discount codes, or preferred aesthetics..."
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Upload Campaign Brief (PDF / DOCX / Deck)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    id="brief-file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setBriefFileName(e.target.files[0].name);
                      }
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="brief-file"
                    className="cursor-pointer flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/10"
                  >
                    <Upload className="h-4 w-4 text-amber-400" />
                    <span>Choose Brief File</span>
                  </label>
                  {briefFileName && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      {briefFileName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 py-4 text-sm font-black text-black shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all active:scale-[0.99]"
          >
            <Sparkles className="h-4 w-4 fill-black" />
            <span>Send Brand Proposal</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
};
