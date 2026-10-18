'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Copy,
  Check,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import VerificationModal, { BookingTicketData } from './VerificationModal';
import { clinicConfig } from '@/data/clinicData';

const timeSlots = [
  { id: '1', time: 'সকাল ১০:৩০ - ১১:০০ টা', shift: 'morning', remaining: '২টি বাকি' },
  { id: '2', time: 'সকাল ১১:৩০ - ১২:০০ টা', shift: 'morning', remaining: '৩টি বাকি' },
  { id: '3', time: 'বিকাল ৪:০০ - ৪:৩০ টা', shift: 'afternoon', remaining: '৪টি বাকি' },
  { id: '4', time: 'বিকাল ৪:৩০ - ৫:০০ টা', shift: 'afternoon', remaining: '১টি বাকি' },
  { id: '5', time: 'সন্ধ্যা ৬:০০ - ৬:৩০ টা', shift: 'evening', remaining: '৩টি বাকি' },
  { id: '6', time: 'সন্ধ্যা ৭:০০ - ৭:৩০ টা', shift: 'evening', remaining: '২টি বাকি' },
  { id: '7', time: 'রাত ৮:০০ - ৮:৩০ টা', shift: 'night', remaining: '১টি বাকি' },
  { id: '8', time: 'রাত ৯:০০ - ৯:৩০ টা', shift: 'night', remaining: '২টি বাকি' },
];

const commonProblems = [
  'PCOS ও ওভারিয়ান সিস্ট',
  'অনিয়মিত মাসিক ও মহিলা রোগ',
  'বন্ধ্যাত্ব (নারী ও পুরুষ)',
  'কিডনি ও পিত্তথলির পাথর',
  'সোরিয়াসিস, একজিমা ও চর্মরোগ',
  'জরায়ু টিউমার ও ফাইব্রয়েড',
  'গ্যাস্ট্রিক, আলসার ও আইবিএস',
  'বাচ্চাদের ঘনঘন ঠান্ডা ও টনসিল',
  'বাত ও ক্রনিক জয়েন্ট পেইন',
  'অন্যান্য জটিল ক্রনিক সমস্যা'
];

