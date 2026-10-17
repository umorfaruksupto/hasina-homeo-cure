'use client';

import React from 'react';
import { clinicData } from '@/data/clinicData';
import {
  UserRoundCheck,
  ShieldAlert,
  HeartHandshake,
  Sparkles,
  Activity,
  Baby,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const iconMap: Record<string, any> = {
  UserRoundCheck,
  ShieldAlert,
  HeartHandshake,
  Sparkles,
  Activity,
  Baby
};

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-200/80">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>বিশেষায়িত চিকিৎসা ক্ষেত্রসমূহ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            যেসব জটিল ও ক্রনিক রোগের <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">স্থায়ী আরোগ্য</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            কোনো ধরনের পার্শ্বপ্রতিক্রিয়া বা অপারেশনের ঝুঁকি ছাড়াই প্রাকৃতিক উপায়ে শরীরের নিজস্ব রোগ প্রতিরোধ ক্ষমতা ফিরিয়ে এনে নিশ্চিত সুস্থতার চিকিৎসা।
          </p>
        </div>

        {/* Bento Services Grid (Neo-Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicData.services.map((service, index) => {
            const Icon = iconMap[service.icon] || Activity;
            return (
              <div
                key={service.id}
                className="group relative bg-slate-50/70 hover:bg-white border border-slate-200/90 hover:border-emerald-400 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-900/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-emerald-700 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-emerald-600 group-hover:to-teal-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {service.badgeBn}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-700 transition-colors">
                    {service.titleBn}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {service.descBn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono font-medium">
                    #{String(index + 1).padStart(2, '0')} • হোমিওপ্যাথিক সেবা
                  </span>
                  <a
                    href="#booking"
                    className="text-xs font-bold text-emerald-700 group-hover:text-emerald-600 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>পরামর্শ নিন</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Bar */}
        <div className="mt-12 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700 shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white text-emerald-700 flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm sm:text-base">১০০% আসল সিলপ্যাক জার্মানি হোমিওপ্যাথিক ওষুধ</p>
              <p className="text-slate-600">ডাঃ সামসুন্নাহার স্নেহ'র সরাসরি প্রেসক্রিপশনে প্রস্তুতকৃত ওষুধ কুরিয়ারে পাঠানো হয়।</p>
            </div>
          </div>

          <a
            href="#booking"
            className="shrink-0 px-6 py-3 rounded-xl neo-btn-primary font-bold text-xs sm:text-sm shadow-md"
          >
            সিরিয়াল বুক করুন (৳৫০০) →
          </a>
        </div>

      </div>
    </section>
  );
}
