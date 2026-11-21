/**
 * scripts/submit-indexnow.mjs
 * 
 * Submits all canonical URLs from sitemap.xml to the IndexNow API (Bing, DuckDuckGo, etc.).
 * Single JSON POST payload with host, key, keyLocation, and urlList.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const INDEXNOW_KEY = 'c748e89f64bf452097e889a721c0e395';
const HOST = 'mybwn.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const SITEMAP_PATH = path.join(ROOT_DIR, 'public', 'sitemap.xml');

async function submitIndexNow() {
  console.log('🚀 [indexnow] Initiating IndexNow Instant Indexing Protocol...');

  // 1. Verify key file exists in public/
  const keyFilePath = path.join(ROOT_DIR, 'public', `${INDEXNOW_KEY}.txt`);
  if (!fs.existsSync(keyFilePath)) {
    throw new Error(`IndexNow key file missing at ${keyFilePath}`);
  }
  console.log(`🔑 Key verified: ${INDEXNOW_KEY} (${KEY_LOCATION})`);

  // 2. Read all URLs from sitemap.xml
  if (!fs.existsSync(SITEMAP_PATH)) {
    throw new Error(`Sitemap file missing at ${SITEMAP_PATH}. Run 'npm run build' first.`);
  }

  const sitemapXml = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const locRegex = /<loc>(https:\/\/mybwn\.com[^<]*)<\/loc>/g;
  const urlList = [];

  let match;
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    urlList.push(match[1]);
  }

  if (urlList.length === 0) {
    throw new Error(`No URLs found in sitemap: ${SITEMAP_PATH}`);
  }

  console.log(`📋 Found ${urlList.length} canonical URLs in sitemap to submit.`);

  // 3. Prepare IndexNow payload
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  };

  const endpoints = [
    { name: 'IndexNow Central (api.indexnow.org)', url: 'https://api.indexnow.org/indexnow' },
    { name: 'Microsoft Bing (www.bing.com)', url: 'https://www.bing.com/indexnow' }
  ];

  for (const endpoint of endpoints) {
    console.log(`📡 Submitting ${urlList.length} URLs to ${endpoint.name}...`);
    try {
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      console.log(`   HTTP Status: ${response.status} ${response.statusText}`);
      if (response.status === 200) {
        console.log(`   ✅ Success! (${response.status}) URLs submitted and verified.`);
      } else if (response.status === 202) {
        console.log(`   ✅ Accepted (${response.status}): URLs queued for immediate index refresh.`);
      } else {
        const text = await response.text();
        console.warn(`   ⚠️ Response: ${text}`);
      }
    } catch (err) {
      console.error(`   ❌ Failed to submit to ${endpoint.name}:`, err.message);
    }
  }

  console.log('🎉 [indexnow] IndexNow submission complete!');
}

submitIndexNow().catch(err => {
  console.error('❌ [indexnow] Error:', err);
  process.exit(1);
});
