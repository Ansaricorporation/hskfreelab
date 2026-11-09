<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  GitCompare, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Lightbulb, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  HelpCircle, 
  Award, 
  Check, 
  ChevronDown,
  BookOpen,
  Sparkles,
  Layers
} from 'lucide-vue-next';
import { 
  getComparisonBySlug, 
  getAdjacentComparisons, 
  type ComparisonItem 
} from '../data/comparisons';
import { playAudio, playSlowAudio } from '../utils/speech';
import { updateSeoMeta } from '../utils/seo';

const route = useRoute();
const router = useRouter();

const slug = computed(() => route.params.slug as string);

const item = computed<ComparisonItem | undefined>(() => {
  return getComparisonBySlug(slug.value);
});

const adjacent = computed(() => {
  return getAdjacentComparisons(slug.value);
});

// Update SEO Meta dynamically
watch(item, (val) => {
  if (val) {
    updateSeoMeta({
      title: `${val.title} | HSK Free Lab`,
      description: val.summary,
      canonical: `https://mybwn.com/compare/${val.slug}`,
      type: 'article'
    });
  }
}, { immediate: true });

// Audio state
const playingIndex = ref<string | null>(null);

function handlePlay(text: string, id: string, slow: boolean = false) {
  playingIndex.value = id;
  if (slow) {
    playSlowAudio(text);
  } else {
    playAudio(text);
  }
  setTimeout(() => {
    if (playingIndex.value === id) {
      playingIndex.value = null;
    }
  }, 2500);
}

// Quiz Interactive State
const selectedAnswers = ref<Record<number, number>>({});
const showExplanations = ref<Record<number, boolean>>({});

function handleSelectAnswer(questionIdx: number, optionIdx: number) {
  if (selectedAnswers.value[questionIdx] !== undefined) return;
  selectedAnswers.value[questionIdx] = optionIdx;
  showExplanations.value[questionIdx] = true;
}

const quizScore = computed(() => {
  if (!item.value) return 0;
  let correct = 0;
  item.value.quiz.forEach((q, idx) => {
    if (selectedAnswers.value[idx] === q.answer) {
      correct++;
    }
  });
  return correct;
});

const allAnswered = computed(() => {
  if (!item.value) return false;
  return Object.keys(selectedAnswers.value).length === item.value.quiz.length;
});

function resetQuiz() {
  selectedAnswers.value = {};
  showExplanations.value = {};
}

// Reset quiz when slug changes
watch(slug, () => {
  resetQuiz();
});

// Share feature
const copied = ref(false);
function copyUrl() {
  navigator.clipboard.writeText(window.location.href);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2000);
}

// FAQ Accordion
const openFaqIndex = ref<number | null>(null);
function toggleFaq(index: number) {
  openFaqIndex.value = openFaqIndex.value === index ? null : index;
}
</script>

