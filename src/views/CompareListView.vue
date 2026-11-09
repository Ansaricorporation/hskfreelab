<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  GitCompare, 
  Search, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown,
  BookOpen,
  Compass
} from 'lucide-vue-next';
import { comparisonsData, type ComparisonItem } from '../data/comparisons';
import { updateSeoMeta } from '../utils/seo';

updateSeoMeta({
  title: 'Confusing Chinese Words Compared - 15 Essential Mandarin Distinctions | HSK Free Lab',
  description: 'Master tricky Chinese word pairs with clear side-by-side comparison tables: 不 vs. 没, 二 vs. 两, 的 vs. 得 vs. 地, 会 vs. 能 vs. 可以. Includes correct vs. wrong sentences and quizzes.',
  canonical: 'https://mybwn.com/compare',
  type: 'website'
});

const searchQuery = ref('');
const selectedLevel = ref<string>('all');

const counts = computed(() => {
  return {
    all: comparisonsData.length,
    hsk1: comparisonsData.filter(c => c.level.includes('1')).length,
    hsk2: comparisonsData.filter(c => c.level.includes('2')).length,
    hsk3: comparisonsData.filter(c => c.level.includes('3')).length
  };
});

const filteredComparisons = computed(() => {
  let list = comparisonsData;
  if (selectedLevel.value !== 'all') {
    list = list.filter(c => c.level.includes(selectedLevel.value));
  }
  const q = searchQuery.value.trim().toLowerCase();
  if (q) {
    list = list.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.shortTitle.toLowerCase().includes(q) ||
      c.searchIntent.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      c.words.some(w => w.hanzi.includes(q) || w.pinyin.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q))
    );
  }
  return list;
});

const faqItems = [
  {
    q: 'Why are these Chinese word pairs so confusing for beginners?',
    a: 'English often uses a single word (like "can", "know", "again", or "see") where Mandarin Chinese makes precise distinctions based on aspect, result, intentionality, or grammatical category. For instance, "can" splits into learned skill (会), physical ability (能), and permission (可以).'
  },
  {
    q: 'How should I study these comparison guides?',
    a: 'Start by memorizing the one-sentence core difference at the top of each page. Then review the side-by-side table, inspect the Correct vs. Wrong (✅ vs. ❌) sentence traps, and test your retention with the 3-question interactive quiz.'
  },
  {
    q: 'Are these distinctions tested on official HSK exams?',
    a: 'Yes! Examiners deliberately design reading comprehension, sentence completion, and error-identification questions around these exact traps—especially 不 vs. 没, 的 vs. 得 vs. 地, and separable verbs like 帮忙.'
  }
];

