import { hsk1Vocab } from './hsk1-vocab';
import { hsk2Vocab } from './hsk2-vocab';
import { hsk3Vocab } from './hsk3-vocab';
import { lessonsData } from './lessons';
import { grammarData } from './grammar';
import { mockTestsData } from './mock-tests';
import { blogPostsData } from './blogs';
import { VocabItem, HskLevel, Lesson, GrammarPoint, MockTest, BlogPost } from '../types';

export { hsk1Vocab, hsk2Vocab, hsk3Vocab, lessonsData, grammarData, mockTestsData, blogPostsData };

export function getVocabByLevel(level: HskLevel): VocabItem[] {
  if (level === 1) return hsk1Vocab;
  if (level === 2) return hsk2Vocab;
  if (level === 3) return hsk3Vocab;
  return [];
}

export function getAllVocab(): VocabItem[] {
  return [...hsk1Vocab, ...hsk2Vocab, ...hsk3Vocab];
}

export function searchVocab(query: string, level?: HskLevel): VocabItem[] {
  const q = query.trim().toLowerCase();
  const source = level ? getVocabByLevel(level) : getAllVocab();
  if (!q) return source;

  return source.filter(item => 
    item.hanzi.includes(q) ||
    item.pinyin.toLowerCase().includes(q) ||
    item.meaning.toLowerCase().includes(q) ||
    (item.tags && item.tags.some(t => t.toLowerCase().includes(q)))
  );
}

export function getLessonsByLevel(level: HskLevel): Lesson[] {
  return lessonsData.filter(l => l.level === level);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessonsData.find(l => l.slug === slug);
}

export function getGrammarByLevel(level: HskLevel): GrammarPoint[] {
  return grammarData.filter(g => g.level === level);
}

export function getGrammarBySlug(slug: string): GrammarPoint | undefined {
  return grammarData.find(g => g.slug === slug);
}

export function getMockTestsByLevel(level: HskLevel): MockTest[] {
  return mockTestsData.filter(t => t.level === level);
}

export function getMockTestByLevel(level: HskLevel): MockTest | undefined {
  return mockTestsData.find(t => t.level === level);
}

export function getMockTestById(id: string): MockTest | undefined {
  return mockTestsData.find(t => t.id === id);
}

export function getMockTestByLevelAndSlug(levelStr: string, slugOrId: string): MockTest | undefined {
  // Normalize level: "hsk1" -> 1, "1" -> 1
  const cleanLevel = parseInt(levelStr.replace(/[^0-9]/g, ''), 10) as HskLevel;
  return mockTestsData.find(t => 
    t.level === cleanLevel && (t.slug === slugOrId || t.id === slugOrId || t.id === `hsk${cleanLevel}-${slugOrId}`)
  ) || mockTestsData.find(t => t.id === slugOrId);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPostsData;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.find(b => b.slug === slug);
}

export * from './vocab-helpers';

