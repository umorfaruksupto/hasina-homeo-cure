'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, CalendarCheck, Menu, X, HeartPulse, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { clinicConfig } from '@/data/clinicData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar (Soft Mint & Emerald) */}
      <aside className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 text-emerald-900 text-[11px] sm:text-xs py-2 px-4 border-b border-emerald-100/80 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="font-bold text-emerald-800">অনলাইন কনসালটেশন চালু:</span>
            <span className="text-slate-600 hidden sm:inline">আজকের সিরিয়াল ও ৬৪ জেলায় পার্সেল ডেলিভারি চলমান</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 border border-emerald-200 text-emerald-800 text-[10px] font-bold shadow-xs">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> সরকারি রেজিঃ {clinicConfig.regNoBn}
            </span>

            <a
              href={`tel:${clinicConfig.phone}`}
              className="text-emerald-900 hover:text-emerald-700 font-mono font-bold transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{clinicConfig.phone}</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Frosted Crystal Glass Navbar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-2xl border-b border-slate-200/80 shadow-[0_4px_25px_rgba(15,23,42,0.03)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/25 group-hover:scale-105 transition-transform duration-300 border border-emerald-400/40">
                <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">
                  {clinicConfig.clinicNameBn}
                </h2>
                <span className="hidden lg:inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  উত্তরা, ঢাকা
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                {clinicConfig.doctorNameBn} • <span className="text-emerald-700 font-mono font-bold">DHMS</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              href="#services"
              className="px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold text-slate-600 hover:text-emerald-700 hover:bg-slate-100/70 transition-all"
            >
              চিকিৎসাসমূহ
            </a>

            <Link
              href="/districts"
              className="px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold text-slate-600 hover:text-emerald-700 hover:bg-slate-100/70 transition-all flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>৬৪ জেলা ডেলিভারি</span>
            </Link>

            <a
              href="#reviews"
              className="px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold text-slate-600 hover:text-emerald-700 hover:bg-slate-100/70 transition-all"
            >
              রিভিউ
            </a>

            <a
              href="#faq"
              className="px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold text-slate-600 hover:text-emerald-700 hover:bg-slate-100/70 transition-all"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl neo-btn-primary font-bold text-xs lg:text-sm"
            >
              <CalendarCheck className="w-4 h-4 text-white" />
              <span>সিরিয়াল ও পেমেন্ট (৳৫০০)</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-4 py-5 space-y-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{clinicConfig.doctorNameBn}</p>
                <p className="text-[11px] text-emerald-700 font-semibold">DHMS (BHB Dhaka) • রেজিঃ {clinicConfig.regNoBn}</p>
              </div>
              <a
                href={`tel:${clinicConfig.phone}`}
                className="px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1"
              >
                <Phone className="w-3 h-3" /> কল করুন
              </a>
            </div>

            <nav className="flex flex-col space-y-1 text-sm font-semibold">
              <a
                href="#services"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-colors"
              >
                চিকিৎসাসমূহ
              </a>
              <Link
                href="/districts"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-colors flex items-center justify-between"
              >
                <span>৬৪ জেলা ডেলিভারি ও টেলিমেডিসিন</span>
                <span className="text-xs text-emerald-600 font-bold">৬৪ জেলা →</span>
              </Link>
              <a
                href="#reviews"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-colors"
              >
                রোগীদের বাস্তব রিভিউ
              </a>
              <a
                href="#faq"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-colors"
              >
                সাধারণ জিজ্ঞাসা (FAQ)
              </a>
            </nav>

            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <a
                href="#booking"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl neo-btn-primary font-bold text-center text-sm shadow-md"
              >
                বিকাশ/নগদে ফি দিন ও সিরিয়াল নিন (৳৫০০)
              </a>
              <a
                href={`tel:${clinicConfig.phone}`}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-center text-xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                জরুরি হটলাইন: {clinicConfig.phone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
