/**
 * Hasina Homeo Cure - Mobile Payment Verification App (HHC Pay)
 * Real-time verification, SMS Parser, 1-tap WhatsApp alert dispatch
 */

let appointments = [];
let soundEnabled = true;
let previousPendingCount = 0;
let currentRejectToken = null;
let pollTimer = null;
let audioCtx = null;

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  fetchAppointments();
  startLivePolling();
  setupEventListeners();
});

// Setup Listeners
function setupEventListeners() {
  const refreshBtn = document.getElementById("refresh-btn");
  if (refreshBtn) refreshBtn.addEventListener("click", () => fetchAppointments(true));

  const soundBtn = document.getElementById("sound-toggle-btn");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      soundBtn.classList.toggle("active", soundEnabled);
      showToast(soundEnabled ? "অডিও অ্যালার্ট চালু করা হয়েছে 🔔" : "অডিও অ্যালার্ট মিউট করা হয়েছে 🔕");
    });
  }

  const searchInput = document.getElementById("verified-search");
  if (searchInput) {
    searchInput.addEventListener("input", renderVerifiedCards);
  }
}

// Play notification chime using Web Audio API
function playChime() {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
  } catch (err) {
    console.warn("Audio chime error:", err);
  }
}

// Fetch Appointments from API
async function fetchAppointments(manual = false) {
  try {
    const res = await fetch("/api/appointments");
    if (!res.ok) throw new Error("API request failed");
    const data = await res.json();
    appointments = data.appointments || [];

    updateMetrics();
    renderPendingCards();
    renderVerifiedCards();

    // Update sync time
    const syncTime = document.getElementById("last-sync-time");
    if (syncTime) {
      const now = new Date();
      syncTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    if (manual) showToast("ডাটা সফলভাবে রিফ্রেশ হয়েছে ✓");
  } catch (err) {
    console.error("Fetch error:", err);
    if (manual) showToast("রিফ্রেশ ব্যর্থ হয়েছে! সার্ভার সংযোগ নেই ⚠️");
  }
}

// Live Polling every 3.5 seconds
function startLivePolling() {
  if (pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(async () => {
    try {
      const res = await fetch("/api/appointments");
      if (!res.ok) return;
      const data = await res.json();
      const newAppointments = data.appointments || [];
      const currentPending = newAppointments.filter(a => a.status === 'pending').length;

      // Play alert if new pending booking arrived
      if (currentPending > previousPendingCount) {
        playChime();
        showToast(`নতুন ${currentPending - previousPendingCount} টি পেমেন্ট অপেক্ষমাণ! 🔔`);
      }

      appointments = newAppointments;
      previousPendingCount = currentPending;

      updateMetrics();
      renderPendingCards();
      renderVerifiedCards();

      const syncTime = document.getElementById("last-sync-time");
      if (syncTime) {
        const now = new Date();
        syncTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
    } catch (e) {
      // Background poll failure ignore
    }
  }, 3500);
}

// Update Header Metrics
function updateMetrics() {
  const verified = appointments.filter(a => a.status === 'verified');
  const pending = appointments.filter(a => a.status === 'pending');

  const totalEarnings = verified.reduce((sum, a) => sum + (a.amount || 500), 0);

  document.getElementById("stat-total-amount").textContent = `৳ ${totalEarnings.toLocaleString('bn-BD')}`;
  document.getElementById("stat-pending-count").textContent = pending.length;
  document.getElementById("stat-verified-count").textContent = verified.length;

  document.getElementById("badge-pending").textContent = pending.length;
  document.getElementById("badge-verified").textContent = verified.length;
  document.getElementById("pending-counter-label").textContent = `${pending.length} টি নতুন`;
}

// Tab Switching
window.switchTab = function(tabName) {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
  });
  document.querySelectorAll(".tab-view").forEach(view => {
    view.classList.toggle("active", view.id === `view-${tabName}`);
  });
};

// Render Pending Transactions
function renderPendingCards() {
  const container = document.getElementById("pending-cards-container");
  if (!container) return;

  const pending = appointments.filter(a => a.status === 'pending');

  if (pending.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-circle-check" style="color: #10b981;"></i>
        <h4 style="color: #e2e8f0; margin-bottom: 0.35rem;">সব পেমেন্ট যাচাই সম্পন্ন!</h4>
        <p style="font-size: 0.85rem;">এই মুহূর্তে কোনো অপেক্ষমাণ ট্রানজেকশন নেই।</p>
      </div>
    `;
    return;
  }

  container.innerHTML = pending.map(appt => {
    const timeAgo = formatTimeAgo(appt.createdAt);
    return `
      <div class="tx-card pending" id="card-${appt.token}">
        <div class="tx-card-header">
          <div class="tx-token-box">
            <span class="status-tag pending">অপেক্ষমাণ</span>
            <span class="tx-token">সিরিয়াল: ${appt.serialCode || appt.token}</span>
            <span class="time-ago">• ${timeAgo}</span>
          </div>
          <div class="tx-amount-badge">
            <span class="tx-amount">৳ ${appt.amount || 500}</span>
          </div>
        </div>

        <div class="tx-patient-info">
          <div class="patient-name-row">
            <h3 class="patient-name">${appt.patientName}</h3>
            <span class="patient-meta">${appt.age} বছর • ${appt.gender}</span>
          </div>
          <div class="patient-details-row">
            <span><i class="fa-solid fa-phone"></i> ${appt.phone}</span>
            <span><i class="fa-solid fa-calendar"></i> ${appt.date}</span>
            <span><i class="fa-solid fa-clock"></i> ${appt.timeSlot}</span>
          </div>
          <div class="problem-badge">
            <i class="fa-solid fa-notes-medical"></i> ${appt.problem}
          </div>
        </div>

        <div class="tx-payment-box">
          <div class="pay-provider-row">
            <span class="gateway-chip ${appt.paymentMethod}">
              <i class="fa-solid fa-wallet"></i> ${appt.paymentMethod}
            </span>
            <span class="sender-phone">প্রেরক: <strong>${appt.senderPhone || appt.phone}</strong></span>
          </div>
          <div class="trx-id-row">
            <span class="trx-id-label">TrxID:</span>
            <span class="trx-id-val">${appt.trxId}</span>
            <button type="button" class="btn-copy-sm" onclick="copyText('${appt.trxId}')" title="কপি করুন">
              <i class="fa-regular fa-copy"></i>
            </button>
          </div>
        </div>

        <div class="tx-actions-grid">
          <button type="button" class="btn btn-approve" onclick="verifyAppointment('${appt.token}')">
            <i class="fa-solid fa-check-circle"></i> অনুমোদন করুন
          </button>
          <button type="button" class="btn btn-reject" onclick="openRejectModal('${appt.token}', '${appt.patientName}')">
            <i class="fa-solid fa-circle-xmark"></i> বাতিল
          </button>
          <a href="${getPatientWhatsAppUrl(appt)}" target="_blank" class="btn btn-wa">
            <i class="fa-brands fa-whatsapp"></i> রোগীকে WhatsApp মেসেজ পাঠান
          </a>
          <a href="tel:${appt.phone}" class="btn btn-call" style="grid-column: 1 / -1;">
            <i class="fa-solid fa-phone"></i> রোগীকে সরাসরি কল করুন (${appt.phone})
          </a>
        </div>
      </div>
    `;
  }).join("");
}

// Render Verified Transactions
function renderVerifiedCards() {
  const container = document.getElementById("verified-cards-container");
  if (!container) return;

  const searchInput = document.getElementById("verified-search");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  let verified = appointments.filter(a => a.status === 'verified');

  if (query) {
    verified = verified.filter(a =>
      (a.patientName && a.patientName.toLowerCase().includes(query)) ||
      (a.phone && a.phone.includes(query)) ||
      (a.trxId && a.trxId.toLowerCase().includes(query)) ||
      (a.token && a.token.toLowerCase().includes(query))
    );
  }

  if (verified.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-folder-open"></i>
        <p>${query ? "খুঁজে পাওয়া যায়নি" : "এখনো কোনো অনুমোদিত বুকিং নেই"}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = verified.map(appt => {
    return `
      <div class="tx-card verified">
        <div class="tx-card-header">
          <div class="tx-token-box">
            <span class="status-tag verified">অনুমোদিত ✓</span>
            <span class="tx-token">${appt.token}</span>
          </div>
          <div class="tx-amount-badge">
            <span class="tx-amount">৳ ${appt.amount || 500}</span>
          </div>
        </div>

        <div class="tx-patient-info">
          <div class="patient-name-row">
            <h3 class="patient-name">${appt.patientName}</h3>
            <span class="patient-meta">${appt.phone}</span>
          </div>
          <div class="patient-details-row">
            <span><i class="fa-solid fa-calendar"></i> ${appt.date} (${appt.timeSlot})</span>
            <span><i class="fa-solid fa-notes-medical"></i> ${appt.problem}</span>
          </div>
          <div style="font-size: 0.78rem; color: #6ee7b7; margin-top: 0.25rem;">
            ${appt.paymentMethod} TrxID: <strong>${appt.trxId}</strong>
          </div>
          ${appt.note ? `<div style="font-size: 0.72rem; color: #94a3b8; margin-top: 0.2rem;">নোট: ${appt.note}</div>` : ''}
        </div>

        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
          <a href="${getPatientWhatsAppUrl(appt)}" target="_blank" class="btn btn-wa" style="flex: 1;">
            <i class="fa-brands fa-whatsapp"></i> কনফার্মেশন পাঠান
          </a>
          <a href="tel:${appt.phone}" class="btn btn-call" style="width: 48px;">
            <i class="fa-solid fa-phone"></i>
          </a>
        </div>
      </div>
    `;
  }).join("");
}

// 1-Tap Verify Appointment
window.verifyAppointment = async function(token) {
  try {
    const res = await fetch("/api/appointments/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, action: "verify", note: "Approved via Mobile App" })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`টোকেন ${token} সফলভাবে যাচাই ও অনুমোদিত হয়েছে! ✓`);
      fetchAppointments();
    } else {
      showToast("অনুমোদন ব্যর্থ: " + (data.error || "অজানা ত্রুটি"));
    }
  } catch (err) {
    showToast("নেটওয়ার্ক ত্রুটি! সার্ভার সংযোগ নেই");
  }
};

// Rejection Modal Handlers
window.openRejectModal = function(token, name) {
  currentRejectToken = token;
  document.getElementById("reject-modal-token").textContent = token;
  document.getElementById("reject-modal-name").textContent = name;
  document.getElementById("reject-modal").classList.add("open");
};

window.closeRejectModal = function() {
  currentRejectToken = null;
  document.getElementById("reject-modal").classList.remove("open");
};

window.confirmReject = async function() {
  if (!currentRejectToken) return;
  const reason = document.getElementById("reject-reason").value;

  try {
    const res = await fetch("/api/appointments/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: currentRejectToken, action: "reject", note: reason })
    });
    const data = await res.json();
    closeRejectModal();
    if (data.success) {
      showToast(`বুকিং বাতিল করা হয়েছে ⚠️`);
      fetchAppointments();
    } else {
      showToast("বাতিল করা যায়নি: " + (data.error || "ত্রুটি"));
    }
  } catch (err) {
    showToast("নেটওয়ার্ক সমস্যা!");
  }
};

// Helper: Patient WhatsApp URL with pre-filled confirmation text
function getPatientWhatsAppUrl(appt) {
  const patientPhoneClean = (appt.phone || '').replace(/[^0-9]/g, '');
  const targetPhone = patientPhoneClean.startsWith('88') ? patientPhoneClean : `88${patientPhoneClean}`;
  const sCode = appt.serialCode || appt.token;
  const pName = appt.patientName || appt.name || 'রোগী';
  const msg = encodeURIComponent(
`আসসালামু আলাইকুম ${pName},
আপনার সিরিয়াল কোড [${sCode}] এবং TrxID [${appt.trxId}] সফলভাবে ভেরিফাই ও অনুমোদন করা হয়েছে।

আপনার সিরিয়াল চূড়ান্তভাবে নিশ্চিত করা হলো।
📅 তারিখ: ${appt.date || ''}
⏰ সময় স্লট: ${appt.timeSlot || ''}
🏥 চেম্বার: হাসিনা হোমিও কিউর (যশোর: মোল্লাপাড়া / ঢাকা: মিরপুর ১২)

ধন্যবাদ,
ডাঃ সামসুন্নাহার স্নেহ (DHMS, রেজিঃ ৩৮২৭৫)
হোয়াটসঅ্যাপ: 01862879156
বিকাশ ও হটলাইন: 01721515546`
  );
  return `https://wa.me/${targetPhone}?text=${msg}`;
}

// SMS Matcher Feature
window.handleSmsMatch = async function(autoVerify = false) {
  const smsInput = document.getElementById("sms-input");
  const smsText = smsInput ? smsInput.value.trim() : "";
  const resultBox = document.getElementById("sms-result-box");

  if (!smsText) {
    showToast("অনুগ্রহ করে SMS টেক্সট দিন!");
    return;
  }

  resultBox.style.display = "block";
  resultBox.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>SMS বিশ্লেষণ করা হচ্ছে...</p></div>`;

  try {
    const res = await fetch("/api/sms/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ smsText, autoVerify })
    });
    const data = await res.json();

    if (data.success && data.matchFound) {
      const appt = data.appointment;
      resultBox.innerHTML = `
        <div style="border-left: 4px solid #10b981; padding-left: 0.75rem;">
          <h4 style="color: #34d399; margin-bottom: 0.35rem;">
            <i class="fa-solid fa-circle-check"></i> ${autoVerify ? "সফলভাবে মিলেছে ও অনুমোদিত হয়েছে!" : "মিল খুঁজে পাওয়া গেছে!"}
          </h4>
          <p style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.25rem;">
            <strong>TrxID:</strong> <code style="color: #38bdf8;">${data.parsed.trxId || appt.trxId}</code> |
            <strong>টাকা:</strong> ৳ ${data.parsed.amount || 500}
          </p>
          <p style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.65rem;">
            <strong>রোগী:</strong> ${appt.patientName} (${appt.phone}) — টোকেন: <strong>${appt.token}</strong>
          </p>
          ${!autoVerify ? `
            <button type="button" class="btn btn-approve" style="width: 100%;" onclick="verifyAppointment('${appt.token}')">
              <i class="fa-solid fa-check-circle"></i> এই বুকিংটি অনুমোদন করুন
            </button>
          ` : `
            <span style="font-size: 0.8rem; color: #6ee7b7; font-weight: bold;">✓ বুকিংটি তাৎক্ষণিকভাবে অনুমোদিত করা হয়েছে।</span>
          `}
        </div>
      `;
      fetchAppointments();
    } else {
      resultBox.innerHTML = `
        <div style="border-left: 4px solid #ef4444; padding-left: 0.75rem; color: #f87171;">
          <h4><i class="fa-solid fa-triangle-exclamation"></i> কোনো মিল পাওয়া যায়নি</h4>
          <p style="font-size: 0.82rem; margin-top: 0.25rem; color: #cbd5e1;">
            বিশ্লেষিত TrxID: <strong>${data.parsed ? data.parsed.trxId || 'নেই' : 'নেই'}</strong><br/>
            এই TrxID দিয়ে কোনো অপেক্ষমাণ বুকিং তালিকায় পাওয়া যায়নি।
          </p>
        </div>
      `;
    }
  } catch (err) {
    resultBox.innerHTML = `<p style="color: #ef4444;">সার্ভার সংযোগ ত্রুটি!</p>`;
  }
};

// Preset Sample SMS for Quick Testing
window.pasteSampleSms = function(type) {
  const smsInput = document.getElementById("sms-input");
  if (!smsInput) return;

  // Grab the first pending appointment if available
  const pending = appointments.find(a => a.status === 'pending');
  const trx = pending ? pending.trxId : "9J76KL2M89";
  const phone = pending ? pending.phone : "01712345678";

  if (type === 'bkash') {
    smsInput.value = `You have received Tk 500.00 from ${phone}. Fee Tk 0.00. Balance Tk 1500.00. TrxID ${trx} at 12/10/2026 17:30`;
  } else if (type === 'nagad') {
    smsInput.value = `Cash In Tk 500.00 from ${phone} successful. TxnID: ${trx}. Balance Tk 2300.00. Date 12/10/2026 17:35`;
  }
};

// Helpers
window.copyText = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("কপি করা হয়েছে: " + text);
  });
};

function showToast(msg) {
  const toast = document.getElementById("app-toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function formatTimeAgo(dateStr) {
  if (!dateStr) return "কিছুক্ষণ আগে";
  const diff = Math.floor((new Date() - new Date(dateStr)) / 1000);
  if (diff < 60) return "এইমাত্র";
  if (diff < 3600) return `${Math.floor(diff / 60)} মিনিট আগে`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ঘণ্টা আগে`;
  return `${Math.floor(diff / 86400)} দিন আগে`;
}
