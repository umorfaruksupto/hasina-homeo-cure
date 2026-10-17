// Hasina Homeo Cure - Official Clinic Data & Content
const clinicData = {
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
    subSloganBn: "হোমিও চিকিৎসা নিন, সম্পূর্ণ সুস্থ থাকুন।",
    subSloganEn: "Take Homeopathic Treatment, Stay Naturally Healthy.",
    phone: "+8801721515546",
    displayPhone: "+88 01721-515546",
    bkash: "01721515546",
    displayBkash: "01721-515546",
    whatsapp: "8801862879156",
    displayWhatsapp: "+88 01862-879156",
    fee: "৳ ৫০০ (পরামর্শ ফি)",
    feeEn: "BDT 500 (Consultation Fee)",
    hoursBn: "শনিবার - বৃহস্পতিবার: বিকাল ৪:০০ টা - রাত ৯:০০ টা (শুক্রবার বন্ধ)",
    hoursEn: "Saturday - Thursday: 4:00 PM - 9:00 PM (Friday Closed)"
  },

  stats: [
    { value: "১২০০+", labelBn: "সফল আরোগ্য", labelEn: "Patients Cured" },
    { value: "DHMS", labelBn: "বিএইচবি ঢাকা অনুমোদিত", labelEn: "BHB Dhaka Certified" },
    { value: "১০০%", labelBn: "প্রাকৃতিক ও নিরাপদ", labelEn: "Natural & Safe" },
    { value: "৪.৯ ★", labelBn: "রোগী সন্তুষ্টি রেটিং", labelEn: "Patient Satisfaction" }
  ],

  services: [
    {
      id: "child-care",
      category: "female-child",
      titleBn: "শিশু রোগ ও শিশুর বিকাশ",
      titleEn: "Pediatric & Child Care",
      descBn: "শিশুদের রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি, ঘনঘন ঠান্ডা-কাশি, ক্ষুধামন্দা, শারীরিক ও মানসিক বিকাশজনিত জটিলতা।",
      descEn: "Safe, natural healing for recurring child cold, weak immunity, loss of appetite, and physical-mental development.",
      badgeBn: "জনপ্রিয় সেবা",
      badgeEn: "Popular",
      icon: "fa-baby"
    },
    {
      id: "female-care",
      category: "female-child",
      titleBn: "মহিলা ও প্রসূতি রোগ",
      titleEn: "Women's Health & Gynaecology",
      descBn: "অনিয়মিত মাসিক, অতিরিক্ত রক্তস্রাব, লিউকরিয়া (শ্বেতপ্রদর), ডিসমেনোরিয়া এবং হরমোনের ভারসাম্যহীনতা।",
      descEn: "Gentle natural remedies for menstrual irregularities, leukorrhea, dysmenorrhea, and hormonal imbalances.",
      badgeBn: "বিশেষজ্ঞ সেবা",
      badgeEn: "Specialist",
      icon: "fa-venus"
    },
    {
      id: "infertility",
      category: "female-child",
      titleBn: "বন্ধ্যাত্ব (নারী ও পুরুষ)",
      titleEn: "Infertility (Male & Female)",
      descBn: "সন্তানহীনতা, শুক্রাণুজনিত সমস্যা ও ডিম্বাশয়ের দুর্বলতায় গভীর বিশ্লেষণভিত্তিক কার্যকারী হোমিওপ্যাথিক সমাধান।",
      descEn: "Root-cause constitutional analysis for reproductive wellness, ovulation issues, and male-female fertility support.",
      badgeBn: "সাফল্যের হার বেশি",
      badgeEn: "High Success",
      icon: "fa-heart-pulse"
    },
    {
      id: "pcos-cyst",
      category: "tumor-stone",
      titleBn: "PCOS ও ওভারিয়ান সিস্ট",
      titleEn: "PCOS & Ovarian Cysts",
      descBn: "পলিসিস্টিক ওভারিয়ান সিন্ড্রোম ও সিস্ট অপারেশনের ঝুঁকি ছাড়া প্রাকৃতিকভাবে গলিয়ে ফেলার চিকিৎসা।",
      descEn: "Effective non-surgical homeopathic therapy to balance hormones and dissolve ovarian cysts naturally.",
      badgeBn: "বিনা অপারেশনে",
      badgeEn: "Non-Surgical",
      icon: "fa-dna"
    },
    {
      id: "uterine-tumor",
      category: "tumor-stone",
      titleBn: "জরায়ু টিউমার (Fibroids)",
      titleEn: "Uterine Fibroids & Tumors",
      descBn: "জরায়ুর টিউমার ও অতিরিক্ত রক্তস্রাবের উপসর্গ দূরীকরণে সার্জারিমুক্ত পার্শ্বপ্রতিক্রিয়াহীন হোমিও চিকিৎসা।",
      descEn: "Gentle holistic healing to reduce uterine fibroid size and eliminate painful excessive bleeding.",
      badgeBn: "অপারেশনবিহীন",
      badgeEn: "Surgery-Free",
      icon: "fa-shield-heart"
    },
    {
      id: "gallstone",
      category: "tumor-stone",
      titleBn: "পিত্তথলির পাথর (Gallstones)",
      titleEn: "Gallbladder Stones",
      descBn: "পিত্তথলিতে পাথর এবং পেটের ডানপাশের তীব্র ব্যথায় লক্ষণভিত্তিক প্রাকৃতিক হোমিওপ্যাথিক ওষুধ।",
      descEn: "Targeted natural homeopathic remedies for gallbladder stones, bilious colic, and digestive comfort.",
      badgeBn: "প্রাকৃতিক আরোগ্য",
      badgeEn: "Natural Cure",
      icon: "fa-gem"
    },
    {
      id: "kidney-stone",
      category: "tumor-stone",
      titleBn: "কিডনি পাথর (Kidney Stones)",
      titleEn: "Kidney Stones",
      descBn: "কিডনি ও মূত্রনালীর পাথর দ্রুত এবং ব্যথাহীনভাবে প্রস্রাবের মাধ্যমে বের করে আনার সুচিকিৎসা।",
      descEn: "Safe expulsion of renal and urinary stones with specialized homeopathic dilutions without surgical intervention.",
      badgeBn: "ব্যথামুক্ত অপসারণ",
      badgeEn: "Painless Relief",
      icon: "fa-shield-virus"
    },
    {
      id: "lipoma",
      category: "tumor-stone",
      titleBn: "লাইপোমা (Lipoma)",
      titleEn: "Lipoma (Fatty Lumps)",
      descBn: "শরীরের বিভিন্ন অংশে সৃষ্ট চর্বির দলা বা লাইপোমা স্থায়ীভাবে গলিয়ে ফেলার নির্ভরযোগ্য চিকিৎসা।",
      descEn: "Dissolves benign adipose lumps and subcutaneous fatty tissue gradually without cutting or surgery.",
      badgeBn: "স্থায়ী সমাধান",
      badgeEn: "Permanent",
      icon: "fa-circle-notch"
    },
    {
      id: "skin-psoriasis",
      category: "skin-allergy",
      titleBn: "চর্ম রোগ ও সোরিয়াসিস",
      titleEn: "Skin Diseases & Psoriasis",
      descBn: "সোরিয়াসিস, একজিমা, দাদ, চুলকানি, মেছতা ও ব্রণের দীর্ঘস্থায়ী সমস্যা রক্ত পরিষ্কারের মাধ্যমে নিরাময়।",
      descEn: "Deep cellular healing for stubborn psoriasis, chronic eczema, fungal infections, acne, and pigmentation.",
      badgeBn: "রুট কজ ট্রিটমেন্ট",
      badgeEn: "Root Cause",
      icon: "fa-hand-dots"
    },
    {
      id: "asthma",
      category: "skin-allergy",
      titleBn: "হাঁপানি ও অ্যালার্জি",
      titleEn: "Asthma & Respiratory Allergy",
      descBn: "শ্বাসকষ্ট, ধুলোবালির অ্যালার্জি, বুক আঁটসাঁট লাগা ও ব্রঙ্কাইটিসের দীর্ঘমেয়াদী আরামদায়ক চিকিৎসা।",
      descEn: "Long-term respiratory relief from bronchial asthma, dust allergy, wheezing, and nocturnal cough.",
      badgeBn: "নিরাপদ সমাধান",
      badgeEn: "Safe Relief",
      icon: "fa-lungs"
    },
    {
      id: "arthritis-rheumatism",
      category: "pain-chronic",
      titleBn: "বাত জ্বর ও আর্থ্রাইটিস",
      titleEn: "Rheumatic Fever & Arthritis",
      descBn: "ইউরিক এসিড বৃদ্ধি, হাঁটুর জয়েন্টে ব্যথা, গেঁটেবাত, ফোলাভাব ও চলাফেরার জড়তা দূরীকরণে বিশেষ চিকিৎসা।",
      descEn: "Alleviates high uric acid, osteo & rheumatoid arthritis pain, stiffness, and joint swelling sustainably.",
      badgeBn: "বিশেষ মনোযোগ",
      badgeEn: "Focused Care",
      icon: "fa-bone"
    },
    {
      id: "chronic-pain",
      category: "pain-chronic",
      titleBn: "সকল প্রকার দীর্ঘস্থায়ী ব্যথা",
      titleEn: "Chronic Pain & Back Pain",
      descBn: "মাজা ব্যথা, সায়াটিকা, ঘাড়ে ব্যথা (সার্ভাইকাল স্পন্ডাইলোসিস) ও মেরুদণ্ডের স্নায়ুর ব্যথায় উপশম।",
      descEn: "Proven pain relief for sciatica, lumbar spondylosis, neck pain, and chronic muscular aches.",
      badgeBn: "ব্যথানাশক চিকিৎসা",
      badgeEn: "Pain Management",
      icon: "fa-person-walking-with-cane"
    },
    {
      id: "migraine",
      category: "pain-chronic",
      titleBn: "মাইগ্রেন ও ক্রনিক মাথাব্যথা",
      titleEn: "Migraine & Chronic Headaches",
      descBn: "মাথার একপাশে তীব্র যন্ত্রণা, বমি বমি ভাব, চোখের জ্যোতিতে সমস্যা ও মানসিক চাপের কারণে মাথাব্যথা।",
      descEn: "Holistic relief from debilitating one-sided headaches, light sensitivity, and stress-induced migraines.",
      badgeBn: "মানসিক প্রশান্তি",
      badgeEn: "Relief",
      icon: "fa-brain"
    },
    {
      id: "autism-development",
      category: "female-child",
      titleBn: "অটিজম ও শিশুর আচরণগত সমস্যা",
      titleEn: "Autism & Developmental Support",
      descBn: "কথা বলায় বিলম্ব, চোখের যোগাযোগ না করা, হাইপারএক্টিভিটি ও মনোযোগ ঘাটতিতে মাইন্ড মেথড সমন্বয়।",
      descEn: "Mind-method homeopathic approach to assist cognitive development, speech delay, and hyperactivity in children.",
      badgeBn: "মাইন্ড মেথড",
      badgeEn: "Mind Method",
      icon: "fa-puzzle-piece"
    },
    {
      id: "piles-fissure",
      category: "pain-chronic",
      titleBn: "পাইলস্, ফিশার ও ফিস্টুলা",
      titleEn: "Piles, Fissure & Fistula",
      descBn: "মলদ্বারে রক্তপাত, অসহ্য জ্বালাপোড়া ও বলি বের হওয়া থেকে সম্পূর্ণ অস্ত্রোপচারহীন স্থায়ী মুক্তি।",
      descEn: "Permanent relief from bleeding hemorrhoids, anal fissures, and pain without surgical cutting.",
      badgeBn: "অপারেশনবিহীন আরোগ্য",
      badgeEn: "No Surgery",
      icon: "fa-notes-medical"
    },
    {
      id: "gastric-digestive",
      category: "pain-chronic",
      titleBn: "গ্যাস্ট্রিক ও হজমের সমস্যা",
      titleEn: "Gastric & Digestive Disorders",
      descBn: "বুক জ্বালা, এসিডিটি, আইবিএস (IBS), বদহজম, কোষ্ঠকাঠিন্য ও পেট ফাঁপার মূল কারণ নির্মূল।",
      descEn: "Complete restoration of gastrointestinal health, acidity relief, IBS, and chronic constipation.",
      badgeBn: "স্থায়ী নিরাময়",
      badgeEn: "Permanent",
      icon: "fa-utensils"
    }
  ],

  gallery: [
    {
      src: "assets/images/dr-samsunnahar-sneho.jpg",
      titleBn: "ডাঃ শামসুন্নাহার স্নেহ (রেজিস্টার্ড চিকিৎসক)",
      titleEn: "Dr. Samsunnahar Sneho (Registered Physician)",
      captionBn: "রোগীদের পরম যত্নে চিকিৎসা সেবা প্রদান করছেন",
      captionEn: "Providing compassionate, personalized medical care"
    },
    {
      src: "assets/images/clinic-chamber-1.jpg",
      titleBn: "ডক্টর কনসালটেশন চেম্বার",
      titleEn: "Doctor Consultation Chamber",
      captionBn: "রোগীর শারীরিক ও মানসিক অবস্থা বিশদ শোনার শান্ত পরিবেশ",
      captionEn: "Peaceful consultation room for detailed case analysis"
    },
    {
      src: "assets/images/clinic-waiting-room.jpg",
      titleBn: "রোগী ওয়েটিং লাউঞ্জ / রিসেপশন",
      titleEn: "Patient Waiting Room / Reception",
      captionBn: "পরিচ্ছন্ন ও আরামদায়ক রোগী অপেক্ষাগার",
      captionEn: "Clean, hygienic, and comfortable waiting area"
    },
    {
      src: "assets/images/clinic-chamber-2.jpg",
      titleBn: "প্রেসক্রিপশন ও মেডিসিন ডেস্ক",
      titleEn: "Prescription & Medicine Desk",
      captionBn: "যথাযথ ডায়াগনোসিস ও চিকিৎসা পরামর্শ",
      captionEn: "Precise case study, diagnosis, and prescription"
    },
    {
      src: "assets/images/treatment-services-banner.jpg",
      titleBn: "অফিসিয়াল সেবা তালিকা ব্যানার",
      titleEn: "Official Treatment Services Signboard",
      captionBn: "চেম্বারে প্রদর্শিত সকল রোগের সুচিকিৎসার আনুষ্ঠানিক তালিকা",
      captionEn: "Official listing of specialized treatments at the clinic"
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
      qBn: "কীভাবে অ্যাপয়েন্টমেন্ট বুক করব এবং ফি কত?",
      qEn: "How do I book an appointment and what is the fee?",
      aBn: "আমাদের প্রাথমিক পরামর্শ ফি মাত্র ৫০০ টাকা। আপনি আমাদের ওয়েবসাইটে ৩টি সহজ ধাপে বিকাশ/নগদে ফি দিয়ে ফর্ম পূরণ করে সময় নির্বাচন করতে পারেন অথবা সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করতে পারেন।",
      aEn: "Our consultation fee is BDT 500. You can book in 3 easy steps by paying via bKash/Nagad and submitting the form, or by contacting directly on WhatsApp."
    },
    {
      qBn: "আমি কি দূরবর্তী স্থান থেকে অনলাইনে ভিডিও কনসালটেশন নিতে পারব?",
      qEn: "Can I get online video consultation if I live far away?",
      aBn: "অবশ্যই! দেশের যে কোনো প্রান্ত থেকে কিংবা বিদেশ থেকেও রোগীরা অনলাইনে ভিডিও কলে বিস্তারিত কেস-টেকিং করতে পারেন এবং কুরিয়ারের মাধ্যমে খাঁটি হোমিও ওষুধ গ্রহণ করতে পারেন।",
      aEn: "Yes! Patients from across Bangladesh and abroad can consult via online video call and receive authentic homeopathic medicine delivered via courier."
    },
    {
      qBn: "হোমিওপ্যাথি ওষুধের কোনো পার্শ্বপ্রতিক্রিয়া আছে কি?",
      qEn: "Are there any side effects to homeopathic medicine?",
      aBn: "রেজিস্টার্ড চিকিৎসকের সঠিক মাত্রায় নির্ধারিত খাঁটি হোমিওপ্যাথিক ওষুধ সম্পূর্ণ প্রাকৃতিক, মৃদু এবং কোনো পার্শ্বপ্রতিক্রিয়াহীন। এটি শিশু ও গর্ভবতীদের জন্যও নিরাপদ।",
      aEn: "When prescribed by a qualified registered physician, homeopathic dilutions are completely natural, gentle, and free from toxic side effects."
    },
    {
      qBn: "পিত্ত বা কিডনির পাথরে কি অপারেশন ছাড়া উপকার সম্ভব?",
      qEn: "Is it possible to cure gallstones or kidney stones without surgery?",
      aBn: "অনেক ক্ষেত্রে কিডনি পাথর সম্পূর্ণ মূত্রনালী দিয়ে বের হয়ে যায় এবং পিত্তথলির পাথর ও ইনফেকশন নিয়ন্ত্রণে অপারেশনের ঝুঁকি কমানো সম্ভব হয়। তবে রোগীর অবস্থা ও আল্ট্রাসনোগ্রাম রিপোর্ট দেখে সঠিক পরামর্শ দেওয়া হয়।",
      aEn: "In numerous cases, kidney stones pass painlessly, and gallstones symptoms can be resolved naturally depending on size and medical ultrasonogram reports."
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
      commentBn: "৮ মিমি কিডনি পাথর ছিল, অপারেশনের পরামর্শ দেওয়া হয়েছিল। ডাঃ শামসুন্নাহার আপার ওষুধে মাত্র এক মাসের মধ্যে কোনো ব্যথা ছাড়াই পাথর প্রস্রাবের সাথে বের হয়ে গেছে। আলহামদুলিল্লাহ!",
      commentEn: "Had an 8mm kidney stone and was advised surgery. With Dr. Sneho's medication, the stone passed naturally in one month without any pain. Highly recommended!"
    },
    {
      nameBn: "ফারহানা আক্তার",
      nameEn: "Farhana Akter",
      locationBn: "খুলনা",
      locationEn: "Khulna",
      rating: 5,
      commentBn: "আমার ৫ বছরের ছেলের সর্দি-কাশি ও ক্ষুধামন্দা কিছুতেই যাচ্ছিল না। ম্যাডামের মনোযোগ দিয়ে কথা শোনার ধরণ এবং ওষুধে ছেলে এখন পুরোপুরি সুস্থ ও স্বাস্থ্যবান।",
      commentEn: "My 5-year-old son suffered from recurrent cold and poor appetite. Dr. Sneho's empathetic listening and gentle medicine cured him completely."
    }
  ]
};
