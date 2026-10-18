'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, CalendarCheck, Menu, X, HeartPulse, ShieldCheck, MapPin } from 'lucide-react';
import { clinicConfig } from '@/data/clinicData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const hasOnPageSections = pathname === '/' || pathname === '/districts';

  const servicesHref = hasOnPageSections ? '#services' : '/#services';
  const districtsHref = pathname === '/districts' ? '#districts-grid' : '/districts';
  const reviewsHref = hasOnPageSections ? '#reviews' : '/#reviews';
  const faqHref = hasOnPageSections ? '#faq' : '/#faq';
  const bookingHref = hasOnPageSections ? '#booking' : '/#booking';

  return (
    <>
      {/* Top Notification Bar (Monochrome Tint with High Contrast) */}
      <aside 
        aria-label="অফিসিয়াল নোটিশ"
        className="bg-emerald-900 text-emerald-50 text-xs py-2 px-4 relative z-50 border-b border-emerald-800"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-semibold text-white">অনলাইন কনসালটেশন চালু:</span>
            <span className="text-emerald-200 hidden sm:inline">আজকের সিরিয়াল ও ৬৪ জেলায় পার্সেল ডেলিভারি চলমান</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-800/80 text-emerald-100 text-xs font-medium border border-emerald-700/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
              <span>সরকারি রেজিঃ {clinicConfig.regNoBn}</span>
            </span>

            <a
              href={`tel:${clinicConfig.phone}`}
              className="text-white hover:text-emerald-200 font-mono font-semibold transition-colors flex items-center gap-1.5 min-h-[32px] px-2 rounded-lg hover:bg-emerald-800/60"
              aria-label={`হটলাইনে কল করুন: ${clinicConfig.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
              <span>{clinicConfig.phone}</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Apple Liquid Glass Navigation Bar */}
      <header className="sticky top-0 z-40 apple-glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-2xl py-1 px-1.5"
            aria-label={`${clinicConfig.clinicNameBn} হোমপেজ`}
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-800 transition-colors duration-200">
                <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight group-hover:text-emerald-800 transition-colors">
                  {clinicConfig.clinicNameBn}
                </h1>
                <span className="hidden lg:inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  উত্তরা, ঢাকা
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-none mt-1">
                {clinicConfig.doctorNameBn} • <span className="text-emerald-800 font-mono font-semibold">DHMS</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="মূল নেভিগেশন">
            <Link
              href="/"
              className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                pathname === '/' ? 'text-emerald-800 font-bold bg-emerald-50/80' : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-100/70'
              }`}
            >
              হোম
            </Link>

            <a
              href={servicesHref}
              className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-emerald-800 hover:bg-slate-100/70 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              চিকিৎসাসমূহ
            </a>

            <Link
              href={districtsHref}
              className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                pathname === '/districts' ? 'text-emerald-800 font-bold bg-emerald-50/80' : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-100/70'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span>৬৪ জেলা ডেলিভারি</span>
            </Link>

            <a
              href={reviewsHref}
              className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-emerald-800 hover:bg-slate-100/70 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              রোগীদের রিভিউ
            </a>

            <a
              href={faqHref}
              className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-emerald-800 hover:bg-slate-100/70 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              প্রশ্নোত্তর (FAQ)
            </a>
          </nav>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={bookingHref}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl apple-btn-prominent font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <CalendarCheck className="w-4 h-4 text-white" aria-hidden="true" />
              <span>সিরিয়াল ও পেমেন্ট (৳৫০০)</span>
            </a>

            {/* Accessible 44x44pt Mobile Button (accessibility.md › Mobility) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              aria-label={isOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer (Liquid Glass Sheet) */}
        {isOpen && (
          <div className="md:hidden apple-glass-nav border-t border-slate-200/80 px-4 py-5 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">{clinicConfig.doctorNameBn}</p>
                <p className="text-xs text-emerald-800 font-medium">DHMS (BHB ঢাকা) • রেজিঃ {clinicConfig.regNoBn}</p>
              </div>
              <a
                href={`tel:${clinicConfig.phone}`}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 active:bg-emerald-100"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" /> 
                <span>কল করুন</span>
              </a>
            </div>

            <nav className="flex flex-col space-y-1 text-sm font-medium" aria-label="মোবাইল নেভিগেশন">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`min-h-[44px] flex items-center px-3.5 py-2.5 rounded-xl transition-colors ${
                  pathname === '/' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-800 hover:bg-slate-100 hover:text-emerald-800'
                }`}
              >
                হোম পেজ
              </Link>
              <a
                href={servicesHref}
                onClick={() => setIsOpen(false)}
                className="min-h-[44px] flex items-center px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 hover:text-emerald-800 transition-colors"
              >
                চিকিৎসাসমূহ
              </a>
              <Link
                href={districtsHref}
                onClick={() => setIsOpen(false)}
                className={`min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  pathname === '/districts' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-800 hover:bg-slate-100 hover:text-emerald-800'
                }`}
              >
                <span>৬৪ জেলা ডেলিভারি ও টেলিমেডিসিন</span>
                <span className="text-xs text-emerald-700 font-semibold">৬৪ জেলা →</span>
              </Link>
              <a
                href={reviewsHref}
                onClick={() => setIsOpen(false)}
                className="min-h-[44px] flex items-center px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 hover:text-emerald-800 transition-colors"
              >
                রোগীদের বাস্তব রিভিউ
              </a>
              <a
                href={faqHref}
                onClick={() => setIsOpen(false)}
                className="min-h-[44px] flex items-center px-3.5 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 hover:text-emerald-800 transition-colors"
              >
                সাধারণ জিজ্ঞাসা (FAQ)
              </a>
            </nav>

            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2.5">
              <a
                href={bookingHref}
                onClick={() => setIsOpen(false)}
                className="w-full min-h-[46px] flex items-center justify-center py-3 rounded-xl apple-btn-prominent font-semibold text-center text-sm shadow-sm"
              >
                বিকাশ/নগদে ফি দিন ও সিরিয়াল নিন (৳৫০০)
              </a>
              <a
                href={`tel:${clinicConfig.phone}`}
                className="w-full min-h-[44px] py-2.5 rounded-xl apple-btn-secondary font-medium text-center text-xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                <span>জরুরি হটলাইন: {clinicConfig.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
