'use client';

import React from 'react';
import { clinicData } from '@/data/clinicData';
import { Star, Quote, MapPin, CheckCircle2, Heart } from 'lucide-react';

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold shadow-xs">
            <Heart className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>রোগীদের বাস্তব অভিজ্ঞতা</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            ১,২৮০+ সুস্থ রোগীর <span className="text-emerald-800">কৃতজ্ঞতাপূর্ণ মন্তব্য</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            রোগীর আন্তরিক সুস্থতা এবং দীর্ঘদিনের কষ্ট থেকে চিরতরে আরোগ্যই আমাদের সেবার পরম প্রাপ্তি।
          </p>
        </div>

        {/* Reviews Apple Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clinicData.testimonials.map((review, i) => (
            <div
              key={i}
              className="apple-card apple-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative"
            >
              <div className="absolute top-6 right-6 text-slate-200">
                <Quote className="w-8 h-8 opacity-40" aria-hidden="true" />
              </div>

              <div>
                {/* 5 Stars with rating pill */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-500" aria-label={`রেটিং: ${review.rating} স্টার`}>
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                    ৫.০ চমৎকার
                  </span>
                </div>

                {/* Comment */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  "{review.commentBn}"
                </p>
              </div>

              {/* Patient Info */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-sm shadow-xs border border-emerald-200">
                    {review.nameBn.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      {review.nameBn}
                    </h3>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" /> {review.locationBn} জেলা
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                  <span>ভেরিফাইড</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