const openFaqIndex = ref<number | null>(null);
function toggleFaq(index: number) {
  openFaqIndex.value = openFaqIndex.value === index ? null : index;
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 pb-24">
    
    <!-- Breadcrumbs -->
    <nav class="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2">
      <router-link to="/" class="hover:underline">Home</router-link>
      <span>&gt;</span>
      <span class="text-stone-800 dark:text-stone-200 font-semibold">Chinese Word Comparisons</span>
    </nav>

    <!-- Hero Header -->
    <header class="space-y-4 max-w-3xl">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold">
        <GitCompare class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
        <span>Position #0 Comparison Compendium · 15 High-Search Pairs</span>
      </div>

      <h1 class="text-3xl sm:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
        Confusing Chinese Words &amp; Grammar Compared
      </h1>
      <p class="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
        Stop mixing up tricky Mandarin pairs. Explore side-by-side contrast tables, practical examples with native audio, common exam traps (<span class="text-emerald-600 font-bold">✅</span> vs. <span class="text-rose-600 font-bold">❌</span>), and diagnostic quizzes for the 15 most searched Chinese beginner questions.
      </p>
    </header>

    <!-- Search & Filter Controls -->
    <div class="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs">
      <!-- Search Input -->
      <div class="relative flex-1">
        <Search class="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Search by Hanzi (不, 没), pinyin, or meaning (can, know, again)..."
          class="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
        />
      </div>

      <!-- Level Filter Buttons -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        <button 
          @click="selectedLevel = 'all'"
          :class="[
            'px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
            selectedLevel === 'all'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          ]"
        >
          All ({{ counts.all }})
        </button>
        <button 
          @click="selectedLevel = '1'"
          :class="[
            'px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
            selectedLevel === '1'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
          ]"
        >
          HSK 1 ({{ counts.hsk1 }})
        </button>
        <button 
          @click="selectedLevel = '2'"
          :class="[
            'px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
            selectedLevel === '2'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-sky-100'
          ]"
        >
          HSK 2 ({{ counts.hsk2 }})
        </button>
        <button 
          @click="selectedLevel = '3'"
          :class="[
            'px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
            selectedLevel === '3'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
          ]"
        >
          HSK 3 ({{ counts.hsk3 }})
        </button>
      </div>
    </div>

    <!-- Comparisons Grid -->
    <div v-if="filteredComparisons.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link 
        v-for="item in filteredComparisons" 
        :key="item.slug"
        :to="`/compare/${item.slug}`"
        class="group flex flex-col justify-between p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-lg transition-all duration-200"
      >
        <div class="space-y-4">
          <!-- Top Badges -->
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              {{ item.level }} · CEFR {{ item.cefr }}
            </span>
            <span class="text-[11px] font-semibold text-stone-400 group-hover:text-amber-600 transition-colors flex items-center gap-1">
              Read Guide <ArrowRight class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>

          <!-- Hanzi Contrast Centerpiece -->
          <div class="flex items-center gap-3 pt-1">
            <div 
              v-for="(w, idx) in item.words" 
              :key="idx"
              class="flex-1 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 text-center"
            >
              <div class="text-2xl font-black text-stone-900 dark:text-stone-100 font-serif">
                {{ w.hanzi }}
              </div>
              <div class="text-xs font-bold text-amber-700 dark:text-amber-400">
                {{ w.pinyin }}
              </div>
              <div class="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                {{ w.meaning }}
              </div>
            </div>
          </div>

          <!-- Title -->
          <h2 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
            {{ item.title }}
          </h2>

          <!-- Snippet Summary -->
          <p class="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
            {{ item.summary }}
          </p>
        </div>

        <!-- Footer Card Meta -->
        <div class="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>3-Question Practice Quiz</span>
          <span class="font-bold text-amber-600 dark:text-amber-400 group-hover:underline">Compare Rules &rarr;</span>
        </div>
      </router-link>
    </div>

    <!-- Empty Search State -->
    <div v-else class="text-center py-16 space-y-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
      <div class="w-12 h-12 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
        <Search class="w-6 h-6" />
      </div>
      <h3 class="text-base font-bold text-stone-900 dark:text-stone-100">No matching comparison guides found</h3>
      <p class="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
        Try searching for words like "bu", "mei", "de", "can", "know", "again", or reset the filter.
      </p>
      <button 
        @click="searchQuery = ''; selectedLevel = 'all'"
        class="text-xs font-bold px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
      >
        Clear Filters
      </button>
    </div>

    <!-- FAQ Section for SEO -->
    <section class="max-w-4xl mx-auto space-y-6 pt-10 border-t border-stone-200 dark:border-stone-800">
      <div class="flex items-center gap-2">
        <HelpCircle class="w-5 h-5 text-amber-600" />
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">Frequently Asked Questions</h2>
      </div>

      <div class="space-y-3">
        <div 
          v-for="(faq, idx) in faqItems" 
          :key="idx"
          class="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden"
        >
          <button 
            @click="toggleFaq(idx)"
            class="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 hover:text-amber-600 transition-colors"
          >
            <span>{{ faq.q }}</span>
            <ChevronDown 
              :class="['w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0', openFaqIndex === idx ? 'rotate-180' : '']" 
            />
          </button>
          <div 
            v-if="openFaqIndex === idx"
            class="px-5 pb-5 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-3"
          >
            {{ faq.a }}
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
