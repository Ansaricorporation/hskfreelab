/**
 * scripts/generate-pinterest-batch.mjs
 *
 * Generates 30 vertical (1000x1500) high-contrast PNG pins comparing confusing HSK word pairs side-by-side.
 * Uses `sharp` to render vector SVG layouts into crisp PNG files.
 * Outputs all PNGs and `pins.csv` into public/pinterest-batch/ (and dist/pinterest-batch/).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PUBLIC_BATCH_DIR = path.join(ROOT_DIR, 'public', 'pinterest-batch');
const DIST_BATCH_DIR = path.join(ROOT_DIR, 'dist', 'pinterest-batch');

fs.mkdirSync(PUBLIC_BATCH_DIR, { recursive: true });

// Load vocabulary data
const { allVocabWithSlugs } = await import('../src/data/vocab-helpers.ts');

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const confusingPairs = [
  {
    w1: '不', w2: '没有',
    distinction: 'Negation: Present & Habitual vs. Past Action & Possession',
    coreA: 'Habitual actions, present facts, future intention: 我不喝茶',
    coreB: 'Past completed events, physical possession: 我没有去, 没有钱',
    level: 'HSK 1',
    keywords: 'chinese negation, bu vs meiyou, learn mandarin, hsk 1 vocabulary, chinese grammar'
  },
  {
    w1: '二', w2: '两',
    distinction: 'Numbers: Counting Digits & Math vs. Quantity with Measure Words',
    coreA: 'Counting numbers, fractions, decimals, phone numbers: 二月, 二十',
    coreB: 'Quantities before measure words & pairs: 两个人, 两本书',
    level: 'HSK 1 vs HSK 2',
    keywords: 'er vs liang, chinese numbers, measure words, hsk 1, hsk 2 vocabulary'
  },
  {
    w1: '的', w2: '得',
    distinction: 'Particles: Possessive Noun Modifier vs. Degree / Manner Complement',
    coreA: 'Modifies nouns (attribute): 我的书, 漂亮的衣服',
    coreB: 'Follows verbs to evaluate manner/result: 他跑得很快',
    level: 'HSK 1 vs HSK 2',
    keywords: 'chinese de particles, de vs de, hsk grammar, structural particles, learn chinese'
  },
  {
    w1: '得', w2: '地',
    distinction: 'Particles: Post-Verbal Complement vs. Pre-Verbal Adverbial Marker',
    coreA: 'Placed AFTER verb to score degree: 玩得很高兴',
    coreB: 'Placed BEFORE verb describing manner: 高兴地笑了',
    level: 'HSK 2 vs HSK 3',
    keywords: 'chinese particles, de vs de, adverbial marker, hsk 3 grammar, mandarin grammar'
  },
  {
    w1: '会', w2: '能',
    distinction: 'Modal Verbs: Learned Acquired Skill vs. Physical Capability',
    coreA: 'Skills acquired through study: 我会说中文, 我会游泳',
    coreB: 'Physical capability or external conditions: 我今天能跑步',
    level: 'HSK 1',
    keywords: 'hui vs neng, can in chinese, modal verbs, hsk 1 grammar, learn chinese'
  },
  {
    w1: '能', w2: '可以',
    distinction: 'Modal Verbs: Physical Capacity vs. Social Permission & Allowance',
    coreA: 'Physically capable or able: 他能拿起这个大箱子',
    coreB: 'Permitted by rules or etiquette: 这里可以抽烟吗',
    level: 'HSK 1 vs HSK 2',
    keywords: 'neng vs keyi, permission in chinese, modal verbs, hsk 2 grammar, chinese study'
  },
  {
    w1: '看', w2: '看见',
    distinction: 'Perception: Action of Looking vs. Achieved Result of Seeing',
    coreA: 'Voluntary visual action: 我在看黑板 (looking at the board)',
    coreB: 'Successful perception result: 我看见了老师 (caught sight of)',
    level: 'HSK 1',
    keywords: 'kan vs kanjian, chinese verbs, resultative complement, hsk 1 vocabulary'
  },
  {
    w1: '听', w2: '听见',
    distinction: 'Perception: Action of Listening vs. Achieved Result of Hearing',
    coreA: 'Intentional listening action: 我在听音乐 (listening to music)',
    coreB: 'Sensory acoustic reception: 我听见了鸟叫声 (heard a bird)',
    level: 'HSK 1',
    keywords: 'ting vs tingjian, listen vs hear chinese, hsk 1 verbs, chinese perception'
  },
  {
    w1: '在', w2: '有',
    distinction: 'Location: Subject at Place vs. Place Contains Objects',
    coreA: 'Subject + 在 + Location: 爸爸在家 (Dad is at home)',
    coreB: 'Location + 有 + Subject: 家里有人 (There is someone in the house)',
    level: 'HSK 1',
    keywords: 'zai vs you, chinese location, existence sentence, hsk 1 grammar, mandarin'
  },
  {
    w1: '和', w2: '跟',
    distinction: 'Conjunctions: Standard Coordinating "And" vs. Conversational "With/And"',
    coreA: 'Connects equal noun phrases: 老师和学生 (teachers and students)',
    coreB: 'Conversational "with / from": 我跟我妈妈说话 (talk with mom)',
    level: 'HSK 1 vs HSK 3',
    keywords: 'he vs gen, and vs with in chinese, chinese conjunctions, hsk 1, hsk 3'
  },
  {
    w1: '想', w2: '要',
    distinction: 'Desire vs. Intent: "Would Like / Wish" vs. "Want / Firm Plan"',
    coreA: 'Gentle wish, longing, or missing: 我想去看电影, 我想家',
    coreB: 'Firm immediate intention or requirement: 我要买两瓶水',
    level: 'HSK 1 vs HSK 2',
    keywords: 'xiang vs yao, want in chinese, modal verbs, hsk 1, hsk 2 grammar'
  },
  {
    w1: '知道', w2: '认识',
    distinction: 'Knowing: Factual Information vs. Personal Familiarity & Acquaintance',
    coreA: 'Knowing facts or objective data: 我知道他的名字和电话',
    coreB: 'Personal acquaintance with people/places: 我认识那位新同学',
    level: 'HSK 2 vs HSK 1',
    keywords: 'zhidao vs renshi, know in chinese, hsk 1, hsk 2 vocabulary, mandarin distinctions'
  },
  {
    w1: '帮助', w2: '帮忙',
    distinction: 'Assistance: Transitive Verb + Object vs. Separable Verb (No Direct Object)',
    coreA: 'Takes direct grammatical object: 帮助朋友 (Never 帮忙朋友)',
    coreB: 'Separable VO compound: 请你帮我一个忙 / 帮个忙',
    level: 'HSK 2 vs HSK 3',
    keywords: 'bangzhu vs bangmang, help in chinese, separable verbs, hsk 2, hsk 3 grammar'
  },
  {
    w1: '又', w2: '再',
    distinction: 'Repetition "Again": Past Completed Action vs. Future Intended Action',
    coreA: 'Action occurred again in the past: 昨天他又迟到了',
    coreB: 'Action will occur again in future: 明天请再来',
    level: 'HSK 3 vs HSK 2',
    keywords: 'you vs zai, again in chinese, chinese adverbs, hsk 2, hsk 3 grammar'
  },
  {
    w1: '多少', w2: '几',
    distinction: 'Questions: Large or Unknown Quantities vs. Small Quantities Under 10',
    coreA: 'Any number, measure word optional: 你们学校有多少学生',
    coreB: 'Expected < 10, requires measure word: 你有几个苹果',
    level: 'HSK 1',
    keywords: 'duoshao vs ji, how many in chinese, questions, hsk 1 grammar, learn chinese'
  },
  {
    w1: '故事', w2: '事情',
    distinction: 'Nouns: Fictional/Narrative Tale vs. Real-World Matter or Event',
    coreA: 'Fictional tale, fable, or bedtime story: 讲一个有趣的故事',
    coreB: 'Real matter, affair, or task: 我今天有很多事情要做',
    level: 'HSK 3 vs HSK 2',
    keywords: 'gushi vs shiqing, story vs matter chinese, hsk 2, hsk 3 vocabulary, pinyin'
  },
  {
    w1: '经常', w2: '非常',
    distinction: 'Adverbs: Temporal Frequency "Often" vs. High Degree Intensity "Very"',
    coreA: 'Frequency of habits: 他经常去图书馆看书',
    coreB: 'Degree modifier before adjectives/verbs: 这道中国菜非常香',
    level: 'HSK 3 vs HSK 2',
    keywords: 'jingchang vs feichang, chinese adverbs, frequency vs degree, hsk 2, hsk 3'
  },
  {
    w1: '走', w2: '离开',
    distinction: 'Movement: Walking on Foot vs. Departing or Leaving a Location',
    coreA: 'Physical walking locomotion: 我们一起走路去学校',
    coreB: 'Departing from a place or person: 他上个月离开了北京',
    level: 'HSK 2 vs HSK 3',
    keywords: 'zou vs likai, walk vs leave in chinese, hsk 2, hsk 3 verbs, mandarin motion'
  },
  {
    w1: '买', w2: '卖',
    distinction: 'Tones & Antonyms: Third Tone Low Dip (买 mǎi) vs. Fourth Tone Sharp Drop (卖 mài)',
    coreA: 'Third tone dipping (mǎi): to purchase items from a shop',
    coreB: 'Fourth tone dropping (mài): to sell or vendor items',
    level: 'HSK 1 vs HSK 2',
    keywords: 'mai vs mai, buy vs sell in chinese, 3rd vs 4th tone, tone contrast, hsk 1, hsk 2'
  },
  {
    w1: '问', w2: '问题',
    distinction: 'Parts of Speech: Action Verb "To Ask" vs. Noun "Question / Problem"',
    coreA: 'Transitive action verb taking person object: 我问老师',
    coreB: 'Noun object taking verbs: 老师回答了我的问题',
    level: 'HSK 2',
    keywords: 'wen vs wenti, ask vs question in chinese, hsk 2 grammar, parts of speech'
  },
  {
    w1: '说话', w2: '告诉',
    distinction: 'Communication: Intransitive Speaking vs. Transitive Informing Someone',
    coreA: 'Separable verb, cannot take person object directly: 他在说话',
    coreB: 'Double-object verb: 他告诉我这个好消息',
    level: 'HSK 1 vs HSK 2',
    keywords: 'shuohua vs gaosu, speak vs tell in chinese, hsk 1, hsk 2 communication'
  },
  {
    w1: '这', w2: '那',
    distinction: 'Demonstratives: Proximal "This" (Near) vs. Distal "That" (Far)',
    coreA: 'Items physically close to speaker: 这本书很有趣',
    coreB: 'Items far away from speaker: 那个男生是谁',
    level: 'HSK 1',
    keywords: 'zhe vs na, this vs that in chinese, demonstrative pronouns, hsk 1 vocabulary'
  },
  {
    w1: '这儿', w2: '那儿',
    distinction: 'Location Adverbs: Proximal "Here" vs. Distal "There"',
    coreA: 'Location near speaker: 请坐在这儿 (please sit here)',
    coreB: 'Location distant from speaker: 医院在那儿 (hospital is there)',
    level: 'HSK 1',
    keywords: 'zher vs nar, here vs there in chinese, location adverbs, hsk 1 pinyin'
  },
  {
    w1: '来', w2: '去',
    distinction: 'Directional Verbs: Movement Toward Speaker vs. Movement Away',
    coreA: 'Approaching speaker point: 你什么时候来我家',
    coreB: 'Moving away from speaker point: 我明天去超市买水果',
    level: 'HSK 1',
    keywords: 'lai vs qu, come vs go in chinese, directional verbs, hsk 1 vocabulary'
  },
  {
    w1: '穿', w2: '长',
    distinction: 'Distinct Meanings: 穿 (chuān = wear clothes) vs. 长 (cháng = long in length)',
    coreA: 'Action of putting on clothing or shoes: 今天冷，多穿点衣服',
    coreB: 'Spatial distance dimension: 这条小河很长',
    level: 'HSK 2',
    keywords: 'chuan vs chang, wear vs long in chinese, hsk 2 vocabulary, pinyin pronunciation'
  },
  {
    w1: '容易', w2: '简单',
    distinction: 'Difficulty vs Complexity: Low Effort (容易) vs. Simple Structure (简单)',
    coreA: 'Requires little effort or skill: 学汉字不容易，但很有趣',
    coreB: 'Uncomplicated in composition: 这个句子的结构很简单',
    level: 'HSK 3',
    keywords: 'rongyi vs jiandan, easy vs simple in chinese, hsk 3 adjectives, vocabulary'
  },
  {
    w1: '高兴', w2: '快乐',
    distinction: 'Happiness: Situational Short-Term Mood vs. Deep Long-Term Joy',
    coreA: 'Pleasant temporary reaction: 见到你很高兴',
    coreB: 'Broad, lasting, or festive happiness: 祝你生日快乐',
    level: 'HSK 1 vs HSK 2',
    keywords: 'gaoxing vs kuaile, happy in chinese, hsk 1, hsk 2 emotions, learn mandarin'
  },
  {
    w1: '希望', w2: '愿意',
    distinction: 'Attitude: Wishing for an Outcome vs. Consenting / Willing to Act',
    coreA: 'Wishing for external reality: 我希望明天不要下雨',
    coreB: 'Personal agreement or willingness: 你愿意和我一起去吗',
    level: 'HSK 2 vs HSK 3',
    keywords: 'xiwang vs yuanyi, hope vs willing in chinese, hsk 2, hsk 3 verbs, mandarin'
  },
  {
    w1: '准备', w2: '打算',
    distinction: 'Future Steps: Physical Getting Ready vs. Mental Intent / Plan',
    coreA: 'Physical preparation of tools or materials: 准备午饭, 准备复习',
    coreB: 'Mental intent or plan for the future: 我打算明年去中国留学',
    level: 'HSK 2 vs HSK 3',
    keywords: 'zhunbei vs dasuan, prepare vs plan in chinese, hsk 2, hsk 3 verbs'
  },
  {
    w1: '懂', w2: '明白',
    distinction: 'Comprehension: Deep Cognitive Grasp vs. Explicit Clarity / Realization',
    coreA: 'Grasping concepts or language meaning: 我听懂了老师的意思',
    coreB: 'Clarity, realization, or transparent understanding: 我说明白了吗',
    level: 'HSK 2 vs HSK 3',
    keywords: 'dong vs mingbai, understand in chinese, hsk 2, hsk 3 verbs, comprehension'
  }
];

function buildPinSvg(pair, index) {
  const v1 = allVocabWithSlugs.find(v => v.hanzi === pair.w1);
  const v2 = allVocabWithSlugs.find(v => v.hanzi === pair.w2);
  if (!v1 || !v2) throw new Error(`Missing vocab for pair: ${pair.w1} vs ${pair.w2}`);

  const pinNumber = String(index + 1).padStart(2, '0');

  return `
<svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c0a09"/>
      <stop offset="50%" stop-color="#1c1917"/>
      <stop offset="100%" stop-color="#292524"/>
    </linearGradient>

    <!-- Card Gradients -->
    <linearGradient id="cardLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>

    <linearGradient id="cardRightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#31101e"/>
      <stop offset="100%" stop-color="#1c0711"/>
    </linearGradient>

    <!-- Button Gradient -->
    <linearGradient id="ctaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e11d48"/>
      <stop offset="50%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#fb7185"/>
    </linearGradient>

    <!-- Golden Badge -->
    <linearGradient id="goldBadge" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>

    <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#e11d48" flood-opacity="0.35"/>
    </filter>

    <filter id="boxShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Canvas Background -->
  <rect width="1000" height="1500" fill="url(#bgGrad)"/>

  <!-- Border Frame -->
  <rect x="25" y="25" width="950" height="1450" rx="40" fill="none" stroke="#44403c" stroke-width="2.5"/>

  <!-- TOP BRANDING BAR -->
  <g transform="translate(60, 55)">
    <rect width="880" height="80" rx="20" fill="#1c1917" stroke="#292524" stroke-width="1.5"/>
    <rect x="16" y="16" width="48" height="48" rx="14" fill="#e11d48"/>
    <text x="40" y="50" font-family="'Microsoft YaHei', 'Noto Sans SC', sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">汉</text>
    
    <text x="80" y="48" font-family="'Segoe UI', -apple-system, sans-serif" font-size="24" font-weight="900" fill="#f5f5f4" letter-spacing="2">HSK FREE LAB</text>
    <text x="280" y="48" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="600" fill="#78716c">· mybwn.com</text>

    <!-- Badge -->
    <rect x="635" y="18" width="225" height="44" rx="12" fill="url(#goldBadge)"/>
    <text x="747" y="46" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="900" fill="#1c1917" text-anchor="middle" letter-spacing="1">HSK 1–3 TRICKY PAIR #${pinNumber}</text>
  </g>

  <!-- MAIN TITLE HEADER -->
  <g transform="translate(60, 165)">
    <text x="440" y="42" font-family="'Segoe UI', -apple-system, sans-serif" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">
      Confusing Chinese Words Compared
    </text>
    <text x="440" y="82" font-family="'Segoe UI', sans-serif" font-size="20" font-weight="600" fill="#fb7185" text-anchor="middle">
      ${escapeXml(pair.distinction)}
    </text>
  </g>

  <!-- SIDE-BY-SIDE WORD CARDS -->
  <g transform="translate(60, 280)">
    
    <!-- CARD A (Left - Blue/Cyan Accent) -->
    <g transform="translate(0, 0)" filter="url(#boxShadow)">
      <rect width="420" height="560" rx="32" fill="url(#cardLeftGrad)" stroke="#38bdf8" stroke-width="2.5"/>
      
      <!-- Level Pill -->
      <rect x="25" y="25" width="130" height="36" rx="10" fill="#0369a1"/>
      <text x="90" y="49" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="800" fill="#e0f2fe" text-anchor="middle">WORD A</text>

      <!-- Hanzi Large -->
      <text x="210" y="195" font-family="'Noto Serif SC', 'Microsoft YaHei', serif" font-size="96" font-weight="900" fill="#ffffff" text-anchor="middle">
        ${escapeXml(v1.hanzi)}
      </text>

      <!-- Pinyin -->
      <rect x="50" y="225" width="320" height="52" rx="14" fill="#0c4a6e"/>
      <text x="210" y="260" font-family="'Segoe UI', sans-serif" font-size="28" font-weight="900" fill="#38bdf8" text-anchor="middle">
        ${escapeXml(v1.pinyin)}
      </text>

      <!-- English Meaning -->
      <text x="210" y="325" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="700" fill="#f8fafc" text-anchor="middle">
        "${escapeXml(v1.meaning.slice(0, 26))}"
      </text>

      <!-- Core Function Box -->
      <rect x="25" y="365" width="370" height="165" rx="20" fill="#082f49" stroke="#0284c7" stroke-width="1.5"/>
      <text x="45" y="400" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="900" fill="#38bdf8" letter-spacing="1">WHEN TO USE:</text>
      <foreignObject x="45" y="415" width="330" height="105">
        <p xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Segoe UI', sans-serif; font-size: 16px; color: #bae6fd; line-height: 1.45; margin: 0; font-weight: 600;">
          ${escapeXml(pair.coreA)}
        </p>
      </foreignObject>
    </g>

    <!-- VS CIRCLE IN THE MIDDLE -->
    <g transform="translate(440, 240)">
      <circle cx="0" cy="0" r="44" fill="#1c1917" stroke="#e11d48" stroke-width="4"/>
      <text x="0" y="11" font-family="'Segoe UI', sans-serif" font-size="28" font-weight="900" fill="#fb7185" text-anchor="middle">VS</text>
    </g>

    <!-- CARD B (Right - Rose/Pink Accent) -->
    <g transform="translate(460, 0)" filter="url(#boxShadow)">
      <rect width="420" height="560" rx="32" fill="url(#cardRightGrad)" stroke="#f43f5e" stroke-width="2.5"/>
      
      <!-- Level Pill -->
      <rect x="25" y="25" width="130" height="36" rx="10" fill="#9f1239"/>
      <text x="90" y="49" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="800" fill="#ffe4e6" text-anchor="middle">WORD B</text>

      <!-- Hanzi Large -->
      <text x="210" y="195" font-family="'Noto Serif SC', 'Microsoft YaHei', serif" font-size="96" font-weight="900" fill="#ffffff" text-anchor="middle">
        ${escapeXml(v2.hanzi)}
      </text>

      <!-- Pinyin -->
      <rect x="50" y="225" width="320" height="52" rx="14" fill="#4c0519"/>
      <text x="210" y="260" font-family="'Segoe UI', sans-serif" font-size="28" font-weight="900" fill="#fb7185" text-anchor="middle">
        ${escapeXml(v2.pinyin)}
      </text>

      <!-- English Meaning -->
      <text x="210" y="325" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="700" fill="#f8fafc" text-anchor="middle">
        "${escapeXml(v2.meaning.slice(0, 26))}"
      </text>

      <!-- Core Function Box -->
      <rect x="25" y="365" width="370" height="165" rx="20" fill="#4c0519" stroke="#be123c" stroke-width="1.5"/>
      <text x="45" y="400" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="900" fill="#fda4af" letter-spacing="1">WHEN TO USE:</text>
      <foreignObject x="45" y="415" width="330" height="105">
        <p xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Segoe UI', sans-serif; font-size: 16px; color: #fecdd3; line-height: 1.45; margin: 0; font-weight: 600;">
          ${escapeXml(pair.coreB)}
        </p>
      </foreignObject>
    </g>

  </g>

  <!-- QUICK MEMORY TRICK / EXAM STRATEGY BANNER -->
  <g transform="translate(60, 880)" filter="url(#boxShadow)">
    <rect width="880" height="240" rx="28" fill="#1c1917" stroke="#44403c" stroke-width="2"/>
    
    <rect x="30" y="25" width="230" height="36" rx="10" fill="#292524"/>
    <text x="145" y="49" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="800" fill="#fbbf24" text-anchor="middle" letter-spacing="1">💡 10-SECOND EXAM RULE</text>

    <!-- Example Sentences -->
    <g transform="translate(30, 85)">
      <!-- Example 1 -->
      <rect width="400" height="120" rx="16" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
      <text x="20" y="32" font-family="'Segoe UI', sans-serif" font-size="13" font-weight="800" fill="#38bdf8">✔ CORRECT WITH ${escapeXml(v1.hanzi)}:</text>
      <text x="20" y="66" font-family="'Microsoft YaHei', sans-serif" font-size="20" font-weight="900" fill="#ffffff">${escapeXml(v1.exampleZh.slice(0, 18))}</text>
      <text x="20" y="94" font-family="'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="#94a3b8">${escapeXml(v1.examplePy.slice(0, 30))}</text>

      <!-- Example 2 -->
      <g transform="translate(420, 0)">
        <rect width="400" height="120" rx="16" fill="#1c0711" stroke="#be123c" stroke-width="1.5"/>
        <text x="20" y="32" font-family="'Segoe UI', sans-serif" font-size="13" font-weight="800" fill="#fb7185">✔ CORRECT WITH ${escapeXml(v2.hanzi)}:</text>
        <text x="20" y="66" font-family="'Microsoft YaHei', sans-serif" font-size="20" font-weight="900" fill="#ffffff">${escapeXml(v2.exampleZh.slice(0, 18))}</text>
        <text x="20" y="94" font-family="'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="#fda4af">${escapeXml(v2.examplePy.slice(0, 30))}</text>
      </g>
    </g>
  </g>

  <!-- PROMINENT CTA BUTTON (Task 4 Requirement) -->
  <g transform="translate(60, 1160)" filter="url(#glow)">
    <rect width="880" height="130" rx="32" fill="url(#ctaGrad)"/>
    
    <text x="440" y="60" font-family="'Segoe UI', -apple-system, sans-serif" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">
      Take the Free HSK Audio &amp; Quiz Check →
    </text>
    <text x="440" y="98" font-family="'Segoe UI', sans-serif" font-size="19" font-weight="700" fill="#ffe4e6" text-anchor="middle">
      Native Pronunciation · Stroke Animator · 0 Signups Required
    </text>
  </g>

  <!-- FOOTER URL BAR -->
  <g transform="translate(60, 1340)">
    <rect width="880" height="85" rx="20" fill="#1c1917" stroke="#292524" stroke-width="1.5"/>
    <text x="45" y="50" font-family="'Segoe UI', sans-serif" font-size="20" font-weight="700" fill="#a8a29e">
      Study Guide Link:
    </text>
    <text x="835" y="50" font-family="'Segoe UI', monospace" font-size="20" font-weight="800" fill="#38bdf8" text-anchor="end">
      mybwn.com/words/${escapeXml(v1.slug)}
    </text>
  </g>

</svg>`;
}

async function generateBatch() {
  console.log(`🎨 [pinterest-batch] Generating 30 vertical (1000x1500) high-contrast PNG pins with Sharp...`);

  // Target start date: Tomorrow in UTC
  const startDate = new Date();
  startDate.setUTCDate(startDate.getUTCDate() + 1);
  startDate.setUTCHours(8, 0, 0, 0); // Start at 08:00 UTC

  const scheduleHours = [8, 11, 14, 17, 20]; // 5 pins per day

  const csvRows = [
    ['Title', 'Media URL', 'Pinterest board', 'Thumbnail', 'Description', 'Link', 'Publish date', 'Keywords']
  ];

  for (let i = 0; i < confusingPairs.length; i++) {
    const pair = confusingPairs[i];
    const v1 = allVocabWithSlugs.find(v => v.hanzi === pair.w1);
    const v2 = allVocabWithSlugs.find(v => v.hanzi === pair.w2);

    const pinNumber = String(i + 1).padStart(2, '0');
    const slugName = `pin-${pinNumber}-${v1.slug}-vs-${v2.slug}`;
    const filename = `${slugName}.png`;
    const outputPath = path.join(PUBLIC_BATCH_DIR, filename);

    // 1. Compute scheduled publish date (5 pins per day starting tomorrow in UTC)
    const dayOffset = Math.floor(i / 5);
    const timeSlot = i % 5;
    const pinDate = new Date(startDate.getTime());
    pinDate.setUTCDate(pinDate.getUTCDate() + dayOffset);
    pinDate.setUTCHours(scheduleHours[timeSlot], 0, 0, 0);
    const publishDateStr = pinDate.toISOString().replace(/\.\d{3}Z$/, ''); // YYYY-MM-DDTHH:MM:SS

    // 2. Generate PNG only if not already present
    if (!fs.existsSync(outputPath)) {
      const svg = buildPinSvg(pair, i);
      await sharp(Buffer.from(svg))
        .png({ quality: 95, compressionLevel: 8 })
        .toFile(outputPath);
      console.log(`   ✅ [${i + 1}/30] Rendered ${filename} (${publishDateStr})`);
    } else {
      console.log(`   ⚡ [${i + 1}/30] Reusing existing ${filename} (${publishDateStr})`);
    }

    // 3. Construct Pinterest CSV row (8 columns with empty thumbnail and EXACT_BOARD_NAME_HERE)
    const title = `${pair.w1} (${v1.pinyin}) vs ${pair.w2} (${v2.pinyin}) Meaning in English – ${pair.level}`.slice(0, 99);
    const mediaUrl = `https://mybwn.com/pinterest-batch/${filename}`;
    const board = 'EXACT_BOARD_NAME_HERE';
    const thumbnail = '""';
    const description = `Stop confusing ${pair.w1} (${v1.pinyin}) and ${pair.w2} (${v2.pinyin})! ${pair.distinction}. Practice native audio, animated stroke order, and test your retention with 100% free quizzes on HSK Free Lab.`.slice(0, 499);
    const link = `https://mybwn.com/words/${v1.slug}`;
    const keywords = pair.keywords;

    csvRows.push([
      `"${title.replace(/"/g, '""')}"`,
      mediaUrl,
      board,
      thumbnail,
      `"${description.replace(/"/g, '""')}"`,
      link,
      publishDateStr,
      `"${keywords.replace(/"/g, '""')}"`
    ]);
  }

  // 5. Output pins.csv into public/pinterest-batch/ with UTF-8 BOM
  const csvContent = '\uFEFF' + csvRows.map(row => row.join(',')).join('\n');
  const csvPublicPath = path.join(PUBLIC_BATCH_DIR, 'pins.csv');
  fs.writeFileSync(csvPublicPath, csvContent, 'utf8');
  console.log(`\n📄 [pinterest-batch] Successfully exported Pinterest bulk upload CSV with UTF-8 BOM to ${csvPublicPath}`);

  // 6. Sync to dist/pinterest-batch if dist exists
  if (fs.existsSync(path.join(ROOT_DIR, 'dist'))) {
    fs.mkdirSync(DIST_BATCH_DIR, { recursive: true });
    fs.copyFileSync(csvPublicPath, path.join(DIST_BATCH_DIR, 'pins.csv'));
    for (const file of fs.readdirSync(PUBLIC_BATCH_DIR)) {
      if (file.endsWith('.png')) {
        fs.copyFileSync(path.join(PUBLIC_BATCH_DIR, file), path.join(DIST_BATCH_DIR, file));
      }
    }
    console.log(`📦 [pinterest-batch] Synced all 30 PNGs and pins.csv to dist/pinterest-batch/`);
  }

  console.log(`🎉 [pinterest-batch] Done! All 30 vertical pins generated at 1000x1500.`);
}

generateBatch().catch(err => {
  console.error('❌ [pinterest-batch] Error:', err);
  process.exit(1);
});
