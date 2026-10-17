export interface DoctorInfo {
  nameBn: string;
  nameEn: string;
  degreeBn: string;
  degreeEn: string;
  regBn: string;
  regEn: string;
  specialtyBn: string;
  specialtyEn: string;
  clinicNameBn: string;
  clinicNameEn: string;
  sloganBn: string;
  sloganEn: string;
  phone: string;
  displayPhone: string;
  whatsapp: string;
  fee: string;
  hoursBn: string;
  hoursEn: string;
}

export interface ServiceItem {
  id: string;
  category: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  badgeBn: string;
  badgeEn: string;
  icon: string;
}

export interface TestimonialItem {
  nameBn: string;
  nameEn: string;
  locationBn: string;
  locationEn: string;
  rating: number;
  commentBn: string;
  commentEn: string;
}

export interface FaqItem {
  qBn: string;
  qEn: string;
  aBn: string;
  aEn: string;
}

export const clinicData = {
  doctor: {
    nameBn: "ডাঃ শামসুন্নাহার স্নেহ",
    nameEn: "Dr. Samsunnahar Sneho",
    degreeBn: "ডি এইচ এম এস (বিএইচবি ঢাকা)",
    degreeEn: "DHMS (BHB Dhaka)",
    regBn: "বাংলাদেশ হোমিওপ্যাথিক বোর্ড নিবন্ধিত (রেজিঃ ৩৮২৭৫)",
    regEn: "Registered by Bangladesh Homoeopathic Board (Reg. No: 38275)",
    specialtyBn: "হোমিওপ্যাথিক মেডিসিন ও মাইন্ড মেথড স্পেশালিস্ট",
    specialtyEn: "Homeopathic Medicine & Mind Method Specialist",
    clinicNameBn: "হাসিনা হোমিও কিউর",
    clinicNameEn: "Hasina Homeo Cure",
    sloganBn: "স্বাস্থ্যই সুখের মূলধন — প্রাকৃতিক চিকিৎসায় নিরাপদ সমাধান",
    sloganEn: "Health is Wealth — Safe & Natural Healing with Classical Homeopathy",
    phone: "+8801721515546",
    displayPhone: "+88 01721-515546",
    whatsapp: "8801721515546",
    fee: "৳ ৫০০ (পরামর্শ ফি)",
    hoursBn: "শনিবার - বৃহস্পতিবার: বিকাল ৪:০০ টা - রাত ৯:০০ টা (শুক্রবার বন্ধ)",
    hoursEn: "Saturday - Thursday: 4:00 PM - 9:00 PM (Friday Closed)"
  },

  stats: [
    { value: "১২০০+", labelBn: "সুস্থ রোগী", labelEn: "Patients Cured" },
    { value: "DHMS", labelBn: "বিএইচবি ঢাকা", labelEn: "BHB Dhaka Certified" },
    { value: "১০০%", labelBn: "প্রাকৃতিক ও নিরাপদ", labelEn: "Natural & Safe" },
    { value: "৪.৯ ★", labelBn: "রোগী সন্তুষ্টি", labelEn: "Patient Satisfaction" }
  ],

  services: [
    {
      id: "female-care",
      category: "female-child",
      titleBn: "মহিলা ও প্রসূতি রোগ",
      titleEn: "Women's Health & Gynaecology",
      descBn: "অনিয়মিত মাসিক, অতিরিক্ত রক্তস্রাব, লিউকরিয়া (শ্বেতপ্রদর), ডিসমেনোরিয়া এবং হরমোনের ভারসাম্যহীনতা।",
      descEn: "Gentle natural remedies for menstrual irregularities, leukorrhea, dysmenorrhea, and hormonal imbalances.",
      badgeBn: "বিশেষজ্ঞ সেবা",
      badgeEn: "Specialist",
      icon: "UserRoundCheck"
    },
    {
      id: "pcos-cyst",
      category: "tumor-stone",
      titleBn: "PCOS ও ওভারিয়ান সিস্ট",
      titleEn: "PCOS & Ovarian Cysts",
      descBn: "পলিসিস্টিক ওভারিয়ান সিন্ড্রোম ও সিস্ট অপারেশনের ঝুঁকি ছাড়া প্রাকৃতিকভাবে সারিয়ে তোলার কার্যকর চিকিৎসা।",
      descEn: "Effective non-surgical homeopathic therapy to balance hormones and dissolve ovarian cysts naturally.",
      badgeBn: "বিনা অপারেশনে",
      badgeEn: "Non-Surgical",
      icon: "ShieldAlert"
    },
    {
      id: "infertility",
      category: "female-child",
      titleBn: "বন্ধ্যাত্ব (নারী ও পুরুষ)",
      titleEn: "Infertility (Male & Female)",
      descBn: "সন্তানহীনতা, শুক্রাণুজনিত সমস্যা ও ডিম্বাশয়ের দুর্বলতায় গভীর বিশ্লেষণভিত্তিক কার্যকরী হোমিওপ্যাথিক সমাধান।",
      descEn: "Root-cause constitutional analysis for reproductive wellness, ovulation issues, and fertility support.",
      badgeBn: "উচ্চ সাফল্যের হার",
      badgeEn: "High Success",
      icon: "HeartHandshake"
    },
    {
      id: "gallstone-kidney",
      category: "tumor-stone",
      titleBn: "পিত্ত ও কিডনি পাথর",
      titleEn: "Gallbladder & Kidney Stones",
      descBn: "পিত্তথলি ও কিডনিতে পাথর এবং তীব্র ব্যথায় লক্ষণভিত্তিক আসল জার্মান হোমিওপ্যাথিক ওষুধ।",
      descEn: "Targeted natural homeopathic remedies for kidney stones, gallbladder stones, and renal comfort.",
      badgeBn: "প্রাকৃতিক আরোগ্য",
      badgeEn: "Natural Cure",
      icon: "Sparkles"
    },
    {
      id: "skin-care",
      category: "pain-chronic",
      titleBn: "সোরিয়াসিস ও চর্ম রোগ",
      titleEn: "Psoriasis & Skin Diseases",
      descBn: "একজিমা, আর্টিকারিয়া, মেছতা, চুলকানি ও দীর্ঘদিনের একগুঁয়ে চর্মরোগের মূল থেকে নিরাময়।",
      descEn: "Permanent constitutional healing for chronic psoriasis, eczema, acne, allergic hives, and fungal infections.",
      badgeBn: "সমূলে নির্মূল",
      badgeEn: "Root Cure",
      icon: "Activity"
    },
    {
      id: "child-care",
      category: "female-child",
      titleBn: "শিশু রোগ ও পুষ্টি",
      titleEn: "Pediatric & Child Care",
      descBn: "শিশুদের রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি, ঘনঘন ঠান্ডা-কাশি, ক্ষুধামন্দা, টনসিল ও শারীরিক দুর্বলতা।",
      descEn: "Safe, sweet drops for recurring child cold, weak immunity, loss of appetite, and physical wellness.",
      badgeBn: "জনপ্রিয় সেবা",
      badgeEn: "Popular",
      icon: "Baby"
    }
  ],

  testimonials: [
    {
      nameBn: "রাবেয়া সুলতানা",
      nameEn: "Rabeya Sultana",
      locationBn: "ঢাকা",
      locationEn: "Dhaka",
      rating: 5,
      commentBn: "আমি দীর্ঘ ৩ বছর ধরে ওভারিয়ান সিস্ট ও অনিয়মিত মাসিকের ব্যথায় ভুগেছি। ম্যাডামের ৪ মাসের চিকিৎসায় সিস্ট সম্পূর্ণ মিলিয়ে গেছে, আল্ট্রাসনোগ্রাম রিপোর্ট একদম নরমাল!",
      commentEn: "Suffered from ovarian cysts and irregular periods for 3 years. After 4 months of treatment with Dr. Sneho, my ultrasound reports came back completely clear!"
    },
    {
      nameBn: "মোহাম্মদ রফিকুল ইসলাম",
      nameEn: "Md. Rafiqul Islam",
      locationBn: "যশোর",
      locationEn: "Jashore",
      rating: 5,
      commentBn: "৮ মিমি কিডনি পাথর ছিল, অপারেশনের পরামর্শ দেওয়া হয়েছিল। ডাঃ শামসুন্নাহার আপার ওষুধে মাত্র এক মাসের মধ্যে কোনো ব্যথা ছাড়াই পাথর প্রস্রাবের সাথে বের হয়ে গেছে।",
      commentEn: "Had an 8mm kidney stone and was advised surgery. With Dr. Sneho's medication, the stone passed naturally in one month without any pain. Highly recommended!"
    },
    {
      nameBn: "ফারহানা আক্তার",
      nameEn: "Farhana Akter",
      locationBn: "খুলনা",
      locationEn: "Khulna",
      rating: 5,
      commentBn: "আমার ৫ বছরের ছেলের সর্দি-কাশি ও ক্ষুধামন্দা কিছুতেই যাচ্ছিল না। ম্যাডামের মনোযোগ দিয়ে কথা শোনার ধরণ এবং ওষুধে ছেলে এখন পুরোপুরি সুস্থ।",
      commentEn: "My 5-year-old son suffered from recurrent cold and poor appetite. Dr. Sneho's empathetic listening and gentle medicine cured him completely."
    }
  ],

  faqs: [
    {
      qBn: "হোমিওপ্যাথি চিকিৎসায় কি রোগ মূল থেকে ভালো হয়?",
      qEn: "Does homeopathy cure diseases from their root cause?",
      aBn: "হ্যাঁ, হোমিওপ্যাথি শুধুমাত্র উপসর্গের চিকিৎসা করে না, বরং রোগীর শারীরিক গঠন, মানসিক অবস্থা এবং রোগ প্রতিরোধ ক্ষমতার ভারসাম্য ফিরিয়ে এনে রোগকে সমূলে নির্মূল করে।",
      aEn: "Yes, classical homeopathy does not merely mask symptoms; it stimulates the body's vital immune system and mental constitution to eliminate the root cause."
    },
    {
      qBn: "কীভাবে পরামর্শ ফি পরিশোধ করব এবং ডাক্তারকে কীভাবে পাব?",
      qEn: "How do I pay consultation fee and contact the doctor?",
      aBn: "আমাদের প্রাথমিক পরামর্শ ফি মাত্র ৫০০ টাকা। ওয়েবসাইটে ৩টি সহজ ধাপে বিকাশ/নগদে ফি পাঠিয়ে TrxID প্রদান করলেই স্বয়ংক্রিয়ভাবে ভেরিফিকেশন শুরু হয়। অনুমোদন হওয়া মাত্রই ডাক্তারের সরাসরি ব্যক্তিগত হোয়াটসঅ্যাপ নম্বর উন্মুক্ত হবে।",
      aEn: "Our consultation fee is BDT 500. Pay via bKash/Nagad and submit your TrxID. Once verified, Dr. Sneho's direct WhatsApp number and pre-filled message are immediately unlocked."
    },
    {
      qBn: "আমি কি দূরবর্তী স্থান থেকে অনলাইনে ভিডিও কনসালটেশন নিতে পারব?",
      qEn: "Can I get online video consultation if I live far away?",
      aBn: "অবশ্যই! দেশের যে কোনো জেলা থেকে রোগীরা অনলাইনে ভিডিও কলে বিস্তারিত কেস-টেকিং করতে পারেন এবং সুন্দরবন বা এসএ কুরিয়ারের মাধ্যমে আসল সিলপ্যাক জার্মান ওষুধ গ্রহণ করতে পারেন।",
      aEn: "Yes! Patients from across Bangladesh can consult via online video call and receive authentic German homeopathic medicine delivered via courier within 24-48 hours."
    },
    {
      qBn: "নারী রোগীদের ক্ষেত্রে সম্পূর্ণ গোপনীয়তা নিশ্চিত করা হয় কি?",
      qEn: "Is complete privacy maintained for female patients?",
      aBn: "হ্যাঁ, ডাঃ শামসুন্নাহার স্নেহ একজন অভিজ্ঞ নারী রেজিস্টার্ড চিকিৎসক হওয়ায় মা-বোনেরা তাদের ব্যক্তিগত ও গোপন স্বাস্থ্য সমস্যা নিয়ে সম্পূর্ণ সংকোচহীনভাবে আলোচনা করতে পারেন।",
      aEn: "Yes, as a qualified registered female homeopathic physician, Dr. Sneho provides a completely private and empathetic environment for women's healthcare concerns."
    }
  ]
};

export const clinicConfig = {
  doctorNameBn: "ডাঃ সামসুন্নাহার স্নেহ",
  doctorNameEn: "Dr. Samsunnahar Sneho",
  degreesBn: "DHMS (BHB Dhaka)",
  regNoBn: "৩৮২৭৫",
  regNoEn: "38275",
  clinicNameBn: "হাসিনা হোমিও কিউর",
  clinicNameEn: "Hasina Homeo Cure",
  phone: "+8801721515546",
  cleanPhone: "8801721515546",
  bkashNumber: "01721515546",
  nagadNumber: "01721515546",
  rocketNumber: "01721515546",
  consultationFee: 500,
  addressBn: "রোড #০৪, সেক্টর #১১, উত্তরা, ঢাকা-১২৩০, বাংলাদেশ",
  addressEn: "Road #04, Sector #11, Uttara, Dhaka-1230, Bangladesh",
  hoursBn: "প্রতিদিন সকাল ১০:০০ - রাত ১০:০০",
  email: "support@hasinahomeocure.com"
};
