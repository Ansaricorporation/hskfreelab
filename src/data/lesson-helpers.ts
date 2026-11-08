import { lessonsData } from './lessons.ts';
import { grammarData } from './grammar.ts';
import { hsk1Vocab } from './hsk1-vocab.ts';
import { hsk2Vocab } from './hsk2-vocab.ts';
import { hsk3Vocab } from './hsk3-vocab.ts';
import { blogPostsData } from './blogs.ts';
import type { Lesson, VocabItem, GrammarPoint, BlogPost, HskLevel } from '../types';

export interface EnrichedVocabItem {
  hanzi: string;
  pinyin: string;
  meaning: string;
  partOfSpeech: string;
  level: HskLevel;
  exampleZh: string;
  examplePy: string;
  exampleEn: string;
}

export interface CompendiumGrammarPoint {
  id: string;
  title: string;
  level: HskLevel;
  pattern: string;
  explanation: string;
  examples: {
    zh: string;
    py: string;
    en: string;
  }[];
  commonMistake?: string;
  tip?: string;
  lessonId?: string;
  lessonSlug?: string;
  lessonTitle?: string;
  isStandalone?: boolean;
}

// Fallback dictionary for common conversational words in lessons
const auxiliaryVocabMap: Record<string, EnrichedVocabItem> = {
  '你好': {
    hanzi: '你好',
    pinyin: 'nǐ hǎo',
    meaning: 'hello; greetings',
    partOfSpeech: 'phrase',
    level: 1,
    exampleZh: '你好，很高兴认识你！',
    examplePy: 'Nǐ hǎo, hěn gāoxìng rènshi nǐ!',
    exampleEn: 'Hello, very nice to meet you!'
  },
  '号': {
    hanzi: '号',
    pinyin: 'hào',
    meaning: 'day of month; number',
    partOfSpeech: 'noun',
    level: 1,
    exampleZh: '今天几月几号？',
    examplePy: 'Jīntiān jǐ yuè jǐ hào?',
    exampleEn: 'What is today\'s date?'
  },
  '生': {
    hanzi: '生',
    pinyin: 'shēng',
    meaning: 'to be born; life; student',
    partOfSpeech: 'verb / suffix',
    level: 1,
    exampleZh: '他是北京大学的学生。',
    examplePy: 'Tā shì Běijīng Dàxué de xuésheng.',
    exampleEn: 'He is a student at Peking University.'
  },
  '在哪儿': {
    hanzi: '在哪儿',
    pinyin: 'zài nǎr',
    meaning: 'where; located where',
    partOfSpeech: 'phrase',
    level: 1,
    exampleZh: '洗手间在哪儿？',
    examplePy: 'Xǐshǒujiān zài nǎr?',
    exampleEn: 'Where is the restroom?'
  },
  '不仅': {
    hanzi: '不仅',
    pinyin: 'bùjǐn',
    meaning: 'not only; not just',
    partOfSpeech: 'conjunction',
    level: 3,
    exampleZh: '他不仅会说汉语，还会写汉字。',
    examplePy: 'Tā bùjǐn huì shuō Hànyǔ, hái huì xiě hànzì.',
    exampleEn: 'He not only can speak Chinese, but also write characters.'
  },
  '而且': {
    hanzi: '而且',
    pinyin: 'érqiě',
    meaning: 'moreover; furthermore; but also',
    partOfSpeech: 'conjunction',
    level: 3,
    exampleZh: '中国菜不仅好吃，而且很便宜。',
    examplePy: 'Zhōngguó cài bùjǐn hǎochī, érqiě hěn piányi.',
    exampleEn: 'Chinese food is not only delicious, but also very cheap.'
  }
};

// Global index cache of vocab items
let vocabMapCache: Map<string, VocabItem> | null = null;
function getVocabMap(): Map<string, VocabItem> {
  if (!vocabMapCache) {
    vocabMapCache = new Map();
    for (const v of hsk1Vocab) vocabMapCache.set(v.hanzi, v);
    for (const v of hsk2Vocab) vocabMapCache.set(v.hanzi, v);
    for (const v of hsk3Vocab) vocabMapCache.set(v.hanzi, v);
  }
  return vocabMapCache;
}

/**
 * Returns enriched vocabulary item with pinyin, definition, part of speech and practical example sentence.
 */
