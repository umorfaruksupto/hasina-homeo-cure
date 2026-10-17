'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, CalendarCheck, MapPin } from 'lucide-react';
import { clinicConfig } from '@/data/clinicData';

export default function MobileFloatingDock() {
  return (
    <aside 
      aria-label="Mobile Quick Actions"
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-white/92 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-1.5 shadow-[0_12px_35px_rgba(15,23,42,0.12)]"
    >
      <div className="grid grid-cols-4 gap-1 items-center">
        
        {/* Call button */}
        <a
          href={`tel:${clinicConfig.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          title="সরাসরি কল করুন"
        >
          <Phone className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-bold mt-1 text-slate-700">কল করুন</span>
        </a>

        {/* WhatsApp button */}
        <a
          href={`https://wa.me/${clinicConfig.cleanPhone}?text=${encodeURIComponent(
            'আসসালামু আলাইকুম ডাঃ সামসুন্নাহার স্নেহ। আমি হোমিওপ্যাথি চিকিৎসা ও পরামর্শ সম্পর্কে জানতে চাই।'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          title="হোয়াটসঅ্যাপে চ্যাট"
        >
          <MessageCircle className="w-4 h-4 text-[#25d366]" />
          <span className="text-[10px] font-bold mt-1 text-slate-700">হোয়াটসঅ্যাপ</span>
        </a>

        {/* 64 Districts Link */}
        <Link
          href="/districts"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          title="৬৪ জেলা সেবা"
        >
          <MapPin className="w-4 h-4 text-teal-600" />
          <span className="text-[10px] font-bold mt-1 text-slate-700">৬৪ জেলা</span>
        </Link>

        {/* Primary CTA Book Now */}
        <a
          href="#booking"
          className="flex flex-col items-center justify-center py-2 px-1.5 rounded-xl neo-btn-primary font-bold shadow-md active:scale-95 transition-transform"
          title="সিরিয়াল ও পেমেন্ট"
        >
          <CalendarCheck className="w-4 h-4 text-white" />
          <span className="text-[10px] font-extrabold mt-1 text-white">সিরিয়াল দিন</span>
        </a>

      </div>
    </aside>
  );
}
