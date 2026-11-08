import { hsk1Vocab } from './hsk1-vocab.ts';
import { hsk2Vocab } from './hsk2-vocab.ts';
import { hsk3Vocab } from './hsk3-vocab.ts';
import { lessonsData } from './lessons.ts';
import { grammarData } from './grammar.ts';
import type { VocabItem, HskLevel } from '../types';

export interface VocabItemWithSlug extends VocabItem {
  slug: string;
}

export interface SyllableToneDetail {
  hanziChar: string;
  pinyin: string;
  toneNumber: number;
  toneName: string;
  tonePitch: string;
  toneDescription: string;
}

export interface ToneBreakdown {
  syllables: SyllableToneDetail[];
  sandhiRules: string[];
}

export interface SharedFamilyItem {
  word: VocabItemWithSlug;
  relationType: 'character' | 'radical';
  sharedElement: string;
}

export interface CorpusMatch {
  source: 'lesson' | 'grammar';
  title: string;
  slug: string;
  level: HskLevel;
  zh: string;
  py: string;
  en: string;
  speaker?: string;
}

export interface WordQuizQuestion {
  id: number;
  type: 'meaning' | 'pinyin' | 'cloze';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface WordUsageGuide {
  syntacticPattern: string;
  grammaticalRole: string;
  collocations: { zh: string; py: string; en: string }[];
  examTips: string;
}

function stripTones(py: string): string {
  return py
    .replace(/[āáǎàĀÁǍÀ]/g, 'a')
    .replace(/[ēéěèĒÉĚÈ]/g, 'e')
    .replace(/[īíǐìĪÍǏÌ]/g, 'i')
    .replace(/[ōóǒòŌÓǑÒ]/g, 'o')
    .replace(/[ūúǔùŪÚǓÙ]/g, 'u')
    .replace(/[ǖǘǚǜ]/g, 'v')
    .replace(/ü/g, 'v');
}

function getBasePinyin(py: string): string {
  return stripTones(py).toLowerCase()
    .replace(/\.\.\./g, '-')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getEnglishKeyword(meaning: string): string {
  let first = meaning.split(/[;,(/]/)[0].trim().toLowerCase();
  first = first.replace(/^to\s+/, '');
  first = first.replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  return first.slice(0, 15);
}

// Combine all 603 vocabulary items
const rawVocabList: VocabItem[] = [...hsk1Vocab, ...hsk2Vocab, ...hsk3Vocab];

// Count base pinyin occurrences to identify collisions
const baseCounts: Record<string, number> = {};
for (const w of rawVocabList) {
  const base = getBasePinyin(w.pinyin);
  baseCounts[base] = (baseCounts[base] || 0) + 1;
}

// Generate deterministic unique slugs
const slugMap = new Map<string, VocabItemWithSlug>();
const idMap = new Map<string, VocabItemWithSlug>();
const hanziMap = new Map<string, VocabItemWithSlug[]>();

export const allVocabWithSlugs: VocabItemWithSlug[] = rawVocabList.map(w => {
  const base = getBasePinyin(w.pinyin);
  let slug = base;
  if (baseCounts[base] > 1) {
    const kw = getEnglishKeyword(w.meaning);
    slug = kw ? `${base}-${kw}` : `${base}-hsk${w.level}`;
  }
  if (slugMap.has(slug)) {
    slug = `${base}-hsk${w.level}`;
    if (slugMap.has(slug)) {
      slug = `${base}-hsk${w.level}-${w.id.replace(/hsk\d+-/, '')}`;
    }
  }

  const enriched: VocabItemWithSlug = { ...w, slug };
  slugMap.set(slug, enriched);
  idMap.set(w.id, enriched);

  const existing = hanziMap.get(w.hanzi) || [];
  existing.push(enriched);
  hanziMap.set(w.hanzi, existing);

  return enriched;
});

export function getWordBySlug(slug: string): VocabItemWithSlug | undefined {
  return slugMap.get(slug);
}

export function getWordById(id: string): VocabItemWithSlug | undefined {
  return idMap.get(id);
}

export function getWordSlug(word: VocabItem): string {
  const found = idMap.get(word.id);
  if (found) return found.slug;
  const base = getBasePinyin(word.pinyin);
  return base || word.id;
}

export function getWordByHanzi(hanzi: string): VocabItemWithSlug | undefined {
  const matches = hanziMap.get(hanzi);
  return matches && matches.length > 0 ? matches[0] : undefined;
}

export function getWordsByHanzi(hanzi: string): VocabItemWithSlug[] {
  return hanziMap.get(hanzi) || [];
}

export function getAdjacentWords(slug: string): { prev: VocabItemWithSlug; next: VocabItemWithSlug } {
  const idx = allVocabWithSlugs.findIndex(w => w.slug === slug);
  const total = allVocabWithSlugs.length;
  const prevIdx = (idx - 1 + total) % total;
  const nextIdx = (idx + 1) % total;
  return {
    prev: allVocabWithSlugs[prevIdx],
    next: allVocabWithSlugs[nextIdx]
  };
}

export function getConstituentCharacters(hanzi: string): string[] {
  const chars = Array.from(hanzi).filter(char => /\p{Script=Han}/u.test(char));
  return Array.from(new Set(chars));
}

function detectToneNumber(syllable: string): number {
  if (/[āēīōūǖĀĒĪŌŪ]/.test(syllable)) return 1;
  if (/[áéíóúǘÁÉÍÓÚ]/.test(syllable)) return 2;
  if (/[ǎěǐǒǔǚǍĚǏǑǓ]/.test(syllable)) return 3;
  if (/[àèìòùǜÀÈÌÒÙ]/.test(syllable)) return 4;
  return 5;
}

const toneDescriptions: Record<number, { name: string; pitch: string; description: string }> = {
  1: {
    name: '1st Tone (High Flat)',
    pitch: '55',
    description: 'High, steady, level pitch. Speak it with a clear, sustained singing pitch.'
  },
  2: {
    name: '2nd Tone (Rising)',
    pitch: '35',
    description: 'Starts mid-range and rises briskly, similar to asking an surprised question ("What?").'
  },
  3: {
    name: '3rd Tone (Low Dipping)',
    pitch: '214',
    description: 'Dips low and turns slightly upward. In connected speech, pronounced as a low flat tone (half-3rd).'
  },
  4: {
    name: '4th Tone (Falling)',
    pitch: '51',
    description: 'Sharp, decisive drop from top pitch to bottom, like a firm, direct command ("Stop!").'
  },
  5: {
    name: 'Neutral Tone (Light & Short)',
    pitch: 'Light/Short',
    description: 'De-stressed, light, and short. Its relative pitch naturally adapts to the preceding tone.'
  }
};

export function getToneBreakdown(word: VocabItemWithSlug): ToneBreakdown {
  const hanziChars = Array.from(word.hanzi).filter(c => /\p{Script=Han}/u.test(c));
  const syllables: SyllableToneDetail[] = [];

  // Pinyin split: if single char, use word.pinyin directly
  if (hanziChars.length <= 1) {
    const toneNum = detectToneNumber(word.pinyin);
    const meta = toneDescriptions[toneNum] || toneDescriptions[5];
    syllables.push({
      hanziChar: word.hanzi,
      pinyin: word.pinyin,
      toneNumber: toneNum,
      toneName: meta.name,
      tonePitch: meta.pitch,
      toneDescription: meta.description
    });
  } else {
    // Multi-character word
    const pyParts = word.pinyin.split(/[\s'’]+/).filter(Boolean);
    if (pyParts.length === hanziChars.length) {
      hanziChars.forEach((char, i) => {
        const py = pyParts[i];
        const toneNum = detectToneNumber(py);
        const meta = toneDescriptions[toneNum] || toneDescriptions[5];
        syllables.push({
          hanziChar: char,
          pinyin: py,
          toneNumber: toneNum,
          toneName: meta.name,
          tonePitch: meta.pitch,
          toneDescription: meta.description
        });
      });
    } else {
      // Heuristic fallback: split by vowels or assign word.pinyin to group
      hanziChars.forEach((char) => {
        const toneNum = detectToneNumber(word.pinyin);
        const meta = toneDescriptions[toneNum] || toneDescriptions[5];
        syllables.push({
          hanziChar: char,
          pinyin: word.pinyin,
          toneNumber: toneNum,
          toneName: meta.name,
          tonePitch: meta.pitch,
          toneDescription: meta.description
        });
      });
    }
  }

  // Tone sandhi rules detection
  const sandhiRules: string[] = [];
  const toneNums = syllables.map(s => s.toneNumber);

  // Check 3rd tone sandhi (two consecutive 3rd tones)
  for (let i = 0; i < toneNums.length - 1; i++) {
    if (toneNums[i] === 3 && toneNums[i + 1] === 3) {
      sandhiRules.push(
        `Third Tone Sandhi (半三声 / 变调): When two 3rd tones appear consecutively in 「${word.hanzi}」, the first syllable shifts from 3rd tone (214) to 2nd tone (35) in spoken Chinese.`
      );
      break;
    }
  }

  // Check 一 (yī) sandhi
  if (word.hanzi.includes('一') && word.hanzi.length > 1) {
    sandhiRules.push(
      `Tone Sandhi of "一" (yī): Base tone is 1st tone. Before a 4th tone syllable, "一" shifts to 2nd tone (yí, e.g., 一个). Before 1st, 2nd, or 3rd tones, it shifts to 4th tone (yì, e.g., 一起, 一年).`
    );
  }

  // Check 不 (bù) sandhi
  if (word.hanzi.includes('不') && word.hanzi.length > 1) {
    sandhiRules.push(
      `Tone Sandhi of "不" (bù): Base tone is 4th tone. When followed by another 4th tone syllable, "不" shifts to 2nd tone (bú, e.g., 不是).`
    );
  }

  return { syllables, sandhiRules };
}

export function getSharedCharacterFamily(word: VocabItemWithSlug, limit: number = 8): SharedFamilyItem[] {
  const chars = getConstituentCharacters(word.hanzi);
  const results: SharedFamilyItem[] = [];
  const seenSlugs = new Set<string>([word.slug]);

  // First pass: find words sharing constituent Hanzi characters
  for (const other of allVocabWithSlugs) {
    if (seenSlugs.has(other.slug)) continue;
    const otherChars = getConstituentCharacters(other.hanzi);
    const sharedChar = chars.find(c => otherChars.includes(c));
    if (sharedChar) {
      results.push({
        word: other,
        relationType: 'character',
        sharedElement: sharedChar
      });
      seenSlugs.add(other.slug);
      if (results.length >= limit) break;
    }
  }

  // Second pass: if less than limit, find words sharing radical
  if (results.length < limit && word.radical) {
    for (const other of allVocabWithSlugs) {
      if (seenSlugs.has(other.slug)) continue;
      if (other.radical === word.radical) {
        results.push({
          word: other,
          relationType: 'radical',
          sharedElement: word.radical
        });
        seenSlugs.add(other.slug);
        if (results.length >= limit) break;
      }
    }
  }

  return results;
}

export function getWordCorpusAppearances(word: VocabItemWithSlug): CorpusMatch[] {
  const matches: CorpusMatch[] = [];
  const query = word.hanzi;

  // Search lessons
  for (const lesson of lessonsData) {
    for (const line of lesson.dialogue) {
      if (line.zh.includes(query)) {
        matches.push({
          source: 'lesson',
          title: `Lesson ${lesson.id}: ${lesson.title}`,
          slug: lesson.slug,
          level: lesson.level,
          zh: line.zh,
          py: line.py,
          en: line.en,
          speaker: line.speaker
        });
        if (matches.length >= 4) break;
      }
    }
    if (matches.length >= 4) break;
  }

  // Search grammar points
  for (const gp of grammarData) {
    for (const eg of gp.examples) {
      if (eg.zh.includes(query)) {
        matches.push({
          source: 'grammar',
          title: gp.title,
          slug: gp.slug,
          level: gp.level,
          zh: eg.zh,
          py: eg.py,
          en: eg.en
        });
        if (matches.length >= 8) break;
      }
    }
    if (matches.length >= 8) break;
  }

  return matches;
}

export function getWordUsageGuide(word: VocabItemWithSlug): WordUsageGuide {
  const pos = word.partOfSpeech.toLowerCase();
  const lvl = word.level;

  let pattern = `Subject + ${word.hanzi} + Object / Predicate`;
  let grammaticalRole = `In Mandarin, 「${word.hanzi}」 functions primarily as a ${word.partOfSpeech}.`;
  let examTips = `On the official HSK ${lvl} exam, pay special attention to word order and tone discrimination in the listening and reading sections.`;

  if (pos.includes('noun')) {
    pattern = `Numeral + Classifier (量词) + ${word.hanzi}`;
    grammaticalRole = `As a noun, 「${word.hanzi}」 typically occupies the subject or direct object position. In Chinese, countable nouns regularly require an appropriate measure word when preceded by a number or demonstrative (这 / 那).`;
    examTips = `HSK ${lvl} Reading Trap: Look for classifier pairings and descriptive modifier markers (的) immediately preceding 「${word.hanzi}」.`;
  } else if (pos.includes('verb')) {
    pattern = `Subject + (不 / 没) + ${word.hanzi} + (了 / 过 / 着) + (Object)`;
    grammaticalRole = `As a verb, 「${word.hanzi}」 expresses an action, state, or psychological relation. It can take aspectual particles such as 了 (completed action), 过 (experiential aspect), or 着 (durative aspect).`;
    examTips = `HSK ${lvl} Grammar Tip: Check whether negation requires 不 (habitual/future) or 没/没有 (past completion).`;
  } else if (pos.includes('adj')) {
    pattern = `Noun + 很 / 非常 + ${word.hanzi} (No '是' required)`;
    grammaticalRole = `As an adjective (stative verb), 「${word.hanzi}」 directly predicates a noun without using '是'. Degree adverbs like 很 (hěn) or 非常 (fēicháng) commonly precede it.`;
    examTips = `HSK ${lvl} Common Mistake: Never say "他是${word.hanzi}" for adjectival descriptions; use "他很${word.hanzi}".`;
  } else if (pos.includes('adv')) {
    pattern = `Subject + ${word.hanzi} + Verb / Adjective`;
    grammaticalRole = `As an adverb, 「${word.hanzi}」 modifies a verb, adjective, or full clause, indicating time, manner, degree, or logical relationship.`;
    examTips = `Adverbs in Mandarin strictly precede the predicate they modify; never place 「${word.hanzi}」 at the end of a clause.`;
  } else if (pos.includes('pronoun')) {
    pattern = `${word.hanzi} + Verb / Predicate OR Preposition + ${word.hanzi}`;
    grammaticalRole = `As a pronoun, 「${word.hanzi}」 substitutes for a person, entity, question target, or situation, avoiding repetitive noun phrases.`;
    examTips = `Ensure contextual agreement with the referent across dialogue turns in HSK listening items.`;
  } else if (pos.includes('prep') || pos.includes('coverb')) {
    pattern = `Subject + ${word.hanzi} + Noun Phrase + Main Verb + Object`;
    grammaticalRole = `As a preposition (coverb), 「${word.hanzi}」 introduces a spatial location, beneficiary, direction, or comparison standard before the main action verb.`;
    examTips = `Prepositional phrases in Chinese always precede the main verb, contrasting with English post-verbal preposition placement.`;
  } else if (pos.includes('conj')) {
    pattern = `Clause 1, + ${word.hanzi} + Clause 2`;
    grammaticalRole = `As a conjunction, 「${word.hanzi}」 establishes logical transitions (cause-and-effect, concession, coordination) between clauses.`;
    examTips = `Pay close attention to paired correlative conjunctions (e.g. 因为...所以..., 虽然...但是...).`;
  } else if (pos.includes('measure') || pos.includes('classifier')) {
    pattern = `Number / 这 / 那 + ${word.hanzi} + Noun`;
    grammaticalRole = `As a measure word (classifier), 「${word.hanzi}」 bridges numbers or determiners with associated semantic noun categories.`;
    examTips = `Master the specific category of objects paired with 「${word.hanzi}」 for HSK reading matching tasks.`;
  }

  // Curate sample collocations
  const collocations = [
    {
      zh: word.exampleZh,
      py: word.examplePy,
      en: word.exampleEn
    }
  ];

  return {
    syntacticPattern: pattern,
    grammaticalRole,
    collocations,
    examTips
  };
}

export function getWordPracticeQuiz(word: VocabItemWithSlug): WordQuizQuestion[] {
  // Find distractors of similar level & part of speech
  const sameLevel = allVocabWithSlugs.filter(w => w.id !== word.id && w.level === word.level);
  const samePos = sameLevel.filter(w => w.partOfSpeech === word.partOfSpeech);
  const pool = samePos.length >= 3 ? samePos : sameLevel;

  // Question 1: Meaning
  const distractorMeanings: string[] = [];
  const usedIdx = new Set<number>();
  for (let i = 0; i < pool.length && distractorMeanings.length < 3; i++) {
    const candidate = pool[(i * 7 + 3) % pool.length];
    if (candidate.meaning !== word.meaning && !distractorMeanings.includes(candidate.meaning)) {
      distractorMeanings.push(candidate.meaning);
    }
  }

  const meaningOptions = [word.meaning, ...distractorMeanings.slice(0, 3)];
  // Deterministic shuffle using word's numeric id
  const numId = parseInt(word.id.replace(/\D/g, ''), 10) || 1;
  const q1CorrectIndex = (numId % 4);
  // Swap correct into position
  const temp1 = meaningOptions[0];
  meaningOptions[0] = meaningOptions[q1CorrectIndex];
  meaningOptions[q1CorrectIndex] = temp1;

  // Question 2: Pinyin & Tone
  const distractorPinyins: string[] = [];
  for (let i = 0; i < pool.length && distractorPinyins.length < 3; i++) {
    const candidate = pool[(i * 11 + 5) % pool.length];
    if (candidate.pinyin !== word.pinyin && !distractorPinyins.includes(candidate.pinyin)) {
      distractorPinyins.push(candidate.pinyin);
    }
  }
  const pinyinOptions = [word.pinyin, ...distractorPinyins.slice(0, 3)];
  const q2CorrectIndex = ((numId + 1) % 4);
  const temp2 = pinyinOptions[0];
  pinyinOptions[0] = pinyinOptions[q2CorrectIndex];
  pinyinOptions[q2CorrectIndex] = temp2;

  // Question 3: Cloze sentence
  const distractorHanzi: string[] = [];
  for (let i = 0; i < pool.length && distractorHanzi.length < 3; i++) {
    const candidate = pool[(i * 13 + 7) % pool.length];
    if (candidate.hanzi !== word.hanzi && !distractorHanzi.includes(candidate.hanzi)) {
      distractorHanzi.push(candidate.hanzi);
    }
  }
  const clozeOptions = [word.hanzi, ...distractorHanzi.slice(0, 3)];
  const q3CorrectIndex = ((numId + 2) % 4);
  const temp3 = clozeOptions[0];
  clozeOptions[0] = clozeOptions[q3CorrectIndex];
  clozeOptions[q3CorrectIndex] = temp3;

  const maskedSentence = word.exampleZh.replace(word.hanzi, '( ___ )');

  return [
    {
      id: 1,
      type: 'meaning',
      question: `What is the accurate English definition of the HSK ${word.level} word 「${word.hanzi}」 (${word.pinyin})?`,
      options: meaningOptions,
      correctIndex: q1CorrectIndex,
      explanation: `「${word.hanzi}」 (${word.pinyin}) translates to "${word.meaning}". Example: ${word.exampleZh} (${word.exampleEn}).`
    },
    {
      id: 2,
      type: 'pinyin',
      question: `Which is the correct Pinyin romanization and tone for the Chinese character(s) 「${word.hanzi}」?`,
      options: pinyinOptions,
      correctIndex: q2CorrectIndex,
      explanation: `The accurate Pinyin for 「${word.hanzi}」 is "${word.pinyin}". Observe the tone contour carefully.`
    },
    {
      id: 3,
      type: 'cloze',
      question: `Choose the correct word to fill in the blank: "${maskedSentence}"`,
      options: clozeOptions,
      correctIndex: q3CorrectIndex,
      explanation: `「${word.hanzi}」 (${word.pinyin}) correctly completes the sentence: "${word.exampleZh}" (${word.exampleEn}).`
    }
  ];
}