export function getEnrichedVocabForWord(word: string, fallbackLevel: HskLevel = 1): EnrichedVocabItem {
  const map = getVocabMap();
  const found = map.get(word);
  if (found) {
    return {
      hanzi: found.hanzi,
      pinyin: found.pinyin,
      meaning: found.meaning,
      partOfSpeech: found.partOfSpeech || 'word',
      level: found.level,
      exampleZh: found.exampleZh,
      examplePy: found.examplePy,
      exampleEn: found.exampleEn
    };
  }

  if (auxiliaryVocabMap[word]) {
    return auxiliaryVocabMap[word];
  }

  // Graceful fallback if not found
  return {
    hanzi: word,
    pinyin: word,
    meaning: 'Key syllabus vocabulary term',
    partOfSpeech: 'vocabulary',
    level: fallbackLevel,
    exampleZh: `${word}是重要的汉语词汇。`,
    examplePy: `${word} shì zhòngyào de Hànyǔ cíhuì.`,
    exampleEn: `${word} is an essential Chinese vocabulary term.`
  };
}

/**
 * Returns all enriched vocabulary items for a given lesson.
 */
export function getEnrichedVocabForLesson(lesson: Lesson): EnrichedVocabItem[] {
  return (lesson.keyVocab || []).map(w => getEnrichedVocabForWord(w, lesson.level));
}

/**
 * Get unit number within its specific HSK level (e.g. Unit 1 through Unit 10).
 */
export function getLessonUnitNumber(slug: string): number {
  const lesson = lessonsData.find(l => l.slug === slug);
  if (!lesson) return 1;
  const levelLessons = lessonsData.filter(l => l.level === lesson.level);
  const idx = levelLessons.findIndex(l => l.slug === slug);
  return idx >= 0 ? idx + 1 : 1;
}

/**
 * Returns adjacent previous and next lessons across the curriculum.
 */
export function getAdjacentLessons(slug: string): { prevLesson: Lesson | null; nextLesson: Lesson | null } {
  const idx = lessonsData.findIndex(l => l.slug === slug);
  if (idx < 0) return { prevLesson: null, nextLesson: null };
  const prevLesson = idx > 0 ? lessonsData[idx - 1] : null;
  const nextLesson = idx < lessonsData.length - 1 ? lessonsData[idx + 1] : null;
  return { prevLesson, nextLesson };
}

/**
 * Returns 2-3 contextual study guides relevant to the lesson's level and themes.
 */
export function getRelatedGuidesForLesson(lesson: Lesson): BlogPost[] {
  const levelTag = `HSK ${lesson.level}`;
  // Find posts matching the same level or beginner/curriculum
  const matching = blogPostsData.filter(b => b.tags.includes(levelTag) || b.tags.includes('Curriculum') || b.tags.includes('Grammar'));
  if (matching.length >= 3) {
    return matching.slice(0, 3);
  }
  return blogPostsData.slice(0, 3);
}

/**
 * Combines the 6 standalone grammar compendium points with the 82 lesson grammar points
 * into the complete 88-Point Grammar Compendium.
 */
let all88GrammarPointsCache: CompendiumGrammarPoint[] | null = null;
export function getAll88GrammarPoints(): CompendiumGrammarPoint[] {
  if (all88GrammarPointsCache) return all88GrammarPointsCache;

  const list: CompendiumGrammarPoint[] = [];

  // 1. Add 6 standalone featured grammar rules
  for (const g of grammarData) {
    list.push({
      id: g.id,
      title: g.title,
      level: g.level,
      pattern: g.pattern,
      explanation: g.explanation,
      examples: g.examples,
      commonMistake: g.commonMistake,
      tip: g.tip,
      isStandalone: true
    });
  }

  // 2. Add 82 lesson grammar points with parent lesson connections
  lessonsData.forEach((lesson, lIdx) => {
    (lesson.grammarPoints || []).forEach((gp, gpIdx) => {
      const parts = gp.split(':');
      let title = parts[0].trim();
      let formulaOrDesc = parts.slice(1).join(':').trim() || title;

      // Extract practical formula pattern if in parentheses or after colon
      let pattern = formulaOrDesc;
      let explanation = `Grammar structure taught in ${lesson.title}. Essential for understanding sentence flow and standard word order in HSK ${lesson.level}.`;
      
      // Extract example dialogue sentence from lesson that uses this structure
      const relatedDialogue = lesson.dialogue[gpIdx % lesson.dialogue.length] || lesson.dialogue[0];
      const examples = relatedDialogue ? [
        {
          zh: relatedDialogue.zh,
          py: relatedDialogue.py,
          en: relatedDialogue.en
        }
      ] : [];

      list.push({
        id: `gp-${lesson.id}-${gpIdx + 1}`,
        title: `${title} (${lesson.title.split('(')[0].trim()})`,
        level: lesson.level,
        pattern: pattern,
        explanation: explanation,
        examples: examples,
        lessonId: lesson.id,
        lessonSlug: lesson.slug,
        lessonTitle: lesson.title,
        isStandalone: false
      });
    });
  });

  all88GrammarPointsCache = list;
  return list;
}
