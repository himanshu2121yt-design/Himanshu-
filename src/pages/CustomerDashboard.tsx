import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  Coins,
  Download,
  Eye,
  FileText,
  FileVideo,
  Layers,
  MessageCircle,
  Package,
  Play,
  Plus,
  RefreshCw,
  Repeat,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Upload,
  User,
  Video,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderItem, OrderStatus } from '../types';
import { PaymentVerification } from '../components/PaymentVerification';

interface CustomerDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ setActiveTab }) => {
  const {
    currentUser,
    orders,
    userSubscription,
    cancelSubscription,
    upgradeSubscription,
    useCredits,
    requestRevision,
    createOrder,
    brandKit,
    updateBrandKit,
    openCheckout,
    openReceipt,
    acceptUtrPayment,
    settings,
  } = useApp();

  const [activeTab, setActiveInternalTab] = useState<'orders' | 'subscription' | 'brand-kit'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [verifyingOrder, setVerifyingOrder] = useState<OrderItem | null>(null);
  
  // Revision modal state
  const [revisionOrderId, setRevisionOrderId] = useState<string | null>(null);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [revisionTimecode, setRevisionTimecode] = useState('');

  // Smart Order Modal using credits
  const [creditOrderModal, setCreditOrderModal] = useState(false);
  const [creditOrderTitle, setCreditOrderTitle] = useState('New Reel using Subscription Credit');
  const [creditOrderStyle, setCreditOrderStyle] = useState('Alex Hormozi Viral Kinetic Captions');
  const [creditOrderNotes, setCreditOrderNotes] = useState(brandKit.savedInstructions || '');
  const [creditOrderCost, setCreditOrderCost] = useState(1);

  // Status step progression helper
  const statusPipeline: OrderStatus[] = [
    'Request Received',
    'Processing',
    'Confirmed',
    'Editing',
    'Review',
    'Revision',
    'Completed',
  ];

  const getStepIndex = (status: OrderStatus) => statusPipeline.indexOf(status);

  // Filter orders for current view
  const myOrders = currentUser
    ? orders.filter(
        (o) =>
          o.customerEmail.toLowerCase() === currentUser.email.toLowerCase() ||
          currentUser.role === 'owner' ||
          currentUser.role === 'admin'
      )
    : orders;

  const activeOrders = myOrders.filter((o) => o.status !== 'Completed');
  const completedOrders = myOrders.filter((o) => o.status === 'Completed');

