<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { 
  BookOpen, 
  Award, 
  FileText, 
  Layers, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Printer,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileDown,
  Download,
  Info
} from 'lucide-vue-next';
import { HskLevel } from '../types';
import { getVocabByLevel, getLessonsByLevel, getGrammarByLevel, getMockTestByLevel } from '../data';
import VocabTable from '../components/vocab/VocabTable.vue';
import LevelBadge from '../components/ui/LevelBadge.vue';
import { updateSeoMeta } from '../utils/seo';
import { 
  hsk1LearnedCount, 
  hsk1ProgressPercent,
  hsk2LearnedCount, 
  hsk2ProgressPercent,
  hsk3LearnedCount, 
  hsk3ProgressPercent 
} from '../stores/auth';

const route = useRoute();
const vocabTableRef = ref<{ printTable?: () => void } | null>(null);

function handlePrint() {
  if (vocabTableRef.value?.printTable) {
    vocabTableRef.value.printTable();
  } else {
    window.print();
  }
}

const currentLevel = computed<HskLevel>(() => {
  const path = route.path;
  if (path.includes('hsk-2')) return 2;
  if (path.includes('hsk-3')) return 3;
  return 1;
});

const levelLearnedCount = computed(() => {
  if (currentLevel.value === 1) return hsk1LearnedCount.value;
  if (currentLevel.value === 2) return hsk2LearnedCount.value;
  return hsk3LearnedCount.value;
});

const levelProgressPercent = computed(() => {
  if (currentLevel.value === 1) return hsk1ProgressPercent.value;
  if (currentLevel.value === 2) return hsk2ProgressPercent.value;
  return hsk3ProgressPercent.value;
});

const vocabList = computed(() => getVocabByLevel(currentLevel.value));
const lessonsList = computed(() => getLessonsByLevel(currentLevel.value));
const grammarList = computed(() => getGrammarByLevel(currentLevel.value));
const mockTest = computed(() => getMockTestByLevel(currentLevel.value));

const recommendedGuides = computed(() => {
  if (currentLevel.value === 1) {
    return [
      { slug: 'hsk-1-study-plan', title: 'HSK 1 Study Plan: The Definitive 30-Day Blueprint', readTime: '9 min read', tag: 'Study Plan' },
      { slug: 'most-common-hsk-1-characters', title: 'The 50 Most Essential HSK 1 Chinese Characters', readTime: '11 min read', tag: 'Characters' },
      { slug: 'best-hsk-1-study-tips', title: '10 Cognitive Science-Backed Study Techniques', readTime: '8 min read', tag: 'Techniques' },
      { slug: 'pinyin-tones-mastery', title: 'Conquering Mandarin Pinyin Tones & Contours', readTime: '10 min read', tag: 'Phonetics' },
    ];
  } else if (currentLevel.value === 2) {
    return [
      { slug: 'hsk-1-vs-hsk-2', title: 'HSK 1 vs HSK 2: Comprehensive Level Transition Guide', readTime: '8 min read', tag: 'Comparison' },
      { slug: 'hsk-2-listening-tactics', title: 'How to Ace HSK 2 Listening: Overcoming Fast Native Speech', readTime: '9 min read', tag: 'Listening' },
      { slug: 'measure-words-guide', title: 'The Ultimate Guide to Chinese Measure Words (量词)', readTime: '12 min read', tag: 'Grammar' },
      { slug: 'mandarin-false-friends', title: '25 False Friends and Confusing Word Pairs in Mandarin', readTime: '10 min read', tag: 'Vocabulary' },
    ];
  } else {
    return [
      { slug: 'hsk-3-writing-section-explained', title: 'Mastering the HSK 3 Writing Section: Scramble & Hanzi', readTime: '10 min read', tag: 'Writing' },
      { slug: 'hsk-3-complete-guide', title: 'The Definitive HSK 3 Survival Guide to Confident Fluency', readTime: '12 min read', tag: 'Mastery' },
      { slug: 'chinese-radicals-guide', title: 'Decoding Chinese Characters: The Top 40 Radicals', readTime: '11 min read', tag: 'Radicals' },
      { slug: 'how-to-use-mock-tests', title: 'The Science of Test Simulation: Maximize Score Gains', readTime: '9 min read', tag: 'Mock Tests' },
    ];
  }
});

