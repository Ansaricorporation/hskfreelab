<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { 
  FileText, 
  Sparkles, 
  AlertTriangle, 
  Lightbulb, 
  Volume2, 
  Search, 
  ArrowRight, 
  BookOpen,
  CheckCircle2,
  Printer,
  HelpCircle,
  ChevronDown,
  FileDown
} from 'lucide-vue-next';
import { all88GrammarRules, type EnrichedGrammarRule } from '../data/grammar-helpers.ts';
import { playAudio } from '../utils/speech';
import LevelBadge from '../components/ui/LevelBadge.vue';
import { updateSeoMeta } from '../utils/seo';

const selectedLevel = ref<number | 'all'>('all');
const searchQuery = ref('');

const allGrammar = all88GrammarRules;

function handlePrintGrammar() {
  window.print();
}

const counts = computed(() => {
  return {
    all: allGrammar.length,
    hsk1: allGrammar.filter(g => g.level === 1).length,
    hsk2: allGrammar.filter(g => g.level === 2).length,
    hsk3: allGrammar.filter(g => g.level === 3).length
  };
});

const filteredGrammar = computed(() => {
  let list = allGrammar;
  if (selectedLevel.value !== 'all') {
    list = list.filter(g => g.level === selectedLevel.value);
  }
  const q = searchQuery.value.trim().toLowerCase();
  if (q) {
    list = list.filter(g => 
      g.title.toLowerCase().includes(q) ||
      g.pattern.toLowerCase().includes(q) ||
      g.explanation.toLowerCase().includes(q) ||
      g.examples.some(e => e.zh.includes(q) || e.py.toLowerCase().includes(q) || e.en.toLowerCase().includes(q))
    );
  }
  return list;
});

interface FaqItem {
  question: string;
  answer: string;
}

const grammarFaqs: FaqItem[] = [
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

const openFaqIndex = ref<number | null>(0);
function toggleFaq(idx: number) {
  openFaqIndex.value = openFaqIndex.value === idx ? null : idx;
}

function applyGrammarSeo() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': grammarFaqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  const resourceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    'name': 'HSK 1-3 Complete 88-Rule Grammar Compendium',
    'url': 'https://mybwn.com/grammar',
    'isAccessibleForFree': true,
    'description': 'Comprehensive 88-rule Mandarin grammar compendium for HSK 1, 2, and 3 with formula patterns, clear explanations, authentic example sentences, and direct lesson links.'
  };

  updateSeoMeta({
    title: 'Essential HSK 1-3 Grammar Compendium (88 Rules & Patterns) | HSK Free Lab',
    description: 'Comprehensive 88-rule Mandarin grammar compendium for HSK 1, 2, and 3 with formula patterns, clear explanations, authentic example sentences, and direct lesson links.',
    canonical: 'https://mybwn.com/grammar',
    jsonLd: [resourceSchema, faqSchema]
  }, '/grammar');
}

