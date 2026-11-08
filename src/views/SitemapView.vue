<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  BookOpen, 
  Award, 
  PenTool, 
  Calculator, 
  Volume2, 
  Compass, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  FileText
} from 'lucide-vue-next';
import { lessonsData } from '../data/lessons';
import { blogPostsData } from '../data/blogs';
import { getLessonUnitNumber } from '../data/lesson-helpers';
import { allVocabWithSlugs } from '../data/vocab-helpers';
import { all88GrammarRules } from '../data/grammar-helpers';
import { updateSeoMeta } from '../utils/seo';

updateSeoMeta({
  title: 'HTML Sitemap & All-Pages Directory (759 Pages) | HSK Free Lab',
  description: 'Complete index of all 759 pages on HSK Free Lab: 603 dedicated word study guides, 88 dedicated grammar guides, 30 interactive lessons, 18 study guides, and diagnostic tools.',
  canonical: 'https://mybwn.com/sitemap',
  type: 'website'
});

const hsk1Lessons = computed(() => lessonsData.filter(l => l.level === 1));
const hsk2Lessons = computed(() => lessonsData.filter(l => l.level === 2));
const hsk3Lessons = computed(() => lessonsData.filter(l => l.level === 3));

const hsk1Grammar = computed(() => all88GrammarRules.filter(g => g.level === 1));
const hsk2Grammar = computed(() => all88GrammarRules.filter(g => g.level === 2));
const hsk3Grammar = computed(() => all88GrammarRules.filter(g => g.level === 3));
const sitemapGrammarTab = ref<1 | 2 | 3>(1);

