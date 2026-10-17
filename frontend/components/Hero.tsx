'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, CalendarCheck, Phone, Star, Sparkles, Award, Users, HeartPulse, CheckCircle2, ArrowRight } from 'lucide-react';
import { clinicConfig } from '@/data/clinicData';

export default function Hero() {
  const [imageSrc, setImageSrc] = useState('/images/dr-samsunnahar-sneho.jpg');

  return (
    <section className="relative overflow-hidden bg-mesh-light pt-8 pb-16 lg:py-20 border-b border-slate-200/80">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-dot-pattern-light opacity-50 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Doctor Bio & Hero CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Micro-Trust Pill (Neumorphic) */}
            <div className="inline-flex flex-wrap items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-sm">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span className="text-emerald-800 text-xs font-bold">
                গভঃ রেজিঃ {clinicConfig.regNoBn} • বিএইচবি ঢাকা
              </span>
              <span className="text-slate-300 text-xs hidden sm:inline">•</span>
              <span className="text-slate-600 text-xs hidden sm:inline font-medium">
                আধুনিক ক্লাসিক্যাল হোমিওপ্যাথি ও মাইন্ড মেথড
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.18] tracking-tight">
                প্রাকৃতিক চিকিৎসায় <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  নিরাপদ ও দীর্ঘস্থায়ী
                </span> আরোগ্য
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                অভিজ্ঞ রেজিস্টার্ড নারী হোমিওপ্যাথিক চিকিৎসক <strong className="text-slate-900 font-bold">{clinicConfig.doctorNameBn} (DHMS)</strong>-এর অধীনে নারী ও প্রসূতি রোগ, PCOS, বন্ধ্যাত্ব, কিডনি ও পিত্ত পাথর, সোরিয়াসিস ও ক্রনিক রোগের পার্শ্বপ্রতিক্রিয়াহীন সফল চিকিৎসা।
              </p>
            </div>

            {/* Doctor Credentials Neumorphic Card */}
            <div className="p-4 sm:p-5 rounded-2xl neo-box flex items-center gap-4 max-w-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg shadow-emerald-600/30">
                <Award className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {clinicConfig.doctorNameBn}
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md">
                    DHMS ঢাকা
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {clinicConfig.clinicNameBn} • উত্তরা চেম্বার ও ৬৪ জেলায় অনলাইন সেবা
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold">
                  পরামর্শ ফি: ৳{clinicConfig.consultationFee} (বিকাশ/নগদে ফি প্রদানের পরই হোয়াটসঅ্যাপ উন্মুক্ত)
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#booking"
                className="group px-6 py-4 rounded-2xl neo-btn-primary font-bold text-sm sm:text-base flex items-center gap-2"
              >
                <CalendarCheck className="w-5 h-5 text-white" />
                <span>ফি প্রদান ও সিরিয়াল বুকিং (৳৫০০)</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                href="/districts"
                className="px-5 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-emerald-700 font-bold text-sm shadow-sm transition-all duration-200 flex items-center gap-2"
              >
                <span>৬৪ জেলায় ডেলিভারি দেখুন</span>
                <span className="text-xs text-emerald-600">→</span>
              </Link>
            </div>

            {/* Bento Quick Trust Metrics (Neumorphic Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs">
                <p className="text-xl sm:text-2xl font-black text-emerald-700">১২০০+</p>
                <p className="text-[11px] font-medium text-slate-500">সুস্থ আরোগ্য রোগী</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-xl sm:text-2xl font-black text-slate-900">৪.৯</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500">রোগী সন্তুষ্টি রেটিং</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs">
                <p className="text-xl sm:text-2xl font-black text-teal-700">১০০%</p>
                <p className="text-[11px] font-medium text-slate-500">আসল জার্মান ওষুধ</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs">
                <p className="text-xl sm:text-2xl font-black text-slate-900">৬৪ জেলা</p>
                <p className="text-[11px] font-medium text-slate-500">হোম কুরিয়ার সার্ভিস</p>
              </div>
            </div>

          </div>

          {/* Right Column: Layered Neo-Glass Doctor Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient Lighting Circle */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-200/50 via-teal-100/40 to-cyan-100/40 rounded-[44px] blur-2xl -z-10"></div>

            <div className="relative w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-xl rounded-[32px] border border-white/80 p-4 sm:p-5 shadow-2xl shadow-slate-300/40">
              
              {/* Doctor Image Container */}
              <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                <Image
                  src={imageSrc}
                  alt="ডাঃ সামসুন্নাহার স্নেহ - সেরা হোমিও ডাক্তার ঢাকা"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority
                  onError={() => setImageSrc('/images/sneho.jpg')}
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{clinicConfig.doctorNameBn}</p>
                      <p className="text-[11px] text-emerald-700 font-semibold">DHMS (BHB Dhaka) • রেজিঃ {clinicConfig.regNoBn}</p>
                    </div>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
                  </div>
                </div>
              </div>

              {/* Floating Glass Pill 1: Top Right */}
              <div className="absolute top-8 right-2 sm:-right-3 glass-pill px-3.5 py-2 rounded-2xl shadow-lg border border-white/90 animate-float">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <div>
                    <p className="text-[10px] text-slate-500 leading-none font-medium">নিরাপদ ভেরিফিকেশন</p>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">অফিসিয়াল bKash / নগদ</p>
                  </div>
                </div>
              </div>

              {/* Floating Glass Pill 2: Bottom Left */}
              <div className="absolute -bottom-2 -left-2 sm:-left-3 glass-pill px-3.5 py-2 rounded-2xl shadow-lg border border-white/90 animate-float-delayed">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-xl bg-emerald-100 text-emerald-700">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[10px] text-slate-500 leading-none font-medium">কুরিয়ার ট্র্যাকিং</p>
                    <p className="text-xs font-bold text-emerald-700 mt-0.5">২৪-৪৮ ঘণ্টায় হোম ডেলিভারি</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
