import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileVideo,
  Info,
  Link,
  Lock,
  Paperclip,
  ShieldCheck,
  Sparkles,
  Upload,
  User,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceType } from '../types';

interface HireMePageProps {
  setActiveTab: (tab: string) => void;
}

export const HireMePage: React.FC<HireMePageProps> = ({ setActiveTab }) => {
  const { currentUser, createOrder, openCheckout, settings } = useApp();

  // 13 Fields state
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [whatsapp, setWhatsapp] = useState(currentUser?.phone || '+91 ');
  const [instagram, setInstagram] = useState(currentUser?.instagram || '@');
  const [service, setService] = useState<ServiceType>('Short Video Editing');
  const [numberOfVideos, setNumberOfVideos] = useState(1);
  const [videoLength, setVideoLength] = useState('30-45 sec');
  const [editingStyle, setEditingStyle] = useState('Alex Hormozi Viral Kinetic Captions');
  const [deadline, setDeadline] = useState('48 Hours (Standard)');
  const [budget, setBudget] = useState(10);
  const [referenceLink, setReferenceLink] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  
  // File upload simulation
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; url: string; type: string }[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any | null>(null);

  // File handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // Validate size (max 500MB)
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          setUploadedFiles((f) => [
            ...f,
            {
              name: file.name,
              size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
              url: URL.createObjectURL(file),
              type: file.type,
            },
          ]);
          return null;
        }
        return prev + 25;
      });
    }, 200);
  };

  const removeFile = (idx: number) => {
    setUploadedFiles((f) => f.filter((_, i) => i !== idx));
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      const newOrder = createOrder({
        customerName: name || 'Creator Client',
        customerEmail: email || 'client@example.com',
        whatsapp,
        instagram,
        service,
        packageTitle: `${numberOfVideos}x ${service}`,
        numberOfVideos,
        videoLength,
        editingStyle,
        deadline,
        budget,
        finalPrice: budget,
        referenceLink,
        uploadedFiles,
        additionalInstructions,
      });

      setSubmittedOrder(newOrder);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20">
          <Sparkles className="h-3.5 w-3.5" /> Direct Booking Form
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-white">
          Hire Himanshu & The Editing Team
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Starting at just ₹10 per video. Fill out your project details below to initiate your order.
        </p>
      </div>

      {submittedOrder ? (
        /* Success Confirmation Box */
        <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#0c181f] to-[#091016] p-8 sm:p-10 text-center shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <CheckCircle2 className="h-12 w-12" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="rounded bg-emerald-500/20 px-3 py-1 font-mono text-xs font-bold text-emerald-300">
              Order #{submittedOrder.orderNumber}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
              Request Received!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Himanshu or the editing team will contact you shortly on WhatsApp (
              <strong className="text-white">{submittedOrder.whatsapp}</strong>) or email to confirm
              the project specs and final timeline.
            </p>
          </div>

          {/* Quick Pay / Confirm Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Service:</span>
              <span className="font-bold text-white">{submittedOrder.service}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Videos Count:</span>
              <span className="font-bold text-white">{submittedOrder.numberOfVideos}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Estimated Starting Price:</span>
              <span className="font-bold text-amber-400 text-sm">₹{submittedOrder.budget}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2 max-w-md mx-auto">
            <button
              onClick={() => {
                openCheckout({
                  title: `Order #${submittedOrder.orderNumber} - ${submittedOrder.service}`,
                  amount: submittedOrder.budget,
                  serviceType: submittedOrder.service,
                  orderId: submittedOrder.id,
                });
              }}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
            >
              <Zap className="h-4 w-4 fill-black" />
              <span>Pay Starting ₹{submittedOrder.budget} via UPI</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className="flex-1 rounded-xl border border-white/10 bg-white/10 py-3 text-xs font-bold text-white hover:bg-white/20 transition-all"
            >
              Track in Dashboard
            </button>
          </div>

          <button
            onClick={() => setSubmittedOrder(null)}
            className="text-xs text-slate-500 hover:text-slate-300 block mx-auto pt-2"
          >
            ← Submit Another Video Project
          </button>
        </div>
      ) : (
        /* 13-field Order Form */
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#0d121e] p-6 sm:p-10 shadow-2xl space-y-8"
        >
          {/* Section 1: Contact Details */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                1
              </span>
              Creator / Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. Name */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  1. Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* 2. Email */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  2. Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* 3. WhatsApp Number */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  3. WhatsApp Number * (For fast proofing)
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* 4. Instagram Username */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  4. Instagram Username *
                </label>
                <input
                  type="text"
                  required
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Project Specifications */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                2
              </span>
              Editing Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 5. Service Required */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  5. Service Required *
                </label>
                <select
                  value={service}
                  onChange={(e) => {
                    const sel = e.target.value as ServiceType;
                    setService(sel);
                    if (sel === 'Short Video Editing') setBudget(10 * numberOfVideos);
                    else if (sel === 'Advanced Video Editing') setBudget(99 * numberOfVideos);
                    else if (sel === 'Brand Promotion') setBudget(499);
                  }}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="Short Video Editing">Short Video Editing (Starts ₹10/vid)</option>
                  <option value="Advanced Video Editing">Advanced Video Editing (Custom)</option>
                  <option value="Brand Promotion">Brand Promotion (₹300 - ₹10,000+)</option>
                  <option value="Creator Package">Creator Package (10-100 vids)</option>
                </select>
              </div>

              {/* 6. Number of videos */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  6. Number of Videos *
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={numberOfVideos}
                  onChange={(e) => {
                    const num = parseInt(e.target.value) || 1;
                    setNumberOfVideos(num);
                    if (service === 'Short Video Editing') setBudget(10 * num);
                  }}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              {/* 7. Video Length */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  7. Target Video Length *
                </label>
                <select
                  value={videoLength}
                  onChange={(e) => setVideoLength(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="15-30 sec">15 – 30 seconds (Fast Viral Hook)</option>
                  <option value="30-45 sec">30 – 45 seconds (Story / Tip)</option>
                  <option value="45-60 sec">45 – 60 seconds (Full Reel / Short)</option>
                  <option value="60-90 sec">60 – 90 seconds (Extended)</option>
                  <option value="Over 2 mins">2+ minutes (Mini Vlog / Tutorial)</option>
                </select>
              </div>

              {/* 8. Editing Style */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  8. Editing Style *
                </label>
                <select
                  value={editingStyle}
                  onChange={(e) => setEditingStyle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="Alex Hormozi Viral Kinetic Captions">
                    Alex Hormozi Style (Bold Yellow/White text + Emojis + SFX)
                  </option>
                  <option value="Ali Abdaal Clean Minimalist">
                    Ali Abdaal Style (Clean, elegant, calm paper textures)
                  </option>
                  <option value="High-Energy Gym/Fitness Beat Drop">
                    High-Energy Fitness / Workout (Heavy bass drops & zooms)
                  </option>
                  <option value="Aesthetic Pastel Lifestyle Vlog">
                    Aesthetic Pastel Vlog (Film grain, lo-fi beats, chill)
                  </option>
                  <option value="Tech / Gadget Unboxing with Overlays">
                    Tech / Product (Specs callouts & sleek sound effects)
                  </option>
                  <option value="Custom / Match My Existing Style">
                    Custom (Match my personal profile style)
                  </option>
                </select>
              </div>

              {/* 9. Deadline */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  9. Required Delivery Deadline *
                </label>
                <select
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="48 Hours (Standard)">48 Hours (Standard Queue)</option>
                  <option value="24 Hours (Express)">24 Hours (Express Turnaround)</option>
                  <option value="12 Hours (Urgent)">12 Hours (Urgent Rush)</option>
                  <option value="3-5 Days (Relaxed)">3–5 Days (Batched)</option>
                </select>
              </div>

              {/* 10. Budget */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  10. Initial Budget (₹ INR) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-amber-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="10"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value) || 10)}
                    className="w-full rounded-xl border border-white/10 bg-black/50 pl-8 pr-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none font-mono"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Starting at ₹10/video. Final quote verified on submission.
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Creative References & Assets */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                3
              </span>
              Files, References & Instructions
            </h3>

            <div className="space-y-4">
              {/* 11. Reference Video / Link */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  11. Reference Video / Instagram Reel / Drive Link
                </label>
                <div className="relative">
                  <Link className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="url"
                    value={referenceLink}
                    onChange={(e) => setReferenceLink(e.target.value)}
                    placeholder="https://instagram.com/reel/... or Google Drive link"
                    className="w-full rounded-xl border border-white/10 bg-black/50 pl-9 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* 12. Upload Video / Files */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  12. Upload Raw Video / Reference Files (MP4, MOV, AVI, JPG, PNG, PDF)
                </label>

                <div className="rounded-2xl border-2 border-dashed border-white/15 bg-black/30 p-6 text-center hover:border-amber-500/40 transition-colors">
                  <input
                    type="file"
                    id="video-upload"
                    multiple
                    accept=".mp4,.mov,.avi,.jpg,.jpeg,.png,.pdf,.zip"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="video-upload"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-bold text-white">
                      Click to upload video clips or drag & drop files
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Supports MP4, MOV, AVI, JPG, PNG, PDF, or ZIP archive up to 500MB
                    </p>
                  </label>
                </div>

                {/* Upload Progress Bar */}
                {uploadProgress !== null && (
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>Uploading raw footage...</span>
                      <span className="font-mono text-amber-400">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-500 h-1.5 transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Uploaded File List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <FileVideo className="h-4 w-4 text-amber-400" />
                          <span className="text-white font-medium">{file.name}</span>
                          <span className="text-[10px] text-slate-400">({file.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-slate-400 hover:text-red-400 p-1"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 13. Additional Instructions */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  13. Additional Instructions / Notes
                </label>
                <textarea
                  rows={3}
                  value={additionalInstructions}
                  onChange={(e) => setAdditionalInstructions(e.target.value)}
                  placeholder="Specify any sound effects, exact text to highlight, music vibe, or timestamps to cut..."
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing Note */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-center">
            <p className="text-xs text-amber-300">
              💡 <strong>Price Transparency:</strong> Short video editing starts at ₹10/video. The
              final quote will be confirmed by Himanshu based on your complexity and video length.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 py-4 text-sm font-black text-black shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 transition-all active:scale-[0.99]"
          >
            {submitting ? (
              <span>Submitting Project Request...</span>
            ) : (
              <>
                <Sparkles className="h-4 w-4 fill-black" />
                <span>Submit Editing Request (Starting ₹{budget})</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
