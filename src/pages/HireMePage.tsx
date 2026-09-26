import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileVideo,
  Info,
  Link,
  Lock,
  Paperclip,
  ShieldCheck,
  Sparkles,
  Star,
  Upload,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceType } from '../types';
import { OurTeam, EditorChoice } from '../components/OurTeam';

interface HireMePageProps {
  setActiveTab: (tab: string) => void;
}

export const HireMePage: React.FC<HireMePageProps> = ({ setActiveTab }) => {
  const { currentUser, createOrder, openCheckout, settings } = useApp();

  // Selected Editor state: 'himanshu' | 'vaibhav' | 'both'
  const [selectedEditor, setSelectedEditor] = useState<'himanshu' | 'vaibhav' | 'both'>('himanshu');

  // Contact Details
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [whatsapp, setWhatsapp] = useState(currentUser?.phone || '+91 ');
  const [instagram, setInstagram] = useState(currentUser?.instagram || '@');
  
  // Specifications
  const [service, setService] = useState<ServiceType>('Short Video Editing');
  const [numberOfVideos, setNumberOfVideos] = useState(1);
  const [videoLength, setVideoLength] = useState('30-45 sec');
  const [editingStyle, setEditingStyle] = useState('Alex Hormozi Viral Kinetic Captions');
  const [deadline, setDeadline] = useState('48 Hours (Standard)');
  const [isExpressDelivery, setIsExpressDelivery] = useState(false);
  const [referenceLink, setReferenceLink] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  
  // File upload simulation
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; url: string; type: string }[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any | null>(null);

  // Compute calculated pricing
  const calculateTotal = () => {
    let basePricePerVideo = 10;
    if (service === 'Advanced Video Editing') basePricePerVideo = 99;
    else if (service === 'Brand Promotion') return 499 + (isExpressDelivery ? 50 : 0);
    else if (service === 'Creator Package') return 99 * Math.max(1, Math.ceil(numberOfVideos / 10)) + (isExpressDelivery ? 50 : 0);

    const baseSum = basePricePerVideo * Math.max(1, numberOfVideos);
    const expressFee = isExpressDelivery ? 50 : 0;
    return baseSum + expressFee;
  };

  const currentPrice = calculateTotal();

  // File handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    setUploadProgress(15);
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
    }, 180);
  };

  const removeFile = (idx: number) => {
    setUploadedFiles((f) => f.filter((_, i) => i !== idx));
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const editorNames = {
      himanshu: 'Himanshu Pandit',
      vaibhav: 'Vaibhav',
      both: 'Himanshu Pandit & Vaibhav (Both Editors)',
    };
    const editorIds = {
      himanshu: 'user-owner',
      vaibhav: 'user-editor-1',
      both: 'collab-both',
    };

    setTimeout(() => {
      setSubmitting(false);
      const newOrder = createOrder({
        customerName: name || 'Creator Client',
        customerEmail: email || 'client@example.com',
        whatsapp,
        instagram,
        service,
        packageTitle: `${numberOfVideos}x ${service} (${editorNames[selectedEditor]})`,
        numberOfVideos,
        videoLength,
        editingStyle,
        deadline: isExpressDelivery ? '12–24 Hours (Express Turnaround)' : deadline,
        budget: currentPrice,
        finalPrice: currentPrice,
        referenceLink,
        uploadedFiles,
        additionalInstructions,
        assignedEditorId: editorIds[selectedEditor],
        assignedEditorName: editorNames[selectedEditor],
        isExpressDelivery,
        expressFee: isExpressDelivery ? 50 : 0,
        reducedTime: isExpressDelivery ? '12–24 Hours' : undefined,
      });

      setSubmittedOrder(newOrder);
    }, 700);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20">
          <Sparkles className="h-3.5 w-3.5" /> Direct Booking Form (Starts ₹10)
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-white">
          Hire Your Video Editor
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Select between <strong className="text-amber-400">Himanshu Pandit</strong>, <strong className="text-sky-400">Vaibhav</strong>, or choose <strong className="text-emerald-400">Both Editors</strong> to collaborate on your video starting at just ₹10.
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
              Project Request Received!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Assigned Editor:{' '}
              <strong className="text-amber-400 font-bold">{submittedOrder.assignedEditorName}</strong>.
              We will reach out to you on WhatsApp (<strong className="text-white">{submittedOrder.whatsapp}</strong>) to confirm the creative brief.
            </p>
          </div>

          {/* Quick Pay / Confirm Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Service:</span>
              <span className="font-bold text-white">{submittedOrder.service}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Assigned Editor:</span>
              <span className="font-bold text-amber-300">{submittedOrder.assignedEditorName}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Videos Count:</span>
              <span className="font-bold text-white">{submittedOrder.numberOfVideos}</span>
            </div>
            {submittedOrder.isExpressDelivery && (
              <div className="flex justify-between text-amber-400 font-semibold">
                <span>Express Delivery (12–24h):</span>
                <span>+₹50</span>
              </div>
            )}
            <div className="flex justify-between border-t border-white/10 pt-2 text-slate-200">
              <span className="font-bold">Total Amount:</span>
              <span className="font-bold text-amber-400 text-sm">₹{submittedOrder.finalPrice || submittedOrder.budget}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2 max-w-md mx-auto">
            <button
              onClick={() => {
                openCheckout({
                  title: `Order #${submittedOrder.orderNumber} - ${submittedOrder.service}`,
                  amount: submittedOrder.finalPrice || submittedOrder.budget,
                  serviceType: submittedOrder.service,
                  orderId: submittedOrder.id,
                });
              }}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
            >
              <Zap className="h-4 w-4 fill-black" />
              <span>Pay ₹{submittedOrder.finalPrice || submittedOrder.budget} via UPI</span>
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
            ← Submit Another Project
          </button>
        </div>
      ) : (
        /* Order Form */
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#0d121e] p-6 sm:p-10 shadow-2xl space-y-8"
        >
          {/* STEP 1: OUR TEAM & EDITOR SELECTION COMPONENT */}
          <div className="space-y-4">
            <OurTeam
              selectedEditor={selectedEditor}
              onSelectEditor={(editor) => setSelectedEditor(editor)}
              isInteractive={true}
            />

            {/* Editor selection confirmation badge */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-300">
                Assigned to your project:{' '}
                <strong className="text-amber-400 font-bold">
                  {selectedEditor === 'himanshu'
                    ? 'Himanshu Pandit (Studio Founder & Lead Visual Artist)'
                    : selectedEditor === 'vaibhav'
                    ? 'Vaibhav (Senior Motion & Beat-Sync Editor)'
                    : 'Both Editors: Himanshu Pandit & Vaibhav (Collaborative Master Cut)'}
                </strong>
              </span>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 shrink-0">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ready for Assignment (Queue: Active)</span>
              </span>
            </div>
          </div>

          {/* SECTION 2: CONTACT DETAILS */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                2
              </span>
              Creator / Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Full Name *
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

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Email Address *
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

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  WhatsApp Number * (For fast draft delivery)
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

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Instagram Username *
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

          {/* SECTION 3: EDITING SPECIFICATIONS */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                3
              </span>
              Editing Specifications & Timeline
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Service Required *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value as ServiceType)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="Short Video Editing">Short Video Editing (Starts ₹10/vid)</option>
                  <option value="Advanced Video Editing">Advanced Video Editing (Custom)</option>
                  <option value="Brand Promotion">Brand Promotion (₹300 - ₹10,000+)</option>
                  <option value="Creator Package">Creator Package (10-100 vids)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Number of Videos *
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={numberOfVideos}
                  onChange={(e) => setNumberOfVideos(parseInt(e.target.value) || 1)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Target Video Length *
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

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Editing Style *
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
            </div>

            {/* Express Delivery Option Toggle */}
            <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 transition-all">
              <label className="flex items-start sm:items-center justify-between gap-3 cursor-pointer">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-amber-500 text-black px-2 py-0.5 text-[10px] font-black uppercase flex items-center gap-1">
                      <Zap className="h-3 w-3 fill-black" /> Express Delivery
                    </span>
                    <span className="text-xs font-bold text-white">
                      Faster Turnaround (12–24 Hours)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Jump to the front of {selectedEditor === 'both' ? 'both editors\'' : 'the editor\'s'} queue for express 12–24h rush rendering.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono font-bold text-amber-400">+₹50</span>
                  <input
                    type="checkbox"
                    checked={isExpressDelivery}
                    onChange={(e) => setIsExpressDelivery(e.target.checked)}
                    className="h-5 w-5 rounded border-white/20 bg-black/60 text-amber-500 focus:ring-amber-400"
                  />
                </div>
              </label>
            </div>
          </div>

          {/* SECTION 4: FILES & REFERENCES */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                4
              </span>
              Files, References & Notes
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Reference Video / Reel / Drive Link
                </label>
                <div className="relative">
                  <Link className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="url"
                    value={referenceLink}
                    onChange={(e) => setReferenceLink(e.target.value)}
                    placeholder="https://instagram.com/reel/... or Google Drive folder"
                    className="w-full rounded-xl border border-white/10 bg-black/50 pl-9 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Upload Raw Footage / Video Files
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

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Specific Editing Instructions / Notes
                </label>
                <textarea
                  rows={3}
                  value={additionalInstructions}
                  onChange={(e) => setAdditionalInstructions(e.target.value)}
                  placeholder="Specify key sound effects, text highlights, music vibe, or timestamps to cut..."
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SUMMARY & SUBMIT */}
          <div className="rounded-2xl border border-amber-500/30 bg-black/50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Order Estimation</span>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-2xl font-black text-amber-400">₹{currentPrice}</span>
                <span className="text-xs text-slate-400">
                  ({numberOfVideos} video{numberOfVideos > 1 ? 's' : ''} • {selectedEditor === 'both' ? 'Both Editors Collab' : selectedEditor === 'vaibhav' ? 'Vaibhav' : 'Himanshu Pandit'})
                </span>
              </div>
              {isExpressDelivery && (
                <span className="text-[11px] text-amber-300 font-semibold block mt-0.5">
                  ⚡ Express Priority Delivery (12–24h) included
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 px-8 py-3.5 text-sm font-black text-black shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 transition-all active:scale-[0.99]"
            >
              {submitting ? (
                <span>Registering Project...</span>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 fill-black" />
                  <span>Submit Order (₹{currentPrice})</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
