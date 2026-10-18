'use client';

import React, { useState } from 'react';
import { clinicData } from '@/data/clinicData';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>প্রায়শই জিজ্ঞাসিত প্রশ্ন</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            হোমিওপ্যাথি চিকিৎসা ও পেমেন্ট বিষয়ক <span className="text-emerald-800">সাধারণ জিজ্ঞাসা</span>
          </h2>

          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            আপনার যে কোনো সংশয় বা প্রশ্নের পরিষ্কার ও সঠিক উত্তর জেনে নিন।
          </p>
        </div>

        {/* FAQ Accordion Apple Cards */}
        <div className="space-y-3">
          {clinicData.faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`apple-card rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-emerald-500/80 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="w-full min-h-[56px] p-5 sm:p-6 text-left font-semibold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 transition"
                >
                  <span className={isOpen ? 'text-emerald-900 font-bold' : 'text-slate-800'}>
                    {faq.qBn}
                  </span>
                  <div 
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-emerald-50 text-emerald-800 rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div 
                    id={`faq-answer-${i}`}
                    className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200 font-normal"
                  >
                    {faq.aBn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-10 p-5 rounded-2xl apple-card text-center text-xs sm:text-sm text-slate-600 shadow-xs">
          <span>আরও কোনো প্রশ্ন আছে? আমাদের সরাসরি কল করতে পারেন: </span>
          <a href="tel:+8801721515546" className="text-emerald-800 font-mono font-bold hover:underline ml-1">
            +8801721515546
          </a>
          <span className="text-slate-500"> (সকাল ১০টা - রাত ১০টা)</span>
        </div>

      </div>
    </section>
  );
}
