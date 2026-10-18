'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, CalendarCheck, Award, ArrowRight, CheckCircle2, MapPin, Users, HeartPulse } from 'lucide-react';
import { clinicConfig } from '@/data/clinicData';

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden bg-ambient-light pt-8 pb-16 lg:py-20 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Doctor Bio & Hero CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Micro-Trust Pill (Apple Glass Pill) */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass-pill text-slate-800 text-xs shadow-xs">
              <span className="flex h-2 w-2 relative" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="text-emerald-900 font-bold">
                গভঃ রেজিঃ {clinicConfig.regNoBn}
              </span>
              <span className="text-slate-300" aria-hidden="true">•</span>
              <span className="text-slate-700 font-medium">
                বিএইচবি ঢাকা অনুমোদিত
              </span>
              <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>
              <span className="text-slate-600 hidden sm:inline font-normal">
                আধুনিক ক্লাসিক্যাল হোমিওপ্যাথি
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                প্রাকৃতিক চিকিৎসায় <br className="hidden sm:inline" />
                <span className="text-emerald-800">নিরাপদ ও দীর্ঘস্থায়ী</span> আরোগ্য
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                অভিজ্ঞ রেজিস্টার্ড নারী হোমিওপ্যাথিক চিকিৎসক <strong className="text-slate-900 font-semibold">{clinicConfig.doctorNameBn} (DHMS)</strong>-এর ব্যক্তিগত তত্ত্বাবধানে নারী ও প্রসূতি রোগ, বন্ধ্যাত্ব, PCOS, কিডনি ও পিত্ত পাথর, সোরিয়াসিস ও দীর্ঘদিনের ক্রনিক রোগের প্রাকৃতিক চিকিৎসা।
              </p>
            </div>

            {/* Apple High-Trust Clinical Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 px-3.5 py-2.5 rounded-xl shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span>মাইন্ড-মেথড কেস অ্যানালাইসিস</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 px-3.5 py-2.5 rounded-xl shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span>১০০% খাঁটি জার্মান ওষুধ</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 px-3.5 py-2.5 rounded-xl shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span>৬৪ জেলায় হোম ডেলিভারি</span>
              </div>
            </div>

            {/* Action Buttons (buttons.md: Prominent for primary CTA, secondary for alternate) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#booking"
                className="min-h-[48px] px-6 py-3 rounded-2xl apple-btn-prominent font-semibold text-sm sm:text-base flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4 text-white" aria-hidden="true" />
                <span>ফি প্রদান ও সিরিয়াল বুকিং (৳৫০০)</span>
                <ArrowRight className="w-4 h-4 text-white" aria-hidden="true" />
              </a>

              <Link
                href="/districts"
                className="min-h-[48px] px-5 py-3 rounded-2xl apple-btn-secondary font-semibold text-sm flex items-center gap-2"
              >
                <span>৬৪ জেলায় ডেলিভারি দেখুন</span>
                <span className="text-emerald-700" aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Bento Quick Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-3.5 rounded-2xl apple-card">
                <p className="text-xl sm:text-2xl font-bold text-emerald-800">১,২৮০+</p>
                <p className="text-xs font-medium text-slate-600 mt-0.5">সুস্থ আরোগ্য রোগী</p>
              </div>
              <div className="p-3.5 rounded-2xl apple-card">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">৬৪ জেলায়</p>
                <p className="text-xs font-medium text-slate-600 mt-0.5">কুরিয়ার হোম ডেলিভারি</p>
              </div>
              <div className="p-3.5 rounded-2xl apple-card">
                <p className="text-xl sm:text-2xl font-bold text-emerald-800">১০০%</p>
                <p className="text-xs font-medium text-slate-600 mt-0.5">অরিজিনাল জার্মান ড্রপস</p>
              </div>
              <div className="p-3.5 rounded-2xl apple-card">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">গভঃ রেজিঃ</p>
                <p className="text-xs font-medium text-slate-600 mt-0.5">৩৮২৭৫ (বিএইচবি ঢাকা)</p>
              </div>
            </div>

          </div>

          {/* Right Column: Doctor Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Doctor Visual Card */}
              <div className="apple-card rounded-3xl p-3 sm:p-4 bg-white">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  {!imageError ? (
                    <Image
                      src="/images/dr-samsunnahar-sneho.jpg"
                      alt="ডাঃ সামসুন্নাহার স্নেহ (DHMS) - অভিজ্ঞ হোমিওপ্যাথিক চিকিৎসক"
                      fill
                      priority
                      className="object-cover object-top transition-transform duration-500 hover:scale-105"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="text-center p-6 space-y-3">
                      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl font-bold">
                        স্নেহ
                      </div>
                      <p className="text-base font-bold text-slate-900">{clinicConfig.doctorNameBn}</p>
                      <p className="text-xs text-slate-500">DHMS (BHB ঢাকা) • রেজিঃ {clinicConfig.regNoBn}</p>
                    </div>
                  )}

                  {/* Verified Badge Float */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl apple-glass-pill border border-white/80 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-tight">বোর্ড সার্টিফাইড চিকিৎসক</p>
                        <p className="text-[11px] text-slate-600 leading-tight">রেজিঃ নং ৩৮২৭৫ (DHMS)</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-200">
                      সক্রিয়
                    </span>
                  </div>
                </div>

                {/* Card Sub-Banner */}
                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs text-slate-700">
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                    <span>উত্তরা, সেক্টর ১১, ঢাকা</span>
                  </span>
                  <span className="font-semibold text-emerald-800">
                    ভিজিট ফি: ৳{clinicConfig.consultationFee}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
