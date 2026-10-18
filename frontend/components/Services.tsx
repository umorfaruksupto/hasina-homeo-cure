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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>বিশেষায়িত চিকিৎসা ক্ষেত্রসমূহ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            যেসব জটিল ও ক্রনিক রোগের <span className="text-emerald-800">স্থায়ী আরোগ্য</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            কোনো ধরনের পার্শ্বপ্রতিক্রিয়া বা অপারেশনের ঝুঁকি ছাড়াই প্রাকৃতিক উপায়ে শরীরের নিজস্ব রোগ প্রতিরোধ ক্ষমতা ফিরিয়ে এনে নিরাপদ ও দীর্ঘস্থায়ী আরোগ্য।
          </p>
        </div>

        {/* Apple Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicData.services.map((service, index) => {
            const Icon = iconMap[service.icon] || Activity;
            return (
              <div
                key={service.id}
                className="group relative apple-card apple-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-200 shadow-xs">
                      <Icon className="w-6 h-6 transition-transform duration-200 group-hover:scale-105" aria-hidden="true" />
                    </div>

                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                      {service.badgeBn}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-800 transition-colors">
                    {service.titleBn}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {service.descBn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono font-medium">
                    #{String(index + 1).padStart(2, '0')} • হোমিওপ্যাথিক সেবা
                  </span>
                  <a
                    href="#booking"
                    className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-2 py-1 rounded-lg group-hover:bg-emerald-50/80 transition-colors"
                    aria-label={`${service.titleBn} বিষয়ে পরামর্শ নিন`}
                  >
                    <span>পরামর্শ নিন</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Banner */}
        <div className="mt-12 p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white text-emerald-800 flex items-center justify-center shrink-0 shadow-xs border border-slate-200">
              <ShieldCheck className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">১০০% অরিজিনাল জার্মান ওষুধ ও প্রফেশনাল প্রেসক্রিপশন</p>
              <p className="text-slate-600 mt-0.5">সব ওষুধ সিলপ্যাক জার্মানি থেকে আমদানিকৃত এবং নিরাপদ মাত্রায় প্রস্তুতকৃত।</p>
            </div>
          </div>
          <a
            href="#booking"
            className="min-h-[44px] px-5 py-2.5 rounded-xl apple-btn-prominent font-semibold text-xs shrink-0 flex items-center gap-1.5"
          >
            <span>সিরিয়াল বুকিং করুন</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

      </div>
    </section>
  );
}