const hsk1Words = computed(() => allVocabWithSlugs.filter(w => w.level === 1));
const hsk2Words = computed(() => allVocabWithSlugs.filter(w => w.level === 2));
const hsk3Words = computed(() => allVocabWithSlugs.filter(w => w.level === 3));
const sitemapWordTab = ref<1 | 2 | 3>(1);
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 pb-20">
    
    <!-- Breadcrumb & Header -->
    <header class="space-y-4 max-w-3xl">
      <nav class="text-xs text-stone-500 flex items-center gap-2">
        <router-link to="/" class="hover:underline">Home</router-link> &gt;
        <span class="text-stone-800 dark:text-stone-200 font-semibold">HTML Sitemap</span>
      </nav>
      
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-bold">
        <Sparkles class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
        <span>Complete Index · 759 Canonical Pages</span>
      </div>

      <h1 class="text-3xl sm:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
        HTML Sitemap &amp; All-Pages Directory
      </h1>
      <p class="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
        A direct index of all resources, level hubs, 30 curriculum units, 88 grammar rules, 18 masterclasses, and diagnostic tools on HSK Free Lab.
      </p>
    </header>

    <!-- SECTION 1: Core Hubs & Curricula -->
    <section class="space-y-4">
      <div class="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        <Compass class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">HSK Preparation Hubs &amp; Core References</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link to="/" class="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group block shadow-xs">
          <span class="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Main Platform</span>
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 mt-1">Homepage</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">Overview of free resources, beginner roadmap, and progress tracking.</p>
        </router-link>

        <router-link to="/hsk-1" class="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group block shadow-xs">
          <span class="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">HSK 1 · CEFR A1</span>
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 mt-1">HSK 1 Preparation Hub</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">150 foundation words, listening drills, tone audio, and syllabus specifications.</p>
        </router-link>

        <router-link to="/hsk-2" class="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-sky-300 dark:hover:border-sky-700 transition-all group block shadow-xs">
          <span class="text-[10px] font-bold uppercase text-sky-600 dark:text-sky-400">HSK 2 · CEFR A2</span>
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-700 dark:group-hover:text-sky-400 mt-1">HSK 2 Preparation Hub</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">300 cumulative words, elementary dialogue drills, and score thresholds.</p>
        </router-link>

        <router-link to="/hsk-3" class="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700 transition-all group block shadow-xs">
          <span class="text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400">HSK 3 · CEFR B1</span>
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 mt-1">HSK 3 Preparation Hub</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">600 cumulative words, intermediate reading passages, and writing guides.</p>
        </router-link>
      </div>
    </section>

    <!-- SECTION 2: Diagnostic & Study Tools -->
    <section class="space-y-4">
      <div class="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        <Calculator class="w-5 h-5 text-amber-600 dark:text-amber-400" />
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">Interactive Diagnostic &amp; Practice Tools</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link to="/calculator" class="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-700 transition-all group block shadow-xs">
          <span class="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">Score Calculator</span>
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 mt-1">HSK Score Calculator</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">Calculate pass/fail margins, CEFR benchmarks, and section recommendations.</p>
        </router-link>

        <router-link to="/pinyin-trainer" class="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all group block shadow-xs">
          <span class="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">Phonetics</span>
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 mt-1">Pinyin Tone Trainer</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">Interactive 4-tone audio soundboard, initials/finals, and ear-training quiz.</p>
        </router-link>

        <router-link to="/stroke-order" class="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700 transition-all group block shadow-xs">
          <span class="text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400">Character Studio</span>
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 mt-1">Stroke Order Animator</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">Step-by-step Hanzi Writer animations, handwriting quiz mode, and radicals.</p>
        </router-link>

        <router-link to="/mock-tests" class="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all group block shadow-xs">
          <span class="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400">Simulations</span>
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-purple-700 dark:group-hover:text-purple-400 mt-1">30 Timed Mock Tests</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">10 test gates per level with listening audio dialogue player and scoring.</p>
        </router-link>
      </div>
    </section>

    <!-- SECTION 3: Curriculum Directories -->
    <section class="space-y-4">
      <div class="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        <GraduationCap class="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">Curriculum Directories &amp; Compendiums</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <router-link to="/words" class="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group block shadow-xs">
          <span class="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Lexicon Directory</span>
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 mt-1">603 Words Dictionary</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">Complete HSK 1-3 dictionary with stroke order animations, audio, and quiz.</p>
        </router-link>

        <router-link to="/lessons" class="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group block shadow-xs">
          <span class="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Sequential Course</span>
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 mt-1">30 Interactive Lessons</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">Master curriculum overview across HSK 1, 2, and 3 with progress indicators.</p>
        </router-link>

        <router-link to="/grammar" class="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700 transition-all group block shadow-xs">
          <span class="text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400">Grammar Database</span>
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 mt-1">88-Rule Grammar Compendium</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">Formula structures, explanations, common pitfalls, and lesson practice links.</p>
        </router-link>

        <router-link to="/guides" class="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-700 transition-all group block shadow-xs">
          <span class="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">Academic Guides</span>
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 mt-1">18 Study Masterclasses</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">29,000+ words of research-backed study plans, stroke anatomy, and exam tactics.</p>
        </router-link>

        <router-link to="/hsk-history" class="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group block shadow-xs">
          <span class="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400">Linguistics</span>
          <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 mt-1">HSK History &amp; 3.0 Standards</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">The evolution of Chinese testing from 1984 BLCU to 2.0 and the 9-band 3.0 system.</p>
        </router-link>
      </div>
    </section>

    <!-- SECTION 4: All 30 Interactive Lessons -->
    <section class="space-y-6">
      <div class="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        <BookOpen class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">All 30 Dedicated Interactive Lessons</h2>
      </div>

      <!-- HSK 1 Lessons -->
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-xs">
            HSK Level 1 · Units 1–10
          </span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <router-link 
            v-for="l in hsk1Lessons" 
            :key="l.slug" 
            :to="'/lessons/' + l.slug"
            class="p-3.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 group block transition-colors"
          >
            <div class="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">Unit {{ getLessonUnitNumber(l.slug) }}</div>
            <div class="font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 line-clamp-1 mt-0.5">{{ l.title }}</div>
          </router-link>
        </div>
      </div>

      <!-- HSK 2 Lessons -->
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800 font-bold text-xs">
            HSK Level 2 · Units 11–20
          </span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <router-link 
            v-for="l in hsk2Lessons" 
            :key="l.slug" 
            :to="'/lessons/' + l.slug"
            class="p-3.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-sky-300 dark:hover:border-sky-700 group block transition-colors"
          >
            <div class="text-[10px] font-bold text-sky-700 dark:text-sky-400 uppercase">Unit {{ getLessonUnitNumber(l.slug) }}</div>
            <div class="font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-700 dark:group-hover:text-sky-400 line-clamp-1 mt-0.5">{{ l.title }}</div>
          </router-link>
        </div>
      </div>

      <!-- HSK 3 Lessons -->
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-bold text-xs">
            HSK Level 3 · Units 21–30
          </span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <router-link 
            v-for="l in hsk3Lessons" 
            :key="l.slug" 
            :to="'/lessons/' + l.slug"
            class="p-3.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700 group block transition-colors"
          >
            <div class="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase">Unit {{ getLessonUnitNumber(l.slug) }}</div>
            <div class="font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 line-clamp-1 mt-0.5">{{ l.title }}</div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- SECTION 5: All 18 Academic Masterclasses -->
    <section class="space-y-4">
      <div class="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        <FileText class="w-5 h-5 text-rose-600 dark:text-rose-400" />
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">All 18 Academic Masterclasses &amp; Study Guides</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <router-link 
          v-for="b in blogPostsData" 
          :key="b.slug" 
          :to="'/guides/' + b.slug"
          class="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700 group flex flex-col justify-between transition-all"
        >
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase">
              <span>{{ b.tags[0] }}</span>
              <span>{{ b.readTime }}</span>
            </div>
            <h3 class="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 line-clamp-2">
              {{ b.title }}
            </h3>
          </div>
          <div class="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
            <span>Read guide</span> <ArrowRight class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </router-link>
      </div>
    </section>

    <!-- SECTION 6: All 88 Dedicated Grammar Rule Guides -->
    <section class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
        <div class="flex items-center gap-2">
          <GraduationCap class="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">All 88 Dedicated Grammar Rule Guides</h2>
        </div>
        <!-- Grammar level switcher -->
        <div class="flex items-center gap-1.5 text-xs font-bold">
          <button
            @click="sitemapGrammarTab = 1"
            :class="[
              'px-3 py-1 rounded-lg transition-colors',
              sitemapGrammarTab === 1
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            ]"
          >
            HSK 1 ({{ hsk1Grammar.length }})
          </button>
          <button
            @click="sitemapGrammarTab = 2"
            :class="[
              'px-3 py-1 rounded-lg transition-colors',
              sitemapGrammarTab === 2
                ? 'bg-sky-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            ]"
          >
            HSK 2 ({{ hsk2Grammar.length }})
          </button>
          <button
            @click="sitemapGrammarTab = 3"
            :class="[
              'px-3 py-1 rounded-lg transition-colors',
              sitemapGrammarTab === 3
                ? 'bg-rose-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            ]"
          >
            HSK 3 ({{ hsk3Grammar.length }})
          </button>
        </div>
      </div>

      <!-- Grammar list grid based on active tab -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
        <router-link
          v-for="g in (sitemapGrammarTab === 1 ? hsk1Grammar : (sitemapGrammarTab === 2 ? hsk2Grammar : hsk3Grammar))"
          :key="g.slug"
          :to="'/grammar/' + g.slug"
          class="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 hover:border-sky-400 dark:hover:border-sky-600 hover:bg-sky-50/20 transition-all group block space-y-1"
        >
          <div class="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase">
            <span>{{ g.category }}</span>
            <span class="text-sky-600 dark:text-sky-400">HSK {{ g.level }}</span>
          </div>
          <div class="font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-600 transition-colors line-clamp-1">
            {{ g.title }}
          </div>
          <div class="text-[11px] font-mono text-stone-500 dark:text-stone-400 truncate">
            {{ g.pattern }}
          </div>
        </router-link>
      </div>

      <div class="text-center pt-1">
        <router-link
          to="/grammar"
          class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:bg-sky-600 transition-colors"
        >
          <span>Open Full 88-Rule Grammar Compendium</span> &rarr;
        </router-link>
      </div>
    </section>

    <!-- SECTION 7: All 603 Dedicated Vocabulary Study Guides -->
    <section class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
        <div class="flex items-center gap-2">
          <BookOpen class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">All 603 Dedicated Vocabulary Study Guides</h2>
        </div>
        <!-- Word level switcher -->
        <div class="flex items-center gap-1.5 text-xs font-bold">
          <button
            @click="sitemapWordTab = 1"
            :class="[
              'px-3 py-1 rounded-lg transition-colors',
              sitemapWordTab === 1
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            ]"
          >
            HSK 1 ({{ hsk1Words.length }})
          </button>
          <button
            @click="sitemapWordTab = 2"
            :class="[
              'px-3 py-1 rounded-lg transition-colors',
              sitemapWordTab === 2
                ? 'bg-sky-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            ]"
          >
            HSK 2 ({{ hsk2Words.length }})
          </button>
          <button
            @click="sitemapWordTab = 3"
            :class="[
              'px-3 py-1 rounded-lg transition-colors',
              sitemapWordTab === 3
                ? 'bg-rose-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            ]"
          >
            HSK 3 ({{ hsk3Words.length }})
          </button>
        </div>
      </div>

      <!-- Word list grid based on active tab -->
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 text-xs">
        <router-link
          v-for="w in (sitemapWordTab === 1 ? hsk1Words : (sitemapWordTab === 2 ? hsk2Words : hsk3Words))"
          :key="w.slug"
          :to="'/words/' + w.slug"
          class="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 hover:border-rose-400 dark:hover:border-rose-600 hover:bg-rose-50/30 transition-all group block text-center"
        >
          <div class="font-serif font-black text-lg text-stone-900 dark:text-stone-100 group-hover:text-rose-600 transition-colors">
            {{ w.hanzi }}
          </div>
          <div class="text-[11px] font-bold text-rose-600 dark:text-rose-400 truncate">
            {{ w.pinyin }}
          </div>
          <div class="text-[10px] text-stone-500 truncate mt-0.5">
            {{ w.meaning }}
          </div>
        </router-link>
      </div>

      <div class="text-center pt-2">
        <router-link
          to="/words"
          class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:bg-rose-600 transition-colors"
        >
          <span>Open Full Searchable 603-Word Dictionary</span> &rarr;
        </router-link>
      </div>
    </section>

    <!-- SECTION 7: Trust, E-E-A-T & Legal Policies -->
    <section class="space-y-4">
      <div class="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        <ShieldCheck class="w-5 h-5 text-sky-600 dark:text-sky-400" />
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">Trust, Transparency &amp; Legal Policies</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <router-link to="/about" class="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors group block">
          <h3 class="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-700 dark:group-hover:text-sky-400">About HSK Free Lab &amp; Mission</h3>
          <p class="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Our 100% free open educational mission, core values, and editorial team standards.</p>
        </router-link>

        <router-link to="/contact" class="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors group block">
          <h3 class="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-700 dark:group-hover:text-sky-400">Contact &amp; Editorial Support</h3>
          <p class="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Direct feedback channel, error corrections, and academic inquiries.</p>
        </router-link>

        <router-link to="/data-sources" class="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors group block">
          <h3 class="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-700 dark:group-hover:text-sky-400">Data Sources &amp; Citations</h3>
          <p class="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Official CLEC syllabus verification and permissive open-source licenses.</p>
        </router-link>

        <router-link to="/privacy-policy" class="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors group block">
          <h3 class="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-700 dark:group-hover:text-sky-400">Privacy Policy</h3>
          <p class="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Transparent statement on client-side storage, zero logins, and cookie consent.</p>
        </router-link>

        <router-link to="/terms" class="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors group block">
          <h3 class="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-700 dark:group-hover:text-sky-400">Terms of Service</h3>
          <p class="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Terms governing the use of our free educational tools and resources.</p>
        </router-link>

        <router-link to="/disclaimer" class="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-sky-300 dark:hover:border-sky-700 transition-colors group block">
          <h3 class="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-700 dark:group-hover:text-sky-400">Educational Disclaimer</h3>
          <p class="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Notice of independent educational status and CLEC trademark recognition.</p>
        </router-link>
      </div>
    </section>

  </div>
</template>
