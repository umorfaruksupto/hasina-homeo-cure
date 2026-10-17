/**
 * Hasina Homeo Cure - Main Interactive Application Logic
 * Mobile-First, Pure Vanilla JS (Zero dependencies, ultra-fast)
 */

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = "bn"; // "bn" or "en"
  let currentFilter = "all";
  let currentStep = 1;

  const bookingState = {
    patientName: "",
    phone: "",
    age: "",
    gender: "মহিলা",
    consultType: "চেম্বারে সরাসরি সাক্ষাত",
    problem: "",
    date: "",
    timeSlot: "বিকাল ৪:৩০ - ৫:০০ টা",
    paymentMethod: "bKash",
    trxId: "",
    token: ""
  };

  // DOM Elements
  const servicesGrid = document.getElementById("services-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("service-search");
  const galleryGrid = document.getElementById("gallery-grid");
  const faqsContainer = document.getElementById("faqs-accordion");
  const reviewsGrid = document.getElementById("reviews-grid");
  const langToggleBtn = document.getElementById("lang-toggle");
  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const navBackdrop = document.getElementById("nav-backdrop");
  const drawerCloseBtn = document.getElementById("drawer-close");
  const bookingForm = document.getElementById("appointment-form");
  const ticketModal = document.getElementById("ticket-modal");
  const ticketCloseBtn = document.getElementById("ticket-close");
  const copyBkashBtn = document.getElementById("copy-bkash-btn");
  const timeChips = document.querySelectorAll(".time-chip");
  const timeSlotInput = document.getElementById("time-slot");

  // Lightbox Elements
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  // Initialize
  renderServices();
  renderGallery();
  renderFaqs();
  renderReviews();
  populateProblemOptions();
  setMinAppointmentDate();
  setupTimeSlotChips();

  // ── Navbar Scroll Class (Glassmorphism Enhancement) ─────────────
  const navbarEl = document.querySelector('.navbar');
  if (navbarEl) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        navbarEl.classList.add('scrolled');
      } else {
        navbarEl.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  // Mobile App Drawer Toggle
  function openDrawer() {
    if (mobileDrawer && navBackdrop) {
      mobileDrawer.classList.add("open");
      navBackdrop.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
  }

  function closeDrawer() {
    if (mobileDrawer && navBackdrop) {
      mobileDrawer.classList.remove("open");
      navBackdrop.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (mobileNavToggle) mobileNavToggle.addEventListener("click", openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
  if (navBackdrop) navBackdrop.addEventListener("click", closeDrawer);

  // Close drawer when any link inside it is tapped
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeDrawer);
    });
  }

  // Setup Time Slot Chips (Tap on Mobile)
  function setupTimeSlotChips() {
    timeChips.forEach(chip => {
      chip.addEventListener("click", () => {
        timeChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const slot = chip.getAttribute("data-slot");
        if (timeSlotInput) {
          timeSlotInput.value = slot;
        }
        bookingState.timeSlot = slot;
      });
    });
  }

  // Language Switcher
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "bn" ? "en" : "bn";
      updateLanguageUI();
    });
  }

  function updateLanguageUI() {
    const langText = langToggleBtn.querySelector(".lang-text");
    if (langText) {
      langText.textContent = currentLang === "bn" ? "English" : "বাংলা";
    }

    // Toggle data-i18n elements
    document.querySelectorAll("[data-i18n-bn]").forEach(el => {
      if (currentLang === "en" && el.getAttribute("data-i18n-en")) {
        el.textContent = el.getAttribute("data-i18n-en");
      } else if (currentLang === "bn" && el.getAttribute("data-i18n-bn")) {
        el.textContent = el.getAttribute("data-i18n-bn");
      }
    });

    renderServices();
    renderGallery();
    renderFaqs();
    renderReviews();
    populateProblemOptions();
  }

  // Render Services
  function renderServices() {
    if (!servicesGrid) return;
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

    const filtered = clinicData.services.filter(s => {
      const matchCategory = currentFilter === "all" || s.category === currentFilter;
      const title = currentLang === "bn" ? s.titleBn : s.titleEn;
      const desc = currentLang === "bn" ? s.descBn : s.descEn;
      const matchSearch = !query || title.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      servicesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem 1rem; color: var(--muted);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; margin-bottom: 0.5rem; display:block;"></i>
          ${currentLang === "bn" ? "কোনো চিকিৎসা সেবা খুঁজে পাওয়া যায়নি।" : "No treatments matching your search."}
        </div>
      `;
      return;
    }

    servicesGrid.innerHTML = filtered.map(s => `
      <div class="service-card" data-service-id="${s.id}">
        <span class="service-badge">${currentLang === "bn" ? s.badgeBn : s.badgeEn}</span>
        <div class="service-icon-box">
          <i class="fa-solid ${s.icon}"></i>
        </div>
        <h3 class="service-title">${currentLang === "bn" ? s.titleBn : s.titleEn}</h3>
        <p class="service-desc">${currentLang === "bn" ? s.descBn : s.descEn}</p>
        <div class="service-action">
          <button type="button" class="service-btn-book" onclick="selectServiceForBooking('${s.id}')">
            ${currentLang === "bn" ? "পরামর্শ নিন" : "Book Consult"} <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `).join("");
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      renderServices();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderServices();
    });
  }

  // Populate Problem Options in Form
  function populateProblemOptions() {
    const problemSelect = document.getElementById("patient-problem");
    if (!problemSelect) return;
    const currentVal = problemSelect.value;

    const defaultOption = `<option value="">${currentLang === "bn" ? "-- সমস্যার ধরণ নির্বাচন করুন --" : "-- Select Health Issue --"}</option>`;
    const options = clinicData.services.map(s => `
      <option value="${s.id}">${currentLang === "bn" ? s.titleBn : s.titleEn}</option>
    `).join("");

    const customOption = `<option value="other">${currentLang === "bn" ? "অন্যান্য সমস্যা (Others)" : "Other Condition"}</option>`;

    problemSelect.innerHTML = defaultOption + options + customOption;
    if (currentVal) problemSelect.value = currentVal;
  }

  window.selectServiceForBooking = function(serviceId) {
    const bookingSection = document.getElementById("appointment");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
    const problemSelect = document.getElementById("patient-problem");
    if (problemSelect) {
      problemSelect.value = serviceId;
    }
    goToBookingStep(1);
  };

  // Render Clinic Gallery with Lightbox Hook
  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = clinicData.gallery.map((item, index) => `
      <div class="gallery-card" onclick="openLightbox(${index})">
        <img src="${item.src}" alt="${currentLang === "bn" ? item.titleBn : item.titleEn}" loading="lazy">
        <div class="gallery-overlay">
          <h4>${currentLang === "bn" ? item.titleBn : item.titleEn}</h4>
          <p>${currentLang === "bn" ? item.captionBn : item.captionEn}</p>
        </div>
      </div>
    `).join("");
  }

  // Lightbox Logic
  window.openLightbox = function(index) {
    const item = clinicData.gallery[index];
    if (!item || !lightboxModal) return;
    lightboxImg.src = item.src;
    lightboxCaption.textContent = `${currentLang === "bn" ? item.titleBn : item.titleEn} — ${currentLang === "bn" ? item.captionBn : item.captionEn}`;
    lightboxModal.classList.add("open");
  };

  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      lightboxModal.classList.remove("open");
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove("open");
      }
    });
  }

  // Render FAQs
  function renderFaqs() {
    if (!faqsContainer) return;
    faqsContainer.innerHTML = clinicData.faqs.map((faq, index) => `
      <div class="faq-item ${index === 0 ? "active" : ""}">
        <button class="faq-question">
          <span>${currentLang === "bn" ? faq.qBn : faq.qEn}</span>
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="faq-answer" style="${index === 0 ? "max-height: 200px;" : ""}">
          <p>${currentLang === "bn" ? faq.aBn : faq.aEn}</p>
        </div>
      </div>
    `).join("");

    faqsContainer.querySelectorAll(".faq-question").forEach(q => {
      q.addEventListener("click", () => {
        const item = q.parentElement;
        const answer = item.querySelector(".faq-answer");
        const isOpen = item.classList.contains("active");

        faqsContainer.querySelectorAll(".faq-item").forEach(other => {
          other.classList.remove("active");
          const otherAns = other.querySelector(".faq-answer");
          if (otherAns) otherAns.style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  // Render Patient Reviews
  function renderReviews() {
    if (!reviewsGrid) return;
    reviewsGrid.innerHTML = clinicData.testimonials.map(t => `
      <div class="review-card">
        <div>
          <div class="review-stars">
            ${'<i class="fa-solid fa-star"></i>'.repeat(t.rating)}
          </div>
          <p class="review-text">"${currentLang === "bn" ? t.commentBn : t.commentEn}"</p>
        </div>
        <div class="reviewer-meta">
          <div class="reviewer-avatar">${(currentLang === "bn" ? t.nameBn : t.nameEn).charAt(0)}</div>
          <div class="reviewer-info">
            <h5>${currentLang === "bn" ? t.nameBn : t.nameEn}</h5>
            <span>${currentLang === "bn" ? t.locationBn : t.locationEn} • যাচাইকৃত রোগী</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Booking Stepper Logic
  window.goToBookingStep = function(step) {
    if (step === 2) {
      const name = document.getElementById("patient-name").value.trim();
      const phone = document.getElementById("patient-phone").value.trim();
      const problem = document.getElementById("patient-problem").value;

      if (!name) {
        alert(currentLang === "bn" ? "অনুগ্রহ করে রোগীর নাম লিখুন।" : "Please enter patient name.");
        document.getElementById("patient-name").focus();
        return;
      }
      if (!phone || phone.length < 11) {
        alert(currentLang === "bn" ? "অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন।" : "Please enter a valid 11-digit mobile number.");
        document.getElementById("patient-phone").focus();
        return;
      }
      if (!problem) {
        alert(currentLang === "bn" ? "অনুগ্রহ করে সমস্যার ধরণ নির্বাচন করুন।" : "Please select your health condition.");
        document.getElementById("patient-problem").focus();
        return;
      }

      bookingState.patientName = name;
      bookingState.phone = phone;
      bookingState.age = document.getElementById("patient-age").value || "N/A";
      bookingState.gender = document.getElementById("patient-gender").value;
      bookingState.consultType = document.getElementById("consult-type").value;
      bookingState.problem = document.getElementById("patient-problem").options[document.getElementById("patient-problem").selectedIndex].text;
    }

    if (step === 3) {
      const date = document.getElementById("appointment-date").value;
      if (!date) {
        alert(currentLang === "bn" ? "অনুগ্রহ করে অ্যাপয়েন্টমেন্টের তারিখ নির্বাচন করুন।" : "Please select an appointment date.");
        document.getElementById("appointment-date").focus();
        return;
      }
      bookingState.date = date;
      const activeSlot = document.querySelector(".time-chip.active");
      bookingState.timeSlot = activeSlot ? activeSlot.getAttribute("data-slot") : "বিকাল ৪:৩০ - ৫:০০ টা";
    }

    currentStep = step;

    // Update Step Contents
    document.querySelectorAll(".booking-step").forEach((el, idx) => {
      el.classList.toggle("active", idx + 1 === step);
    });

    // Update Step Nav Indicators
    document.querySelectorAll(".step-nav-btn").forEach((btn, idx) => {
      const stepIdx = idx + 1;
      btn.classList.toggle("active", stepIdx === step);
      btn.classList.toggle("completed", stepIdx < step);
    });
  };

  // Minimum Date Setup
  function setMinAppointmentDate() {
    const dateInput = document.getElementById("appointment-date");
    if (!dateInput) return;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // Copy bKash Number
  if (copyBkashBtn) {
    copyBkashBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("01721515546").then(() => {
        const originalText = copyBkashBtn.innerHTML;
        copyBkashBtn.innerHTML = currentLang === "bn" ? "<i class='fa-solid fa-check'></i> কপি হয়েছে!" : "<i class='fa-solid fa-check'></i> Copied!";
        setTimeout(() => {
          copyBkashBtn.innerHTML = originalText;
        }, 2500);
      });
    });
  }

  // Copy WhatsApp Number (Unlocked for paid patients)
  const copyWaBtn = document.getElementById("copy-wa-btn");
  if (copyWaBtn) {
    copyWaBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("01862879156").then(() => {
        const originalText = copyWaBtn.innerHTML;
        copyWaBtn.innerHTML = currentLang === "bn" ? "<i class='fa-solid fa-check'></i> কপি হয়েছে!" : "<i class='fa-solid fa-check'></i> Copied!";
        setTimeout(() => {
          copyWaBtn.innerHTML = originalText;
        }, 2500);
      });
    });
  }

  // Active Polling Timer for Payment Verification
  let verificationPollTimer = null;

  // Form Submission with API Integration
  if (bookingForm) {
    bookingForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const trxInput = document.getElementById("trx-id");
      const trxId = trxInput ? trxInput.value.trim() : "";
      const senderPhoneInput = document.getElementById("sender-phone");
      const senderPhone = senderPhoneInput ? senderPhoneInput.value.trim() : bookingState.phone;

      if (!trxId) {
        alert(currentLang === "bn" ? "অনুগ্রহ করে আপনার ট্রানজেকশন আইডি (TrxID) লিখুন।" : "Please enter your payment Transaction ID (TrxID).");
        if (trxInput) trxInput.focus();
        return;
      }

      bookingState.trxId = trxId;
      bookingState.senderPhone = senderPhone;
      bookingState.paymentMethod = document.getElementById("payment-method") ? document.getElementById("payment-method").value : "bKash";

      const submitBtn = document.getElementById("btn-submit-booking");
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-inline"></span> ${currentLang === "bn" ? "ভেরিফিকেশন সাবমিট হচ্ছে..." : "Submitting..."}`;
      }

      try {
        const payload = {
          patientName: bookingState.patientName,
          phone: bookingState.phone,
          senderPhone: bookingState.senderPhone,
          age: bookingState.age,
          gender: bookingState.gender,
          consultType: bookingState.consultType,
          problem: bookingState.problem,
          date: bookingState.date,
          timeSlot: bookingState.timeSlot,
          paymentMethod: bookingState.paymentMethod,
          trxId: bookingState.trxId
        };

        const response = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          bookingState.token = data.token;
          showBookingTicket(data.status || "pending");
          if (data.status === "verified") {
            setVerifiedState();
          } else {
            startVerificationPolling(bookingState.token);
          }
        } else {
          alert(data.error || "বুকিং প্রক্রিয়া সফল হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
        }
      } catch (err) {
        console.error("Booking error:", err);
        // Fallback for offline or local preview without server
        bookingState.token = "HHC-" + Math.floor(1000 + Math.random() * 9000);
        showBookingTicket("pending");
        startVerificationPolling(bookingState.token);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }

  // Display Booking Ticket & Initial State
  function showBookingTicket(initialStatus) {
    if (!ticketModal) return;

    document.getElementById("ticket-token").textContent = bookingState.token;
    document.getElementById("ticket-name").textContent = bookingState.patientName;
    document.getElementById("ticket-phone").textContent = bookingState.phone;
    document.getElementById("ticket-problem").textContent = bookingState.problem;
    document.getElementById("ticket-date").textContent = `${bookingState.date} (${bookingState.timeSlot})`;
    document.getElementById("ticket-type").textContent = bookingState.consultType;
    document.getElementById("ticket-trx").textContent = `${bookingState.paymentMethod}: ${bookingState.trxId}`;

    if (initialStatus === "verified") {
      setVerifiedState();
    } else {
      setPendingState();
    }

    ticketModal.classList.add("open");
  }

  // Set Modal to Pending Verification State
  function setPendingState() {
    const iconBox = document.getElementById("ticket-status-icon-box");
    if (iconBox) iconBox.innerHTML = `<i class="fa-solid fa-shield-halved" style="font-size: 2.3rem; margin-bottom: 0.5rem; display: block; color: #fbbf24;"></i>`;

    const title = document.getElementById("ticket-status-title");
    if (title) title.textContent = "পেমেন্ট যাচাইকরণ চলছে...";

    const badge = document.getElementById("ticket-status-badge");
    if (badge) {
      badge.className = "badge-verifying";
      badge.innerHTML = `<span class="spinner-inline"></span> যাচাই প্রক্রিয়াধীন (Pending)`;
    }

    const pendingBox = document.getElementById("ticket-pending-box");
    if (pendingBox) pendingBox.style.display = "flex";

    const unlockedSection = document.getElementById("unlocked-whatsapp-section");
    if (unlockedSection) unlockedSection.style.display = "none";

    const rejectedBox = document.getElementById("ticket-rejected-box");
    if (rejectedBox) rejectedBox.style.display = "none";
  }

  // Set Modal to Verified State & Unlock WhatsApp
  function setVerifiedState() {
    if (verificationPollTimer) {
      clearInterval(verificationPollTimer);
      verificationPollTimer = null;
    }

    const iconBox = document.getElementById("ticket-status-icon-box");
    if (iconBox) iconBox.innerHTML = `<i class="fa-solid fa-circle-check" style="font-size: 2.5rem; margin-bottom: 0.5rem; display: block; color: #10b981;"></i>`;

    const title = document.getElementById("ticket-status-title");
    if (title) title.textContent = "অ্যাপয়েন্টমেন্ট ও পেমেন্ট সফলভাবে যাচাইকৃত! ✅";

    const badge = document.getElementById("ticket-status-badge");
    if (badge) {
      badge.className = "badge-verified";
      badge.innerHTML = `<i class="fa-solid fa-check-double"></i> পেমেন্ট যাচাইকৃত (৳ ৫০০ পেইড)`;
    }

    const pendingBox = document.getElementById("ticket-pending-box");
    if (pendingBox) pendingBox.style.display = "none";

    const rejectedBox = document.getElementById("ticket-rejected-box");
    if (rejectedBox) rejectedBox.style.display = "none";

    const unlockedSection = document.getElementById("unlocked-whatsapp-section");
    if (unlockedSection) {
      unlockedSection.style.display = "block";
    }

    // Build pre-filled WhatsApp message for Dr. Sneho
    const waText = encodeURIComponent(
`*অ্যাপয়েন্টমেন্ট ও পেমেন্ট নিশ্চিতকরণ — হাসিনা হোমিও কিউর*
---------------------------------------
টোকেন নম্বর: ${bookingState.token}
রোগীর নাম: ${bookingState.patientName}
মোবাইল নম্বর: ${bookingState.phone}
বয়স ও লিঙ্গ: ${bookingState.age}, ${bookingState.gender}
সমস্যার ধরণ: ${bookingState.problem}
পরামর্শের ধরণ: ${bookingState.consultType}
তারিখ ও সময়: ${bookingState.date} (${bookingState.timeSlot})
পেমেন্ট স্ট্যাটাস: ৳ ৫০০ পরিশোধিত ও যাচাইকৃত ✓
TrxID: ${bookingState.trxId} (${bookingState.paymentMethod})
---------------------------------------
ডাঃ শামসুন্নাহার স্নেহ (DHMS, গভঃ রেজিঃ ৩৮২৭৫)`
    );

    const waBtn = document.getElementById("ticket-whatsapp-btn");
    if (waBtn) {
      waBtn.href = `https://wa.me/8801862879156?text=${waText}`;
    }

    const waLink = document.getElementById("unlocked-wa-link");
    if (waLink) {
      waLink.href = `https://wa.me/8801862879156?text=${waText}`;
      waLink.textContent = "+88 01862-879156";
    }
  }

  // Set Modal to Rejected State
  function setRejectedState(reason) {
    if (verificationPollTimer) {
      clearInterval(verificationPollTimer);
      verificationPollTimer = null;
    }

    const iconBox = document.getElementById("ticket-status-icon-box");
    if (iconBox) iconBox.innerHTML = `<i class="fa-solid fa-circle-xmark" style="font-size: 2.5rem; margin-bottom: 0.5rem; display: block; color: #ef4444;"></i>`;

    const title = document.getElementById("ticket-status-title");
    if (title) title.textContent = "ট্রানজেকশন যাচাই সফল হয়নি";

    const badge = document.getElementById("ticket-status-badge");
    if (badge) {
      badge.className = "badge-verifying";
      badge.style.background = "#fee2e2";
      badge.style.color = "#dc2626";
      badge.style.borderColor = "#fca5a5";
      badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> বাতিল (Rejected)`;
    }

    const pendingBox = document.getElementById("ticket-pending-box");
    if (pendingBox) pendingBox.style.display = "none";

    const unlockedSection = document.getElementById("unlocked-whatsapp-section");
    if (unlockedSection) unlockedSection.style.display = "none";

    const rejectedBox = document.getElementById("ticket-rejected-box");
    if (rejectedBox) {
      rejectedBox.style.display = "flex";
      const reasonEl = document.getElementById("ticket-rejected-reason");
      if (reasonEl) reasonEl.textContent = reason || "প্রদত্ত TrxID সঠিক নয় অথবা ফি ক্রেডিট হয়নি।";
    }
  }

  // Real-time Polling for Payment Status
  function startVerificationPolling(token) {
    if (verificationPollTimer) clearInterval(verificationPollTimer);

    verificationPollTimer = setInterval(async () => {
      try {
        const res = await fetch(`/api/appointments/${token}/status`);
        if (!res.ok) return;
        const data = await res.json();

        if (data.status === "verified") {
          setVerifiedState();
        } else if (data.status === "rejected") {
          setRejectedState(data.note);
        }
      } catch (e) {
        // network polling retry
      }
    }, 2500);
  }

  // Demo Instant Approval Helper (allows testing on the same screen)
  window.simulateInstantApproval = async function() {
    if (!bookingState.token) return;
    try {
      const res = await fetch("/api/appointments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: bookingState.token,
          action: "verify",
          note: "Instant Demo Approval (Test)"
        })
      });
      const data = await res.json();
      if (data.success) {
        setVerifiedState();
      }
    } catch (err) {
      setVerifiedState();
    }
  };

  // Retry Payment
  window.retryPayment = function() {
    if (ticketModal) ticketModal.classList.remove("open");
    goToBookingStep(3);
    const trxInput = document.getElementById("trx-id");
    if (trxInput) {
      trxInput.value = "";
      trxInput.focus();
    }
  };

  if (ticketCloseBtn) {
    ticketCloseBtn.addEventListener("click", () => {
      ticketModal.classList.remove("open");
      if (verificationPollTimer) {
        clearInterval(verificationPollTimer);
        verificationPollTimer = null;
      }
      resetBookingForm();
    });
  }

  window.printTicket = function() {
    window.print();
  };

  function resetBookingForm() {
    if (bookingForm) bookingForm.reset();
    goToBookingStep(1);
    setMinAppointmentDate();
  }
});

