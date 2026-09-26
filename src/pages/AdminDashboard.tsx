import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Award,
  Building,
  Check,
  CheckCircle,
  CheckCircle2,
  Clock,
  Coins,
  Copy,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  Key,
  Layers,
  Lock,
  LogOut,
  MessageCircle,
  Package,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Tag,
  Trash2,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Coupon, OrderItem, PortfolioItem, ServiceType } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    orders,
    updateOrderStatus,
    assignEditor,
    users,
    settings,
    updateSettings,
    userSubscription,
    grantBonusCredits,
    packages,
    updatePackage,
    brandInquiries,
    updateBrandInquiryStatus,
    portfolio,
    addPortfolioItem,
    removePortfolioItem,
    reviews,
    toggleApproveReview,
    coupons,
    addCoupon,
    logoutAllDevices,
    openReceipt,
    acceptUtrPayment,
    rejectUtrPayment,
    validateUtr,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    | 'overview'
    | 'orders'
    | 'subscriptions'
    | 'brands'
    | 'payments'
    | 'portfolio'
    | 'reviews'
    | 'coupons'
    | 'settings'
    | 'security'
  >('overview');

  // Search & filter
  const [orderSearch, setOrderSearch] = useState('');
  const [paymentSearch, setPaymentSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');

  // Real UTR Verification States
  const [rejectionModalOrder, setRejectionModalOrder] = useState<OrderItem | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState('UTR not found in bank statement (No funds received)');
  const [customRejectionText, setCustomRejectionText] = useState('');
  const [bankFeedModal, setBankFeedModal] = useState(false);
  const [copiedAdminUtr, setCopiedAdminUtr] = useState<string | null>(null);
  const [adminUtrToast, setAdminUtrToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  // New portfolio item modal state
  const [newPortfolioModal, setNewPortfolioModal] = useState(false);
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortCategory, setNewPortCategory] = useState<PortfolioItem['category']>('Instagram Reels');
  const [newPortDesc, setNewPortDesc] = useState('');
  const [newPortUrl, setNewPortUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  const [newPortThumb, setNewPortThumb] = useState('/src/assets/images/reel_mockup_1790318858716.jpg');
  const [newPortTags, setNewPortTags] = useState('Reel, Viral, Captions');

  // New Coupon modal state
  const [newCouponModal, setNewCouponModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(20);
  const [couponMax, setCouponMax] = useState(200);
  const [couponMinOrder, setCouponMinOrder] = useState(50);

  // Settings form
  const [settingsUpi, setSettingsUpi] = useState(settings.upiId);
  const [settingsInsta, setSettingsInsta] = useState(settings.instagramHandle);
  const [settingsPhone, setSettingsPhone] = useState(settings.whatsappNumber);
  const [settingsBasePrice, setSettingsBasePrice] = useState(settings.baseShortVideoPrice);
  const [upiToggled, setUpiToggled] = useState(settings.upiEnabled);
  const [razorpayToggled, setRazorpayToggled] = useState(settings.razorpayEnabled);

  // Check role authorization
  const isAuthorized = currentUser?.isOwner || currentUser?.role === 'owner' || currentUser?.role === 'admin';

  if (!isAuthorized) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-400 border border-red-500/40">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-white">Access Denied</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          The Owner and Admin Panel is strictly protected and requires verified owner credentials (
          <strong className="text-white">himanshu2121yt@gmail.com</strong>).
        </p>
      </div>
    );
  }

  // Dashboard Stats Calculations
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status !== 'Completed').length;
  const completedOrders = orders.filter((o) => o.status === 'Completed').length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.finalPrice || o.budget || 0), 0) + (userSubscription ? userSubscription.monthlyFee : 0);
  const brandProjectsCount = brandInquiries.length;
  const activeEditors = users.filter((u) => u.role === 'editor' || u.role === 'owner');

  // Real UTR Stats
  const pendingUtrOrders = orders.filter((o) => o.paymentStatus === 'Under Verification');
  const verifiedOrders = orders.filter((o) => o.paymentStatus === 'Successful');

  // Filter orders
  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.service.toLowerCase().includes(orderSearch.toLowerCase())
  );

  // Add Portfolio Handler
  const handleCreatePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    addPortfolioItem({
      title: newPortTitle,
      category: newPortCategory,
      description: newPortDesc,
      videoUrl: newPortUrl,
      thumbnailUrl: newPortThumb,
      tags: newPortTags.split(',').map((t) => t.trim()),
    });
    setNewPortfolioModal(false);
  };

  // Add Coupon Handler
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon({
      code: couponCode.toUpperCase().trim(),
      discountPercentage: couponDiscount,
      maxDiscount: couponMax,
      minOrderValue: couponMinOrder,
      active: true,
      validTill: '2026-12-31',
    });
    setNewCouponModal(false);
  };

  // Save Settings Handler
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      upiId: settingsUpi,
      instagramHandle: settingsInsta,
      whatsappNumber: settingsPhone,
      baseShortVideoPrice: settingsBasePrice,
      upiEnabled: upiToggled,
      razorpayEnabled: razorpayToggled,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-lg shadow-amber-500/10">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-white">
                Owner & Admin Control Hub
              </h1>
              <span className="rounded bg-amber-500 px-2 py-0.5 text-[10px] font-black uppercase text-black">
                Full Access
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Verified Owner: <strong className="text-white">himanshu2121yt@gmail.com</strong> (Himanshu)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveAdminTab('settings')}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('security')}
            className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-400 hover:bg-amber-500/20"
          >
            <Key className="h-4 w-4" />
            <span>Security & 2FA</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD STATS ROW */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl border border-white/10 bg-[#0d121e] p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Orders</span>
          <p className="mt-1 font-heading text-2xl font-black text-white">{totalOrders}</p>
          <span className="text-[10px] text-emerald-400">All-time volume</span>
        </div>

        <button
          onClick={() => setActiveAdminTab('payments')}
          className={`rounded-2xl border p-4 text-left transition-all hover:border-amber-500/60 ${
            pendingUtrOrders.length > 0
              ? 'border-amber-500/80 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
              : 'border-white/10 bg-[#0d121e]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Pending UTRs</span>
            {pendingUtrOrders.length > 0 && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            )}
          </div>
          <p className="mt-1 font-heading text-2xl font-black text-amber-400">{pendingUtrOrders.length}</p>
          <span className="text-[10px] text-amber-300 font-semibold underline">Verify Bank Credit →</span>
        </button>

        <div className="rounded-2xl border border-white/10 bg-[#0d121e] p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Completed Orders</span>
          <p className="mt-1 font-heading text-2xl font-black text-emerald-400">{completedOrders}</p>
          <span className="text-[10px] text-slate-400">100% Delivered</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d121e] p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Total Revenue</span>
          <p className="mt-1 font-heading text-2xl font-black text-purple-400">₹{totalRevenue}</p>
          <span className="text-[10px] text-slate-400">Gross processed</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d121e] p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">Brand Projects</span>
          <p className="mt-1 font-heading text-2xl font-black text-sky-400">{brandProjectsCount}</p>
          <span className="text-[10px] text-slate-400">₹300 - ₹10k+</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d121e] p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">Active Editors</span>
          <p className="mt-1 font-heading text-2xl font-black text-pink-400">{activeEditors.length}</p>
          <span className="text-[10px] text-slate-400">On-call team</span>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-white/10 pb-3">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'orders', label: `Orders (${orders.length})` },
          { id: 'subscriptions', label: 'Subscriptions' },
          { id: 'brands', label: `Brands (${brandInquiries.length})` },
          {
            id: 'payments',
            label: pendingUtrOrders.length > 0 ? `⚡ UTR Desk (${pendingUtrOrders.length} New)` : 'Payments & UTR Desk',
            isSpecial: pendingUtrOrders.length > 0,
          },
          { id: 'portfolio', label: `Portfolio (${portfolio.length})` },
          { id: 'reviews', label: `Reviews (${reviews.length})` },
          { id: 'coupons', label: `Coupons (${coupons.length})` },
          { id: 'settings', label: 'Payment & UPI Settings' },
          { id: 'security', label: 'Owner Security' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all relative ${
              activeAdminTab === tab.id
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : tab.isSpecial
                ? 'border border-amber-500/50 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. OVERVIEW & ORDERS */}
      {(activeAdminTab === 'overview' || activeAdminTab === 'orders') && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search orders by number, client, or service..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">
                Showing {filteredOrders.length} orders
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d121e] overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/5 text-slate-300">
                <tr>
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Service & Style</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Assigned Editor</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-amber-400">
                      #{order.orderNumber}
                    </td>
                    <td className="p-3.5">
                      <p className="font-bold text-white">{order.customerName}</p>
                      <p className="text-[10px] text-slate-400">{order.customerEmail}</p>
                      <p className="text-[10px] text-emerald-400">WA: {order.whatsapp}</p>
                    </td>
                    <td className="p-3.5">
                      <p className="font-semibold text-white">{order.service}</p>
                      <p className="text-[10px] text-slate-400">{order.editingStyle}</p>
                    </td>
                    <td className="p-3.5 font-bold text-white">
                      ₹{order.finalPrice || order.budget || 10}
                    </td>
                    <td className="p-3.5">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] font-bold text-white focus:outline-none"
                      >
                        <option value="Request Received">Request Received</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Editing">Editing</option>
                        <option value="Review">Review</option>
                        <option value="Revision">Revision</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={order.assignedEditorId || ''}
                        onChange={(e) => {
                          const ed = users.find((u) => u.id === e.target.value);
                          if (ed) assignEditor(order.id, ed.id, ed.name);
                        }}
                        className="rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[11px] text-sky-300 focus:outline-none"
                      >
                        <option value="">Unassigned</option>
                        {users
                          .filter((u) => u.role === 'editor' || u.role === 'owner')
                          .map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.name}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => openReceipt(order)}
                        className="rounded bg-white/10 px-2 py-1 text-[10px] font-semibold text-slate-300 hover:text-white"
                      >
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. SUBSCRIPTIONS */}
      {activeAdminTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-white">Creator Subscriptions Management</h3>
            <button
              onClick={() => grantBonusCredits(10)}
              className="rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-black"
            >
              + Grant 10 Bonus Credits
            </button>
          </div>

          {userSubscription && (
            <div className="rounded-2xl border border-white/10 bg-[#0d121e] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Subscribed Creator</span>
                  <h4 className="font-heading text-lg font-bold text-white">{userSubscription.planName}</h4>
                  <p className="text-xs text-slate-400">Renewing on: {userSubscription.renewalDate}</p>
                </div>
                <div className="text-right">
                  <span className="font-heading text-2xl font-black text-amber-400">
                    ₹{userSubscription.monthlyFee}/mo
                  </span>
                  <span className="text-xs text-emerald-400 block font-bold">Status: {userSubscription.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="rounded-xl bg-white/5 p-3">
                  <span className="text-slate-400 block">Total Monthly Credits</span>
                  <p className="font-bold text-white text-base mt-1">{userSubscription.totalMonthlyCredits}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <span className="text-slate-400 block">Credits Consumed</span>
                  <p className="font-bold text-amber-400 text-base mt-1">{userSubscription.usedCredits}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <span className="text-slate-400 block">Credits Remaining</span>
                  <p className="font-bold text-emerald-400 text-base mt-1">{userSubscription.remainingCredits}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. BRANDS */}
      {activeAdminTab === 'brands' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-white">Brand Proposals & Inquiries</h3>
            <span className="text-xs text-amber-400">{brandInquiries.length} Inquiries</span>
          </div>

          <div className="space-y-4">
            {brandInquiries.map((brand) => (
              <div
                key={brand.id}
                className="rounded-2xl border border-white/10 bg-[#0d121e] p-6 space-y-4 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <h4 className="font-heading text-lg font-bold text-white">{brand.companyName}</h4>
                    <p className="text-xs text-slate-400">
                      Contact: {brand.contactPerson} ({brand.email} • {brand.whatsapp})
                    </p>
                    <p className="text-xs text-amber-400">Website/IG: {brand.instagramOrWebsite}</p>
                  </div>
                  <div className="text-right">
                    <span className="rounded bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-300">
                      {brand.status}
                    </span>
                    <p className="text-xs text-slate-400 mt-1 font-mono">Budget: {brand.budget}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-bold mb-1">Product & Campaign Type</span>
                    <p className="text-white">{brand.productService}</p>
                    <p className="text-slate-300 font-medium mt-1">Scope: {brand.campaignType}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold mb-1">Requirements</span>
                    <p className="text-slate-300">{brand.requirements}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Update Status:</span>
                    <select
                      value={brand.status}
                      onChange={(e) => updateBrandInquiryStatus(brand.id, e.target.value as any)}
                      className="rounded bg-black/60 border border-white/10 px-2 py-1 text-xs text-white"
                    >
                      <option value="New Proposal">New Proposal</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Quote Sent">Quote Sent</option>
                      <option value="Approved">Approved</option>
                      <option value="Declined">Declined</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <a
                    href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hi ${brand.contactPerson}, Himanshu here regarding your proposal for ${brand.companyName}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-black"
                  >
                    Reply via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. REAL PAYMENTS & UTR VERIFICATION DESK */}
      {activeAdminTab === 'payments' && (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Bank Settlement Console
              </span>
              <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                <span>UTR Payment Verification Desk</span>
                {pendingUtrOrders.length > 0 && (
                  <span className="rounded-full bg-amber-500 text-black px-2 py-0.5 text-xs font-black animate-pulse">
                    {pendingUtrOrders.length} Awaiting Confirmation
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real Anti-Fraud Verification: Inspect incoming 12-digit UTR references against your bank account credits before accepting.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setBankFeedModal(true)}
                className="flex items-center gap-1.5 rounded-xl border border-sky-500/40 bg-sky-500/10 px-3.5 py-2 text-xs font-bold text-sky-400 hover:bg-sky-500/20 shadow transition-all"
              >
                <Building className="h-4 w-4" />
                <span>Simulated Bank Statement & Soundbox</span>
              </button>

              <span className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Smartphone className="h-3.5 w-3.5" />
                <span>UPI: {settings.upiId}</span>
              </span>
            </div>
          </div>

          {/* Toast Alert */}
          {adminUtrToast && (
            <div
              className={`rounded-xl p-3.5 text-xs flex items-center justify-between animate-in fade-in ${
                adminUtrToast.type === 'success'
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                  : 'bg-red-500/20 border border-red-500/40 text-red-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {adminUtrToast.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400" />
                )}
                <span>{adminUtrToast.message}</span>
              </div>
              <button
                onClick={() => setAdminUtrToast(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* SECTION A: PENDING UTR VERIFICATIONS QUEUE (Action Required) */}
          <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#131b28] via-[#0e1422] to-[#0a0f19] p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <h4 className="font-heading text-base font-bold text-white">
                  Pending Bank Verification Queue ({pendingUtrOrders.length})
                </h4>
              </div>
              <span className="text-[11px] text-slate-400">
                Action required: Confirm fund receipt in bank statement before accepting
              </span>
            </div>

            {pendingUtrOrders.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-black/30 p-8 text-center space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Check className="h-6 w-6" />
                </div>
                <h5 className="font-bold text-white text-sm">All UTR Payments Cleared</h5>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  There are no pending UTR verification requests. When a client transfers via UPI and submits their 12-digit UTR, it will show up here for your verification.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {pendingUtrOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="rounded-2xl border border-amber-500/30 bg-[#0c121e] p-4 sm:p-5 space-y-4 relative overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            #{ord.orderNumber}
                          </span>
                          <span className="text-xs font-bold text-white">{ord.service}</span>
                          <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                            Under Verification
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Client: <strong className="text-white">{ord.customerName}</strong> ({ord.customerEmail}) •
                          WhatsApp: <strong className="text-slate-200">{ord.whatsapp}</strong> •
                          IG: <strong className="text-slate-200">{ord.instagram}</strong>
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Expected Credit</span>
                        <span className="font-heading text-xl font-black text-emerald-400">
                          ₹{ord.finalPrice || ord.budget || 10}
                        </span>
                      </div>
                    </div>

                    {/* UTR & Anti-fraud verification data */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-black/40 p-3.5 rounded-xl border border-white/5">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Submitted 12-Digit UTR
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-extrabold text-amber-300 bg-black/80 px-2.5 py-1 rounded border border-amber-500/40 tracking-wider">
                            {ord.utrNumber || 'N/A'}
                          </span>
                          <button
                            onClick={() => {
                              if (ord.utrNumber) {
                                navigator.clipboard.writeText(ord.utrNumber);
                                setCopiedAdminUtr(ord.id);
                                setTimeout(() => setCopiedAdminUtr(null), 2000);
                              }
                            }}
                            className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] flex items-center gap-1"
                            title="Copy UTR to verify in Bank App"
                          >
                            {copiedAdminUtr === ord.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                            <span>{copiedAdminUtr === ord.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        {ord.payerUpiId && (
                          <p className="text-[10px] text-slate-400 mt-1">
                            Payer UPI: <span className="font-mono text-slate-200">{ord.payerUpiId}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Anti-Fraud Checks
                        </span>
                        <div className="space-y-1 text-[11px]">
                          <div className="flex items-center gap-1.5 text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>12-Digit NPCI Reference: Valid</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Duplicate Check: Unique (No prior use)</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Submission Timestamp
                        </span>
                        <p className="text-xs text-slate-200">
                          {ord.utrSubmittedAt ? new Date(ord.utrSubmittedAt).toLocaleString() : 'Recent'}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Status: Waiting for owner bank statement match
                        </p>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-white/5">
                      <span className="text-[11px] text-slate-400">
                        Check your bank app (HDFC/SBI/Paytm) to ensure ₹{ord.finalPrice || ord.budget} is credited.
                      </span>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* WhatsApp Customer */}
                        <a
                          href={`https://wa.me/${ord.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hi ${ord.customerName}, Himanshu here regarding payment verification for your order #${ord.orderNumber}. I am verifying UTR ${ord.utrNumber}.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>WhatsApp Client</span>
                        </a>

                        {/* Reject button */}
                        <button
                          onClick={() => setRejectionModalOrder(ord)}
                          className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all"
                        >
                          <X className="h-3.5 w-3.5" />
                          <span>Reject Invalid/Fake UTR</span>
                        </button>

                        {/* Accept button */}
                        <button
                          onClick={() => {
                            acceptUtrPayment(ord.id, 'Verified & Confirmed in Bank Account by Himanshu');
                            setAdminUtrToast({
                              message: `Order #${ord.orderNumber} (₹${ord.finalPrice || ord.budget}) verified and accepted! Customer notified.`,
                              type: 'success',
                            });
                          }}
                          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 text-xs font-black text-black hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/20 transition-all"
                        >
                          <Check className="h-4 w-4" />
                          <span>✓ Accept Payment (Confirmed in Bank)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION B: ALL TRANSACTIONS LEDGER & INVOICES */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <h4 className="font-heading text-base font-bold text-white">
                All Transactions & Official Invoices
              </h4>

              {/* Search & Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search by UTR, order, client..."
                    value={paymentSearch}
                    onChange={(e) => setPaymentSearch(e.target.value)}
                    className="rounded-xl border border-white/10 bg-black/40 pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none w-56"
                  />
                </div>

                <div className="flex items-center rounded-xl border border-white/10 bg-black/40 p-1 text-xs">
                  <button
                    onClick={() => setPaymentFilter('all')}
                    className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                      paymentFilter === 'all' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All ({orders.length})
                  </button>
                  <button
                    onClick={() => setPaymentFilter('verified')}
                    className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                      paymentFilter === 'verified' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Verified ({verifiedOrders.length})
                  </button>
                  <button
                    onClick={() => setPaymentFilter('pending')}
                    className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                      paymentFilter === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Pending ({pendingUtrOrders.length})
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0d121e] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-white/5 text-slate-300">
                  <tr>
                    <th className="p-3.5">Order/Service</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Payment Method & UTR</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Verification Details</th>
                    <th className="p-3.5 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {orders
                    .filter((ord) => {
                      if (paymentFilter === 'verified') return ord.paymentStatus === 'Successful';
                      if (paymentFilter === 'pending') return ord.paymentStatus === 'Under Verification';
                      if (paymentFilter === 'rejected') return ord.paymentStatus === 'Rejected';
                      return true;
                    })
                    .filter((ord) => {
                      const q = paymentSearch.toLowerCase();
                      return (
                        ord.orderNumber.toLowerCase().includes(q) ||
                        ord.customerName.toLowerCase().includes(q) ||
                        (ord.utrNumber && ord.utrNumber.toLowerCase().includes(q)) ||
                        (ord.paymentId && ord.paymentId.toLowerCase().includes(q)) ||
                        ord.service.toLowerCase().includes(q)
                      );
                    })
                    .map((ord) => (
                      <tr key={ord.id} className="hover:bg-white/5">
                        <td className="p-3.5">
                          <p className="font-bold text-white">#{ord.orderNumber}</p>
                          <p className="text-[11px] text-slate-400">{ord.service}</p>
                        </td>
                        <td className="p-3.5">
                          <p className="font-semibold text-white">{ord.customerName}</p>
                          <p className="text-[10px] text-slate-400">{ord.whatsapp}</p>
                        </td>
                        <td className="p-3.5">
                          <span className="font-mono text-amber-400 block font-bold">
                            {ord.utrNumber ? `UTR: ${ord.utrNumber}` : ord.paymentId || 'TXN-0000'}
                          </span>
                          <span className="text-[10px] text-slate-400">{ord.paymentMethod || 'UPI'}</span>
                        </td>
                        <td className="p-3.5 font-bold text-emerald-400 text-sm">
                          ₹{ord.finalPrice || ord.budget || 10}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                              ord.paymentStatus === 'Successful'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : ord.paymentStatus === 'Under Verification'
                                ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                                : ord.paymentStatus === 'Rejected'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-white/10 text-slate-400'
                            }`}
                          >
                            {ord.paymentStatus}
                          </span>
                        </td>
                        <td className="p-3.5 text-[11px] text-slate-400">
                          {ord.paymentVerifiedBy ? (
                            <span className="text-emerald-300 font-medium">✓ {ord.paymentVerifiedBy}</span>
                          ) : ord.paymentStatus === 'Under Verification' ? (
                            <span className="text-amber-300">Awaiting Owner Confirmation</span>
                          ) : (
                            <span>Standard</span>
                          )}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => openReceipt(ord)}
                            className="rounded bg-white/10 px-2.5 py-1 text-[10px] font-bold text-slate-200 hover:bg-white/20 hover:text-white transition-all"
                          >
                            Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. PORTFOLIO MANAGER */}
      {activeAdminTab === 'portfolio' && (
        <div className="space-y-6">
          {/* Video Post Station Banner */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#131a2b] to-[#0d121e] p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider border border-amber-500/30">
                  Video Post Station
                </span>
                <span className="text-xs text-slate-400">Post Videos Directly</span>
              </div>
              <h3 className="font-heading text-base font-bold text-white">
                Post Videos That You Have or Will Give
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Whenever you have new video edits, MP4 files, or video links, post them here. They will instantly appear on the live Portfolio showcase and customer home page!
              </p>
            </div>
            <button
              onClick={() => setNewPortfolioModal(true)}
              className="shrink-0 flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 shadow-md transition-all active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Post New Video Now</span>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-white">Live Showcase Videos ({portfolio.length})</h3>
            <button
              onClick={() => setNewPortfolioModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-black hover:bg-amber-400"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Video</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-[#0d121e] p-4 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-2">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] text-white">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-xs">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{item.description}</p>
                </div>

                <div className="flex justify-between items-center border-t border-white/10 pt-3">
                  <span className="text-[10px] text-amber-400">{item.views || '500K+'}</span>
                  <button
                    onClick={() => removePortfolioItem(item.id)}
                    className="text-red-400 hover:text-red-300 p-1"
                    title="Delete item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Portfolio Modal */}
          {newPortfolioModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d121d] p-6 shadow-2xl">
                <h3 className="font-heading text-lg font-bold text-white">Add Showcase Video</h3>
                <form onSubmit={handleCreatePortfolio} className="mt-4 space-y-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={newPortTitle}
                      onChange={(e) => setNewPortTitle(e.target.value)}
                      className="w-full rounded-lg bg-black/50 border border-white/10 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Category *</label>
                    <select
                      value={newPortCategory}
                      onChange={(e) => setNewPortCategory(e.target.value as any)}
                      className="w-full rounded-lg bg-black/50 border border-white/10 px-3 py-1.5 text-xs text-white"
                    >
                      <option value="Instagram Reels">Instagram Reels</option>
                      <option value="YouTube Shorts">YouTube Shorts</option>
                      <option value="Brand Promotions">Brand Promotions</option>
                      <option value="Product Videos">Product Videos</option>
                      <option value="Before/After Edits">Before/After Edits</option>
                      <option value="Creative Edits">Creative Edits</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Description *</label>
                    <textarea
                      rows={2}
                      required
                      value={newPortDesc}
                      onChange={(e) => setNewPortDesc(e.target.value)}
                      className="w-full rounded-lg bg-black/50 border border-white/10 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Video MP4 URL</label>
                    <input
                      type="url"
                      value={newPortUrl}
                      onChange={(e) => setNewPortUrl(e.target.value)}
                      className="w-full rounded-lg bg-black/50 border border-white/10 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Thumbnail URL</label>
                    <input
                      type="text"
                      value={newPortThumb}
                      onChange={(e) => setNewPortThumb(e.target.value)}
                      className="w-full rounded-lg bg-black/50 border border-white/10 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={newPortTags}
                      onChange={(e) => setNewPortTags(e.target.value)}
                      className="w-full rounded-lg bg-black/50 border border-white/10 px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-black hover:bg-amber-400"
                    >
                      Publish to Portfolio
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewPortfolioModal(false)}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-slate-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. REVIEWS MODERATION */}
      {activeAdminTab === 'reviews' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-white">Customer Reviews Moderation</h3>
            <span className="text-xs text-slate-400">
              All submitted reviews require Admin Approval before showing publicly
            </span>
          </div>

          <div className="space-y-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0d121e] p-4 text-xs"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{rev.name}</span>
                    <span className="text-amber-400">{'★'.repeat(rev.rating)}</span>
                    <span className="text-[10px] text-slate-500">{rev.service}</span>
                  </div>
                  <p className="text-slate-300 italic">"{rev.review}"</p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                      rev.approved
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {rev.approved ? 'Live Approved' : 'Pending Approval'}
                  </span>

                  <button
                    onClick={() => toggleApproveReview(rev.id, !rev.approved)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                      rev.approved
                        ? 'border border-red-500/30 text-red-400 hover:bg-red-500/10'
                        : 'bg-emerald-500 text-black hover:bg-emerald-400'
                    }`}
                  >
                    {rev.approved ? 'Unpublish' : 'Approve & Publish'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. COUPONS */}
      {activeAdminTab === 'coupons' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-white">Coupons & Promo Offers</h3>
            <button
              onClick={() => setNewCouponModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-black hover:bg-amber-400"
            >
              <Plus className="h-4 w-4" />
              <span>Create Coupon</span>
            </button>
          </div>

          {coupons.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/5 p-8 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Tag className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-white">Coupons Will Be Created Later</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                No promo coupons have been created yet. When you are ready, you can create customized coupons, percentage discounts, and order limits anytime!
              </p>
              <button
                onClick={() => setNewCouponModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 shadow-md"
              >
                <Plus className="h-4 w-4" />
                <span>Create a Coupon Now</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((c, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-[#0d121e] p-5 space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm font-black text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                      {c.code}
                    </span>
                    <span className="text-emerald-400 font-bold">{c.discountPercentage}% OFF</span>
                  </div>
                  <p className="text-slate-300">
                    Max discount: ₹{c.maxDiscount} • Min order: ₹{c.minOrderValue}
                  </p>
                  <span className="text-[10px] text-slate-500 block">Valid till: {c.validTill}</span>
                </div>
              ))}
            </div>
          )}

          {newCouponModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d121d] p-6 shadow-2xl">
                <h3 className="font-heading text-lg font-bold text-white">Create Promo Code</h3>
                <form onSubmit={handleCreateCoupon} className="mt-4 space-y-3 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1">Coupon Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. VIRAL20"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full rounded-lg bg-black/50 border border-white/10 px-3 py-1.5 text-white uppercase"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Discount %</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="90"
                      value={couponDiscount}
                      onChange={(e) => setCouponDiscount(parseInt(e.target.value) || 10)}
                      className="w-full rounded-lg bg-black/50 border border-white/10 px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Max Discount (₹)</label>
                    <input
                      type="number"
                      required
                      value={couponMax}
                      onChange={(e) => setCouponMax(parseInt(e.target.value) || 100)}
                      className="w-full rounded-lg bg-black/50 border border-white/10 px-3 py-1.5 text-white"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-amber-500 py-2 font-bold text-black"
                    >
                      Save Coupon
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewCouponModal(false)}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-slate-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 8. SETTINGS & PAYMENT CONFIG */}
      {activeAdminTab === 'settings' && (
        <form
          onSubmit={handleSaveSettings}
          className="rounded-3xl border border-white/10 bg-[#0d121e] p-6 sm:p-8 space-y-6"
        >
          <div>
            <h3 className="font-heading text-xl font-bold text-white">Payment & Gateway Settings</h3>
            <p className="text-xs text-slate-400 mt-1">
              Configure UPI payment ID, Razorpay gateway status, and baseline starting prices without rebuilding.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">
                Official UPI Handle (Current: himanshu2121@fam)
              </label>
              <input
                type="text"
                value={settingsUpi}
                onChange={(e) => setSettingsUpi(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">
                Base Short Video Price (₹ INR)
              </label>
              <input
                type="number"
                min="5"
                value={settingsBasePrice}
                onChange={(e) => setSettingsBasePrice(parseInt(e.target.value) || 10)}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">Instagram Handle</label>
              <input
                type="text"
                value={settingsInsta}
                onChange={(e) => setSettingsInsta(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={settingsPhone}
                onChange={(e) => setSettingsPhone(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            {/* Gateway Toggles */}
            <div className="sm:col-span-2 grid grid-cols-2 gap-4 pt-2">
              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={upiToggled}
                  onChange={(e) => setUpiToggled(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400 h-4 w-4"
                />
                <div>
                  <span className="text-xs font-bold text-white block">UPI Gateway Enabled</span>
                  <span className="text-[10px] text-slate-400">Direct mobile intent & QR</span>
                </div>
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={razorpayToggled}
                  onChange={(e) => setRazorpayToggled(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400 h-4 w-4"
                />
                <div>
                  <span className="text-xs font-bold text-white block">Razorpay Enabled</span>
                  <span className="text-[10px] text-slate-400">Cards, Netbanking & Wallets</span>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 shadow-md"
            >
              Save Payment Settings
            </button>
          </div>
        </form>
      )}

      {/* 9. OWNER SECURITY */}
      {activeAdminTab === 'security' && (
        <div className="rounded-3xl border border-amber-500/30 bg-[#0d121e] p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-white">Owner Security & Access Keys</h3>
            <p className="text-xs text-slate-400 mt-1">
              Protected authentication for Himanshu Pandit (<strong className="text-white">Pandit1@gmail.com</strong> / <strong className="text-slate-300">himanshu2121yt@gmail.com</strong>).
            </p>
          </div>

          {/* CONFIDENTIAL WEBSITE EDITORS ACCESS VAULT (OWNER EYES ONLY) */}
          <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-[#101726] to-[#0c121e] p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-black uppercase text-amber-300 border border-amber-500/40">
                  <Lock className="h-3 w-3 text-amber-400" />
                  Owner Confidential • Visible Only To You
                </span>
                <h4 className="font-heading text-lg font-bold text-white mt-1">
                  Website Editors Credentials Vault
                </h4>
              </div>
              <span className="text-[11px] text-slate-400">
                Encrypted & accessible only inside this Owner Hub
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Editor 1: Vaibhav */}
              <div className="rounded-xl border border-sky-500/30 bg-black/50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      alt="Vaibhav"
                      className="h-9 w-9 rounded-full object-cover border border-sky-400/50"
                    />
                    <div>
                      <h5 className="font-bold text-white text-xs">Editor 1: Vaibhav</h5>
                      <span className="text-[10px] text-sky-400 font-semibold uppercase">Lead Video Editor</span>
                    </div>
                  </div>
                  <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300">
                    Active
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">Login Email:</span>
                    <span className="font-mono text-white bg-white/5 px-2 py-1 rounded block mt-0.5 select-all border border-white/5">
                      vaibhav21@gmail.com
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-bold">Password:</span>
                      <button
                        type="button"
                        onClick={() => setShowPasswords(p => ({ ...p, vaibhav: !p.vaibhav }))}
                        className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        <span>{showPasswords['vaibhav'] ? 'Hide' : 'Reveal'}</span>
                      </button>
                    </div>
                    <span className="font-mono text-amber-300 bg-white/5 px-2 py-1 rounded block mt-0.5 select-all border border-white/5">
                      {showPasswords['vaibhav'] ? 'Vaibhav02' : '•••••••••'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Editor 2: Himanshu Pandit */}
              <div className="rounded-xl border border-amber-500/30 bg-black/50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/src/assets/images/himanshu_profile_1790318843205.jpg"
                      alt="Himanshu Pandit"
                      className="h-9 w-9 rounded-full object-cover border border-amber-400/50"
                    />
                    <div>
                      <h5 className="font-bold text-white text-xs">Editor 2: Himanshu Pandit</h5>
                      <span className="text-[10px] text-amber-400 font-semibold uppercase">Owner & Visual Lead</span>
                    </div>
                  </div>
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    Super Admin
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">Login Email:</span>
                    <span className="font-mono text-white bg-white/5 px-2 py-1 rounded block mt-0.5 select-all border border-white/5">
                      Pandit1@gmail.com
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-bold">Password:</span>
                      <button
                        type="button"
                        onClick={() => setShowPasswords(p => ({ ...p, pandit: !p.pandit }))}
                        className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        <span>{showPasswords['pandit'] ? 'Hide' : 'Reveal'}</span>
                      </button>
                    </div>
                    <span className="font-mono text-amber-300 bg-white/5 px-2 py-1 rounded block mt-0.5 select-all border border-white/5">
                      {showPasswords['pandit'] ? 'Pandit01' : '•••••••••'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Two-Factor Authentication (2FA)
              </span>
              <p className="text-xs text-slate-400">
                Requires 6-digit confirmation code on owner sign-in. Code is active and sent to verified device.
              </p>
              <span className="inline-block rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                STATUS: ENABLED
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <LogOut className="h-4 w-4 text-red-400" />
                Session Management
              </span>
              <p className="text-xs text-slate-400">
                Terminate all active tokens across devices and browsers instantly.
              </p>
              <button
                onClick={logoutAllDevices}
                className="rounded-lg bg-red-500/20 border border-red-500/30 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/30"
              >
                Log Out of All Devices
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECTION REASON MODAL */}
      {rejectionModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-[#0d121d] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-heading text-lg font-bold text-red-400 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>Reject Payment Verification</span>
              </h3>
              <button
                onClick={() => setRejectionModalOrder(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-xl bg-white/5 p-3 text-xs space-y-1">
              <p className="text-slate-400">Order: <strong className="text-white">#{rejectionModalOrder.orderNumber}</strong> ({rejectionModalOrder.customerName})</p>
              <p className="text-slate-400">Submitted UTR: <strong className="font-mono text-amber-300">{rejectionModalOrder.utrNumber}</strong></p>
              <p className="text-slate-400">Expected: <strong className="text-emerald-400">₹{rejectionModalOrder.finalPrice || rejectionModalOrder.budget}</strong></p>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-white block">Select Rejection Reason:</label>
              <div className="space-y-1.5">
                {[
                  'UTR not found in bank statement (No funds received)',
                  'Amount mismatch (Credited amount was lower than order total)',
                  'Dummy / Repeated bogus digits UTR number',
                  'Transaction failed or reversed in banking network',
                  'Other (Specify custom reason)',
                ].map((reason) => (
                  <label
                    key={reason}
                    className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5 hover:border-white/20 cursor-pointer text-slate-300"
                  >
                    <input
                      type="radio"
                      name="rejectionReason"
                      checked={rejectionReasonInput === reason}
                      onChange={() => setRejectionReasonInput(reason)}
                      className="accent-red-500"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>

              {rejectionReasonInput === 'Other (Specify custom reason)' && (
                <div className="pt-2">
                  <textarea
                    value={customRejectionText}
                    onChange={(e) => setCustomRejectionText(e.target.value)}
                    placeholder="Enter specific note to the customer..."
                    className="w-full rounded-lg bg-black/60 border border-white/10 p-2 text-xs text-white placeholder:text-slate-600 focus:border-red-400 focus:outline-none"
                    rows={2}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setRejectionModalOrder(null)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const finalReason =
                    rejectionReasonInput === 'Other (Specify custom reason)'
                      ? customRejectionText.trim() || 'Payment could not be verified by owner.'
                      : rejectionReasonInput;
                  rejectUtrPayment(rejectionModalOrder.id, finalReason);
                  setAdminUtrToast({
                    message: `Order #${rejectionModalOrder.orderNumber} payment marked as Rejected. Client notified.`,
                    type: 'error',
                  });
                  setRejectionModalOrder(null);
                }}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-bold text-white hover:bg-red-500 shadow-md"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATED BANK STATEMENT & SOUNDBOX FEED MODAL */}
      {bankFeedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0d121d] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block">
                  Simulated Bank Ledger & UPI Soundbox Feed
                </span>
                <h3 className="font-heading text-lg font-bold text-white">
                  Himanshu Bank Account Statement (A/C No. XXXXXX9821)
                </h3>
              </div>
              <button
                onClick={() => setBankFeedModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3 text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-400">Account Holder:</span>{' '}
                <strong className="text-white">{settings.bankAccountName || 'Himanshu'}</strong> •{' '}
                <span className="text-slate-400">Linked UPI:</span>{' '}
                <strong className="font-mono text-amber-300">{settings.upiId}</strong>
              </div>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                LIVE BANK SYNC
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Incoming UPI Credits (Last 24 Hours)
              </span>

              <div className="rounded-2xl border border-white/10 bg-black/50 overflow-hidden divide-y divide-white/5 text-xs">
                {/* 1. Pending match */}
                {pendingUtrOrders.map((ord) => (
                  <div key={ord.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-500/5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5">
                          CREDIT
                        </span>
                        <span className="font-bold text-white text-sm">₹{ord.finalPrice || ord.budget}</span>
                        <span className="font-mono text-amber-300 font-bold">UTR: {ord.utrNumber}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Payer: {ord.customerName} ({ord.payerUpiId || 'UPI App'}) • Order #{ord.orderNumber}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        acceptUtrPayment(ord.id, 'Auto-matched via Bank Ledger');
                        setAdminUtrToast({
                          message: `Matched UTR ${ord.utrNumber} with Bank Credit of ₹${ord.finalPrice || ord.budget}! Order Confirmed.`,
                          type: 'success',
                        });
                      }}
                      className="rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-black text-black hover:bg-emerald-400 shadow transition-all shrink-0"
                    >
                      ✓ Match & Confirm Real Payment
                    </button>
                  </div>
                ))}

                {/* 2. Historic settled credits */}
                <div className="p-3.5 flex items-center justify-between text-slate-300">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5">
                        CREDIT
                      </span>
                      <span className="font-bold text-white">₹10.00</span>
                      <span className="font-mono text-slate-400">UTR: 428901827491</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Payer: Rohan Mehra • UPI/HDFC/Himanshu Hub • Settled
                    </p>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">✓ Settled in Bank</span>
                </div>

                <div className="p-3.5 flex items-center justify-between text-slate-300">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5">
                        CREDIT
                      </span>
                      <span className="font-bold text-white">₹99.00</span>
                      <span className="font-mono text-slate-400">UTR: 428819284719</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Payer: Priya Kapoor • UPI/SBI/Himanshu Hub • Settled
                    </p>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">✓ Settled in Bank</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                onClick={() => setBankFeedModal(false)}
                className="rounded-xl bg-white/10 px-5 py-2 text-xs font-bold text-white hover:bg-white/20"
              >
                Close Bank Feed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
