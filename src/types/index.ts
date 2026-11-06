export type HskLevel = 1 | 2 | 3;

export interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  level: HskLevel;
  partOfSpeech: string;
  radical?: string;
  strokeCount?: number;
  exampleZh: string;
  examplePy: string;
  exampleEn: string;
  audioText?: string;
  tags?: string[];
}

export interface GrammarPoint {
  id: string;
  slug: string;
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
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  level: HskLevel;
  description: string;
  dialogue: {
    speaker: string;
    zh: string;
    py: string;
    en: string;
  }[];
  keyVocab: string[]; // Hanzi words
  grammarPoints: string[];
  practiceQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface MockQuestion {
  id: number;
  section: 'listening' | 'reading' | 'writing';
  audioPrompt?: string; // Text for TTS audio
  imagePrompt?: string; // SVG or icon cue
  textPrompt?: string;
  type: 'true-false' | 'multiple-choice' | 'dialogue-match' | 'sentence-order';
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
}

export interface MockTest {
  id: string;
  level: HskLevel;
  title: string;
  category?: 'listening' | 'reading';
  gateNumber?: number;
  slug?: string;
  difficulty?: 'Standard' | 'Challenging' | 'Speed Sprint' | string;
  description?: string;
  timeMinutes: number;
  passingScore: number;
  totalScore: number;
  questions: MockQuestion[];
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  content: string; // Markdown or rich HTML
}
