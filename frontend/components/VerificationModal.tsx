'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  X,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  Phone,
  ArrowRight,
  Send,
  Ticket
} from 'lucide-react';
import { clinicConfig } from '@/data/clinicData';

export interface BookingTicketData {
  token: string;
  serialCode?: string;
  patientName: string;
  phone: string;
  senderPhone?: string;
  problem: string;
  consultType: string;
  date: string;
  timeSlot: string;
  paymentMethod: string;
  trxId: string;
  amount?: number;
  status: 'pending' | 'verified' | 'rejected';
}

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingTicketData | null;
  apiUrl?: string;
}

export default function VerificationModal({
  isOpen,
  onClose,
  bookingData,
  apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
}: VerificationModalProps) {
  const [status, setStatus] = useState<'pending' | 'verified' | 'rejected'>('pending');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const serialCode = bookingData?.serialCode || bookingData?.token || '';

  useEffect(() => {
    if (!isOpen || !serialCode) return;

    setStatus(bookingData?.status || 'pending');

    if (bookingData?.status === 'verified') return;

    // Start Polling every 3 seconds to check if Doctor verified in their Mobile App
    const checkStatus = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/appointments/${serialCode}/status`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.status) {
            setStatus(data.status);
            if (data.status === 'verified' || data.status === 'rejected') {
              if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            }
          }
        }
      } catch (err) {
        // silently retry
      }
    };

    pollIntervalRef.current = setInterval(checkStatus, 3000);

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [isOpen, serialCode, bookingData, apiUrl]);

  if (!isOpen || !bookingData) return null;

  const handleCopySerial = () => {
    navigator.clipboard.writeText(serialCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyDoctorPhone = () => {
    navigator.clipboard.writeText(clinicConfig.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  // WhatsApp Pre-filled message that the patient sends to the doctor
  const waMessageToDoctor = encodeURIComponent(
    `আসসালামু আলাইকুম ডাঃ সামসুন্নাহার স্নেহ,\n` +
    `আমি ফি পরিশোধ করে সিরিয়াল বুকিং সম্পন্ন করেছি।\n\n` +
    `🎫 আমার সিরিয়াল কোড: ${serialCode}\n` +
    `👤 রোগীর নাম: ${bookingData.patientName}\n` +
    `📱 রোগীর নম্বর: ${bookingData.phone}\n` +
    `💳 বিকাশ/নগদ প্রেরক নম্বর: ${bookingData.senderPhone || bookingData.phone}\n` +
    `🔢 TrxID: ${bookingData.trxId} (${bookingData.paymentMethod})\n` +
    `💰 পরিশোধিত ফি: ৳${bookingData.amount || 500}\n` +
    `📅 বুকিং তারিখ: ${bookingData.date}\n` +
    `⏰ সময় স্লট: ${bookingData.timeSlot}\n` +
    `🩺 সমস্যা: ${bookingData.problem}\n\n` +
    `অনুগ্রহ করে আপনার মোবাইল অ্যাপে আমার নম্বর ও TrxID ভেরিফাই করে সিরিয়াল নিশ্চিত করুন।`
  );

  const whatsappSendUrl = `https://wa.me/${clinicConfig.cleanPhone}?text=${waMessageToDoctor}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[94vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header Ribbon */}
        <div
          className={`p-5 sm:p-6 text-center text-white relative transition-colors duration-300 ${
            status === 'verified'
              ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700'
              : status === 'rejected'
              ? 'bg-gradient-to-r from-rose-600 to-red-700'
              : 'bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900'
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Status Icon */}
          <div className="flex justify-center mb-3">
            {status === 'verified' ? (
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
                </span>
              </div>
            ) : status === 'rejected' ? (
              <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center">
                <XCircle className="w-8 h-8" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shadow-lg">
                <Ticket className="w-7 h-7 text-emerald-300" />
              </div>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {status === 'verified'
              ? 'সিরিয়াল ভেরিফাইড ও নিশ্চিত!'
              : status === 'rejected'
              ? 'পেমেন্ট যাচাই ব্যর্থ হয়েছে'
              : 'আপনার সিরিয়াল কোড প্রস্তুত হয়েছে'}
          </h3>

          <p className="text-xs text-emerald-100/90 mt-1 max-w-sm mx-auto">
            {status === 'verified'
              ? 'ডাক্তার সামসুন্নাহার স্নেহ আপনার পেমেন্ট অনুমোদন করেছেন।'
              : status === 'rejected'
              ? 'আপনার প্রদত্ত TrxID ও নম্বরের সাথে লেনদেন মেলেনি।'
              : 'নিচের সিরিয়াল কোডটি ডাক্তারের হোয়াটসঅ্যাপে পাঠিয়ে নিশ্চিত করুন।'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-800">
          
          {/* SERIAL CODE DISPLAY BANNER */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300/80 flex items-center justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">আপনার সিরিয়াল কোড</span>
              </div>
              <p className="text-2xl sm:text-3xl font-mono font-black text-slate-900 tracking-wider mt-0.5">
                {serialCode}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopySerial}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-100/60 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-xs transition flex items-center gap-1.5"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> কপি হয়েছে!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-emerald-700" /> কোড কপি
                </>
              )}
            </button>
          </div>

          {/* PRIMARY ACTION: SEND SERIAL CODE VIA WHATSAPP (When pending or verified) */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                ১
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950">
                  {status === 'verified' 
                    ? 'ডাক্তারের সরাসরি হোয়াটসঅ্যাপে চ্যাট করুন'
                    : 'সিরিয়াল কোড দিয়ে ডাক্তারের হোয়াটসঅ্যাপে মেসেজ দিন'}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {status === 'verified'
                    ? 'আপনার সিরিয়াল অনুমোদিত হয়েছে। এখন সরাসরি চ্যাট বা ভিডিও কলে পরামর্শ নিন।'
                    : 'নিচের বাটনে চাপ দিলে আপনার সিরিয়াল কোড, মোবাইল নম্বর ও TrxID স্বয়ংক্রিয়ভাবে ড্রাফট হয়ে ডাক্তারের হোয়াটসঅ্যাপে যাবে।'}
                </p>
              </div>
            </div>

            {/* Big Green WhatsApp Button */}
            <a
              href={whatsappSendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25d366] hover:bg-[#20ba5a] text-white font-black text-xs sm:text-sm shadow-md shadow-[#25d366]/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              <MessageCircle className="w-5 h-5 fill-white text-white" />
              <span>ডাক্তারের হোয়াটসঅ্যাপে সিরিয়াল কোড পাঠান</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </a>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-emerald-100">
              <span>ডাক্তারের নম্বর: <strong className="text-slate-800 font-mono">{clinicConfig.phone}</strong></span>
              <button
                type="button"
                onClick={handleCopyDoctorPhone}
                className="text-emerald-700 hover:text-emerald-900 font-semibold"
              >
                {copiedPhone ? 'কপি হয়েছে' : 'নম্বর কপি'}
              </button>
            </div>
          </div>

          {/* STATUS EXPLANATION CARD */}
          {status === 'pending' && (
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '8s' }} />
              <div>
                <p className="font-bold text-amber-900">ডাক্তার মোবাইল অ্যাপে ভেরিফাই করবেন:</p>
                <p className="text-[11px] text-amber-800/90 mt-0.5 leading-relaxed">
                  হোয়াটসঅ্যাপে মেসেজ পাওয়ার পর ডাঃ সামসুন্নাহার স্নেহ তার মোবাইল অ্যাপে আপনার TrxID <strong>({bookingData.trxId})</strong> ও মোবাইল নম্বর যাচাই করে সিরিয়াল নিশ্চিত করবেন। নিশ্চিত হওয়ামাত্র এই স্ক্রিন স্বয়ংক্রিয়ভাবে আপডেট হবে।
                </p>
              </div>
            </div>
          )}

          {status === 'verified' && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-900">সিরিয়াল চূড়ান্তভাবে কনফার্ম করা হয়েছে ✓</p>
                <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                  আপনার পেমেন্ট (৳৫০০) ও বুকিং ডাক্তার কর্তৃক অনুমোদিত। নির্ধারিত সময়ে ডাক্তারের হোয়াটসঅ্যাপে যোগাযোগ রাখুন।
                </p>
              </div>
            </div>
          )}

          {status === 'rejected' && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-900">TrxID বা নম্বরে অমিল পাওয়া গেছে</p>
                <p className="text-[11px] text-rose-800 mt-0.5 leading-relaxed">
                  আপনার প্রেরিত TrxID <strong>({bookingData.trxId})</strong> এর সাথে কোনো লেনদেন মেলেনি। অনুগ্রহ করে সঠিক TrxID দিয়ে হোয়াটসঅ্যাপে ডাক্তারকে জানান অথবা সরাসরি হটলাইনে কল দিন।
                </p>
              </div>
            </div>
          )}

          {/* SUMMARY RECEIPT DETAILS */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-medium">সিরিয়াল কোড:</span>
              <span className="font-mono font-bold text-emerald-700 text-sm">{serialCode}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">রোগীর নাম:</span>
              <span className="font-bold text-slate-900">{bookingData.patientName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">রোগীর মোবাইল:</span>
              <span className="font-mono text-slate-800">{bookingData.phone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">বিকাশ/নগদ TrxID:</span>
              <span className="font-mono text-slate-800">{bookingData.trxId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">তারিখ ও সময়:</span>
              <span className="font-semibold text-slate-800">{bookingData.date} ({bookingData.timeSlot})</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">সমস্যা:</span>
              <span className="text-slate-800 truncate max-w-[200px]">{bookingData.problem}</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-2">
              <span className="text-slate-500 font-medium">ফি ও স্ট্যাটাস:</span>
              <span className={`font-bold ${status === 'verified' ? 'text-emerald-700' : 'text-amber-700'}`}>
                ৳৫০০ ({status === 'verified' ? 'অনুমোদিত ✓' : 'যাচাইয়ের অপেক্ষায়...'})
              </span>
            </div>
          </div>

          {/* Print/Save Slip Button */}
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>সিরিয়াল স্লিপ প্রিন্ট / পিডিএফ সেভ করুন</span>
          </button>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 font-medium text-[11px] sm:text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>হাসিনা হোমিও কিউর • উত্তরা, ঢাকা</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-bold px-2 py-1 rounded hover:bg-slate-200/60"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
}
