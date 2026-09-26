import React, { useState } from 'react';
import {
  Bell,
  CheckCircle,
  Clock,
  Layers,
  LogOut,
  Menu,
  MessageCircle,
  Play,
  Shield,
  Sparkles,
  User,
  Video,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const {
    currentUser,
    notifications,
    markNotificationsAsRead,
    loginAs,
    logout,
    userSubscription,
    settings,
    openCheckout,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'creator-plans', label: 'Creator Plans', badge: 'Popular' },
    { id: 'packages', label: 'Packages' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'brand-collaboration', label: 'Brand Collab' },
    { id: 'orders', label: 'Orders' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080a0f]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-amber-500/30 bg-black/60 shadow-lg shadow-amber-500/10 transition-transform group-hover:scale-105">
            <img
              src="/src/assets/images/himanshu_logo_1790318824908.jpg"
              alt="Himanshu Edit Hub Logo"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                HIMANSHU
              </span>
              <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-amber-500/30">
                EDIT HUB
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              Edit. Create. Grow.
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-1.5 text-xs xl:text-sm font-semibold transition-all rounded-lg ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10 shadow-inner border border-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="ml-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-1.5 py-0.2 text-[9px] font-bold text-black uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                if (!notificationsOpen) markNotificationsAsRead();
              }}
              className="relative rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-white/10 bg-[#0d121d] p-3 shadow-2xl backdrop-blur-2xl z-50">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Notifications
                  </span>
                  <span className="text-[11px] text-amber-400 font-medium">
                    {notifications.length} total
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="rounded-lg border border-white/5 bg-white/5 p-2.5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-amber-300">
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{n.date}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-300">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Hire CTA */}
          <button
            onClick={() => handleNavClick('hire-me')}
            className="hidden sm:flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-1.5 text-xs font-bold text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 fill-black" />
            Hire Me (₹10)
          </button>

          {/* User Account / Role Menu */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-200 hover:border-amber-500/30 hover:bg-white/10 transition-colors"
            >
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-6 w-6 rounded-full object-cover border border-amber-400/40"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-[10px] font-bold text-amber-400">
                  {currentUser ? currentUser.name[0] : 'G'}
                </div>
              )}
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-white leading-tight">
                  {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
                </span>
                <span className="text-[10px] text-amber-400 uppercase font-medium">
                  {currentUser?.role || 'Guest'}
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-white/10 bg-[#0d121d] p-2 shadow-2xl backdrop-blur-2xl z-50">
                {currentUser ? (
                  <>
                    <div className="border-b border-white/10 p-2 mb-1">
                      <p className="text-xs font-bold text-white">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="inline-block rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-400">
                          {currentUser.role}
                        </span>
                        {userSubscription && (
                          <span className="text-[10px] text-emerald-400 font-semibold">
                            {userSubscription.remainingCredits} Credits
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <button
                        onClick={() => {
                          handleNavClick('orders');
                          setUserDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:text-white"
                      >
                        <Video className="h-3.5 w-3.5 text-amber-400" />
                        Customer Dashboard
                      </button>

                      {/* Editor Link */}
                      {(currentUser.role === 'editor' || currentUser.role === 'owner' || currentUser.role === 'admin') && (
                        <button
                          onClick={() => {
                            handleNavClick('editor-dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-sky-300 hover:bg-sky-500/10"
                        >
                          <Layers className="h-3.5 w-3.5 text-sky-400" />
                          Editor Workstation
                        </button>
                      )}

                      {/* Owner / Developer Private Dashboard */}
                      {(currentUser.isDeveloper || currentUser.email === 'himanshu2121yt@gmail.com' || currentUser.isOwner) && (
                        <button
                          onClick={() => {
                            handleNavClick('admin-dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-amber-400 hover:bg-amber-500/10"
                        >
                          <Shield className="h-3.5 w-3.5 text-amber-400" />
                          Developer & Admin Console
                        </button>
                      )}

                      <button
                        onClick={() => {
                          handleNavClick('profile');
                          setUserDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:text-white"
                      >
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        Brand Kit & Profile
                      </button>
                    </div>

                    <div className="my-2 border-t border-white/10" />

                    {/* Team Info for Customer */}
                    <div className="px-2 py-1.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Production Team
                      </p>
                      <div className="text-[11px] space-y-0.5">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Video Editor:</span>
                          <span className="text-white font-bold">Vaibhav</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Developer:</span>
                          <span className="text-amber-400 font-bold">Himanshu</span>
                        </div>
                      </div>
                    </div>

                    <div className="my-1 border-t border-white/10" />

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="p-2 space-y-2">
                    <p className="text-xs text-slate-300">
                      Sign in to track orders, manage creator packages, or verify payments.
                    </p>
                    <button
                      onClick={() => {
                        handleNavClick('login');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full rounded-lg bg-amber-500 py-2 text-xs font-bold text-black hover:bg-amber-400"
                    >
                      Sign In / Register
                    </button>
                    <div className="pt-2 border-t border-white/10 space-y-1 text-center">
                      <p className="text-[10px] text-slate-400">
                        Production Team: <strong className="text-white">Vaibhav</strong> (Editor) • <strong className="text-amber-400">Himanshu</strong> (Developer)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#090d16] px-4 pt-3 pb-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold ${
                activeTab === item.id
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-3 border-t border-white/10 space-y-2">
            <button
              onClick={() => handleNavClick('hire-me')}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-sm font-bold text-black shadow-lg shadow-amber-500/20"
            >
              <Sparkles className="h-4 w-4" />
              Hire Himanshu (Starts ₹10)
            </button>

            {currentUser?.isOwner && (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 py-2 text-xs font-bold text-amber-400"
              >
                <Shield className="h-4 w-4" />
                Open Owner Panel
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
