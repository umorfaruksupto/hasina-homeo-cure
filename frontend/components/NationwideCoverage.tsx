"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Truck, ChevronRight, Building, Globe } from "lucide-react";
import { districtsData } from "@/data/districtsData";

const topDistricts = [
  { slug: "dhaka", nameBn: "ঢাকা", nameEn: "Dhaka" },
  { slug: "chattogram", nameBn: "চট্টগ্রাম", nameEn: "Chattogram" },
  { slug: "sylhet", nameBn: "সিলেট", nameEn: "Sylhet" },
  { slug: "rajshahi", nameBn: "রাজশাহী", nameEn: "Rajshahi" },
  { slug: "bogura", nameBn: "বগুড়া", nameEn: "Bogura" },
  { slug: "khulna", nameBn: "খুলনা", nameEn: "Khulna" },
  { slug: "barishal", nameBn: "বরিশাল", nameEn: "Barishal" },
  { slug: "cumilla", nameBn: "কুমিল্লা", nameEn: "Cumilla" },
  { slug: "rangpur", nameBn: "রংপুর", nameEn: "Rangpur" },
  { slug: "mymensingh", nameBn: "ময়মনসিংহ", nameEn: "Mymensingh" },
  { slug: "gazipur", nameBn: "গাজীপুর", nameEn: "Gazipur" },
  { slug: "narayanganj", nameBn: "নারায়ণগঞ্জ", nameEn: "Narayanganj" },
  { slug: "jashore", nameBn: "যশোর", nameEn: "Jashore" },
  { slug: "feni", nameBn: "ফেনী", nameEn: "Feni" },
  { slug: "coxs-bazar", nameBn: "কক্সবাজার", nameEn: "Cox's Bazar" },
  { slug: "dinajpur", nameBn: "দিনাজপুর", nameEn: "Dinajpur" }
];

const dhakaAreas = [
  "মিরপুর", "উত্তরা", "ধানমন্ডি", "গুলশান", "বনানী", "মোহাম্মদপুর", "বাড্ডা",
  "মতিঝিল", "পুরান ঢাকা", "সাভার", "কেরানীগঞ্জ", "টঙ্গী", "গাজীপুর", "নারায়ণগঞ্জ"
];

export default function NationwideCoverage() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-emerald-50/50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 uppercase inline-flex items-center gap-1.5 mb-3">
            <Globe className="w-4 h-4 text-emerald-700" /> সারা বাংলাদেশ কভারেজ
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            ঢাকা ও সারাদেশের ৬৪ জেলায় অনলাইন হোমিওপ্যাথি সেবা
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            ঘরে বসেই অভিজ্ঞ চিকিৎসকের ভিডিও কনসালটেশন নিন এবং সুন্দরবন ও এসএ কুরিয়ারে ২৪-৪৮ ঘণ্টায় গ্রহণ করুন সিলপ্যাক আসল জার্মান ওষুধ।
          </p>
        </div>

        {/* Dhaka Metro Highlight Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-xl shadow-emerald-500/5 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg sm:text-xl">
              <Building className="w-6 h-6 text-emerald-600" />
              <span>ঢাকা মহানগরী ও চেম্বার সেবা অঞ্চল</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              ঢাকা ও আশপাশের রোগীদের চেম্বারে সরাসরি সাক্ষাতের পাশাপাশি সমগ্র ঢাকা সিটি কর্পোরেশন ও শহরতলিতে ১২-২৪ ঘণ্টার মধ্যে হোম ডেলিভারি ওষুধ সরবরাহ নিশ্চিত করা হয়:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {dhakaAreas.map((area, i) => (
                <span
                  key={i}
                  className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  <MapPin className="w-3 h-3 inline mr-1 text-emerald-600" /> {area}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/zilla/dhaka"
            className="flex-shrink-0 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-md transition flex items-center gap-2"
          >
            <span>ঢাকা জেলা বিস্তারিত দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 64 Districts Link Badges */}
        <div className="mb-10">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
            <Truck className="w-5 h-5 text-emerald-600" /> বিভাগ ভিত্তিক জনপ্রিয় জেলা কভারেজ
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {topDistricts.map((d) => (
              <Link
                key={d.slug}
                href={`/zilla/${d.slug}`}
                className="p-3.5 rounded-xl bg-white hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-between shadow-sm transition group"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition" />
                  {d.nameBn} ({d.nameEn})
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition" />
              </Link>
            ))}
          </div>
        </div>

        {/* Big CTA to full Directory */}
        <div className="text-center">
          <Link
            href="/districts"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-emerald-800 font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl border-2 border-emerald-600 shadow-md hover:shadow-lg transition"
          >
            <span>বাংলাদেশের সকল ৬৪টি জেলার পূর্ণাঙ্গ সার্চ ডিরেক্টরি দেখুন</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