  // Submit revision
  const handleSendRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionOrderId || !revisionNotes.trim()) return;
    requestRevision(revisionOrderId, revisionNotes, revisionTimecode);
    setRevisionOrderId(null);
    setRevisionNotes('');
    setRevisionTimecode('');
  };

  // Submit smart order with credits
  const handleCreateCreditOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSubscription || userSubscription.remainingCredits < creditOrderCost) return;

    const ok = useCredits(creditOrderCost);
    if (ok) {
      createOrder({
        customerName: currentUser?.name || 'Subscribed Creator',
        customerEmail: currentUser?.email || 'creator@example.com',
        service: 'Creator Subscription',
        packageTitle: creditOrderTitle,
        numberOfVideos: 1,
        videoLength: '30-45 sec',
        editingStyle: creditOrderStyle,
        deadline: '24h Priority Queue',
        budget: 0,
        finalPrice: 0,
        additionalInstructions: creditOrderNotes,
        status: 'Confirmed',
        paymentStatus: 'Successful',
        paymentMethod: `Subscription Credit (${creditOrderCost} credit)`,
        usedCredits: creditOrderCost,
      });
      setCreditOrderModal(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider">
            Creator Workspace
          </span>
          <h1 className="font-heading text-3xl font-black text-white mt-0.5">
            Customer & Order Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Welcome back, <strong className="text-white">{currentUser?.name || 'Creator'}</strong> (
            {currentUser?.email || 'Guest Client'})
          </p>
        </div>

        <div className="flex items-center gap-2">
          {userSubscription && userSubscription.status === 'active' ? (
            <button
              onClick={() => setCreditOrderModal(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-bold text-black hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Coins className="h-4 w-4 fill-black" />
              <span>Use Credit (Upload Video)</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('hire-me')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-bold text-black hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>New Video Order</span>
            </button>
          )}
        </div>
      </div>

      {/* SUBSCRIPTION WIDGET BANNER */}
      {userSubscription && (
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-[#121927] via-[#0f1422] to-[#121927] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Low credit alert if <= 5 */}
          {userSubscription.remainingCredits <= 5 && (
            <div className="mb-4 rounded-xl border border-amber-500/50 bg-amber-500/20 p-3 text-xs text-amber-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="h-4 w-4 text-amber-400" />
                You have {userSubscription.remainingCredits} editing credits remaining in your {userSubscription.planName}.
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCreditOrderModal(true)}
                  className="rounded bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-black"
                >
                  Upload Video
                </button>
                <button
                  onClick={() => setActiveTab('creator-plans')}
                  className="rounded border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white"
                >
                  Upgrade Plan
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Plan</span>
              <h3 className="font-heading text-xl font-black text-white flex items-center gap-2">
                {userSubscription.planName}
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase">
                  {userSubscription.status}
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">₹{userSubscription.monthlyFee}/month</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Credits Usage</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-heading text-2xl font-black text-amber-400">
                  {userSubscription.usedCredits}
                </span>
                <span className="text-xs text-slate-400">/ {userSubscription.totalMonthlyCredits} used</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-1.5 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (userSubscription.usedCredits / userSubscription.totalMonthlyCredits) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Remaining Credits</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-heading text-2xl font-black text-emerald-400">
                  {userSubscription.remainingCredits}
                </span>
                <span className="text-xs text-slate-400">credits left</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Renews on: <strong className="text-white">{userSubscription.renewalDate}</strong>
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setCreditOrderModal(true)}
                className="rounded-xl bg-amber-500 py-2.5 text-xs font-black text-black hover:bg-amber-400 transition-all text-center shadow-md"
              >
                Upload New Video (1 Credit)
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('creator-plans')}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 py-1.5 text-[11px] font-semibold text-slate-300 hover:bg-white/10"
                >
                  Upgrade
                </button>
                <button
                  onClick={cancelSubscription}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-red-400 hover:bg-red-500/10"
                  title="Cancel auto renewal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Internal Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveInternalTab('orders')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-amber-500 text-black'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Video className="h-3.5 w-3.5" />
          <span>My Orders ({myOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveInternalTab('brand-kit')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'brand-kit'
              ? 'bg-amber-500 text-black'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Saved Brand Kit & Preferences</span>
        </button>
      </div>

      {/* TAB 1: ORDERS LIST */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Creative & Technical Team Card for Customers */}
          <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-r from-[#121929] via-[#0e1422] to-[#121826] p-4 sm:p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3 mb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Your Dedicated Production & Platform Team
                </span>
                <h3 className="font-heading text-sm sm:text-base font-bold text-white mt-0.5">
                  Experts Assigned to Your Video Edits & Automations
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">
                100% Quality Guaranteed • Turnaround within 24–48h
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Video Editor Card */}
              <div className="flex items-center gap-3 rounded-xl bg-black/40 border border-sky-500/20 p-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Vaibhav"
                  className="h-10 w-10 rounded-full object-cover border border-sky-400/40 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-white text-xs">Vaibhav</h4>
                    <span className="rounded bg-sky-500/20 px-1.5 py-0.2 text-[9px] font-bold text-sky-300 uppercase">
                      Lead Video Editor
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Viral kinetic captions, beat-sync cuts, audio mastering & visual punch zooms.
                  </p>
                </div>
              </div>

              {/* Developer Card */}
              <div className="flex items-center gap-3 rounded-xl bg-black/40 border border-amber-500/20 p-3">
                <img
                  src="/src/assets/images/himanshu_profile_1790318843205.jpg"
                  alt="Himanshu"
                  className="h-10 w-10 rounded-full object-cover border border-amber-400/40 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-white text-xs">Himanshu</h4>
                    <span className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[9px] font-bold text-amber-300 uppercase">
                      Platform Developer & Founder
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Automated UTR payment settlements, video pipelines & creator tools.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {myOrders.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center space-y-3">
                <Video className="h-10 w-10 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No Orders Placed Yet</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Hire Himanshu starting at just ₹10 per video or subscribe to a monthly creator plan.
                </p>
                <button
                  onClick={() => setActiveTab('hire-me')}
                  className="rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-black"
                >
                  Create First Order
                </button>
              </div>
            ) : (
              myOrders.map((order) => {
                const currentStepIndex = getStepIndex(order.status);
                return (
                  <div
                    key={order.id}
                    className="rounded-3xl border border-white/10 bg-[#0d121e] p-6 shadow-xl space-y-6"
                  >
                    {/* Order Top Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-amber-400">
                            #{order.orderNumber}
                          </span>
                          <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                            {order.service}
                          </span>
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                              order.paymentStatus === 'Successful'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            Payment: {order.paymentStatus}
                          </span>
                        </div>
                        <h3 className="font-heading text-lg font-bold text-white mt-1">
                          {order.packageTitle || order.editingStyle}
                        </h3>
                        <p className="text-xs text-slate-400">
                          Placed on: {new Date(order.createdAt).toLocaleDateString()} • Video Editor:{' '}
                          <strong className="text-white">{order.assignedEditorName || 'Vaibhav'}</strong> • Developer:{' '}
                          <strong className="text-amber-300">{order.assignedDeveloperName || 'Himanshu'}</strong>
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* Verify Payment with UTR component button */}
                        {order.paymentStatus !== 'Successful' && (
                          <button
                            onClick={() => setVerifyingOrder(order)}
                            className="flex items-center gap-1.5 rounded-xl border border-amber-500/50 bg-amber-500/15 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/25 shadow-sm transition-all active:scale-95"
                          >
                            <ShieldCheck className="h-4 w-4 text-amber-400" />
                            <span>Verify Payment</span>
                          </button>
                        )}

                        {/* Order status: Processing badge */}
                        {order.status === 'Processing' && (
                          <span className="rounded-xl bg-sky-500/20 border border-sky-500/40 px-3 py-1.5 text-xs font-bold text-sky-300 flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 animate-spin text-sky-400" />
                            <span>Processing UTR</span>
                          </span>
                        )}

                        {/* If unpaid or rejected */}
                        {(order.paymentStatus === 'Pending' || order.paymentStatus === 'Failed' || order.paymentStatus === 'Rejected') && (
                          <button
                            onClick={() => {
                              openCheckout({
                                title: `Order #${order.orderNumber}`,
                                amount: order.finalPrice || order.budget || 10,
                                serviceType: order.service,
                                orderId: order.id,
                              });
                            }}
                            className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold text-black hover:from-amber-400 hover:to-amber-500 shadow-md"
                          >
                            {order.paymentStatus === 'Rejected' ? 'Re-enter Real UTR' : `Pay ₹${order.finalPrice || order.budget || 10}`}
                          </button>
                        )}

                        {/* If under verification */}
                        {order.paymentStatus === 'Under Verification' && (
                          <div className="flex items-center gap-2">
                            <span className="rounded-xl bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 text-xs font-bold text-amber-300 flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 animate-pulse text-amber-400" />
                              <span>UTR Under Bank Verification</span>
                            </span>
                            <button
                              onClick={() => {
                                openCheckout({
                                  title: `Order #${order.orderNumber}`,
                                  amount: order.finalPrice || order.budget || 10,
                                  serviceType: order.service,
                                  orderId: order.id,
                                });
                              }}
                              className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/10"
                            >
                              View Details
                            </button>
                          </div>
                        )}

                        {/* View Receipt */}
                        {order.paymentStatus === 'Successful' && (
                          <button
                            onClick={() => openReceipt(order)}
                            className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Receipt</span>
                          </button>
                        )}

                        {/* Request Revision if Review or Completed */}
                        {(order.status === 'Review' || order.status === 'Completed') && (
                          <button
                            onClick={() => setRevisionOrderId(order.id)}
                            className="flex items-center gap-1 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-400 hover:bg-amber-500/20"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                            <span>Request Revision</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* UTR VERIFICATION ACTIVE NOTIFICATION BANNER */}
                    {order.paymentStatus === 'Under Verification' && (
                      <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-[#131a29] to-[#0e1422] p-4 text-xs space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="flex h-3 w-3 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                            </span>
                            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                              Real Payment Verification in Progress
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">
                            Bank Settlement Verification by Himanshu
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-black/40 p-3 rounded-xl border border-white/5">
                          <div>
                            <span className="text-[10px] text-slate-400 block mb-0.5">Submitted 12-Digit UTR:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-bold text-amber-300 bg-black/60 px-2.5 py-1 rounded border border-amber-500/20 tracking-wider">
                                {order.utrNumber || '428919283741'}
                              </span>
                            </div>
                            {order.payerUpiId && (
                              <p className="text-[10px] text-slate-400 mt-1">
                                Payer UPI: <span className="text-slate-200">{order.payerUpiId}</span>
                              </p>
                            )}
                          </div>

                          <div className="text-left sm:text-right">
                            <span className="text-[10px] text-slate-400 block mb-0.5">Expected Credit:</span>
                            <span className="text-base font-black text-emerald-400">
                              ₹{order.finalPrice || order.budget || 10}
                            </span>
                            <p className="text-[10px] text-slate-400">
                              Payee: <strong className="text-slate-200">{settings.upiId}</strong>
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/5">
                          <p className="text-[11px] text-slate-300">
                            Himanshu confirms each transfer in his bank statement before starting the cut.
                          </p>

                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hi Himanshu, I submitted UTR ${order.utrNumber || ''} for Order #${order.orderNumber}. Please verify!`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 text-[11px] font-bold text-emerald-300 hover:bg-emerald-500/30"
                            >
                              <MessageCircle className="h-3 w-3" />
                              <span>WhatsApp Himanshu</span>
                            </a>

                            <button
                              onClick={() => acceptUtrPayment(order.id, 'Confirmed by Owner Simulation')}
                              className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1.5 text-[11px] font-bold text-black hover:from-amber-400 hover:to-amber-500 shadow"
                            >
                              <Zap className="h-3 w-3 fill-black" />
                              <span>⚡ Test: Simulate Bank Acceptance</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* UTR REJECTED ALERT */}
                    {order.paymentStatus === 'Rejected' && (
                      <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-xs space-y-2">
                        <div className="flex items-center justify-between text-red-400 font-bold">
                          <span className="flex items-center gap-1.5">
                            <AlertCircle className="h-4 w-4" /> Payment Verification Rejected
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          Himanshu flagged this transaction: <strong className="text-red-300">{order.paymentRejectionReason || 'UTR not found in bank ledger or amount mismatched.'}</strong>
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => {
                              openCheckout({
                                title: `Order #${order.orderNumber}`,
                                amount: order.finalPrice || order.budget || 10,
                                serviceType: order.service,
                                orderId: order.id,
                              });
                            }}
                            className="rounded-lg bg-amber-500 px-3.5 py-1.5 text-[11px] font-bold text-black hover:bg-amber-400"
                          >
                            Re-submit Valid 12-Digit UTR
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Visual Progress Timeline */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Order Pipeline Timeline
                      </span>
                      <div className="grid grid-cols-6 gap-1 relative">
                        {statusPipeline.map((step, idx) => {
                          const isDone = idx <= currentStepIndex;
                          const isCurrent = idx === currentStepIndex;
                          return (
                            <div key={step} className="flex flex-col items-center text-center">
                              <div
                                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                                  isDone
                                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30'
                                    : 'bg-white/5 text-slate-500 border border-white/10'
                                } ${isCurrent ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black' : ''}`}
                              >
                                {isDone ? '✓' : idx + 1}
                              </div>
                              <span
                                className={`text-[9px] mt-1.5 font-bold leading-tight ${
                                  isDone ? 'text-white' : 'text-slate-500'
                                }`}
                              >
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Video Preview or Final Video Delivery Section */}
                    {(order.previewVideoUrl || order.finalVideoUrl) && (
                      <div className="rounded-2xl border border-amber-500/30 bg-black/40 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5" />
                            {order.finalVideoUrl ? 'Final Render Ready!' : 'Draft Preview Available'}
                          </span>
                          {order.finalVideoUrl && (
                            <a
                              href={order.finalVideoUrl}
                              download
                              className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-black hover:bg-emerald-400"
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span>Download 4K Video</span>
                            </a>
                          )}
                        </div>

                        <div className="relative aspect-video w-full max-w-md mx-auto overflow-hidden rounded-xl bg-black">
                          <video
                            src={order.finalVideoUrl || order.previewVideoUrl}
                            controls
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Timeline Event Log */}
                    {order.timeline && order.timeline.length > 0 && (
                      <div className="rounded-xl bg-white/5 p-3 text-xs space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Latest Progress Note
                        </span>
                        <p className="text-slate-200">
                          {order.timeline[order.timeline.length - 1].note} (
                          <span className="text-slate-400">
                            {order.timeline[order.timeline.length - 1].timestamp}
                          </span>
                          )
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: BRAND KIT & PREFERENCES */}
      {activeTab === 'brand-kit' && (
        <div className="rounded-3xl border border-white/10 bg-[#0d121e] p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-white">Creator Onboarding & Brand Kit</h3>
            <p className="text-xs text-slate-400 mt-1">
              Save your preferred editing styles, brand colors, and guidelines so our editors automatically
              tailor your videos without asking every time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">Creator Name</label>
              <input
                type="text"
                value={brandKit.creatorName}
                onChange={(e) => updateBrandKit({ creatorName: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">Instagram Handle</label>
              <input
                type="text"
                value={brandKit.instagram}
                onChange={(e) => updateBrandKit({ instagram: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">Content Category</label>
              <input
                type="text"
                value={brandKit.contentCategory}
                onChange={(e) => updateBrandKit({ contentCategory: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1">Caption Typography Style</label>
              <input
                type="text"
                value={brandKit.captionStyle}
                onChange={(e) => updateBrandKit({ captionStyle: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-200 block mb-1">
                Frequently Used Instructions (Auto-applied to new cuts)
              </label>
              <textarea
                rows={3}
                value={brandKit.savedInstructions}
                onChange={(e) => updateBrandKit({ savedInstructions: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <span className="text-xs text-emerald-400 font-semibold">✓ Automatically saved to profile</span>
          </div>
        </div>
      )}

      {/* REVISION REQUEST MODAL */}
      {revisionOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d121d] p-6 shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-white">Request Revisions</h3>
            <p className="text-xs text-slate-400 mt-1">
              Be specific with timestamps so our editors can make rapid adjustments.
            </p>

            <form onSubmit={handleSendRevision} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Specific Timecodes (e.g. 0:14, 0:28)
                </label>
                <input
                  type="text"
                  value={revisionTimecode}
                  onChange={(e) => setRevisionTimecode(e.target.value)}
                  placeholder="0:14 - change subtitle font"
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Revision Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  placeholder="What would you like adjusted? E.g., make background audio softer, faster cuts in the beginning..."
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-black hover:bg-amber-400"
                >
                  Send Revision Request
                </button>
                <button
                  type="button"
                  onClick={() => setRevisionOrderId(null)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-slate-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SMART ORDER MODAL (Using Subscription Credits) */}
      {creditOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-amber-500/40 bg-[#0d121d] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-amber-400" />
                <h3 className="font-heading text-lg font-bold text-white">
                  Create Video with Subscription Credits
                </h3>
              </div>
              <button
                onClick={() => setCreditOrderModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCreditOrder} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Project Title / Concept *
                </label>
                <input
                  type="text"
                  required
                  value={creditOrderTitle}
                  onChange={(e) => setCreditOrderTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Editing Style
                </label>
                <select
                  value={creditOrderStyle}
                  onChange={(e) => setCreditOrderStyle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white"
                >
                  <option value="Alex Hormozi Viral Kinetic Captions">
                    Alex Hormozi Style (1 Credit)
                  </option>
                  <option value="Ali Abdaal Clean Minimalist">Ali Abdaal Style (1 Credit)</option>
                  <option value="High-Energy Gym/Fitness Beat Drop">Fitness Beat Drop (1 Credit)</option>
                  <option value="Heavy 3D Motion Graphics VFX">Heavy 3D VFX (2 Credits)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Instructions / Script
                </label>
                <textarea
                  rows={3}
                  value={creditOrderNotes}
                  onChange={(e) => setCreditOrderNotes(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 flex justify-between items-center text-xs">
                <span className="text-slate-300">Credits Deducted:</span>
                <span className="font-bold text-amber-400 font-mono">
                  {creditOrderCost} Credit ({userSubscription?.remainingCredits} available)
                </span>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-black text-black hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20"
              >
                Confirm & Submit Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PAYMENT VERIFICATION MODAL DIALOG */}
      {verifyingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg my-auto animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setVerifyingOrder(null)}
              className="absolute top-4 right-4 z-10 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <PaymentVerification
              order={verifyingOrder}
              onCancel={() => setVerifyingOrder(null)}
              onVerified={() => {
                // Client confirmed and backend task dispatched
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
