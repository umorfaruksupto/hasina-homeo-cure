'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import PaymentBookingForm from '@/components/PaymentBookingForm';
import Reviews from '@/components/Reviews';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import MobileFloatingDock from '@/components/MobileFloatingDock';
import { districtsData } from '@/data/districtsData';

const divisions = ['সকল বিভাগ', 'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'];

export default function DistrictsPage() {
  const [selectedDivision, setSelectedDivision] = useState('সকল বিভাগ');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  const filteredDistricts = useMemo(() => {
    return districtsData.filter(d => {
      const matchDivision = selectedDivision === 'সকল বিভাগ' || d.divisionBn === selectedDivision;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || (
        d.nameBn.toLowerCase().includes(q) ||
        d.nameEn.toLowerCase().includes(q) ||
        d.divisionBn.toLowerCase().includes(q) ||
        d.upazilas.some(u => u.toLowerCase().includes(q))
      );
      return matchDivision && matchQuery;
    });
  }, [selectedDivision, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-8 pb-16">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold mb-4 shadow-xs">
            <span>🇧🇩 সমগ্র বাংলাদেশে বিস্তৃত স্বাস্থ্যসেবা</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            বাংলাদেশের <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">৬৪ জেলায়</span> হোমিওপ্যাথিক সেবা
          </h1>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-normal">
            ডাঃ সামসুন্নাহার স্নেহ (DHMS ঢাকা, রেজিঃ ৩৮২৭৫)-এর অধীনে ঘরে বসেই নিন বিশেষায়িত হোমিওপ্যাথিক চিকিৎসা ও কুরিয়ারে আসল জার্মান হোমিওপ্যাথিক ওষুধ।
          </p>

          {/* Search Bar (Neumorphic Inset) */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="আপনার জেলা বা উপজেলার নাম লিখুন (যেমন: বগুড়া, কুমিল্লা, টঙ্গী)..."
              className="w-full bg-white border border-slate-300 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-sm"
            />
            <svg
              className="w-5 h-5 text-slate-400 absolute left-4 top-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                মুছুন
              </button>
            )}
          </div>

          {/* Division Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {divisions.map((div) => (
              <button
                key={div}
                onClick={() => setSelectedDivision(div)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedDivision === div
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
                }`}
              >
                {div}
              </button>
            ))}
          </div>
        </section>

        {/* District Grid */}
        <section id="districts-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-5 text-xs text-slate-600 font-medium">
            <span>ফলাফল: <strong className="text-emerald-700 font-bold">{filteredDistricts.length}</strong> টি জেলা প্রদর্শিত</span>
            <span>ডেলিভারি পার্টনার: এস এ পরিবহন, সুন্দরবন, স্টিডফাস্ট</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDistricts.map((d) => (
              <Link
                key={d.slug}
                href={`/zilla/${d.slug}`}
                className="group bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-emerald-400 rounded-3xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {d.divisionBn} বিভাগ
                    </span>
                    <span className="text-xs text-emerald-700 font-mono font-bold">
                      {d.nameEn}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-2.5 group-hover:text-emerald-700 transition-colors">
                    {d.nameBn} জেলা
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
                    {d.hubTitle}
                  </p>

                  {/* Upazilas preview */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {d.upazilas.slice(0, 3).map((u) => (
                      <span key={u} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60 font-medium">
                        {u}
                      </span>
                    ))}
                    {d.upazilas.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded text-slate-400 font-medium">
                        +{d.upazilas.length - 3} আরও
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {d.courierTime}
                  </span>
                  <span className="text-emerald-700 font-bold group-hover:translate-x-1 transition-transform">
                    বিস্তারিত →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filteredDistricts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <p className="text-slate-600 text-sm">আপনার অনুসন্ধান অনুযায়ী কোনো জেলা পাওয়া যায়নি।</p>
              <button
                onClick={() => { setSelectedDivision('সকল বিভাগ'); setSearchQuery(''); }}
                className="mt-3 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-emerald-800 font-bold"
              >
                সব জেলা রিসেট করুন
              </button>
            </div>
          )}
        </section>

        {/* Treatments / Services */}
        <Services />

        {/* Interactive Payment & Appointment Booking Section */}
        <PaymentBookingForm />

        {/* Real Patient Testimonials */}
        <Reviews />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      <Footer />
      <MobileFloatingDock />
    </div>
  );
}
