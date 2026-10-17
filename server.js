const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'appointments.json');

// Ensure data folder and file exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

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

// Helper: Parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// Helper: Send JSON response
function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(payload));
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  // Enable CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  const [rawUrl, queryString] = req.url.split('?');
  const urlPath = decodeURI(rawUrl);

  // ----------------------------------------------------------------
  // REST API ROUTING
  // ----------------------------------------------------------------

  // GET /api/appointments - List appointments
  if (urlPath === '/api/appointments' && req.method === 'GET') {
    const appointments = readAppointments();
    const params = new URLSearchParams(queryString || '');
    const statusFilter = params.get('status');
    const search = (params.get('search') || '').toLowerCase().trim();

    let filtered = [...appointments].reverse(); // latest first

    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(a => a.status === statusFilter);
    }
    if (search) {
      filtered = filtered.filter(a =>
        (a.patientName && a.patientName.toLowerCase().includes(search)) ||
        (a.phone && a.phone.includes(search)) ||
        (a.trxId && a.trxId.toLowerCase().includes(search)) ||
        (a.token && a.token.toLowerCase().includes(search))
      );
    }

    sendJson(res, 200, {
      success: true,
      count: filtered.length,
      appointments: filtered
    });
    return;
  }

  // GET /api/appointments/:token/status - Check status for patient polling
  const statusMatch = urlPath.match(/^\/api\/appointments\/([A-Za-z0-9\-]+)\/status$/);
  if (statusMatch && req.method === 'GET') {
    const token = statusMatch[1].toUpperCase();
    const appointments = readAppointments();
    const appt = appointments.find(a => a.token.toUpperCase() === token);

    if (!appt) {
      sendJson(res, 404, { success: false, error: 'Appointment not found' });
      return;
    }

    sendJson(res, 200, {
      success: true,
      token: appt.token,
      status: appt.status,
      amount: appt.amount,
      paymentMethod: appt.paymentMethod,
      trxId: appt.trxId,
      patientName: appt.patientName,
      date: appt.date,
      timeSlot: appt.timeSlot,
      createdAt: appt.createdAt,
      verifiedAt: appt.verifiedAt,
      note: appt.note,
      whatsappUnlocked: appt.status === 'verified',
      whatsappNumber: '+8801862879156'
    });
    return;
  }

  // POST /api/appointments - Create booking and submit payment for verification
  if (urlPath === '/api/appointments' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      if (!data.patientName || !data.phone || !data.trxId) {
        sendJson(res, 400, {
          success: false,
          error: 'Missing required fields: patientName, phone, or trxId'
        });
        return;
      }

      const appointments = readAppointments();

      // Check if duplicate TrxID exists
      const existing = appointments.find(
        a => a.trxId.toLowerCase() === data.trxId.trim().toLowerCase()
      );
      if (existing && existing.status === 'verified') {
        sendJson(res, 400, {
          success: false,
          error: 'This Transaction ID (TrxID) has already been used and verified.'
        });
        return;
      }

      // Generate unique serial code e.g. HHC-XXXX
      let serialCode = 'HHC-' + Math.floor(1000 + Math.random() * 9000);
      while (appointments.some(a => (a.serialCode === serialCode || a.token === serialCode))) {
        serialCode = 'HHC-' + Math.floor(1000 + Math.random() * 9000);
      }
      let token = serialCode;

      // Check for instant test auto-verification trigger (e.g. if TrxID is "TEST..." or "DEMO500")
      const isTestAuto =
        data.trxId.toUpperCase().startsWith('TEST') ||
        data.trxId.toUpperCase().startsWith('AUTO') ||
        data.trxId.toUpperCase() === 'DEMO500';

      const newAppointment = {
        serialCode,
        token,
        patientName: data.patientName.trim(),
        phone: data.phone.trim(),
        senderPhone: (data.senderPhone || data.phone).trim(),
        age: data.age || 'N/A',
        gender: data.gender || 'মহিলা',
        consultType: data.consultType || 'চেম্বারে সরাসরি সাক্ষাত',
        problem: data.problem || 'সাধারণ পরামর্শ',
        date: data.date || new Date().toISOString().split('T')[0],
        timeSlot: data.timeSlot || 'বিকাল ৪:৩০ - ৫:০০ টা',
        paymentMethod: data.paymentMethod || 'bKash',
        trxId: data.trxId.trim(),
        amount: 500,
        status: isTestAuto ? 'verified' : 'pending',
        createdAt: new Date().toISOString(),
        verifiedAt: isTestAuto ? new Date().toISOString() : null,
        note: isTestAuto ? 'Auto-verified (Demo/Test TrxID)' : (data.notes || '')
      };

      appointments.push(newAppointment);
      saveAppointments(appointments);

      sendJson(res, 201, {
        success: true,
        serialCode: newAppointment.serialCode,
        token: newAppointment.token,
        status: newAppointment.status,
        whatsappUnlocked: newAppointment.status === 'verified',
        whatsappNumber: '+8801862879156',
        appointment: newAppointment
      });
      return;
    } catch (err) {
      sendJson(res, 500, { success: false, error: err.message });
      return;
    }
  }

  // POST /api/appointments/verify - Admin/Doctor verification from Mobile App
  if (urlPath === '/api/appointments/verify' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const token = (data.token || '').toUpperCase().trim();
      const action = data.action; // 'verify' or 'reject'

      if (!token || !action) {
        sendJson(res, 400, {
          success: false,
          error: 'Token and action (verify/reject) are required'
        });
        return;
      }

      const appointments = readAppointments();
      const appt = appointments.find(a => a.token.toUpperCase() === token);

      if (!appt) {
        sendJson(res, 404, { success: false, error: 'Appointment not found' });
        return;
      }

      if (action === 'verify') {
        appt.status = 'verified';
        appt.verifiedAt = new Date().toISOString();
        appt.note = data.note || 'Verified via Hasina Homeo Mobile App';
      } else if (action === 'reject') {
        appt.status = 'rejected';
        appt.verifiedAt = null;
        appt.rejectedAt = new Date().toISOString();
        appt.note = data.note || 'Transaction ID invalid or mismatch';
      } else {
        sendJson(res, 400, { success: false, error: 'Invalid action. Must be verify or reject' });
        return;
      }

      saveAppointments(appointments);

      sendJson(res, 200, {
        success: true,
        token: appt.token,
        status: appt.status,
        appointment: appt
      });
      return;
    } catch (err) {
      sendJson(res, 500, { success: false, error: err.message });
      return;
    }
  }

  // POST /api/sms/match - Auto-match incoming bKash/Nagad SMS text
  if (urlPath === '/api/sms/match' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const sms = (data.smsText || '').trim();

      if (!sms) {
        sendJson(res, 400, { success: false, error: 'SMS text is required' });
        return;
      }

      // Regex patterns for Bangladeshi mobile wallets
      // bKash: "You have received Tk 500.00 from 017xxxxxxxx. ... TrxID 9J76KL2M89 ..."
      // Nagad: "Cash In Tk 500.00 from 017xxxxxxxx ... TxnID: 72H8KD9"
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
          a => a.trxId.toLowerCase() === parsedTrxId.toLowerCase()
        );
      }
      if (!matchedAppt && parsedPhone) {
        // match by sender phone among pending bookings
        matchedAppt = appointments.find(
          a => a.status === 'pending' && (a.phone.includes(parsedPhone) || a.senderPhone.includes(parsedPhone))
        );
      }

      if (matchedAppt) {
        // If requested to auto-verify immediately
        if (data.autoVerify) {
          matchedAppt.status = 'verified';
          matchedAppt.verifiedAt = new Date().toISOString();
          matchedAppt.note = `Auto-matched & Verified via SMS (TrxID: ${parsedTrxId || matchedAppt.trxId})`;
          saveAppointments(appointments);
        }

        sendJson(res, 200, {
          success: true,
          matchFound: true,
          parsed: { trxId: parsedTrxId, phone: parsedPhone, amount: parsedAmount },
          appointment: matchedAppt
        });
      } else {
        sendJson(res, 200, {
          success: true,
          matchFound: false,
          parsed: { trxId: parsedTrxId, phone: parsedPhone, amount: parsedAmount },
          message: 'No pending booking found matching this SMS'
        });
      }
      return;
    } catch (err) {
      sendJson(res, 500, { success: false, error: err.message });
      return;
    }
  }

  // ----------------------------------------------------------------
  // STATIC FILE ROUTING
  // ----------------------------------------------------------------
  let safePath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, '');
  
  // Route /payment-app to /payment-app/index.html
  if (safePath === '/payment-app' || safePath === '\\payment-app' || safePath === '/payment-app/' || safePath === '\\payment-app\\') {
    safePath = '/payment-app/index.html';
  } else if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  let filePath = path.join(__dirname, safePath);

  // Clean URL support: if no file extension, check if [filePath].html exists
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + safePath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Hasina Homeo Cure is running live at http://localhost:${PORT}`);
  console.log(`Mobile Payment App is accessible at http://localhost:${PORT}/payment-app`);
});