<template>
  <div v-if="item" class="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12 pb-24">
    
    <!-- Breadcrumb -->
    <nav class="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2 flex-wrap">
      <router-link to="/" class="hover:underline">Home</router-link>
      <span>&gt;</span>
      <router-link to="/compare" class="hover:underline">Comparisons</router-link>
      <span>&gt;</span>
      <span class="text-stone-800 dark:text-stone-200 font-semibold">{{ item.shortTitle }}</span>
    </nav>

    <!-- Hero Header -->
    <header class="space-y-4">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          {{ item.level }} · CEFR {{ item.cefr }}
        </span>
        <span class="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
          Position #0 Featured Snippet Ready
        </span>
      </div>

      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
        {{ item.title }}
      </h1>

      <p class="text-stone-500 dark:text-stone-400 text-xs sm:text-sm">
        Curated by HSK Free Lab Editorial Team · Verified for HSK 1–3 &amp; HSK 3.0 Standard
      </p>
    </header>

    <!-- Quick Snippet Box (Position #0 Target) -->
    <section class="p-6 sm:p-8 rounded-3xl bg-amber-50/70 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/60 shadow-xs space-y-3">
      <div class="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
        <Sparkles class="w-4 h-4 text-amber-600" />
        <span>Quick Answer &amp; Core Distinction (In 10 Seconds)</span>
      </div>
      <p class="text-base sm:text-lg text-stone-900 dark:text-stone-100 font-medium leading-relaxed">
        {{ item.summary }}
      </p>
    </section>

    <!-- Side-by-Side Quick Summary Table -->
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <GitCompare class="w-5 h-5 text-amber-600" />
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
            Side-by-Side Comparison Table
          </h2>
        </div>
        <button 
          @click="copyUrl"
          class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50"
        >
          <Share2 class="w-3.5 h-3.5" />
          <span>{{ copied ? 'Copied Link!' : 'Share Guide' }}</span>
        </button>
      </div>

      <div class="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs">
        <table class="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr class="bg-stone-100 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200">
              <th class="p-4 font-bold w-1/4">Feature / Context</th>
              <th class="p-4 font-black text-amber-700 dark:text-amber-400">
                {{ item.words[0].hanzi }} ({{ item.words[0].pinyin }})
              </th>
              <th class="p-4 font-black text-sky-700 dark:text-sky-400">
                {{ item.words[1].hanzi }} ({{ item.words[1].pinyin }})
              </th>
              <th v-if="item.words[2]" class="p-4 font-black text-emerald-700 dark:text-emerald-400">
                {{ item.words[2].hanzi }} ({{ item.words[2].pinyin }})
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 dark:divide-stone-800">
            <tr v-for="(row, idx) in item.table" :key="idx" class="hover:bg-stone-50/60 dark:hover:bg-stone-800/40">
              <td class="p-4 font-bold text-stone-700 dark:text-stone-300 bg-stone-50/30 dark:bg-stone-800/20">
                {{ row.criteria }}
              </td>
              <td class="p-4 text-stone-800 dark:text-stone-200 leading-relaxed">
                {{ row.word1 }}
              </td>
              <td class="p-4 text-stone-800 dark:text-stone-200 leading-relaxed">
                {{ row.word2 }}
              </td>
              <td v-if="item.words[2]" class="p-4 text-stone-800 dark:text-stone-200 leading-relaxed">
                {{ row.word3 }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Individual Word Anatomy Cards -->
    <section class="space-y-4">
      <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
        Lexical Breakdown
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2" :class="item.words.length === 3 ? 'lg:grid-cols-3' : ''" gap-4>
        <div 
          v-for="(word, idx) in item.words" 
          :key="idx"
          class="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-xs"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
              {{ word.partOfSpeech }}
            </span>
            <button 
              @click="handlePlay(word.hanzi, `word-${idx}`)"
              class="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 hover:bg-amber-100 transition-colors"
              title="Play Pronunciation"
            >
              <Volume2 class="w-4 h-4" />
            </button>
          </div>

          <div class="text-center py-2">
            <div class="text-5xl font-black text-stone-900 dark:text-stone-100 font-serif">
              {{ word.hanzi }}
            </div>
            <div class="text-lg font-bold text-amber-600 dark:text-amber-400 mt-1">
              {{ word.pinyin }}
            </div>
            <div class="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-1">
              "{{ word.meaning }}"
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            <span class="font-bold text-stone-800 dark:text-stone-200">Core Role: </span>
            {{ word.coreFunction }}
          </div>
        </div>
      </div>
    </section>

    <!-- In-Depth Rules with Examples -->
    <section class="space-y-8">
      <div class="flex items-center gap-2">
        <BookOpen class="w-5 h-5 text-amber-600" />
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
          In-Depth Grammar Rules &amp; Usage
        </h2>
      </div>

      <div class="space-y-6">
        <div 
          v-for="(rule, idx) in item.rules" 
          :key="idx"
          class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-5 shadow-xs"
        >
          <div class="space-y-2">
            <h3 class="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
              {{ rule.heading }}
            </h3>
            <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {{ rule.explanation }}
            </p>
          </div>

          <!-- Formula Box if present -->
          <div v-if="rule.formula" class="p-4 rounded-2xl bg-stone-900 text-amber-300 font-mono text-xs sm:text-sm">
            <div class="text-[10px] uppercase font-bold text-stone-400 mb-1">Sentence Formula</div>
            <div>{{ rule.formula }}</div>
          </div>

          <!-- Examples List -->
          <div class="space-y-3 pt-2">
            <div 
              v-for="(ex, exIdx) in rule.examples" 
              :key="exIdx"
              class="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 flex items-start justify-between gap-4"
            >
              <div class="space-y-1">
                <div class="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                  {{ ex.zh }}
                </div>
                <div class="text-xs font-semibold text-amber-700 dark:text-amber-400">
                  {{ ex.py }}
                </div>
                <div class="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                  "{{ ex.en }}"
                </div>
                <div v-if="ex.note" class="text-[11px] text-stone-400 italic pt-1">
                  Note: {{ ex.note }}
                </div>
              </div>

              <button 
                @click="handlePlay(ex.zh, `ex-${idx}-${exIdx}`)"
                class="p-2 rounded-xl text-stone-400 hover:text-amber-600 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors shrink-0"
                title="Play Audio"
              >
                <Volume2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Common Mistakes Section (Correct vs Wrong) -->
    <section class="space-y-6">
      <div class="flex items-center gap-2">
        <AlertTriangle class="w-5 h-5 text-rose-500" />
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
          Common Traps: Correct vs. Wrong Sentences
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div 
          v-for="(mistake, idx) in item.mistakes" 
          :key="idx"
          class="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-xs"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Wrong Sentence -->
            <div class="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 space-y-1">
              <div class="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide">
                <XCircle class="w-4 h-4 text-rose-600" />
                <span>Incorrect</span>
              </div>
              <div class="text-base font-bold text-rose-900 dark:text-rose-200 line-through decoration-rose-400">
                {{ mistake.incorrectZh }}
              </div>
              <div class="text-xs text-rose-600 dark:text-rose-400">
                {{ mistake.incorrectPy }}
              </div>
            </div>

            <!-- Correct Sentence -->
            <div class="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
              <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                <CheckCircle2 class="w-4 h-4 text-emerald-600" />
                <span>Correct</span>
              </div>
              <div class="text-base font-bold text-emerald-900 dark:text-emerald-200">
                {{ mistake.correctZh }}
              </div>
              <div class="text-xs text-emerald-600 dark:text-emerald-400">
                {{ mistake.correctPy }}
              </div>
            </div>
          </div>

          <div class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl">
            <span class="font-bold text-stone-900 dark:text-stone-100">Why? </span>
            {{ mistake.explanation }}
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive 3-Question Practice Quiz -->
    <section class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-xs">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Award class="w-5 h-5 text-amber-600" />
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
            Interactive Practice Quiz
          </h2>
        </div>
        <div v-if="allAnswered" class="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
          Score: {{ quizScore }} / {{ item.quiz.length }}
        </div>
      </div>

      <div class="space-y-6">
        <div 
          v-for="(q, qIdx) in item.quiz" 
          :key="qIdx"
          class="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-3"
        >
          <div class="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100">
            {{ qIdx + 1 }}. {{ q.question }}
          </div>

          <!-- Options Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              v-for="(opt, optIdx) in q.options"
              :key="optIdx"
              @click="handleSelectAnswer(qIdx, optIdx)"
              :disabled="selectedAnswers[qIdx] !== undefined"
              :class="[
                'p-3 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all border flex items-center justify-between',
                selectedAnswers[qIdx] === undefined
                  ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 hover:border-amber-400 text-stone-800 dark:text-stone-200'
                  : optIdx === q.answer
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold'
                    : selectedAnswers[qIdx] === optIdx
                      ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-300'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 opacity-60 text-stone-600'
              ]"
            >
              <span>{{ opt }}</span>
              <Check v-if="selectedAnswers[qIdx] !== undefined && optIdx === q.answer" class="w-4 h-4 text-emerald-600 shrink-0" />
            </button>
          </div>

          <!-- Feedback explanation -->
          <div 
            v-if="showExplanations[qIdx]"
            class="text-xs p-3 rounded-xl mt-2 leading-relaxed"
            :class="selectedAnswers[qIdx] === q.answer ? 'bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200' : 'bg-rose-100/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'"
          >
            <span class="font-bold">{{ selectedAnswers[qIdx] === q.answer ? 'Correct!' : 'Incorrect.' }}</span>
            {{ q.explanation }}
          </div>
        </div>
      </div>

      <div v-if="allAnswered" class="flex justify-end pt-2">
        <button 
          @click="resetQuiz"
          class="text-xs font-bold px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 transition-opacity"
        >
          Retake Quiz
        </button>
      </div>
    </section>

    <!-- FAQ Accordion -->
    <section class="space-y-4">
      <div class="flex items-center gap-2">
        <HelpCircle class="w-5 h-5 text-amber-600" />
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
          Frequently Asked Questions
        </h2>
      </div>

      <div class="space-y-3">
        <div 
          v-for="(faq, idx) in item.faq" 
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

    <!-- Cross-Linking to Related Words & Grammar -->
    <section class="p-6 rounded-3xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 space-y-4">
      <h3 class="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
        Related Curriculum Modules
      </h3>
      <div class="flex flex-wrap gap-2">
        <router-link 
          v-for="wordSlug in item.relatedWordSlugs" 
          :key="wordSlug"
          :to="`/words/${wordSlug}`"
          class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-amber-400"
        >
          📖 Word: {{ wordSlug }}
        </router-link>
        <router-link 
          v-for="gSlug in item.relatedGrammarSlugs" 
          :key="gSlug"
          :to="`/grammar/${gSlug}`"
          class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-amber-400"
        >
          🧩 Rule: {{ gSlug }}
        </router-link>
      </div>
    </section>

    <!-- Previous / Next Navigation -->
    <nav class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200 dark:border-stone-800">
      <router-link 
        v-if="adjacent.prev"
        :to="`/compare/${adjacent.prev.slug}`"
        class="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 group block"
      >
        <div class="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
          <ArrowLeft class="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          <span>Previous Comparison</span>
        </div>
        <div class="font-bold text-stone-800 dark:text-stone-200 text-sm mt-1">
          {{ adjacent.prev.shortTitle }}
        </div>
      </router-link>

      <router-link 
        v-if="adjacent.next"
        :to="`/compare/${adjacent.next.slug}`"
        class="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 group block sm:text-right"
      >
        <div class="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1 sm:justify-end">
          <span>Next Comparison</span>
          <ArrowRight class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
        <div class="font-bold text-stone-800 dark:text-stone-200 text-sm mt-1">
          {{ adjacent.next.shortTitle }}
        </div>
      </router-link>
    </nav>

  </div>
</template>
