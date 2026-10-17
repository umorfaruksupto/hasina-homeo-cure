const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('=== STARTING SEO VERIFICATION SUITE ===');

let pass = 0;
let fail = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    pass++;
  } else {
    console.error(`[FAIL] ${message}`);
    fail++;
  }
}

// 1. Verify 64 District HTML files exist
const zillaDir = path.join(__dirname, '..', 'zilla');
const zillaFiles = fs.readdirSync(zillaDir).filter(f => f.endsWith('.html'));
assert(zillaFiles.length === 64, `Found exactly 64 district HTML files (Found: ${zillaFiles.length})`);

// 2. Verify sample district files have valid JSON-LD
const sampleDistricts = ['dhaka.html', 'chattogram.html', 'sylhet.html', 'bogura.html', 'khulna.html', 'barishal.html'];
sampleDistricts.forEach(file => {
  const content = fs.readFileSync(path.join(zillaDir, file), 'utf8');
  assert(content.includes('<script type="application/ld+json">'), `${file} contains JSON-LD schema`);
  assert(content.includes('MedicalClinic'), `${file} includes MedicalClinic schema`);
  assert(content.includes('FAQPage'), `${file} includes FAQPage schema`);
  assert(content.includes('BreadcrumbList'), `${file} includes BreadcrumbList schema`);
  assert(content.includes('01721515546'), `${file} includes verified phone number`);

  // Extract JSON-LD and parse
  const match = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (match) {
    try {
      const parsed = JSON.parse(match[1]);
      assert(parsed['@context'] === 'https://schema.org', `${file} JSON-LD parses valid schema.org JSON`);
    } catch (err) {
      assert(false, `${file} JSON-LD JSON parse error: ${err.message}`);
    }
  }
});

// 3. Verify index.html Schema
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const indexJsonMatch = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(Boolean(indexJsonMatch), 'index.html contains JSON-LD structured data');
if (indexJsonMatch) {
  try {
    const parsedIndex = JSON.parse(indexJsonMatch[1]);
    assert(parsedIndex['@graph'].length >= 3, `index.html contains multiple rich graph entities (found ${parsedIndex['@graph'].length})`);
  } catch (err) {
    assert(false, `index.html JSON-LD parse error: ${err.message}`);
  }
}
assert(indexHtml.includes('districts.html'), 'index.html includes internal link to districts.html');
assert(indexHtml.includes('zilla/dhaka.html'), 'index.html includes internal link to zilla/dhaka.html');
assert(indexHtml.includes('nationwide-section'), 'index.html includes 64 zilla nationwide coverage section');

// 4. Verify districts.html exists and links to 64 districts
const districtsHtml = fs.readFileSync(path.join(__dirname, '..', 'districts.html'), 'utf8');
assert(districtsHtml.includes('৬৪ জেলায়'), 'districts.html contains 64 district title');
let allDistrictsLinked = true;
zillaFiles.forEach(f => {
  if (!districtsHtml.includes(`zilla/${f}`)) {
    allDistrictsLinked = false;
  }
});
assert(allDistrictsLinked, 'districts.html links to all 64 district HTML pages');

// 5. Verify sitemap.xml
const sitemap = fs.readFileSync(path.join(__dirname, '..', 'sitemap.xml'), 'utf8');
const urlCount = (sitemap.match(/<loc>/g) || []).length;
assert(urlCount === 66, `sitemap.xml contains 66 indexed URLs (Home + Hub + 64 Districts, found: ${urlCount})`);
assert(sitemap.includes('https://hasinahomeocure.com/zilla/dhaka.html'), 'sitemap.xml includes dhaka landing page');

// 6. Verify robots.txt
const robots = fs.readFileSync(path.join(__dirname, '..', 'robots.txt'), 'utf8');
assert(robots.includes('Sitemap: https://hasinahomeocure.com/sitemap.xml'), 'robots.txt points to sitemap.xml');
assert(robots.includes('Disallow: /api/'), 'robots.txt disallows private api');

console.log(`\nVerification finished: ${pass} PASSED, ${fail} FAILED.`);
if (fail > 0) {
  process.exit(1);
} else {
  console.log('ALL SEO CHECKS PASSED PERFECTLY!');
}
