/**
 * scripts/generate-pinterest-pack.ts
 * 
 * Automates Stage 7 Pinterest Organic Traffic Campaign:
 * 1. Generates 60 high-resolution (1000x1500 px) vertical Pinterest study cards as PNGs
 *    (30 essential HSK 1–3 vocabulary words + 30 core grammar rules)
 * 2. Saves PNGs to public/pins/ and pinterest-export/pins/
 * 3. Generates the official Pinterest Bulk Upload CSV (pinterest-export/pinterest-bulk-upload.csv)
 * 4. Generates the official Pinterest RSS 2.0 Auto-Publishing Feed (public/pinterest-feed.xml & dist/pinterest-feed.xml)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

import { allVocabWithSlugs, getSharedCharacterFamily, type VocabItemWithSlug } from '../src/data/vocab-helpers.ts';
import { all88GrammarRules, type EnrichedGrammarRule } from '../src/data/grammar-helpers.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_PINS_DIR = path.resolve(ROOT_DIR, 'public', 'pins');
const EXPORT_DIR = path.resolve(ROOT_DIR, 'pinterest-export');
const EXPORT_PINS_DIR = path.resolve(EXPORT_DIR, 'pins');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const DIST_PINS_DIR = path.resolve(DIST_DIR, 'pins');

// Ensure output directories exist
[PUBLIC_PINS_DIR, EXPORT_DIR, EXPORT_PINS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});
if (fs.existsSync(DIST_DIR) && !fs.existsSync(DIST_PINS_DIR)) {
  fs.mkdirSync(DIST_PINS_DIR, { recursive: true });
}

function escapeXml(unsafe: string | null | undefined): string {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text: string, maxCharsPerLine: number = 38): string[] {
  if (!text) return [];
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + (currentLine ? ' ' : '') + word).length <= maxCharsPerLine) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function getToneInfo(pinyin: string): string {
  if (/[āēīōūǖ]/.test(pinyin)) return 'Tone 1 (High Flat)';
  if (/[áéíóúǘ]/.test(pinyin)) return 'Tone 2 (Rising)';
  if (/[ǎěǐǒǔǚ]/.test(pinyin)) return 'Tone 3 (Dipping)';
  if (/[àèìòùǜ]/.test(pinyin)) return 'Tone 4 (Falling)';
  return 'Neutral Tone';
}

// -------------------------------------------------------------
// 1. Curate 30 Vocabulary Words & 30 Grammar Rules
// -------------------------------------------------------------
const selectedWordSlugs = [
  // HSK 1 (10 words)
  'ai-love', 'xiexie', 'pengyou', 'chi', 'he-drink',
  'beijing', 'zhongguo', 'xuexi', 'pingguo', 'zaijian',
  // HSK 2 (10 words)
  'bangzhu', 'zhunbei', 'jieshao', 'lvyou', 'shijian',
  'shenti', 'yundong-sports', 'gaoxing', 'xiwang', 'shiqing',
  // HSK 3 (10 words)
  'congming', 'jiejue', 'nuli', 'huanjing', 'jiankang',
  'xiguan', 'tigao', 'yingxiang', 'lishi', 'wenhua'
];

const selectedGrammarSlugs = [
  // HSK 1 (10 rules)
  'question-particle-ma', 'possession-particle-de', 'statement-shi-identity',
  'listing-conjunction-he', 'asking-price-duoshao-qian', 'exclamation-excess-tai-le',
  'adjective-predicates-without-shi', 'continuous-particle-ne-query',
  'spatial-location-zai-fangwei', 'negation-with-bu-and-mei',
  // HSK 2 (10 rules)
  'comparison-bi', 'experiential-marker-guo', 'relative-distance-li-yuan-jin',
  'prohibitive-imperative-bie', 'future-imminence-kuai-yao-le', 'change-of-situation-le',
  'concession-suiran-danshi', 'action-in-progress-zhengzai', 'descriptive-complement-de',
  'cause-and-effect-yinwei-suoyi',
  // HSK 3 (10 rules)
  'ba-sentence-structure', 'yue-lai-yue', 'hypothetical-ruguo-jiu',
  'proportional-yue-yue', 'compound-linkage-bujin-erqie', 'simultaneous-yibian-yibian',
  'passive-bei-structure', 'extreme-emphasis-lian-dou', 'adverbial-manner-particle-de',
  'rhetorical-question-bushi-ma'
];

const curatedWords: VocabItemWithSlug[] = selectedWordSlugs.map(slug => {
  const item = allVocabWithSlugs.find(v => v.slug === slug);
  if (!item) throw new Error(`Word slug not found: ${slug}`);
  return item;
});

const curatedGrammar: EnrichedGrammarRule[] = selectedGrammarSlugs.map(slug => {
  const item = all88GrammarRules.find(g => g.slug === slug);
  if (!item) throw new Error(`Grammar slug not found: ${slug}`);
  return item;
});

// -------------------------------------------------------------
// 2. SVG Generator for Vocabulary Study Card (1000x1500)
// -------------------------------------------------------------
function generateVocabSvg(word: VocabItemWithSlug): string {
  const isL1 = word.level === 1;
  const isL2 = word.level === 2;
  const badgeColor = isL1 ? '#059669' : (isL2 ? '#0284c7' : '#e11d48');
  const badgeDark = isL1 ? '#047857' : (isL2 ? '#0369a1' : '#be123c');
  const badgeText = isL1 ? '#ffffff' : '#ffffff';
  const pillBg = isL1 ? '#ecfdf5' : (isL2 ? '#f0f9ff' : '#fff1f2');
  const pillStroke = isL1 ? '#a7f3d0' : (isL2 ? '#bae6fd' : '#fecdd3');
  const pillText = isL1 ? '#065f46' : (isL2 ? '#075985' : '#9f1239');
  const accentTone = isL1 ? '#059669' : (isL2 ? '#0284c7' : '#e11d48');

  const toneName = getToneInfo(word.pinyin);
  const familyWords = getSharedCharacterFamily(word, 2).map(f => f.word);

  const hanziFontSize = word.hanzi.length > 2 ? 150 : (word.hanzi.length > 1 ? 175 : 210);

  // Wrap example if needed
  const exampleEnLines = wrapText(word.exampleEn, 42).slice(0, 2);

  return `
<svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffdfa"/>
      <stop offset="100%" stop-color="#f5f0e6"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#faf7f2"/>
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${badgeColor}"/>
      <stop offset="100%" stop-color="${badgeDark}"/>
    </linearGradient>
    <linearGradient id="darkHeader" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1c1917"/>
      <stop offset="100%" stop-color="#292524"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#1c1917" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1000" height="1500" fill="url(#bgGrad)"/>
  <rect x="30" y="30" width="940" height="1440" rx="36" fill="none" stroke="#e7e0d4" stroke-width="2"/>

  <!-- Top Header Bar -->
  <rect x="60" y="60" width="880" height="90" rx="24" fill="url(#darkHeader)"/>
  <text x="95" y="116" font-family="'Segoe UI', -apple-system, sans-serif" font-size="24" font-weight="900" fill="#f5f5f4" letter-spacing="2">HSK FREE LAB</text>
  <text x="300" y="116" font-family="'Segoe UI', -apple-system, sans-serif" font-size="20" font-weight="600" fill="#a8a29e">·  mybwn.com</text>
  
  <rect x="680" y="78" width="235" height="54" rx="16" fill="url(#badgeGrad)"/>
  <text x="797" y="113" font-family="'Segoe UI', -apple-system, sans-serif" font-size="20" font-weight="800" fill="${badgeText}" text-anchor="middle" letter-spacing="1">HSK ${word.level} STUDY CARD</text>

  <!-- Hero Main Card -->
  <rect x="60" y="180" width="880" height="470" rx="32" fill="url(#cardGrad)" stroke="#e7e0d4" stroke-width="2" filter="url(#shadow)"/>
  
  <!-- Hanzi Centerpiece -->
  <text x="500" y="380" font-family="'Microsoft YaHei', 'SimHei', 'Noto Sans SC', sans-serif" font-size="${hanziFontSize}" font-weight="900" fill="#1c1917" text-anchor="middle">${escapeXml(word.hanzi)}</text>
  
  <!-- Pinyin with tone marks -->
  <text x="500" y="465" font-family="'Segoe UI', 'Noto Sans SC', sans-serif" font-size="56" font-weight="800" fill="${accentTone}" text-anchor="middle" letter-spacing="1">${escapeXml(word.pinyin)}</text>

  <!-- English Meaning -->
  <text x="500" y="530" font-family="'Segoe UI', -apple-system, sans-serif" font-size="36" font-weight="700" fill="#292524" text-anchor="middle">${escapeXml(word.meaning)}</text>

  <!-- Tag Pills -->
  <g transform="translate(290, 565)">
    <rect x="0" y="0" width="130" height="42" rx="12" fill="${pillBg}" stroke="${pillStroke}" stroke-width="1.5"/>
    <text x="65" y="27" font-family="'Segoe UI', sans-serif" font-size="19" font-weight="700" fill="${pillText}" text-anchor="middle">${escapeXml(word.partOfSpeech || 'Word')}</text>

    <rect x="150" y="0" width="270" height="42" rx="12" fill="#faf5ff" stroke="#e9d5ff" stroke-width="1.5"/>
    <text x="285" y="27" font-family="'Segoe UI', sans-serif" font-size="19" font-weight="700" fill="#6b21a8" text-anchor="middle">${escapeXml(toneName)}</text>
  </g>

  <!-- Character Breakdown & Word Family Box -->
  <rect x="60" y="680" width="880" height="270" rx="28" fill="#ffffff" stroke="#e7e0d4" stroke-width="2" filter="url(#shadow)"/>
  <rect x="90" y="705" width="220" height="36" rx="10" fill="#f5f0e6"/>
  <text x="200" y="729" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="800" fill="#78716c" text-anchor="middle" letter-spacing="1">LEXICAL BREAKDOWN</text>

  <g transform="translate(90, 765)">
    <!-- Column 1: Radical -->
    <rect x="0" y="0" width="250" height="155" rx="18" fill="#faf7f2" stroke="#e7e0d4"/>
    <text x="25" y="42" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" fill="#a8a29e">Main Radical</text>
    <text x="25" y="105" font-family="'Microsoft YaHei', sans-serif" font-size="44" font-weight="900" fill="#1c1917">${escapeXml(word.radical || word.hanzi.charAt(0))}</text>

    <!-- Column 2: Stroke Count -->
    <rect x="280" y="0" width="250" height="155" rx="18" fill="#faf7f2" stroke="#e7e0d4"/>
    <text x="305" y="42" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" fill="#a8a29e">Stroke Count</text>
    <text x="305" y="105" font-family="'Segoe UI', sans-serif" font-size="44" font-weight="900" fill="#1c1917">${escapeXml(String(word.strokeCount || '—'))} <tspan font-size="20" font-weight="600" fill="#78716c">Strokes</tspan></text>

    <!-- Column 3: Word Family -->
    <rect x="560" y="0" width="240" height="155" rx="18" fill="#faf7f2" stroke="#e7e0d4"/>
    <text x="585" y="42" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" fill="#a8a29e">Related Family</text>
    ${familyWords.length > 0 ? `
    <text x="585" y="85" font-family="'Microsoft YaHei', sans-serif" font-size="22" font-weight="800" fill="${accentTone}">${escapeXml(familyWords[0].hanzi)} <tspan font-size="16" font-family="'Segoe UI'" fill="#78716c">(${escapeXml(familyWords[0].meaning.slice(0, 10))})</tspan></text>
    ${familyWords[1] ? `<text x="585" y="125" font-family="'Microsoft YaHei', sans-serif" font-size="22" font-weight="800" fill="${accentTone}">${escapeXml(familyWords[1].hanzi)} <tspan font-size="16" font-family="'Segoe UI'" fill="#78716c">(${escapeXml(familyWords[1].meaning.slice(0, 10))})</tspan></text>` : ''}
    ` : `
    <text x="585" y="95" font-family="'Segoe UI', sans-serif" font-size="20" font-weight="700" fill="#78716c">Single Hanzi Unit</text>
    `}
  </g>

  <!-- Example Sentence Box -->
  <rect x="60" y="980" width="880" height="340" rx="28" fill="#ffffff" stroke="#e7e0d4" stroke-width="2" filter="url(#shadow)"/>
  <rect x="90" y="1005" width="260" height="36" rx="10" fill="${pillBg}"/>
  <text x="220" y="1029" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="800" fill="${pillText}" text-anchor="middle" letter-spacing="1">PRACTICAL USAGE EXAMPLE</text>

  <!-- Chinese Sentence -->
  <text x="95" y="1095" font-family="'Microsoft YaHei', 'SimHei', sans-serif" font-size="42" font-weight="900" fill="#1c1917">${escapeXml(word.exampleZh)}</text>
  
  <!-- Pinyin Sentence -->
  <text x="95" y="1155" font-family="'Segoe UI', sans-serif" font-size="28" font-weight="700" fill="${accentTone}">${escapeXml(word.examplePy)}</text>

  <!-- English Sentence -->
  ${exampleEnLines.map((line, idx) => `
  <text x="95" y="${1210 + (idx * 34)}" font-family="'Segoe UI', sans-serif" font-size="26" font-weight="500" fill="#44403c">"${escapeXml(line)}"</text>
  `).join('')}

  <rect x="95" y="1275" width="810" height="1" fill="#e7e0d4"/>
  <text x="95" y="1304" font-family="'Segoe UI', sans-serif" font-size="19" font-weight="600" fill="#78716c">Tip: Practice this vocabulary item with native stroke order animations &amp; audio quizzes!</text>

  <!-- Bottom CTA Footer Bar -->
  <rect x="60" y="1350" width="880" height="90" rx="24" fill="url(#darkHeader)"/>
  <text x="100" y="1405" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="700" fill="#f5f5f4">🔊 Audio Pronunciation &amp; Interactive Quiz:</text>
  <text x="900" y="1405" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="800" fill="#fb7185" text-anchor="end">mybwn.com/words/${escapeXml(word.slug)} →</text>
</svg>
`;
}

// -------------------------------------------------------------
// 3. SVG Generator for Grammar Study Card (1000x1500)
// -------------------------------------------------------------
function generateGrammarSvg(rule: EnrichedGrammarRule): string {
  const isL1 = rule.level === 1;
  const isL2 = rule.level === 2;
  const badgeColor = isL1 ? '#059669' : (isL2 ? '#0284c7' : '#e11d48');
  const badgeDark = isL1 ? '#047857' : (isL2 ? '#0369a1' : '#be123c');
  const pillBg = isL1 ? '#ecfdf5' : (isL2 ? '#f0f9ff' : '#fff1f2');
  const pillStroke = isL1 ? '#a7f3d0' : (isL2 ? '#bae6fd' : '#fecdd3');
  const pillText = isL1 ? '#065f46' : (isL2 ? '#075985' : '#9f1239');
  const accentTone = isL1 ? '#059669' : (isL2 ? '#0284c7' : '#e11d48');

  // Title formatting
  const titleLines = wrapText(rule.title, 26).slice(0, 2);
  const explanationLines = wrapText(rule.explanation, 48).slice(0, 2);

  const ex1 = rule.examples[0] || { zh: '', py: '', en: '' };
  const ex2 = rule.examples[1] || rule.examples[0] || { zh: '', py: '', en: '' };

  const variations = rule.structuralVariations || {
    affirmative: rule.pattern,
    negative: 'S + 不 / 没 + V',
    question: 'Statement + 吗？'
  };

  return `
<svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffdfa"/>
      <stop offset="100%" stop-color="#f5f0e6"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#faf7f2"/>
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${badgeColor}"/>
      <stop offset="100%" stop-color="${badgeDark}"/>
    </linearGradient>
    <linearGradient id="darkHeader" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1c1917"/>
      <stop offset="100%" stop-color="#292524"/>
    </linearGradient>
    <linearGradient id="formulaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#1c1917" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1000" height="1500" fill="url(#bgGrad)"/>
  <rect x="30" y="30" width="940" height="1440" rx="36" fill="none" stroke="#e7e0d4" stroke-width="2"/>

  <!-- Top Header Bar -->
  <rect x="60" y="60" width="880" height="90" rx="24" fill="url(#darkHeader)"/>
  <text x="95" y="116" font-family="'Segoe UI', -apple-system, sans-serif" font-size="24" font-weight="900" fill="#f5f5f4" letter-spacing="2">HSK FREE LAB</text>
  <text x="300" y="116" font-family="'Segoe UI', -apple-system, sans-serif" font-size="20" font-weight="600" fill="#a8a29e">·  mybwn.com</text>
  
  <rect x="660" y="78" width="255" height="54" rx="16" fill="url(#badgeGrad)"/>
  <text x="787" y="113" font-family="'Segoe UI', -apple-system, sans-serif" font-size="20" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="1">HSK ${rule.level} GRAMMAR RULE</text>

  <!-- Hero Main Card -->
  <rect x="60" y="180" width="880" height="470" rx="32" fill="url(#cardGrad)" stroke="#e7e0d4" stroke-width="2" filter="url(#shadow)"/>
  
  <!-- Rule Title -->
  ${titleLines.map((line, idx) => `
  <text x="500" y="${titleLines.length === 1 ? 275 : 245 + (idx * 55)}" font-family="'Segoe UI', 'Microsoft YaHei', sans-serif" font-size="44" font-weight="900" fill="#1c1917" text-anchor="middle">${escapeXml(line)}</text>
  `).join('')}

  <!-- Prominent Formula Box -->
  <rect x="100" y="335" width="800" height="110" rx="20" fill="url(#formulaGrad)" stroke="#334155" stroke-width="2"/>
  <text x="500" y="370" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="800" fill="#94a3b8" text-anchor="middle" letter-spacing="2">SENTENCE STRUCTURE FORMULA</text>
  <text x="500" y="420" font-family="'Segoe UI', 'Microsoft YaHei', monospace" font-size="${rule.pattern.length > 32 ? 30 : 38}" font-weight="900" fill="#38bdf8" text-anchor="middle">${escapeXml(rule.pattern)}</text>

  <!-- Explanation Summary -->
  ${explanationLines.map((line, idx) => `
  <text x="500" y="${490 + (idx * 34)}" font-family="'Segoe UI', sans-serif" font-size="24" font-weight="500" fill="#44403c" text-anchor="middle">${escapeXml(line)}</text>
  `).join('')}

  <!-- Tag Pills -->
  <g transform="translate(260, 570)">
    <rect x="0" y="0" width="220" height="42" rx="12" fill="${pillBg}" stroke="${pillStroke}" stroke-width="1.5"/>
    <text x="110" y="27" font-family="'Segoe UI', sans-serif" font-size="19" font-weight="700" fill="${pillText}" text-anchor="middle">${escapeXml(rule.category || 'Structure')}</text>

    <rect x="250" y="0" width="230" height="42" rx="12" fill="#faf5ff" stroke="#e9d5ff" stroke-width="1.5"/>
    <text x="365" y="27" font-family="'Segoe UI', sans-serif" font-size="19" font-weight="700" fill="#6b21a8" text-anchor="middle">CEFR Level ${escapeXml(rule.cefr || 'A1')}</text>
  </g>

  <!-- Structural Variations & Exam Trap Box -->
  <rect x="60" y="680" width="880" height="260" rx="28" fill="#ffffff" stroke="#e7e0d4" stroke-width="2" filter="url(#shadow)"/>
  <rect x="90" y="705" width="240" height="36" rx="10" fill="#f5f0e6"/>
  <text x="210" y="729" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="800" fill="#78716c" text-anchor="middle" letter-spacing="1">SYNTAX VARIATIONS &amp; TRAPS</text>

  <g transform="translate(90, 765)">
    <!-- Variations Left Column -->
    <rect x="0" y="0" width="410" height="145" rx="16" fill="#faf7f2" stroke="#e7e0d4"/>
    <text x="20" y="36" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="800" fill="#047857">✔ Positive: <tspan font-weight="600" fill="#292524">${escapeXml((variations.affirmative || rule.pattern).slice(0, 24))}</tspan></text>
    <text x="20" y="78" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="800" fill="#dc2626">✘ Negative: <tspan font-weight="600" fill="#292524">${escapeXml((variations.negative || 'S + 不 / 没 + V').slice(0, 24))}</tspan></text>
    <text x="20" y="120" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="800" fill="#0284c7">❓ Question: <tspan font-weight="600" fill="#292524">${escapeXml((variations.question || 'Statement + 吗？').slice(0, 24))}</tspan></text>

    <!-- Exam Trap Right Column -->
    <rect x="430" y="0" width="370" height="145" rx="16" fill="#fffbeb" stroke="#fde68a"/>
    <text x="450" y="38" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="800" fill="#b45309">⚠️ Common Exam Mistake:</text>
    ${wrapText(rule.commonMistakes?.[0] || 'Never omit essential aspect or structural particles.', 32).slice(0, 3).map((line, idx) => `
    <text x="450" y="${74 + (idx * 26)}" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="500" fill="#92400e">${escapeXml(line)}</text>
    `).join('')}
  </g>

  <!-- Bilingual Examples Box -->
  <rect x="60" y="970" width="880" height="350" rx="28" fill="#ffffff" stroke="#e7e0d4" stroke-width="2" filter="url(#shadow)"/>
  <rect x="90" y="995" width="260" height="36" rx="10" fill="${pillBg}"/>
  <text x="220" y="1019" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="800" fill="${pillText}" text-anchor="middle" letter-spacing="1">AUTHENTIC BILINGUAL EXAMPLES</text>

  <!-- Example 1 -->
  <text x="95" y="1075" font-family="'Microsoft YaHei', 'SimHei', sans-serif" font-size="34" font-weight="900" fill="#1c1917">${escapeXml(ex1.zh)}</text>
  <text x="95" y="1115" font-family="'Segoe UI', sans-serif" font-size="24" font-weight="700" fill="${accentTone}">${escapeXml(ex1.py)}</text>
  <text x="95" y="1150" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="500" fill="#44403c">"${escapeXml(ex1.en)}"</text>

  <rect x="95" y="1175" width="810" height="1" fill="#e7e0d4"/>

  <!-- Example 2 -->
  <text x="95" y="1225" font-family="'Microsoft YaHei', 'SimHei', sans-serif" font-size="34" font-weight="900" fill="#1c1917">${escapeXml(ex2.zh)}</text>
  <text x="95" y="1265" font-family="'Segoe UI', sans-serif" font-size="24" font-weight="700" fill="${accentTone}">${escapeXml(ex2.py)}</text>
  <text x="95" y="1300" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="500" fill="#44403c">"${escapeXml(ex2.en)}"</text>

  <!-- Bottom CTA Footer Bar -->
  <rect x="60" y="1350" width="880" height="90" rx="24" fill="url(#darkHeader)"/>
  <text x="100" y="1405" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="700" fill="#f5f5f4">🎯 Full Guide &amp; 3-Question Practice Quiz:</text>
  <text x="900" y="1405" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="800" fill="#fb7185" text-anchor="end">mybwn.com/grammar/${escapeXml(rule.slug)} →</text>
</svg>
`;
}

// -------------------------------------------------------------
// 4. Main Execution Routine
// -------------------------------------------------------------
async function run() {
  console.log('🚀 [pinterest-pack] Starting 1000x1500 image & feed generation for 60 items...');

  const allItems: Array<{
    type: 'word' | 'grammar';
    item: VocabItemWithSlug | EnrichedGrammarRule;
    day: number;
    title: string;
    description: string;
    board: string;
    link: string;
    mediaUrl: string;
    publishDateIso: string;
    publishDateRfc: string;
    publishDateCsv: string;
    keywords: string;
  }> = [];

  // Generate 30 Word Pins (Morning: 09:00:00 UTC)
  // Generate 30 Grammar Pins (Evening: 18:00:00 UTC)
  for (let i = 0; i < 30; i++) {
    const day = i + 1;
    const dateStr = `2026-11-${String(10 + i).padStart(2, '0')}`;
    const word = curatedWords[i];
    const grammar = curatedGrammar[i];

    // Word Pin
    const wordTitle = `How to Learn Chinese Word ${word.hanzi} (${word.pinyin}) | HSK ${word.level} Study Card`;
    const wordDesc = `Master Chinese character ${word.hanzi} (${word.pinyin}) meaning "${word.meaning}". Includes stroke order animation, pinyin tone breakdown, audio, and free quiz on HSK Free Lab! #HSK${word.level} #LearnChinese #MandarinVocabulary #ChineseCharacters`;
    const wordBoard = word.level === 1 ? 'HSK 1 Vocabulary & Flashcards' : 'HSK 2 & 3 Chinese Vocabulary';
    const wordLink = `https://mybwn.com/words/${word.slug}`;
    const wordMedia = `https://mybwn.com/pins/${word.slug}.png`;
    const wordPubIso = `${dateStr}T09:00:00Z`;
    const wordPubCsv = `${dateStr} 09:00:00`;
    const wordPubRfc = new Date(wordPubIso).toUTCString();

    allItems.push({
      type: 'word',
      item: word,
      day,
      title: wordTitle,
      description: wordDesc,
      board: wordBoard,
      link: wordLink,
      mediaUrl: wordMedia,
      publishDateIso: wordPubIso,
      publishDateRfc: wordPubRfc,
      publishDateCsv: wordPubCsv,
      keywords: `HSK ${word.level}, learn Chinese, Mandarin vocabulary, Chinese character stroke order, pinyin tones, study Chinese`
    });

    // Grammar Pin
    const grammarTitle = `${grammar.title} - HSK ${grammar.level} Chinese Grammar Pattern & Quiz`;
    const grammarDesc = `Master the Chinese grammar formula: ${grammar.pattern}. Free bilingual example sentences, common pitfalls, and interactive quizzes on HSK Free Lab! #ChineseGrammar #HSK${grammar.level} #MandarinChinese #LearnMandarin`;
    const grammarBoard = 'Mandarin Chinese Grammar Rules';
    const grammarLink = `https://mybwn.com/grammar/${grammar.slug}`;
    const grammarMedia = `https://mybwn.com/pins/${grammar.slug}.png`;
    const grammarPubIso = `${dateStr}T18:00:00Z`;
    const grammarPubCsv = `${dateStr} 18:00:00`;
    const grammarPubRfc = new Date(grammarPubIso).toUTCString();

    allItems.push({
      type: 'grammar',
      item: grammar,
      day,
      title: grammarTitle,
      description: grammarDesc,
      board: grammarBoard,
      link: grammarLink,
      mediaUrl: grammarMedia,
      publishDateIso: grammarPubIso,
      publishDateRfc: grammarPubRfc,
      publishDateCsv: grammarPubCsv,
      keywords: `HSK ${grammar.level} grammar, Chinese grammar formulas, sentence structure, learn Mandarin, Chinese study notes`
    });
  }

  // 1. Render all 60 PNG images
  console.log('🎨 Rendering 60 PNG study cards (1000x1500) with @resvg/resvg-js...');
  for (const entry of allItems) {
    const isWord = entry.type === 'word';
    const svg = isWord 
      ? generateVocabSvg(entry.item as VocabItemWithSlug)
      : generateGrammarSvg(entry.item as EnrichedGrammarRule);

    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: 1000 }
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    const fileName = `${entry.item.slug}.png`;

    // Save to public/pins/
    fs.writeFileSync(path.join(PUBLIC_PINS_DIR, fileName), pngBuffer);

    // Save to pinterest-export/pins/
    fs.writeFileSync(path.join(EXPORT_PINS_DIR, fileName), pngBuffer);

    // Save to dist/pins/ if dist exists
    if (fs.existsSync(DIST_DIR)) {
      fs.writeFileSync(path.join(DIST_PINS_DIR, fileName), pngBuffer);
    }
  }
  console.log(`✅ Saved 60 PNG images to public/pins/ and pinterest-export/pins/!`);

  // 2. Generate Official Pinterest Bulk Upload CSV
  console.log('📄 Generating official Pinterest Bulk Upload CSV...');
  const csvHeaders = ['Title', 'Media URL', 'Pinterest board', 'Description', 'Link', 'Publish date', 'Keywords'];
  const csvRows = allItems.map(row => {
    return [
      `"${row.title.replace(/"/g, '""')}"`,
      `"${row.mediaUrl}"`,
      `"${row.board}"`,
      `"${row.description.replace(/"/g, '""')}"`,
      `"${row.link}"`,
      `"${row.publishDateCsv}"`,
      `"${row.keywords.replace(/"/g, '""')}"`
    ].join(',');
  });

  const csvContent = [csvHeaders.join(','), ...csvRows].join('\n');
  fs.writeFileSync(path.join(EXPORT_DIR, 'pinterest-bulk-upload.csv'), csvContent, 'utf8');
  console.log(`✅ Generated ${EXPORT_DIR}/pinterest-bulk-upload.csv with 60 scheduled pins!`);

  // 3. Generate Official Pinterest Auto-Publishing RSS 2.0 Feed
  console.log('📡 Generating Pinterest RSS 2.0 Feed (pinterest-feed.xml)...');
  const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:media="http://search.yahoo.com/mrss/" 
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HSK Free Lab - Visual Study Cards &amp; Grammar Formulas</title>
    <link>https://mybwn.com/</link>
    <description>Official daily Mandarin Chinese vocabulary study cards, stroke order animations, and essential grammar formulas for HSK 1, 2, and 3.</description>
    <language>en-us</language>
    <atom:link href="https://mybwn.com/pinterest-feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${allItems.map(entry => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${entry.link}</link>
      <description><![CDATA[${entry.description}]]></description>
      <pubDate>${entry.publishDateRfc}</pubDate>
      <guid isPermaLink="true">${entry.mediaUrl}</guid>
      <enclosure url="${entry.mediaUrl}" length="150000" type="image/png" />
      <media:content url="${entry.mediaUrl}" medium="image" type="image/png" width="1000" height="1500" />
      <media:title>${escapeXml(entry.title)}</media:title>
      <media:description><![CDATA[${entry.description}]]></media:description>
    </item>`).join('\n')}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'pinterest-feed.xml'), feedXml, 'utf8');
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(path.join(DIST_DIR, 'pinterest-feed.xml'), feedXml, 'utf8');
  }
  fs.writeFileSync(path.join(EXPORT_DIR, 'pinterest-feed.xml'), feedXml, 'utf8');
  console.log(`✅ Generated public/pinterest-feed.xml and pinterest-export/pinterest-feed.xml!`);

  console.log('🎉 [pinterest-pack] Stage 7 Pinterest Automation Completed Successfully!');
}

run().catch(err => {
  console.error('❌ Error generating Pinterest pack:', err);
  process.exit(1);
});
