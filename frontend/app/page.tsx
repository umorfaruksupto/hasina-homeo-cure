import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import PaymentBookingForm from '@/components/PaymentBookingForm';
import NationwideCoverage from '@/components/NationwideCoverage';
import Reviews from '@/components/Reviews';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import MobileFloatingDock from '@/components/MobileFloatingDock';
import { clinicConfig } from '@/data/clinicData';

export const metadata: Metadata = {
  title: 'ডাঃ সামসুন্নাহার স্নেহ - সেরা হোমিও ডাক্তার ঢাকা | হাসিনা হোমিও কিউর',
  description: 'DHMS (ঢাকা), সরকারি রেজিঃ ৩৮২৭৫। আধুনিক হোমিও চিকিৎসায় নারী, শিশু, ক্রনিক ও জটিল রোগের সফল চিকিৎসা। ঢাকা চেম্বার ও ৬৪ জেলায় অনলাইন চিকিৎসা ও ওষুধ ডেলিভারি। ফি ৳৫০০।',
  keywords: [
    'homeo doctor dhaka',
    'best homeopathic doctor in bangladesh',
    'hasina homeo cure',
    'dr samsunnahar sneho',
    'হোমিও ডাক্তার ঢাকা',
    'সেরা হোমিওপ্যাথিক ডাক্তার বাংলাদেশ',
    'অনলাইন হোমিও কনসালটেশন',
    'বিকাশ পেমেন্ট হোমিও ডাক্তার',
    'উত্তরা হোমিও ডাক্তার',
    'মহিলা হোমিও ডাক্তার ঢাকা'
  ],
  openGraph: {
    title: 'ডাঃ সামসুন্নাহার স্নেহ - সেরা হোমিও ডাক্তার ঢাকা | হাসিনা হোমিও কিউর',
    description: 'আধুনিক হোমিও চিকিৎসায় নারী, শিশু ও জটিল রোগের সফল চিকিৎসা। ঢাকা চেম্বার ও ৬৪ জেলায় হোম ডেলিভারি।',
    url: 'https://hasinahomeocure.com',
    siteName: 'Hasina Homeo Cure',
    images: [
      {
        url: '/images/sneho.jpg',
        width: 800,
        height: 800,
        alt: 'ডাঃ সামসুন্নাহার স্নেহ - DHMS রেজিঃ ৩৮২৭৫',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
  alternates: {
    canonical: 'https://hasinahomeocure.com',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'Physician'],
    name: 'হাসিনা হোমিও কিউর (Hasina Homeo Cure)',
    alternateName: 'Dr. Samsunnahar Sneho Homeopathy Clinic Dhaka',
    description: 'বোর্ড সার্টিফাইড হোমিওপ্যাথিক চিকিৎসা কেন্দ্র। ডাঃ সামসুন্নাহার স্নেহ (DHMS, Govt Reg. No. 38275)। নারী, শিশু ও জটিল ক্রনিক রোগের বিশেষজ্ঞ সেবা।',
    url: 'https://hasinahomeocure.com',
    telephone: clinicConfig.phone,
    priceRange: '৳500',
    image: 'https://hasinahomeocure.com/images/sneho.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Road #04, Sector #11, Uttara',
      addressLocality: 'Dhaka',
      postalCode: '1230',
      addressCountry: 'BD'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '23.8759',
      longitude: '90.3795'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '10:00',
        closes: '22:00'
      }
    ],
    medicalSpecialty: 'Homeopathic',
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Online Telemedicine Consultation',
        description: 'অনলাইন ভিডিও/অডিও পরামর্শ ও ৬৪ জেলায় কুরিয়ারে ওষুধ প্রেরণ'
      },
      {
        '@type': 'MedicalProcedure',
        name: 'In-Chamber Physical Consultation',
        description: 'উত্তরা চেম্বারে সরাসরি রোগী দেখে প্রেসক্রিপশন ও জার্মানি ওষুধ'
      }
    ]
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero />

          {/* Treatments / Services */}
          <Services />

          {/* Interactive Payment & Appointment Booking Section */}
          <PaymentBookingForm />

          {/* 64 Zilla Directory & Nationwide Courier Delivery */}
          <NationwideCoverage />

          {/* Real Patient Testimonials */}
          <Reviews />

          {/* FAQ Section */}
          <FaqSection />
        </main>

        <Footer />
        <MobileFloatingDock />
      </div>
    </>
  );
}