export default function PaymentBookingForm() {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [copyToast, setCopyToast] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [ticketData, setTicketData] = useState<BookingTicketData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customProblem, setCustomProblem] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    district: 'ঢাকা',
    age: '',
    gender: 'মহিলা',
    consultType: 'অনলাইন ভিডিও কল',
    problem: commonProblems[0],
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: timeSlots[2].time,
    paymentMethod: 'bKash',
    senderPhone: '',
    trxId: ''
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

  const handleCopyNumber = (num: string, provider: string) => {
    navigator.clipboard.writeText(num);
    setCopied(true);
    setCopyToast(`${provider} নম্বর (${num}) সফলভাবে কপি হয়েছে!`);
    setTimeout(() => {
      setCopied(false);
      setCopyToast('');
    }, 2800);
  };

  const handleFillDemoTrx = () => {
    setFormData(prev => ({
      ...prev,
      trxId: 'DEMO500',
      senderPhone: prev.senderPhone || prev.phone || '01711223344'
    }));
    setFormError(null);
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.patientName.trim()) {
      setFormError('অনুগ্রহ করে রোগীর নাম লিখুন।');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setFormError('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন।');
      return;
    }

    if (customProblem.trim()) {
      const isOther = formData.problem.includes('অন্যান্য');
      const resolvedProblem = isOther ? customProblem.trim() : `${formData.problem} (${customProblem.trim()})`;
      setFormData(prev => ({ ...prev, problem: resolvedProblem }));
    }

    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.date || !formData.timeSlot) {
      setFormError('অনুগ্রহ করে তারিখ ও পছন্দের সময় নির্ধারণ করুন।');
      return;
    }
    if (!formData.senderPhone) {
      setFormData(prev => ({ ...prev, senderPhone: prev.phone }));
    }
    setStep(3);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.trxId.trim()) {
      setFormError('অনুগ্রহ করে বিকাশ বা নগদে ফি পাঠিয়ে TrxID লিখুন।');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: formData.patientName,
          name: formData.patientName,
          phone: formData.phone,
          senderPhone: formData.senderPhone || formData.phone,
          senderNumber: formData.senderPhone || formData.phone,
          district: formData.district,
          age: formData.age,
          gender: formData.gender,
          consultType: formData.consultType,
          problem: formData.problem,
          date: formData.date,
          preferredDate: formData.date,
          timeSlot: formData.timeSlot,
          preferredTime: formData.timeSlot,
          paymentMethod: formData.paymentMethod,
          trxId: formData.trxId,
          amount: 500
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setTicketData({
          token: data.token || data.serialCode,
          serialCode: data.serialCode || data.token,
          patientName: formData.patientName,
          phone: formData.phone,
          senderPhone: formData.senderPhone || formData.phone,
          problem: formData.problem,
          consultType: formData.consultType,
          date: formData.date,
          timeSlot: formData.timeSlot,
          paymentMethod: formData.paymentMethod,
          trxId: formData.trxId,
          amount: 500,
          status: data.status || 'pending'
        });
        setIsModalOpen(true);
      } else {
        setFormError(data.error || 'বুকিং সম্পন্ন হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
      }
    } catch (err) {
      console.error('Booking error:', err);
      // Fallback preview
      const fallbackToken = 'HHC-' + Math.floor(1000 + Math.random() * 9000);
      setTicketData({
        token: fallbackToken,
        serialCode: fallbackToken,
        patientName: formData.patientName,
        phone: formData.phone,
        senderPhone: formData.senderPhone || formData.phone,
        problem: formData.problem,
        consultType: formData.consultType,
        date: formData.date,
        timeSlot: formData.timeSlot,
        paymentMethod: formData.paymentMethod,
        trxId: formData.trxId,
        amount: 500,
        status: 'pending'
      });
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold shadow-xs">
            <CreditCard className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>অ্যাপয়েন্টমেন্ট ও পেমেন্ট সিস্টেম</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            সহজ ৩-ধাপে <span className="text-emerald-800">সিরিয়াল বুকিং ও ফি প্রদান</span>
          </h2>

          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            কনসালটেশন ফি (৳৫০০) পরিশোধ ও TrxID সাবমিট করলেই আপনাকে একটি সিরিয়াল কোড দেওয়া হবে। কোডটি হোয়াটসঅ্যাপে পাঠালে ডাক্তার তার মোবাইল অ্যাপে ভেরিফাই করে সিরিয়াল নিশ্চিত করবেন।
          </p>
        </div>

        {/* 3-Step Wizard Navigation (Apple Segmented Stepper) */}
        <div className="relative mb-8 max-w-xl mx-auto">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-slate-200 rounded-full -z-0">
            <div
              className="h-full bg-emerald-700 transition-all duration-300 rounded-full"
              style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
            />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            {[
              { num: 1, label: 'রোগীর তথ্য' },
              { num: 2, label: 'সময় ও তারিখ' },
              { num: 3, label: 'ফি ও TrxID' }
            ].map((item) => (
              <div key={item.num} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => step > item.num && setStep(item.num)}
                  disabled={step < item.num}
                  aria-label={`${item.label} (${step === item.num ? 'বর্তমান ধাপ' : step > item.num ? 'সম্পন্ন' : 'আসন্ন'})`}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                    step === item.num
                      ? 'bg-emerald-700 text-white shadow-md ring-4 ring-emerald-100 scale-105'
                      : step > item.num
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-white text-slate-400 border border-slate-300 cursor-not-allowed'
                  }`}
                >
                  {step > item.num ? '✓' : item.num}
                </button>
                <span
                  className={`text-xs font-semibold mt-2 ${
                    step === item.num ? 'text-emerald-900' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Accessible Inline Error Notification (Apple HIG: feedback.md) */}
        {formError && (
          <div 
            role="alert" 
            aria-live="polite"
            className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-sm flex items-start justify-between gap-3 shadow-xs animate-in fade-in"
          >
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" aria-hidden="true" />
              <span className="font-medium">{formError}</span>
            </div>
            <button 
              type="button" 
              onClick={() => setFormError(null)}
              className="text-rose-500 hover:text-rose-800 p-1 rounded-lg"
              aria-label="বার্তা বন্ধ করুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Form Container (Apple Content Card) */}
        <div className="apple-card rounded-3xl p-6 sm:p-10 relative">
          
          {/* STEP 1: PATIENT INFORMATION */}
          {step === 1 && (
            <form onSubmit={handleNextStep1} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                  <span>ধাপ ১: রোগীর প্রাথমিক তথ্য</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  সঠিক তথ্য প্রদান করলে চিকিৎসক পূর্বেই আপনার কেস পর্যালোচনা করতে পারবেন।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="patientName" className="block text-xs font-bold text-slate-700 mb-1.5">
                    রোগীর নাম *
                  </label>
                  <input
                    id="patientName"
                    type="text"
                    required
                    value={formData.patientName}
                    onChange={(e) => {
                      setFormData({ ...formData, patientName: e.target.value });
                      if (formError) setFormError(null);
                    }}
                    placeholder="যেমন: ফারহানা আক্তার"
                    className="w-full px-4 py-3 rounded-xl apple-input text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="patientPhone" className="block text-xs font-bold text-slate-700 mb-1.5">
                    মোবাইল নম্বর * (হোয়াটসঅ্যাপ নম্বর)
                  </label>
                  <input
                    id="patientPhone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (formError) setFormError(null);
                    }}
                    placeholder="০১৭১১২২৩৩৪৪"
                    className="w-full px-4 py-3 rounded-xl apple-input text-sm font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="district" className="block text-xs font-bold text-slate-700 mb-1.5">
                    জেলা / বর্তমান ঠিকানা *
                  </label>
                  <input
                    id="district"
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="যেমন: ঢাকা, বগুড়া, চট্টগ্রাম..."
                    className="w-full px-4 py-3 rounded-xl apple-input text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="age" className="block text-xs font-bold text-slate-700 mb-1.5">
                      বয়স (ঐচ্ছিক)
                    </label>
                    <input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="যেমন: ২৮"
                      className="w-full px-4 py-3 rounded-xl apple-input text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-xs font-bold text-slate-700 mb-1.5">
                      লিঙ্গ
                    </label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl apple-input text-sm font-medium"
                    >
                      <option value="মহিলা">মহিলা</option>
                      <option value="পুরুষ">পুরুষ</option>
                      <option value="শিশু">শিশু</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-3">
                  <label className="block text-xs font-bold text-slate-700">
                    মূল সমস্যা বা রোগ নির্বাচন করুন *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {commonProblems.map((prob) => (
                      <button
                        key={prob}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, problem: prob });
                          if (prob.includes('অন্যান্য')) {
                            const inputEl = document.getElementById('custom-problem-next');
                            inputEl?.focus();
                          }
                        }}
                        className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                          formData.problem === prob
                            ? 'bg-emerald-700 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                        }`}
                      >
                        {prob}
                      </button>
                    ))}
                  </div>

                  {/* Custom Problem Input for unlisted conditions */}
                  <div className="pt-2">
                    <label htmlFor="custom-problem-next" className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="text-emerald-700">✍️</span>
                        <span>তালিকায় সমস্যা না থাকলে বা বিস্তারিত এখানে লিখুন:</span>
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">(ঐচ্ছিক)</span>
                    </label>
                    <textarea
                      id="custom-problem-next"
                      rows={2}
                      value={customProblem}
                      onChange={(e) => setCustomProblem(e.target.value)}
                      placeholder="যেমন: ফ্যাটি লিভার, পেটে গ্যাস ও বুক জ্বালাপোড়া, ঘনঘন প্রস্রাবের বেগ, অনিদ্রা বা অন্য যেকোনো শারীরিক সমস্যা..."
                      className="w-full rounded-xl border border-slate-300 p-3 text-xs sm:text-sm apple-input text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      💡 আপনার সমস্যা ওপরের তালিকায় না থাকলেও সমস্যা নেই—নিজের ভাষায় এখানে লিখে জানান।
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="min-h-[46px] px-6 py-3 rounded-xl apple-btn-prominent font-semibold text-sm flex items-center gap-2"
                >
                  <span>পরবর্তী ধাপ (সময় ও তারিখ)</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: DATE & TIME SELECTION */}
          {step === 2 && (
            <form onSubmit={handleNextStep2} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                  <span>ধাপ ২: পরামর্শের ধরন, তারিখ ও সময়</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  আপনার সুবিধাজনক সময় ও পরামর্শের মাধ্যম বেছে নিন।
                </p>
              </div>

              {/* Consultation Type Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, consultType: 'অনলাইন ভিডিও কল' })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.consultType === 'অনলাইন ভিডিও কল'
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-slate-900">🌐 অনলাইন কনসালটেশন</span>
                    {formData.consultType === 'অনলাইন ভিডিও কল' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600">
                    হোয়াটসঅ্যাপ ভিডিও/অডিও কলে পরামর্শ ও ৬৪ জেলায় কুরিয়ারে ওষুধ প্রেরণ।
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, consultType: 'চেম্বারে সরাসরি সাক্ষাৎ' })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.consultType === 'চেম্বারে সরাসরি সাক্ষাৎ'
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-slate-900">🏥 চেম্বারে সরাসরি (উত্তরা, ঢাকা)</span>
                    {formData.consultType === 'চেম্বারে সরাসরি সাক্ষাৎ' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600">
                    উত্তরা সেক্টর ১১ চেম্বারে সরাসরি সাক্ষাতে প্রেসক্রিপশন ও জার্মানি ওষুধ।
                  </p>
                </button>
              </div>

              {/* Date Input */}
              <div>
                <label htmlFor="consultDate" className="block text-xs font-bold text-slate-700 mb-1.5">
                  পরামর্শের তারিখ *
                </label>
                <input
                  id="consultDate"
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full sm:w-72 px-4 py-3 rounded-xl apple-input text-sm"
                />
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  সময় নির্বাচন করুন *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeSlot: slot.time })}
                      className={`min-h-[52px] p-3 rounded-xl border text-left transition-all ${
                        formData.timeSlot === slot.time
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-xs font-semibold leading-tight">{slot.time}</p>
                      <span className="text-xs text-emerald-800 font-medium mt-1 block">
                        {slot.remaining}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl apple-btn-secondary font-medium text-xs flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" /> পূর্ববর্তী
                </button>
                <button
                  type="submit"
                  className="min-h-[46px] px-6 py-3 rounded-xl apple-btn-prominent font-semibold text-sm flex items-center gap-2"
                >
                  <span>পরবর্তী ধাপ (ফি প্রদান ও TrxID)</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT & TRXID VERIFICATION */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                    <span>ধাপ ৩: ফি পরিশোধ ও TrxID সাবমিশন</span>
                  </h3>
                  <span className="px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 font-mono font-bold text-sm">
                    ফি: ৳৫০০
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  নিচের বিকাশ বা নগদ নম্বরে সেন্ড মানি করে প্রাপ্ত TrxID প্রদান করুন।
                </p>
              </div>

              {/* Payment Method Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'bKash' })}
                  className={`min-h-[64px] p-4 rounded-2xl border text-center transition-all ${
                    formData.paymentMethod === 'bKash'
                      ? 'border-[#e2136e] bg-pink-50/70 shadow-xs ring-2 ring-[#e2136e]/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <p className="font-extrabold text-base text-[#e2136e]">bKash বিকাশ</p>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">পার্সোনাল নম্বর</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'Nagad' })}
                  className={`min-h-[64px] p-4 rounded-2xl border text-center transition-all ${
                    formData.paymentMethod === 'Nagad'
                      ? 'border-[#f7941d] bg-orange-50/70 shadow-xs ring-2 ring-[#f7941d]/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <p className="font-extrabold text-base text-[#f7941d]">Nagad নগদ</p>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">পার্সোনাল নম্বর</p>
                </button>
              </div>

              {/* Number Copy Clean Card */}
              <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-slate-600">
                      অফিসিয়াল {formData.paymentMethod} নম্বর (Send Money):
                    </span>
                    <p className="text-2xl font-mono font-bold text-emerald-900 tracking-wider mt-0.5">
                      {clinicConfig.bkashNumber}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyNumber(clinicConfig.bkashNumber, formData.paymentMethod)}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl apple-btn-prominent font-semibold text-xs flex items-center justify-center gap-1.5 self-start sm:self-auto"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-white" aria-hidden="true" />
                        <span>কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-white" aria-hidden="true" />
                        <span>নম্বর কপি করুন</span>
                      </>
                    )}
                  </button>
                </div>

                {copyToast && (
                  <p className="text-xs text-emerald-800 font-semibold animate-in fade-in">
                    ✓ {copyToast}
                  </p>
                )}

                {/* Micro instructions */}
                <div className="pt-2 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-700">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    ১. অ্যাপ থেকে <strong>Send Money</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    ২. নম্বর: <strong>{clinicConfig.bkashNumber}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    ৩. পরিমাণ: <strong>৳৫০০</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    ৪. কনফার্ম করে <strong>TrxID</strong> দিন
                  </div>
                </div>
              </div>

              {/* Inputs: Sender Number & TrxID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="senderPhone" className="block text-xs font-bold text-slate-700 mb-1.5">
                    যে নম্বর থেকে টাকা পাঠিয়েছেন *
                  </label>
                  <input
                    id="senderPhone"
                    type="tel"
                    required
                    value={formData.senderPhone}
                    onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                    placeholder="০১৭১১২২৩৩৪৪"
                    className="w-full px-4 py-3 rounded-xl apple-input text-sm font-mono font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="trxId" className="block text-xs font-bold text-slate-700">
                      ট্রানজেকশন আইডি (TrxID) *
                    </label>
                    <button
                      type="button"
                      onClick={handleFillDemoTrx}
                      className="text-xs text-emerald-800 font-bold hover:underline min-h-[32px] px-1"
                    >
                      💡 টেস্ট TrxID (DEMO500)
                    </button>
                  </div>
                  <input
                    id="trxId"
                    type="text"
                    required
                    value={formData.trxId}
                    onChange={(e) => {
                      setFormData({ ...formData, trxId: e.target.value });
                      if (formError) setFormError(null);
                    }}
                    placeholder="যেমন: 9K8L7M6N বা DEMO500"
                    className="w-full px-4 py-3 rounded-xl border-2 border-emerald-600 bg-white text-emerald-950 font-mono font-bold tracking-wider placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 text-sm uppercase"
                  />
                </div>
              </div>

              {/* Security Policy Alert */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="leading-relaxed">
                  <strong>নিরাপত্তা গ্যারান্টি:</strong> TrxID সাবমিট করলেই আপনাকে একটি ইউনিক সিরিয়াল কোড দেওয়া হবে। কোডটি এক ক্লিকে ডাক্তারের হোয়াটসঅ্যাপে পাঠালে ডাক্তার তার মোবাইল অ্যাপে ভেরিফাই করে সিরিয়াল নিশ্চিত করবেন।
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl apple-btn-secondary font-medium text-xs flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" /> পূর্ববর্তী
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-[48px] px-7 py-3 rounded-xl apple-btn-prominent font-semibold text-sm sm:text-base flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>সিরিয়াল প্রস্তুত হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 text-white" aria-hidden="true" />
                      <span>ফি জমা দিন ও সিরিয়াল কোড পান (৳৫০০)</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

      {/* Real-time Verification Radar Modal */}
      <VerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingData={ticketData}
        apiUrl={apiUrl}
      />
    </section>
  );
}
