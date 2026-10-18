'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Truck, ChevronRight, Building, Globe } from 'lucide-react';

const topDistricts = [
  { slug: 'dhaka', nameBn: 'ঢাকা', nameEn: 'Dhaka' },
  { slug: 'chattogram', nameBn: 'চট্টগ্রাম', nameEn: 'Chattogram' },
  { slug: 'sylhet', nameBn: 'সিলেট', nameEn: 'Sylhet' },
  { slug: 'rajshahi', nameBn: 'রাজশাহী', nameEn: 'Rajshahi' },
  { slug: 'bogura', nameBn: 'বগুড়া', nameEn: 'Bogura' },
  { slug: 'khulna', nameBn: 'খুলনা', nameEn: 'Khulna' },
  { slug: 'barishal', nameBn: 'বরিশাল', nameEn: 'Barishal' },
  { slug: 'cumilla', nameBn: 'কুমিল্লা', nameEn: 'Cumilla' },
  { slug: 'rangpur', nameBn: 'রংপুর', nameEn: 'Rangpur' },
  { slug: 'mymensingh', nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh' },
  { slug: 'gazipur', nameBn: 'গাজীপুর', nameEn: 'Gazipur' },
  { slug: 'narayanganj', nameBn: 'নারায়ণগঞ্জ', nameEn: 'Narayanganj' },
  { slug: 'jashore', nameBn: 'যশোর', nameEn: 'Jashore' },
  { slug: 'feni', nameBn: 'ফেনী', nameEn: 'Feni' },
  { slug: 'coxs-bazar', nameBn: 'কক্সবাজার', nameEn: 'Cox\'s Bazar' },
  { slug: 'dinajpur', nameBn: 'দিনাজপুর', nameEn: 'Dinajpur' }
];

const dhakaAreas = [
  'মিরপুর', 'উত্তরা', 'ধানমন্ডি', 'গুলশান', 'বনানী', 'মোহাম্মদপুর', 'বাড্ডা',
  'মতিঝিল', 'পুরান ঢাকা', 'সাভার', 'কেরানীগঞ্জ', 'টঙ্গী', 'গাজীপুর', 'নারায়ণগঞ্জ'
];

export default function NationwideCoverage() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold shadow-xs">
            <Globe className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>সারা বাংলাদেশ কভারেজ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            ঢাকা ও সারাদেশের ৬৪ জেলায় <span className="text-emerald-800">অনলাইন সেবা</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            ঘরে বসেই অভিজ্ঞ চিকিৎসকের ভিডিও কনসালটেশন নিন এবং সুন্দরবন ও এসএ কুরিয়ারে ২৪-৪৮ ঘণ্টায় গ্রহণ করুন সিলপ্যাক আসল জার্মান ওষুধ।
          </p>
        </div>

        {/* Dhaka Metro Highlight Card */}
        <div className="apple-card rounded-3xl p-6 sm:p-8 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-lg sm:text-xl">
              <Building className="w-6 h-6 text-emerald-700" aria-hidden="true" />
              <h3>ঢাকা মহানগরী ও চেম্বার সেবা অঞ্চল</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              ঢাকা ও আশপাশের রোগীদের চেম্বারে সরাসরি সাক্ষাতের পাশাপাশি সমগ্র ঢাকা সিটি কর্পোরেশন ও শহরতলিতে ১২-২৪ ঘণ্টার মধ্যে হোম ডেলিভারি ওষুধ সরবরাহ নিশ্চিত করা হয়:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {dhakaAreas.map((area, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-emerald-700" aria-hidden="true" />
                  <span>{area}</span>
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/zilla/dhaka"
            className="flex-shrink-0 min-h-[46px] apple-btn-prominent font-semibold text-sm px-6 py-3 rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <span>ঢাকা জেলা বিস্তারিত দেখুন</span>
            <ChevronRight className="w-4 h-4 text-white" aria-hidden="true" />
          </Link>
        </div>

        {/* 64 Districts Link Badges */}
        <div className="mb-10">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
            <Truck className="w-5 h-5 text-emerald-700" aria-hidden="true" />
            <span>বিভাগ ভিত্তিক জনপ্রিয় জেলা কভারেজ</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {topDistricts.map((d) => (
              <Link
                key={d.slug}
                href={`/zilla/${d.slug}`}
                className="min-h-[46px] p-3 rounded-xl apple-card apple-card-hover text-slate-800 font-semibold text-xs sm:text-sm flex items-center justify-between transition group"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span>{d.nameBn} ({d.nameEn})</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        {/* Big CTA to full Directory */}
        <div className="text-center">
          <Link
            href="/districts"
            className="min-h-[50px] inline-flex items-center gap-2 apple-btn-secondary font-bold text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-xs transition"
          >
            <span>বাংলাদেশের সকল ৬৪টি জেলার পূর্ণাঙ্গ সার্চ ডিরেক্টরি দেখুন</span>
            <ChevronRight className="w-5 h-5 text-emerald-700" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
