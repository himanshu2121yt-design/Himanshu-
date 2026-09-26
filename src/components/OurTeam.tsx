import React from 'react';
import {
  Check,
  Clock,
  Flame,
  Layers,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
  Zap,
} from 'lucide-react';

export type EditorChoice = 'himanshu' | 'vaibhav' | 'both';

export interface EditorMember {
  id: EditorChoice;
  name: string;
  role: string;
  badge: string;
  avatar: string;
  secondaryAvatar?: string;
  rating: number;
  completedCount: string;
  availability: string;
  availabilityColor: string;
  bio: string;
  specialties: string[];
  software: string[];
  startingPrice: string;
  featuredHook: string;
}

export const TEAM_MEMBERS: EditorMember[] = [
  {
    id: 'himanshu',
    name: 'Himanshu Pandit',
    role: 'Studio Founder & Lead Visual Artist',
    badge: 'Founder Choice',
    avatar: '/src/assets/images/himanshu_profile_1790318843205.jpg',
    rating: 5.0,
    completedCount: '450+ Videos',
    availability: 'Available Now • 12–24h Priority Queue',
    availabilityColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    bio: 'Pioneer of high-retention vertical edits. Specializes in Alex Hormozi kinetic typography, 3-second hook retention, audio sound design, and narrative flow that stops the scroll.',
    specialties: [
      'Viral Kinetic Captions',
      '3-Second Retention Hooks',
      'Sound Design & Audio SFX',
      'Color Grading & Glows',
    ],
    software: ['Premiere Pro', 'After Effects', 'Audition', 'DaVinci'],
    startingPrice: '₹10 / video',
    featuredHook: '“Edits designed to keep average watch time above 85%.”',
  },
  {
    id: 'vaibhav',
    name: 'Vaibhav',
    role: 'Senior Motion & Beat-Sync Editor',
    badge: 'Motion Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 4.9,
    completedCount: '380+ Videos',
    availability: 'Available Now • Fast Turnaround',
    availabilityColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    bio: 'Master of dynamic cuts and energetic rhythm. Specializes in aggressive gym workouts, sneaker drops, speed ramps, camera zooms, and bass-drop audio synchronization.',
    specialties: [
      'Heavy Beat-Sync Transitions',
      'High-Speed Action Ramps',
      'Gym & Lifestyle Energy Cuts',
      'Dynamic Punch-in Zooms',
    ],
    software: ['After Effects', 'Premiere Pro', 'CapCut Pro', 'Sound FX'],
    startingPrice: '₹10 / video',
    featuredHook: '“High energy visual cuts synced to the exact millisecond.”',
  },
  {
    id: 'both',
    name: 'Both Editors (Dual Polish)',
    role: 'Collaborative Duo Master Cut',
    badge: 'Top Recommended Duo',
    avatar: '/src/assets/images/himanshu_profile_1790318843205.jpg',
    secondaryAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5.0,
    completedCount: '210+ Collab Cuts',
    availability: 'Dual Assignment • Instant Queue',
    availabilityColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    bio: 'The ultimate editing powerhouse. Himanshu crafts the hook, typography & soundscape, while Vaibhav perfects the beat drop syncs, speed ramps & seamless transitions.',
    specialties: [
      'Double Quality Control Check',
      'Himanshu: Captions & Sound FX',
      'Vaibhav: Action Cuts & Beat Drops',
      'Maximum Retention Boost',
    ],
    software: ['Full Creative Suite', 'Collab Review Pod', 'Lossless 4K Export'],
    startingPrice: '₹10 / video (Standard Base Rate)',
    featuredHook: '“Two expert pairs of eyes on your video for the price of one.”',
  },
];

interface OurTeamProps {
  selectedEditor?: EditorChoice;
  onSelectEditor?: (editor: EditorChoice) => void;
  isInteractive?: boolean;
}

