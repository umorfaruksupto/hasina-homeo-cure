import Link from 'next/link';
import { clinicConfig } from '@/data/clinicData';
import { districtsData } from '@/data/districtsData';

export default function Footer() {
  const popularDistricts = districtsData.slice(0, 12);

  return (
    <footer className="bg-slate-100/90 text-slate-600 pt-16 pb-12 border-t border-slate-200/90 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200/90">
          
          {/* Col 1: Doctor & Clinic Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-600/20">
                +
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg leading-tight">হাসিনা হোমিও কিউর</h3>
                <p className="text-xs text-emerald-700 font-semibold">Hasina Homeo Cure • Dhaka</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-900">ডাঃ সামসুন্নাহার স্নেহ</strong> (DHMS - BHB Dhaka, Govt Reg. No. 38275)। আধুনিক হোমিওপ্যাথিক চিকিৎসায় নারী, শিশু ও জটিল ক্রনিক রোগের বিশেষজ্ঞ সেবা।
            </p>

            <div className="pt-1 text-xs space-y-2 text-slate-600">
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-2xs w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>সরকারি নিবন্ধন নং: <strong className="text-emerald-700">৩৮২৭৫</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>সময়: প্রতিদিন সকাল ১০:০০ - রাত ১০:০০</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              গুরুত্বপূর্ণ লিঙ্ক
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-emerald-700 transition-colors">
                  চিকিৎসা ও সেবাসমূহ
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-emerald-700 transition-colors font-semibold text-emerald-700">
                  ফি প্রদান ও সিরিয়াল বুকিং (৳৫০০)
                </a>
              </li>
              <li>
                <Link href="/districts" className="hover:text-emerald-700 transition-colors">
                  ৬৪ জেলা হোম ডেলিভারি ও টেলিমেডিসিন
                </Link>
              </li>
              <li>
                <a href="#reviews" className="hover:text-emerald-700 transition-colors">
                  রোগীদের বাস্তব অভিজ্ঞতা ও রিভিউ
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-700 transition-colors">
                  সাধারণ জিজ্ঞাসা (FAQ)
                </a>
              </li>
              <li>
                <a href={`tel:${clinicConfig.phone}`} className="hover:text-emerald-700 transition-colors font-medium text-emerald-800 flex items-center gap-1.5">
                  <span>হটলাইন: {clinicConfig.phone}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular District Pages for SEO */}
          <div>
            <h4 className="text-slate-900 font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              জনপ্রিয় জেলা সেবা
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {popularDistricts.map((d) => (
                <Link
                  key={d.slug}
                  href={`/zilla/${d.slug}`}
                  className="hover:text-emerald-700 transition-colors truncate"
                  title={`${d.nameBn} হোমিও ডাক্তার`}
                >
                  {d.nameBn}
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/districts"
                className="text-xs text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1"
              >
                সব ৬৪ জেলার তালিকা দেখুন →
              </Link>
            </div>
          </div>

          {/* Col 4: Contact & Chamber Info */}
          <div>
            <h4 className="text-slate-900 font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              চেম্বার ও যোগাযোগ
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <p className="text-slate-900 font-semibold">প্রধান চেম্বার ঠিকানা:</p>
                <p className="mt-0.5">{clinicConfig.addressBn}</p>
                <p className="text-[11px] text-slate-500">{clinicConfig.addressEn}</p>
              </div>

              <div>
                <p className="text-slate-900 font-semibold">জরুরি হটলাইন / bKash:</p>
                <a 
                  href={`tel:${clinicConfig.phone}`} 
                  className="text-emerald-700 font-mono text-base hover:underline font-black block mt-0.5"
                >
                  {clinicConfig.phone}
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-2xs text-[11px] space-y-1">
                <p className="text-emerald-700 font-bold">🔒 নিরাপদ পেমেন্ট পলিসি:</p>
                <p className="text-slate-600 leading-relaxed">
                  বিকাশ/নগদে ৳৫০০ ফি প্রদানের সাথে সাথেই আপনার সিরিয়াল কনফার্ম হবে এবং ডাক্তারের অফিসিয়াল হোয়াটসঅ্যাপ আনলক হবে।
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} হাসিনা হোমিও কিউর (Hasina Homeo Cure). সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="text-center md:text-right font-medium">
            সরকারি স্বীকৃতিপ্রাপ্ত হোমিওপ্যাথিক বিশেষজ্ঞ সেবা • ঢাকা ও সমগ্র বাংলাদেশ
          </p>
        </div>
      </div>
    </footer>
  );
}