onMounted(() => {
  applyGrammarSeo();
});
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-10 pb-20 px-4">
    <!-- Print-Only Page Header -->
    <div class="print-only mb-6 pb-4 border-b-2 border-stone-800">
      <div class="flex items-center justify-between">
        <div>
          <div class="font-bold text-xs uppercase tracking-wider text-stone-500">mybwn.com — HSK Free Lab · Open Educational Resource</div>
          <h1 class="text-2xl font-black text-stone-900 mt-1">
            HSK 1–3 Chinese Grammar Formulas Cheat Sheet (88 Rules)
          </h1>
          <p class="text-xs text-stone-600 mt-0.5">
            Level: HSK 1, 2 &amp; 3 · Sentence Patterns, Particles &amp; Structures
          </p>
        </div>
        <div class="text-right text-xs text-stone-500">
          <span class="font-bold text-stone-800">100% Free · No Paywall</span><br />
          <span>https://mybwn.com/grammar</span>
        </div>
      </div>
    </div>

    <!-- Header (Boxed Card) -->
    <header class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-10 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs font-semibold">
        <FileText class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
        <span>Comprehensive Grammar Compendium</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
        Complete 88-Rule HSK Grammar Syllabus
      </h1>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
        The definitive compendium of all 88 essential sentence structures, function words, disposal patterns, and comparative formulas for HSK 1, 2, and 3.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button 
          type="button"
          @click="handlePrintGrammar" 
          class="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          title="Print or Save as PDF Grammar Cheat Sheet"
        >
          <Printer class="w-3.5 h-3.5" />
          <span>Print / Save as PDF Cheat Sheet</span>
        </button>
      </div>
    </header>

    <!-- Free Printable HSK Grammar Cheat Sheet Guide Section -->
    <div class="bg-gradient-to-br from-white via-sky-50/20 to-indigo-50/20 dark:from-stone-900 dark:to-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 space-y-4 shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-1 max-w-2xl">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs font-bold">
            <FileDown class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Printable Study Packet</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
            Free Printable HSK Grammar Cheat Sheet (PDF Download)
          </h2>
          <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Need an offline syntax reference sheet for classroom teaching, exam revision, or desktop quick lookup? Print or export all 88 essential sentence structures, function words (把, 被, 了, 过), and comparative patterns directly from your browser.
          </p>
        </div>

        <button 
          type="button"
          @click="handlePrintGrammar"
          class="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md shrink-0 self-start sm:self-center"
        >
          <Printer class="w-4 h-4" />
          <span>🖨️ Print Grammar Sheet</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
        <div class="p-3.5 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700/70 space-y-1">
          <div class="font-bold text-stone-900 dark:text-stone-100">Filter by Level First</div>
          <p class="text-stone-600 dark:text-stone-400">Click HSK 1, 2, or 3 below to print only the rules for your current test level, or choose All to export the full compendium.</p>
        </div>
        <div class="p-3.5 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700/70 space-y-1">
          <div class="font-bold text-stone-900 dark:text-stone-100">Clean Multi-Page Layout</div>
          <p class="text-stone-600 dark:text-stone-400">The print layout cleanly formats formulas, explanations, and bilingual examples while hiding website navigation and search bars.</p>
        </div>
        <div class="p-3.5 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700/70 space-y-1">
          <div class="font-bold text-stone-900 dark:text-stone-100">How to Save as PDF</div>
          <p class="text-stone-600 dark:text-stone-400">Press Ctrl+P (Cmd+P) &rarr; Set Destination to "Save as PDF" &rarr; Save for offline use.</p>
        </div>
      </div>
    </div>

    <!-- Search & Filter Controls -->
    <div class="space-y-4 max-w-xl mx-auto">
      <!-- Search Input -->
      <div class="relative">
        <Search class="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search by rule, particle (把, 过, 比, 吗), or keyword..."
          class="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
        />
      </div>

      <!-- Level Filter Pills -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <button 
          type="button"
          @click="selectedLevel = 'all'"
          :class="[
            'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-xs',
            selectedLevel === 'all' 
              ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold' 
              : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
          ]"
        >
          All ({{ counts.all }})
        </button>
        <button 
          v-for="lvl in [1, 2, 3]" 
          :key="lvl"
          type="button"
          @click="selectedLevel = lvl"
          :class="[
            'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-xs',
            selectedLevel === lvl 
              ? lvl === 1 ? 'bg-emerald-600 text-white' : lvl === 2 ? 'bg-sky-600 text-white' : 'bg-rose-600 text-white'
              : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
          ]"
        >
          HSK {{ lvl }} ({{ lvl === 1 ? counts.hsk1 : lvl === 2 ? counts.hsk2 : counts.hsk3 }})
        </button>
      </div>
    </div>

    <!-- Results Meta -->
    <div class="text-xs text-stone-500 dark:text-stone-400 text-center font-medium">
      Showing {{ filteredGrammar.length }} of 88 grammar points
      <span v-if="searchQuery">matching "{{ searchQuery }}"</span>
    </div>

    <!-- Grammar Cards List -->
    <div class="space-y-6">
      <div 
        v-for="item in filteredGrammar" 
        :key="item.id"
        class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-md p-6 sm:p-8 space-y-5 transition-all"
      >
        <!-- Card Header -->
        <div class="flex items-start justify-between gap-4 pb-3 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span 
                :class="[
                  'text-[10px] font-bold px-2 py-0.5 rounded-md border',
                  item.level === 1 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300' 
                    : item.level === 2 
                    ? 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950 dark:text-sky-300' 
                    : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300'
                ]"
              >
                HSK {{ item.level }}
              </span>
              <span class="text-xs text-stone-400 dark:text-stone-500 font-mono">{{ item.id }}</span>
            </div>
            <h2 class="text-lg sm:text-2xl font-black text-stone-900 dark:text-stone-100">
              <router-link :to="`/grammar/${item.slug}`" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                {{ item.title }}
              </router-link>
            </h2>
          </div>
        </div>

        <!-- Pattern Formula Box -->
        <div class="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700">
          <div class="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Sentence Pattern Formula:</div>
          <div class="font-mono text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">{{ item.pattern }}</div>
        </div>

        <!-- Explanation -->
        <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {{ item.explanation }}
        </p>

        <!-- Practical Examples with Audio -->
        <div v-if="item.examples && item.examples.length > 0" class="space-y-2 pt-1">
          <div class="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Example Sentences:</div>
          <div 
            v-for="(ex, exIdx) in item.examples" 
            :key="exIdx"
            class="p-3 rounded-xl bg-stone-50/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between gap-3 text-xs"
          >
            <div class="space-y-0.5">
              <div class="font-serif font-black text-sm text-stone-900 dark:text-stone-100">{{ ex.zh }}</div>
              <div class="font-medium text-rose-600 dark:text-rose-400 text-[11px]">{{ ex.py }}</div>
              <div class="text-stone-500 dark:text-stone-400 text-[11px]">{{ ex.en }}</div>
            </div>
            <button
              type="button"
              @click="playAudio(ex.zh, 0.85)"
              class="w-7 h-7 rounded-lg bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:text-rose-600 flex items-center justify-center transition-colors shadow-2xs shrink-0"
              :aria-label="`Listen to: ${ex.zh}`"
            >
              <Volume2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- Common Mistake Warning -->
        <div v-if="item.commonMistakes && item.commonMistakes.length > 0" class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
          <AlertTriangle class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Common Pitfall:</strong> {{ item.commonMistakes[0] }}
          </div>
        </div>

        <!-- Card Footer: Internal Link to Full Rule and Parent Lesson -->
        <div class="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between flex-wrap gap-2 text-xs">
          <router-link 
            :to="`/grammar/${item.slug}`" 
            class="font-black text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 group"
          >
            <span>Full Grammar Guide & Quiz</span>
            <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </router-link>

          <router-link 
            v-if="item.parentLessonSlug"
            :to="`/lessons/${item.parentLessonSlug}`" 
            class="font-semibold text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:underline flex items-center gap-1"
          >
            <span>Lesson Context: {{ item.parentLessonTitle }} &rarr;</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Frequently Asked Questions (FAQ) Section for Grammar -->
    <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-10 space-y-6 shadow-xs">
      <div class="space-y-2 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div class="flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
          <HelpCircle class="w-4 h-4" />
          <span>Grammar Knowledgebase</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
          Frequently Asked Questions About HSK Grammar
        </h2>
        <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Key insights into sentence structure formulas, tricky grammatical particles, and printable cheat sheet downloads.
        </p>
      </div>

      <div class="space-y-3">
        <div 
          v-for="(faq, fIdx) in grammarFaqs" 
          :key="fIdx"
          class="rounded-2xl border border-stone-200/80 dark:border-stone-800 overflow-hidden transition-all"
          :class="openFaqIndex === fIdx ? 'bg-stone-50/80 dark:bg-stone-800/40 border-stone-300 dark:border-stone-700' : 'bg-white dark:bg-stone-900'"
        >
          <button 
            type="button"
            @click="toggleFaq(fIdx)"
            class="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            <span>{{ faq.question }}</span>
            <ChevronDown 
              class="w-4 h-4 shrink-0 transition-transform duration-200 text-stone-400"
              :class="{ 'rotate-180 text-sky-600 dark:text-sky-400': openFaqIndex === fIdx }"
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