export const OurTeam: React.FC<OurTeamProps> = ({
  selectedEditor = 'himanshu',
  onSelectEditor,
  isInteractive = true,
}) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-400 border border-amber-500/20">
            <Users className="h-3.5 w-3.5" /> Core Creative Team
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-black text-white mt-1">
            Meet Your Dedicated Video Editors
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {isInteractive
              ? 'Click below to choose who crafts your video (Himanshu, Vaibhav, or both editors collaboratively):'
              : 'Our verified editing experts ready to level up your social media content:'}
          </p>
        </div>

        {isInteractive && (
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 shrink-0">
            Base Price: Starts ₹10/vid
          </span>
        )}
      </div>

      {/* Editor Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {TEAM_MEMBERS.map((member) => {
          const isSelected = selectedEditor === member.id;
          const isHimanshu = member.id === 'himanshu';
          const isVaibhav = member.id === 'vaibhav';
          const isBoth = member.id === 'both';

          return (
            <div
              key={member.id}
              onClick={() => isInteractive && onSelectEditor && onSelectEditor(member.id)}
              className={`relative flex flex-col justify-between rounded-3xl border p-5 sm:p-6 transition-all duration-200 ${
                isInteractive ? 'cursor-pointer' : ''
              } ${
                isSelected
                  ? isBoth
                    ? 'border-emerald-500 bg-gradient-to-b from-[#0f1f1a] to-[#0c141a] ring-2 ring-emerald-500/50 shadow-xl shadow-emerald-500/10'
                    : isVaibhav
                    ? 'border-sky-500 bg-gradient-to-b from-[#0f1b26] to-[#0a121d] ring-2 ring-sky-500/50 shadow-xl shadow-sky-500/10'
                    : 'border-amber-500 bg-gradient-to-b from-[#1b170f] to-[#12100d] ring-2 ring-amber-500/50 shadow-xl shadow-amber-500/10'
                  : 'border-white/10 bg-[#0d121e]/90 hover:border-white/25 hover:bg-[#111726]'
              }`}
            >
              {/* Selected Badge Indicator */}
              {isSelected && isInteractive && (
                <div className="absolute -top-3 right-6 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-0.5 text-[10px] font-black uppercase text-black shadow-md">
                  <Check className="h-3 w-3 stroke-[3]" />
                  <span>Selected Editor</span>
                </div>
              )}

              <div className="space-y-4">
                {/* Member Avatars & Top Metrics */}
                <div className="flex items-start justify-between gap-3">
                  <div className="relative">
                    {member.secondaryAvatar ? (
                      /* Dual Avatars for Both Editors */
                      <div className="flex -space-x-3.5">
                        <img
                          src={member.avatar}
                          alt="Himanshu Pandit"
                          className="h-14 w-14 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
                        />
                        <img
                          src={member.secondaryAvatar}
                          alt="Vaibhav"
                          className="h-14 w-14 rounded-2xl object-cover border-2 border-sky-400 shadow-md"
                        />
                      </div>
                    ) : (
                      /* Solo Avatar */
                      <div className="h-14 w-14 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-md">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-black shadow">
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border ${
                        isBoth
                          ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                          : isVaibhav
                          ? 'border-sky-500/40 bg-sky-500/20 text-sky-300'
                          : 'border-amber-500/40 bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {member.badge}
                    </span>
                    <div className="flex items-center justify-end gap-1 text-xs text-amber-400 font-bold mt-1.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{member.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        ({member.completedCount})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Name & Role */}
                <div>
                  <h3 className="font-heading text-lg font-black text-white flex items-center gap-1.5">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-300 mt-0.5">
                    {member.role}
                  </p>
                </div>

                {/* Availability status badge */}
                <div
                  className={`rounded-xl border px-3 py-1.5 text-[11px] font-semibold flex items-center gap-1.5 ${member.availabilityColor}`}
                >
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{member.availability}</span>
                </div>

                {/* Bio & quote */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {member.bio}
                </p>

                {/* Quote hook */}
                <div className="rounded-xl border border-white/5 bg-black/40 p-2.5 text-[11px] italic text-slate-400 leading-snug">
                  {member.featuredHook}
                </div>

                {/* Specialties */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Core Specialties:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-medium text-slate-200"
                      >
                        ✓ {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Software tags */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Tooling:
                  </span>
                  <div className="flex flex-wrap gap-1 text-[10px] text-slate-400 font-mono">
                    {member.software.map((sw, i) => (
                      <span key={i} className="bg-black/50 px-1.5 py-0.5 rounded border border-white/5">
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Price & Select CTA */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Rate:</span>
                  <span className="font-heading text-sm font-black text-amber-400">
                    {member.startingPrice}
                  </span>
                </div>

                {isInteractive && (
                  <button
                    type="button"
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                        : 'border border-white/20 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <span>Select Editor</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
