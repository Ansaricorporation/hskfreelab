/**
 * scripts/prerender.ts
 * Build-time static HTML generator and sitemap generator for HSK Free Lab (mybwn.com).
 * Generates 200 OK physical HTML files for all canonical routes and articles on GitHub Pages.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import datasets
import { blogPostsData } from '../src/data/blogs.ts';
import { hsk1Vocab } from '../src/data/hsk1-vocab.ts';
import { hsk2Vocab } from '../src/data/hsk2-vocab.ts';
import { hsk3Vocab } from '../src/data/hsk3-vocab.ts';
import { lessonsData } from '../src/data/lessons.ts';
import { grammarData } from '../src/data/grammar.ts';
import { mockTestsData } from '../src/data/mock-tests.ts';
import { 
  getAll88GrammarPoints, 
  getEnrichedVocabForLesson, 
  getLessonUnitNumber, 
  getAdjacentLessons, 
  getRelatedGuidesForLesson 
} from '../src/data/lesson-helpers.ts';
import { 
  allVocabWithSlugs, 
  getAdjacentWords, 
  getConstituentCharacters, 
  getToneBreakdown, 
  getSharedCharacterFamily, 
  getWordCorpusAppearances, 
  getWordUsageGuide, 
  getWordPracticeQuiz,
  type VocabItemWithSlug 
} from '../src/data/vocab-helpers.ts';
import { 
  all88GrammarRules, 
  type EnrichedGrammarRule 
} from '../src/data/grammar-helpers.ts';
import { 
  comparisonsData, 
  getAdjacentComparisons,
  type ComparisonItem 
} from '../src/data/comparisons.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const SITE_DOMAIN = 'https://mybwn.com';
const TODAY = '2026-11-07';

interface RouteDefinition {
  path: string;
  title: string;
  description: string;
  type?: string;
  priority: number;
  changefreq: string;
  jsonLd: object | object[];
  renderBody: () => string;
}

// Convert markdown to clean semantic HTML
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-stone-900 mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-black text-stone-900 mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black text-stone-900 mt-8 mb-4">$1</h1>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-stone-700 my-1">$1</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .split('\n\n')
    .map(p => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h') || trimmed.startsWith('<li')) return trimmed;
      return `<p class="text-stone-700 leading-relaxed my-3">${trimmed}</p>`;
    })
    .join('\n');
}

// Global Nav Header for Pre-rendered HTML
function renderStaticHeader(): string {
  return `
  <header class="w-full bg-white border-b border-stone-200 py-4 px-6 shadow-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="/" class="flex items-center gap-2 font-bold text-lg text-stone-900 tracking-tight">
        <span class="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-serif text-lg font-black">汉</span>
        <span>HSK Free Lab</span>
      </a>
      <nav class="hidden md:flex items-center gap-4 text-sm font-semibold text-stone-700">
        <a href="/hsk-1" class="hover:text-emerald-700">HSK 1</a>
        <a href="/hsk-2" class="hover:text-sky-700">HSK 2</a>
        <a href="/hsk-3" class="hover:text-rose-700">HSK 3</a>
        <a href="/calculator" class="hover:text-amber-700">Calculator</a>
        <a href="/pinyin-trainer" class="hover:text-blue-700">Pinyin Trainer</a>
        <a href="/mock-tests" class="hover:text-purple-700">Mock Tests</a>
        <a href="/stroke-order" class="hover:text-rose-700">Stroke Animator</a>
        <a href="/lessons" class="hover:text-emerald-700">Lessons</a>
        <a href="/guides" class="hover:text-rose-700">Guides</a>
        <a href="/compare" class="hover:text-amber-700">Compare</a>
      </nav>
      <div class="flex items-center gap-2">
        <a href="/about" class="text-xs font-semibold px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50">About</a>
        <a href="/contact" class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-900 text-white hover:bg-stone-800">Contact</a>
      </div>
    </div>
  </header>`;
}

// Global Footer for Pre-rendered HTML
function renderStaticFooter(): string {
  return `
  <footer class="w-full bg-stone-900 text-stone-300 mt-20 py-12 px-6 border-t border-stone-800">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      <div>
        <h4 class="font-bold text-white text-base mb-3">HSK Free Lab</h4>
        <p class="text-stone-400 text-xs leading-relaxed">The 100% free, zero-paywall platform to master Chinese proficiency for HSK 1, 2, and 3.</p>
        <div class="mt-4 text-xs text-emerald-400 font-semibold">100% Free · No Registration</div>
      </div>
      <div>
        <h4 class="font-bold text-white mb-3">HSK Syllabus</h4>
        <ul class="space-y-2 text-xs text-stone-400">
          <li><a href="/words" class="hover:text-white">603 Words Dictionary</a></li>
          <li><a href="/hsk-1" class="hover:text-white">HSK 1 (150 Vocab &amp; Audio)</a></li>
          <li><a href="/hsk-2" class="hover:text-white">HSK 2 (300 Vocab &amp; Grammar)</a></li>
          <li><a href="/hsk-3" class="hover:text-white">HSK 3 (600 Vocab &amp; Reading)</a></li>
          <li><a href="/lessons" class="hover:text-white">30 Interactive Lessons</a></li>
          <li><a href="/grammar" class="hover:text-white">Grammar Compendium</a></li>
          <li><a href="/compare" class="hover:text-white">Confusing Words &amp; Comparisons</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold text-white mb-3">Diagnostic Tools</h4>
        <ul class="space-y-2 text-xs text-stone-400">
          <li><a href="/calculator" class="hover:text-white">HSK Score Calculator</a></li>
          <li><a href="/pinyin-trainer" class="hover:text-white">Pinyin &amp; 4 Tones Trainer</a></li>
          <li><a href="/stroke-order" class="hover:text-white">Hanzi Stroke Order Animator</a></li>
          <li><a href="/mock-tests" class="hover:text-white">30 Timed Mock Tests</a></li>
          <li><a href="/guides" class="hover:text-white">18 Academic Masterclasses</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold text-white mb-3">Trust &amp; Legal</h4>
        <ul class="space-y-2 text-xs text-stone-400">
          <li><a href="/about" class="hover:text-white">About Us &amp; Open Mission</a></li>
          <li><a href="/hsk-history" class="hover:text-white">History of HSK 1.0 vs 3.0</a></li>
          <li><a href="/data-sources" class="hover:text-white">Data Sources &amp; Licenses</a></li>
          <li><a href="/privacy-policy" class="hover:text-white">Privacy Policy</a></li>
          <li><a href="/terms" class="hover:text-white">Terms of Service</a></li>
          <li><a href="/disclaimer" class="hover:text-white">Educational Disclaimer</a></li>
          <li><a href="/sitemap" class="hover:text-white">HTML Sitemap (All 672 Pages)</a></li>
        </ul>
      </div>
    </div>
    <div class="max-w-7xl mx-auto mt-8 pt-6 border-t border-stone-800 text-center text-xs text-stone-500">
      &copy; 2026 HSK Free Lab (mybwn.com). Official CLEC syllabus aligned. Powered by open-source linguistics.
    </div>
  </footer>`;
}

// Static HTML Generator for Master Words Directory (/words)
function renderWordsDirectoryStaticHtml(): string {
  const hsk1 = allVocabWithSlugs.filter(w => w.level === 1);
  const hsk2 = allVocabWithSlugs.filter(w => w.level === 2);
  const hsk3 = allVocabWithSlugs.filter(w => w.level === 3);

  return `
    <div class="max-w-6xl mx-auto py-10 px-4 space-y-10">
      <header class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 text-center space-y-4">
        <span class="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">Official HSK 1–3 Complete Lexicon</span>
        <h1 class="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">Master Chinese Vocabulary Directory (603 Words)</h1>
        <p class="text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Comprehensive study portal indexing all 603 official words in the Chinese Ministry of Education HSK 1, 2, and 3 curriculum. Explore dedicated character study guides, stroke order animations, native audio pronunciation, tone sandhi rules, and practice quizzes.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-2 pt-2">
          <a href="#hsk-1" class="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">HSK 1 (153 Words)</a>
          <a href="#hsk-2" class="px-4 py-2 rounded-xl bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200">HSK 2 (150 Words)</a>
          <a href="#hsk-3" class="px-4 py-2 rounded-xl bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">HSK 3 (300 Words)</a>
        </div>
      </header>

      <!-- HSK 1 Section -->
      <section id="hsk-1" class="space-y-4">
        <div class="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 class="text-2xl font-black text-stone-900">HSK 1 Vocabulary (${hsk1.length} Foundation Words)</h2>
          <a href="/hsk-1" class="text-xs font-bold text-emerald-700 hover:underline">Open HSK 1 Hub &rarr;</a>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
          ${hsk1.map(w => `
            <a href="/words/${w.slug}" class="p-3 bg-white rounded-2xl border border-stone-200 hover:border-emerald-400 hover:shadow-xs transition-all block text-center space-y-1">
              <div class="font-serif font-black text-2xl text-stone-900">${w.hanzi}</div>
              <div class="text-[11px] font-bold text-emerald-700">${w.pinyin}</div>
              <div class="text-[10px] text-stone-500 truncate">${w.meaning}</div>
            </a>`).join('')}
        </div>
      </section>

      <!-- HSK 2 Section -->
      <section id="hsk-2" class="space-y-4">
        <div class="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 class="text-2xl font-black text-stone-900">HSK 2 Vocabulary (${hsk2.length} Elementary Words)</h2>
          <a href="/hsk-2" class="text-xs font-bold text-sky-700 hover:underline">Open HSK 2 Hub &rarr;</a>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
          ${hsk2.map(w => `
            <a href="/words/${w.slug}" class="p-3 bg-white rounded-2xl border border-stone-200 hover:border-sky-400 hover:shadow-xs transition-all block text-center space-y-1">
              <div class="font-serif font-black text-2xl text-stone-900">${w.hanzi}</div>
              <div class="text-[11px] font-bold text-sky-700">${w.pinyin}</div>
              <div class="text-[10px] text-stone-500 truncate">${w.meaning}</div>
            </a>`).join('')}
        </div>
      </section>

      <!-- HSK 3 Section -->
      <section id="hsk-3" class="space-y-4">
        <div class="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 class="text-2xl font-black text-stone-900">HSK 3 Vocabulary (${hsk3.length} Intermediate Words)</h2>
          <a href="/hsk-3" class="text-xs font-bold text-rose-700 hover:underline">Open HSK 3 Hub &rarr;</a>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
          ${hsk3.map(w => `
            <a href="/words/${w.slug}" class="p-3 bg-white rounded-2xl border border-stone-200 hover:border-rose-400 hover:shadow-xs transition-all block text-center space-y-1">
              <div class="font-serif font-black text-2xl text-stone-900">${w.hanzi}</div>
              <div class="text-[11px] font-bold text-rose-700">${w.pinyin}</div>
              <div class="text-[10px] text-stone-500 truncate">${w.meaning}</div>
            </a>`).join('')}
        </div>
      </section>
    </div>
  `;
}

// Static HTML Generator for Individual 88 Grammar Rule Study Guide (/grammar/:slug)
function renderGrammarDetailStaticHtml(rule: EnrichedGrammarRule): string {
  const badgeColor = rule.level === 1 
    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
    : rule.level === 2 
    ? 'bg-sky-50 text-sky-800 border-sky-200' 
    : 'bg-amber-50 text-amber-800 border-amber-200';

  return `
    <article class="max-w-4xl mx-auto py-8 px-4 space-y-10">
      <!-- Breadcrumb Navigation -->
      <nav aria-label="Breadcrumb" class="text-xs text-stone-500">
        <ol class="flex items-center gap-1.5 flex-wrap">
          <li><a href="/" class="hover:underline">Home</a> &gt;</li>
          <li><a href="/hsk-${rule.level}" class="hover:underline">HSK ${rule.level} Hub</a> &gt;</li>
          <li><a href="/grammar" class="hover:underline">Grammar Compendium</a> &gt;</li>
          <li class="font-bold text-stone-900">${rule.title}</li>
        </ol>
      </nav>

      <!-- HERO ARTICLE HEADER -->
      <header class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-bold border ${badgeColor}">HSK ${rule.level}</span>
            <span class="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">${rule.cefr}</span>
            <span class="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 text-xs font-semibold">${rule.category}</span>
            ${rule.parentLessonSlug ? `<a href="/lessons/${rule.parentLessonSlug}" class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold hover:underline">Taught in ${rule.parentLessonTitle || 'Core Lesson'} &rarr;</a>` : ''}
          </div>
          <span class="text-xs text-stone-400 font-mono">Rule ID: ${rule.id}</span>
        </div>

        <div class="space-y-3">
          <h1 class="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
            ${rule.title}
          </h1>
          <p class="text-base text-stone-700 leading-relaxed">
            ${rule.explanation}
          </p>
        </div>

        <!-- Syntax Formula Pattern -->
        <div class="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <div class="text-xs font-bold text-stone-500 uppercase tracking-wider">Core Sentence Pattern Formula:</div>
          <div class="font-mono text-lg sm:text-xl font-black text-sky-800 bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
            ${rule.pattern}
          </div>
        </div>
      </header>

      <!-- SECTION 1: Structural Variations -->
      <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
          <span>📐</span>
          <span>Sentence Variations &amp; Structural Configurations</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
            <div class="text-xs font-bold uppercase text-emerald-900">Affirmative Pattern</div>
            <div class="text-sm font-semibold text-stone-900">${rule.structuralVariations.affirmative}</div>
          </div>
          <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
            <div class="text-xs font-bold uppercase text-rose-900">Negative Pattern (不 / 没)</div>
            <div class="text-sm font-semibold text-stone-900">${rule.structuralVariations.negative}</div>
          </div>
          <div class="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1.5">
            <div class="text-xs font-bold uppercase text-sky-900">Interrogative Question Form</div>
            <div class="text-sm font-semibold text-stone-900">${rule.structuralVariations.question}</div>
          </div>
        </div>
        ${rule.structuralVariations.notes ? `
          <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700">
            <strong>Syntactic Usage Note:</strong> ${rule.structuralVariations.notes}
          </div>` : ''}
      </section>

      <!-- SECTION 2: Authentic Bilingual Examples -->
      <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
          <span>🗣️</span>
          <span>Authentic Contextual Examples &amp; Pronunciation</span>
        </h2>
        <div class="space-y-3">
          ${rule.examples.map((ex) => `
            <div class="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div class="font-serif font-black text-lg sm:text-xl text-stone-900">${ex.zh}</div>
              <div class="text-xs sm:text-sm font-semibold text-rose-700 font-mono">${ex.py}</div>
              <div class="text-xs sm:text-sm text-stone-600">${ex.en}</div>
            </div>`).join('')}
        </div>
      </section>

      <!-- SECTION 3: Common Pitfalls & Exam Strategy -->
      <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
          <span>⚠️</span>
          <span>Common Mistakes &amp; HSK Exam Traps</span>
        </h2>
        <div class="space-y-3">
          ${rule.commonMistakes.map((m, idx) => `
            <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs sm:text-sm text-stone-800">
              <span class="px-2 py-0.5 rounded-md bg-rose-200 text-rose-900 font-black text-xs shrink-0 mt-0.5">Trap ${idx + 1}</span>
              <div>${m}</div>
            </div>`).join('')}
        </div>
        <div class="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
          <div class="text-xs font-bold text-amber-900 uppercase">Official HSK Test Strategy:</div>
          <p class="text-xs sm:text-sm text-amber-950 leading-relaxed">${rule.examStrategy}</p>
        </div>
      </section>

      <!-- SECTION 4: Cross-linked Vocabulary -->
      ${rule.matchedVocab && rule.matchedVocab.length > 0 ? `
      <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div class="flex items-center justify-between">
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
            <span>📖</span>
            <span>Key Syllabus Words Used in this Structure</span>
          </h2>
          <a href="/words" class="text-xs font-bold text-rose-700 hover:underline">All 603 Words &rarr;</a>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          ${rule.matchedVocab.map(v => `
            <a href="/words/${v.slug}" class="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-400 block space-y-1 group">
              <div class="flex items-center justify-between">
                <span class="font-serif font-black text-xl text-stone-900 group-hover:text-emerald-700">${v.hanzi}</span>
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">HSK ${v.level}</span>
              </div>
              <div class="text-xs font-semibold text-rose-700">${v.pinyin}</div>
              <div class="text-[11px] text-stone-500 truncate">${v.meaning}</div>
            </a>`).join('')}
        </div>
      </section>` : ''}

      <!-- SECTION 5: Practice Mastery Quiz -->
      <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
          <span>✍️</span>
          <span>Grammar Mastery Practice Quiz (随堂测试)</span>
        </h2>
        <div class="space-y-5">
          ${rule.quiz.map((q, idx) => `
            <div class="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div class="font-bold text-sm text-stone-900">Question ${idx + 1}: ${q.question}</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                ${q.options.map((opt, optIdx) => `
                  <div class="p-3 rounded-xl border ${optIdx === q.correctIndex ? 'border-emerald-400 bg-emerald-50 text-emerald-950 font-bold' : 'border-stone-200 bg-white text-stone-700'}">
                    <span>${String.fromCharCode(65 + optIdx)}. ${opt}</span>
                    ${optIdx === q.correctIndex ? '<span class="ml-1 text-emerald-700 font-bold">✓ (Correct Answer)</span>' : ''}
                  </div>`).join('')}
              </div>
              <div class="p-3 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 leading-relaxed">
                <strong>Pedagogical Explanation:</strong> ${q.explanation}
              </div>
            </div>`).join('')}
        </div>
      </section>

      <!-- SECTION 6: Circular Navigation & Related Rules -->
      <footer class="space-y-6 pt-6 border-t border-stone-200">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${rule.prevRule ? `
            <a href="/grammar/${rule.prevRule.slug}" class="p-4 rounded-2xl bg-white border border-stone-200 hover:border-sky-400 block space-y-1">
              <div class="text-[10px] uppercase font-bold text-stone-400">&larr; Previous Rule (HSK ${rule.prevRule.level})</div>
              <div class="text-sm font-bold text-stone-900">${rule.prevRule.title}</div>
            </a>` : '<div></div>'}
          ${rule.nextRule ? `
            <a href="/grammar/${rule.nextRule.slug}" class="p-4 rounded-2xl bg-white border border-stone-200 hover:border-sky-400 block space-y-1 text-right">
              <div class="text-[10px] uppercase font-bold text-stone-400">Next Rule (HSK ${rule.nextRule.level}) &rarr;</div>
              <div class="text-sm font-bold text-stone-900">${rule.nextRule.title}</div>
            </a>` : '<div></div>'}
        </div>

        <!-- 4 Related Rules -->
        ${rule.relatedRules && rule.relatedRules.length > 0 ? `
          <div class="p-6 bg-white rounded-3xl border border-stone-200 space-y-4">
            <h3 class="text-base font-bold text-stone-900">Related Grammar Rules to Study:</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${rule.relatedRules.map(rel => `
                <a href="/grammar/${rel.slug}" class="p-3.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-sky-300 block space-y-1">
                  <div class="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase">
                    <span>${rel.category}</span>
                    <span class="text-sky-700">HSK ${rel.level}</span>
                  </div>
                  <div class="font-bold text-xs text-stone-900">${rel.title}</div>
                  <div class="text-[11px] font-mono text-stone-500 truncate">${rel.pattern}</div>
                </a>`).join('')}
            </div>
          </div>` : ''}
      </footer>
    </article>
  `;
}

// Static HTML Generator for Confusing Words Hub (/compare)
function renderCompareListStaticHtml(): string {
  return `
    <div class="max-w-7xl mx-auto py-10 px-4 space-y-12">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="text-xs text-stone-500">
        <a href="/" class="hover:underline">Home</a> &gt;
        <span class="font-bold text-stone-900">Confusing Chinese Words Compared</span>
      </nav>

      <!-- Header -->
      <header class="max-w-3xl space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <span>⚖️</span>
          <span>Position #0 Comparison Compendium · 15 High-Search Pairs</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          Confusing Chinese Words &amp; Grammar Compared
        </h1>
        <p class="text-base sm:text-lg text-stone-600 leading-relaxed">
          Clear, side-by-side contrast tables, practical examples, common exam traps (<span class="text-emerald-600 font-bold">✅</span> vs. <span class="text-rose-600 font-bold">❌</span>), and diagnostic quizzes for the 15 most searched Chinese beginner questions.
        </p>
      </header>

      <!-- Comparisons Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${comparisonsData.map(c => `
          <article class="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  ${c.level} · CEFR ${c.cefr}
                </span>
                <span class="text-[11px] font-semibold text-stone-400">15 Guides</span>
              </div>
              <div class="flex items-center gap-3 pt-1">
                ${c.words.map(w => `
                  <div class="flex-1 p-3 rounded-2xl bg-stone-50 border border-stone-100 text-center">
                    <div class="text-2xl font-black text-stone-900 font-serif">${w.hanzi}</div>
                    <div class="text-xs font-bold text-amber-700">${w.pinyin}</div>
                    <div class="text-[11px] text-stone-500 truncate mt-0.5">${w.meaning}</div>
                  </div>`).join('')}
              </div>
              <h2 class="text-base font-bold text-stone-900 leading-snug">
                <a href="/compare/${c.slug}" class="hover:text-amber-600">${c.title}</a>
              </h2>
              <p class="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                ${c.summary}
              </p>
            </div>
            <div class="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span class="text-stone-400">3-Question Practice Quiz</span>
              <a href="/compare/${c.slug}" class="font-bold text-amber-700 hover:underline">Compare Rules &rarr;</a>
            </div>
          </article>`).join('')}
      </div>

      <!-- FAQ Section -->
      <section class="max-w-4xl mx-auto space-y-6 pt-10 border-t border-stone-200">
        <h2 class="text-2xl font-black text-stone-900">Frequently Asked Questions About Tricky Chinese Words</h2>
        <div class="space-y-4 text-xs sm:text-sm">
          <div class="p-5 rounded-2xl bg-white border border-stone-200 space-y-2">
            <h3 class="font-bold text-stone-900 text-base">Why are these Chinese word pairs so confusing for beginners?</h3>
            <p class="text-stone-600 leading-relaxed">English often uses a single word (like "can", "know", "again", or "see") where Mandarin Chinese makes precise distinctions based on aspect, result, intentionality, or grammatical category.</p>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-stone-200 space-y-2">
            <h3 class="font-bold text-stone-900 text-base">Are these distinctions tested on official HSK exams?</h3>
            <p class="text-stone-600 leading-relaxed">Yes! Examiners deliberately design reading comprehension, sentence completion, and error-identification questions around these exact traps—especially 不 vs. 没, 的 vs. 得 vs. 地, and separable verbs like 帮忙.</p>
          </div>
        </div>
      </section>
    </div>
  `;
}

// Static HTML Generator for Individual Comparison Detail (/compare/:slug)
function renderCompareDetailStaticHtml(item: ComparisonItem): string {
  const adjacent = getAdjacentComparisons(item.slug);

  return `
    <article class="max-w-4xl mx-auto py-10 px-4 space-y-10">
      <!-- Breadcrumb Navigation -->
      <nav aria-label="Breadcrumb" class="text-xs text-stone-500">
        <ol class="flex items-center gap-1.5 flex-wrap">
          <li><a href="/" class="hover:underline">Home</a> &gt;</li>
          <li><a href="/compare" class="hover:underline">Comparisons</a> &gt;</li>
          <li class="font-bold text-stone-900">${item.shortTitle}</li>
        </ol>
      </nav>

      <!-- Header -->
      <header class="space-y-4">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            ${item.level} · CEFR ${item.cefr}
          </span>
          <span class="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-600">
            Position #0 Featured Snippet Ready
          </span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
          ${item.title}
        </h1>
        <p class="text-stone-500 text-xs sm:text-sm">
          Curated by HSK Free Lab Editorial Team · Verified for HSK 1–3 &amp; HSK 3.0 Standard
        </p>
      </header>

      <!-- Featured Snippet Box (Position #0) -->
      <section class="p-6 sm:p-8 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-sm space-y-3">
        <div class="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
          <span>✨</span>
          <span>Quick Answer &amp; Core Distinction (In 10 Seconds)</span>
        </div>
        <p class="text-base sm:text-lg text-stone-900 font-medium leading-relaxed">
          ${item.summary}
        </p>
      </section>

      <!-- Side-by-Side Comparison Table -->
      <section class="space-y-4">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
          <span>⚖️</span>
          <span>Side-by-Side Comparison Table</span>
        </h2>
        <div class="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr class="bg-stone-100 border-b border-stone-200 text-stone-800">
                <th class="p-4 font-bold w-1/4">Feature / Context</th>
                <th class="p-4 font-black text-amber-700">${item.words[0].hanzi} (${item.words[0].pinyin})</th>
                <th class="p-4 font-black text-sky-700">${item.words[1].hanzi} (${item.words[1].pinyin})</th>
                ${item.words[2] ? `<th class="p-4 font-black text-emerald-700">${item.words[2].hanzi} (${item.words[2].pinyin})</th>` : ''}
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100">
              ${item.table.map(row => `
                <tr class="hover:bg-stone-50/60">
                  <td class="p-4 font-bold text-stone-700 bg-stone-50/50">${row.criteria}</td>
                  <td class="p-4 text-stone-800 leading-relaxed">${row.word1}</td>
                  <td class="p-4 text-stone-800 leading-relaxed">${row.word2}</td>
                  ${item.words[2] && row.word3 ? `<td class="p-4 text-stone-800 leading-relaxed">${row.word3}</td>` : ''}
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Lexical Breakdown -->
      <section class="space-y-4">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900">Lexical Breakdown</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 ${item.words.length === 3 ? 'lg:grid-cols-3' : ''} gap-4">
          ${item.words.map(w => `
            <div class="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">${w.partOfSpeech}</span>
              </div>
              <div class="text-center py-2">
                <div class="text-5xl font-black text-stone-900 font-serif">${w.hanzi}</div>
                <div class="text-lg font-bold text-amber-700 mt-1">${w.pinyin}</div>
                <div class="text-xs font-semibold text-stone-500 mt-1">"${w.meaning}"</div>
              </div>
              <div class="p-3.5 rounded-2xl bg-stone-50 text-xs text-stone-600 leading-relaxed">
                <strong class="text-stone-800">Core Role:</strong> ${w.coreFunction}
              </div>
            </div>`).join('')}
        </div>
      </section>

      <!-- In-Depth Rules with Examples -->
      <section class="space-y-6">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
          <span>📖</span>
          <span>In-Depth Grammar Rules &amp; Usage</span>
        </h2>
        <div class="space-y-6">
          ${item.rules.map(rule => `
            <div class="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
              <h3 class="text-lg sm:text-xl font-bold text-stone-900">${rule.heading}</h3>
              <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">${rule.explanation}</p>
              ${rule.formula ? `
                <div class="p-4 rounded-2xl bg-stone-900 text-amber-300 font-mono text-xs sm:text-sm">
                  <div class="text-[10px] uppercase font-bold text-stone-400 mb-1">Sentence Formula</div>
                  <div>${rule.formula}</div>
                </div>` : ''}
              <div class="space-y-3 pt-2">
                ${rule.examples.map(ex => `
                  <div class="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
                    <div class="text-base sm:text-lg font-bold text-stone-900">${ex.zh}</div>
                    <div class="text-xs font-semibold text-amber-700">${ex.py}</div>
                    <div class="text-xs sm:text-sm text-stone-600">"${ex.en}"</div>
                    ${ex.note ? `<div class="text-[11px] text-stone-400 italic pt-1">Note: ${ex.note}</div>` : ''}
                  </div>`).join('')}
              </div>
            </div>`).join('')}
        </div>
      </section>

      <!-- Common Traps: Correct vs. Wrong Sentences -->
      <section class="space-y-6">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
          <span>⚠️</span>
          <span>Common Traps: Correct vs. Wrong Sentences</span>
        </h2>
        <div class="space-y-4">
          ${item.mistakes.map(m => `
            <div class="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                  <div class="text-xs font-bold text-rose-700 uppercase tracking-wide">✘ Incorrect</div>
                  <div class="text-base font-bold text-rose-900 line-through">${m.incorrectZh}</div>
                  <div class="text-xs text-rose-600">${m.incorrectPy}</div>
                </div>
                <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <div class="text-xs font-bold text-emerald-700 uppercase tracking-wide">✔ Correct</div>
                  <div class="text-base font-bold text-emerald-900">${m.correctZh}</div>
                  <div class="text-xs text-emerald-600">${m.correctPy}</div>
                </div>
              </div>
              <div class="text-xs sm:text-sm text-stone-600 bg-stone-50 p-4 rounded-2xl">
                <strong class="text-stone-900">Why?</strong> ${m.explanation}
              </div>
            </div>`).join('')}
        </div>
      </section>

      <!-- Interactive Practice Quiz -->
      <section class="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
          <span>✍️</span>
          <span>Interactive Practice Quiz</span>
        </h2>
        <div class="space-y-5">
          ${item.quiz.map((q, idx) => `
            <div class="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-3">
              <div class="font-bold text-sm sm:text-base text-stone-900">Question ${idx + 1}: ${q.question}</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                ${q.options.map((opt, optIdx) => `
                  <div class="p-3 rounded-xl border ${optIdx === q.answer ? 'border-emerald-400 bg-emerald-50 text-emerald-950 font-bold' : 'border-stone-200 bg-white text-stone-700'}">
                    <span>${String.fromCharCode(65 + optIdx)}. ${opt}</span>
                    ${optIdx === q.answer ? '<span class="ml-1 text-emerald-700 font-bold">✓ (Correct)</span>' : ''}
                  </div>`).join('')}
              </div>
              <div class="p-3 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 leading-relaxed">
                <strong>Pedagogical Explanation:</strong> ${q.explanation}
              </div>
            </div>`).join('')}
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="space-y-4">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
          <span>❓</span>
          <span>Frequently Asked Questions</span>
        </h2>
        <div class="space-y-3">
          ${item.faq.map(faq => `
            <div class="p-5 rounded-2xl bg-white border border-stone-200 space-y-2">
              <h3 class="font-bold text-stone-900 text-sm sm:text-base">${faq.q}</h3>
              <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">${faq.a}</p>
            </div>`).join('')}
        </div>
      </section>

      <!-- Navigation Footer -->
      <footer class="space-y-6 pt-6 border-t border-stone-200">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${adjacent.prev ? `
            <a href="/compare/${adjacent.prev.slug}" class="p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 block space-y-1">
              <div class="text-[10px] uppercase font-bold text-stone-400">&larr; Previous Comparison</div>
              <div class="text-sm font-bold text-stone-900">${adjacent.prev.shortTitle}</div>
            </a>` : '<div></div>'}
          ${adjacent.next ? `
            <a href="/compare/${adjacent.next.slug}" class="p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 block space-y-1 text-right">
              <div class="text-[10px] uppercase font-bold text-stone-400">Next Comparison &rarr;</div>
              <div class="text-sm font-bold text-stone-900">${adjacent.next.shortTitle}</div>
            </a>` : '<div></div>'}
        </div>
      </footer>
    </article>
  `;
}


// Static HTML Generator for Individual Word Study Guide (/words/:slug)
function renderWordDetailStaticHtml(word: VocabItemWithSlug): string {
  const chars = getConstituentCharacters(word.hanzi);
  const toneData = getToneBreakdown(word);
  const family = getSharedCharacterFamily(word, 8);
  const corpus = getWordCorpusAppearances(word);
  const usage = getWordUsageGuide(word);
  const quiz = getWordPracticeQuiz(word);
  const adjacent = getAdjacentWords(word.slug);

  const cefr = word.level === 1 ? 'A1 (Breakthrough)' : (word.level === 2 ? 'A2 (Waystage)' : 'B1 (Threshold)');

  return `
    <article class="max-w-4xl mx-auto py-8 px-4 space-y-10">
      <!-- Breadcrumb Navigation -->
      <nav aria-label="Breadcrumb" class="text-xs text-stone-500">
        <ol class="flex items-center gap-1.5 flex-wrap">
          <li><a href="/" class="hover:underline">Home</a> &gt;</li>
          <li><a href="/hsk-${word.level}" class="hover:underline">HSK ${word.level} Hub</a> &gt;</li>
          <li><a href="/words" class="hover:underline">Words Directory</a> &gt;</li>
          <li class="font-bold text-stone-900">${word.hanzi} (${word.pinyin})</li>
        </ol>
      </nav>

      <!-- Hero Card -->
      <header class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4">
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">HSK Level ${word.level}</span>
          <span class="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 font-semibold">CEFR ${cefr}</span>
          <span class="px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 font-semibold capitalize">${word.partOfSpeech}</span>
          ${word.radical ? `<span class="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold">Radical: ${word.radical}</span>` : ''}
          ${word.strokeCount ? `<span class="px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 font-semibold">${word.strokeCount} Strokes</span>` : ''}
        </div>
        <div class="flex items-baseline gap-4 flex-wrap">
          <h1 class="font-serif font-black text-5xl sm:text-6xl text-stone-900 tracking-tight">${word.hanzi}</h1>
          <span class="text-2xl sm:text-3xl font-black text-rose-600">${word.pinyin}</span>
        </div>
        <p class="text-2xl font-bold text-stone-800">${word.meaning}</p>
        <p class="text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
          <strong>Overview:</strong> 「${word.hanzi}」 (${word.pinyin}) is an official <strong>HSK ${word.level}</strong> vocabulary ${word.partOfSpeech} meaning <em>"${word.meaning}"</em>. Below is the comprehensive academic study guide featuring character stroke breakdowns, phonetic tone pitch analysis, grammatical collocations, and practice exam questions.
        </p>
      </header>

      <!-- Section: Stroke Order & Character Anatomy -->
      <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900">Chinese Character Stroke Order &amp; Anatomy</h2>
        <p class="text-xs text-stone-600 leading-relaxed">
          Official stroke sequence for writing 「${word.hanzi}」 according to standard Chinese ministry orthography. Click any character below to open the dedicated stroke animator and interactive handwriting canvas.
        </p>
        <div class="flex flex-wrap gap-4 pt-2">
          ${chars.map(c => `
            <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center min-w-[130px] space-y-1.5">
              <div class="font-serif font-black text-5xl text-stone-900">${c}</div>
              <div class="text-[11px] font-bold text-rose-600"><a href="/stroke-order/${encodeURIComponent(c)}" class="hover:underline">Animate &amp; Practice &rarr;</a></div>
            </div>`).join('')}
        </div>
      </section>

      <!-- Section: Pinyin Pitch Contour & Sandhi -->
      <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900">Pinyin Pitch Contour &amp; Sandhi Rules</h2>
        <p class="text-xs text-stone-600 leading-relaxed">
          Acoustic pitch height, five-degree pitch values, and connected speech tone modifications for 「${word.hanzi}」.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${toneData.syllables.map(s => `
            <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-serif font-black text-3xl text-stone-900">${s.hanziChar}</span>
                <span class="text-base font-bold text-rose-600">${s.pinyin}</span>
              </div>
              <div class="text-xs font-bold text-stone-800">${s.toneName} · Pitch ${s.tonePitch}</div>
              <p class="text-[11px] text-stone-600 leading-relaxed">${s.toneDescription}</p>
            </div>`).join('')}
        </div>
        ${toneData.sandhiRules.length > 0 ? `
          <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <div class="font-bold flex items-center gap-1.5">
              <span>⚡</span>
              <span>Tone Modification (Sandhi) Rule</span>
            </div>
            ${toneData.sandhiRules.map(r => `<p class="leading-relaxed">${r}</p>`).join('')}
          </div>` : ''}
      </section>

      <!-- Section: Contextual Example Sentences & Corpus -->
      <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900">Contextual Example Sentences &amp; Exam Dialogue</h2>
        <div class="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
          <div class="text-[10px] font-bold uppercase text-stone-400">Primary Syllabus Sentence</div>
          <div class="font-serif font-black text-xl text-stone-900">${word.exampleZh}</div>
          <div class="text-xs font-semibold text-rose-600">${word.examplePy}</div>
          <div class="text-xs text-stone-600">${word.exampleEn}</div>
        </div>

        ${corpus.length > 0 ? `
          <div class="space-y-3 pt-2">
            <h3 class="text-xs font-bold text-stone-500 uppercase tracking-wider">Lesson &amp; Grammar Corpus Appearances (${corpus.length})</h3>
            <div class="space-y-2.5">
              ${corpus.map(m => `
                <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-rose-700">${m.title}</span>
                    <a href="${m.source === 'lesson' ? `/lessons/${m.slug}` : '/grammar'}" class="text-[11px] text-stone-500 hover:underline">View Source &rarr;</a>
                  </div>
                  <div class="font-serif font-bold text-base text-stone-900">${m.zh}</div>
                  <div class="text-[11px] text-rose-600 font-medium">${m.py}</div>
                  <div class="text-xs text-stone-600">${m.en}</div>
                </div>`).join('')}
            </div>
          </div>` : ''}
      </section>

      <!-- Section: Grammar Patterns & Collocations -->
      <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900">Grammar Patterns &amp; Syntactic Placement</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
            <div class="font-bold text-stone-700 uppercase text-[10px]">Syntactic Pattern</div>
            <div class="font-mono font-bold text-rose-700 p-3 bg-white rounded-xl border border-stone-200">${usage.syntacticPattern}</div>
            <p class="text-stone-600 leading-relaxed pt-1">${usage.grammaticalRole}</p>
          </div>
          <div class="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
            <div class="font-bold text-amber-800 uppercase text-[10px]">HSK ${word.level} Exam Tip</div>
            <p class="text-stone-700 leading-relaxed">${usage.examTips}</p>
          </div>
        </div>
      </section>

      <!-- Section: Shared-Character Word Family -->
      ${family.length > 0 ? `
        <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 class="text-xl sm:text-2xl font-black text-stone-900">Shared-Character Word Family &amp; Radical Network</h2>
          <p class="text-xs text-stone-600">Connect compound words sharing characters or radicals with 「${word.hanzi}」 across the HSK 1–3 syllabus.</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            ${family.map(f => `
              <a href="/words/${f.word.slug}" class="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-rose-400 block space-y-1.5 transition-all">
                <div class="flex items-center justify-between text-[10px] text-stone-400">
                  <span>Shared: ${f.sharedElement}</span>
                  <span>HSK ${f.word.level}</span>
                </div>
                <div class="font-serif font-black text-2xl text-stone-900">${f.word.hanzi}</div>
                <div class="text-[11px] font-bold text-rose-600">${f.word.pinyin}</div>
                <div class="text-[10px] text-stone-500 truncate">${f.word.meaning}</div>
              </a>`).join('')}
          </div>
        </section>` : ''}

      <!-- Section: Practice Quiz -->
      <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900">Interactive 3-Question Practice Quiz</h2>
        <div class="space-y-4">
          ${quiz.map((q, qIdx) => `
            <div class="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
              <div class="font-bold text-stone-900 text-sm">Question ${qIdx + 1}: ${q.question}</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${q.options.map((opt, oIdx) => `
                  <div class="p-2.5 rounded-xl border ${oIdx === q.correctIndex ? 'border-emerald-400 bg-emerald-50 font-bold text-emerald-900' : 'border-stone-200 bg-white text-stone-700'}">
                    <span>${String.fromCharCode(65 + oIdx)}. ${opt}</span>
                    ${oIdx === q.correctIndex ? ' <span class="text-emerald-700 font-bold">(Verified Answer)</span>' : ''}
                  </div>`).join('')}
              </div>
              <div class="p-3 bg-white rounded-xl border border-stone-100 text-stone-600 leading-relaxed">
                <strong>Explanation:</strong> ${q.explanation}
              </div>
            </div>`).join('')}
        </div>
      </section>

      <!-- Section: HSK Exam Strategy & Motor Memory -->
      <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-3">
        <h2 class="text-lg sm:text-xl font-black text-stone-900">HSK ${word.level} Exam Preparation &amp; Memory Guidance</h2>
        <div class="space-y-2 text-xs text-stone-700 leading-relaxed">
          <p>
            In the official Chinese Proficiency Test (HSK Level ${word.level}), candidates are tested on recognizing 「${word.hanzi}」 across listening comprehension dialogues, reading passage sentences, and contextual phrase completion tasks. When listening to audio dialogues, remember that Mandarin Chinese is a tonal language where distinct tonal contours differentiate unrelated vocabulary items that share the identical romanized Pinyin spelling (${word.pinyin}).
          </p>
          <p>
            To build long-term retention and fluent character recall, practice writing each constituent character in the stroke order studio above. Consistent handwriting practice establishes motor memory for character radicals and structural proportions, making it significantly easier to distinguish complex multi-stroke characters in rapid-fire reading passages.
          </p>
        </div>
      </section>

      <!-- Adjacent Word Navigation Footer -->
      <footer class="pt-6 border-t border-stone-200 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <a href="/words/${adjacent.prev.slug}" class="p-4 rounded-2xl bg-white border border-stone-200 hover:border-rose-400 block transition-all">
            <span class="text-[10px] text-stone-400 uppercase font-bold">&larr; Previous Word</span>
            <div class="font-serif font-black text-lg text-stone-900 mt-1">${adjacent.prev.hanzi} (${adjacent.prev.pinyin})</div>
            <div class="text-stone-500 truncate">${adjacent.prev.meaning}</div>
          </a>
          <a href="/words/${adjacent.next.slug}" class="p-4 rounded-2xl bg-white border border-stone-200 hover:border-rose-400 block text-right transition-all">
            <span class="text-[10px] text-stone-400 uppercase font-bold">Next Word &rarr;</span>
            <div class="font-serif font-black text-lg text-stone-900 mt-1">${adjacent.next.hanzi} (${adjacent.next.pinyin})</div>
            <div class="text-stone-500 truncate">${adjacent.next.meaning}</div>
          </a>
        </div>

        <div class="p-5 bg-stone-50 rounded-2xl border border-stone-200 text-xs flex flex-wrap items-center justify-between gap-3">
          <span class="font-bold text-stone-800">More HSK ${word.level} Resources:</span>
          <div class="flex items-center gap-3 flex-wrap">
            <a href="/hsk-${word.level}" class="font-semibold text-rose-700 hover:underline">HSK ${word.level} Hub &rarr;</a>
            <a href="/words" class="font-semibold text-rose-700 hover:underline">603 Words Directory &rarr;</a>
            <a href="/lessons" class="font-semibold text-rose-700 hover:underline">All Lessons &rarr;</a>
            <a href="/mock-tests" class="font-semibold text-rose-700 hover:underline">Timed Mock Tests &rarr;</a>
          </div>
        </div>
      </footer>
    </article>
  `;
}

// FAQ Datasets & HTML Helpers for Position #0 Featured Snippet & Printable SEO
const hsk1Faqs = [
  {
    question: 'How many words are in HSK 1?',
    answer: 'HSK 1 requires exactly 150 official vocabulary words (and approximately 174 unique Chinese characters). These words cover foundational survival communication such as greetings (你好, 再见), numbers (一, 二, 三), family members (爸爸, 妈妈), basic question particles (吗, 呢, 谁), and essential verbs (看, 吃, 喝, 是, 有). On HSK Free Lab, you can practice all 150 words with stroke animations, native audio, and printable cheat sheets.'
  },
  {
    question: 'What is the passing score for HSK 1?',
    answer: 'The passing score for HSK 1 is 120 out of 200 total points (60%). The exam consists of two equal sections: Listening (20 questions, maximum 100 points) and Reading (20 questions, maximum 100 points). There is no minimum score requirement per individual section—as long as your combined total score reaches 120 points, you pass and receive official Hanban/CTI certification.'
  },
  {
    question: 'How long does it take to pass HSK 1?',
    answer: 'Most beginner students achieve HSK 1 proficiency in 25 to 40 hours of focused study (typically 3 to 6 weeks studying 1 hour daily, or 2 to 3 months of casual study). Because HSK 1 includes Pinyin tone markings alongside every character on the test, students can pass quickly by focusing on listening comprehension and 5 to 10 vocabulary words per day.'
  },
  {
    question: 'Does HSK 1 include a writing section or tone marks?',
    answer: 'No, HSK 1 does NOT contain any character writing section. It only tests Listening and Reading comprehension using multiple-choice and true/false picture matching. Furthermore, all Chinese characters on the official HSK 1 exam include printed Pinyin tone marks directly above them, making it the most beginner-accessible level in the official Chinese testing framework.'
  },
  {
    question: 'How can I download or print the HSK 1 vocabulary list for free as a PDF?',
    answer: 'You can generate and print the complete official 150-word HSK 1 vocabulary list directly from this page for free with zero watermarks or registration. Click the "🖨️ Print / Save as PDF Cheat Sheet" button at the top of the vocabulary table, or press Ctrl + P (Cmd + P on Mac), select "Save as PDF" as the print destination, and your browser will render a beautifully formatted multi-page reference sheet with Hanzi, Pinyin tones, parts of speech, and English definitions.'
  }
];

const hsk2Faqs = [
  {
    question: 'How many words are in HSK 2?',
    answer: 'HSK 2 requires a cumulative total of 300 vocabulary words—consisting of 150 new intermediate-elementary words added to the 150 foundational HSK 1 words. Vocabulary expands to cover daily activities, shopping, dining out, transportation, weather, and basic feelings and health expressions.'
  },
  {
    question: 'What is the passing score for HSK 2?',
    answer: 'The passing score for HSK 2 is 120 out of 200 total points (60%). The exam is divided into two sections: Listening (35 questions, 100 points) and Reading (25 questions, 100 points). There is no separate minimum cut-off for each section; any combination totaling 120 or above earns official passing certification.'
  },
  {
    question: 'How long does it take to pass HSK 2?',
    answer: 'Transitioning from HSK 1 to HSK 2 usually takes between 30 and 50 additional study hours (approximately 6 to 10 weeks of consistent daily practice). If starting from scratch without prior Mandarin knowledge, reaching HSK 2 takes roughly 60 to 90 total study hours.'
  },
  {
    question: 'Does HSK 2 include a writing section or tone marks?',
    answer: 'Like HSK 1, HSK 2 has NO character writing section. All questions are multiple-choice or sentence-picture matching. In addition, official HSK 2 test papers still include full Pinyin transcriptions printed above every Chinese character, allowing learners to verify pronunciation while reading.'
  },
  {
    question: 'How can I download or print the HSK 2 vocabulary list for free as a PDF?',
    answer: 'To get a printable HSK 2 vocabulary cheat sheet, click the "🖨️ Print / Save as PDF Cheat Sheet" button located above the vocabulary browser on this page. Then select "Save as PDF" in your browser\'s print dialog to download a complete, clean, ad-free PDF containing all HSK 2 vocabulary words, complete with Pinyin, grammatical classification, and English definitions.'
  }
];

const hsk3Faqs = [
  {
    question: 'How many words are in HSK 3?',
    answer: 'HSK 3 requires a cumulative vocabulary of 600 words (300 new words introduced at Level 3, plus the 300 words from HSK 1 and 2). It also requires familiarity with approximately 617 distinct Chinese characters used in diverse contexts from career and travel to hobbies and health.'
  },
  {
    question: 'What is the passing score for HSK 3?',
    answer: 'The passing score for HSK 3 is 180 out of 300 total points (60%). Unlike HSK 1 and 2 (which are scored out of 200), HSK 3 introduces a third mandatory section: Writing. The exam is divided into Listening (100 points), Reading (100 points), and Writing (100 points). An aggregate score of 180 across all three sections earns a pass.'
  },
  {
    question: 'How long does it take to pass HSK 3?',
    answer: 'Reaching HSK 3 typically requires 120 to 200 cumulative study hours from zero, or about 80 to 120 hours after passing HSK 2. Because HSK 3 removes Pinyin from the reading section and requires writing Chinese characters, students usually dedicate 3 to 6 months of disciplined daily practice.'
  },
  {
    question: 'Does HSK 3 include a writing section or tone marks?',
    answer: 'YES! HSK 3 is the first level that includes a Writing section (10 questions, 100 points). Part 1 requires unscrambling 5 sentences into correct grammatical order. Part 2 requires writing 5 individual Chinese characters into sentences given Pinyin clues. Crucially, HSK 3 completely eliminates Pinyin from the Reading section—all passages and questions are printed exclusively in Chinese characters (Hanzi).'
  },
  {
    question: 'How can I download or print the HSK 3 vocabulary list for free as a PDF?',
    answer: 'You can easily print or save the complete 600-word HSK 3 vocabulary syllabus as a free PDF study packet. Click the "🖨️ Print / Save as PDF Cheat Sheet" button above the vocabulary table, or press Ctrl + P / Cmd + P. Your browser will format the table into an optimized multi-page study sheet without any navigation bars or advertisements.'
  }
];

const grammarFaqsStatic = [
  {
    question: 'How many grammar points are tested on HSK 1, 2, and 3?',
    answer: 'The official HSK 1–3 syllabus contains exactly 88 core grammar points: 24 foundational rules in HSK 1 (basic word order S-V-O, question particles 吗/呢, measure words, negation 不/没), 32 elementary rules in HSK 2 (aspect particles 了/过, comparative 比, auxiliary verbs 要/能/可以), and 32 intermediate rules in HSK 3 (disposal 把-sentences, passive voice 被, structural particles 的/得/地, and compound conjunctions 虽然...但是...).'
  },
  {
    question: 'How can I print or download this HSK grammar compendium as a free PDF cheat sheet?',
    answer: 'Click the "🖨️ Print / Save as PDF Cheat Sheet" button on this page, or press Ctrl+P (Cmd+P on Mac) and choose "Save as PDF". You can filter by level first (e.g. clicking HSK 1 to export only Level 1 rules, or All to print all 88 rules). The print stylesheet automatically hides website navigation, search boxes, and buttons, formatting the 88 rules into a clean, multi-page reference packet.'
  },
  {
    question: 'What is the fundamental word order of a Chinese sentence?',
    answer: 'Standard Mandarin Chinese follows Subject + Time + Location + Manner + Verb + Object (S-T-L-M-V-O). Unlike English, time words and location phrases in Chinese almost always precede the main verb (e.g., "我明天在学校学习" — literally: I tomorrow at school study).'
  },
  {
    question: 'What is the difference between 的 (de), 得 (de), and 地 (de)?',
    answer: 'All three particles are pronounced "de" with a neutral tone, but serve distinct grammatical functions: 的 is used after adjectives or possessive nouns before a noun (e.g., 我的书 - my book; 红色的苹果 - red apple); 得 is used after a verb or adjective to introduce a degree or complement (e.g., 跑得快 - runs fast); 地 is used after an adverbial modifier before an action verb (e.g., 高兴地说 - happily said).'
  },
  {
    question: 'How do 把 (bǎ) sentences work in HSK 3 grammar?',
    answer: 'The 把 construction (Disposal Structure) moves the direct object ahead of the verb to emphasize what happened to that object or how it changed state: Subject + 把 + Object + Verb + Other Element (e.g., 我把作业做完了 - I finished the homework). The verb in a 把 sentence cannot stand alone and must be accompanied by an aspect marker (了), directional complement, or resultative complement.'
  }
];

function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(f => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.answer
      }
    }))
  };
}

function renderFaqHtml(faqs: { question: string; answer: string }[], heading: string): string {
  return `
    <section class="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-6">
      <div class="space-y-1 pb-4 border-b border-stone-200">
        <span class="text-xs font-bold text-rose-700 uppercase tracking-wider">Frequently Asked Questions</span>
        <h2 class="text-2xl font-black text-stone-900">${heading}</h2>
        <p class="text-xs text-stone-600">Essential answers for test-takers, self-learners, and Mandarin educators.</p>
      </div>
      <div class="space-y-4">
        ${faqs.map(f => `
          <div class="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <h3 class="text-sm font-bold text-stone-900">${f.question}</h3>
            <p class="text-xs text-stone-700 leading-relaxed">${f.answer}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderPrintableSectionHtml(levelName: string, wordCount: string): string {
  return `
    <section class="p-6 sm:p-8 bg-rose-50/50 rounded-2xl border border-rose-200/80 space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <span class="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold uppercase">Printable Educational Resources</span>
          <h2 class="text-xl sm:text-2xl font-black text-stone-900">Free Printable ${levelName} Vocabulary List (PDF Download)</h2>
          <p class="text-xs text-stone-700 max-w-2xl leading-relaxed">
            Need a clean, multi-page paper study sheet for classroom teaching, offline handwriting practice, or daily desk revision? You can print or save the complete official ${levelName} (${wordCount}) syllabus directly from your browser in 1 click.
          </p>
        </div>
        <div class="shrink-0">
          <button onclick="window.print()" class="px-4 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-xs hover:bg-rose-700">🖨️ Print / Save as PDF Cheat Sheet</button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
        <div class="p-3 bg-white rounded-xl border border-stone-200">
          <strong>1. Zero Paywalls or Watermarks:</strong> Completely open educational access. Prints clean tabular lists with Hanzi, Pinyin tones, and English meanings.
        </div>
        <div class="p-3 bg-white rounded-xl border border-stone-200">
          <strong>2. Teacher &amp; Classroom Ready:</strong> Includes pencil checkboxes next to each word for homework tracking and weekly classroom vocab quizzes.
        </div>
        <div class="p-3 bg-white rounded-xl border border-stone-200">
          <strong>3. How to Save as PDF:</strong> Press <kbd class="px-1 py-0.5 bg-stone-100 border rounded text-[10px]">Ctrl+P</kbd> or <kbd class="px-1 py-0.5 bg-stone-100 border rounded text-[10px]">Cmd+P</kbd>, choose "Save as PDF", and save for offline review.
        </div>
      </div>
    </section>
  `;
}

function renderQuickFactsTableHtml(level: 1 | 2 | 3): string {
  const specs = level === 1
    ? [
        ['Official Vocabulary Requirement', '150 Words', 'Foundational survival words & greetings'],
        ['Unique Chinese Characters', '174 Characters', 'Elementary Hanzi building blocks'],
        ['CEFR Benchmark', 'A1 (Breakthrough)', 'Basic daily communication & introductions'],
        ['Exam Test Structure', 'Listening (20) + Reading (20)', '40 total questions, ~40 minutes duration'],
        ['Passing Score Threshold', '120 / 200 (60%)', 'Aggregate score; no individual section cut-off'],
        ['Pinyin Annotations', 'Full Pinyin on Exam', 'Printed above every Chinese character'],
        ['Character Writing Test', 'None (0 Writing Tasks)', 'Multiple choice & true/false pictures only'],
        ['Audio Listening Speed', 'Played Twice (2x)', 'Clear native voice with extended pauses'],
        ['Target Study Duration', '25–40 Hours', 'Approx. 3–4 weeks at 1 hour daily practice'],
        ['Free Printable PDF Sheet', '1-Click Instant Print', 'Free browser export with zero watermarks or ads']
      ]
    : level === 2
    ? [
        ['Official Vocabulary Requirement', '300 Words Total', '150 new HSK 2 words + 150 HSK 1 cumulative'],
        ['Unique Chinese Characters', '347 Characters', 'Expands into common shopping & travel radicals'],
        ['CEFR Benchmark', 'A2 (Waystage)', 'Elementary routine tasks & direct social exchanges'],
        ['Exam Test Structure', 'Listening (35) + Reading (25)', '60 total questions, ~55 minutes duration'],
        ['Passing Score Threshold', '120 / 200 (60%)', 'Combined score; no minimum per section'],
        ['Pinyin Annotations', 'Full Pinyin on Exam', 'Printed above all characters across test paper'],
        ['Character Writing Test', 'None (0 Writing Tasks)', 'Multiple choice comprehension & picture matches'],
        ['Audio Listening Speed', 'Played Twice (2x)', 'Conversational pace with normal pauses'],
        ['Target Study Duration', '50–80 Cumulative Hours', 'Approx. 6–8 weeks after passing HSK 1'],
        ['Free Printable PDF Sheet', '1-Click Instant Print', 'Free browser export with zero watermarks or ads']
      ]
    : [
        ['Official Vocabulary Requirement', '600 Words Total', '300 new HSK 3 words + 300 HSK 1–2 cumulative'],
        ['Unique Chinese Characters', '617 Characters', 'Core literacy across everyday workplace & study'],
        ['CEFR Benchmark', 'B1 (Threshold)', 'Independent travel, work, and social fluency'],
        ['Exam Test Structure', 'Listening (40) + Reading (30) + Writing (10)', '80 total questions, ~90 minutes duration'],
        ['Passing Score Threshold', '180 / 300 (60%)', '100 points per section; 180 total aggregate to pass'],
        ['Pinyin Annotations', 'No Pinyin on Exam Paper', 'All passages and questions are pure Hanzi'],
        ['Character Writing Test', '10 Writing Questions', '5 sentence scrambles + 5 Hanzi fill-in characters'],
        ['Audio Listening Speed', 'Played Twice (2x)', 'Authentic dialogues at normal conversational speed'],
        ['Target Study Duration', '120–200 Cumulative Hours', 'Approx. 3–5 months of disciplined study'],
        ['Free Printable PDF Sheet', '1-Click Instant Print', 'Free browser export with zero watermarks or ads']
      ];

  return `
    <section class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-stone-100">
        <div>
          <span class="text-[10px] font-bold text-rose-700 uppercase tracking-wider">Official Syllabus Reference</span>
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 mt-0.5">HSK ${level} Quick Facts &amp; Passing Requirements</h2>
        </div>
        <span class="text-xs text-stone-500">CTI &amp; CLEC Standards</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="bg-stone-50 border-b border-stone-200 font-bold text-stone-700">
              <th class="p-2.5">Examination Metric</th>
              <th class="p-2.5">HSK ${level} Requirement</th>
              <th class="p-2.5">Official Examination Notes</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100">
            ${specs.map(([m, r, n]) => `
              <tr>
                <td class="p-2.5 font-bold text-stone-900 whitespace-nowrap">${m}</td>
                <td class="p-2.5 font-semibold text-rose-700 whitespace-nowrap">${r}</td>
                <td class="p-2.5 text-stone-600">${n}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// Build Static Content for Each Route
function getCanonicalRoutes(): RouteDefinition[] {
  const routes: RouteDefinition[] = [
    // 1. Home
    {
      path: '/',
      title: 'HSK Free Lab - 100% Free HSK Prep, Mock Tests & Pinyin Tools',
      description: 'Free online Chinese test preparation. Practice timed mock exams, master pronunciation with the interactive pinyin soundboard, and calculate passing scores.',
      priority: 1.0,
      changefreq: 'daily',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'HSK Free Lab',
          url: `${SITE_DOMAIN}/`,
          description: '100% Free HSK Preparation Platform for HSK 1, 2, and 3 with zero paywalls.',
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_DOMAIN}/hsk-1?search={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'HSK Free Lab',
          url: `${SITE_DOMAIN}/`,
          logo: `${SITE_DOMAIN}/favicon.svg`,
          description: 'Democratizing Chinese language education worldwide with zero paywalls, zero logins, and verified CLEC syllabus data.'
        }
      ],
      renderBody: () => `
        <div class="max-w-7xl mx-auto py-10 px-4 space-y-12">
          <div class="text-center max-w-3xl mx-auto space-y-4">
            <span class="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">100% Free Educational Platform · Zero Paywalls · No Login Required</span>
            <h1 class="text-4xl sm:text-6xl font-black text-stone-900 tracking-tight">Master HSK 1, 2 &amp; 3 With Complete Confidence</h1>
            <p class="text-base text-stone-700 leading-relaxed">Everything you need to pass official Chinese proficiency exams: interactive stroke order animator, real-time score calculator, Pinyin tone trainer, and 603 verified vocabulary flashcards.</p>
            <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a href="/hsk-1" class="px-6 py-3 rounded-xl bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-800">Start HSK 1 Free</a>
              <a href="/calculator" class="px-6 py-3 rounded-xl bg-stone-100 text-stone-900 font-bold text-sm hover:bg-stone-200 border border-stone-300">Score Calculator</a>
              <a href="/mock-tests" class="px-6 py-3 rounded-xl bg-purple-50 text-purple-900 font-bold text-sm hover:bg-purple-100 border border-purple-200">30 Mock Exam Gates</a>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <h2 class="text-xl font-bold text-stone-900"><a href="/hsk-1" class="hover:text-emerald-700">HSK 1 Study Hub</a></h2>
              <p class="text-xs text-stone-600 leading-relaxed">150 foundation words, stroke orders, tone audio, and basic conversational patterns. Perfect for complete beginners.</p>
              <a href="/hsk-1" class="inline-block text-xs font-bold text-emerald-700 pt-2">Explore 150 Words &rarr;</a>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <h2 class="text-xl font-bold text-stone-900"><a href="/hsk-2" class="hover:text-sky-700">HSK 2 Study Hub</a></h2>
              <p class="text-xs text-stone-600 leading-relaxed">300 total words, elementary listening drills, question particles, and essential sentence structures.</p>
              <a href="/hsk-2" class="inline-block text-xs font-bold text-sky-700 pt-2">Explore HSK 2 Hub &rarr;</a>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <h2 class="text-xl font-bold text-stone-900"><a href="/hsk-3" class="hover:text-rose-700">HSK 3 Study Hub</a></h2>
              <p class="text-xs text-stone-600 leading-relaxed">600 total words, complex grammar connectives, intermediate reading passages, and official writing section drills.</p>
              <a href="/hsk-3" class="inline-block text-xs font-bold text-rose-700 pt-2">Explore HSK 3 Hub &rarr;</a>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div class="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <h2 class="text-xl font-bold text-stone-900"><a href="/lessons" class="hover:text-emerald-700">30 Interactive Lessons</a></h2>
              <p class="text-xs text-stone-600 leading-relaxed">30 sequential units with conversational dialogues, verified vocabulary definitions, grammar rules, and quizzes.</p>
              <a href="/lessons" class="inline-block text-xs font-bold text-emerald-700 pt-2">Explore 30 Units &rarr;</a>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <h2 class="text-xl font-bold text-stone-900"><a href="/grammar" class="hover:text-rose-700">88 Grammar Compendium</a></h2>
              <p class="text-xs text-stone-600 leading-relaxed">Formula structures, explanations, native examples, and lesson links for every HSK 1, 2, and 3 rule.</p>
              <a href="/grammar" class="inline-block text-xs font-bold text-rose-700 pt-2">Browse All 88 Rules &rarr;</a>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <h2 class="text-xl font-bold text-stone-900"><a href="/guides" class="hover:text-amber-700">18 Academic Masterclasses</a></h2>
              <p class="text-xs text-stone-600 leading-relaxed">29,000+ words of peer-reviewed study plans, character anatomy breakdowns, and exam strategies.</p>
              <a href="/guides" class="inline-block text-xs font-bold text-amber-700 pt-2">Read Masterclasses &rarr;</a>
            </div>
          </div>
        </div>`
    },

    // 2. HSK 1 Hub
    {
      path: '/hsk-1',
      title: 'HSK 1 Preparation Hub - 150 Words, Exam Format & Passing Rules | HSK Free Lab',
      description: 'Master all 150 official HSK 1 vocabulary words. Includes tone audio, stroke breakdown, daily grammar patterns, and practice tests.',
      priority: 0.9,
      changefreq: 'weekly',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'HSK 1 Complete Chinese Preparation Course',
          description: 'Comprehensive study course for HSK Level 1 including 150 vocabulary words, listening comprehension, and official test simulator.',
          provider: { '@type': 'EducationalOrganization', name: 'HSK Free Lab', url: `${SITE_DOMAIN}/` },
          isAccessibleForFree: true,
          inLanguage: 'zh-CN',
          educationalLevel: 'Beginner'
        },
        generateFaqSchema(hsk1Faqs)
      ],
      renderBody: () => `
        <div class="max-w-7xl mx-auto py-8 px-4 space-y-8">
          <header class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">Official Syllabus · 150 Words · A1 Breakthrough Level</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">HSK 1 Complete Preparation Hub</h1>
            <p class="text-sm text-stone-700 leading-relaxed">The HSK 1 test assesses examinees' ability in daily Chinese communication. Examinees who pass HSK 1 can understand and use very simple Chinese phrases and satisfy basic communication needs.</p>
          </header>
          ${renderQuickFactsTableHtml(1)}
          ${renderPrintableSectionHtml('HSK 1', '150 Words')}
          <section class="space-y-4">
            <h2 class="text-2xl font-bold text-stone-900">Official HSK 1 Vocabulary List (${hsk1Vocab.length} Words)</h2>
            <div class="overflow-x-auto bg-white rounded-2xl border border-stone-200 shadow-sm">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-stone-100 border-b border-stone-200 font-bold text-stone-700">
                    <th class="p-3">#</th><th class="p-3">Hanzi</th><th class="p-3">Pinyin</th><th class="p-3">Part of Speech</th><th class="p-3">English Meaning</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-stone-100">
                  ${hsk1Vocab.slice(0, 150).map((v, i) => `<tr><td class="p-3 text-stone-400 font-mono">${i + 1}</td><td class="p-3 font-serif font-black text-base text-stone-900">${v.hanzi}</td><td class="p-3 font-semibold text-rose-700">${v.pinyin}</td><td class="p-3 text-stone-500">${v.pos || 'noun'}</td><td class="p-3 text-stone-800">${v.meaning}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
          </section>
          <section class="space-y-4">
            <h2 class="text-2xl font-bold text-stone-900">Explore Essential Study Tools &amp; Lessons</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <a href="/stroke-order" class="p-4 bg-white rounded-2xl border border-stone-200 hover:border-rose-300 block space-y-1">
                <span class="font-bold text-rose-700 uppercase text-[10px]">Stroke Animator</span>
                <div class="font-bold text-stone-900">Hanzi Stroke Order Animator</div>
              </a>
              <a href="/lessons" class="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-300 block space-y-1">
                <span class="font-bold text-emerald-700 uppercase text-[10px]">Curriculum</span>
                <div class="font-bold text-stone-900">30 Interactive Lessons</div>
              </a>
              <a href="/grammar" class="p-4 bg-white rounded-2xl border border-stone-200 hover:border-sky-300 block space-y-1">
                <span class="font-bold text-sky-700 uppercase text-[10px]">Compendium</span>
                <div class="font-bold text-stone-900">88-Rule Grammar Compendium</div>
              </a>
            </div>
          </section>
          ${renderFaqHtml(hsk1Faqs, 'Frequently Asked Questions About HSK 1')}
        </div>`
    },

    // 3. HSK 2 Hub
    {
      path: '/hsk-2',
      title: 'HSK 2 Preparation Hub - 300 Words & Listening Practice | HSK Free Lab',
      description: 'Transition from beginner to elementary Mandarin. Comprehensive HSK 2 vocabulary lists, listening drills, and passing score guides.',
      priority: 0.9,
      changefreq: 'weekly',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'HSK 2 Complete Chinese Preparation Course',
          description: 'Comprehensive study course for HSK Level 2 covering 300 cumulative vocabulary words, grammar rules, and mock examinations.',
          provider: { '@type': 'EducationalOrganization', name: 'HSK Free Lab', url: `${SITE_DOMAIN}/` },
          isAccessibleForFree: true,
          inLanguage: 'zh-CN',
          educationalLevel: 'Elementary'
        },
        generateFaqSchema(hsk2Faqs)
      ],
      renderBody: () => `
        <div class="max-w-7xl mx-auto py-8 px-4 space-y-8">
          <header class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200">Official Syllabus · 300 Words Total · A2 Elementary Level</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">HSK 2 Complete Preparation Hub</h1>
            <p class="text-sm text-stone-700 leading-relaxed">The HSK 2 examination tests examinees' capacity to use Chinese in simple and direct exchanges on familiar daily topics. Passing HSK 2 certifies a firm foundation for higher-level Chinese studies.</p>
          </header>
          ${renderQuickFactsTableHtml(2)}
          ${renderPrintableSectionHtml('HSK 2', '300 Words')}
          <section class="space-y-4">
            <h2 class="text-2xl font-bold text-stone-900">Official HSK 2 Vocabulary List (${hsk2Vocab.length} New Words)</h2>
            <div class="overflow-x-auto bg-white rounded-2xl border border-stone-200 shadow-sm">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-stone-100 border-b border-stone-200 font-bold text-stone-700">
                    <th class="p-3">#</th><th class="p-3">Hanzi</th><th class="p-3">Pinyin</th><th class="p-3">Part of Speech</th><th class="p-3">English Meaning</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-stone-100">
                  ${hsk2Vocab.map((v, i) => `<tr><td class="p-3 text-stone-400 font-mono">${i + 1}</td><td class="p-3 font-serif font-black text-base text-stone-900">${v.hanzi}</td><td class="p-3 font-semibold text-sky-700">${v.pinyin}</td><td class="p-3 text-stone-500">${v.pos || 'noun'}</td><td class="p-3 text-stone-800">${v.meaning}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
          </section>
          <section class="space-y-4">
            <h2 class="text-2xl font-bold text-stone-900">Explore Essential Study Tools &amp; Lessons</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <a href="/stroke-order" class="p-4 bg-white rounded-2xl border border-stone-200 hover:border-rose-300 block space-y-1">
                <span class="font-bold text-rose-700 uppercase text-[10px]">Stroke Animator</span>
                <div class="font-bold text-stone-900">Hanzi Stroke Order Animator</div>
              </a>
              <a href="/lessons" class="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-300 block space-y-1">
                <span class="font-bold text-emerald-700 uppercase text-[10px]">Curriculum</span>
                <div class="font-bold text-stone-900">30 Interactive Lessons</div>
              </a>
              <a href="/grammar" class="p-4 bg-white rounded-2xl border border-stone-200 hover:border-sky-300 block space-y-1">
                <span class="font-bold text-sky-700 uppercase text-[10px]">Compendium</span>
                <div class="font-bold text-stone-900">88-Rule Grammar Compendium</div>
              </a>
            </div>
          </section>
          ${renderFaqHtml(hsk2Faqs, 'Frequently Asked Questions About HSK 2')}
        </div>`
    },

    // 4. HSK 3 Hub
    {
      path: '/hsk-3',
      title: 'HSK 3 Preparation Hub - 600 Words & Reading Drills | HSK Free Lab',
      description: 'Intermediate Mandarin test preparation. Master 300 additional HSK 3 characters, reading comprehension drills, and full exam prep.',
      priority: 0.9,
      changefreq: 'weekly',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'HSK 3 Complete Chinese Preparation Course',
          description: 'Comprehensive study course for HSK Level 3 covering 600 cumulative vocabulary words, reading comprehension, and character writing.',
          provider: { '@type': 'EducationalOrganization', name: 'HSK Free Lab', url: `${SITE_DOMAIN}/` },
          isAccessibleForFree: true,
          inLanguage: 'zh-CN',
          educationalLevel: 'Intermediate'
        },
        generateFaqSchema(hsk3Faqs)
      ],
      renderBody: () => `
        <div class="max-w-7xl mx-auto py-8 px-4 space-y-8">
          <header class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">Official Syllabus · 600 Words Total · B1 Intermediate Level</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">HSK 3 Complete Preparation Hub</h1>
            <p class="text-sm text-stone-700 leading-relaxed">The HSK 3 examination certifies that examinees can complete basic communicative tasks in daily life, study, and work. Examinees can handle most communicative situations when traveling in China.</p>
          </header>
          ${renderQuickFactsTableHtml(3)}
          ${renderPrintableSectionHtml('HSK 3', '600 Words')}
          <section class="space-y-4">
            <h2 class="text-2xl font-bold text-stone-900">Official HSK 3 Vocabulary List (${hsk3Vocab.length} New Words)</h2>
            <div class="overflow-x-auto bg-white rounded-2xl border border-stone-200 shadow-sm">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-stone-100 border-b border-stone-200 font-bold text-stone-700">
                    <th class="p-3">#</th><th class="p-3">Hanzi</th><th class="p-3">Pinyin</th><th class="p-3">Part of Speech</th><th class="p-3">English Meaning</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-stone-100">
                  ${hsk3Vocab.map((v, i) => `<tr><td class="p-3 text-stone-400 font-mono">${i + 1}</td><td class="p-3 font-serif font-black text-base text-stone-900">${v.hanzi}</td><td class="p-3 font-semibold text-rose-700">${v.pinyin}</td><td class="p-3 text-stone-500">${v.pos || 'noun'}</td><td class="p-3 text-stone-800">${v.meaning}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
          </section>
          <section class="space-y-4">
            <h2 class="text-2xl font-bold text-stone-900">Explore Essential Study Tools &amp; Lessons</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <a href="/stroke-order" class="p-4 bg-white rounded-2xl border border-stone-200 hover:border-rose-300 block space-y-1">
                <span class="font-bold text-rose-700 uppercase text-[10px]">Stroke Animator</span>
                <div class="font-bold text-stone-900">Hanzi Stroke Order Animator</div>
              </a>
              <a href="/lessons" class="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-300 block space-y-1">
                <span class="font-bold text-emerald-700 uppercase text-[10px]">Curriculum</span>
                <div class="font-bold text-stone-900">30 Interactive Lessons</div>
              </a>
              <a href="/grammar" class="p-4 bg-white rounded-2xl border border-stone-200 hover:border-sky-300 block space-y-1">
                <span class="font-bold text-sky-700 uppercase text-[10px]">Compendium</span>
                <div class="font-bold text-stone-900">88-Rule Grammar Compendium</div>
              </a>
            </div>
          </section>
          ${renderFaqHtml(hsk3Faqs, 'Frequently Asked Questions About HSK 3')}
        </div>`
    },

    // 5. Calculator
    {
      path: '/calculator',
      title: 'Free HSK Score Calculator - Check Passing Thresholds & Scaled Marks | HSK Free Lab',
      description: 'Instant HSK exam score calculator. Check your exact passing margin, scaled listening and reading scores, and official test thresholds.',
      priority: 0.8,
      changefreq: 'monthly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'HSK Passing Score Calculator',
        url: `${SITE_DOMAIN}/calculator`,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        isAccessibleForFree: true,
        description: 'Calculate official HSK exam score thresholds, scaled listening and reading scores, and pass/fail predictions.'
      },
      renderBody: () => `
        <div class="max-w-4xl mx-auto py-10 px-4 space-y-8">
          <header class="text-center space-y-3">
            <span class="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">Diagnostic Scoring Tool · Verified CLEC Formulas</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">Official HSK Score Calculator</h1>
            <p class="text-sm text-stone-700 leading-relaxed">Calculate your predicted passing margin for HSK 1, 2, and 3. Understand how raw question scores convert to scaled scores across Listening, Reading, and Writing.</p>
          </header>
          <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-6">
            <h2 class="text-xl font-bold text-stone-900">How HSK Exam Scores Are Calculated</h2>
            <p class="text-xs text-stone-700 leading-relaxed">For HSK Level 1 and HSK Level 2, the exam consists of two sections: Listening (100 points) and Reading (100 points). The total score is 200 points. The official passing cutoff is 120 points (60%).</p>
            <p class="text-xs text-stone-700 leading-relaxed">For HSK Level 3, the exam consists of three sections: Listening (100 points), Reading (100 points), and Writing (100 points). The total score is 300 points. The official passing cutoff is 180 points (60%).</p>
            <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950">
              <strong>Tip for Test Takers:</strong> There is no individual sectional cutoff score requirement. As long as your total cumulative score meets or exceeds the threshold, you pass the examination!
            </div>
          </div>
        </div>`
    },

    // 6. Pinyin Trainer
    {
      path: '/pinyin-trainer',
      title: 'Interactive Pinyin Tone Trainer & Audio Soundboard - Free Practice | HSK Free Lab',
      description: 'Master Mandarin pronunciation. Practice distinguishing 1st, 2nd, 3rd, and 4th tones with native audio examples and interactive tests.',
      priority: 0.8,
      changefreq: 'monthly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: 'Mandarin Pinyin & 4 Tones Interactive Soundboard',
        url: `${SITE_DOMAIN}/pinyin-trainer`,
        educationalLevel: 'Beginner',
        isAccessibleForFree: true,
        description: 'Interactive soundboard and listening ear-trainer for mastering the four tones and Pinyin initials/finals of standard Mandarin.'
      },
      renderBody: () => `
        <div class="max-w-4xl mx-auto py-10 px-4 space-y-10">
          <header class="text-center space-y-3">
            <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">Pronunciation &amp; Auditory Foundation</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">Mandarin Chinese Pronunciation &amp; Tone Trainer</h1>
            <p class="text-sm text-stone-700 leading-relaxed">Master the 5 standard Mandarin tones, 23 initials, 24 finals, and essential tone change rules with native audio.</p>
          </header>

          <section id="tone-guide" class="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-8">
            <div class="space-y-2">
              <h2 class="text-2xl font-black text-stone-900">The 5 Mandarin Tones &amp; Pitch Contours</h2>
              <p class="text-xs text-stone-600 leading-relaxed">Mandarin Chinese is a tonal language. Syllables sharing identical pinyin spellings carry completely different meanings depending on their pitch contour.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div class="font-bold text-rose-700 text-sm">1st Tone (High Flat · 5-5)</div>
                <p class="text-stone-700">Steady, high pitch. Example: <strong>mā (妈)</strong> - Mom / Mother; <strong>bā (八)</strong> - Eight; <strong>chī (吃)</strong> - To eat.</p>
              </div>
              <div class="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div class="font-bold text-emerald-700 text-sm">2nd Tone (Rising · 3-5)</div>
                <p class="text-stone-700">Rises smoothly like an English question of surprise. Example: <strong>má (麻)</strong> - Hemp; <strong>shí (十)</strong> - Ten; <strong>lái (来)</strong> - To come.</p>
              </div>
              <div class="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div class="font-bold text-indigo-700 text-sm">3rd Tone (Dipping &amp; Rising · 2-1-4)</div>
                <p class="text-stone-700">Pitch dips low into chest resonance, then swoops gently up. Example: <strong>mǎ (马)</strong> - Horse; <strong>hǎo (好)</strong> - Good; <strong>nǐ (你)</strong> - You.</p>
              </div>
              <div class="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div class="font-bold text-amber-700 text-sm">4th Tone (Sharp Falling · 5-1)</div>
                <p class="text-stone-700">Drops sharply and decisively like a firm command. Example: <strong>mà (骂)</strong> - To scold; <strong>bù (不)</strong> - No; <strong>qù (去)</strong> - To go.</p>
              </div>
              <div class="p-4 rounded-xl bg-stone-50 border border-stone-200 md:col-span-2 space-y-2">
                <div class="font-bold text-stone-700 text-sm">Neutral Tone (Light &amp; Soft)</div>
                <p class="text-stone-700">Pronounced lightly without stress. Example: <strong>ma (吗)</strong> - Question particle; <strong>bàba (爸爸)</strong> - Father (second syllable).</p>
              </div>
            </div>

            <div class="p-5 bg-amber-50 rounded-xl border border-amber-200 space-y-4">
              <h3 class="font-bold text-amber-900 text-sm">Essential Tone Sandhi (Natural Pitch Shifts)</h3>
              <ul class="list-disc pl-5 space-y-2 text-xs text-stone-800">
                <li><strong>Third Tone Sandhi (3 + 3 &rarr; 2 + 3):</strong> When two 3rd tones occur consecutively, the first changes to a rising 2nd tone. For example, <em>nǐ hǎo</em> (你好) is pronounced <strong>ní hǎo</strong>.</li>
                <li><strong>Tone Changes for "一" (yī):</strong> Changes to 2nd tone before a 4th tone (<em>yí gè</em> 一个). Changes to 4th tone before 1st, 2nd, or 3rd tones (<em>yì tiān</em> 一天, <em>yì nián</em> 一年, <em>yì qǐ</em> 一起).</li>
                <li><strong>Tone Changes for "不" (bù):</strong> Changes to 2nd tone before a 4th tone (<em>bú shì</em> 不是, <em>bú duì</em> 不对). Remains 4th tone before other tones (<em>bù gāo</em> 不高).</li>
              </ul>
            </div>
          </section>
          <section class="space-y-4">
            <h2 class="text-2xl font-bold text-stone-900">Explore Essential Study Tools &amp; Lessons</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <a href="/stroke-order" class="p-4 bg-white rounded-2xl border border-stone-200 hover:border-rose-300 block space-y-1">
                <span class="font-bold text-rose-700 uppercase text-[10px]">Stroke Animator</span>
                <div class="font-bold text-stone-900">Hanzi Stroke Order Animator</div>
              </a>
              <a href="/lessons" class="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-300 block space-y-1">
                <span class="font-bold text-emerald-700 uppercase text-[10px]">Curriculum</span>
                <div class="font-bold text-stone-900">30 Interactive Lessons</div>
              </a>
              <a href="/grammar" class="p-4 bg-white rounded-2xl border border-stone-200 hover:border-sky-300 block space-y-1">
                <span class="font-bold text-sky-700 uppercase text-[10px]">Compendium</span>
                <div class="font-bold text-stone-900">88-Rule Grammar Compendium</div>
              </a>
            </div>
          </section>
        </div>`
    },

    // 7. Mock Tests
    {
      path: '/mock-tests',
      title: 'Free Timed HSK Mock Tests - Real Exam Simulation with Explanations | HSK Free Lab',
      description: 'Practice real-time timed HSK 1, 2, and 3 mock tests featuring instant grading, answer breakdowns, and readiness reports.',
      priority: 0.8,
      changefreq: 'weekly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: 'HSK 1-3 Timed Mock Test Simulator',
        url: `${SITE_DOMAIN}/mock-tests`,
        isAccessibleForFree: true,
        description: '30 full-length timed mock examinations for HSK 1, 2, and 3 with audio dialogues and instant score feedback.'
      },
      renderBody: () => `
        <div class="max-w-7xl mx-auto py-10 px-4 space-y-8">
          <header class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold border border-purple-200">30 Examination Gates · Real-Time Grading</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">Free Timed HSK Mock Tests</h1>
            <p class="text-sm text-stone-700 leading-relaxed">Simulate authentic exam conditions with countdown timers, audio listening dialogues, and question post-mortems.</p>
          </header>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h2 class="text-xl font-bold text-stone-900">HSK 1 Mock Exams (10 Gates)</h2>
              <p class="text-xs text-stone-600">40 questions per gate, 35 minutes timer, full audio listening playback and reading match.</p>
              <a href="/mock-tests" class="inline-block text-xs font-bold text-purple-700">Start Gate 1 &rarr;</a>
            </div>
            <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h2 class="text-xl font-bold text-stone-900">HSK 2 Mock Exams (10 Gates)</h2>
              <p class="text-xs text-stone-600">60 questions per gate, 50 minutes timer, speed listening and conversational dialogue evaluation.</p>
              <a href="/mock-tests" class="inline-block text-xs font-bold text-purple-700">Start Gate 11 &rarr;</a>
            </div>
            <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h2 class="text-xl font-bold text-stone-900">HSK 3 Mock Exams (10 Gates)</h2>
              <p class="text-xs text-stone-600">80 questions per gate, 85 minutes timer, character writing tests and passage analysis.</p>
              <a href="/mock-tests" class="inline-block text-xs font-bold text-purple-700">Start Gate 21 &rarr;</a>
            </div>
          </div>
        </div>`
    },

    // 8. Stroke Order
    {
      path: '/stroke-order',
      title: 'Chinese Character Stroke Order Animator & Radical Breakdown | HSK Free Lab',
      description: 'Animate and practice writing any Chinese character stroke-by-stroke with official direction, radical decomposition, and stroke count.',
      priority: 0.8,
      changefreq: 'monthly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: 'Hanzi Stroke Order Animator & Quiz',
        url: `${SITE_DOMAIN}/stroke-order`,
        isAccessibleForFree: true,
        description: 'Interactive character stroke order animator and writing canvas for mastering Hanzi stroke rules and radicals.'
      },
      renderBody: () => `
        <div class="max-w-4xl mx-auto py-10 px-4 space-y-8">
          <header class="text-center space-y-3">
            <span class="px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">Kinesthetic Writing Memory</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">Chinese Character Stroke Order Animator</h1>
            <p class="text-sm text-stone-700 leading-relaxed">Learn the official stroke sequences, radical decompositions, and spatial balance for any Chinese character.</p>
          </header>
          <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h2 class="text-2xl font-bold text-stone-900">The 7 Fundamental Rules of Hanzi Stroke Order</h2>
            <ol class="list-decimal list-inside space-y-2 text-xs text-stone-700">
              <li><strong>Top to Bottom (从上到下):</strong> Write upper components before lower components (e.g., 三, 言).</li>
              <li><strong>Left to Right (从左到右):</strong> Write left radicals before right components (e.g., 你, 好).</li>
              <li><strong>Horizontal before Vertical (先横后竖):</strong> Write horizontal strokes before crossing verticals (e.g., 十, 干).</li>
              <li><strong>Slanted Strokes: Left-falling before Right-falling (先撇后捺):</strong> e.g., 人, 八, 木.</li>
              <li><strong>Outside to Inside (从外到内):</strong> Write outer framing strokes before inner content (e.g., 同, 月).</li>
              <li><strong>Center before Two Sides (先中间后两边):</strong> Write center vertical stroke first (e.g., 小, 水).</li>
              <li><strong>Close Frame Last (先里头后封口):</strong> Enter the frame, complete the interior, and seal last (e.g., 日, 国).</li>
            </ol>
          </div>
        </div>`
    },

    // 9. Lessons Directory
    {
      path: '/lessons',
      title: 'Free Mandarin Grammar & Vocabulary Lessons (30 Units) | HSK Free Lab',
      description: 'Master Chinese step-by-step with 30 bite-sized interactive lessons covering HSK 1, 2, and 3 dialogues, verified vocabulary, grammar formulas, and quizzes.',
      priority: 0.9,
      changefreq: 'weekly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: '30 Interactive HSK Mandarin Lessons',
        url: `${SITE_DOMAIN}/lessons`,
        isAccessibleForFree: true,
        description: 'Complete 30-unit curriculum covering foundational Chinese dialogues, key vocabulary, sentence grammar structures, and comprehension quizzes across HSK 1, 2, and 3.'
      },
      renderBody: () => `
        <div class="max-w-7xl mx-auto py-10 px-4 space-y-10">
          <header class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">Structured Curriculum · 30 Bite-Sized Lessons</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">30 Interactive Mandarin Lessons</h1>
            <p class="text-sm text-stone-700 leading-relaxed">Master Chinese sentence structures, high-frequency vocabulary, conversational dialogues, and take instant quizzes across HSK 1, 2, and 3.</p>
            <div class="flex items-center justify-center gap-3 pt-2 text-xs font-bold">
              <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">HSK 1: 10 Units</span>
              <span class="px-3 py-1 rounded-full bg-sky-100 text-sky-800">HSK 2: 10 Units</span>
              <span class="px-3 py-1 rounded-full bg-rose-100 text-rose-800">HSK 3: 10 Units</span>
            </div>
          </header>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${lessonsData.map(l => {
              const uNum = getLessonUnitNumber(l.slug);
              const badgeColor = l.level === 1 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : (l.level === 2 ? 'text-sky-700 bg-sky-50 border-sky-200' : 'text-rose-700 bg-rose-50 border-rose-200');
              return `
              <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${badgeColor}">HSK ${l.level} · Unit ${uNum}</span>
                    <span class="text-xs text-stone-400 font-mono">${l.keyVocab.length} Vocab</span>
                  </div>
                  <h2 class="text-lg font-bold text-stone-900">${l.title}</h2>
                  <p class="text-xs text-stone-600 line-clamp-2 leading-relaxed">${l.description}</p>
                </div>
                <div class="pt-3 border-t border-stone-100">
                  <a href="/lessons/${l.slug}" class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline">
                    <span>Start Unit ${uNum} Lesson</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>`
    },

    // 10. Grammar Compendium (88 Rules)
    {
      path: '/grammar',
      title: 'Essential HSK 1-3 Grammar Compendium (88 Rules & Patterns) | HSK Free Lab',
      description: 'Comprehensive 88-rule Mandarin grammar compendium for HSK 1, 2, and 3 with formula patterns, clear explanations, authentic example sentences, and direct lesson links.',
      priority: 0.9,
      changefreq: 'weekly',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: 'HSK 1-3 Complete 88-Rule Grammar Compendium',
          url: `${SITE_DOMAIN}/grammar`,
          isAccessibleForFree: true,
          description: 'Comprehensive 88-point grammar compendium covering sentence formulas, particle behaviors (的, 得, 地, 了, 过, 把, 被), and contextual conversation rules across HSK 1, 2, and 3.'
        },
        generateFaqSchema(grammarFaqsStatic)
      ],
      renderBody: () => {
        const all88 = all88GrammarRules;
        const hsk1Count = all88.filter(g => g.level === 1).length;
        const hsk2Count = all88.filter(g => g.level === 2).length;
        const hsk3Count = all88.filter(g => g.level === 3).length;

        return `
        <div class="max-w-5xl mx-auto py-10 px-4 space-y-8">
          <header class="text-center space-y-4">
            <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">Grammar Compendium · 88 Verified Rules</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">HSK 1–3 Grammar Compendium</h1>
            <p class="text-sm text-stone-700 leading-relaxed max-w-3xl mx-auto">Master every essential Chinese sentence formula, grammatical particle (的, 得, 地, 了, 过, 把, 被), and structure from beginner to intermediate.</p>
            <div class="flex items-center justify-center gap-3 pt-2 text-xs font-bold">
              <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">HSK 1: ${hsk1Count} Rules</span>
              <span class="px-3 py-1 rounded-full bg-sky-100 text-sky-800">HSK 2: ${hsk2Count} Rules</span>
              <span class="px-3 py-1 rounded-full bg-rose-100 text-rose-800">HSK 3: ${hsk3Count} Rules</span>
            </div>
          </header>
          
          <section class="p-6 sm:p-8 bg-sky-50/50 rounded-2xl border border-sky-200/80 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="space-y-1">
                <span class="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold uppercase">Printable Educational Resources</span>
                <h2 class="text-xl sm:text-2xl font-black text-stone-900">Free Printable HSK Grammar Cheat Sheet (PDF Download)</h2>
                <p class="text-xs text-stone-700 max-w-2xl leading-relaxed">
                  Need an offline syntax reference sheet for classroom teaching, exam revision, or desktop quick lookup? Print or export all 88 essential sentence structures, function words (把, 被, 了, 过), and comparative patterns directly from your browser in 1 click.
                </p>
              </div>
              <div class="shrink-0">
                <button onclick="window.print()" class="px-4 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-xs hover:bg-sky-700">🖨️ Print Grammar Sheet</button>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
              <div class="p-3 bg-white rounded-xl border border-stone-200">
                <strong>1. Filter by Level:</strong> Review HSK 1, 2, or 3 separately, or print all 88 rules together as a single master compendium.
              </div>
              <div class="p-3 bg-white rounded-xl border border-stone-200">
                <strong>2. Clean Multi-Page PDF:</strong> Automatically removes headers, footers, and interactive buttons for clean printing.
              </div>
              <div class="p-3 bg-white rounded-xl border border-stone-200">
                <strong>3. Save as PDF:</strong> Press Ctrl+P (or Cmd+P), select "Save as PDF" destination, and save locally.
              </div>
            </div>
          </section>

          <div class="space-y-6">
            ${all88.map(g => {
              const badgeColor = g.level === 1 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : (g.level === 2 ? 'text-sky-700 bg-sky-50 border-sky-200' : 'text-rose-700 bg-rose-50 border-rose-200');
              const lessonLink = g.parentLessonSlug 
                ? `<a href="/lessons/${g.parentLessonSlug}" class="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-stone-800 hover:underline">Lesson: ${g.parentLessonTitle || 'Core Lesson'} &rarr;</a>`
                : '';

              const examplesHtml = g.examples.map(ex => `
                <div class="space-y-0.5">
                  <div class="font-bold text-stone-900 text-sm">${ex.zh}</div>
                  <div class="text-xs text-rose-700 font-mono">${ex.py}</div>
                  <div class="text-xs text-stone-600">${ex.en}</div>
                </div>`).join('');

              return `
              <article class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${badgeColor}">HSK Level ${g.level}</span>
                  <span class="text-xs text-stone-400 font-mono">Rule #${g.id}</span>
                </div>
                <div>
                  <h2 class="text-lg font-bold text-stone-900">
                    <a href="/grammar/${g.slug}" class="hover:text-rose-700 hover:underline">${g.title}</a>
                  </h2>
                  <div class="mt-1 inline-block px-3 py-1 rounded-lg bg-stone-100 font-mono text-xs font-bold text-stone-800 border border-stone-200">${g.pattern}</div>
                </div>
                <p class="text-xs text-stone-700 leading-relaxed">${g.explanation}</p>
                <div class="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div class="text-[11px] font-bold uppercase tracking-wider text-stone-500">Illustrative Examples:</div>
                  ${examplesHtml}
                </div>
                ${g.commonMistakes && g.commonMistakes.length > 0 ? `
                <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                  <strong>Common Pitfall:</strong> ${g.commonMistakes[0]}
                </div>` : ''}
                <div class="pt-3 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <a href="/grammar/${g.slug}" class="font-bold text-rose-700 hover:underline inline-flex items-center gap-1">
                    <span>Full Grammar Guide &amp; Practice Quiz</span>
                    <span>&rarr;</span>
                  </a>
                  ${lessonLink}
                </div>
              </article>`;
            }).join('')}
          </div>
          ${renderFaqHtml(grammarFaqsStatic, 'Frequently Asked Questions About HSK Grammar')}
        </div>`;
      }
    },

    // 11. Guides Directory
    {
      path: '/guides',
      title: 'HSK Study Guides & 30-Day Passing Roadmaps | HSK Free Lab',
      description: 'Step-by-step revision strategies, test-day preparation tips, and structured study plans to pass your HSK exams on your first attempt.',
      priority: 0.8,
      changefreq: 'weekly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: '18 Academic HSK Masterclasses & Study Guides',
        url: `${SITE_DOMAIN}/guides`,
        isAccessibleForFree: true,
        description: 'Collection of 18 in-depth academic guides, 30-day study blueprints, and test strategies for mastering Chinese proficiency.'
      },
      renderBody: () => `
        <div class="max-w-7xl mx-auto py-10 px-4 space-y-8">
          <header class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">Academic Masterclasses · 29,000+ Words</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">HSK Free Lab Academic Guides</h1>
            <p class="text-sm text-stone-700 leading-relaxed">Exhaustive test strategies, cognitive retention systems, character anatomy guides, and level transition blueprints.</p>
          </header>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${blogPostsData.map(p => `
              <article class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div class="space-y-2">
                  <span class="text-[10px] uppercase font-bold text-rose-700">${p.tags[0]} · ${p.readTime}</span>
                  <h2 class="text-lg font-bold text-stone-900 leading-snug"><a href="/guides/${p.slug}" class="hover:text-rose-700">${p.title}</a></h2>
                  <p class="text-xs text-stone-600 line-clamp-3">${p.summary}</p>
                </div>
                <div class="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span class="text-stone-400 font-mono">${p.date}</span>
                  <a href="/guides/${p.slug}" class="font-bold text-rose-700 hover:underline">Read Guide &rarr;</a>
                </div>
              </article>`).join('')}
          </div>
        </div>`
    },

    // 12. About Us
    {
      path: '/about',
      title: 'About HSK Free Lab - 100% Free Open Chinese Learning Platform',
      description: 'Learn about HSK Free Lab mission to provide world-class, 100% free Chinese language study resources without paywalls or subscriptions.',
      priority: 0.6,
      changefreq: 'monthly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About HSK Free Lab',
        url: `${SITE_DOMAIN}/about`,
        description: 'Democratizing Chinese language education worldwide with zero paywalls, zero logins, and verified CLEC syllabus data.'
      },
      renderBody: () => `
        <div class="max-w-4xl mx-auto py-10 px-4 space-y-8">
          <header class="text-center space-y-3">
            <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">Our Open Mission</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">About HSK Free Lab</h1>
            <p class="text-sm text-stone-700 leading-relaxed">Democratizing Chinese language education worldwide with zero paywalls, zero logins, and zero advertising interruptions to the learning flow.</p>
          </header>
          <div class="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-6 text-sm text-stone-700 leading-relaxed">
            <h2 class="text-2xl font-bold text-stone-900">Why We Built HSK Free Lab</h2>
            <p>Too many language learning websites lock basic vocabulary lists, stroke orders, and mock exams behind aggressive monthly subscriptions, mandatory signups, or paywalls. We believe that access to foundational language tools—especially for international students, immigrants, and independent self-learners—should be genuinely open and free.</p>
            <h3 class="text-lg font-bold text-stone-900">Our Three Unbreakable Principles</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div class="p-4 bg-stone-50 rounded-xl border border-stone-200"><strong>1. Zero Paywalls:</strong> Every character, mock test, and lesson is 100% unlocked for everyone.</div>
              <div class="p-4 bg-stone-50 rounded-xl border border-stone-200"><strong>2. Zero Login:</strong> No account required. Study sessions and progress are private to your device.</div>
              <div class="p-4 bg-stone-50 rounded-xl border border-stone-200"><strong>3. Verified Data:</strong> Strictly aligned with official CLEC syllabus guidelines and Hanzi stroke standards.</div>
            </div>
            <div class="pt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <div>HSK Free Lab Project &bull; Independent Educational Resource</div>
              <div>Contact: <a href="mailto:contact@mybwn.com" class="text-rose-700 underline font-medium">contact@mybwn.com</a> | <a href="/contact" class="text-rose-700 underline font-medium">Contact Page</a></div>
            </div>
          </div>
        </div>`
    },

    // 12B. Contact Us
    {
      path: '/contact',
      title: 'Contact HSK Free Lab - Support, Feedback & Inquiries | HSK Free Lab',
      description: 'Get in touch with the HSK Free Lab editorial and technical team. Send bug reports, vocabulary corrections, syllabus feedback, or general questions.',
      priority: 0.7,
      changefreq: 'monthly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact HSK Free Lab',
        url: `${SITE_DOMAIN}/contact`,
        description: 'Contact information and feedback form for HSK Free Lab educational platform.',
        mainEntity: {
          '@type': 'EducationalOrganization',
          name: 'HSK Free Lab',
          url: `${SITE_DOMAIN}/`,
          email: 'contact@mybwn.com'
        }
      },
      renderBody: () => `
        <div class="max-w-4xl mx-auto py-10 px-4 space-y-8">
          <header class="text-center space-y-3">
            <span class="px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">Direct Communication</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">Contact HSK Free Lab</h1>
            <p class="text-sm text-stone-700 leading-relaxed">Have a question, feedback on our vocabulary syllabus, or discovered a bug? We welcome your input.</p>
          </header>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h2 class="text-lg font-bold text-stone-900">Direct Email</h2>
              <p class="text-xs text-stone-600">For general inquiries, bug reports, and educational licensing:</p>
              <div class="p-3 bg-stone-50 rounded-xl font-mono text-xs font-bold text-stone-900 border border-stone-200">
                contact@mybwn.com
              </div>
              <p class="text-xs text-stone-500">Typical response time: 24–48 hours.</p>
            </div>

            <div class="md:col-span-2 p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h2 class="text-lg font-bold text-stone-900">Frequently Asked Inquiries</h2>
              <div class="space-y-3 text-xs text-stone-700">
                <div class="p-3 bg-stone-50 rounded-xl space-y-1">
                  <strong>Is HSK Free Lab really 100% free?</strong>
                  <p class="text-stone-600">Yes. All 1,050+ vocabulary items, stroke animations, audio files, and 30 mock tests are completely free with zero subscriptions.</p>
                </div>
                <div class="p-3 bg-stone-50 rounded-xl space-y-1">
                  <strong>How is my progress saved?</strong>
                  <p class="text-stone-600">Your flashcard progress and quiz scores are stored locally in your browser (localStorage). No login or external database is required.</p>
                </div>
                <div class="p-3 bg-stone-50 rounded-xl space-y-1">
                  <strong>How do I report a syllabus error?</strong>
                  <p class="text-stone-600">Email us directly at contact@mybwn.com with the word character or test ID. Our editorial team updates data promptly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },

    // 13. HSK History
    {
      path: '/hsk-history',
      title: 'History of the HSK Exam: HSK 1.0, 2.0 vs HSK 3.0 Standard | HSK Free Lab',
      description: 'Discover the comprehensive history of the Chinese Proficiency Test, from its 1984 origins to the new 9-level 3.0 standard.',
      priority: 0.6,
      changefreq: 'monthly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'History of the HSK Exam: HSK 1.0, 2.0 vs HSK 3.0 Standard',
        url: `${SITE_DOMAIN}/hsk-history`,
        description: 'Evolution of the Chinese Proficiency Test (Hanyu Shuiping Kaoshi) from 1984 to the current 9-level 3.0 grading standard.'
      },
      renderBody: () => `
        <div class="max-w-4xl mx-auto py-10 px-4 space-y-8">
          <header class="text-center space-y-3">
            <span class="px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold border border-stone-200">Historical &amp; Standards Compendium</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">Evolution of the HSK Examination</h1>
            <p class="text-sm text-stone-700 leading-relaxed">Understanding the evolution of the Chinese Proficiency Test from the 1984 Beijing Language Institute trials to the contemporary 9-level standard.</p>
          </header>
          <div class="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-6 text-sm text-stone-700 leading-relaxed">
            <h2 class="text-2xl font-bold text-stone-900">1. HSK 1.0 (1984–2009): The Academic Era</h2>
            <p>Designed primarily for foreign students seeking admission to Chinese higher education institutions, HSK 1.0 consisted of 11 complex levels graded across Basic, Elementary-Intermediate, and Advanced stages, demanding up to 8,840 vocabulary words.</p>
            <h2 class="text-2xl font-bold text-stone-900">2. HSK 2.0 (2010–Present): Global Scalability</h2>
            <p>To encourage worldwide participation, Hanban redesigned the assessment into a streamlined 6-level system calibrated against CEFR thresholds (A1 through C2), standardizing HSK 1 (150 words), HSK 2 (300 words), and HSK 3 (600 words).</p>
            <h2 class="text-2xl font-bold text-stone-900">3. HSK 3.0 (2021–Present): The 9-Level Standard</h2>
            <p>The Ministry of Education introduced the 'Chinese Proficiency Grading Standards for International Chinese Language Education', organizing proficiency into Three Stages and Nine Levels for greater scholarly rigor.</p>
          </div>
        </div>`
    },

    // 14. Privacy Policy
    {
      path: '/privacy-policy',
      title: 'Privacy Policy - HSK Free Lab',
      description: 'Privacy policy for HSK Free Lab. We respect your privacy and do not track or store personal data on remote servers.',
      priority: 0.3,
      changefreq: 'yearly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy',
        url: `${SITE_DOMAIN}/privacy-policy`
      },
      renderBody: () => `
        <div class="max-w-3xl mx-auto py-10 px-4 space-y-6">
          <h1 class="text-3xl font-black text-stone-900">Privacy Policy</h1>
          <p class="text-xs text-stone-500">Last updated: October 2026</p>
          <div class="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4 text-sm text-stone-700 leading-relaxed">
            <h2 class="text-lg font-bold text-stone-900">1. Zero Registration &amp; Data Minimization</h2>
            <p>HSK Free Lab is designed to respect user privacy. We do not require accounts, logins, or personal identifiable information (PII) to access our educational materials.</p>
            <h2 class="text-lg font-bold text-stone-900">2. Local Storage and Client-Side Processing</h2>
            <p>All interactive quiz scores, character drawings, and audio playback settings are stored strictly in your local browser runtime. We do not record or sell test answers.</p>
            <h2 class="text-lg font-bold text-stone-900">3. Cookies &amp; Advertising Disclosures (Google AdSense &amp; Third Parties)</h2>
            <p>We may partner with third-party advertising networks, including Google AdSense, to support the ongoing free hosting of our educational materials. Google uses cookies, including the DoubleClick DART cookie, to serve ads based on visits to this and other websites. Users may opt out of personalized advertising by visiting Google Ad Settings or AboutAds.info.</p>
            <h2 class="text-lg font-bold text-stone-900">4. Contact &amp; Privacy Inquiries</h2>
            <p>For data inquiries, contact us at <a href="mailto:contact@mybwn.com" class="text-rose-700 underline font-medium">contact@mybwn.com</a> or visit our <a href="/contact" class="text-rose-700 underline font-medium">Contact Page</a>.</p>
          </div>
        </div>`
    },

    // 15. Terms of Service
    {
      path: '/terms',
      title: 'Terms of Service - HSK Free Lab',
      description: 'Terms of service governing the use of HSK Free Lab free learning platform and tools.',
      priority: 0.3,
      changefreq: 'yearly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Terms of Service',
        url: `${SITE_DOMAIN}/terms`
      },
      renderBody: () => `
        <div class="max-w-3xl mx-auto py-10 px-4 space-y-6">
          <h1 class="text-3xl font-black text-stone-900">Terms of Service</h1>
          <p class="text-xs text-stone-500">Last updated: October 2026</p>
          <div class="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4 text-sm text-stone-700 leading-relaxed">
            <h2 class="text-lg font-bold text-stone-900">1. Free Educational License</h2>
            <p>HSK Free Lab grants you a personal, worldwide, royalty-free license to use our platform for self-study and classroom review.</p>
            <h2 class="text-lg font-bold text-stone-900">2. Intellectual Property</h2>
            <p>The official HSK trademarks and syllabus standards belong to their respective regulatory bodies (CLEC, CTI). HSK Free Lab is an independent educational study companion.</p>
          </div>
        </div>`
    },

    // 16. Disclaimer
    {
      path: '/disclaimer',
      title: 'Disclaimer - HSK Free Lab',
      description: 'Educational disclaimer and official trademarks note for HSK Free Lab.',
      priority: 0.3,
      changefreq: 'yearly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Educational Disclaimer',
        url: `${SITE_DOMAIN}/disclaimer`
      },
      renderBody: () => `
        <div class="max-w-3xl mx-auto py-10 px-4 space-y-6">
          <h1 class="text-3xl font-black text-stone-900">Legal Disclaimer</h1>
          <p class="text-xs text-stone-500">Last updated: October 2026</p>
          <div class="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4 text-sm text-stone-700 leading-relaxed">
            <h2 class="text-lg font-bold text-stone-900">1. Educational Study Aid Only</h2>
            <p>HSK Free Lab is an independent educational tool designed to assist learners preparing for Chinese proficiency assessments. We are not officially affiliated with or endorsed by Hanban, CLEC, or CTI.</p>
            <h2 class="text-lg font-bold text-stone-900">2. Score Prediction Non-Guarantee</h2>
            <p>Practice scores generated on our platform reflect diagnostic samples and do not guarantee results on official examination administrations.</p>
          </div>
        </div>`
    },

    // 17. Data Sources
    {
      path: '/data-sources',
      title: 'Data Sources & Open Source Licenses - HSK Free Lab',
      description: 'Official data sources, vocab lists, and open source licenses powering HSK Free Lab.',
      priority: 0.3,
      changefreq: 'yearly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Data Sources & Open Source Licenses',
        url: `${SITE_DOMAIN}/data-sources`
      },
      renderBody: () => `
        <div class="max-w-3xl mx-auto py-10 px-4 space-y-6">
          <h1 class="text-3xl font-black text-stone-900">Data Sources &amp; Open Source Licenses</h1>
          <p class="text-xs text-stone-500">Open source transparency and attribution</p>
          <div class="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4 text-sm text-stone-700 leading-relaxed">
            <p>HSK Free Lab is built on trusted open-source libraries and verified public syllabus data:</p>
            <ul class="list-disc list-inside space-y-2 text-xs">
              <li><strong>Hanzi Writer:</strong> MIT License (by Chanind) - Stroke animation and drawing engine.</li>
              <li><strong>pinyin-pro:</strong> MIT License (by bialov) - Pinyin tone marks and romanization logic.</li>
              <li><strong>Make Me a Hanzi:</strong> ARPHIC License - Vector stroke coordinate database.</li>
              <li><strong>CLEC HSK Syllabus:</strong> Factual examination benchmarks, time allocations, and passing score thresholds.</li>
            </ul>
          </div>
        </div>`
    },

    // 17B. HTML Sitemap
    {
      path: '/sitemap',
      title: 'HTML Sitemap & All-Pages Directory | HSK Free Lab',
      description: 'Complete index of all 67 pages on HSK Free Lab: HSK 1, 2, and 3 level hubs, 30 interactive lessons, 88 grammar rules, 18 study guides, and diagnostic tools.',
      priority: 0.6,
      changefreq: 'weekly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'HTML Sitemap & All-Pages Directory',
        url: `${SITE_DOMAIN}/sitemap`,
        description: 'Complete directory of all 67 pages across HSK Free Lab including exam preparation hubs, 30 interactive lessons, 88 grammar points, and study masterclasses.'
      },
      renderBody: () => `
        <div class="max-w-7xl mx-auto py-10 px-4 space-y-12">
          <header class="space-y-4 max-w-3xl">
            <span class="px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">Complete Directory · 67 Canonical Pages</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">HTML Sitemap &amp; All-Pages Directory</h1>
            <p class="text-sm text-stone-700 leading-relaxed">Direct links to every official curriculum unit, level hub, diagnostic tool, grammar rule, and academic masterclass on HSK Free Lab.</p>
          </header>

          <section class="space-y-4">
            <h2 class="text-2xl font-bold text-stone-900 border-b border-stone-200 pb-2">Core Preparation Hubs &amp; Tools</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <a href="/" class="p-4 bg-white rounded-2xl border border-stone-200 block space-y-1 hover:border-emerald-300">
                <strong class="text-stone-900 text-sm">Homepage</strong>
                <p class="text-stone-600">Main overview &amp; roadmap</p>
              </a>
              <a href="/hsk-1" class="p-4 bg-white rounded-2xl border border-stone-200 block space-y-1 hover:border-emerald-300">
                <strong class="text-stone-900 text-sm">HSK 1 Preparation Hub</strong>
                <p class="text-stone-600">150 foundation vocabulary words</p>
              </a>
              <a href="/hsk-2" class="p-4 bg-white rounded-2xl border border-stone-200 block space-y-1 hover:border-sky-300">
                <strong class="text-stone-900 text-sm">HSK 2 Preparation Hub</strong>
                <p class="text-stone-600">300 cumulative vocabulary words</p>
              </a>
              <a href="/hsk-3" class="p-4 bg-white rounded-2xl border border-stone-200 block space-y-1 hover:border-rose-300">
                <strong class="text-stone-900 text-sm">HSK 3 Preparation Hub</strong>
                <p class="text-stone-600">600 cumulative vocabulary words</p>
              </a>
              <a href="/calculator" class="p-4 bg-white rounded-2xl border border-stone-200 block space-y-1 hover:border-amber-300">
                <strong class="text-stone-900 text-sm">HSK Score Calculator</strong>
                <p class="text-stone-600">Scaled scores &amp; passing margins</p>
              </a>
              <a href="/pinyin-trainer" class="p-4 bg-white rounded-2xl border border-stone-200 block space-y-1 hover:border-blue-300">
                <strong class="text-stone-900 text-sm">Pinyin Tone Trainer</strong>
                <p class="text-stone-600">Interactive 4-tone audio soundboard</p>
              </a>
              <a href="/stroke-order" class="p-4 bg-white rounded-2xl border border-stone-200 block space-y-1 hover:border-rose-300">
                <strong class="text-stone-900 text-sm">Stroke Order Animator</strong>
                <p class="text-stone-600">Hanzi stroke writing &amp; quiz</p>
              </a>
              <a href="/mock-tests" class="p-4 bg-white rounded-2xl border border-stone-200 block space-y-1 hover:border-purple-300">
                <strong class="text-stone-900 text-sm">30 Timed Mock Tests</strong>
                <p class="text-stone-600">Timed exam simulations with audio</p>
              </a>
              <a href="/lessons" class="p-4 bg-white rounded-2xl border border-stone-200 block space-y-1 hover:border-emerald-300">
                <strong class="text-stone-900 text-sm">30 Interactive Lessons</strong>
                <p class="text-stone-600">Curriculum master directory</p>
              </a>
              <a href="/grammar" class="p-4 bg-white rounded-2xl border border-stone-200 block space-y-1 hover:border-rose-300">
                <strong class="text-stone-900 text-sm">88-Rule Grammar Compendium</strong>
                <p class="text-stone-600">Structural formulas &amp; examples</p>
              </a>
              <a href="/guides" class="p-4 bg-white rounded-2xl border border-stone-200 block space-y-1 hover:border-amber-300">
                <strong class="text-stone-900 text-sm">18 Academic Masterclasses</strong>
                <p class="text-stone-600">Study blueprints &amp; tactics</p>
              </a>
              <a href="/hsk-history" class="p-4 bg-white rounded-2xl border border-stone-200 block space-y-1 hover:border-indigo-300">
                <strong class="text-stone-900 text-sm">HSK History &amp; 3.0</strong>
                <p class="text-stone-600">Evolution from 1984 to 3.0</p>
              </a>
            </div>
          </section>

          <section class="space-y-4">
            <h2 class="text-2xl font-bold text-stone-900 border-b border-stone-200 pb-2">30 Dedicated Interactive Lessons</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              ${lessonsData.map(l => {
                const uNum = getLessonUnitNumber(l.slug);
                return `
                <a href="/lessons/${l.slug}" class="p-3 bg-white rounded-xl border border-stone-200 block hover:border-emerald-400">
                  <span class="text-[10px] uppercase font-bold text-emerald-700">HSK ${l.level} · Unit ${uNum}</span>
                  <div class="font-bold text-stone-900">${l.title}</div>
                </a>`;
              }).join('')}
            </div>
          </section>

          <section class="space-y-4">
            <h2 class="text-2xl font-bold text-stone-900 border-b border-stone-200 pb-2">18 Academic Study Guides &amp; Masterclasses</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              ${blogPostsData.map(b => `
                <a href="/guides/${b.slug}" class="p-3 bg-white rounded-xl border border-stone-200 block hover:border-rose-400">
                  <span class="text-[10px] uppercase font-bold text-rose-700">${b.tags[0]} · ${b.readTime}</span>
                  <div class="font-bold text-stone-900 line-clamp-1">${b.title}</div>
                </a>`).join('')}
            </div>
          </section>

          <section class="space-y-4">
            <h2 class="text-2xl font-bold text-stone-900 border-b border-stone-200 pb-2">Trust, E-E-A-T &amp; Legal Policies</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <a href="/about" class="p-3 bg-white rounded-xl border border-stone-200 block hover:border-sky-300 font-bold text-stone-900">About Us</a>
              <a href="/contact" class="p-3 bg-white rounded-xl border border-stone-200 block hover:border-sky-300 font-bold text-stone-900">Contact Us</a>
              <a href="/data-sources" class="p-3 bg-white rounded-xl border border-stone-200 block hover:border-sky-300 font-bold text-stone-900">Data Sources</a>
              <a href="/privacy-policy" class="p-3 bg-white rounded-xl border border-stone-200 block hover:border-sky-300 font-bold text-stone-900">Privacy Policy</a>
              <a href="/terms" class="p-3 bg-white rounded-xl border border-stone-200 block hover:border-sky-300 font-bold text-stone-900">Terms of Service</a>
              <a href="/disclaimer" class="p-3 bg-white rounded-xl border border-stone-200 block hover:border-sky-300 font-bold text-stone-900">Disclaimer</a>
            </div>
          </section>
        </div>`
    }
  ];

  // 18. Add all 18 individual guide/blog posts
  for (const post of blogPostsData) {
    routes.push({
      path: `/guides/${post.slug}`,
      title: `${post.title} | HSK Free Lab`,
      description: post.summary,
      type: 'article',
      priority: 0.7,
      changefreq: 'monthly',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.summary,
          author: {
            '@type': 'Organization',
            name: 'HSK Free Lab',
            url: 'https://mybwn.com/'
          },
          publisher: {
            '@type': 'Organization',
            name: 'HSK Free Lab',
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_DOMAIN}/favicon.svg`
            }
          },
          datePublished: post.date,
          dateModified: TODAY,
          mainEntityOfPage: `${SITE_DOMAIN}/guides/${post.slug}`,
          image: `${SITE_DOMAIN}/og-preview.png`
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_DOMAIN}/` },
            { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_DOMAIN}/guides` },
            { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_DOMAIN}/guides/${post.slug}` }
          ]
        }
      ],
      renderBody: () => `
        <article class="max-w-4xl mx-auto py-10 px-4 space-y-8">
          <header class="space-y-4 border-b border-stone-200 pb-8">
            <nav class="text-xs text-stone-500 flex items-center gap-2">
              <a href="/" class="hover:underline">Home</a> &gt;
              <a href="/guides" class="hover:underline">Guides</a> &gt;
              <span class="text-stone-800 font-semibold">${post.tags[0]}</span>
            </nav>
            <div class="flex items-center gap-2 text-xs font-bold text-rose-700">
              <span class="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200">${post.tags[0]}</span>
              <span>&bull;</span>
              <span>${post.readTime}</span>
              <span>&bull;</span>
              <span class="text-stone-500 font-mono">${post.date}</span>
            </div>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">${post.title}</h1>
            <p class="text-base text-stone-600 leading-relaxed">${post.summary}</p>
            <div class="text-xs text-stone-500 pt-1 font-medium">By ${post.author}</div>
          </header>
          <div class="prose prose-stone max-w-none text-sm text-stone-700 leading-relaxed space-y-4">
            ${markdownToHtml(post.content)}
          </div>
          <footer class="pt-8 border-t border-stone-200 flex items-center justify-between text-xs">
            <a href="/guides" class="font-bold text-rose-700 hover:underline">&larr; Back to All 18 Guides</a>
            <a href="/hsk-1" class="font-bold text-emerald-700 hover:underline">Start HSK 1 Free &rarr;</a>
          </footer>
        </article>`
    });
  }

  // 19. Add all 30 individual lesson routes (/lessons/:slug)
  for (const lesson of lessonsData) {
    const unitNum = getLessonUnitNumber(lesson.slug);
    const enrichedVocab = getEnrichedVocabForLesson(lesson);
    const adjacent = getAdjacentLessons(lesson.slug);
    const cefr = lesson.level === 1 ? 'A1' : lesson.level === 2 ? 'A2' : 'B1';
    const canonicalUrl = `${SITE_DOMAIN}/lessons/${lesson.slug}`;

    routes.push({
      path: `/lessons/${lesson.slug}`,
      title: `HSK ${lesson.level} Lesson ${unitNum}: ${lesson.title} | HSK Free Lab`,
      description: `${lesson.description} Comprehensive HSK ${lesson.level} lesson featuring conversational dialogue, enriched vocabulary definitions, sentence grammar rules, and interactive quiz.`,
      type: 'article',
      priority: 0.8,
      changefreq: 'weekly',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: `HSK ${lesson.level} Lesson ${unitNum}: ${lesson.title}`,
          description: lesson.description,
          educationalLevel: `CEFR ${cefr}`,
          isAccessibleForFree: true,
          provider: {
            '@type': 'Organization',
            name: 'HSK Free Lab',
            url: SITE_DOMAIN
          },
          url: canonicalUrl
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_DOMAIN}/` },
            { '@type': 'ListItem', position: 2, name: 'Lessons', item: `${SITE_DOMAIN}/lessons` },
            { '@type': 'ListItem', position: 3, name: `HSK ${lesson.level}`, item: `${SITE_DOMAIN}/hsk-${lesson.level}` },
            { '@type': 'ListItem', position: 4, name: `Unit ${unitNum}: ${lesson.title}`, item: canonicalUrl }
          ]
        }
      ],
      renderBody: () => `
        <article class="max-w-4xl mx-auto py-10 px-4 space-y-10">
          
          <!-- Breadcrumb Navigation -->
          <nav class="text-xs text-stone-500 flex items-center gap-2 flex-wrap">
            <a href="/" class="hover:underline">Home</a> &gt;
            <a href="/lessons" class="hover:underline">Lessons</a> &gt;
            <a href="/hsk-${lesson.level}" class="hover:underline">HSK ${lesson.level}</a> &gt;
            <span class="text-stone-800 font-semibold">Unit ${unitNum}: ${lesson.title}</span>
          </nav>

          <!-- Lesson Header -->
          <header class="space-y-4 border-b border-stone-200 pb-8">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-bold border ${lesson.level === 1 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : (lesson.level === 2 ? 'bg-sky-50 text-sky-800 border-sky-200' : 'bg-rose-50 text-rose-800 border-rose-200')}">
                HSK ${lesson.level} · Unit ${unitNum} of 10
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold">
                CEFR ${cefr}
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold">
                ${enrichedVocab.length} Key Words
              </span>
            </div>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              ${lesson.title}
            </h1>
            <p class="text-base text-stone-700 leading-relaxed max-w-3xl">
              ${lesson.description}
            </p>
          </header>

          <!-- Section 1: Dialogue -->
          <section class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
                <span>💬</span>
                <span>Conversational Dialogue (课文对话)</span>
              </h2>
              <span class="text-xs text-stone-400 font-mono">${lesson.dialogue.length} Sentences</span>
            </div>
            <div class="space-y-3">
              ${lesson.dialogue.map(d => `
                <div class="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1">
                  <div class="text-xs font-bold text-stone-500 uppercase tracking-wider">${d.speaker}</div>
                  <div class="text-lg font-bold text-stone-900">${d.zh}</div>
                  <div class="text-xs text-rose-700 font-mono">${d.py}</div>
                  <div class="text-xs text-stone-600">${d.en}</div>
                </div>`).join('')}
            </div>
          </section>

          <!-- Section 2: Key Vocabulary Table -->
          <section class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
                <span>📖</span>
                <span>Key Vocabulary Deck (重点生词)</span>
              </h2>
              <span class="text-xs text-stone-400 font-mono">${enrichedVocab.length} Words</span>
            </div>
            <div class="overflow-x-auto bg-white rounded-2xl border border-stone-200 shadow-xs">
              <table class="w-full text-left text-xs">
                <thead class="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th class="p-3">Character</th>
                    <th class="p-3">Pinyin</th>
                    <th class="p-3">Meaning</th>
                    <th class="p-3">Type</th>
                    <th class="p-3">Example Sentence</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-stone-100">
                  ${enrichedVocab.map(v => `
                    <tr class="hover:bg-stone-50/70">
                      <td class="p-3 font-bold text-base text-stone-900 whitespace-nowrap">
                        <a href="/stroke-order?char=${encodeURIComponent(v.hanzi[0])}" class="hover:text-rose-700" title="View stroke animation for ${v.hanzi[0]}">${v.hanzi}</a>
                      </td>
                      <td class="p-3 font-mono text-rose-700 whitespace-nowrap">${v.pinyin}</td>
                      <td class="p-3 text-stone-700 font-medium">${v.meaning}</td>
                      <td class="p-3 text-stone-500 whitespace-nowrap"><span class="px-2 py-0.5 rounded bg-stone-100">${v.partOfSpeech}</span></td>
                      <td class="p-3 text-stone-700 space-y-0.5">
                        <div class="font-bold text-stone-800">${v.exampleZh}</div>
                        <div class="text-stone-500 font-mono text-[11px]">${v.examplePy}</div>
                        <div class="text-stone-600">${v.exampleEn}</div>
                      </td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </section>

          <!-- Section 3: Grammar Structures -->
          <section class="space-y-4">
            <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
              <span>📐</span>
              <span>Essential Grammar Formulas (语法要点)</span>
            </h2>
            <div class="space-y-3">
              ${lesson.grammarPoints.map((gp, gIdx) => `
                <div class="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="w-5 h-5 rounded-md bg-rose-100 text-rose-800 text-[11px] font-bold flex items-center justify-center">${gIdx + 1}</span>
                    <h3 class="text-sm font-bold text-stone-900">${gp}</h3>
                  </div>
                  <p class="text-xs text-stone-600 leading-relaxed pl-7">Core structural pattern for HSK ${lesson.level}. For the comprehensive breakdown with formulas and pitfalls, review the <a href="/grammar" class="text-rose-700 underline font-semibold">88-Rule Grammar Compendium</a>.</p>
                </div>`).join('')}
            </div>
          </section>

          <!-- Section 4: Practice Quiz -->
          <section class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
                <span>✍️</span>
                <span>Comprehension Practice (随堂检测)</span>
              </h2>
              <span class="text-xs text-stone-400 font-mono">${lesson.practiceQuestions.length} Questions</span>
            </div>
            <div class="space-y-4">
              ${lesson.practiceQuestions.map((q, qIdx) => `
                <div class="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div class="font-bold text-stone-900 text-sm">Question ${qIdx + 1}: ${q.question}</div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    ${q.options.map((opt, optIdx) => `
                      <div class="p-2.5 rounded-xl border ${optIdx === q.correctIndex ? 'border-emerald-300 bg-emerald-50/60 font-bold text-emerald-900' : 'border-stone-200 bg-stone-50 text-stone-700'}">
                        <span>${String.fromCharCode(65 + optIdx)}. ${opt}</span>
                        ${optIdx === q.correctIndex ? '<span class="ml-1 text-emerald-700 font-bold">(Verified Answer)</span>' : ''}
                      </div>`).join('')}
                  </div>
                  <div class="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs text-stone-600">
                    <strong>Explanation:</strong> ${q.explanation}
                  </div>
                </div>`).join('')}
            </div>
          </section>

          <!-- Section 5: Unit Progression & Internal Links -->
          <footer class="pt-8 border-t border-stone-200 space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${adjacent.prevLesson ? `
                <a href="/lessons/${adjacent.prevLesson.slug}" class="p-4 rounded-2xl border border-stone-200 hover:border-emerald-300 hover:bg-stone-50 transition-all flex flex-col justify-between">
                  <span class="text-[10px] uppercase font-bold text-stone-400">&larr; Previous Unit</span>
                  <span class="text-sm font-bold text-stone-900 mt-1">${adjacent.prevLesson.title}</span>
                </a>` : '<div></div>'}
              ${adjacent.nextLesson ? `
                <a href="/lessons/${adjacent.nextLesson.slug}" class="p-4 rounded-2xl border border-stone-200 hover:border-emerald-300 hover:bg-stone-50 transition-all flex flex-col justify-between text-right">
                  <span class="text-[10px] uppercase font-bold text-stone-400">Next Unit &rarr;</span>
                  <span class="text-sm font-bold text-stone-900 mt-1">${adjacent.nextLesson.title}</span>
                </a>` : '<div></div>'}
            </div>

            <!-- Level Hub & Reference Cross-Links -->
            <div class="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs">
              <div class="font-bold text-stone-900">Explore More HSK ${lesson.level} Resources:</div>
              <div class="flex flex-wrap items-center gap-3">
                <a href="/hsk-${lesson.level}" class="px-3 py-1.5 rounded-lg bg-white border border-stone-300 font-semibold text-stone-800 hover:border-rose-400">HSK ${lesson.level} Vocabulary &amp; Specs &rarr;</a>
                <a href="/mock-tests" class="px-3 py-1.5 rounded-lg bg-white border border-stone-300 font-semibold text-stone-800 hover:border-purple-400">HSK ${lesson.level} Timed Mock Tests &rarr;</a>
                <a href="/grammar" class="px-3 py-1.5 rounded-lg bg-white border border-stone-300 font-semibold text-stone-800 hover:border-rose-400">88-Rule Grammar Compendium &rarr;</a>
                <a href="/lessons" class="px-3 py-1.5 rounded-lg bg-white border border-stone-300 font-semibold text-stone-800 hover:border-emerald-400">All 30 Curriculum Units &rarr;</a>
              </div>
            </div>
          </footer>

        </article>`
    });
  }

  // Master Vocabulary Directory (/words)
  routes.push({
    path: '/words',
    title: 'HSK 1-3 Chinese Vocabulary Directory (603 Words) | HSK Free Lab',
    description: 'Master all 603 official HSK 1, 2, and 3 Chinese words with stroke order animations, native audio pronunciation, tone pitch contours, and grammar quizzes.',
    priority: 0.9,
    changefreq: 'weekly',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'HSK 1-3 Chinese Vocabulary Directory (603 Words)',
      description: 'Comprehensive study portal indexing all 603 official HSK 1, 2, and 3 words with stroke orders, pronunciations, and grammar collocations.',
      url: `${SITE_DOMAIN}/words`
    },
    renderBody: () => renderWordsDirectoryStaticHtml()
  });

  // 603 Dedicated Individual Word Study Pages (/words/:slug)
  for (const word of allVocabWithSlugs) {
    const wordTitle = `${word.hanzi} (${word.pinyin}) Meaning in English, Stroke Order & HSK ${word.level} Sentences | HSK Free Lab`;
    const wordDesc = `Learn Chinese word ${word.hanzi} (${word.pinyin}): English meaning "${word.meaning}", animated stroke order, HSK ${word.level} audio pronunciation, grammar collocations, and practice quiz.`;
    const canonical = `${SITE_DOMAIN}/words/${word.slug}`;

    const jsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        '@id': `${canonical}#term`,
        name: word.hanzi,
        alternateName: word.pinyin,
        description: word.meaning,
        inDefinedTermSet: {
          '@type': 'DefinedTermSet',
          name: `HSK Level ${word.level} Vocabulary Syllabus`,
          url: `${SITE_DOMAIN}/hsk-${word.level}`
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        '@id': `${canonical}#resource`,
        name: `${word.hanzi} (${word.pinyin}) - HSK ${word.level} Chinese Word Study Guide`,
        description: wordDesc,
        educationalLevel: `HSK ${word.level}`,
        learningResourceType: 'Study Guide',
        inLanguage: ['zh-Hans', 'en'],
        provider: {
          '@type': 'Organization',
          name: 'HSK Free Lab',
          url: `${SITE_DOMAIN}/`
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_DOMAIN}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: `HSK ${word.level} Hub`,
            item: `${SITE_DOMAIN}/hsk-${word.level}`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Words Directory',
            item: `${SITE_DOMAIN}/words`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: `${word.hanzi} (${word.pinyin})`,
            item: canonical
          }
        ]
      }
    ];

    routes.push({
      path: `/words/${word.slug}`,
      title: wordTitle,
      description: wordDesc,
      priority: 0.7,
      changefreq: 'monthly',
      type: 'article',
      jsonLd,
      renderBody: () => renderWordDetailStaticHtml(word)
    });
  }

  // 88 Dedicated Individual Grammar Study Pages (/grammar/:slug)
  for (const rule of all88GrammarRules) {
    const ruleTitle = `${rule.title} - HSK ${rule.level} Chinese Grammar Guide | HSK Free Lab`;
    const ruleDesc = `Master ${rule.title} for HSK ${rule.level}. Syntax pattern: ${rule.pattern}. Free bilingual examples with native audio, common mistakes, and interactive quiz.`;
    const canonical = `${SITE_DOMAIN}/grammar/${rule.slug}`;

    // FAQ schema from Quiz
    const faqQuestions = rule.quiz.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${q.options[q.correctIndex]}. Explanation: ${q.explanation}`
      }
    }));

    const jsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: `HSK ${rule.level} Hub`, item: `${SITE_DOMAIN}/hsk-${rule.level}` },
          { '@type': 'ListItem', position: 3, name: 'Grammar Compendium', item: `${SITE_DOMAIN}/grammar` },
          { '@type': 'ListItem', position: 4, name: rule.title, item: canonical }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: rule.title,
        description: ruleDesc,
        learningResourceType: 'Grammar Guide',
        educationalLevel: `HSK Level ${rule.level} / CEFR ${rule.cefr}`,
        url: canonical,
        inLanguage: ['zh-Hans', 'en'],
        isAccessibleForFree: true,
        author: {
          '@type': 'Organization',
          name: 'HSK Free Lab Editorial Team',
          url: `${SITE_DOMAIN}/`
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqQuestions
      }
    ];

    routes.push({
      path: `/grammar/${rule.slug}`,
      title: ruleTitle,
      description: ruleDesc,
      priority: 0.8,
      changefreq: 'monthly',
      type: 'article',
      jsonLd,
      renderBody: () => renderGrammarDetailStaticHtml(rule)
    });
  }

  // 15 Confusing Chinese Words Comparison Hub (/compare)
  routes.push({
    path: '/compare',
    title: 'Confusing Chinese Words Compared - 15 Essential Mandarin Distinctions | HSK Free Lab',
    description: 'Master tricky Chinese word pairs with clear side-by-side comparison tables: 不 vs. 没, 二 vs. 两, 的 vs. 得 vs. 地, 会 vs. 能 vs. 可以. Includes correct vs. wrong sentences and quizzes.',
    priority: 0.9,
    changefreq: 'weekly',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Confusing Chinese Words & Grammar Comparisons',
      description: 'Comprehensive 15-pair comparison guide solving the most searched Mandarin distinctions.',
      url: `${SITE_DOMAIN}/compare`
    },
    renderBody: () => renderCompareListStaticHtml()
  });

  // 15 Dedicated Comparison Detail Guides (/compare/:slug)
  for (const comp of comparisonsData) {
    const compTitle = `${comp.title} | HSK Free Lab`;
    const compDesc = comp.summary;
    const canonical = `${SITE_DOMAIN}/compare/${comp.slug}`;

    const faqQuestions = comp.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }));

    const jsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: comp.title,
        description: comp.summary,
        author: {
          '@type': 'Organization',
          name: 'HSK Free Lab Editorial Team',
          url: `${SITE_DOMAIN}/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'HSK Free Lab',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_DOMAIN}/favicon.svg`
          }
        },
        datePublished: '2026-11-09',
        dateModified: TODAY,
        mainEntityOfPage: canonical,
        image: `${SITE_DOMAIN}/pins/${comp.slug}.png`
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Comparisons', item: `${SITE_DOMAIN}/compare` },
          { '@type': 'ListItem', position: 3, name: comp.shortTitle, item: canonical }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqQuestions
      }
    ];

    routes.push({
      path: `/compare/${comp.slug}`,
      title: compTitle,
      description: compDesc,
      priority: 0.8,
      changefreq: 'monthly',
      type: 'article',
      jsonLd,
      renderBody: () => renderCompareDetailStaticHtml(comp)
    });
  }

  return routes;
}

// Generate Sitemap XML
function generateSitemapXml(routes: RouteDefinition[]): string {
  const urlEntries = routes.map(r => {
    const loc = `${SITE_DOMAIN}${r.path === '/' ? '/' : r.path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Main Runner
async function prerender() {
  console.log('🚀 [prerender] Starting build-time static HTML and sitemap generation...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error(`❌ [prerender] dist/ directory not found at ${DIST_DIR}. Run 'vite build' first.`);
    process.exit(1);
  }

  const baseHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.error(`❌ [prerender] dist/index.html not found. Run 'vite build' first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');
  const routes = getCanonicalRoutes();
  console.log(`📋 [prerender] Found ${routes.length} canonical routes to render.`);

  // 1. Generate XML Sitemaps (Core + Words + Master)
  const coreRoutes = routes.filter(r => !r.path.startsWith('/words/'));
  const wordRoutes = routes.filter(r => r.path.startsWith('/words/'));

  const sitemapMasterXml = generateSitemapXml(routes);
  const sitemapCoreXml = generateSitemapXml(coreRoutes);
  const sitemapWordsXml = generateSitemapXml(wordRoutes);

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapMasterXml, 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'sitemap.xml'), sitemapMasterXml, 'utf8');

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap-core.xml'), sitemapCoreXml, 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'sitemap-core.xml'), sitemapCoreXml, 'utf8');

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap-words.xml'), sitemapWordsXml, 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'sitemap-words.xml'), sitemapWordsXml, 'utf8');

  console.log(`✅ [prerender] Sitemaps generated:`);
  console.log(`   - Master sitemap.xml: ${routes.length} canonical URLs`);
  console.log(`   - sitemap-core.xml: ${coreRoutes.length} core URLs`);
  console.log(`   - sitemap-words.xml: ${wordRoutes.length} word URLs`);

  // 2. Generate Static HTML for each route
  let successCount = 0;
  for (const route of routes) {
    const canonicalUrl = `${SITE_DOMAIN}${route.path === '/' ? '/' : route.path}`;
    const ogType = route.type || 'website';
    const jsonLdString = JSON.stringify(route.jsonLd);

    let routeHtml = baseHtml;

    // Replace Title
    routeHtml = routeHtml.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

    // Replace Meta Description
    routeHtml = routeHtml.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${route.description}" />`);

    // Replace Canonical Link
    routeHtml = routeHtml.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

    // Replace OG tags
    routeHtml = routeHtml.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${route.title}" />`);
    routeHtml = routeHtml.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${route.description}" />`);
    routeHtml = routeHtml.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
    routeHtml = routeHtml.replace(/<meta property="og:type" content=".*?" \/>/i, `<meta property="og:type" content="${ogType}" />`);

    // Replace Twitter tags
    routeHtml = routeHtml.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${route.title}" />`);
    routeHtml = routeHtml.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${route.description}" />`);

    // Clean any existing injected JSON-LD
    routeHtml = routeHtml.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

    // Inject JSON-LD Schema before </head>
    const jsonLdTag = `\n    <script type="application/ld+json">${jsonLdString}</script>\n  </head>`;
    routeHtml = routeHtml.replace('</head>', jsonLdTag);

    // Inject Genuine Semantic Body HTML inside <div id="app">...</div>
    const innerBody = `
      ${renderStaticHeader()}
      <main class="w-full flex-1">
        ${route.renderBody()}
      </main>
      ${renderStaticFooter()}`;

    routeHtml = routeHtml.replace(/<div id="app"([^>]*)>[\s\S]*?<\/div>/i, `<div id="app"$1>${innerBody}</div>`);

    if (route.path === '/') {
      fs.writeFileSync(baseHtmlPath, routeHtml, 'utf8');
    } else {
      const cleanPath = route.path.replace(/^\//, '');

      // 1. Output clean extensionless file: dist/<cleanPath>.html
      // Enables GitHub Pages to serve clean canonical URLs (e.g. /hsk-1, /guides/hsk-1-study-plan, /lessons/greetings-and-introductions)
      // directly with HTTP 200 OK and ZERO 301 trailing-slash redirects!
      const cleanFilePath = path.join(DIST_DIR, `${cleanPath}.html`);
      fs.mkdirSync(path.dirname(cleanFilePath), { recursive: true });
      fs.writeFileSync(cleanFilePath, routeHtml, 'utf8');

      // 2. Output directory index fallback: dist/<cleanPath>/index.html
      // Guarantees that if a client or crawler requests the trailing-slash variant (/hsk-1/), it also returns 200 OK
      const targetDir = path.join(DIST_DIR, cleanPath);
      fs.mkdirSync(targetDir, { recursive: true });
      const dirIndexPath = path.join(targetDir, 'index.html');
      fs.writeFileSync(dirIndexPath, routeHtml, 'utf8');
    }
    successCount++;
  }

  console.log(`🎉 [prerender] Successfully generated ${successCount} static HTML route pages in dist/!`);
}

prerender().catch(err => {
  console.error('❌ [prerender] Error during static generation:', err);
  process.exit(1);
});
