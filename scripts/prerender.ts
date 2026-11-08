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
          <li><a href="/hsk-1" class="hover:text-white">HSK 1 (150 Vocab &amp; Audio)</a></li>
          <li><a href="/hsk-2" class="hover:text-white">HSK 2 (300 Vocab &amp; Grammar)</a></li>
          <li><a href="/hsk-3" class="hover:text-white">HSK 3 (600 Vocab &amp; Reading)</a></li>
          <li><a href="/lessons" class="hover:text-white">30 Interactive Lessons</a></li>
          <li><a href="/grammar" class="hover:text-white">Grammar Compendium</a></li>
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
        </ul>
      </div>
    </div>
    <div class="max-w-7xl mx-auto mt-8 pt-6 border-t border-stone-800 text-center text-xs text-stone-500">
      &copy; 2026 HSK Free Lab (mybwn.com). Official CLEC syllabus aligned. Powered by open-source linguistics.
    </div>
  </footer>`;
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
        </div>`
    },

    // 2. HSK 1 Hub
    {
      path: '/hsk-1',
      title: 'HSK 1 Preparation Hub - 150 Words, Exam Format & Passing Rules | HSK Free Lab',
      description: 'Master all 150 official HSK 1 vocabulary words. Includes tone audio, stroke breakdown, daily grammar patterns, and practice tests.',
      priority: 0.9,
      changefreq: 'weekly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'HSK 1 Complete Chinese Preparation Course',
        description: 'Comprehensive study course for HSK Level 1 including 150 vocabulary words, listening comprehension, and official test simulator.',
        provider: { '@type': 'EducationalOrganization', name: 'HSK Free Lab', url: `${SITE_DOMAIN}/` },
        isAccessibleForFree: true,
        inLanguage: 'zh-CN',
        educationalLevel: 'Beginner'
      },
      renderBody: () => `
        <div class="max-w-7xl mx-auto py-8 px-4 space-y-8">
          <header class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">Official Syllabus · 150 Words · A1 Breakthrough Level</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">HSK 1 Complete Preparation Hub</h1>
            <p class="text-sm text-stone-700 leading-relaxed">The HSK 1 test assesses examinees' ability in daily Chinese communication. Examinees who pass HSK 1 can understand and use very simple Chinese phrases and satisfy basic communication needs.</p>
          </header>
          <section class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h2 class="text-2xl font-bold text-stone-900">Official HSK 1 Examination Format &amp; Score Thresholds</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div class="p-4 bg-stone-50 rounded-xl border border-stone-200"><strong>Listening Section:</strong> 20 questions, approx. 15 minutes. Maximum 100 points.</div>
              <div class="p-4 bg-stone-50 rounded-xl border border-stone-200"><strong>Reading Section:</strong> 20 questions, approx. 17 minutes. Maximum 100 points.</div>
              <div class="p-4 bg-stone-50 rounded-xl border border-stone-200"><strong>Passing Score:</strong> 120 points out of 200 (60% passing threshold).</div>
            </div>
          </section>
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
        </div>`
    },

    // 3. HSK 2 Hub
    {
      path: '/hsk-2',
      title: 'HSK 2 Preparation Hub - 300 Words & Listening Practice | HSK Free Lab',
      description: 'Transition from beginner to elementary Mandarin. Comprehensive HSK 2 vocabulary lists, listening drills, and passing score guides.',
      priority: 0.9,
      changefreq: 'weekly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'HSK 2 Complete Chinese Preparation Course',
        description: 'Comprehensive study course for HSK Level 2 covering 300 cumulative vocabulary words, grammar rules, and mock examinations.',
        provider: { '@type': 'EducationalOrganization', name: 'HSK Free Lab', url: `${SITE_DOMAIN}/` },
        isAccessibleForFree: true,
        inLanguage: 'zh-CN',
        educationalLevel: 'Elementary'
      },
      renderBody: () => `
        <div class="max-w-7xl mx-auto py-8 px-4 space-y-8">
          <header class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200">Official Syllabus · 300 Words Total · A2 Elementary Level</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">HSK 2 Complete Preparation Hub</h1>
            <p class="text-sm text-stone-700 leading-relaxed">The HSK 2 examination tests examinees' capacity to use Chinese in simple and direct exchanges on familiar daily topics. Passing HSK 2 certifies a firm foundation for higher-level Chinese studies.</p>
          </header>
          <section class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h2 class="text-2xl font-bold text-stone-900">Official HSK 2 Examination Format &amp; Score Thresholds</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div class="p-4 bg-stone-50 rounded-xl border border-stone-200"><strong>Listening Section:</strong> 35 questions, approx. 25 minutes. Maximum 100 points.</div>
              <div class="p-4 bg-stone-50 rounded-xl border border-stone-200"><strong>Reading Section:</strong> 25 questions, approx. 22 minutes. Maximum 100 points.</div>
              <div class="p-4 bg-stone-50 rounded-xl border border-stone-200"><strong>Passing Score:</strong> 120 points out of 200 (60% passing threshold).</div>
            </div>
          </section>
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
                  ${hsk2Vocab.slice(0, 150).map((v, i) => `<tr><td class="p-3 text-stone-400 font-mono">${i + 1}</td><td class="p-3 font-serif font-black text-base text-stone-900">${v.hanzi}</td><td class="p-3 font-semibold text-sky-700">${v.pinyin}</td><td class="p-3 text-stone-500">${v.pos || 'noun'}</td><td class="p-3 text-stone-800">${v.meaning}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
          </section>
        </div>`
    },

    // 4. HSK 3 Hub
    {
      path: '/hsk-3',
      title: 'HSK 3 Preparation Hub - 600 Words & Reading Drills | HSK Free Lab',
      description: 'Intermediate Mandarin test preparation. Master 300 additional HSK 3 characters, reading comprehension drills, and full exam prep.',
      priority: 0.9,
      changefreq: 'weekly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'HSK 3 Complete Chinese Preparation Course',
        description: 'Comprehensive study course for HSK Level 3 covering 600 cumulative vocabulary words, reading comprehension, and character writing.',
        provider: { '@type': 'EducationalOrganization', name: 'HSK Free Lab', url: `${SITE_DOMAIN}/` },
        isAccessibleForFree: true,
        inLanguage: 'zh-CN',
        educationalLevel: 'Intermediate'
      },
      renderBody: () => `
        <div class="max-w-7xl mx-auto py-8 px-4 space-y-8">
          <header class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">Official Syllabus · 600 Words Total · B1 Intermediate Level</span>
            <h1 class="text-3xl sm:text-5xl font-black text-stone-900">HSK 3 Complete Preparation Hub</h1>
            <p class="text-sm text-stone-700 leading-relaxed">The HSK 3 examination certifies that examinees can complete basic communicative tasks in daily life, study, and work. Examinees can handle most communicative situations when traveling in China.</p>
          </header>
          <section class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h2 class="text-2xl font-bold text-stone-900">Official HSK 3 Examination Format &amp; Score Thresholds</h2>
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div class="p-4 bg-stone-50 rounded-xl border border-stone-200"><strong>Listening Section:</strong> 40 questions, approx. 35 minutes. 100 points.</div>
              <div class="p-4 bg-stone-50 rounded-xl border border-stone-200"><strong>Reading Section:</strong> 30 questions, approx. 30 minutes. 100 points.</div>
              <div class="p-4 bg-stone-50 rounded-xl border border-stone-200"><strong>Writing Section:</strong> 10 questions, approx. 15 minutes. 100 points.</div>
              <div class="p-4 bg-stone-50 rounded-xl border border-stone-200"><strong>Passing Score:</strong> 180 points out of 300 (60% passing threshold).</div>
            </div>
          </section>
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
                  ${hsk3Vocab.slice(0, 150).map((v, i) => `<tr><td class="p-3 text-stone-400 font-mono">${i + 1}</td><td class="p-3 font-serif font-black text-base text-stone-900">${v.hanzi}</td><td class="p-3 font-semibold text-rose-700">${v.pinyin}</td><td class="p-3 text-stone-500">${v.pos || 'noun'}</td><td class="p-3 text-stone-800">${v.meaning}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
          </section>
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
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: 'HSK 1-3 Complete 88-Rule Grammar Compendium',
        url: `${SITE_DOMAIN}/grammar`,
        isAccessibleForFree: true,
        description: 'Comprehensive 88-point grammar compendium covering sentence formulas, particle behaviors (的, 得, 地, 了, 过, 把, 被), and contextual conversation rules across HSK 1, 2, and 3.'
      },
      renderBody: () => {
        const all88 = getAll88GrammarPoints();
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
          <div class="space-y-6">
            ${all88.map(g => {
              const badgeColor = g.level === 1 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : (g.level === 2 ? 'text-sky-700 bg-sky-50 border-sky-200' : 'text-rose-700 bg-rose-50 border-rose-200');
              const lessonLink = g.lessonSlug 
                ? `<a href="/lessons/${g.lessonSlug}" class="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-900 hover:underline">Practice in ${g.lessonTitle || 'Lesson'} &rarr;</a>`
                : `<a href="/lessons" class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline">Explore Practice Lessons &rarr;</a>`;

              const examplesHtml = Array.isArray(g.examples)
                ? g.examples.map((ex: any) => `
                    <div class="space-y-0.5">
                      <div class="font-bold text-stone-900 text-sm">${ex.zh}</div>
                      <div class="text-xs text-rose-700 font-mono">${ex.py}</div>
                      <div class="text-xs text-stone-600">${ex.en}</div>
                    </div>`).join('')
                : `<div class="text-xs text-stone-800 font-medium">${g.example || ''}</div>`;

              return `
              <article class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${badgeColor}">HSK Level ${g.level}</span>
                  <span class="text-xs text-stone-400 font-mono">Rule #${g.id}</span>
                </div>
                <div>
                  <h2 class="text-lg font-bold text-stone-900">${g.title}</h2>
                  <div class="mt-1 inline-block px-3 py-1 rounded-lg bg-stone-100 font-mono text-xs font-bold text-stone-800 border border-stone-200">${g.pattern}</div>
                </div>
                <p class="text-xs text-stone-700 leading-relaxed">${g.explanation}</p>
                <div class="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div class="text-[11px] font-bold uppercase tracking-wider text-stone-500">Illustrative Examples:</div>
                  ${examplesHtml}
                </div>
                ${g.commonMistake ? `
                <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                  <strong>Common Pitfall:</strong> ${g.commonMistake}
                </div>` : ''}
                <div class="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  ${lessonLink}
                </div>
              </article>`;
            }).join('')}
          </div>
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

  // 1. Generate XML Sitemap
  const sitemapXml = generateSitemapXml(routes);
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`✅ [prerender] Wrote ${routes.length} URLs to dist/sitemap.xml and public/sitemap.xml`);

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

    // Determine target file path
    let targetFilePath = baseHtmlPath;
    if (route.path !== '/') {
      const cleanPath = route.path.replace(/^\//, '');
      const targetDir = path.join(DIST_DIR, cleanPath);
      fs.mkdirSync(targetDir, { recursive: true });
      targetFilePath = path.join(targetDir, 'index.html');
    }

    fs.writeFileSync(targetFilePath, routeHtml, 'utf8');
    successCount++;
  }

  console.log(`🎉 [prerender] Successfully generated ${successCount} static HTML route pages in dist/!`);
}

prerender().catch(err => {
  console.error('❌ [prerender] Error during static generation:', err);
  process.exit(1);
});
