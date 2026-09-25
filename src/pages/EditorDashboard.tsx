import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  Eye,
  FileVideo,
  Layers,
  Link,
  MessageCircle,
  Paperclip,
  Play,
  RotateCcw,
  Sparkles,
  Upload,
  User,
  Video,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderItem } from '../types';

export const EditorDashboard: React.FC = () => {
  const {
    currentUser,
    orders,
    updateOrderStatus,
    uploadOrderPreview,
    deliverOrderVideo,
  } = useApp();

  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [previewUploadUrl, setPreviewUploadUrl] = useState('');
  const [finalRenderUrl, setFinalRenderUrl] = useState('');

  // Orders assigned to this editor or unassigned
  const myAssignedOrders = orders.filter(
    (o) =>
      o.assignedEditorId === currentUser?.id ||
      currentUser?.role === 'owner' ||
      currentUser?.role === 'admin'
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-[11px] uppercase font-bold text-sky-400 tracking-wider">
            Editor Workstation
          </span>
          <h1 className="font-heading text-3xl font-black text-white mt-0.5">
            Production & Delivery Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Signed in as: <strong className="text-white">{currentUser?.name || 'Vaibhav (Lead Video Editor)'}</strong>{' '}
            ({currentUser?.role || 'editor'})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl border border-sky-500/30 bg-sky-500/10 px-3.5 py-1.5 text-xs font-bold text-sky-300">
            {myAssignedOrders.length} Active Production Projects
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left List of Projects */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Assigned Projects
          </h3>

          <div className="space-y-3">
            {myAssignedOrders.map((order) => {
              const isSelected = selectedOrder?.id === order.id;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    isSelected
                      ? 'border-sky-500 bg-sky-500/10 shadow-lg shadow-sky-500/10'
                      : 'border-white/10 bg-[#0d121e] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      #{order.orderNumber}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                        order.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : order.status === 'Revision'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-sky-500/20 text-sky-300'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <h4 className="font-heading text-sm font-bold text-white line-clamp-1">
                    {order.packageTitle || order.editingStyle}
                  </h4>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Client: {order.customerName}</span>
                    <span className="flex items-center gap-1 text-amber-300 font-medium">
                      <Clock className="h-3 w-3" /> {order.deadline}
                    </span>
                  </div>

                  {order.revisions && order.revisions.length > 0 && (
                    <div className="mt-2 rounded bg-red-500/20 px-2 py-1 text-[10px] font-semibold text-red-300 flex items-center gap-1">
                      <RotateCcw className="h-3 w-3" />
                      Revision requested by client
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Project Workspace */}
        <div className="lg:col-span-7">
          {selectedOrder ? (
            <div className="rounded-3xl border border-white/10 bg-[#0d121e] p-6 sm:p-8 space-y-6">
              {/* Project Title & Quick Status */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-amber-400">
                      #{selectedOrder.orderNumber}
                    </span>
                    <span className="rounded bg-sky-500/20 px-2.5 py-0.5 text-xs font-bold text-sky-300">
                      {selectedOrder.service}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mt-1">
                    {selectedOrder.packageTitle || selectedOrder.editingStyle}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
                  <span className="font-bold text-sm text-sky-400">{selectedOrder.status}</span>
                </div>
              </div>

              {/* Client Info & Deadline */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-2xl bg-white/5 p-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Client</span>
                  <p className="font-bold text-white">{selectedOrder.customerName}</p>
                  <p className="text-slate-300 text-[11px]">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">WhatsApp</span>
                  <p className="font-bold text-emerald-400">{selectedOrder.whatsapp}</p>
                  <p className="text-slate-300 text-[11px]">{selectedOrder.instagram}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Deadline</span>
                  <p className="font-bold text-amber-400">{selectedOrder.deadline}</p>
                  <p className="text-slate-300 text-[11px]">{selectedOrder.videoLength}</p>
                </div>
              </div>

              {/* Editing Instructions */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Client Editing Brief & Notes:
                </h4>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-slate-200 leading-relaxed">
                  {selectedOrder.additionalInstructions || 'Standard creator edit requested.'}
                </div>
              </div>

              {/* Revision notes if any */}
              {selectedOrder.revisions && selectedOrder.revisions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">
                    Latest Client Revision Request:
                  </h4>
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-200 space-y-1">
                    {selectedOrder.revisions.map((rev) => (
                      <div key={rev.id}>
                        <p className="font-bold">
                          {rev.timecodes && `[At ${rev.timecodes}] `}
                          {rev.notes}
                        </p>
                        <span className="text-[10px] text-red-400">{rev.requestedAt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Uploaded Raw Files & Reference Link */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Source Files & References:
                </h4>
                {selectedOrder.referenceLink && (
                  <a
                    href={selectedOrder.referenceLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs text-sky-400 hover:underline bg-white/5 p-2.5 rounded-lg"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Reference Link: {selectedOrder.referenceLink}</span>
                  </a>
                )}

                {selectedOrder.uploadedFiles && selectedOrder.uploadedFiles.length > 0 ? (
                  <div className="space-y-2">
                    {selectedOrder.uploadedFiles.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <FileVideo className="h-4 w-4 text-amber-400" />
                          <span className="font-medium text-white">{file.name}</span>
                          <span className="text-[10px] text-slate-400">({file.size})</span>
                        </div>
                        <a
                          href={file.url}
                          download
                          className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-slate-300 hover:text-white"
                        >
                          <Download className="h-3 w-3" />
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No direct files uploaded.</p>
                )}
              </div>

              {/* Production Actions */}
              <div className="space-y-4 border-t border-white/10 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Update Production Status:
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'Editing', 'Editor started timeline cut')}
                    className="rounded-xl border border-sky-500/40 bg-sky-500/10 py-2.5 text-xs font-bold text-sky-300 hover:bg-sky-500/20"
                  >
                    Mark as In Editing
                  </button>

                  <button
                    onClick={() => {
                      const sampleUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';
                      uploadOrderPreview(selectedOrder.id, sampleUrl);
                    }}
                    className="rounded-xl border border-amber-500/40 bg-amber-500/10 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20"
                  >
                    Upload Draft Preview
                  </button>

                  <button
                    onClick={() => {
                      const finalUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4';
                      deliverOrderVideo(selectedOrder.id, finalUrl);
                    }}
                    className="rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-black hover:bg-emerald-400 col-span-2 sm:col-span-1"
                  >
                    Complete & Deliver 4K
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-[#0d121e] p-12 text-center text-slate-400">
              <Layers className="h-12 w-12 mx-auto text-slate-600 mb-3" />
              <p className="text-sm font-semibold text-white">Select a Project from the Left</p>
              <p className="text-xs mt-1">Review footage, download briefs, and deliver draft previews.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
