const fs = require('fs');
const path = require('path');

// All 64 Districts of Bangladesh across 8 Divisions
const districtsData = [
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

// Verify we have exactly 64 districts
console.log(`Total districts registered: ${districtsData.length}`);
if (districtsData.length !== 64) {
  console.error(`Warning: Expected 64 districts, found ${districtsData.length}`);
}

const ZILLA_DIR = path.join(__dirname, '..', 'zilla');
if (!fs.existsSync(ZILLA_DIR)) {
  fs.mkdirSync(ZILLA_DIR, { recursive: true });
}

// Function to generate individual district page
function generateDistrictHtml(d) {
  const upazilaPills = d.upazilas.map(u => `<span class="upazila-pill"><i class="fa-solid fa-location-dot"></i> ${u}</span>`).join('\n              ');
  const upazilaKeywords = d.upazilas.join(', ');
  const upazilaTextBn = d.upazilas.slice(0, 5).join('、 ') + ' সহ সকল উপজেলা';

  return `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title>${d.nameBn}-তে সেরা হোমিও ডাক্তার | ডাঃ শামসুন্নাহার স্নেহ (DHMS) - হাসিনা হোমিও কিউর</title>

  <!-- SEO & Geo Meta Tags -->
  <meta name="description" content="${d.nameBn} (${d.nameEn}) ও এর সকল উপজেলা (${upazilaTextBn}) এর রোগীদের জন্য অভিজ্ঞ রেজিস্টার্ড চিকিৎসক ডাঃ শামসুন্নাহার স্নেহ (DHMS, রেজিঃ ৩৮২৭৫)-এর বিশ্বস্ত অনলাইন হোমিওপ্যাথি চিকিৎসা। ২৪-৪৮ ঘণ্টায় সুন্দরবন ও এসএ পরিবহনে অরিজিনাল জার্মান ওষুধ ডেলিভারি। কল: 01721515546।" />
  <meta name="keywords" content="${d.nameBn} হোমিও ডাক্তার, ${d.nameEn} homeo doctor, best homeopathic doctor in ${d.nameEn}, ${d.nameBn}-তে ভালো হোমিও ডাক্তার, ${d.nameBn} মহিলা হোমিও ডাক্তার, হাসিনা হোমিও কিউর ${d.nameBn}, ${upazilaKeywords}, হোমিওপ্যাথি চিকিৎসা ${d.nameBn}, PCOS চিকিৎসা ${d.nameBn}, বন্ধ্যাত্ব ডাক্তার ${d.nameBn}, পিত্ত পাথর হোমিও ${d.nameBn}" />
  <meta name="author" content="Hasina Homeo Cure" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="https://hasinahomeocure.com/zilla/${d.slug}.html" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${d.nameBn}-তে সেরা হোমিও ডাক্তার | ডাঃ শামসুন্নাহার স্নেহ - হাসিনা হোমিও কিউর" />
  <meta property="og:description" content="${d.nameBn} জেলার রোগীদের জন্য অভিজ্ঞ রেজিস্টার্ড নারী হোমিও চিকিৎসক ডাঃ শামসুন্নাহার স্নেহ'র বিশ্বস্ত অনলাইন চিকিৎসা ও কুরিয়ারে জার্মান ওষুধ।" />
  <meta property="og:url" content="https://hasinahomeocure.com/zilla/${d.slug}.html" />
  <meta property="og:image" content="../assets/images/dr-samsunnahar-sneho.jpg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${d.nameBn}-তে সেরা হোমিও ডাক্তার | ডাঃ শামসুন্নাহার স্নেহ" />
  <meta name="twitter:description" content="${d.nameBn} ও আশপাশের সকল উপজেলার রোগীদের জন্য নির্ভরযোগ্য হোমিওপ্যাথি চিকিৎসা ও হোম ডেলিভারি।" />
  <meta name="twitter:image" content="../assets/images/dr-samsunnahar-sneho.jpg" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%230d7a57'/><path d='M50 20 L50 80 M20 50 L80 50' stroke='%23ffffff' stroke-width='12' stroke-linecap='round'/></svg>" />

  <!-- Google Fonts: Hind Siliguri + Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Font Awesome 6 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="../assets/css/style.css" />

  <!-- Structured Data: MedicalClinic + Physician + BreadcrumbList + FAQPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://hasinahomeocure.com/#clinic",
        "name": "Hasina Homeo Cure - ${d.nameEn} Branch / Online Service",
        "alternateName": "হাসিনা হোমিও কিউর (${d.nameBn} সেবা)",
        "url": "https://hasinahomeocure.com/zilla/${d.slug}.html",
        "telephone": "+8801721515546",
        "priceRange": "৳ ৫০০",
        "image": "https://hasinahomeocure.com/assets/images/dr-samsunnahar-sneho.jpg",
        "medicalSpecialty": [
          "Homeopathy",
          "Gynecological",
          "Pediatric",
          "Dermatology",
          "Gastroenterology"
        ],
        "areaServed": [
          {
            "@type": "AdministrativeArea",
            "name": "${d.nameEn}",
            "alternateName": "${d.nameBn}"
          },
          {
            "@type": "Country",
            "name": "Bangladesh"
          }
        ],
        "physician": {
          "@type": "Physician",
          "@id": "https://hasinahomeocure.com/#doctor",
          "name": "Dr. Samsunnahar Sneho",
          "alternateName": "ডাঃ শামসুন্নাহার স্নেহ",
          "medicalSpecialty": "Classical Homeopathy, Mind Method Case-Taking",
          "alumniOf": "Bangladesh Homoeopathic Board Dhaka",
          "identifier": "DHMS Reg. 38275"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "হোম (Home)",
            "item": "https://hasinahomeocure.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "৬৪ জেলা সেবা (Districts)",
            "item": "https://hasinahomeocure.com/districts.html"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "${d.nameBn} (${d.nameEn})",
            "item": "https://hasinahomeocure.com/zilla/${d.slug}.html"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "${d.nameBn} জেলা থেকে কীভাবে ডাঃ শামসুন্নাহার স্নেহ'র পরামর্শ নেওয়া যায়?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${d.nameBn} ও এর যেকোনো উপজেলা থেকে আপনি সরাসরি হোয়াটসঅ্যাপ কল অথবা ভিডিও কলের মাধ্যমে চেম্বারের মতোই বিস্তারিত কেস-টেকিং দিয়ে পরামর্শ নিতে পারেন। ফি বিকাশ/নগদে পরিশোধের পর প্রেসক্রিপশন প্রদান করা হয়।"
            }
          },
          {
            "@type": "Question",
            "name": "${d.nameBn} জেলায় ওষুধ পৌঁছাতে কত সময় লাগে?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "সাধারণত ${d.courierTime} এর মধ্যে সুন্দরবন কুরিয়ার, এসএ পরিবহন বা স্টিডফাস্ট কুরিয়ারের মাধ্যমে ${d.nameBn} জেলা শহর ও সকল উপজেলা সদরে অরিজিনাল জার্মান সিলপ্যাক ওষুধ পৌঁছে দেওয়া হয়।"
            }
          },
          {
            "@type": "Question",
            "name": "হাসিনা হোমিও কিউরে পরামর্শ ফি কত?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ডাঃ শামসুন্নাহার স্নেহ (DHMS, গভঃ রেজিঃ ৩৮২৭৫)-এর অফিসিয়াল পরামর্শ ফি মাত্র ৫০০ টাকা। এই ফিতে রোগীর শারীরিক ও মানসিক লক্ষণাবলীর গভীর কেস-টেকিং করা হয়।"
            }
          },
          {
            "@type": "Question",
            "name": "নারী রোগীদের ক্ষেত্রে গোপনীয়তা ও আলাদাভাবে কথা বলার সুযোগ আছে কি?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "হ্যাঁ, ডাঃ শামসুন্নাহার স্নেহ একজন অভিজ্ঞ নারী রেজিস্টার্ড চিকিৎসক হওয়ায় মা-বোনরা তাদের অত্যন্ত ব্যক্তিগত ও গোপন সমস্যাগুলো (যেমন PCOS, সাদাস্রাব, বন্ধ্যাত্ব, স্তন টিউমার ইত্যাদি) সম্পূর্ণ সংকোচহীনভাবে ও গোপনীয়তার সাথে বলতে পারেন।"
            }
          }
        ]
      }
    ]
  }
  </script>

  <style>
    /* Page-specific local SEO styles */
    .zilla-hero {
      padding: 130px 0 50px;
      background: linear-gradient(135deg, #f0fdf4 0%, #e6f7ef 50%, #ffffff 100%);
      position: relative;
      overflow: hidden;
    }
    .breadcrumb-nav {
      font-size: 0.85rem;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--slate);
      flex-wrap: wrap;
    }
    .breadcrumb-nav a {
      color: var(--primary);
      text-decoration: none;
      font-weight: 600;
    }
    .breadcrumb-nav a:hover {
      text-decoration: underline;
    }
    .zilla-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(13, 122, 87, 0.12);
      color: var(--primary);
      padding: 0.35rem 0.9rem;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 700;
      margin-bottom: 1rem;
      border: 1px solid rgba(13, 122, 87, 0.25);
    }
    .zilla-title {
      font-size: 2.35rem;
      font-weight: 800;
      line-height: 1.25;
      color: var(--dark);
      margin-bottom: 1rem;
    }
    .zilla-title span {
      color: var(--primary);
    }
    .zilla-lead {
      font-size: 1.1rem;
      color: var(--slate);
      line-height: 1.7;
      margin-bottom: 1.75rem;
      max-width: 680px;
    }
    .courier-box {
      background: #ffffff;
      border: 2px dashed #10b981;
      border-radius: 14px;
      padding: 1.25rem 1.5rem;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 1.25rem;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.08);
    }
    .courier-box-icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      background: #ecfdf5;
      color: #059669;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      flex-shrink: 0;
    }
    .upazila-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-top: 0.85rem;
    }
    .upazila-pill {
      background: #f1f5f9;
      color: #334155;
      padding: 0.35rem 0.85rem;
      border-radius: 8px;
      font-size: 0.88rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      border: 1px solid #e2e8f0;
      transition: all 0.2s ease;
    }
    .upazila-pill:hover {
      background: #e2e8f0;
      color: var(--primary);
      border-color: var(--primary);
    }
    .upazila-pill i {
      color: var(--primary);
      font-size: 0.75rem;
    }
    .feature-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.25rem;
      margin: 2rem 0;
    }
    .feature-card {
      background: #ffffff;
      padding: 1.5rem;
      border-radius: 16px;
      border: 1px solid var(--border);
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .feature-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(13, 122, 87, 0.08);
    }
    .feature-card-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: #dcfce7;
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
    .steps-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.25rem;
      margin: 2rem 0;
    }
    .step-item {
      background: #ffffff;
      padding: 1.5rem;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      position: relative;
    }
    .step-num {
      position: absolute;
      top: -12px;
      left: 16px;
      background: var(--primary);
      color: #ffffff;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.85rem;
    }
    .other-districts-bar {
      background: #f8fafc;
      padding: 1.5rem;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      margin-top: 2rem;
    }
    @media (max-width: 768px) {
      .zilla-hero {
        padding: 105px 0 35px;
      }
      .zilla-title {
        font-size: 1.75rem;
      }
      .courier-box {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  </style>
</head>
<body>

  <!-- Top Announcement Bar -->
  <aside class="top-bar">
    <div class="container top-bar-inner">
      <div class="top-bar-item">
        <span class="badge-reg"><i class="fa-solid fa-certificate"></i> গভঃ রেজিঃ ৩৮২৭৫</span>
        <span>বাংলাদেশ হোমিওপ্যাথিক বোর্ড অনুমোদিত</span>
      </div>
      <div class="top-bar-item">
        <i class="fa-solid fa-truck-fast"></i> <span>${d.nameBn} জেলায় ২৪-৪৮ ঘণ্টায় ওষুধ কুরিয়ার ডেলিভারি</span>
      </div>
      <div class="top-bar-item">
        <a href="tel:+8801721515546"><i class="fa-solid fa-phone"></i> +88 01721-515546</a>
      </div>
    </div>
  </aside>

  <!-- Sticky Navbar -->
  <header class="navbar">
    <div class="container nav-container">
      <a href="../index.html" class="brand-logo">
        <div class="brand-icon">
          <i class="fa-solid fa-heart-pulse"></i>
        </div>
        <div class="brand-text">
          <h2>হাসিনা হোমিও কিউর</h2>
          <span>HASINA HOMEO CURE</span>
        </div>
      </a>

      <!-- Nav Links -->
      <nav>
        <ul class="nav-links">
          <li><a href="../index.html" class="nav-link">হোম</a></li>
          <li><a href="../index.html#about" class="nav-link">ডক্টর পরিচিতি</a></li>
          <li><a href="../index.html#services" class="nav-link">চিকিৎসা সেবা</a></li>
          <li><a href="../districts.html" class="nav-link active">৬৪ জেলা সেবা</a></li>
          <li><a href="../index.html#reviews" class="nav-link">রোগীদের অভিজ্ঞতা</a></li>
          <li><a href="../index.html#contact" class="nav-link">যোগাযোগ</a></li>
        </ul>
      </nav>

      <!-- Nav Actions -->
      <div class="nav-actions">
        <a href="https://wa.me/8801721515546?text=${encodeURIComponent('আসসালামু আলাইকুম ডাঃ স্নেহ, আমি ' + d.nameBn + ' থেকে হাসিনা হোমিও কিউর-এ পরামর্শ নিতে চাই।')}" target="_blank" class="btn btn-whatsapp btn-sm">
          <i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপ
        </a>
        <a href="../index.html#appointment" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-calendar-check"></i> সিরিয়াল বুকিং
        </a>
      </div>
    </div>
  </header>

  <main>
    <!-- Zilla Hero Section -->
    <section class="zilla-hero">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb-nav" aria-label="Breadcrumb">
          <a href="../index.html"><i class="fa-solid fa-house"></i> হোম</a>
          <span>/</span>
          <a href="../districts.html">৬৪ জেলা সেবা</a>
          <span>/</span>
          <span style="color: var(--dark); font-weight: 700;">${d.nameBn} (${d.divisionBn} বিভাগ)</span>
        </nav>

        <div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: center; justify-content: space-between;">
          <div style="flex: 1 1 540px;">
            <div class="zilla-badge">
              <i class="fa-solid fa-map-pin"></i> ${d.nameBn} জেলা (${d.nameEn}) • ${d.divisionBn} বিভাগ
            </div>

            <h1 class="zilla-title">
              <span>${d.nameBn}-তে</span> সেরা হোমিও ডাক্তার — ডাঃ শামসুন্নাহার স্নেহ (DHMS)
            </h1>

            <p class="zilla-lead">
              ${d.nameBn} জেলা ও আশপাশের সকল উপজেলার রোগীদের জন্য আধুনিক ও নির্ভরযোগ্য ক্লাসিক্যাল হোমিওপ্যাথি সেবা। ঘরে বসেই ভিডিও কনসালটেশনের মাধ্যমে রোগ বিশ্লেষণ এবং সুন্দরবন ও এসএ পরিবহনে অরিজিনাল জার্মান সিলপ্যাক ওষুধের নিশ্চয়তা।
            </p>

            <!-- Courier Box -->
            <div class="courier-box">
              <div class="courier-box-icon">
                <i class="fa-solid fa-truck-ramp-box"></i>
              </div>
              <div>
                <h4 style="font-size: 1.05rem; color: #065f46; margin-bottom: 0.25rem;">
                  <i class="fa-solid fa-circle-check"></i> ${d.nameBn}-তে সরাসরি হোম ও পয়েন্ট ডেলিভারি
                </h4>
                <p style="font-size: 0.92rem; color: #047857; margin-bottom: 0;">
                  ডেলিভারি সময়সীমা: <strong>${d.courierTime}</strong>। সুন্দরবন, এসএ পরিবহন ও স্টিডফাস্ট কুরিয়ারের মাধ্যমে নিরাপদে ঔষধ পাঠানো হয়।
                </p>
              </div>
            </div>

            <!-- Call to Actions -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
              <a href="https://wa.me/8801721515546?text=${encodeURIComponent('আসসালামু আলাইকুম ডাঃ স্নেহ, আমি ' + d.nameBn + ' থেকে হাসিনা হোমিও কিউর-এ পরামর্শ নিতে চাই।')}" target="_blank" class="btn btn-whatsapp btn-lg">
                <i class="fa-brands fa-whatsapp"></i> ${d.nameBn} থেকে হোয়াটসঅ্যাপে পরামর্শ
              </a>
              <a href="tel:+8801721515546" class="btn btn-phone btn-lg">
                <i class="fa-solid fa-phone"></i> সরাসরি কল: ০১৭২১-৫১৫৫৪৬
              </a>
              <a href="../index.html#appointment" class="btn btn-primary btn-lg">
                <i class="fa-solid fa-calendar-check"></i> অনলাইন সিরিয়াল (৳ ৫০০)
              </a>
            </div>
          </div>

          <!-- Doctor Card Preview -->
          <div style="flex: 0 1 360px; width: 100%;">
            <div style="background: #ffffff; padding: 1.75rem; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; text-align: center;">
              <img src="../assets/images/dr-samsunnahar-sneho.jpg" alt="ডাঃ শামসুন্নাহার স্নেহ" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; margin: 0 auto 1rem; border: 4px solid #10b981; box-shadow: 0 4px 15px rgba(16,185,129,0.2);" />
              <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--dark); margin-bottom: 0.25rem;">ডাঃ শামসুন্নাহার স্নেহ</h3>
              <p style="color: var(--primary); font-weight: 700; font-size: 0.9rem; margin-bottom: 0.35rem;">ডি এইচ এম এস (বিএইচবি ঢাকা)</p>
              <span style="display: inline-block; background: #ecfdf5; color: #047857; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 999px; margin-bottom: 1rem;">গভঃ রেজিঃ ৩৮২৭৫</span>
              <p style="font-size: 0.88rem; color: var(--slate); line-height: 1.5; margin-bottom: 1.25rem;">
                নারী ও শিশু রোগ, বন্ধ্যাত্ব, PCOS, কিডনি-পিত্ত পাথর ও দীর্ঘমেয়াদী জটিল রোগের প্রাকৃতিক আরোগ্যকারী।
              </p>
              <div style="background: #f8fafc; padding: 0.75rem; border-radius: 12px; font-size: 0.85rem; color: #475569;">
                <i class="fa-solid fa-circle-check" style="color: #10b981;"></i> ফি: <strong>৳ ৫০০</strong> (গভীর কেস-টেকিং)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Upazilas Coverage Section -->
    <section class="section" style="padding: 50px 0; background: #ffffff;">
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto; text-align: center;">
          <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--dark); margin-bottom: 0.5rem;">
            ${d.nameBn} জেলার অন্তর্ভুক্ত যেসকল উপজেলায় সেবা মিলবে
          </h2>
          <p style="color: var(--slate); font-size: 0.95rem;">
            ${d.nameBn} জেলা সদর ও নিম্নলিখিত প্রতিটি উপজেলা ও ইউনিয়নে আমাদের কুরিয়ার পার্সেল পৌঁছে দেওয়া হয়:
          </p>

          <div class="upazila-grid" style="justify-content: center; margin-top: 1.25rem;">
            ${upazilaPills}
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Hasina Homeo Cure for District -->
    <section class="section section-alt" style="padding: 60px 0;">
      <div class="container">
        <div class="section-header text-center">
          <div class="badge-pill">কেন বেছে নেবেন</div>
          <h2 class="section-title">${d.nameBn}-র রোগীদের জন্য বিশেষ সুবিধাসমূহ</h2>
          <p class="section-subtitle">দূরত্ব এখন আর চিকিৎসার বাধা নয় — আধুনিক প্রযুক্তির সাহায্যে ঘরে বসেই পান সেরা চিকিৎসকের সান্নিধ্য</p>
        </div>

        <div class="feature-card-grid">
          <div class="feature-card">
            <div class="feature-card-icon"><i class="fa-solid fa-video"></i></div>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">১-অন-১ ভিডিও কনসালটেশন</h3>
            <p style="font-size: 0.9rem; color: var(--slate); line-height: 1.6;">হোয়াটসঅ্যাপ বা ইমোতে চেম্বারে সামনাসামনি বসার মতোই সময় নিয়ে রোগীর শারীরিক ও মানসিক লক্ষণাবলীর গভীর কেস-টেকিং।</p>
          </div>

          <div class="feature-card">
            <div class="feature-card-icon"><i class="fa-solid fa-venus"></i></div>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">নারী রোগীদের সম্পূর্ণ গোপনীয়তা</h3>
            <p style="font-size: 0.9rem; color: var(--slate); line-height: 1.6;">অভিজ্ঞ নারী চিকিৎসক হওয়ায় মা-বোনেরা নিঃসঙ্কোচে তাদের ব্যক্তিগত স্বাস্থ্য সমস্যা নিয়ে আলোচনা করতে পারেন।</p>
          </div>

          <div class="feature-card">
            <div class="feature-card-icon"><i class="fa-solid fa-flask-vial"></i></div>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">আসল জার্মান সিলপ্যাক ওষুধ</h3>
            <p style="font-size: 0.9rem; color: var(--slate); line-height: 1.6;">কোনো নকল বা ভেজাল মিশ্রণ ছাড়া জার্মানির শোয়াবে (Schwabe) ও অ্যাডেল (Adel) প্রস্তুতকৃত শতভাগ কার্যকরী ওষুধ প্রদান।</p>
          </div>

          <div class="feature-card">
            <div class="feature-card-icon"><i class="fa-solid fa-box-open"></i></div>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">নিরাপদ কুরিয়ার প্যাকিং</h3>
            <p style="font-size: 0.9rem; color: var(--slate); line-height: 1.6;">কাঁচের শিশি ও তরল ড্রপ যেন না ভাঙ্গে সেজন্য শক-প্রুফ বাবুল র‍্যাপ ও ওয়াটারপ্রুফ বক্সে সিলগালা করে কুরিয়ারে বুকিং করা হয়।</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Diseases Treated Section -->
    <section class="section" style="padding: 60px 0;">
      <div class="container">
        <div class="section-header text-center">
          <div class="badge-pill">চিকিৎসা সেবা সমূহ</div>
          <h2 class="section-title">যেসব রোগের সফল চিকিৎসা দেওয়া হয়</h2>
          <p class="section-subtitle">অপারেশন ছাড়া ও পার্শ্বপ্রতিক্রিয়াহীন স্থায়ী সুস্থতার নির্ভরযোগ্য পথ</p>
        </div>

        <div class="feature-card-grid">
          <div class="feature-card">
            <h4 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 0.4rem;"><i class="fa-solid fa-venus"></i> PCOS ও জরায়ুর সিস্ট</h4>
            <p style="font-size: 0.88rem; color: var(--slate);">মাসিকের অনিয়ম, ডিম্বাশয়ে সিস্ট ও হরমোনের ভারসাম্যহীনতায় সার্জারিমুক্ত স্থায়ী আরোগ্য।</p>
          </div>

          <div class="feature-card">
            <h4 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 0.4rem;"><i class="fa-solid fa-gem"></i> পিত্তথলি ও কিডনি পাথর</h4>
            <p style="font-size: 0.88rem; color: var(--slate);">তীব্র ব্যথা নিয়ন্ত্রণ এবং গলস্টোন ও কিডনি স্টোন প্রাকৃতিকভাবে গলিয়ে মূত্রনালী দিয়ে বের করা।</p>
          </div>

          <div class="feature-card">
            <h4 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 0.4rem;"><i class="fa-solid fa-shield-heart"></i> জরায়ু টিউমার ও ফাইব্রয়েড</h4>
            <p style="font-size: 0.88rem; color: var(--slate);">অতিরিক্ত রক্তক্ষরণ ও টিউমার সঙ্কুচিতকরণে পার্শ্বপ্রতিক্রিয়াহীন ক্লাসিক্যাল চিকিৎসা।</p>
          </div>

          <div class="feature-card">
            <h4 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 0.4rem;"><i class="fa-solid fa-person-breastfeeding"></i> বন্ধ্যাত্ব (নারী ও পুরুষ)</h4>
            <p style="font-size: 0.88rem; color: var(--slate);">ডিম্বস্ফোটন ত্রুটি, কম শুক্রাণু ও প্রজননতন্ত্রের দুর্বলতায় গভীর বিশ্লেষণী চিকিৎসা।</p>
          </div>

          <div class="feature-card">
            <h4 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 0.4rem;"><i class="fa-solid fa-allergies"></i> সোরিয়াসিস ও দীর্ঘমেয়াদী চর্মরোগ</h4>
            <p style="font-size: 0.88rem; color: var(--slate);">একজিমা, দাউদ, আর্টিকারিয়া ও মেছতার দাগ মূল থেকে নির্মূলের প্রাকৃতিক সমাধান।</p>
          </div>

          <div class="feature-card">
            <h4 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 0.4rem;"><i class="fa-solid fa-baby"></i> শিশু স্বাস্থ্য ও ক্ষুধা সমস্যা</h4>
            <p style="font-size: 0.88rem; color: var(--slate);">ঘনঘন ঠান্ডা লাগা, টনসিল বৃদ্ধি, অপুষ্টি ও কৃমির সমস্যায় মিষ্টি স্বাদের হোমিও ড্রপস।</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3 Simple Steps to Take Treatment from District -->
    <section class="section section-alt" style="padding: 60px 0;">
      <div class="container">
        <div class="section-header text-center">
          <div class="badge-pill">সহজ প্রক্রিয়া</div>
          <h2 class="section-title">${d.nameBn} থেকে চিকিৎসা নেওয়ার ৩টি সহজ ধাপ</h2>
          <p class="section-subtitle">যানজট ও যাতায়াতের ভোগান্তি ছাড়াই স্বাস্থ্যসেবা নিশ্চিত করুন</p>
        </div>

        <div class="steps-container">
          <div class="step-item">
            <div class="step-num">১</div>
            <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; margin-top: 0.5rem;">অনলাইনে সিরিয়াল ও ফি পরিশোধ</h4>
            <p style="font-size: 0.88rem; color: var(--slate); line-height: 1.6;">ওয়েবসাইটের বুকিং ফর্ম পূরণ করে অথবা বিকাশ/নগদে পরামর্শ ফি (৳ ৫০০) পাঠিয়ে বুকিং সম্পন্ন করুন।</p>
          </div>

          <div class="step-item">
            <div class="step-num">২</div>
            <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; margin-top: 0.5rem;">ডাক্তারের সাথে সরাসরি কথা</h4>
            <p style="font-size: 0.88rem; color: var(--slate); line-height: 1.6;">নির্ধারিত সময়ে ডাঃ শামসুন্নাহার স্নেহ হোয়াটসঅ্যাপে আপনার সাথে ভিডিও বা অডিও কলে রোগ ও পূর্বের টেস্ট রিপোর্ট আলোচনা করবেন।</p>
          </div>

          <div class="step-item">
            <div class="step-num">৩</div>
            <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; margin-top: 0.5rem;">কুরিয়ারে ওষুধ গ্রহণ</h4>
            <p style="font-size: 0.88rem; color: var(--slate); line-height: 1.6;">প্রেসক্রিপশন অনুযায়ী সিলপ্যাক জার্মান ওষুধ সুন্দরবন বা এসএ পরিবহনে বুকিং দিয়ে ট্র্যাকিং নম্বর পাঠানো হবে।</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Frequently Asked Questions for District -->
    <section class="section" style="padding: 60px 0;">
      <div class="container" style="max-width: 840px;">
        <div class="section-header text-center">
          <div class="badge-pill">প্রশ্নোত্তর</div>
          <h2 class="section-title">${d.nameBn} রোগীদের সাধারণ জিজ্ঞাসা (FAQ)</h2>
          <p class="section-subtitle">চিকিৎসা ও ওষুধ প্রাপ্তি সংক্রান্ত যেকোনো প্রশ্নের পরিষ্কার উত্তর</p>
        </div>

        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question">
              <h4>${d.nameBn} জেলা থেকে কীভাবে ডাঃ শামসুন্নাহার স্নেহ'র পরামর্শ নেওয়া যায়?</h4>
              <i class="fa-solid fa-chevron-down faq-icon"></i>
            </div>
            <div class="faq-answer">
              <p>${d.nameBn} ও এর যেকোনো উপজেলা থেকে আপনি সরাসরি হোয়াটসঅ্যাপ কল অথবা ভিডিও কলের মাধ্যমে চেম্বারের মতোই বিস্তারিত কেস-টেকিং দিয়ে পরামর্শ নিতে পারেন। ফি বিকাশ/নগদে পরিশোধের পর প্রেসক্রিপশন প্রদান করা হয়।</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">
              <h4>${d.nameBn} জেলায় ওষুধ পৌঁছাতে কত সময় লাগে?</h4>
              <i class="fa-solid fa-chevron-down faq-icon"></i>
            </div>
            <div class="faq-answer">
              <p>সাধারণত <strong>${d.courierTime}</strong> এর মধ্যে সুন্দরবন কুরিয়ার, এসএ পরিবহন বা স্টিডফাস্ট কুরিয়ারের মাধ্যমে ${d.nameBn} জেলা শহর ও সকল উপজেলা সদরে অরিজিনাল জার্মান সিলপ্যাক ওষুধ পৌঁছে দেওয়া হয়।</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">
              <h4>হাসিনা হোমিও কিউরে পরামর্শ ফি কত?</h4>
              <i class="fa-solid fa-chevron-down faq-icon"></i>
            </div>
            <div class="faq-answer">
              <p>ডাঃ শামসুন্নাহার স্নেহ (DHMS, গভঃ রেজিঃ ৩৮২৭৫)-এর অফিসিয়াল পরামর্শ ফি মাত্র ৫০০ টাকা। এই ফিতে রোগীর শারীরিক ও মানসিক লক্ষণাবলীর গভীর কেস-টেকিং করা হয়।</p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">
              <h4>নারী রোগীদের ক্ষেত্রে গোপনীয়তা বজায় থাকে কি?</h4>
              <i class="fa-solid fa-chevron-down faq-icon"></i>
            </div>
            <div class="faq-answer">
              <p>হ্যাঁ, ডাঃ শামসুন্নাহার স্নেহ একজন অভিজ্ঞ নারী রেজিস্টার্ড চিকিৎসক হওয়ায় মা-বোনরা তাদের অত্যন্ত ব্যক্তিগত ও গোপন সমস্যাগুলো (যেমন PCOS, সাদাস্রাব, বন্ধ্যাত্ব, স্তন টিউমার ইত্যাদি) সম্পূর্ণ সংকোচহীনভাবে ও গোপনীয়তার সাথে বলতে পারেন।</p>
            </div>
          </div>
        </div>

        <!-- Division Cross-Linking -->
        <div class="other-districts-bar">
          <h4 style="font-size: 1rem; color: var(--dark); margin-bottom: 0.75rem;">
            <i class="fa-solid fa-network-wired" style="color: var(--primary);"></i> ${d.divisionBn} বিভাগের অন্যান্য জেলাসমূহ:
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${districtsData.filter(item => item.divisionBn === d.divisionBn && item.slug !== d.slug).map(item => `
              <a href="${item.slug}.html" style="background:#ffffff; border:1px solid #cbd5e1; padding:0.3rem 0.75rem; border-radius:6px; font-size:0.85rem; text-decoration:none; color:#334155; font-weight:600;">
                <i class="fa-solid fa-map-pin" style="color:var(--primary); font-size:0.75rem;"></i> ${item.nameBn}
              </a>
            `).join('')}
          </div>
          <div style="margin-top: 1rem; text-align: center;">
            <a href="../districts.html" style="color: var(--primary); font-weight: 700; font-size: 0.9rem; text-decoration: none;">
              <i class="fa-solid fa-list-check"></i> বাংলাদেশের সকল ৬৪টি জেলার তালিকা দেখুন &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Action CTA Banner -->
    <section style="background: linear-gradient(135deg, #0d7a57 0%, #054e36 100%); color: #ffffff; padding: 50px 0; text-align: center;">
      <div class="container">
        <h2 style="color: #ffffff; font-size: 1.85rem; font-weight: 800; margin-bottom: 0.75rem;">
          ${d.nameBn} থেকে আজই সুচিকিৎসার জন্য যোগাযোগ করুন
        </h2>
        <p style="color: #d1fae5; font-size: 1.05rem; max-width: 600px; margin: 0 auto 1.75rem;">
          রোগ লুকিয়ে না রেখে বা অপরীক্ষিত ওষুধ খেয়ে ক্ষতি না করে অভিজ্ঞ চিকিৎসকের প্রেসক্রিপশন গ্রহণ করুন।
        </p>
        <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem;">
          <a href="https://wa.me/8801721515546?text=${encodeURIComponent('আসসালামু আলাইকুম ডাঃ স্নেহ, আমি ' + d.nameBn + ' থেকে হাসিনা হোমিও কিউর-এ পরামর্শ নিতে চাই।')}" target="_blank" class="btn btn-whatsapp btn-lg">
            <i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপে মেসেজ দিন
          </a>
          <a href="tel:+8801721515546" class="btn btn-phone btn-lg">
            <i class="fa-solid fa-phone"></i> ০১৭২১-৫১৫৫৪৬
          </a>
          <a href="../index.html#appointment" class="btn btn-lg" style="background:#ffffff; color:var(--primary); font-weight:800;">
            <i class="fa-solid fa-calendar-check"></i> সিরিয়াল বুক করুন
          </a>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>হাসিনা হোমিও কিউর (${d.nameBn} সেবা)</h3>
          <p>
            ডাঃ শামসুন্নাহার স্নেহ (DHMS, রেজিঃ ৩৮২৭৫)। প্রাকৃতিক, বিজ্ঞানসম্মত ও পার্শ্বপ্রতিক্রিয়াহীন চিকিৎসায় শরীর ও মনের সার্বিক সুস্থতার বিশ্বস্ত প্রতিষ্ঠান।
          </p>
          <div style="display: flex; gap: 0.75rem;">
            <a href="https://wa.me/8801721515546" target="_blank" style="width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: #25d366;"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="tel:+8801721515546" style="width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: #38bdf8;"><i class="fa-solid fa-phone"></i></a>
          </div>
        </div>

        <div class="footer-col">
          <h4>কুইক লিংক</h4>
          <ul class="footer-links">
            <li><a href="../index.html">হোম পেজ</a></li>
            <li><a href="../districts.html">৬৪ জেলা সেবা তালিকা</a></li>
            <li><a href="../index.html#about">ডক্টর পরিচিতি</a></li>
            <li><a href="../index.html#services">চিকিৎসা সেবা</a></li>
            <li><a href="../index.html#appointment">অ্যাপয়েন্টমেন্ট বুকিং</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>বিশেষ চিকিৎসা</h4>
          <ul class="footer-links">
            <li><a href="../index.html#services">মহিলা ও শিশু রোগ</a></li>
            <li><a href="../index.html#services">PCOS ও ওভারিয়ান সিস্ট</a></li>
            <li><a href="../index.html#services">পিত্ত ও কিডনি পাথর</a></li>
            <li><a href="../index.html#services">চর্ম রোগ ও সোরিয়াসিস</a></li>
            <li><a href="../index.html#services">বাত ও ক্রনিক ব্যথা</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>যোগাযোগ ও কুরিয়ার তথ্য</h4>
          <p style="color: #94a3b8; font-size: 0.88rem; margin-bottom: 0.4rem;">
            <i class="fa-solid fa-phone"></i> কল: +88 01721-515546
          </p>
          <p style="color: #94a3b8; font-size: 0.88rem; margin-bottom: 0.4rem;">
            <i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপ: +88 01721-515546
          </p>
          <p style="color: #94a3b8; font-size: 0.88rem; margin-bottom: 0.4rem;">
            <i class="fa-solid fa-truck"></i> ${d.nameBn} জেলা ও সকল উপজেলায় ডেলিভারি
          </p>
          <p style="color: #10b981; font-weight: 600; font-size: 0.82rem; margin-top: 0.65rem;">
            ✓ সরকারি হোমিওপ্যাথিক বোর্ড নিবন্ধিত (৩৮২৭৫)
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 হাসিনা হোমিও কিউর (Hasina Homeo Cure). সর্বস্বত্ব সংরক্ষিত।</p>
        <p>রেজিস্টার্ড হোমিওপ্যাথিক চিকিৎসক: ডাঃ শামসুন্নাহার স্নেহ (DHMS, রেজিঃ ৩৮২৭৫)</p>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp Button -->
  <a href="https://wa.me/8801721515546?text=${encodeURIComponent('আসসালামু আলাইকুম ডাঃ স্নেহ, আমি ' + d.nameBn + ' থেকে হাসিনা হোমিও কিউর-এ পরামর্শ নিতে চাই।')}" target="_blank" class="floating-whatsapp" aria-label="WhatsApp Chat">
    <i class="fa-brands fa-whatsapp"></i>
    <span>হোয়াটসঅ্যাপে চ্যাট</span>
  </a>

  <!-- Mobile Bottom Dock -->
  <nav class="mobile-bottom-bar" aria-label="Mobile quick actions">
    <div class="mobile-bar-inner">
      <a href="tel:+8801721515546" class="m-bar-btn m-btn-call">
        <i class="fa-solid fa-phone"></i>
        <span>কল করুন</span>
      </a>
      <a href="https://wa.me/8801721515546?text=${encodeURIComponent('আসসালামু আলাইকুম ডাঃ স্নেহ, আমি ' + d.nameBn + ' থেকে হাসিনা হোমিও কিউর-এ পরামর্শ নিতে চাই।')}" target="_blank" class="m-bar-btn m-btn-wa">
        <i class="fa-brands fa-whatsapp"></i>
        <span>হোয়াটসঅ্যাপ</span>
      </a>
      <a href="../index.html#appointment" class="m-bar-btn m-btn-book">
        <i class="fa-solid fa-calendar-check"></i>
        <span>বুকিং করুন</span>
      </a>
    </div>
  </nav>

  <!-- Interactive Accordion Script -->
  <script>
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.parentElement;
        item.classList.toggle('active');
      });
    });
  </script>
</body>
</html>`;
}

// Function to generate the master interactive directory (districts.html)
function generateDistrictsHubHtml() {
  const divisions = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'];

  return `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title>বাংলাদেশের ৬৪ জেলায় অনলাইন হোমিওপ্যাথি চিকিৎসা ও কুরিয়ার সেবা | হাসিনা হোমিও কিউর</title>

  <!-- SEO Meta Tags -->
  <meta name="description" content="বাংলাদেশের সকল ৬৪ জেলায় ডাঃ শামসুন্নাহার স্নেহ (DHMS, রেজিঃ ৩৮২৭৫)-এর বিশ্বস্ত অনলাইন হোমিওপ্যাথি চিকিৎসা ও সুন্দরবন/এসএ কুরিয়ারে অরিজিনাল জার্মান সিলপ্যাক ওষুধ ডেলিভারি। ঢাকা, চট্টগ্রাম, রাজশাহী, সিলেট সহ সকল বিভাগের জেলা নির্বাচন করুন।" />
  <meta name="keywords" content="হোমিও ডাক্তার বাংলাদেশ, ৬৪ জেলা হোমিও চিকিৎসা, online homeo doctor bangladesh, ঢাকা হোমিও ডাক্তার, চট্টগ্রাম হোমিও ডাক্তার, সিলেট হোমিও ডাক্তার, রাজশাহী হোমিও ডাক্তার, হাসিনা হোমিও কিউর" />
  <meta name="author" content="Hasina Homeo Cure" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://hasinahomeocure.com/districts.html" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="বাংলাদেশের ৬৪ জেলায় অনলাইন হোমিওপ্যাথি চিকিৎসা | হাসিনা হোমিও কিউর" />
  <meta property="og:description" content="ঘরে বসেই দেশের যেকোনো জেলা থেকে নিন রেজিস্টার্ড নারী হোমিও চিকিৎসকের পরামর্শ ও কুরিয়ারে ওষুধ।" />
  <meta property="og:url" content="https://hasinahomeocure.com/districts.html" />
  <meta property="og:image" content="assets/images/dr-samsunnahar-sneho.jpg" />

  <!-- Google Fonts & Font Awesome -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link rel="stylesheet" href="assets/css/style.css" />

  <style>
    .hub-hero {
      padding: 130px 0 50px;
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #ffffff 100%);
      text-align: center;
    }
    .division-tabs {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin: 1.5rem 0 2rem;
    }
    .division-btn {
      padding: 0.5rem 1.25rem;
      border-radius: 999px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      color: #334155;
      font-weight: 700;
      font-size: 0.92rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .division-btn.active, .division-btn:hover {
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
      box-shadow: 0 4px 12px rgba(13, 122, 87, 0.25);
    }
    .search-input-wrap {
      max-width: 520px;
      margin: 0 auto 1.5rem;
      position: relative;
    }
    .search-input-wrap input {
      width: 100%;
      padding: 0.85rem 1rem 0.85rem 2.85rem;
      border-radius: 999px;
      border: 2px solid #cbd5e1;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s ease;
      background: #ffffff;
    }
    .search-input-wrap input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 4px rgba(13, 122, 87, 0.12);
    }
    .search-input-wrap i {
      position: absolute;
      left: 1.1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #64748b;
      font-size: 1.1rem;
    }
    .districts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.25rem;
      margin-top: 2rem;
    }
    .district-card {
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      padding: 1.35rem;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }
    .district-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(13, 122, 87, 0.12);
      border-color: var(--primary);
    }
    .district-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
    .district-name-bn {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--dark);
      margin-bottom: 0.15rem;
    }
    .district-name-en {
      font-size: 0.85rem;
      color: #64748b;
      font-weight: 600;
    }
    .district-div-badge {
      font-size: 0.75rem;
      background: #f1f5f9;
      color: #475569;
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-weight: 700;
    }
    .district-delivery {
      font-size: 0.82rem;
      color: #059669;
      background: #ecfdf5;
      padding: 0.35rem 0.65rem;
      border-radius: 8px;
      margin-top: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-weight: 600;
    }
    .district-card-footer {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--primary);
      font-weight: 700;
      font-size: 0.88rem;
    }
  </style>
</head>
<body>

  <!-- Top Bar -->
  <aside class="top-bar">
    <div class="container top-bar-inner">
      <div class="top-bar-item">
        <span class="badge-reg"><i class="fa-solid fa-certificate"></i> গভঃ রেজিঃ ৩৮২৭৫</span>
        <span>বাংলাদেশ হোমিওপ্যাথিক বোর্ড অনুমোদিত</span>
      </div>
      <div class="top-bar-item">
        <i class="fa-solid fa-map-location-dot"></i> <span>সারাদেশে ৬৪ জেলায় অনলাইন কনসালটেশন ও ওষুধ হোম ডেলিভারি</span>
      </div>
      <div class="top-bar-item">
        <a href="tel:+8801721515546"><i class="fa-solid fa-phone"></i> +88 01721-515546</a>
      </div>
    </div>
  </aside>

  <!-- Sticky Navbar -->
  <header class="navbar">
    <div class="container nav-container">
      <a href="index.html" class="brand-logo">
        <div class="brand-icon">
          <i class="fa-solid fa-heart-pulse"></i>
        </div>
        <div class="brand-text">
          <h2>হাসিনা হোমিও কিউর</h2>
          <span>HASINA HOMEO CURE</span>
        </div>
      </a>

      <nav>
        <ul class="nav-links">
          <li><a href="index.html" class="nav-link">হোম</a></li>
          <li><a href="index.html#about" class="nav-link">ডক্টর পরিচিতি</a></li>
          <li><a href="index.html#services" class="nav-link">চিকিৎসা সেবা</a></li>
          <li><a href="districts.html" class="nav-link active">৬৪ জেলা সেবা</a></li>
          <li><a href="index.html#reviews" class="nav-link">রোগীদের অভিজ্ঞতা</a></li>
          <li><a href="index.html#contact" class="nav-link">যোগাযোগ</a></li>
        </ul>
      </nav>

      <div class="nav-actions">
        <a href="https://wa.me/8801721515546" target="_blank" class="btn btn-whatsapp btn-sm">
          <i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপ
        </a>
        <a href="index.html#appointment" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-calendar-check"></i> সিরিয়াল বুকিং
        </a>
      </div>
    </div>
  </header>

  <main>
    <!-- Hub Hero -->
    <section class="hub-hero">
      <div class="container">
        <div class="badge-pill"><i class="fa-solid fa-globe"></i> সারা বাংলাদেশ কভারেজ</div>
        <h1 style="font-size: 2.4rem; font-weight: 800; color: var(--dark); margin: 0.75rem 0;">
          বাংলাদেশের <span style="color: var(--primary);">৬৪ জেলায়</span> অনলাইন হোমিওপ্যাথি সেবা
        </h1>
        <p style="font-size: 1.1rem; color: var(--slate); max-width: 700px; margin: 0 auto 1.5rem; line-height: 1.6;">
          আপনি দেশের যেকোনো প্রান্তে থাকুন না কেন — ভিডিও কলে অভিজ্ঞ রেজিস্টার্ড চিকিৎসকের পরামর্শ নিন এবং সুন্দরবন/এসএ কুরিয়ারে সরাসরি ঘরে বসেই গ্রহণ করুন অরিজিনাল জার্মান সিলপ্যাক ওষুধ।
        </p>

        <!-- Search Box -->
        <div class="search-input-wrap">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="district-search" placeholder="আপনার জেলা বা উপজেলার নাম লিখুন (যেমন: সিলেট, বগুড়া, কুমিল্লা)..." oninput="filterDistricts()" />
        </div>

        <!-- Division Filter Buttons -->
        <div class="division-tabs">
          <button class="division-btn active" onclick="setDivision('all')">সকল জেলা (৬৪)</button>
          ${divisions.map(div => `<button class="division-btn" onclick="setDivision('${div}')">${div} বিভাগ</button>`).join('\n          ')}
        </div>
      </div>
    </section>

    <!-- Districts Directory Grid -->
    <section class="section" style="padding: 40px 0 80px;">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--dark);">
            উপলব্ধ জেলা তালিকা (<span id="results-count">${districtsData.length}</span> টি জেলা প্রদর্শিত)
          </h3>
          <span style="font-size: 0.85rem; color: #64748b;">ক্লিক করে বিস্তারিত সেবা ও কুরিয়ার তথ্য দেখুন</span>
        </div>

        <div class="districts-grid" id="districts-grid">
          ${districtsData.map(d => `
            <a href="zilla/${d.slug}.html" class="district-card" data-division="${d.divisionBn}" data-name-bn="${d.nameBn}" data-name-en="${d.nameEn.toLowerCase()}" data-upazilas="${d.upazilas.join(' ').toLowerCase()}">
              <div>
                <div class="district-card-header">
                  <div>
                    <div class="district-name-bn">${d.nameBn}</div>
                    <div class="district-name-en">${d.nameEn} District</div>
                  </div>
                  <span class="district-div-badge">${d.divisionBn}</span>
                </div>
                <p style="font-size: 0.82rem; color: #64748b; line-height: 1.4; margin-bottom: 0;">
                  ${d.upazilas.slice(0, 4).join(', ')} সহ সকল উপজেলা
                </p>
                <div class="district-delivery">
                  <i class="fa-solid fa-truck-fast"></i> ${d.courierTime}
                </div>
              </div>
              <div class="district-card-footer">
                <span>সেবা বিস্তারিত ও বুকিং</span>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>হাসিনা হোমিও কিউর</h3>
          <p>ডাঃ শামসুন্নাহার স্নেহ (DHMS, রেজিঃ ৩৮২৭৫)। প্রাকৃতিক চিকিৎসায় নিরাপদ সমাধান। বাংলাদেশের ৬৪ জেলায় কুরিয়ার সার্ভিসযুক্ত।</p>
        </div>
        <div class="footer-col">
          <h4>কুইক লিংক</h4>
          <ul class="footer-links">
            <li><a href="index.html">হোম পেজ</a></li>
            <li><a href="districts.html">৬৪ জেলা সেবা তালিকা</a></li>
            <li><a href="index.html#appointment">অনলাইন সিরিয়াল</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>প্রধান চেম্বার ও হটলাইন</h4>
          <p style="color: #94a3b8; font-size: 0.88rem; margin-bottom: 0.4rem;">
            <i class="fa-solid fa-phone"></i> +88 01721-515546
          </p>
          <p style="color: #94a3b8; font-size: 0.88rem;">
            <i class="fa-brands fa-whatsapp"></i> +88 01721-515546
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 হাসিনা হোমিও কিউর (Hasina Homeo Cure). সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </div>
  </footer>

  <script>
    let activeDivision = 'all';

    function setDivision(div) {
      activeDivision = div;
      document.querySelectorAll('.division-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(div === 'all' ? 'সকল' : div));
      });
      filterDistricts();
    }

    function filterDistricts() {
      const q = document.getElementById('district-search').value.toLowerCase().trim();
      const cards = document.querySelectorAll('.district-card');
      let count = 0;

      cards.forEach(card => {
        const divMatch = (activeDivision === 'all') || (card.getAttribute('data-division') === activeDivision);
        const nameBn = card.getAttribute('data-name-bn') || '';
        const nameEn = card.getAttribute('data-name-en') || '';
        const upazilas = card.getAttribute('data-upazilas') || '';

        const textMatch = !q || nameBn.includes(q) || nameEn.includes(q) || upazilas.includes(q);

        if (divMatch && textMatch) {
          card.style.display = 'flex';
          count++;
        } else {
          card.style.display = 'none';
        }
      });

      document.getElementById('results-count').textContent = count;
    }
  </script>
</body>
</html>`;
}

// Function to generate full sitemap.xml
function generateSitemapXml() {
  const today = '2026-10-12';
  const urls = [
    { loc: 'https://hasinahomeocure.com/', priority: '1.0', changefreq: 'daily' },
    { loc: 'https://hasinahomeocure.com/districts.html', priority: '0.9', changefreq: 'weekly' }
  ];

  districtsData.forEach(d => {
    urls.push({
      loc: `https://hasinahomeocure.com/zilla/${d.slug}.html`,
      priority: d.slug === 'dhaka' ? '0.95' : '0.8',
      changefreq: 'weekly'
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

// Function to generate robots.txt
function generateRobotsTxt() {
  return `# Hasina Homeo Cure - Robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /payment-app/

Sitemap: https://hasinahomeocure.com/sitemap.xml
`;
}

// MAIN EXECUTION
console.log('Generating 64 District Static Landing Pages...');
districtsData.forEach(d => {
  const html = generateDistrictHtml(d);
  const filePath = path.join(ZILLA_DIR, `${d.slug}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
});
console.log('Successfully generated 64 district HTML files in /zilla/ folder.');

console.log('Generating districts.html hub directory...');
fs.writeFileSync(path.join(__dirname, '..', 'districts.html'), generateDistrictsHubHtml(), 'utf8');
console.log('Successfully generated districts.html.');

console.log('Generating sitemap.xml...');
fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), generateSitemapXml(), 'utf8');
console.log('Successfully generated sitemap.xml with 66 total URLs.');

console.log('Generating robots.txt...');
fs.writeFileSync(path.join(__dirname, '..', 'robots.txt'), generateRobotsTxt(), 'utf8');
console.log('Successfully generated robots.txt.');