const levelMeta = computed(() => {
  if (currentLevel.value === 1) {
    return {
      title: 'HSK 1 Complete Preparation Hub',
      subtitle: 'The foundational level for beginners. Master 150 vocabulary words and daily greetings.',
      cefr: 'A1 (Breakthrough)',
      questions: 40,
      duration: '40 minutes',
      sections: 'Listening (20) + Reading (20)',
      passMark: '120 / 200 (60%)',
      themeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    };
  } else if (currentLevel.value === 2) {
    return {
      title: 'HSK 2 Complete Preparation Hub',
      subtitle: 'Elementary level fluency. Master 300 words and handle everyday tasks and travel.',
      cefr: 'A2 (Waystage)',
      questions: 60,
      duration: '55 minutes',
      sections: 'Listening (35) + Reading (25)',
      passMark: '120 / 200 (60%)',
      themeColor: 'text-sky-700 bg-sky-50 border-sky-200'
    };
  } else {
    return {
      title: 'HSK 3 Complete Preparation Hub',
      subtitle: 'Intermediate communicative competence. Master 600 words, syntax structures, and writing.',
      cefr: 'B1 (Threshold)',
      questions: 80,
      duration: '90 minutes',
      sections: 'Listening (40) + Reading (30) + Writing (10)',
      passMark: '180 / 300 (60%)',
      themeColor: 'text-rose-700 bg-rose-50 border-rose-200'
    };
  }
});

interface QuickFact {
  metric: string;
  requirement: string;
  notes: string;
}

const quickFacts = computed<QuickFact[]>(() => {
  if (currentLevel.value === 1) {
    return [
      { metric: 'Official Vocabulary List', requirement: '150 Words', notes: 'Foundational survival words & greetings' },
      { metric: 'Unique Chinese Characters', requirement: '174 Characters', notes: 'Elementary Hanzi building blocks' },
      { metric: 'CEFR Benchmark', requirement: 'A1 (Breakthrough)', notes: 'Basic daily communication & introductions' },
      { metric: 'Exam Test Structure', requirement: 'Listening (20) + Reading (20)', notes: '40 total questions, ~40 minutes duration' },
      { metric: 'Passing Score Threshold', requirement: '120 / 200 (60%)', notes: 'Aggregate score; no individual section cut-off' },
      { metric: 'Pinyin Annotations', requirement: 'Full Pinyin on Exam', notes: 'Printed above every Chinese character' },
      { metric: 'Character Writing Test', requirement: 'None (0 Writing Tasks)', notes: 'Multiple choice & true/false pictures only' },
      { metric: 'Audio Listening Speed', requirement: 'Played Twice (2x)', notes: 'Clear native voice with extended pauses' },
      { metric: 'Target Study Duration', requirement: '25–40 Hours', notes: 'Approx. 3–4 weeks at 1 hour daily practice' },
      { metric: 'Free Printable PDF Sheet', requirement: '1-Click Instant Print', notes: 'Free browser export with zero watermarks or ads' },
    ];
  } else if (currentLevel.value === 2) {
    return [
      { metric: 'Official Vocabulary List', requirement: '300 Words Total', notes: '150 new HSK 2 words + 150 HSK 1 cumulative' },
      { metric: 'Unique Chinese Characters', requirement: '347 Characters', notes: 'Expands into common shopping & travel radicals' },
      { metric: 'CEFR Benchmark', requirement: 'A2 (Waystage)', notes: 'Elementary routine tasks & direct social exchanges' },
      { metric: 'Exam Test Structure', requirement: 'Listening (35) + Reading (25)', notes: '60 total questions, ~55 minutes duration' },
      { metric: 'Passing Score Threshold', requirement: '120 / 200 (60%)', notes: 'Combined score; no minimum per section' },
      { metric: 'Pinyin Annotations', requirement: 'Full Pinyin on Exam', notes: 'Printed above all characters across test paper' },
      { metric: 'Character Writing Test', requirement: 'None (0 Writing Tasks)', notes: 'Multiple choice comprehension & picture matches' },
      { metric: 'Audio Listening Speed', requirement: 'Played Twice (2x)', notes: 'Conversational pace with normal pauses' },
      { metric: 'Target Study Duration', requirement: '50–80 Cumulative Hours', notes: 'Approx. 6–8 weeks after passing HSK 1' },
      { metric: 'Free Printable PDF Sheet', requirement: '1-Click Instant Print', notes: 'Free browser export with zero watermarks or ads' },
    ];
  } else {
    return [
      { metric: 'Official Vocabulary List', requirement: '600 Words Total', notes: '300 new HSK 3 words + 300 HSK 1–2 cumulative' },
      { metric: 'Unique Chinese Characters', requirement: '617 Characters', notes: 'Core literacy across everyday workplace & study' },
      { metric: 'CEFR Benchmark', requirement: 'B1 (Threshold)', notes: 'Independent travel, work, and social fluency' },
      { metric: 'Exam Test Structure', requirement: 'Listening (40) + Reading (30) + Writing (10)', notes: '80 total questions, ~90 minutes duration' },
      { metric: 'Passing Score Threshold', requirement: '180 / 300 (60%)', notes: '100 points per section; 180 total aggregate to pass' },
      { metric: 'Pinyin Annotations', requirement: 'No Pinyin on Exam Paper', notes: 'All passages and questions are pure Hanzi' },
      { metric: 'Character Writing Test', requirement: '10 Writing Questions', notes: '5 sentence scrambles + 5 Hanzi fill-in characters' },
      { metric: 'Audio Listening Speed', requirement: 'Played Twice (2x)', notes: 'Authentic dialogues at normal conversational speed' },
      { metric: 'Target Study Duration', requirement: '120–200 Cumulative Hours', notes: 'Approx. 3–5 months of disciplined study' },
      { metric: 'Free Printable PDF Sheet', requirement: '1-Click Instant Print', notes: 'Free browser export with zero watermarks or ads' },
    ];
  }
});

