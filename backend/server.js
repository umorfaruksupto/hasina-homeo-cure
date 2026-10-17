const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'appointments.json');

// Ensure data folder and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle JSON syntax error gracefully without crashing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, error: 'Malformed JSON payload' });
  }
  next(err);
});

// Helper: Read appointments
function readAppointments() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error reading appointments:', err);
    return [];
  }
}

// Helper: Save appointments
function saveAppointments(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving appointments:', err);
    return false;
  }
}

// -------------------------------------------------------------
// HEALTH CHECK (For Render.com Zero-Downtime Monitoring)
// -------------------------------------------------------------
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Hasina Homeo Cure API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Hasina Homeo Cure Backend API',
    doctor: 'Dr. Samsunnahar Sneho (DHMS, Reg: 38275)',
    status: 'running',
    endpoints: {
      health: 'GET /health',
      appointments: 'GET /api/appointments',
      createBooking: 'POST /api/appointments',
      statusCheck: 'GET /api/appointments/:token/status',
      verifyAction: 'PATCH /api/appointments/:token',
      smsMatcher: 'POST /api/sms/match'
    }
  });
});

// -------------------------------------------------------------
// REST API ENDPOINTS
// -------------------------------------------------------------

// GET /api/appointments - List appointments (for doctor verification mobile app)
app.get('/api/appointments', (req, res) => {
  try {
    const appointments = readAppointments();
    const statusFilter = req.query.status;
    const search = (req.query.search || '').toLowerCase().trim();

    let filtered = [...appointments].reverse(); // latest first

    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(a => a.status === statusFilter);
    }
    if (search) {
      filtered = filtered.filter(a =>
        (a.patientName && a.patientName.toLowerCase().includes(search)) ||
        (a.name && a.name.toLowerCase().includes(search)) ||
        (a.phone && a.phone.includes(search)) ||
        (a.senderPhone && a.senderPhone.includes(search)) ||
        (a.senderNumber && a.senderNumber.includes(search)) ||
        (a.trxId && a.trxId.toLowerCase().includes(search)) ||
        (a.serialCode && a.serialCode.toLowerCase().includes(search)) ||
        (a.token && a.token.toLowerCase().includes(search))
      );
    }

    res.status(200).json({
      success: true,
      count: filtered.length,
      appointments: filtered,
      data: filtered
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/appointments/:token/status - Check status for patient polling
app.get('/api/appointments/:token/status', (req, res) => {
  try {
    const token = req.params.token.toUpperCase();
    const appointments = readAppointments();
    const appt = appointments.find(a => 
      (a.serialCode && a.serialCode.toUpperCase() === token) || 
      (a.token && a.token.toUpperCase() === token)
    );

    if (!appt) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }

    res.status(200).json({
      success: true,
      serialCode: appt.serialCode || appt.token,
      token: appt.token || appt.serialCode,
      status: appt.status,
      amount: appt.amount || 500,
      paymentMethod: appt.paymentMethod || 'bKash',
      trxId: appt.trxId,
      patientName: appt.patientName || appt.name,
      phone: appt.phone,
      senderPhone: appt.senderPhone || appt.senderNumber || appt.phone,
      name: appt.patientName || appt.name,
      date: appt.date || appt.preferredDate,
      timeSlot: appt.timeSlot || appt.preferredTime,
      createdAt: appt.createdAt || appt.submittedAt,
      verifiedAt: appt.verifiedAt,
      note: appt.note,
      whatsappUnlocked: appt.status === 'verified',
      whatsappNumber: '+8801862879156',
      whatsappLink: 'https://wa.me/8801862879156?text=' + encodeURIComponent('আসসালামু আলাইকুম ডাঃ সামসুন্নাহার স্নেহ। আমার সিরিয়াল কোড: ' + (appt.serialCode || appt.token) + '। ফি ভেরিফাইড হয়েছে।')
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/appointments - Submit patient appointment & payment TrxID
app.post('/api/appointments', (req, res) => {
  try {
    const data = req.body;
    const patientName = (data.patientName || data.name || '').trim();
    const phone = (data.phone || '').trim();
    const trxId = (data.trxId || '').trim();

    if (!patientName || !phone || !trxId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: patientName (or name), phone, or trxId'
      });
    }

    const appointments = readAppointments();

    // Check duplicate verified TrxID
    const existing = appointments.find(
      a => a.trxId && a.trxId.toLowerCase() === trxId.toLowerCase()
    );
    if (existing && existing.status === 'verified') {
      return res.status(400).json({
        success: false,
        error: 'এই ট্রানজেকশন আইডিটি (TrxID) ইতিপূর্বে ব্যবহৃত এবং ভেরিফাই করা হয়েছে।'
      });
    }

    // Generate unique serial code e.g. HHC-XXXX
    let serialCode = 'HHC-' + Math.floor(1000 + Math.random() * 9000);
    while (appointments.some(a => (a.serialCode === serialCode || a.token === serialCode))) {
      serialCode = 'HHC-' + Math.floor(1000 + Math.random() * 9000);
    }
    const token = serialCode;

    // Auto verify test keys if desired
    const isTestAuto =
      trxId.toUpperCase().startsWith('TEST') ||
      trxId.toUpperCase() === 'DEMO500' ||
      trxId.toUpperCase() === 'INSTANT';

    const newAppointment = {
      serialCode,
      token,
      patientName,
      name: patientName,
      phone,
      senderPhone: (data.senderPhone || data.senderNumber || phone).trim(),
      senderNumber: (data.senderPhone || data.senderNumber || phone).trim(),
      district: data.district || 'ঢাকা',
      age: data.age || '',
      gender: data.gender || 'মহিলা',
      consultType: data.consultType || data.consultationType || 'অনলাইন ভিডিও কল',
      consultationType: data.consultType || data.consultationType || 'online',
      problem: data.problem || 'সাধারণ পরামর্শ',
      date: data.date || data.preferredDate || new Date().toISOString().split('T')[0],
      preferredDate: data.date || data.preferredDate || new Date().toISOString().split('T')[0],
      timeSlot: data.timeSlot || data.preferredTime || 'বিকাল ৪:৩০ - ৫:০০ টা',
      preferredTime: data.timeSlot || data.preferredTime || 'বিকাল ৪:৩০ - ৫:০০ টা',
      paymentMethod: data.paymentMethod || 'bKash',
      amount: data.amount ? parseFloat(data.amount) : 500,
      trxId,
      status: isTestAuto ? 'verified' : 'pending',
      createdAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      verifiedAt: isTestAuto ? new Date().toISOString() : null,
      note: isTestAuto ? 'Auto-approved for instant demo test' : ''
    };

    appointments.push(newAppointment);
    saveAppointments(appointments);

    res.status(201).json({
      success: true,
      message: 'সিরিয়াল সফলভাবে নিবন্ধিত হয়েছে',
      serialCode: newAppointment.serialCode,
      token: newAppointment.token,
      status: newAppointment.status,
      whatsappUnlocked: newAppointment.status === 'verified',
      whatsappNumber: '+8801862879156',
      appointment: newAppointment
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/appointments/:token - Doctor Approve or Reject payment
app.patch('/api/appointments/:token', (req, res) => {
  try {
    const token = req.params.token.toUpperCase();
    const { status, note } = req.body;

    if (!['verified', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be "verified", "rejected", or "pending"'
      });
    }

    const appointments = readAppointments();
    const appt = appointments.find(a => 
      (a.serialCode && a.serialCode.toUpperCase() === token) || 
      (a.token && a.token.toUpperCase() === token)
    );

    if (!appt) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }

    appt.status = status;
    if (status === 'verified') {
      appt.verifiedAt = new Date().toISOString();
    }
    if (note !== undefined) {
      appt.note = note;
    }

    saveAppointments(appointments);

    res.status(200).json({
      success: true,
      message: `Appointment ${token} status updated to ${status}`,
      appointment: appt
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/sms/match - Auto-match bKash/Nagad SMS text
app.post('/api/sms/match', (req, res) => {
  try {
    const sms = (req.body.sms || req.body.smsText || '').trim();
    const autoVerify = req.body.autoVerify !== false; // default true
    if (!sms) {
      return res.status(400).json({ success: false, matched: false, message: 'এসএমএস টেক্সট প্রদান করা আবশ্যক (SMS text is required)' });
    }

    // Match patterns
    const trxMatch = sms.match(/(?:TrxID|TxnID|Transaction ID|ID)\s*[:\s]?\s*([A-Za-z0-9]{6,16})/i);
    const phoneMatch = sms.match(/(01[3-9]\d{8})/);
    const amountMatch = sms.match(/(?:Tk|৳)\.?\s*([\d,]+(?:\.\d{2})?)/i);

    const parsedTrxId = trxMatch ? trxMatch[1] : null;
    const parsedPhone = phoneMatch ? phoneMatch[1] : null;
    const parsedAmount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : null;

    const appointments = readAppointments();
    let matchedAppt = null;

    if (parsedTrxId) {
      matchedAppt = appointments.find(
        a => a.trxId && a.trxId.toLowerCase() === parsedTrxId.toLowerCase()
      );
    }
    if (!matchedAppt && parsedPhone) {
      matchedAppt = appointments.find(
        a => a.status === 'pending' && (
          (a.phone && a.phone.includes(parsedPhone)) ||
          (a.senderPhone && a.senderPhone.includes(parsedPhone)) ||
          (a.senderNumber && a.senderNumber.includes(parsedPhone))
        )
      );
    }

    if (matchedAppt) {
      if (autoVerify) {
        matchedAppt.status = 'verified';
        matchedAppt.verifiedAt = new Date().toISOString();
        matchedAppt.note = `Auto-matched & Verified via SMS (TrxID: ${parsedTrxId || matchedAppt.trxId})`;
        saveAppointments(appointments);
      }

      res.status(200).json({
        success: true,
        matched: true,
        matchFound: true,
        message: `সফলভাবে ম্যাচ এবং অনুমোদন সম্পন্ন হয়েছে! টোকেন: ${matchedAppt.token} (${matchedAppt.patientName || matchedAppt.name})`,
        extracted: { trxId: parsedTrxId, sender: parsedPhone, amount: parsedAmount },
        parsed: { trxId: parsedTrxId, phone: parsedPhone, amount: parsedAmount },
        appointment: matchedAppt
      });
    } else {
      res.status(200).json({
        success: true,
        matched: false,
        matchFound: false,
        message: parsedTrxId 
          ? `TrxID "${parsedTrxId}" এর জন্য কোনো অ্যাপয়েন্টমেন্ট পাওয়া যায়নি।` 
          : 'এসএমএস থেকে কোনো বৈধ TrxID বা মোবাইল নম্বর সনাক্ত করা যায়নি।',
        extracted: { trxId: parsedTrxId, sender: parsedPhone, amount: parsedAmount },
        parsed: { trxId: parsedTrxId, phone: parsedPhone, amount: parsedAmount }
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, matched: false, error: err.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// Process-level safety guards
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start listening
app.listen(PORT, () => {
  console.log(`Hasina Homeo Cure Render-Ready Backend listening on port ${PORT}`);
  console.log(`Healthcheck URL: http://localhost:${PORT}/health`);
});
