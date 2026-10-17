export interface DistrictItem {
  slug: string;
  nameBn: string;
  nameEn: string;
  divisionBn: string;
  divisionEn: string;
  hubTitle: string;
  upazilas: string[];
  courierTime: string;
  highlight: string;
}

export const districtsData: DistrictItem[] = [
  // --- DHAKA DIVISION (13) ---
  {
    slug: 'dhaka',
    nameBn: 'ঢাকা',
    nameEn: 'Dhaka',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    hubTitle: 'প্রধান চেম্বার ও সমগ্র ঢাকা মহানগরী',
    upazilas: ['মিরপুর', 'উত্তরা', 'ধানমন্ডি', 'গুলশান', 'বনানী', 'মোহাম্মদপুর', 'মতিঝিল', 'পুরান ঢাকা', 'বাড্ডা', 'যাত্রাবাড়ী', 'সাভার', 'কেরানীগঞ্জ'],
    courierTime: '১২ - ২৪ ঘণ্টার মধ্যে এক্সপ্রেস ডেলিভারি',
    highlight: 'চেম্বারে সরাসরি ভিজিট অথবা হোম ডেলিভারি'
  },
  {
    slug: 'gazipur',
    nameBn: 'গাজীপুর',
    nameEn: 'Gazipur',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    hubTitle: 'গাজীপুর সদর, টঙ্গী ও শিল্পাঞ্চল',
    upazilas: ['টঙ্গী', 'গাজীপুর সদর', 'কালিয়াকৈর', 'শ্রীপুর', 'কাপাসিয়া'],
    courierTime: '১২ - ২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    highlight: 'টঙ্গী ও জয়দেবপুর সহ সকল এলাকায় দ্রুত ওষুধ পৌঁছানোর সুবিধা'
  },
  {
    slug: 'narayanganj',
    nameBn: 'নারায়ণগঞ্জ',
    nameEn: 'Narayanganj',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    hubTitle: 'নারায়ণগঞ্জ সদর, বন্দর ও সিদ্ধিরগঞ্জ',
    upazilas: ['নারায়ণগঞ্জ সদর', 'বন্দর', 'রূপগঞ্জ', 'সোনারগাঁও', 'আড়াইহাজার'],
    courierTime: '১২ - ২৪ ঘণ্টার মধ্যে হোম ডেলিভারি',
    highlight: 'রূপগঞ্জ ও সোনারগাঁও সহ সকল এলাকায় নিয়মিত কুরিয়ার সার্ভিস'
  },
  {
    slug: 'tangail',
    nameBn: 'টাঙ্গাইল',
    nameEn: 'Tangail',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    hubTitle: 'টাঙ্গাইল সদর ও সংশ্লিষ্ট উপজেলা',
    upazilas: ['টাঙ্গাইল সদর', 'মির্জাপুর', 'কালিহাতী', 'ঘাটাইল', 'সখিপুর', 'মধুপুর', 'গোপালপুর', 'দেলদুয়ার'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে নিশ্চিত ডেলিভারি',
    highlight: 'মির্জাপুর, মধুপুর ও সখিপুর সহ প্রত্যন্ত অঞ্চলেও ডেলিভারি'
  },
  {
    slug: 'faridpur',
    nameBn: 'ফরিদপুর',
    nameEn: 'Faridpur',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    hubTitle: 'ফরিদপুর সদর ও পদ্মাপাড়ের উপজেলাসমূহ',
    upazilas: ['ফরিদপুর সদর', 'বোয়ালমারী', 'ভাঙ্গা', 'মধুখালী', 'নগরকান্দা', 'আলফাডাঙ্গা', 'সদরপুর'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'ভাঙ্গা ও বোয়ালমারী সহ সব থানায় ওষুধ পাঠানোর সুবিধা'
  },
  {
    slug: 'narsingdi',
    nameBn: 'নরসিংদী',
    nameEn: 'Narsingdi',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    hubTitle: 'নরসিংদী সদর ও মেঘনা তীরবর্তী এলাকা',
    upazilas: ['নরসিংদী সদর', 'পলাশ', 'বেলাবো', 'মনোহরদী', 'রায়পুরা', 'শিবপুর'],
    courierTime: '২৪ ঘণ্টার মধ্যে নিশ্চিত ডেলিভারি',
    highlight: 'পলাশ ও শিবপুর সহ সকল উপজেলার রোগীদের জন্য সহজ কনসালটেশন'
  },
  {
    slug: 'manikganj',
    nameBn: 'মানিকগঞ্জ',
    nameEn: 'Manikganj',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    hubTitle: 'মানিকগঞ্জ সদর ও ধলেশ্বরী তীরবর্তী এলাকা',
    upazilas: ['মানিকগঞ্জ সদর', 'সিংগাইর', 'শিবালয়', 'সাটুরিয়া', 'হরিরামপুর', 'ঘিওড়', 'দৌলতপুর'],
    courierTime: '২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    highlight: 'সিংগাইর ও পাটুরিয়া/শিবালয় সহ সকল থানায় ওষুধ পৌঁছায়'
  },
  {
    slug: 'munshiganj',
    nameBn: 'মুন্সীগঞ্জ',
    nameEn: 'Munshiganj',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    hubTitle: 'মুন্সীগঞ্জ সদর ও বিক্রমপুর অঞ্চল',
    upazilas: ['মুন্সীগঞ্জ সদর', 'শ্রীনগর', 'সিরাজদিখান', 'লৌহজং', 'টংগিবাড়ী', 'গজারিয়া'],
    courierTime: '২৪ ঘণ্টার মধ্যে হোম ডেলিভারি',
    highlight: 'শ্রীনগর ও সিরাজদিখান সহ বিক্রমপুরের যেকোনো প্রান্তে সেবা'
  },
  {
    slug: 'kishoreganj',
    nameBn: 'কিশোরগঞ্জ',
    nameEn: 'Kishoreganj',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    hubTitle: 'কিশোরগঞ্জ সদর ও হাওর অঞ্চল',
    upazilas: ['কিশোরগঞ্জ সদর', 'ভৈরব', 'বাজিতপুর', 'হোসেনপুর', 'করিমগঞ্জ', 'নিকলী', 'কটিয়াদী', 'কুলিয়ারচর'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'ভৈরব জংশন ও বাজিতপুর সহ হাওরাঞ্চলেও কুরিয়ারে নিরাপদ ওষুধ'
  },
  {
    slug: 'gopalganj',
    nameBn: 'গোপালগঞ্জ',
    nameEn: 'Gopalganj',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    hubTitle: 'গোপালগঞ্জ সদর ও মধুমতী এলাকা',
    upazilas: ['গোপালগঞ্জ সদর', 'কাশিয়ানী', 'কোটালীপাড়া', 'মুকসুদপুর', 'টুঙ্গিপাড়া'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'মুকসুদপুর ও কোটালীপাড়া সহ সকল উপজেলায় নিয়মিত ডেলিভারি'
  },
  {
    slug: 'madaripur',
    nameBn: 'মাদারীপুর',
    nameEn: 'Madaripur',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    hubTitle: 'মাদারীপুর সদর ও কুমার নদ তীরবর্তী এলাকা',
    upazilas: ['মাদারীপুর সদর', 'শিবচর', 'কালকিনি', 'রাজৈর', 'ডাসার'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'পদ্মা সেতু সংযোগ ও শিবচর সহ সকল এলাকায় দ্রুত কুরিয়ার'
  },
  {
    slug: 'rajbari',
    nameBn: 'রাজবাড়ী',
    nameEn: 'Rajbari',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    hubTitle: 'রাজবাড়ী সদর ও গোয়ালন্দ ঘাট এলাকা',
    upazilas: ['রাজবাড়ী সদর', 'গোয়ালন্দ', 'পাংশা', 'বালিয়াকান্দি', 'কালুখালী'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'পাংশা ও গোয়ালন্দ সহ সব জায়গায় নিরাপদ জার্মান ওষুধ সরবরাহ'
  },
  {
    slug: 'shariatpur',
    nameBn: 'শরীয়তপুর',
    nameEn: 'Shariatpur',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    hubTitle: 'শরীয়তপুর সদর ও পদ্মাপাড়ের জনপদ',
    upazilas: ['শরীয়তপুর সদর', 'জাজিরা', 'নড়িয়া', 'ভেদরগঞ্জ', 'ডামুড্যা', 'গোসাইরহাট'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'জাজিরা ও নড়িয়া সহ সব উপজেলায় রোগীদের আস্থা'
  },

  // --- CHATTOGRAM DIVISION (11) ---
  {
    slug: 'chattogram',
    nameBn: 'চট্টগ্রাম',
    nameEn: 'Chattogram',
    divisionBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    hubTitle: 'চট্টগ্রাম মহানগরী ও বন্দরনগরীর সকল এলাকা',
    upazilas: ['পাঁচলাইশ', 'আগ্রাবাদ', 'জিইসি', 'হালিশহর', 'হাটহাজারী', 'পটিয়া', 'সীতাকুণ্ড', 'রাউজান', 'ফটিকছড়ি'],
    courierTime: '২৪ ঘণ্টার মধ্যে নিশ্চিত হোম ডেলিভারি',
    highlight: 'বন্দরনগরী চট্টগ্রাম ও সকল উপজেলায় দ্রুততম পার্সেল সার্ভিস'
  },
  {
    slug: 'coxs-bazar',
    nameBn: 'কক্সবাজার',
    nameEn: "Cox's Bazar",
    divisionBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    hubTitle: 'কক্সবাজার সদর ও উপকূলীয় উপজেলাসমূহ',
    upazilas: ['কক্সবাজার সদর', 'চকোরিয়া', 'টেকনাফ', 'উখিয়া', 'মহেশখালী', 'পেকুয়া', 'রামু', 'কুতুবদিয়া'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'চকোরিয়া ও রামু সহ দ্বীপ উপজেলাগুলোতেও হোম ডেলিভারি'
  },
  {
    slug: 'cumilla',
    nameBn: 'কুমিল্লা',
    nameEn: 'Cumilla',
    divisionBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    hubTitle: 'কুমিল্লা মহানগর ও গোমতী তীরবর্তী অঞ্চল',
    upazilas: ['কুমিল্লা আদর্শ সদর', 'লাকসাম', 'দাউদকান্দি', 'চান্দিনা', 'দেবিদ্বার', 'হোমনা', 'বুড়িচং', 'চৌদ্দগ্রাম'],
    courierTime: '২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    highlight: 'দাউদকান্দি ও লাকসাম সহ প্রধান মহাসড়ক সংলগ্ন সব উপজেলায় সহজ সেবা'
  },
  {
    slug: 'brahmanbaria',
    nameBn: 'ব্রাহ্মণবাড়িয়া',
    nameEn: 'Brahmanbaria',
    divisionBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    hubTitle: 'ব্রাহ্মণবাড়িয়া সদর ও তিতাস তীরবর্তী এলাকা',
    upazilas: ['ব্রাহ্মণবাড়িয়া সদর', 'আশুগঞ্জ', 'নবীনগর', 'সরাইল', 'কসবা', 'বাঞ্ছারামপুর', 'নাসিরনগর', 'আখাউড়া'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'আশুগঞ্জ ও নবীনগর সহ সকল উপজেলায় ওষুধ কুরিয়ারের সুবিধা'
  },
  {
    slug: 'feni',
    nameBn: 'ফেনী',
    nameEn: 'Feni',
    divisionBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    hubTitle: 'ফেনী সদর ও পার্শ্ববর্তী এলাকা',
    upazilas: ['ফেনী সদর', 'দাগনভূঞা', 'সোনাগাজী', 'ছাগলনাইয়া', 'পরশুরাম', 'ফুলগাজী'],
    courierTime: '২৪ ঘণ্টার মধ্যে হোম ডেলিভারি',
    highlight: 'দাগনভূঞা ও সোনাগাজী সহ সব এলাকায় রোগী সেবা নিশ্চিত'
  },
  {
    slug: 'noakhali',
    nameBn: 'নোয়াখালী',
    nameEn: 'Noakhali',
    divisionBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    hubTitle: 'নোয়াখালী সদর (মাইজদী) ও উপকূলীয় অঞ্চল',
    upazilas: ['মাইজদী সদর', 'বেগমগঞ্জ', 'চাটখিল', 'সেনবাগ', 'কোম্পানীগঞ্জ', 'হাতিয়া', 'সুবর্ণচর'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'চৌমুহনী ও বেগমগঞ্জ সহ সব উপজেলায় নিয়মিত রোগী সেবা'
  },
  {
    slug: 'lakshmipur',
    nameBn: 'লক্ষ্মীপুর',
    nameEn: 'Lakshmipur',
    divisionBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    hubTitle: 'লক্ষ্মীপুর সদর ও মেঘনা উপকূল',
    upazilas: ['লক্ষ্মীপুর সদর', 'রায়পুর', 'রামগঞ্জ', 'রামগতি', 'কমলনগর'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'রায়পুর ও রামগঞ্জ সহ সব থানায় কুরিয়ার পার্সেল সেবা'
  },
  {
    slug: 'chandpur',
    nameBn: 'চাঁদপুর',
    nameEn: 'Chandpur',
    divisionBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    hubTitle: 'চাঁদপুর সদর ও পদ্মা-মেঘনা মোহনা',
    upazilas: ['চাঁদপুর সদর', 'হাজীগঞ্জ', 'মতলব উত্তর', 'মতলব দক্ষিণ', 'শাহরাস্তি', 'ফরিদগঞ্জ', 'কচুয়া'],
    courierTime: '২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    highlight: 'হাজীগঞ্জ ও মতলব সহ চাঁদপুর জেলার সর্বত্র হোম ডেলিভারি'
  },
  {
    slug: 'bandarban',
    nameBn: 'বান্দরবান',
    nameEn: 'Bandarban',
    divisionBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    hubTitle: 'বান্দরবান সদর ও পাহাড়ি জনপদ',
    upazilas: ['বান্দরবান সদর', 'লামা', 'আলীকদম', 'নাইক্ষ্যংছড়ি', 'রুমা', 'রোয়াংছড়ি', 'থানচি'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'লামা ও আলীকদম সহ পাহাড়ি অঞ্চলেও বিশ্বস্ত কুরিয়ারে ওষুধ'
  },
  {
    slug: 'rangamati',
    nameBn: 'রাঙ্গামাটি',
    nameEn: 'Rangamati',
    divisionBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    hubTitle: 'রাঙ্গামাটি সদর ও কাপ্তাই লেক অঞ্চল',
    upazilas: ['রাঙ্গামাটি সদর', 'কাপ্তাই', 'কাউখালী', 'বাঘাইছড়ি', 'নানিয়ারচর', 'লংগদু', 'জুরাইছড়ি'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'কাপ্তাই ও কাউখালী সহ সকল উপজেলায় ঘরে বসে চিকিৎসা'
  },
  {
    slug: 'khagrachhari',
    nameBn: 'খাগড়াছড়ি',
    nameEn: 'Khagrachhari',
    divisionBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    hubTitle: 'খাগড়াছড়ি সদর ও চেঙ্গী নদী উপত্যকা',
    upazilas: ['খাগড়াছড়ি সদর', 'রামগড়', 'মানিকছড়ি', 'দীঘিনালা', 'মাটিরাঙ্গা', 'পানছড়ি', 'মহালছড়ি'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'মাটিরাঙ্গা ও রামগড় সহ পুরো খাগড়াছড়িতে নির্ভরযোগ্য সেবা'
  },

  // --- RAJSHAHI DIVISION (8) ---
  {
    slug: 'rajshahi',
    nameBn: 'রাজশাহী',
    nameEn: 'Rajshahi',
    divisionBn: 'রাজশাহী',
    divisionEn: 'Rajshahi',
    hubTitle: 'রাজশাহী মহানগরী ও পদ্মাপাড়ের অঞ্চল',
    upazilas: ['বোয়ালিয়া', 'মতিহার', 'রাজপাড়া', 'গোদাগাড়ী', 'বাঘা', 'চারঘাট', 'পুঠিয়া', 'তানোর', 'বাগমারা'],
    courierTime: '২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    highlight: 'পদ্মা বিধৌত রাজশাহী মহানগর ও সব উপজেলায় সর্বোচ্চ চিকিৎসা সেবা'
  },
  {
    slug: 'bogura',
    nameBn: 'বগুড়া',
    nameEn: 'Bogura',
    divisionBn: 'রাজশাহী',
    divisionEn: 'Rajshahi',
    hubTitle: 'বগুড়া সদর ও উত্তরবঙ্গের প্রবেশদ্বার',
    upazilas: ['বগুড়া সদর', 'শেরপুর', 'শাজাহানপুর', 'দুপচাঁচিয়া', 'শিবগঞ্জ', 'আদমদীঘি', 'গাবতলী', 'কাহালু', 'সোনাতলা'],
    courierTime: '২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    highlight: 'শেরপুর ও সান্তাহার সহ বগুড়ার যেকোনো প্রান্তে ওষুধ পৌঁছায়'
  },
  {
    slug: 'pabna',
    nameBn: 'পাবনা',
    nameEn: 'Pabna',
    divisionBn: 'রাজশাহী',
    divisionEn: 'Rajshahi',
    hubTitle: 'পাবনা সদর ও ঈশ্বরদী জংশন এলাকা',
    upazilas: ['পাবনা সদর', 'ঈশ্বরদী', 'সাঁথিয়া', 'সুজানগর', 'বেড়া', 'চাটমোহর', 'ফরিদপুর', 'আটঘরিয়া'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'ঈশ্বরদী ও চাটমোহর সহ সকল উপজেলায় ওষুধ কুরিয়ার সেবা'
  },
  {
    slug: 'sirajganj',
    nameBn: 'সিরাজগঞ্জ',
    nameEn: 'Sirajganj',
    divisionBn: 'রাজশাহী',
    divisionEn: 'Rajshahi',
    hubTitle: 'সিরাজগঞ্জ সদর ও যমুনা তীরবর্তী উপজেলাসমূহ',
    upazilas: ['সিরাজগঞ্জ সদর', 'শাহজাদপুর', 'উল্লাপাড়া', 'বেলকুচি', 'কামারখন্দ', 'রায়গঞ্জ', 'তাড়াশ', 'কাজীপুর'],
    courierTime: '২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    highlight: 'শাহজাদপুর ও উল্লাপাড়া সহ প্রতিটি উপজেলায় সুচিকিৎসা'
  },
  {
    slug: 'naogaon',
    nameBn: 'নওগাঁ',
    nameEn: 'Naogaon',
    divisionBn: 'রাজশাহী',
    divisionEn: 'Rajshahi',
    hubTitle: 'নওগাঁ সদর ও বরেন্দ্র অঞ্চল',
    upazilas: ['নওগাঁ সদর', 'পত্নীতলা', 'মহাদেবপুর', 'মান্দা', 'ধামইরহাট', 'রানীনগর', 'আত্রাই', 'বদলগাছী', 'সাপাহার'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'পত্নীতলা ও মহাদেবপুর সহ বরেন্দ্র ভূমির সর্বত্র ডেলিভারি'
  },
  {
    slug: 'natore',
    nameBn: 'নাটোর',
    nameEn: 'Natore',
    divisionBn: 'রাজশাহী',
    divisionEn: 'Rajshahi',
    hubTitle: 'নাটোর সদর ও চলনবিল এলাকা',
    upazilas: ['নাটোর সদর', 'সিংড়া', 'বড়াইগ্রাম', 'গুরুদাসপুর', 'লালপুর', 'বাগাতিপাড়া', 'নলডাঙ্গা'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'সিংড়া ও চলনবিল অঞ্চল সহ পুরো নাটোরে কুরিয়ার সেবা'
  },
  {
    slug: 'chapainawabganj',
    nameBn: 'চাঁপাইনবাবগঞ্জ',
    nameEn: 'Chapainawabganj',
    divisionBn: 'রাজশাহী',
    divisionEn: 'Rajshahi',
    hubTitle: 'চাঁপাইনবাবগঞ্জ সদর ও শিবগঞ্জ এলাকা',
    upazilas: ['চাঁপাইনবাবগঞ্জ সদর', 'শিবগঞ্জ', 'গোমস্তাপুর', 'নাচোল', 'ভোলাহাট'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'রহনপুর ও শিবগঞ্জ সহ সকল থানার রোগীদের সহজ সেবা'
  },
  {
    slug: 'joypurhat',
    nameBn: 'জয়পুরহাট',
    nameEn: 'Joypurhat',
    divisionBn: 'রাজশাহী',
    divisionEn: 'Rajshahi',
    hubTitle: 'জয়পুরহাট সদর ও ছোট যমুনা তীরবর্তী এলাকা',
    upazilas: ['জয়পুরহাট সদর', 'পাঁচবিবি', 'কালাই', 'ক্ষেতলাল', 'আক্কেলপুর'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'পাঁচবিবি ও আক্কেলপুর সহ জয়পুরহাটের সব উপজেলায় চিকিৎসা'
  },

  // --- KHULNA DIVISION (10) ---
  {
    slug: 'khulna',
    nameBn: 'খুলনা',
    nameEn: 'Khulna',
    divisionBn: 'খুলনা',
    divisionEn: 'Khulna',
    hubTitle: 'খুলনা মহানগর ও রূপসা তীরবর্তী অঞ্চল',
    upazilas: ['খালিশপুর', 'সোনাডাঙ্গা', 'দৌলতপুর', 'রূপসা', 'ডুমুরিয়া', 'বটিয়াঘাটা', 'পাইকগাছা', 'কয়রা', 'তেরখাদা'],
    courierTime: '২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    highlight: 'রূপসা ও ডুমুরিয়া সহ খুলনা মেট্রোপলিটনে এক্সপ্রেস ডেলিভারি'
  },
  {
    slug: 'jashore',
    nameBn: 'যশোর',
    nameEn: 'Jashore',
    divisionBn: 'খুলনা',
    divisionEn: 'Khulna',
    hubTitle: 'যশোর সদর ও ভৈরব তীরবর্তী এলাকা',
    upazilas: ['যশোর সদর', 'ঝিকরগাছা', 'শার্শা', 'মনিরামপুর', 'কেশবপুর', 'বাঘারপাড়া', 'অভয়নগর', 'চৌগাছা'],
    courierTime: '২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    highlight: 'নওয়াপাড়া ও বেনাপোল/শার্শা সহ পুরো যশোরে কুরিয়ার সুবিধা'
  },
  {
    slug: 'kushtia',
    nameBn: 'কুষ্টিয়া',
    nameEn: 'Kushtia',
    divisionBn: 'খুলনা',
    divisionEn: 'Khulna',
    hubTitle: 'কুষ্টিয়া সদর ও গড়াই তীরবর্তী এলাকা',
    upazilas: ['কুষ্টিয়া সদর', 'কুমারখালী', 'ভেড়ামারা', 'মিরপুর', 'দৌলতপুর', 'খোকসা'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'কুমারখালী ও ভেড়ামারা সহ কুষ্টিয়ার সব উপজেলায় সেবা'
  },
  {
    slug: 'jhenaidah',
    nameBn: 'ঝিনাইদহ',
    nameEn: 'Jhenaidah',
    divisionBn: 'খুলনা',
    divisionEn: 'Khulna',
    hubTitle: 'ঝিনাইদহ সদর ও নবগঙ্গা তীরবর্তী জনপদ',
    upazilas: ['ঝিনাইদহ সদর', 'কালীগঞ্জ', 'শৈলকুপা', 'কোটচাঁদপুর', 'মহেশপুর', 'হরিণাকুণ্ডু'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'কালীগঞ্জ ও শৈলকুপা সহ সকল উপজেলার রোগীদের জন্য নির্ভরযোগ্য'
  },
  {
    slug: 'satkhira',
    nameBn: 'সাতক্ষীরা',
    nameEn: 'Satkhira',
    divisionBn: 'খুলনা',
    divisionEn: 'Khulna',
    hubTitle: 'সাতক্ষীরা সদর ও সুন্দরবন সন্নিহিত এলাকা',
    upazilas: ['সাতক্ষীরা সদর', 'কলারোয়া', 'তালা', 'কালীগঞ্জ', 'শ্যামনগর', 'আশাশুনি', 'দেবহাটা'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'শ্যামনগর ও কলারোয়া সহ উপকূলীয় অঞ্চলেও নিরাপদ ওষুধ'
  },
  {
    slug: 'bagerhat',
    nameBn: 'বাগেরহাট',
    nameEn: 'Bagerhat',
    divisionBn: 'খুলনা',
    divisionEn: 'Khulna',
    hubTitle: 'বাগেরহাট সদর ও মোংলা বন্দর অঞ্চল',
    upazilas: ['বাগেরহাট সদর', 'মোংলা', 'ফকিরহাট', 'চিতলমারী', 'কচুয়া', 'মোল্লাহাট', 'রামপাল', 'শরণখোলা'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'মোংলা ও শরণখোলা সহ সব উপজেলায় দ্রুত ওষুধ পাঠানোর ব্যবস্থা'
  },
  {
    slug: 'chuadanga',
    nameBn: 'চুয়াডাঙ্গা',
    nameEn: 'Chuadanga',
    divisionBn: 'খুলনা',
    divisionEn: 'Khulna',
    hubTitle: 'চুয়াডাঙ্গা সদর ও মাথাভাঙ্গা তীরবর্তী এলাকা',
    upazilas: ['চুয়াডাঙ্গা সদর', 'আলমডাঙ্গা', 'দামুড়হুদা', 'জীবননগর'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'আলমডাঙ্গা ও দর্শনা/দামুড়হুদা সহ সব জায়গায় সেবা'
  },
  {
    slug: 'meherpur',
    nameBn: 'মেহেরপুর',
    nameEn: 'Meherpur',
    divisionBn: 'খুলনা',
    divisionEn: 'Khulna',
    hubTitle: 'মেহেরপুর সদর ও ঐতিহাসিক মুজিবনগর',
    upazilas: ['মেহেরপুর সদর', 'গাংনী', 'মুজিবনগর'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'গাংনী ও মুজিবনগর সহ সকল এলাকায় কুরিয়ার পার্সেল'
  },
  {
    slug: 'narail',
    nameBn: 'নড়াইল',
    nameEn: 'Narail',
    divisionBn: 'খুলনা',
    divisionEn: 'Khulna',
    hubTitle: 'নড়াইল সদর ও চিত্রা নদী বিধৌত এলাকা',
    upazilas: ['নড়াইল সদর', 'লোহাগড়া', 'কালিয়া'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'লোহাগড়া ও কালিয়া সহ নড়াইলের প্রতিটি অঞ্চলে সেবা'
  },
  {
    slug: 'magura',
    nameBn: 'মাগুরা',
    nameEn: 'Magura',
    divisionBn: 'খুলনা',
    divisionEn: 'Khulna',
    hubTitle: 'মাগুরা সদর ও মধুমতী তীরবর্তী অঞ্চল',
    upazilas: ['মাগুরা সদর', 'শ্রীপুর', 'মহম্মদপুর', 'শালিখা'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'শ্রীপুর ও মহম্মদপুর সহ সকল থানায় কুরিয়ার সেবা'
  },

  // --- BARISHAL DIVISION (6) ---
  {
    slug: 'barishal',
    nameBn: 'বরিশাল',
    nameEn: 'Barishal',
    divisionBn: 'বরিশাল',
    divisionEn: 'Barishal',
    hubTitle: 'বরিশাল মহানগর ও কীর্তনখোলা তীরবর্তী অঞ্চল',
    upazilas: ['কোতোয়ালী সদর', 'বাবুগঞ্জ', 'উজিরপুর', 'গৌরনদী', 'বাকেরগঞ্জ', 'বানারীপাড়া', 'মুলাদী', 'মেহেন্দিগঞ্জ', 'হিজলা'],
    courierTime: '২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    highlight: 'গৌরনদী ও বাকেরগঞ্জ সহ বরিশাল বিভাগের প্রাণকেন্দ্রে সেবা'
  },
  {
    slug: 'patuakhali',
    nameBn: 'পটুয়াখালী',
    nameEn: 'Patuakhali',
    divisionBn: 'বরিশাল',
    divisionEn: 'Barishal',
    hubTitle: 'পটুয়াখালী সদর ও কুয়াকাটা উপকূল',
    upazilas: ['পটুয়াখালী সদর', 'কলাপাড়া (কুয়াকাটা)', 'গলাচিপা', 'বাউফল', 'দশমিনা', 'মির্জাগঞ্জ', 'দুমকি', 'রাঙ্গাবালী'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'কুয়াকাটা ও বাউফল সহ উপকূলীয় এলাকার জন্য অনলাইন সুচিকিৎসা'
  },
  {
    slug: 'bhola',
    nameBn: 'ভোলা',
    nameEn: 'Bhola',
    divisionBn: 'বরিশাল',
    divisionEn: 'Barishal',
    hubTitle: 'ভোলা সদর ও দ্বীপ জেলা',
    upazilas: ['ভোলা সদর', 'বোরহানউদ্দিন', 'দৌলতখান', 'লালমোহন', 'চরফ্যাশন', 'তজুমদ্দিন', 'মনপুরা'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'চরফ্যাশন ও লালমোহন সহ দ্বীপের সকল প্রান্তে ওষুধ পৌঁছানোর ব্যবস্থা'
  },
  {
    slug: 'pirojpur',
    nameBn: 'পিরোজপুর',
    nameEn: 'Pirojpur',
    divisionBn: 'বরিশাল',
    divisionEn: 'Barishal',
    hubTitle: 'পিরোজপুর সদর ও বলেশ্বর বিধৌত এলাকা',
    upazilas: ['পিরোজপুর সদর', 'স্বরূপকাঠি (নেছারাবাদ)', 'ভাণ্ডারিয়া', 'মঠবাড়িয়া', 'নাজিরপুর', 'কাউখালী', 'ইন্দুরকানী'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'মঠবাড়িয়া ও স্বরূপকাঠি সহ সব উপজেলায় নিরাপদ ডেলিভারি'
  },
  {
    slug: 'barguna',
    nameBn: 'বরগুনা',
    nameEn: 'Barguna',
    divisionBn: 'বরিশাল',
    divisionEn: 'Barishal',
    hubTitle: 'বরগুনা সদর ও পায়রা নদী তীরবর্তী এলাকা',
    upazilas: ['বরগুনা সদর', 'আমতলী', 'পাথরঘাটা', 'বেতাগী', 'বামনা', 'তালতলী'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'পাথরঘাটা ও আমতলী সহ সমগ্র বরগুনায় নির্ভরযোগ্য হোমিওপ্যাথি'
  },
  {
    slug: 'jhalokati',
    nameBn: 'ঝালকাঠি',
    nameEn: 'Jhalokati',
    divisionBn: 'বরিশাল',
    divisionEn: 'Barishal',
    hubTitle: 'ঝালকাঠি সদর ও সুগন্ধা বিধৌত অঞ্চল',
    upazilas: ['ঝালকাঠি সদর', 'নলছিটি', 'রাজাপুর', 'কাঁঠালিয়া'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'নলছিটি ও রাজাপুর সহ সব থানায় কুরিয়ার সেবা'
  },

  // --- SYLHET DIVISION (4) ---
  {
    slug: 'sylhet',
    nameBn: 'সিলেট',
    nameEn: 'Sylhet',
    divisionBn: 'সিলেট',
    divisionEn: 'Sylhet',
    hubTitle: 'সিলেট মহানগর ও সুরমা তীরবর্তী অঞ্চল',
    upazilas: ['কোতোয়ালী', 'জিন্দাবাজার', 'আম্বরখানা', 'বিয়ানীবাজার', 'গোলাপগঞ্জ', 'বিশ্বনাথ', 'ওসমানীনগর', 'বালাগঞ্জ', 'জৈন্তাপুর', 'কানাইঘাট'],
    courierTime: '২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    highlight: 'সিলেট মহানগর ও প্রবাসী পরিবারবর্গের জন্য বিশেষজ্ঞ হোমিওপ্যাথি'
  },
  {
    slug: 'moulvibazar',
    nameBn: 'মৌলভীবাজার',
    nameEn: 'Moulvibazar',
    divisionBn: 'সিলেট',
    divisionEn: 'Sylhet',
    hubTitle: 'মৌলভীবাজার সদর ও শ্রীমঙ্গল চা-বাগান অঞ্চল',
    upazilas: ['মৌলভীবাজার সদর', 'শ্রীমঙ্গল', 'কুলাউড়া', 'বড়লেখা', 'কমলগঞ্জ', 'রাজনগর', 'জুড়ী'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'শ্রীমঙ্গল ও কুলাউড়া সহ সব উপজেলায় সরাসরি জার্মান ওষুধ'
  },
  {
    slug: 'habiganj',
    nameBn: 'হবিগঞ্জ',
    nameEn: 'Habiganj',
    divisionBn: 'সিলেট',
    divisionEn: 'Sylhet',
    hubTitle: 'হবিগঞ্জ সদর ও খোয়াই তীরবর্তী অঞ্চল',
    upazilas: ['হবিগঞ্জ সদর', 'মাধবপুর', 'চুনারুঘাট', 'নবীগঞ্জ', 'বাহুবল', 'বানিয়াচং', 'আজমিরীগঞ্জ', 'লাখাই'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'নবীগঞ্জ ও বানিয়াচং সহ জেলার সর্বত্র অনলাইন কনসালটেশন'
  },
  {
    slug: 'sunamganj',
    nameBn: 'সুনামগঞ্জ',
    nameEn: 'Sunamganj',
    divisionBn: 'সিলেট',
    divisionEn: 'Sylhet',
    hubTitle: 'সুনামগঞ্জ সদর ও হাওর জনপদ',
    upazilas: ['সুনামগঞ্জ সদর', 'ছাতক', 'জগন্নাথপুর', 'তাহিরপুর', 'দিরাই', 'ধর্মপাশা', 'শাল্লা', 'বিশ্বম্ভরপুর'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'ছাতক ও জগন্নাথপুর সহ হাওরাঞ্চলের রোগীদের ঘরে পৌঁছে ওষুধ'
  },

  // --- RANGPUR DIVISION (8) ---
  {
    slug: 'rangpur',
    nameBn: 'রংপুর',
    nameEn: 'Rangpur',
    divisionBn: 'রংপুর',
    divisionEn: 'Rangpur',
    hubTitle: 'রংপুর সিটি কর্পোরেশন ও উত্তরবঙ্গের কেন্দ্রবিন্দু',
    upazilas: ['কোতোয়ালী সদর', 'মিঠাপুকুর', 'পীরগঞ্জ', 'বদরগঞ্জ', 'তারাগঞ্জ', 'গঙ্গাচড়া', 'কাউনিয়া', 'পীরগাছা'],
    courierTime: '২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    highlight: 'রংপুর সিটি কর্পোরেশন ও সকল উপজেলায় নির্ভরযোগ্য চিকিৎসা'
  },
  {
    slug: 'dinajpur',
    nameBn: 'দিনাজপুর',
    nameEn: 'Dinajpur',
    divisionBn: 'রংপুর',
    divisionEn: 'Rangpur',
    hubTitle: 'দিনাজপুর সদর ও পুনর্ভবা তীরবর্তী এলাকা',
    upazilas: ['দিনাজপুর সদর', 'বীরগঞ্জ', 'পার্বতীপুর', 'ফুলবাড়ী', 'বিরামপুর', 'হাকিমপুর (হিলি)', 'বোচাগঞ্জ', 'কাহারোল', 'চিরিরবন্দর'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'পার্বতীপুর ও বিরামপুর সহ সকল থানায় নিয়মিত কুরিয়ার সার্ভিস'
  },
  {
    slug: 'gaibandha',
    nameBn: 'গাইবান্ধা',
    nameEn: 'Gaibandha',
    divisionBn: 'রংপুর',
    divisionEn: 'Rangpur',
    hubTitle: 'গাইবান্ধা সদর ও তিস্তা-ব্রহ্মপুত্র তীরবর্তী অঞ্চল',
    upazilas: ['গাইবান্ধা সদর', 'গোবিন্দগঞ্জ', 'পলাশবাড়ী', 'সাদুল্লাপুর', 'সুন্দরগঞ্জ', 'সাঘাটা', 'ফুলছড়ি'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'গোবিন্দগঞ্জ ও পলাশবাড়ী সহ সব উপজেলায় রোগী সেবা'
  },
  {
    slug: 'kurigram',
    nameBn: 'কুড়িগ্রাম',
    nameEn: 'Kurigram',
    divisionBn: 'রংপুর',
    divisionEn: 'Rangpur',
    hubTitle: 'কুড়িগ্রাম সদর ও ধরলা তীরবর্তী অঞ্চল',
    upazilas: ['কুড়িগ্রাম সদর', 'উলিপুর', 'নাগেশ্বরী', 'ভুরুঙ্গামারী', 'চিলমারী', 'রৌমারী', 'রাজিবপুর'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'উলিপুর ও নাগেশ্বরী সহ সীমান্তবর্তী উপজেলায় নিশ্চিত ওষুধ প্রাপ্যতা'
  },
  {
    slug: 'lalmonirhat',
    nameBn: 'লালমনিরহাট',
    nameEn: 'Lalmonirhat',
    divisionBn: 'রংপুর',
    divisionEn: 'Rangpur',
    hubTitle: 'লালমনিরহাট সদর ও তিস্তা ব্যারেজ এলাকা',
    upazilas: ['লালমনিরহাট সদর', 'পাটগ্রাম (বুড়িমারী)', 'হাতীবান্ধা', 'কালীগঞ্জ', 'আদিতমারী'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'পাটগ্রাম ও হাতীবান্ধা সহ প্রতিটি থানায় পার্সেল সার্ভিস'
  },
  {
    slug: 'nilphamari',
    nameBn: 'নীলফামারী',
    nameEn: 'Nilphamari',
    divisionBn: 'রংপুর',
    divisionEn: 'Rangpur',
    hubTitle: 'নীলফামারী সদর ও সৈয়দপুর বিমানবন্দর এলাকা',
    upazilas: ['নীলফামারী সদর', 'সৈয়দপুর', 'ডোমার', 'ডিমলা', 'জলঢাকা', 'কিশোরগঞ্জ'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'সৈয়দপুর রেলওয়ে সিটি ও জলঢাকা সহ সব এলাকায় দ্রুত ডেলিভারি'
  },
  {
    slug: 'panchagarh',
    nameBn: 'পঞ্চগড়',
    nameEn: 'Panchagarh',
    divisionBn: 'রংপুর',
    divisionEn: 'Rangpur',
    hubTitle: 'পঞ্চগড় সদর ও দেশের সর্ব উত্তরের জেলা',
    upazilas: ['পঞ্চগড় সদর', 'তেঁতুলিয়া (বাংলাবান্ধা)', 'বোদা', 'দেবীগঞ্জ', 'আটোয়ারী'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'তেঁতুলিয়া থেকে বোদা পর্যন্ত ঘরে বসেই সম্পূর্ণ চিকিৎসা'
  },
  {
    slug: 'thakurgaon',
    nameBn: 'ঠাকুরগাঁও',
    nameEn: 'Thakurgaon',
    divisionBn: 'রংপুর',
    divisionEn: 'Rangpur',
    hubTitle: 'ঠাকুরগাঁও সদর ও টাঙ্গন নদী তীরবর্তী এলাকা',
    upazilas: ['ঠাকুরগাঁও সদর', 'পীরগঞ্জ', 'বালিয়াডাঙ্গী', 'রানীশংকৈল', 'হরিপুর'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'পীরগঞ্জ ও রানীশংকৈল সহ পুরো ঠাকুরগাঁওয়ে নিরাপদ ওষুধ কুরিয়ার'
  },

  // --- MYMENSINGH DIVISION (4) ---
  {
    slug: 'mymensingh',
    nameBn: 'ময়মনসিংহ',
    nameEn: 'Mymensingh',
    divisionBn: 'ময়মনসিংহ',
    divisionEn: 'Mymensingh',
    hubTitle: 'ময়মনসিংহ মহানগর ও ব্রহ্মপুত্র তীরবর্তী অঞ্চল',
    upazilas: ['কোতোয়ালী সদর', 'মুক্তাগাছা', 'ত্রিশাল', 'ভালুকা', 'গফরগাঁও', 'ঈশ্বরগঞ্জ', 'নান্দাইল', 'ফুলপুর', 'হালুয়াঘাট'],
    courierTime: '২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    highlight: 'ভালুকা ও ত্রিশাল সহ ময়মনসিংহ বিভাগের সর্বস্তরের রোগীদের আস্থা'
  },
  {
    slug: 'jamalpur',
    nameBn: 'জামালপুর',
    nameEn: 'Jamalpur',
    divisionBn: 'ময়মনসিংহ',
    divisionEn: 'Mymensingh',
    hubTitle: 'জামালপুর সদর ও ব্রহ্মপুত্র উপত্যকা',
    upazilas: ['জামালপুর সদর', 'সরিষাবাড়ী', 'মেলান্দহ', 'ইসলামপুর', 'দেওয়ানগঞ্জ', 'মাদারগঞ্জ', 'বকশীগঞ্জ'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'সরিষাবাড়ী ও ইসলামপুর সহ সকল উপজেলার রোগীদের জন্য সেবা'
  },
  {
    slug: 'netrokona',
    nameBn: 'নেত্রকোণা',
    nameEn: 'Netrokona',
    divisionBn: 'ময়মনসিংহ',
    divisionEn: 'Mymensingh',
    hubTitle: 'নেত্রকোণা সদর ও কংস-সোমেশ্বরী তীরবর্তী অঞ্চল',
    upazilas: ['নেত্রকোণা সদর', 'দুর্গাপুর', 'কলমাকান্দা', 'কেন্দুয়া', 'মদন', 'মোহনগঞ্জ', 'পূর্বধলা', 'বারহাট্টা'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'দুর্গাপুর ও মোহনগঞ্জ সহ হাওর সন্নিহিত অঞ্চলের রোগীদের সহজ চিকিৎসা'
  },
  {
    slug: 'sherpur',
    nameBn: 'শেরপুর',
    nameEn: 'Sherpur',
    divisionBn: 'ময়মনসিংহ',
    divisionEn: 'Mymensingh',
    hubTitle: 'শেরপুর সদর ও গারো পাহাড়ের পাদদেশ',
    upazilas: ['শেরপুর সদর', 'নকলা', 'নালিতাবাড়ী', 'ঝিনাইগাতী', 'শ্রীবরদী'],
    courierTime: '২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    highlight: 'নালিতাবাড়ী ও নকলা সহ পাহাড়ি সীমান্ত অঞ্চলের রোগীদের নিয়মিত সেবা'
  }
];
