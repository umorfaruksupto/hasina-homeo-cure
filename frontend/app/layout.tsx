import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "হাসিনা হোমিও কিউর ঢাকা | ডাঃ শামসুন্নাহার স্নেহ (DHMS) - সেরা হোমিও ডাক্তার ও ৬৪ জেলায় অনলাইন চিকিৎসা",
  description: "হাসিনা হোমিও কিউর (Hasina Homeo Cure) - অভিজ্ঞ ও রেজিস্টার্ড হোমিও চিকিৎসক ডাঃ শামসুন্নাহার স্নেহ (DHMS, রেজিঃ ৩৮২৭৫)। ঢাকা ও সারাদেশের ৬৪ জেলায় অনলাইন হোমিওপ্যাথি চিকিৎসা। নারী ও শিশু রোগ, বন্ধ্যাত্ব, PCOS, কিডনি ও পিত্ত পাথর, টিউমার, ক্রনিক চর্মরোগ ও ব্যথার প্রাকৃতিক নিরাময়। সুন্দরবন ও এসএ কুরিয়ারে ২৪-৪৮ ঘণ্টায় অরিজিনাল জার্মান ওষুধ ডেলিভারি। কল: 01721515546।",
  keywords: "Hasina Homeo Cure, হাসিনা হোমিও কিউর ঢাকা, ডাঃ শামসুন্নাহার স্নেহ, Dr Samsunnahar Sneho, DHMS, হোমিও ডাক্তার ঢাকা, homeo doctor dhaka, best homeo doctor in dhaka, female homeo doctor dhaka, ঢাকা হোমিও কিউর, ৬৪ জেলা হোমিও ডাক্তার, online homeo doctor bangladesh, PCOS চিকিৎসা ঢাকা, বন্ধ্যাত্ব চিকিৎসা ঢাকা, পিত্ত পাথর হোমিও",
  metadataBase: new URL("https://hasinahomeocure.com"),
  openGraph: {
    type: "website",
    title: "হাসিনা হোমিও কিউর ঢাকা | ডাঃ শামসুন্নাহার স্নেহ (DHMS) - সেরা হোমিও ডাক্তার",
    description: "ঢাকা ও সারাদেশের ৬৪ জেলায় অভিজ্ঞ রেজিস্টার্ড নারী হোমিওপ্যাথি চিকিৎসক ডাঃ শামসুন্নাহার স্নেহ (DHMS, রেজিঃ ৩৮২৭৫)। অনলাইনে পরামর্শ ও কুরিয়ারে খাঁটি জার্মান ওষুধ ডেলিভারি।",
    url: "https://hasinahomeocure.com",
    siteName: "Hasina Homeo Cure",
    images: [{ url: "/images/dr-samsunnahar-sneho.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "হাসিনা হোমিও কিউর ঢাকা | ডাঃ শামসুন্নাহার স্নেহ (DHMS)",
    description: "প্রাকৃতিক ও পার্শ্বপ্রতিক্রিয়াহীন চিকিৎসায় সুস্থতার নির্ভরযোগ্য ঠিকানা। ঢাকা ও ৬৪ জেলায় সেবা।",
    images: ["/images/dr-samsunnahar-sneho.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%230d7a57'/><path d='M50 20 L50 80 M20 50 L80 50' stroke='%23ffffff' stroke-width='12' stroke-linecap='round'/></svg>" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "MedicalClinic",
                  "@id": "https://hasinahomeocure.com/#clinic",
                  "name": "Hasina Homeo Cure",
                  "alternateName": "হাসিনা হোমিও কিউর",
                  "url": "https://hasinahomeocure.com/",
                  "logo": "https://hasinahomeocure.com/images/dr-samsunnahar-sneho.jpg",
                  "image": "https://hasinahomeocure.com/images/dr-samsunnahar-sneho.jpg",
                  "telephone": "+8801721515546",
                  "priceRange": "৳ ৫০০",
                  "medicalSpecialty": [
                    "Homeopathy",
                    "Gynecological",
                    "Pediatric",
                    "Dermatology",
                    "Gastroenterology"
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Dhaka",
                    "addressRegion": "Dhaka Division",
                    "addressCountry": "BD"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "23.8103",
                    "longitude": "90.4125"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "1287",
                    "bestRating": "5"
                  },
                  "areaServed": [
                    { "@type": "City", "name": "Dhaka", "alternateName": "ঢাকা" },
                    { "@type": "Country", "name": "Bangladesh", "alternateName": "বাংলাদেশ" }
                  ],
                  "physician": {
                    "@type": "Physician",
                    "@id": "https://hasinahomeocure.com/#doctor",
                    "name": "Dr. Samsunnahar Sneho",
                    "alternateName": "ডাঃ শামসুন্নাহার স্নেহ",
                    "jobTitle": "Registered Homeopathic Physician",
                    "medicalSpecialty": "Classical Homeopathy, Mind Method Case-Taking",
                    "alumniOf": "Bangladesh Homoeopathic Board Dhaka",
                    "identifier": "DHMS Reg. 38275",
                    "telephone": "+8801721515546"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="antialiased selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
