import React, { useState } from 'react';
import { CheckCircle2, MessageSquare, Sparkles, Star, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReviewsPage: React.FC = () => {
  const { reviews, submitReview } = useApp();

  const [name, setName] = useState('');
  const [instagram, setInstagram] = useState('');
  const [rating, setRating] = useState(5);
  const [service, setService] = useState('Short Video Editing');
  const [reviewText, setReviewText] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview({
      name,
      avatar,
      instagram: instagram || undefined,
      rating,
      service,
      review: reviewText,
    });
    setSubmitted(true);
  };

  const approvedReviews = reviews.filter((r) => r.approved);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20">
          <Star className="h-3.5 w-3.5 fill-amber-400" /> Creator Feedback
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
          Client Reviews & Testimonials
        </h1>
        <p className="text-sm text-slate-300">
          Real feedback from Instagram creators, YouTube influencers, and brand marketing teams.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedReviews.map((rev) => (
          <div
            key={rev.id}
            className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0d121e] p-6 shadow-xl space-y-4"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{rev.review}"
              </p>
            </div>

            <div className="flex items-center gap-3 border-t border-white/10 pt-4">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="h-10 w-10 rounded-full object-cover border border-amber-500/30"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">{rev.name}</h4>
                {rev.instagram && (
                  <p className="text-[10px] text-amber-400 font-medium">{rev.instagram}</p>
                )}
                <span className="text-[10px] text-slate-500 block">{rev.service} • {rev.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Review Card */}
      <div className="rounded-3xl border border-white/10 bg-[#0d121e] p-8 max-w-2xl mx-auto shadow-2xl space-y-6">
        <div className="text-center space-y-1">
          <h3 className="font-heading text-2xl font-bold text-white">Share Your Experience</h3>
          <p className="text-xs text-slate-400">
            Worked with Himanshu or our editing team? Leave your review below!
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center space-y-3">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-white text-base">Review Submitted!</h4>
            <p className="text-xs text-slate-300">
              Thank you! Your review has been submitted for moderation and will appear publicly once
              approved by Himanshu.
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
                  placeholder="e.g. Vicky Rathore"
                  className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Instagram Handle</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Service Received *</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2 text-white"
                >
                  <option value="Short Video Editing">Short Video Editing (₹10+)</option>
                  <option value="Starter Creator Plan">Starter Creator Plan</option>
                  <option value="Growth Creator Plan">Growth Creator Plan</option>
                  <option value="Pro Creator Plan">Pro Creator Plan</option>
                  <option value="Reels Package">Reels Package Bundle</option>
                  <option value="Brand Promotion">Brand Promotion Campaign</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Star Rating</label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="text-amber-400 p-1"
                    >
                      <Star
                        className={`h-5 w-5 ${s <= rating ? 'fill-amber-400' : 'text-slate-600'}`}
                      />
                    </button>
                  ))}
                  <span className="font-bold text-white ml-2">{rating} / 5 Stars</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Your Review *</label>
              <textarea
                rows={3}
                required
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="How was the video turnaround, quality, beat sync, and retention?"
                className="w-full rounded-xl bg-black/50 border border-white/10 px-3.5 py-2 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 shadow-md"
            >
              Submit Review for Approval
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
