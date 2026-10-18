'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { clinicConfig } from '@/data/clinicData';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Phone,
  Copy,
  Check,
  MessageCircle,
  Search,
  Bell,
  BellOff,
  RefreshCw,
  Sparkles,
  Clock,
  Calendar,
  User,
  CreditCard,
  FileText,
  AlertTriangle,
  ArrowRight,
  Filter
} from 'lucide-react';

interface Appointment {
  id?: string;
  token: string;
  serialCode?: string;
  patientName?: string;
  name?: string;
  phone: string;
  senderPhone?: string;
  senderNumber?: string;
  district?: string;
  problem?: string;
  consultType?: string;
  consultationType?: string;
  date?: string;
  preferredDate?: string;
  timeSlot?: string;
  preferredTime?: string;
  paymentMethod: string;
  trxId: string;
  amount: number;
  status: 'pending' | 'verified' | 'rejected';
  createdAt?: string;
  submittedAt?: string;
  verifiedAt?: string;
  note?: string;
  notes?: string;
}

export default function DoctorMobileApp() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'verified' | 'sms' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickPasteText, setQuickPasteText] = useState('');
  const [smsText, setSmsText] = useState('');
  const [smsMatchResult, setSmsMatchResult] = useState<any>(null);
  const [smsMatching, setSmsMatching] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastCount, setLastCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedTrx, setCopiedTrx] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Play audio chime
  const playAlertChime = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // AudioContext policy
    }
  }, [soundEnabled]);

  // Fetch appointments
  const fetchAppointments = useCallback(async (isManual = false) => {
    try {
      const res = await fetch(`${apiUrl}/api/appointments`);
      if (res.ok) {
        const data = await res.json();
        const list: Appointment[] = data.appointments || data.data || [];
        
        const currentPending = list.filter(a => a.status === 'pending').length;
        if (currentPending > lastCount && lastCount !== 0) {
          playAlertChime();
          showToast(`🔔 নতুন ${currentPending - lastCount} টি সিরিয়াল জমা হয়েছে!`);
        }
        setLastCount(currentPending);
        setAppointments(list);
        if (isManual) showToast('ডাটা রিফ্রেশ সম্পন্ন হয়েছে ✓');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      if (isManual) showToast('সার্ভার সংযোগ পাওয়া যায়নি ⚠️');
    } finally {
      setLoading(false);
    }
  }, [apiUrl, lastCount, playAlertChime]);

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(() => fetchAppointments(false), 4000);
    return () => clearInterval(interval);
  }, [fetchAppointments]);

  // Verify or Reject
  const handleUpdateStatus = async (item: Appointment, newStatus: 'verified' | 'rejected') => {
    const code = item.serialCode || item.token;
    setActionLoading(code);
    try {
      const res = await fetch(`${apiUrl}/api/appointments/${code}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          note: newStatus === 'verified' ? 'Verified by Doctor Mobile App' : 'Rejected - TrxID mismatch'
        })
      });

      if (res.ok) {
        playAlertChime();
        showToast(
          newStatus === 'verified'
            ? `সিরিয়াল ${code} সফলভাবে ভেরিফাই ও নিশ্চিত করা হয়েছে ✓`
            : `সিরিয়াল ${code} বাতিল করা হয়েছে`
        );
        await fetchAppointments();
      } else {
        showToast('স্ট্যাটাস আপডেট ব্যর্থ হয়েছে!');
      }
    } catch (e) {
      showToast('সার্ভার কানেকশন এরর!');
    } finally {
      setActionLoading(null);
    }
  };

  // Auto match SMS
  const handleMatchSms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsText.trim()) return;

    setSmsMatching(true);
    setSmsMatchResult(null);

    try {
      const res = await fetch(`${apiUrl}/api/sms/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smsText: smsText.trim() })
      });
      const data = await res.json();
      setSmsMatchResult(data);
      if (data.matched || data.matchFound) {
        playAlertChime();
        showToast('এসএমএস ম্যাচ ও অটো-ভেরিফাই সম্পন্ন হয়েছে! 🎉');
        setSmsText('');
        await fetchAppointments();
      }
    } catch (err) {
      setSmsMatchResult({ matched: false, message: 'সার্ভার রেসপন্স করছে না' });
    } finally {
      setSmsMatching(false);
    }
  };

  // Helper: Copy TrxID
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTrx(text);
    setTimeout(() => setCopiedTrx(null), 2000);
  };

  // Extract from WhatsApp text paste
  useEffect(() => {
    if (!quickPasteText.trim()) return;
    const text = quickPasteText;
    
    // Look for serial code e.g. HHC-XXXX
    const codeMatch = text.match(/(HHC-\d{4,6})/i);
    // Look for TrxID
    const trxMatch = text.match(/(?:TrxID|Transaction ID|ID)\s*[:\-]?\s*([A-Za-z0-9]{6,16})/i);
    // Look for Phone
    const phoneMatch = text.match(/(01[3-9]\d{8})/);

    if (codeMatch) {
      setSearchQuery(codeMatch[1]);
    } else if (trxMatch) {
      setSearchQuery(trxMatch[1]);
    } else if (phoneMatch) {
      setSearchQuery(phoneMatch[1]);
    } else {
      setSearchQuery(text.trim());
    }
  }, [quickPasteText]);

  // WhatsApp reply link to patient
  const getPatientConfirmationUrl = (appt: Appointment) => {
    const pName = appt.patientName || appt.name || 'রোগী';
    const sCode = appt.serialCode || appt.token;
    const date = appt.date || appt.preferredDate || '';
    const time = appt.timeSlot || appt.preferredTime || '';
    const cleanNum = appt.phone.replace(/[^0-9]/g, '');
    const intlNum = cleanNum.startsWith('88') ? cleanNum : `88${cleanNum}`;

    const text = encodeURIComponent(
      `আসসালামু আলাইকুম ${pName},\n` +
      `আপনার সিরিয়াল কোড [${sCode}] এবং TrxID [${appt.trxId}] সফলভাবে ভেরিফাই ও অনুমোদন করা হয়েছে।\n\n` +
      `আপনার অ্যাপয়েন্টমেন্ট চূড়ান্তভাবে নিশ্চিত করা হলো।\n` +
      `📅 তারিখ: ${date}\n` +
      `⏰ সময় স্লট: ${time}\n` +
      `🏥 চেম্বার: হাসিনা হোমিও কিউর (যশোর: মোল্লাপাড়া / ঢাকা: মিরপুর ১২)\n\n` +
      `ধন্যবাদ,\n` +
      `ডাঃ সামসুন্নাহার স্নেহ (DHMS, রেজিঃ ${clinicConfig.regNoBn})\n` +
      `হটলাইন/হোয়াটসঅ্যাপ: ${clinicConfig.phone}`
    );

    return `https://wa.me/${intlNum}?text=${text}`;
  };

  // WhatsApp rejection alert
  const getPatientRejectionUrl = (appt: Appointment) => {
    const pName = appt.patientName || appt.name || 'রোগী';
    const sCode = appt.serialCode || appt.token;
    const cleanNum = appt.phone.replace(/[^0-9]/g, '');
    const intlNum = cleanNum.startsWith('88') ? cleanNum : `88${cleanNum}`;

    const text = encodeURIComponent(
      `আসসালামু আলাইকুম ${pName},\n` +
      `আপনার প্রেরিত সিরিয়াল কোড [${sCode}] এর সাথে দেয়া TrxID [${appt.trxId}] আমাদের বিকাশ/নগদে পাওয়া যায়নি।\n\n` +
      `অনুগ্রহ করে সঠিক বিকাশ/নগদ TrxID এবং প্রেরকের মোবাইল নম্বর এই নম্বরে রিপ্লাই দিয়ে জানান।\n\n` +
      `ধন্যবাদ,\n` +
      `ডাঃ সামসুন্নাহার স্নেহ (হাসিনা হোমিও কিউর)`
    );

    return `https://wa.me/${intlNum}?text=${text}`;
  };

  // Filtered list
  const filteredAppointments = appointments.filter(item => {
    if (activeTab === 'pending' && item.status !== 'pending') return false;
    if (activeTab === 'verified' && item.status !== 'verified') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const sCode = (item.serialCode || item.token || '').toLowerCase();
      const pName = (item.patientName || item.name || '').toLowerCase();
      const phone = (item.phone || '').toLowerCase();
      const sPhone = (item.senderPhone || item.senderNumber || '').toLowerCase();
      const trx = (item.trxId || '').toLowerCase();

      return sCode.includes(q) || pName.includes(q) || phone.includes(q) || sPhone.includes(q) || trx.includes(q);
    }
    return true;
  });

  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const verifiedCount = appointments.filter(a => a.status === 'verified').length;
  const totalRevenue = verifiedCount * clinicConfig.consultationFee;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-24 selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-2xl shadow-2xl border border-emerald-300 text-xs sm:text-sm animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* TOP MOBILE APP SHELL HEADER */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 border border-emerald-400/40">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                  ডাক্তার মোবাইল অ্যাপ
                </h1>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-[11px] text-emerald-400 font-medium">
                {clinicConfig.doctorNameBn} • DHMS
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                showToast(soundEnabled ? 'সাউন্ড অ্যালার্ট মিউট করা হয়েছে 🔕' : 'সাউন্ড অ্যালার্ট চালু করা হয়েছে 🔔');
              }}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                soundEnabled 
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
              title={soundEnabled ? 'সাউন্ড এলার্ট চালু আছে' : 'সাউন্ড বন্ধ'}
            >
              {soundEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            </button>

            <button
              onClick={() => fetchAppointments(true)}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors"
              title="রিফ্রেশ করুন"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-md mx-auto w-full px-4 pt-4 flex-1 space-y-4">

        {/* METRICS ROW */}
        <div className="grid grid-cols-3 gap-2">
          <div 
            onClick={() => setActiveTab('pending')}
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-amber-500/15 border-amber-500/50 shadow-xs'
                : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3" /> অপেক্ষমাণ
            </p>
            <p className="text-xl font-mono font-black text-amber-300 mt-1">{pendingCount}</p>
          </div>

          <div 
            onClick={() => setActiveTab('verified')}
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'verified'
                ? 'bg-emerald-500/15 border-emerald-500/50 shadow-xs'
                : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> ভেরিফাইড
            </p>
            <p className="text-xl font-mono font-black text-emerald-300 mt-1">{verifiedCount}</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <CreditCard className="w-3 h-3" /> মোট আদায়
            </p>
            <p className="text-xl font-mono font-black text-white mt-1">৳ {totalRevenue}</p>
          </div>
        </div>

        {/* SECTION: WHATSAPP MESSAGE & SERIAL QUICK-VERIFIER BAR */}
        <div className="p-4 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-900/90 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>হোয়াটসঅ্যাপ মেসেজ / সিরিয়াল যাচাই</span>
            </span>
            <span className="text-[10px] text-slate-400">দ্রুত সার্চ ও ম্যাচ</span>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="সিরিয়াল কোড (HHC-...), নম্বর বা TrxID..."
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Paste WhatsApp Message directly */}
            <div className="pt-1">
              <textarea
                value={quickPasteText}
                onChange={(e) => setQuickPasteText(e.target.value)}
                rows={2}
                placeholder="রোগীর হোয়াটসঅ্যাপ মেসেজ এখানে পেস্ট করুন (স্বয়ংক্রিয়ভাবে সিরিয়াল ও TrxID ধরে নিবে)..."
                className="w-full p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500 text-[11px] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 resize-none font-mono"
              />
              {quickPasteText && (
                <div className="flex justify-end mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setQuickPasteText('');
                      setSearchQuery('');
                    }}
                    className="text-[10px] text-rose-400 hover:underline"
                  >
                    ক্লিয়ার করুন
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex rounded-2xl bg-slate-900 p-1 border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'pending'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>অপেক্ষমাণ ({pendingCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('verified')}
            className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'verified'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ভেরিফাইড ({verifiedCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('sms')}
            className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'sms'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>SMS চেকার</span>
          </button>
        </div>

        {/* TAB 1 & 2: LIST OF APPOINTMENTS (Pending / Verified / Filtered) */}
        {activeTab !== 'sms' && (
          <div className="space-y-3">
            {loading ? (
              <div className="py-12 text-center text-slate-500 text-xs space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-500" />
                <p>লোড হচ্ছে...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="p-8 text-center rounded-3xl bg-slate-900/60 border border-slate-800/80 text-slate-400 space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500/60" />
                <p className="text-xs font-bold text-slate-300">কোনো সিরিয়াল পাওয়া যায়নি</p>
                <p className="text-[11px] text-slate-500">
                  {searchQuery ? `"${searchQuery}" এর জন্য কোনো ফলাফল নেই` : 'এই ট্যাবে বর্তমানে কোনো সিরিয়াল অপেক্ষমাণ নেই'}
                </p>
              </div>
            ) : (
              filteredAppointments.map(appt => {
                const sCode = appt.serialCode || appt.token;
                const pName = appt.patientName || appt.name || 'নাম নেই';
                const sPhone = appt.senderPhone || appt.senderNumber || appt.phone;
                const isVerified = appt.status === 'verified';
                const isRejected = appt.status === 'rejected';

                return (
                  <div
                    key={sCode}
                    className={`p-4 rounded-3xl border transition-all space-y-3 ${
                      isVerified
                        ? 'bg-slate-900/90 border-emerald-500/30'
                        : isRejected
                        ? 'bg-slate-900/90 border-rose-500/30 opacity-75'
                        : 'bg-gradient-to-b from-slate-900 to-slate-900/95 border-amber-500/40 shadow-lg ring-1 ring-amber-500/10'
                    }`}
                  >
                    {/* Top Row: Serial Code Badge & Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono font-black text-sm tracking-wider shadow-inner">
                          {sCode}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">৳{appt.amount || 500}</span>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isVerified
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : isRejected
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                        }`}
                      >
                        {isVerified ? 'ভেরিফাইড ✓' : isRejected ? 'বাতিল' : 'যাচাই অপেক্ষমাণ'}
                      </span>
                    </div>

                    {/* Patient & Payment Details Grid */}
                    <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2 text-xs">
                      {/* Name & Phone */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold text-white">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{pName}</span>
                        </div>
                        <a
                          href={`tel:${appt.phone}`}
                          className="px-2 py-0.5 rounded-lg bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-800/60 font-mono font-bold text-[11px] flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" /> {appt.phone}
                        </a>
                      </div>

                      {/* Payment method & TrxID */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px]">
                        <span className="text-slate-400">
                          {appt.paymentMethod} নম্বর: <strong className="text-slate-200 font-mono">{sPhone}</strong>
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-400">TrxID:</span>
                          <span className="font-mono font-bold text-amber-300">{appt.trxId}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(appt.trxId)}
                            className="p-1 text-slate-400 hover:text-white"
                            title="কপি করুন"
                          >
                            {copiedTrx === appt.trxId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>

                      {/* Slot & Problem */}
                      <div className="pt-1 border-t border-slate-800/80 text-[11px] flex items-center justify-between text-slate-400">
                        <span className="truncate max-w-[200px]">🩺 {appt.problem || 'সাধারণ পরামর্শ'}</span>
                        <span className="font-medium text-slate-300">
                          {appt.date || appt.preferredDate} ({appt.timeSlot || appt.preferredTime})
                        </span>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="space-y-2 pt-1">
                      {/* Pending: Verify vs Reject buttons */}
                      {!isVerified && (
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            disabled={actionLoading === sCode}
                            onClick={() => handleUpdateStatus(appt, 'verified')}
                            className="py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-700/30 transition flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{actionLoading === sCode ? 'যাচাই হচ্ছে...' : 'ভেরিফাই ও নিশ্চিত'}</span>
                          </button>

                          <button
                            type="button"
                            disabled={actionLoading === sCode}
                            onClick={() => handleUpdateStatus(appt, 'rejected')}
                            className="py-2.5 px-3 rounded-2xl bg-rose-950/60 hover:bg-rose-900 border border-rose-700/60 text-rose-300 font-bold text-xs transition flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>TrxID মিলেনি</span>
                          </button>
                        </div>
                      )}

                      {/* 1-Tap WhatsApp Reply to Patient (Available for all) */}
                      {isVerified ? (
                        <a
                          href={getPatientConfirmationUrl(appt)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-3 rounded-2xl bg-[#25d366] hover:bg-[#20ba5a] text-white font-extrabold text-xs shadow-md shadow-[#25d366]/30 transition flex items-center justify-center gap-1.5 active:scale-95"
                        >
                          <MessageCircle className="w-4 h-4 fill-white text-white" />
                          <span>রোগীকে হোয়াটসঅ্যাপে কনফার্মেশন পাঠান</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </a>
                      ) : isRejected ? (
                        <a
                          href={getPatientRejectionUrl(appt)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold text-xs transition flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>রোগীকে ভুল TrxID সম্পর্কে হোয়াটসঅ্যাপে জানান</span>
                        </a>
                      ) : null}
                    </div>

                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 3: SMS AUTO-MATCHER */}
        {activeTab === 'sms' && (
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-teal-400">
              <FileText className="w-5 h-5" />
              <h2 className="text-sm font-bold">বিকাশ / নগদ SMS অটো-ম্যাচার</h2>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              ডাক্তারের ফোনে আসা বিকাশ বা নগদ SMS কপি করে নিচের বক্সে পেস্ট করলেই সিস্টেম TrxID এবং প্রেরকের নম্বর বের করে সংশ্লিষ্ট অপেক্ষমাণ সিরিয়ালকে স্বয়ংক্রিয়ভাবে ভেরিফাই করে দিবে।
            </p>

            <form onSubmit={handleMatchSms} className="space-y-3">
              <textarea
                value={smsText}
                onChange={(e) => setSmsText(e.target.value)}
                rows={4}
                placeholder="যেমন: You have received Tk 500.00 from 01711223344. Fee Tk 0.00. Balance Tk 1,500.00. TrxID 9K8L7M6N5P at 16/10/2026..."
                className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />

              <button
                type="submit"
                disabled={smsMatching || !smsText.trim()}
                className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs shadow-lg shadow-teal-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {smsMatching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>যাচাই ও অটো-ম্যাচ চলছে...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SMS ম্যাচ ও স্বয়ংক্রিয় অনুমোদন করুন</span>
                  </>
                )}
              </button>
            </form>

            {smsMatchResult && (
              <div
                className={`p-3.5 rounded-2xl border text-xs space-y-2 animate-in fade-in duration-200 ${
                  smsMatchResult.matched || smsMatchResult.matchFound
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  {smsMatchResult.matched || smsMatchResult.matchFound ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                  <span>{smsMatchResult.message}</span>
                </div>

                {smsMatchResult.extracted && (
                  <div className="text-[11px] font-mono space-y-1 pt-1 border-t border-slate-800">
                    <p>সনাক্তকৃত TrxID: <strong>{smsMatchResult.extracted.trxId || 'পাওয়া যায়নি'}</strong></p>
                    <p>প্রেরক নম্বর: <strong>{smsMatchResult.extracted.sender || 'পাওয়া যায়নি'}</strong></p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>

      {/* BOTTOM MOBILE APP BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 px-4 py-2 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-around text-[10px] font-bold">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
              activeTab === 'pending' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>অপেক্ষমাণ ({pendingCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('verified')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
              activeTab === 'verified' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>অনুমোদিত ({verifiedCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('sms')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
              activeTab === 'sms' ? 'text-teal-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>SMS টুল</span>
          </button>
        </div>
      </nav>

    </div>
  );
}
