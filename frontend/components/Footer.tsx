import Link from 'next/link';
import { clinicConfig } from '@/data/clinicData';
import { districtsData } from '@/data/districtsData';

export default function Footer() {
  const popularDistricts = districtsData.slice(0, 12);

  return (
    <footer className="bg-slate-100/90 text-slate-600 pt-16 pb-12 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          
          {/* Col 1: Doctor & Clinic Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-xs">
                +
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-base leading-tight">হাসিনা হোমিও কিউর</h3>
                <p className="text-xs text-emerald-800 font-medium">Hasina Homeo Cure • Dhaka</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-900 font-semibold">ডাঃ সামসুন্নাহার স্নেহ</strong> (DHMS - BHB ঢাকা, রেজিঃ নং ৩৮২৭৫)। আধুনিক হোমিওপ্যাথিক চিকিৎসায় নারী, শিশু ও জটিল ক্রনিক রোগের বিশেষজ্ঞ সেবা।
            </p>

            <div className="pt-1 text-xs space-y-2 text-slate-700">
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>সরকারি নিবন্ধন নং: <strong className="text-emerald-900 font-semibold">৩৮২৭৫</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-xs">
                <svg className="w-4 h-4 text-emerald-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>সময়: প্রতিদিন সকাল ১০:০০ - রাত ১০:০০</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              গুরুত্বপূর্ণ লিঙ্ক
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#services" className="hover:text-emerald-800 transition-colors">
                  চিকিৎসা ও সেবাসমূহ
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-emerald-800 transition-colors font-semibold text-emerald-800">
                  ফি প্রদান ও সিরিয়াল বুকিং (৳৫০০)
                </a>
              </li>
              <li>
                <Link href="/districts" className="hover:text-emerald-800 transition-colors">
                  ৬৪ জেলা হোম ডেলিভারি ও টেলিমেডিসিন
                </Link>
              </li>
              <li>
                <a href="#reviews" className="hover:text-emerald-800 transition-colors">
                  রোগীদের বাস্তব অভিজ্ঞতা ও রিভিউ
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-800 transition-colors">
                  সাধারণ জিজ্ঞাসা (FAQ)
                </a>
              </li>
              <li>
                <a href={`tel:${clinicConfig.phone}`} className="hover:text-emerald-800 transition-colors font-medium text-emerald-900 flex items-center gap-1.5">
                  <span>হটলাইন: {clinicConfig.phone}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular District Pages for SEO */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              জনপ্রিয় জেলা সেবা
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {popularDistricts.map((d) => (
                <Link
                  key={d.slug}
                  href={`/zilla/${d.slug}`}
                  className="hover:text-emerald-800 transition-colors truncate py-0.5"
                  title={`${d.nameBn} হোমিও ডাক্তার`}
                >
                  {d.nameBn}
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/districts"
                className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold inline-flex items-center gap-1"
              >
                সব ৬৪ জেলার তালিকা দেখুন →
              </Link>
            </div>
          </div>

          {/* Col 4: Contact & Chamber Info */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              চেম্বার ও যোগাযোগ
            </h4>
            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <p className="text-slate-900 font-semibold">📍 উত্তরা চেম্বার (ঢাকা):</p>
                <p className="mt-0.5 text-slate-600">রোড ৪, সেক্টর ১১, উত্তরা, ঢাকা ১২৩০</p>
                <p className="text-xs text-emerald-800 font-medium">সময়: প্রতিদিন সকাল ১০টা - রাত ১০টা</p>
              </div>

              <div>
                <p className="text-slate-900 font-semibold">জরুরি হটলাইন / bKash:</p>
                <a 
                  href={`tel:${clinicConfig.phone}`} 
                  className="text-emerald-800 font-mono text-sm hover:underline font-bold block mt-0.5"
                >
                  {clinicConfig.phone}
                </a>
              </div>

              <div className="p-3.5 rounded-2xl apple-card text-xs space-y-1">
                <p className="text-emerald-800 font-semibold">🔒 নিরাপদ পেমেন্ট পলিসি:</p>
                <p className="text-slate-600 leading-relaxed">
                  বিকাশ/নগদে ৳৫০০ ফি প্রদানের সাথে সাথেই আপনার সিরিয়াল কনফার্ম হবে এবং ডাক্তারের অফিশিয়াল হোয়াটসঅ্যাপ আনলক হবে।
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} হাসিনা হোমিও কিউর (Hasina Homeo Cure). সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center md:text-right font-medium text-slate-600">
            <span>বোর্ড সার্টিফাইড হোমিওপ্যাথিক চিকিৎসা সেবা • ঢাকা ও সমগ্র বাংলাদেশ</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span>
              Built by{' '}
              <a
                href="https://luminexlabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-800 hover:text-emerald-950 hover:underline transition-colors"
              >
                luminexlabs.io
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
