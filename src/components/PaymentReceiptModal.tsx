import React from 'react';
import { CheckCircle, Download, Printer, ShieldCheck, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PaymentReceiptModal: React.FC = () => {
  const { activeReceipt, closeReceipt, settings } = useApp();

  if (!activeReceipt || !activeReceipt.order) return null;

  const { order, paymentDetails } = activeReceipt;
  const paymentId = paymentDetails?.transactionId || order.paymentId || 'TXN-773821';
  const paymentMethod = paymentDetails?.paymentMethod || order.paymentMethod || 'UPI (' + settings.upiId + ')';
  const amountPaid = paymentDetails?.amountPaid || order.finalPrice || order.budget || 10;
  const dateStr = paymentDetails?.date || new Date().toLocaleString();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0f1422] p-6 shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={closeReceipt}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Receipt Container */}
        <div id="printable-receipt" className="space-y-6 pt-2">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-xl border border-amber-500/40 bg-black">
                <img
                  src="/src/assets/images/himanshu_logo_1790318824908.jpg"
                  alt="Himanshu Edit Hub"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white tracking-wide">
                  HIMANSHU EDIT HUB
                </h3>
                <p className="text-xs text-amber-400">Official Payment Receipt & Tax Invoice</p>
                <p className="text-[10px] text-slate-400">Instagram: {settings.instagramHandle}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                <CheckCircle className="h-3.5 w-3.5" /> PAID
              </span>
              <p className="mt-1 font-mono text-xs text-slate-300">#{order.orderNumber}</p>
            </div>
          </div>

          {/* Customer & Transaction Meta */}
          <div className="grid grid-cols-2 gap-4 rounded-xl bg-white/5 p-4 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Billed To:
              </span>
              <p className="font-bold text-white text-sm">{order.customerName}</p>
              <p className="text-slate-300">{order.customerEmail}</p>
              <p className="text-slate-400">WhatsApp: {order.whatsapp}</p>
              <p className="text-slate-400">IG: {order.instagram}</p>
            </div>

            <div className="text-right space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Transaction & Bank Settlement:
              </span>
              <p className="text-slate-300">
                <span className="text-slate-500">Date:</span> {dateStr}
              </p>
              <p className="text-slate-300">
                <span className="text-slate-500">Bank UTR / Ref:</span>{' '}
                <span className="font-mono font-bold text-amber-400">
                  {order.utrNumber || paymentDetails?.utrNumber || paymentId}
                </span>
              </p>
              <p className="text-slate-300">
                <span className="text-slate-500">Method:</span> {paymentMethod}
              </p>
              <p className="text-slate-300">
                <span className="text-slate-500">Beneficiary:</span> {settings.upiId}
              </p>
              <p className="text-emerald-400 font-semibold text-[11px]">
                ✓ Confirmed in Bank Account
              </p>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Service Summary
            </h4>
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-slate-300 font-semibold border-b border-white/10">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center">Qty / Videos</th>
                    <th className="p-3 text-right">Amount (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-3">
                      <p className="font-bold text-white">{order.service}</p>
                      <p className="text-[11px] text-slate-400">{order.packageTitle || order.editingStyle}</p>
                    </td>
                    <td className="p-3 text-center text-slate-300">{order.numberOfVideos || 1}</td>
                    <td className="p-3 text-right font-semibold text-white">₹{amountPaid}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Calculation */}
            <div className="flex flex-col items-end gap-1.5 pt-2 text-xs">
              <div className="flex justify-between w-48 text-slate-400">
                <span>Subtotal:</span>
                <span>₹{amountPaid}</span>
              </div>
              <div className="flex justify-between w-48 text-slate-400">
                <span>Platform/GST:</span>
                <span className="text-emerald-400">₹0.00 (Inclusive)</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between w-48 font-bold text-sm text-white">
                <span>Total Settled:</span>
                <span className="text-amber-400">₹{amountPaid}</span>
              </div>
            </div>
          </div>

          {/* Verification stamp & notes */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span>Digitally authorized and verified by Himanshu Edit Hub.</span>
            </div>
            <div className="text-right font-heading font-semibold text-slate-300">
              Himanshu
              <span className="block text-[10px] text-slate-500 font-normal">Lead Video Editor</span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="mt-6 flex gap-3 border-t border-white/10 pt-4">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/10 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all"
          >
            <Printer className="h-4 w-4" />
            Print / Save Receipt
          </button>
          <button
            onClick={closeReceipt}
            className="rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-black hover:bg-amber-400 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
