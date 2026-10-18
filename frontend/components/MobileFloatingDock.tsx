'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, CalendarCheck, MapPin } from 'lucide-react';
import { clinicConfig } from '@/data/clinicData';

export default function MobileFloatingDock() {
  const pathname = usePathname();
  const hasOnPageSections = pathname === '/' || pathname === '/districts';
  const bookingHref = hasOnPageSections ? '#booking' : '/#booking';
  const districtsHref = pathname === '/districts' ? '#districts-grid' : '/districts';
  return (
    <aside 
      aria-label="মোবাইল দ্রুত অ্যাকশন বার"
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 apple-glass-dock rounded-2xl p-1.5 shadow-lg transition-transform duration-200"
    >
      <div className="grid grid-cols-4 gap-1 items-center">
        
        {/* Call button: 48x48pt hit target (accessibility.md › Mobility) */}
        <a
          href={`tel:${clinicConfig.phone}`}
          className="min-h-[48px] flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-700 hover:bg-slate-100/80 active:scale-95 transition-all"
          aria-label="ডাক্তারকে সরাসরি কল করুন"
        >
          <Phone className="w-5 h-5 text-emerald-700" aria-hidden="true" />
          <span className="text-xs font-semibold mt-1 text-slate-800">কল করুন</span>
        </a>

        {/* WhatsApp button: 48x48pt hit target */}
        <a
          href={`https://wa.me/${clinicConfig.cleanPhone}?text=${encodeURIComponent(
            'আসসালামু আলাইকুম ডাঃ সামসুন্নাহার স্নেহ। আমি হোমিওপ্যাথি চিকিৎসা ও পরামর্শ সম্পর্কে জানতে চাই।'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[48px] flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-700 hover:bg-slate-100/80 active:scale-95 transition-all"
          aria-label="অফিসিয়াল হোয়াটসঅ্যাপে চ্যাট শুরু করুন"
        >
          <MessageCircle className="w-5 h-5 text-[#25d366]" aria-hidden="true" />
          <span className="text-xs font-semibold mt-1 text-slate-800">হোয়াটসঅ্যাপ</span>
        </a>

        {/* 64 Districts Link: 48x48pt hit target */}
        <Link
          href={districtsHref}
          className="min-h-[48px] flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-700 hover:bg-slate-100/80 active:scale-95 transition-all"
          aria-label="৬৪ জেলার ডেলিভারি ও টেলিমেডিসিন দেখুন"
        >
          <MapPin className="w-5 h-5 text-teal-700" aria-hidden="true" />
          <span className="text-xs font-semibold mt-1 text-slate-800">৬৪ জেলা</span>
        </Link>

        {/* Primary CTA Book Now: Apple Prominent Style */}
        <a
          href={bookingHref}
          className="min-h-[48px] flex flex-col items-center justify-center py-1.5 px-1 rounded-xl apple-btn-prominent font-bold shadow-sm active:scale-95 transition-transform"
          aria-label="সিরিয়াল ও ফি পরিশোধ করুন"
        >
          <CalendarCheck className="w-5 h-5 text-white" aria-hidden="true" />
          <span className="text-xs font-bold mt-1 text-white">সিরিয়াল</span>
        </a>

      </div>
    </aside>
  );
}
