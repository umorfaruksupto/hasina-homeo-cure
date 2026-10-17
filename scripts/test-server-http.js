const http = require('http');

const endpoints = [
  '/',
  '/districts.html',
  '/districts',
  '/zilla/dhaka.html',
  '/zilla/dhaka',
  '/zilla/sylhet',
  '/sitemap.xml',
  '/robots.txt'
];

async function checkUrl(path) {
  return new Promise((resolve) => {
    http.get({ host: 'localhost', port: 3000, path }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          length: data.length
        });
      });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

(async () => {
  console.log('Testing server endpoints...');
  for (const ep of endpoints) {
    const res = await checkUrl(ep);
    if (res.statusCode === 200) {
      console.log(`[OK] 200 - ${ep} (${res.contentType}, size: ${res.length} bytes)`);
    } else {
      console.error(`[ERROR] ${ep} - ${JSON.stringify(res)}`);
    }
  }
})();
