import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Code,
  Key,
  Layers,
  Lock,
  Mail,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  Video,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AuthPagesProps {
  setActiveTab: (tab: string) => void;
  defaultMode?: 'login' | 'owner' | 'developer' | 'editor';
}

export const AuthPages: React.FC<AuthPagesProps> = ({ setActiveTab, defaultMode = 'login' }) => {
  const { loginWithCredentials, currentUser } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'editor' | 'developer'>(
    defaultMode === 'owner' || defaultMode === 'developer' ? 'developer' : defaultMode === 'editor' ? 'editor' : 'login'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const targetEmail = email.trim();
    const res = loginWithCredentials(targetEmail, password);

    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        if (mode === 'developer' || targetEmail.toLowerCase() === 'himanshu2121yt@gmail.com' || targetEmail.toLowerCase() === 'pandit1@gmail.com') {
          setActiveTab('admin-dashboard');
        } else if (mode === 'editor' || targetEmail.toLowerCase().includes('vaibhav')) {
          setActiveTab('editor-dashboard');
        } else {
          setActiveTab('orders');
        }
      }, 700);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto h-12 w-12 overflow-hidden rounded-2xl border border-amber-500/30 bg-black mb-3">
          <img
            src="/src/assets/images/himanshu_logo_1790318824908.jpg"
            alt="Himanshu Edit Hub"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-black text-white">
          {mode === 'developer'
            ? 'Developer Portal'
            : mode === 'editor'
            ? 'Editor Workstation Login'
            : mode === 'register'
            ? 'Create Creator Account'
            : 'Sign In to Edit Hub'}
        </h1>
        <p className="text-xs text-slate-400">
          {mode === 'developer'
            ? 'Restricted access for platform developer'
            : mode === 'editor'
            ? 'Access your assigned video projects & renders'
            : mode === 'register'
            ? 'Get full access to video timelines, downloads, and credits'
            : 'Access your order timeline, video downloads, and creator credits'}
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-4 rounded-xl bg-white/5 p-1 border border-white/10 text-xs font-bold gap-1">
        <button
          type="button"
          onClick={() => {
            setMode('login');
            setEmail('');
            setPassword('');
            setErrorMsg('');
          }}
          className={`py-2 rounded-lg transition-all text-center ${
            mode === 'login' ? 'bg-amber-500 text-black shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Customer
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('register');
            setEmail('');
            setPassword('');
            setErrorMsg('');
          }}
          className={`py-2 rounded-lg transition-all text-center ${
            mode === 'register' ? 'bg-amber-500 text-black shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Register
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('editor');
            setEmail('');
            setPassword('');
            setErrorMsg('');
          }}
          className={`py-2 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
            mode === 'editor' ? 'bg-sky-500 text-black shadow' : 'text-sky-400/80 hover:text-sky-300'
          }`}
        >
          <Video className="h-3 w-3" />
          <span>Editor</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('developer');
            setEmail('');
            setPassword('');
            setErrorMsg('');
          }}
          className={`py-2 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
            mode === 'developer' ? 'bg-amber-500 text-black shadow' : 'text-amber-400/80 hover:text-amber-300'
          }`}
        >
          <Code className="h-3 w-3" />
          <span>Dev</span>
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleAuth}
        className="rounded-3xl border border-white/10 bg-[#0d121e] p-6 sm:p-8 shadow-2xl space-y-4 text-xs"
      >
        {mode === 'developer' && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-amber-300 text-[11px] leading-relaxed">
            <span className="font-bold flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
              Developer Authentication Console
            </span>
            <span>Restricted to authorized system developer. Enter developer credentials to access.</span>
          </div>
        )}

        {mode === 'editor' && (
          <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-3 text-sky-300 text-[11px] leading-relaxed">
            <span className="font-bold flex items-center gap-1">
              <Layers className="h-3.5 w-3.5 text-sky-400" />
              Video Editor Workstation
            </span>
            <span>Sign in to access assigned video timelines, review comments, and upload preview cuts.</span>
          </div>
        )}

        {mode === 'register' && (
          <div>
            <label className="text-slate-300 font-bold block mb-1">Your Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rohan Sharma"
                className="w-full rounded-xl border border-white/10 bg-black/50 pl-9 pr-3 py-2 text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-slate-300 font-bold block mb-1">
            {mode === 'developer'
              ? 'Developer Email'
              : mode === 'editor'
              ? 'Editor Email'
              : 'Email Address'}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                mode === 'developer'
                  ? 'developer@email.com'
                  : mode === 'editor'
                  ? 'editor@email.com'
                  : 'you@creator.com'
              }
              className="w-full rounded-xl border border-white/10 bg-black/50 pl-9 pr-3 py-2 text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none font-mono"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-300 font-bold block mb-1">
            {mode === 'developer' ? 'Developer Password' : 'Password'}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-black/50 pl-9 pr-3 py-2 text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {errorMsg && (
          <div className="rounded-lg bg-red-500/20 border border-red-500/30 p-2.5 text-red-300 text-[11px]">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="rounded-lg bg-emerald-500/20 border border-emerald-500/30 p-2.5 text-emerald-300 text-[11px]">
            {successMsg}
          </div>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
        >
          <span>
            {mode === 'developer'
              ? 'Authenticate as Developer'
              : mode === 'editor'
              ? 'Access Editor Workstation'
              : mode === 'register'
              ? 'Create Account'
              : 'Sign In to Dashboard'}
          </span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </form>

      {/* Customer Team Transparency Banner */}
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-center space-y-1">
        <p className="text-[11px] text-slate-400">
          Core Studio Team: <strong className="text-white">Vaibhav</strong> (Lead Video Editor) •{' '}
          <strong className="text-white">Himanshu</strong> (Platform Developer)
        </p>
        <p className="text-[10px] text-slate-500">
          Assigned to deliver viral quality edits and seamless order tracking.
        </p>
      </div>
    </div>
  );
};