interface FaqItem {
  question: string;
  answer: string;
}

const faqs = computed<FaqItem[]>(() => {
  const lvl = currentLevel.value;
  if (lvl === 1) {
    return [
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
  } else if (lvl === 2) {
    return [
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
  } else {
    return [
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
  }
});

const openFaqIndex = ref<number | null>(0);
function toggleFaq(idx: number) {
  openFaqIndex.value = openFaqIndex.value === idx ? null : idx;
}

function applyHubSeo() {
  const lvl = currentLevel.value;
  const canonicalUrl = `https://mybwn.com/hsk-${lvl}`;
  let title = '';
  let description = '';

  if (lvl === 1) {
    title = 'HSK 1 Preparation Hub - 150 Words, Exam Format & Passing Rules | HSK Free Lab';
    description = 'Master all 150 official HSK 1 vocabulary words. Includes tone audio, stroke breakdown, daily grammar patterns, and practice tests.';
  } else if (lvl === 2) {
    title = 'HSK 2 Preparation Hub - 300 Words & Listening Practice | HSK Free Lab';
    description = 'Transition from beginner to elementary Mandarin. Comprehensive HSK 2 vocabulary lists, listening drills, and passing score guides.';
  } else {
    title = 'HSK 3 Preparation Hub - 600 Words & Reading Drills | HSK Free Lab';
    description = 'Intermediate Mandarin test preparation. Master 300 additional HSK 3 characters, reading comprehension drills, and full exam prep.';
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.value.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': `HSK ${lvl} Complete Chinese Preparation Course`,
    'description': description,
    'provider': { '@type': 'EducationalOrganization', 'name': 'HSK Free Lab', 'url': 'https://mybwn.com/' },
    'isAccessibleForFree': true,
    'inLanguage': 'zh-CN',
    'educationalLevel': lvl === 1 ? 'Beginner' : (lvl === 2 ? 'Elementary' : 'Intermediate')
  };

  updateSeoMeta({
    title,
    description,
    canonical: canonicalUrl,
    jsonLd: [courseSchema, faqSchema]
  }, route.path);
}

onMounted(() => {
  applyHubSeo();
});

watch(() => currentLevel.value, () => {
  applyHubSeo();
});
</script>

<template>
  <div class="space-y-12 pb-16">
    
    <!-- Print-Only Page Header (Visible only when user prints or saves PDF) -->
    <div class="print-only mb-6 pb-4 border-b-2 border-stone-800">
      <div class="flex items-center justify-between">
        <div>
          <div class="font-bold text-xs uppercase tracking-wider text-stone-500">mybwn.com — HSK Free Lab · Open Educational Resource</div>
          <h1 class="text-2xl font-black text-stone-900 mt-1">
            Official HSK {{ currentLevel }} Vocabulary Study Sheet ({{ vocabList.length }} Words)
          </h1>
          <p class="text-xs text-stone-600 mt-0.5">
            CEFR Level: {{ levelMeta.cefr }} · Pass Mark: {{ levelMeta.passMark }} · Duration: {{ levelMeta.duration }}
          </p>
        </div>
        <div class="text-right text-xs text-stone-500">
          <span class="font-bold text-stone-800">100% Free · No Registration</span><br />
          <span>https://mybwn.com/hsk-{{ currentLevel }}</span>
        </div>
      </div>
    </div>

    <!-- Level Header Banner -->
    <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm p-4 sm:p-8 lg:p-10 transition-all">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-3 max-w-2xl">
          <div class="flex items-center gap-2">
            <LevelBadge :level="currentLevel" size="lg" />
            <span class="text-xs font-semibold text-stone-500 dark:text-stone-400">CEFR: {{ levelMeta.cefr }}</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            {{ levelMeta.title }}
          </h1>
          <p class="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {{ levelMeta.subtitle }}
          </p>
        </div>

        <!-- Quick Action CTA -->
        <div class="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
          <button 
            type="button"
            @click="handlePrint" 
            class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            title="Print or Save as PDF Cheat Sheet"
          >
            <Printer class="w-3.5 h-3.5" />
            <span>Print / Save as PDF Cheat Sheet</span>
          </button>

          <router-link 
            to="/mock-tests" 
            class="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Award class="w-3.5 h-3.5" />
            <span>Take HSK {{ currentLevel }} Mock Exam</span>
          </router-link>

          <router-link 
            to="/calculator" 
            class="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Score Calculator</span>
          </router-link>
        </div>
      </div>

      <!-- Exam Verified Specifications Grid -->
      <div class="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div class="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800">
          <div class="text-stone-400 dark:text-stone-400 font-medium">Exam Sections</div>
          <div class="font-bold text-stone-900 dark:text-stone-100 mt-0.5">{{ levelMeta.sections }}</div>
        </div>
        <div class="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800">
          <div class="text-stone-400 dark:text-stone-400 font-medium">Exam Duration</div>
          <div class="font-bold text-stone-900 dark:text-stone-100 mt-0.5">{{ levelMeta.duration }}</div>
        </div>
        <div class="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800">
          <div class="text-stone-400 dark:text-stone-400 font-medium">Passing Threshold</div>
          <div class="font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">{{ levelMeta.passMark }}</div>
        </div>
        <div class="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800">
          <div class="text-stone-400 dark:text-stone-400 font-medium">Vocab Requirement</div>
          <div class="font-bold text-stone-900 dark:text-stone-100 mt-0.5">{{ vocabList.length }} Available Words</div>
        </div>
      </div>

      <!-- Level Learning Progress Bar -->
      <div class="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800 space-y-2">
        <div class="flex items-center justify-between text-xs font-bold">
          <span class="text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
            <Sparkles class="w-4 h-4 text-amber-500" />
            <span>Your HSK {{ currentLevel }} Mastery Progress</span>
          </span>
          <span class="text-stone-900 dark:text-stone-100">
            {{ levelLearnedCount }} / {{ vocabList.length }} words learned ({{ levelProgressPercent }}%)
          </span>
        </div>
        <div class="w-full h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-500"
            :class="currentLevel === 1 ? 'bg-emerald-500' : (currentLevel === 2 ? 'bg-sky-500' : 'bg-rose-500')"
            :style="{ width: `${levelProgressPercent}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Beginner Welcome & Orientation Banner for HSK 1 -->
    <div v-if="currentLevel === 1" class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-amber-500/5 to-teal-500/10 dark:from-stone-900 dark:to-stone-900 border-2 border-emerald-300 dark:border-emerald-800 space-y-4 shadow-sm animate-in fade-in">
      <div class="flex items-center gap-2 text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
        <Sparkles class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span>Beginner Roadmap · 150 Words Only!</span>
      </div>
      <h3 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
        🌱 First Time Studying Mandarin? You Can Easily Pass HSK 1.
      </h3>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl">
        HSK 1 requires only <strong>150 vocabulary words</strong>. That's just <strong>5 words a day for 30 days</strong>! Pinyin tone marks are displayed on every word, and you can listen to native audio at normal or slow turtle speed (🐢). Click the checkmark on each word as you learn it to watch your progress bar fill up.
      </p>

      <div class="flex flex-wrap items-center gap-4 text-xs font-semibold pt-1">
        <span class="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
          <CheckCircle2 class="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 100% Free & No Login Needed
        </span>
        <span class="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
          <CheckCircle2 class="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Click 🐢 for Slow Audio
        </span>
        <span class="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
          <CheckCircle2 class="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Colored Pinyin Tones
        </span>
      </div>
    </div>

    <!-- Related Lessons & Grammar Cards Preview -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Lessons for this level -->
      <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 shadow-xs flex flex-col justify-between transition-all">
        <div>
          <div class="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
            <h3 class="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BookOpen class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Interactive Lessons</span>
            </h3>
            <span class="text-xs text-stone-400 dark:text-stone-500">{{ lessonsList.length }} Lessons</span>
          </div>

          <div class="mt-4 space-y-2">
            <router-link 
              v-for="lesson in lessonsList" 
              :key="lesson.id"
              :to="'/lessons/' + lesson.slug"
              class="block p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/80 transition-colors border border-stone-100 dark:border-stone-800 group"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{{ lesson.title }}</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 shrink-0">Unit {{ lesson.id }}</span>
              </div>
              <div class="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">{{ lesson.description }}</div>
            </router-link>
          </div>
        </div>

        <div class="pt-4 mt-2">
          <router-link to="/lessons" class="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1">
            <span>View all 30 curriculum units</span> <ArrowRight class="w-3 h-3" />
          </router-link>
        </div>
      </div>

      <!-- Grammar for this level -->
      <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 shadow-xs flex flex-col justify-between transition-all">
        <div>
          <div class="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
            <h3 class="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <FileText class="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Key Grammar Structures</span>
            </h3>
            <span class="text-xs text-stone-400 dark:text-stone-500">{{ grammarList.length }} Topics</span>
          </div>

          <div class="mt-4 space-y-2">
            <router-link 
              v-for="g in grammarList" 
              :key="g.id"
              to="/grammar"
              class="block p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/80 transition-colors border border-stone-100 dark:border-stone-800"
            >
              <div class="text-xs font-bold text-stone-800 dark:text-stone-200">{{ g.title }}</div>
              <div class="text-[11px] font-mono text-rose-700 dark:text-rose-400 mt-0.5">{{ g.pattern }}</div>
            </router-link>
          </div>
        </div>

        <div class="pt-4 mt-2">
          <router-link to="/grammar" class="text-xs font-bold text-sky-700 dark:text-sky-400 hover:underline flex items-center gap-1">
            <span>View all grammar guides</span> <ArrowRight class="w-3 h-3" />
          </router-link>
        </div>
      </div>

    </div>

    <!-- Recommended Study Guides for this level -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <BookOpen class="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <span>Recommended HSK {{ currentLevel }} Masterclasses & Study Guides</span>
          </h2>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1">
            In-depth academic guides, tactical exam blueprints, and grammar breakdowns for HSK {{ currentLevel }}.
          </p>
        </div>
        <router-link to="/guides" class="text-xs font-bold text-rose-600 hover:text-rose-800 dark:text-rose-400 flex items-center gap-1 shrink-0">
          <span>All 18 Masterclasses</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link
          v-for="guide in recommendedGuides"
          :key="guide.slug"
          :to="'/guides/' + guide.slug"
          class="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div class="space-y-2">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 uppercase">
              {{ guide.tag }}
            </span>
            <h3 class="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
              {{ guide.title }}
            </h3>
          </div>
          <div class="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400 dark:text-stone-500">
            <span>{{ guide.readTime }}</span>
            <span class="text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              Read <ArrowRight class="w-3 h-3" />
            </span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Quick Facts & Official Specifications (Featured Snippet Position #0 Optimization) -->
    <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 space-y-5 shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <Info class="w-4 h-4" />
            <span>Official Syllabus Reference</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 mt-1">
            HSK {{ currentLevel }} Quick Facts &amp; Passing Requirements
          </h2>
        </div>
        <div class="text-xs text-stone-500 dark:text-stone-400">
          Aligned with Chinese Testing International (CTI) &amp; CLEC Standards
        </div>
      </div>

      <!-- Quick Facts Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="bg-stone-50 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 uppercase font-bold text-[11px]">
              <th class="py-2.5 px-4 font-bold">Examination Metric</th>
              <th class="py-2.5 px-4 font-bold">HSK {{ currentLevel }} Requirement</th>
              <th class="py-2.5 px-4 font-bold">Official Examination Notes</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 dark:divide-stone-800">
            <tr v-for="(fact, fIdx) in quickFacts" :key="fIdx" class="hover:bg-stone-50/60 dark:hover:bg-stone-800/40">
              <td class="py-3 px-4 font-bold text-stone-900 dark:text-stone-100 whitespace-nowrap">{{ fact.metric }}</td>
              <td class="py-3 px-4 font-semibold text-rose-600 dark:text-rose-400 whitespace-nowrap">{{ fact.requirement }}</td>
              <td class="py-3 px-4 text-stone-600 dark:text-stone-300">{{ fact.notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Free Printable HSK Vocabulary List & PDF Download Guide Section -->
    <div class="bg-gradient-to-br from-white via-rose-50/20 to-amber-50/20 dark:from-stone-900 dark:to-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 space-y-6 shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-1 max-w-2xl">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-bold">
            <FileDown class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Printable Educational Resources</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
            Free Printable HSK {{ currentLevel }} Vocabulary List (PDF Download)
          </h2>
          <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Need a clean, multi-page paper study sheet for classroom teaching, offline handwriting practice, or daily desk revision? You can print or save the complete official HSK {{ currentLevel }} ({{ vocabList.length }} words) syllabus directly from your browser in 1 click.
          </p>
        </div>

        <button 
          type="button"
          @click="handlePrint"
          class="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md shrink-0 self-start sm:self-center"
        >
          <Printer class="w-4 h-4" />
          <span>🖨️ Print / Save as PDF Cheat Sheet</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div class="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700/70 space-y-1.5 text-xs">
          <div class="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span class="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-[11px]">1</span>
            <span>Zero Watermarks or Paywalls</span>
          </div>
          <p class="text-stone-600 dark:text-stone-400 leading-relaxed">
            Unlike other sites that lock vocabulary sheets behind email opt-ins, HSK Free Lab outputs pure, clean PDF tables with Hanzi, Pinyin tones, and English meanings.
          </p>
        </div>

        <div class="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700/70 space-y-1.5 text-xs">
          <div class="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span class="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-[11px]">2</span>
            <span>Teacher &amp; Classroom Ready</span>
          </div>
          <p class="text-stone-600 dark:text-stone-400 leading-relaxed">
            Includes blank pencil checkboxes ([ ]) next to each word. Perfect for Chinese language educators distributing homework checklists and weekly quizzes.
          </p>
        </div>

        <div class="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700/70 space-y-1.5 text-xs">
          <div class="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span class="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-[11px]">3</span>
            <span>How to Save as PDF</span>
          </div>
          <p class="text-stone-600 dark:text-stone-400 leading-relaxed">
            Click the print button or press <kbd class="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-700 border text-[10px] font-mono">Ctrl+P</kbd> (<kbd class="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-700 border text-[10px] font-mono">Cmd+P</kbd>), change destination to <strong>"Save as PDF"</strong>, and click Save.
          </p>
        </div>
      </div>
    </div>

    <!-- Full Interactive Vocabulary Browser -->
    <div class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 class="text-2xl font-black text-stone-900 dark:text-stone-100">
            HSK {{ currentLevel }} Vocabulary Deck
          </h2>
          <p class="text-xs text-stone-500 dark:text-stone-400">
            Full word list with pronunciation audio, stroke animation, and flashcard practice mode.
          </p>
        </div>
        <router-link 
          to="/words" 
          class="text-xs font-bold text-rose-600 hover:text-rose-800 dark:text-rose-400 flex items-center gap-1 shrink-0"
        >
          <span>All 603 Words Directory</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </router-link>
      </div>

      <VocabTable ref="vocabTableRef" :vocabList="vocabList" :level="currentLevel" />
    </div>

    <!-- Frequently Asked Questions (FAQ) Section with Rich Snippet & Accordion UX -->
    <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-10 space-y-6 shadow-xs">
      <div class="space-y-2 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div class="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
          <HelpCircle class="w-4 h-4" />
          <span>Examinations Knowledgebase</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
          Frequently Asked Questions About HSK {{ currentLevel }}
        </h2>
        <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Everything you need to know about passing thresholds, vocabulary limits, audio formats, and preparation timelines.
        </p>
      </div>

      <div class="space-y-3">
        <div 
          v-for="(faq, fIdx) in faqs" 
          :key="fIdx"
          class="rounded-2xl border border-stone-200/80 dark:border-stone-800 overflow-hidden transition-all"
          :class="openFaqIndex === fIdx ? 'bg-stone-50/80 dark:bg-stone-800/40 border-stone-300 dark:border-stone-700' : 'bg-white dark:bg-stone-900'"
        >
          <button 
            type="button"
            @click="toggleFaq(fIdx)"
            class="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <span>{{ faq.question }}</span>
            <ChevronDown 
              class="w-4 h-4 shrink-0 transition-transform duration-200 text-stone-400"
              :class="{ 'rotate-180 text-rose-600 dark:text-rose-400': openFaqIndex === fIdx }"
            />
          </button>
          <div 
            v-if="openFaqIndex === fIdx"
            class="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800/80 pt-3"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
