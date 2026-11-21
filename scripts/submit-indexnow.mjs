/**
 * scripts/submit-indexnow.mjs
 * 
 * Submits all canonical URLs from sitemap.xml to the IndexNow API (Bing, DuckDuckGo, Yahoo, Yandex).
 * Single JSON POST payload with host, key, keyLocation, and urlList.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const INDEXNOW_KEY = '8cda1384e8384b829deff94f3042ac5c';
const HOST = 'mybwn.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

// Locate sitemap.xml in public/ or dist/
function getSitemapPath() {
  const publicPath = path.join(ROOT_DIR, 'public', 'sitemap.xml');
  const distPath = path.join(ROOT_DIR, 'dist', 'sitemap.xml');
  if (fs.existsSync(publicPath)) return publicPath;
  if (fs.existsSync(distPath)) return distPath;
  throw new Error(`Sitemap file not found at ${publicPath} or ${distPath}. Run build first.`);
}

async function submitIndexNow() {
  console.log('🚀 [indexnow] Initiating IndexNow Instant Indexing Protocol...');

  // 1. Verify key file exists
  const keyFilePath = path.join(ROOT_DIR, 'public', `${INDEXNOW_KEY}.txt`);
  if (!fs.existsSync(keyFilePath)) {
    throw new Error(`IndexNow key file missing at ${keyFilePath}`);
  }
  const keyContent = fs.readFileSync(keyFilePath, 'utf8').trim();
  if (keyContent !== INDEXNOW_KEY) {
    throw new Error(`Key file content "${keyContent}" does not match expected key "${INDEXNOW_KEY}"`);
  }
  console.log(`🔑 Key verified: ${INDEXNOW_KEY} (${KEY_LOCATION})`);

  // 2. Read all URLs from sitemap.xml
  const sitemapPath = getSitemapPath();
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const locRegex = /<loc>(https:\/\/mybwn\.com[^<]*)<\/loc>/g;
  const urlList = [];

  let match;
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    urlList.push(match[1]);
  }

  if (urlList.length === 0) {
    throw new Error(`No URLs found in sitemap: ${sitemapPath}`);
  }

  console.log(`📋 Found ${urlList.length} canonical URLs in sitemap to submit.`);

  // Chunk in batches of 10,000 URLs as required by IndexNow protocol
  const CHUNK_SIZE = 10000;
  const chunks = [];
  for (let i = 0; i < urlList.length; i += CHUNK_SIZE) {
    chunks.push(urlList.slice(i, i + CHUNK_SIZE));
  }

  const endpointUrl = 'https://api.indexnow.org/indexnow';

  for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
    const chunk = chunks[chunkIdx];
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: chunk
    };

    console.log(`📡 Submitting batch ${chunkIdx + 1}/${chunks.length} (${chunk.length} URLs) to ${endpointUrl}...`);

    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const status = response.status;
    const statusText = response.statusText;
    console.log(`   HTTP Status: ${status} ${statusText}`);

    if (status === 200 || status === 202) {
      console.log(`   ✅ Success (${status}): ${chunk.length} URLs accepted by IndexNow Central!`);
    } else {
      const responseBody = await response.text();
      console.error(`   ❌ Failed with HTTP ${status} ${statusText}: ${responseBody}`);
      process.exitCode = 1;
      throw new Error(`IndexNow submission failed with HTTP status ${status} (${statusText}): ${responseBody}`);
    }
  }

  console.log('🎉 [indexnow] All URLs successfully submitted to IndexNow!');
}

submitIndexNow().catch(err => {
  console.error('❌ [indexnow] Error:', err.message || err);
  process.exit(1);
});
