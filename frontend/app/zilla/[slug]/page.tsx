import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileFloatingDock from '@/components/MobileFloatingDock';
import { districtsData } from '@/data/districtsData';
import { clinicConfig } from '@/data/clinicData';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return districtsData.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const district = districtsData.find((d) => d.slug === slug);

  if (!district) {
    return {
      title: 'জেলা পাওয়া যায়নি | হাসিনা হোমিও কিউর',
    };
  }

  const title = `${district.nameBn} হোমিও ডাক্তার - ডাঃ সামসুন্নাহার স্নেহ | হাসিনা হোমিও কিউর`;
  const description = `${district.nameBn} জেলায় বিশেষজ্ঞ হোমিওপ্যাথিক চিকিৎসা ও পরামর্শ। DHMS (ঢাকা), রেজিঃ ৩৮২৭৫। ${district.upazilas.slice(0, 4).join(', ')} সহ সব উপজেলায় দ্রুত ওষুধ ডেলিভারি (${district.courierTime})। ফি ৳৫০০।`;

  return {
    title,
    description,
    keywords: [
      `${district.nameBn} হোমিও ডাক্তার`,
      `${district.nameEn} homeopathic doctor`,
      `${district.nameBn} হোমিওপ্যাথি চিকিৎসা`,
      `homeo doctor in ${district.nameEn}`,
      `${district.nameBn} হোমিও ওষুধ ডেলিভারি`,
      'ডাঃ সামসুন্নাহার স্নেহ',
      'hasina homeo cure'
    ],
    openGraph: {
      title,
      description,
      url: `https://hasinahomeocure.com/zilla/${district.slug}`,
      siteName: 'Hasina Homeo Cure',
      images: [
        {
          url: '/images/dr-samsunnahar-sneho.jpg',
          width: 800,
          height: 800,
          alt: `ডাঃ সামসুন্নাহার স্নেহ - ${district.nameBn} হোমিও ডাক্তার`,
        },
      ],
      locale: 'bn_BD',
      type: 'article',
    },
    alternates: {
      canonical: `https://hasinahomeocure.com/zilla/${district.slug}`,
    },
  };
}

