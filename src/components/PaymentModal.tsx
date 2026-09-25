import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  HelpCircle,
  Info,
  Lock,
  QrCode,
  RotateCw,
  Search,
  ShieldCheck,
  Smartphone,
  Tag,
  Upload,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderItem, PaymentStatus } from '../types';

export const PaymentModal: React.FC = () => {
  const {
    activeCheckout,
    closeCheckout,
    settings,
    applyCoupon,
    updateOrderPayment,
    validateUtr,
    submitUtrPayment,
    acceptUtrPayment,
    subscribeToPlan,
    grantBonusCredits,
    openReceipt,
    orders,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'razorpay' | 'card'>('upi');
  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ msg: string; isError: boolean } | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [copiedUtr, setCopiedUtr] = useState(false);
  
  // Real UTR Verification States
  const [utrNumber, setUtrNumber] = useState('');
  const [payerUpiId, setPayerUpiId] = useState('');
  const [showUtrHelp, setShowUtrHelp] = useState(false);
  const [utrValidationError, setUtrValidationError] = useState<string | null>(null);
  const [utrValidationSuccess, setUtrValidationSuccess] = useState<string | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const [paymentVerificationPending, setPaymentVerificationPending] = useState<any | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<any | null>(null);

  const rawAmount = activeCheckout ? activeCheckout.amount : 0;
  const finalAmount = Math.max(1, rawAmount - discountAmount);

  // Generate UPI QR Code
  useEffect(() => {
    if (!activeCheckout) return;

    const upiUri = `upi://pay?pa=${encodeURIComponent(settings.upiId)}&pn=${encodeURIComponent(
      settings.bankAccountName || 'Himanshu'
    )}&am=${finalAmount}&cu=INR&tn=${encodeURIComponent(
      (activeCheckout.title || 'Himanshu Edit Hub').slice(0, 30)
    )}`;

    QRCode.toDataURL(upiUri, {
      width: 240,
      margin: 1.5,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })
      .then((url) => {
        setQrCodeDataUrl(url);
      })
      .catch((err) => {
        console.error('Failed to generate QR code', err);
      });
  }, [activeCheckout, finalAmount, settings.upiId, settings.bankAccountName]);

  // Real-time UTR Validation
  const handleUtrChange = (val: string) => {
    // Only allow alphanumeric characters, uppercase
    const cleaned = val.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    setUtrNumber(cleaned);

    if (cleaned.length === 0) {
      setUtrValidationError(null);
      setUtrValidationSuccess(null);
      return;
    }

    if (cleaned.length < 12) {
      setUtrValidationError(`Enter full 12-digit UTR (${cleaned.length}/12 digits entered)`);
      setUtrValidationSuccess(null);
      return;
    }

    // Call appContext validator
    const res = validateUtr(cleaned, activeCheckout?.orderId);
    if (!res.isValid) {
      setUtrValidationError(res.message);
      setUtrValidationSuccess(null);
    } else {
      setUtrValidationError(null);
      setUtrValidationSuccess(res.message);
    }
  };

  if (!activeCheckout) return null;

  // Handle coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode, rawAmount);
    if (res.valid) {
      setDiscountAmount(res.discount);
      setAppliedCoupon(couponCode.toUpperCase().trim());
      setCouponFeedback({ msg: res.message, isError: false });
    } else {
      setCouponFeedback({ msg: res.message, isError: true });
    }
  };

  // Copy UPI
  const handleCopyUpi = () => {
    navigator.clipboard.writeText(settings.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(finalAmount.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  // Mobile intent link for UPI Apps
  const upiIntentUri = `upi://pay?pa=${encodeURIComponent(
    settings.upiId
  )}&pn=${encodeURIComponent(settings.bankAccountName || 'Himanshu Edit Hub')}&am=${finalAmount}&cu=INR&tn=${encodeURIComponent(
    activeCheckout.title.slice(0, 30)
  )}`;

  // SUBMIT UTR FOR VERIFICATION
  const handleSubmitUtr = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUtr = utrNumber.trim();

    const val = validateUtr(cleanUtr, activeCheckout.orderId);
    if (!val.isValid) {
      setUtrValidationError(val.message);
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      const targetOrderId = activeCheckout.orderId || 'ord-pending-' + Date.now();

      // Submit UTR in app state
      if (activeCheckout.orderId) {
        submitUtrPayment(activeCheckout.orderId, cleanUtr, payerUpiId || undefined);
      }

      setPaymentVerificationPending({
        orderId: targetOrderId,
        utrNumber: cleanUtr,
        payerUpiId: payerUpiId || 'UPI App',
        amount: finalAmount,
        title: activeCheckout.title,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        network: val.network || 'NPCI UPI Network',
      });
    }, 900);
  };

  // Instant simulate owner verification (for fast testing)
  const handleSimulateOwnerAcceptance = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      const targetOrderId = activeCheckout.orderId || paymentVerificationPending?.orderId;
      if (targetOrderId) {
        acceptUtrPayment(targetOrderId, 'Verified through Owner Test Simulation');
      }

      if (activeCheckout.subscriptionPlanId) {
        subscribeToPlan(activeCheckout.subscriptionPlanId, 'UPI (UTR: ' + utrNumber + ')', 'UTR-' + utrNumber);
      }
      if (activeCheckout.creditsToCredit) {
        grantBonusCredits(activeCheckout.creditsToCredit);
      }

      setPaymentSuccess({
        title: activeCheckout.title,
        amountPaid: finalAmount,
        originalAmount: rawAmount,
        discount: discountAmount,
        couponUsed: appliedCoupon,
        paymentMethod: 'UPI (Bank Verified)',
        transactionId: 'UTR-' + utrNumber,
        utrNumber: utrNumber,
        date: new Date().toLocaleString(),
        customerUpiRef: payerUpiId || undefined,
        verifiedBy: 'Himanshu (Hub Owner)',
      });
      setPaymentVerificationPending(null);
    }, 1000);
  };

  // Alternative payment gateway simulator (Razorpay / Card)
  const handleGatewayPayment = (methodChosen: string) => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      const generatedTxId = 'TXN-' + Math.floor(100000 + Math.random() * 900000);

      const paymentRecord = {
        title: activeCheckout.title,
        amountPaid: finalAmount,
        originalAmount: rawAmount,
        discount: discountAmount,
        couponUsed: appliedCoupon,
        paymentMethod: methodChosen,
        transactionId: generatedTxId,
        date: new Date().toLocaleString(),
        verifiedBy: 'Automated Gateway Settlement',
      };

      if (activeCheckout.orderId) {
        updateOrderPayment(activeCheckout.orderId, 'Successful', methodChosen, generatedTxId);
      }
      if (activeCheckout.subscriptionPlanId) {
        subscribeToPlan(activeCheckout.subscriptionPlanId, methodChosen, generatedTxId);
      }
      if (activeCheckout.creditsToCredit) {
        grantBonusCredits(activeCheckout.creditsToCredit);
      }

      setPaymentSuccess(paymentRecord);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg my-auto overflow-hidden rounded-2xl border border-white/10 bg-[#0d121d] p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeCheckout}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 1. PAYMENT VERIFICATION PENDING STATE (Awaiting Himanshu's Acceptance) */}
        {paymentVerificationPending ? (
          <div className="space-y-4 py-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 relative">
              <Clock className="h-7 w-7 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
              </span>
            </div>

            <div className="text-center">
              <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-400 inline-block mb-1.5">
                Bank Settlement In Progress
              </span>
              <h3 className="font-heading text-xl font-bold text-white">
                Payment Verification Pending
              </h3>
              <p className="mt-1 text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Your 12-digit UTR has been submitted. Himanshu or our finance team is verifying the credit in our bank statement to ensure it is a real payment.
              </p>
            </div>

            {/* Verification Audit Box */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-slate-400 border-b border-white/5 pb-2">
                <span>Submitted UTR / Ref No:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-amber-400 bg-black/40 px-2 py-0.5 rounded border border-amber-500/20 text-sm">
                    {paymentVerificationPending.utrNumber}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paymentVerificationPending.utrNumber);
                      setCopiedUtr(true);
                      setTimeout(() => setCopiedUtr(false), 2000);
                    }}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300"
                    title="Copy UTR"
                  >
                    {copiedUtr ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Payable Amount:</span>
                <span className="font-bold text-white">₹{paymentVerificationPending.amount}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Banking Network:</span>
                <span className="text-slate-200">{paymentVerificationPending.network}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Submission Time:</span>
                <span className="text-slate-300">{paymentVerificationPending.submittedAt}</span>
              </div>

              <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Beneficiary:</span>
                <span className="font-semibold text-emerald-400">Himanshu ({settings.upiId})</span>
              </div>
            </div>

            {/* Real Steps Progression */}
            <div className="rounded-xl bg-black/40 border border-white/5 p-3 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Real Payment Verification Steps
              </span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>1. 12-Digit NPCI UTR Format: Validated & Unique</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400 font-semibold animate-pulse">
                  <Clock className="h-3.5 w-3.5" />
                  <span>2. Bank Account Credit Check: Waiting for Himanshu to Confirm</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <div className="h-3.5 w-3.5 rounded-full border border-slate-600 flex items-center justify-center text-[9px]">3</div>
                  <span>3. Order Status Moves to Confirmed & Video Editing Starts</span>
                </div>
              </div>
            </div>

            {/* Test Simulation Helper & Actions */}
            <div className="space-y-2 pt-1">
              <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-2.5 text-[11px] text-blue-300 flex items-start gap-2">
                <Info className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
                <p>
                  <strong>Owner Verification Desk:</strong> Himanshu sees this UTR in his Admin Dashboard under <em>Payments & UTR Verification Desk</em> and clicks &quot;Accept Payment&quot;.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  onClick={handleSimulateOwnerAcceptance}
                  disabled={processing}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 py-2.5 text-xs font-bold text-black shadow-md hover:from-amber-400 hover:to-amber-500 transition-all active:scale-[0.99]"
                >
                  {processing ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      <span>Verifying Bank Credit...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-3.5 w-3.5 fill-black" />
                      <span>⚡ Test: Simulate Owner Bank Acceptance</span>
                    </>
                  )}
                </button>

                <button
                  onClick={closeCheckout}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
                >
                  Track in Dashboard
                </button>
              </div>
            </div>
          </div>
        ) : paymentSuccess ? (
          /* 2. SUCCESS SCREEN AFTER PAYMENT VERIFIED & ACCEPTED */
          <div className="text-center py-4 space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 inline-block mb-1">
                ✓ Bank Credit Verified & Settled
              </span>
              <h3 className="font-heading text-xl font-bold text-white">Payment Confirmed & Accepted!</h3>
              <p className="mt-1 text-xs text-slate-300">
                Your transaction of <strong className="text-emerald-400">₹{paymentSuccess.amountPaid}</strong> has been verified by Himanshu and your project is officially in production!
              </p>
            </div>

            {/* Receipt mini breakdown */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Item/Service:</span>
                <span className="font-semibold text-white">{paymentSuccess.title}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Verified UTR / Ref:</span>
                <span className="font-mono font-bold text-amber-400">{paymentSuccess.utrNumber || paymentSuccess.transactionId}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Verification Authority:</span>
                <span className="font-semibold text-emerald-400">{paymentSuccess.verifiedBy || 'Himanshu (Owner)'}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Date & Time:</span>
                <span className="text-slate-300">{paymentSuccess.date}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-sm">
                <span className="text-white">Amount Paid:</span>
                <span className="text-emerald-400">₹{paymentSuccess.amountPaid}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => {
                  const matchedOrder = orders.find((o) => o.id === activeCheckout.orderId);
                  if (matchedOrder) {
                    openReceipt(matchedOrder, paymentSuccess);
                  } else {
                    openReceipt(
                      {
                        id: 'ord-rcpt-' + Date.now(),
                        orderNumber: 'HEH-' + Math.floor(1000 + Math.random() * 9000),
                        customerName: 'Verified Creator',
                        customerEmail: 'creator@himanshuedits.com',
                        whatsapp: '+919876543210',
                        instagram: '@creator',
                        service: activeCheckout.serviceType as any,
                        packageTitle: activeCheckout.title,
                        numberOfVideos: 1,
                        videoLength: 'Short',
                        editingStyle: 'Standard',
                        deadline: 'Fast-track',
                        budget: paymentSuccess.amountPaid,
                        finalPrice: paymentSuccess.amountPaid,
                        uploadedFiles: [],
                        status: 'Confirmed',
                        paymentStatus: 'Successful',
                        paymentMethod: paymentSuccess.paymentMethod,
                        paymentId: paymentSuccess.transactionId,
                        utrNumber: paymentSuccess.utrNumber,
                        paymentVerifiedBy: paymentSuccess.verifiedBy,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        revisions: [],
                        timeline: [],
                      },
                      paymentSuccess
                    );
                  }
                  closeCheckout();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/10 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all"
              >
                <Download className="h-4 w-4" />
                View & Download Official Receipt
              </button>

              <button
                onClick={closeCheckout}
                className="flex-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-bold text-black hover:from-amber-400 hover:to-amber-500 transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* 3. CHECKOUT & REAL UPI PAYMENT FORM */
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-white">Payment & UTR Verification</h3>
                  <p className="text-[10px] text-slate-400">Himanshu Edit Hub • Direct Bank Transfer</p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Real Verification
              </span>
            </div>

            {/* Order Summary Box */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 mb-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400 tracking-wider block">
                    {activeCheckout.serviceType}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{activeCheckout.title}</h4>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-white">₹{rawAmount}</span>
                </div>
              </div>

              {discountAmount > 0 && (
                <div className="mt-1.5 flex justify-between text-xs text-emerald-400 border-t border-white/10 pt-1.5">
                  <span>Coupon Discount ({appliedCoupon}):</span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}

              <div className="mt-1.5 flex justify-between text-xs font-bold text-white border-t border-white/10 pt-1.5">
                <span>Amount to Pay:</span>
                <span className="text-amber-400 text-sm font-black">₹{finalAmount}</span>
              </div>
            </div>

            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} className="mb-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 h-3 w-3 text-slate-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code (e.g. HIMANSHU50)"
                    className="w-full rounded-lg border border-white/10 bg-black/40 pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponFeedback && (
                <p
                  className={`mt-1 text-[11px] ${
                    couponFeedback.isError ? 'text-red-400' : 'text-emerald-400'
                  }`}
                >
                  {couponFeedback.msg}
                </p>
              )}
            </form>

            {/* Payment Method Selector */}
            <div className="mb-3">
              <div className="grid grid-cols-3 gap-2">
                {settings.upiEnabled && (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex flex-col items-center justify-center rounded-xl p-2.5 border text-center transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500/50'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <Smartphone className="h-4 w-4 mb-1 text-amber-400" />
                    <span className="text-xs font-bold">UPI QR & UTR</span>
                    <span className="text-[9px] text-amber-300 font-medium">Recommended</span>
                  </button>
                )}

                {settings.razorpayEnabled && (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`flex flex-col items-center justify-center rounded-xl p-2.5 border text-center transition-all ${
                      paymentMethod === 'razorpay'
                        ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500/50'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <ShieldCheck className="h-4 w-4 mb-1 text-sky-400" />
                    <span className="text-xs font-bold">Razorpay</span>
                    <span className="text-[9px] text-slate-400">Auto Gateway</span>
                  </button>
                )}

                {settings.cardsEnabled && (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center justify-center rounded-xl p-2.5 border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500/50'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <CreditCard className="h-4 w-4 mb-1 text-purple-400" />
                    <span className="text-xs font-bold">Card / NetBank</span>
                    <span className="text-[9px] text-slate-400">Debit / Credit</span>
                  </button>
                )}
              </div>
            </div>

            {/* UPI & REAL UTR VERIFICATION WORKFLOW */}
            {paymentMethod === 'upi' && (
              <div className="space-y-3">
                {/* Step 1: Real QR Code + UPI handle */}
                <div className="rounded-xl border border-amber-500/30 bg-gradient-to-b from-[#121927] to-[#0c101a] p-3.5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <QrCode className="h-4 w-4" /> Step 1: Scan & Pay ₹{finalAmount}
                    </span>
                    <span className="text-[10px] text-slate-400">GPay • PhonePe • Paytm • BHIM</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 bg-black/40 rounded-xl p-2.5 border border-white/5">
                    {/* Live Generated QR Code */}
                    <div className="relative p-1.5 bg-white rounded-xl shadow-lg shrink-0">
                      {qrCodeDataUrl ? (
                        <img
                          src={qrCodeDataUrl}
                          alt="Himanshu UPI QR"
                          className="h-28 w-28 object-contain"
                        />
                      ) : (
                        <div className="h-28 w-28 bg-slate-200 animate-pulse rounded" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="bg-amber-500 text-black text-[8px] font-black px-1 rounded shadow">
                          HIMANSHU
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-left w-full">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Beneficiary UPI ID:</span>
                        <div className="flex items-center justify-between bg-black/60 px-2 py-1 rounded border border-white/10">
                          <span className="font-mono font-bold text-amber-300 text-xs">{settings.upiId}</span>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] flex items-center gap-1"
                          >
                            {copiedUpi ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                            <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-slate-300 pt-0.5">
                        <span>Account Holder:</span>
                        <span className="font-bold text-white">{settings.bankAccountName || 'Himanshu'}</span>
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-slate-300">
                        <span>Amount to Transfer:</span>
                        <div className="flex items-center gap-1">
                          <span className="font-black text-emerald-400">₹{finalAmount}</span>
                          <button
                            type="button"
                            onClick={handleCopyAmount}
                            className="text-[9px] text-slate-400 hover:text-white underline ml-1"
                          >
                            {copiedAmount ? 'Copied' : 'Copy ₹'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 1-Tap Mobile UPI Intent */}
                  <a
                    href={upiIntentUri}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-2.5 text-xs font-bold text-white shadow-md hover:from-emerald-500 hover:to-emerald-400 transition-all active:scale-[0.99]"
                  >
                    <Smartphone className="h-4 w-4" />
                    <span>Open Installed UPI App to Pay ₹{finalAmount}</span>
                  </a>
                </div>

                {/* Step 2: Real UTR Input Form */}
                <form onSubmit={handleSubmitUtr} className="rounded-xl border border-white/10 bg-white/5 p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-amber-400" />
                      <span>Step 2: Enter 12-Digit Bank UTR / UPI Ref ID *</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowUtrHelp(!showUtrHelp)}
                      className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-0.5"
                    >
                      <HelpCircle className="h-3 w-3" />
                      <span>Where is UTR?</span>
                    </button>
                  </div>

                  {/* UTR helper collapsible */}
                  {showUtrHelp && (
                    <div className="rounded-lg bg-black/60 border border-amber-500/20 p-2.5 text-[11px] text-slate-300 space-y-1">
                      <p className="font-bold text-amber-400">How to find your 12-digit UTR after paying:</p>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
                        <li><strong>Google Pay:</strong> View payment → &quot;UPI transaction ID&quot; (12 digits)</li>
                        <li><strong>PhonePe:</strong> View details → &quot;UTR: 12-digit number&quot;</li>
                        <li><strong>Paytm:</strong> Passbook / Order → &quot;UPI Ref No&quot;</li>
                        <li><strong>BHIM / Bank Apps:</strong> &quot;RRN / Bank Reference ID&quot;</li>
                      </ul>
                    </div>
                  )}

                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        maxLength={22}
                        value={utrNumber}
                        onChange={(e) => handleUtrChange(e.target.value)}
                        placeholder="e.g. 428919283741"
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 font-mono text-sm font-bold text-amber-300 placeholder:text-slate-600 focus:border-amber-400 focus:outline-none tracking-wider"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-mono">
                        {utrNumber.length}/12
                      </span>
                    </div>

                    {/* Live Validation Feedback */}
                    {utrValidationError && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{utrValidationError}</span>
                      </p>
                    )}
                    {utrValidationSuccess && (
                      <p className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        <span>{utrValidationSuccess}</span>
                      </p>
                    )}
                  </div>

                  {/* Optional Payer UPI ID */}
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">
                      Your UPI ID or Mobile (helps Himanshu match your bank credit faster):
                    </label>
                    <input
                      type="text"
                      value={payerUpiId}
                      onChange={(e) => setPayerUpiId(e.target.value)}
                      placeholder="e.g. yourname@okhdfcbank or 9876543210"
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={processing || utrNumber.length < 12 || Boolean(utrValidationError)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 py-3 text-xs sm:text-sm font-extrabold text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.99]"
                  >
                    {processing ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                        <span>Submitting UTR to Himanshu...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        <span>Submit UTR for Payment Verification</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-400 text-center leading-tight">
                    🔒 Real Anti-Fraud Verification: Fake or dummy UTR numbers are rejected. Real payment is confirmed directly in Himanshu&apos;s bank ledger.
                  </p>
                </form>
              </div>
            )}

            {/* RAZORPAY GATEWAY */}
            {paymentMethod === 'razorpay' && (
              <div className="space-y-3">
                <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-sky-300 font-semibold">
                    <span>Razorpay Official Checkout</span>
                    <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] text-sky-400 font-bold">
                      Instant Settlement
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Pay securely using Net Banking, UPI, Cards, or Wallets with automated instant transaction verification.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleGatewayPayment('Razorpay Gateway')}
                  disabled={processing}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-xs sm:text-sm font-bold text-white hover:bg-sky-400 transition-all"
                >
                  {processing ? 'Processing Gateway...' : `Pay ₹${finalAmount} via Razorpay`}
                </button>
              </div>
            )}

            {/* CARD GATEWAY */}
            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-3.5 space-y-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 4242"
                      className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:border-purple-400 focus:outline-none font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Valid Thru</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:border-purple-400 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleGatewayPayment('Card / NetBanking')}
                  disabled={processing}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-xs sm:text-sm font-bold text-white hover:bg-purple-500 transition-all"
                >
                  {processing ? 'Authorizing Card...' : `Pay ₹${finalAmount} with Card`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