export default async function ZillaPage({ params }: Props) {
  const { slug } = params;
  const district = districtsData.find((d) => d.slug === slug);

  if (!district) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: `ডাঃ সামসুন্নাহার স্নেহ - ${district.nameBn} জেলা হোমিওপ্যাথি সেবা`,
    description: `${district.nameBn} জেলা ও সংশ্লিষ্ট সকল উপজেলায় নির্ভরযোগ্য হোমিওপ্যাথিক টেলিমেডিসিন পরামর্শ ও কুরিয়ারে ওষুধ প্রেরণ।`,
    url: `https://hasinahomeocure.com/zilla/${district.slug}`,
    telephone: clinicConfig.phone,
    priceRange: '৳500',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${district.nameEn} District, ${district.divisionEn} Division, Bangladesh`
    },
    medicalSpecialty: 'Homeopathic',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
        <Navbar />

        <main className="flex-grow pb-16">
          {/* Breadcrumb */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <nav className="flex text-xs text-slate-500 space-x-2 font-medium">
              <Link href="/" className="hover:text-emerald-700">হোম</Link>
              <span>/</span>
              <Link href="/districts" className="hover:text-emerald-700">৬৪ জেলা</Link>
              <span>/</span>
              <span className="text-emerald-700 font-bold">{district.nameBn}</span>
            </nav>
          </div>

          {/* District Hero Section (Neo-Glass Light Card) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="relative rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl shadow-slate-200/40">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10"></div>

              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold mb-4 shadow-xs">
                  <span>📍 {district.divisionBn} বিভাগ</span>
                  <span>•</span>
                  <span>🚀 {district.courierTime}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {district.nameBn}
                  </span>{' '}
                  জেলায় সেরা হোমিও ডাক্তার ও বিশেষায়িত চিকিৎসা সেবা
                </h1>

                <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  <strong className="text-slate-900 font-bold">ডাঃ সামসুন্নাহার স্নেহ</strong> (DHMS - BHB Dhaka, সরকারি রেজিঃ নং ৩৮২৭৫)। {district.nameBn} জেলার রোগীদের জন্য এখন ঢাকা আসার ঝামেলা ছাড়াই ঘরে বসে ভিডিও/অডিও কলে পূর্ণাঙ্গ কেস হিস্ট্রি দিয়ে প্রেসক্রিপশন ও জার্মানি থেকে আমদানিকৃত মানসম্মত ওষুধ কুরিয়ারে পাওয়ার সুব্যবস্থা।
                </p>

                {/* Quick Info Box (Neo-Boxes) */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-500">কনসালটেশন ফি</p>
                    <p className="text-xl font-black text-emerald-700">৳৫০০ টাকা</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">বিকাশ/নগদে পরিশোধযোগ্য</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-500">কুরিয়ার ডেলিভারি</p>
                    <p className="text-base font-bold text-slate-900">{district.courierTime}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">সুন্দরবন / এসএ পরিবহন</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-500">হটলাইন / হোয়াটসঅ্যাপ</p>
                    <p className="text-base font-mono font-bold text-emerald-800">{clinicConfig.phone}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">সকাল ১০টা - রাত ১০টা</p>
                  </div>
                </div>

                {/* Booking CTA */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/#booking"
                    className="px-6 py-3.5 rounded-2xl neo-btn-primary font-bold text-sm shadow-lg flex items-center gap-2"
                  >
                    <span>{district.nameBn} থেকে সিরিয়াল দিন (৳৫০০)</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <a
                    href={`tel:${clinicConfig.phone}`}
                    className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-300 shadow-xs transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>ফোন করুন: {clinicConfig.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Upazilas Coverage Area */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                <h2 className="text-xl font-bold text-slate-900">
                  {district.nameBn} জেলার আওতাভুক্ত সকল উপজেলা ও এলাকা
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                নিচের যে কোনো উপজেলায় সুন্দরবন কুরিয়ার, এস এ পরিবহন এবং স্টিডফাস্ট কুরিয়ারের মাধ্যমে সর্বোচ্চ বিশ্বস্ততায় আপনার ঠিকানায় ওষুধ পাঠানো হয়:
              </p>

              <div className="flex flex-wrap gap-2.5">
                {district.upazilas.map((u) => (
                  <span
                    key={u}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    {u}
                  </span>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-slate-700">
                <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>
                  <strong>ডেলিভারি সুবিধা:</strong> {district.highlight}। ওষুধ পাঠানো হলে কুরিয়ার ট্র্যাকিং মেমো নম্বর আপনার এসএমএস ও হোয়াটসঅ্যাপে সরবরাহ করা হবে।
                </p>
              </div>
            </div>
          </section>

          {/* Treatment Areas */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-2.5 h-6 rounded bg-emerald-600"></span>
              {district.nameBn} জেলার রোগীরা যেসব জটিল রোগের চিকিৎসা নিতে পারেন
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-700 border border-pink-200 flex items-center justify-center font-bold text-base mb-3">
                  ♀
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">নারী ও প্রসূতি স্বাস্থ্য</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  পিসিওএস (PCOS), অনিয়মিত ঋতুস্রাব, জরায়ুর সিস্ট ও টিউমার, শ্বেতপ্রদর (Leucorrhoea) এবং বন্ধ্যাত্বের পার্শ্বপ্রতিক্রিয়াহীন প্রাকৃতিক চিকিৎসা।
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold text-base mb-3">
                  ✦
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">চর্ম ও অ্যালার্জি রোগ</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  সোরিয়াসিস, দীর্ঘদিনের একজিমা, দাদ, চুলকানি, মেছতা ও ব্রণের মূল কারণ দূর করে স্থায়ী সমাধান।
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-base mb-3">
                  ⬡
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">কিডনি ও গলব্লাডার পাথর</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  অপারেশন ব্যতীত নির্দিষ্ট সাইজের কিডনি ও পিত্তথলির পাথর নিরাপদে গলিয়ে নিষ্কাশনে বিশেষায়িত হোমিও প্রেসক্রিপশন।
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold text-base mb-3">
                  ⚕
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">গ্যাস্ট্রিক, আইবিএস ও লিভার</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  দীর্ঘদিনের গ্যাস্ট্রিক আলসার, আইবিএস (IBS), ফ্যাটি লিভার, কোষ্ঠকাঠিন্য ও পাইলসের সফল চিকিৎসা।
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center font-bold text-base mb-3">
                  👶
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">শিশু রোগ ও টনসিল</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  শিশুদের ঘনঘন ঠান্ডা লাগা, টনসিলাইটিস, অ্যাডেনয়েড, ক্ষুধামন্দা ও শারীরিক দুর্বলতার মিষ্টি হোমিও ওষুধ।
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-base mb-3">
                  ❄
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">হাঁপানি, সাইনোসাইটিস ও শ্বাসকষ্ট</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  অ্যাজমা, সাইনোসাইটিস, কোল্ড অ্যালার্জি ও নাকের পলিপসের দীর্ঘমেয়াদী আরোগ্য প্রদানকারী চিকিৎসা।
                </p>
              </div>
            </div>
          </section>

          {/* 4 Steps Process */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-8">
                {district.nameBn} জেলা থেকে যেভাবে পরামর্শ ও ওষুধ পাবেন (৪টি সহজ ধাপ)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                    ১
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">ফি প্রদান করুন</h4>
                  <p className="text-xs text-slate-500">
                    বিকাশ/নগদে (০১৭২১৫১৫৫৪৬) কনসালটেশন ফি ৳৫০০ পাঠান এবং বুকিং ফর্মে TrxID সাবমিট করুন।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                    ২
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">হোয়াটসঅ্যাপ আনলক</h4>
                  <p className="text-xs text-slate-500">
                    ভেরিফিকেশন সম্পন্ন হতেই স্ক্রিনে ডাক্তারের অফিসিয়াল হোয়াটসঅ্যাপ নম্বর ও সরাসরি চ্যাট বাটন খুলে যাবে।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                    ৩
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">পরামর্শ ও প্রেসক্রিপশন</h4>
                  <p className="text-xs text-slate-500">
                    ডাঃ সামসুন্নাহার স্নেহ বিস্তারিত রোগীর লক্ষণ শুনে ডিজিটাল প্রেসক্রিপশন প্রদান করবেন।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-3">
                    ৪
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">কুরিয়ারে ওষুধ গ্রহণ</h4>
                  <p className="text-xs text-slate-500">
                    {district.courierTime}-এর মধ্যে সুন্দরবন/এস এ পরিবহনের মাধ্যমে আপনার ঠিকানায় ওষুধ পৌঁছে যাবে।
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/#booking"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl neo-btn-primary font-bold text-sm shadow-lg"
                >
                  এখনই সিরিয়াল ও পেমেন্ট সম্পন্ন করুন →
                </Link>
              </div>
            </div>
          </section>

          {/* Other Districts Links */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
                অন্যান্য জেলা সমূহ
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {districtsData
                  .filter((d) => d.slug !== district.slug)
                  .slice(0, 16)
                  .map((d) => (
                    <Link
                      key={d.slug}
                      href={`/zilla/${d.slug}`}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 font-medium transition-colors"
                    >
                      {d.nameBn} হোমিও ডাক্তার
                    </Link>
                  ))}
                <Link
                  href="/districts"
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors font-bold"
                >
                  সব জেলা দেখুন →
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <MobileFloatingDock />
      </div>
    </>
  );
}
