<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  BookOpen, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  HelpCircle,
  Award,
  Layers,
  MessageSquare,
  FileText,
  Compass,
  Check
} from 'lucide-vue-next';
import { lessonsData } from '../data/lessons.ts';
import { 
  getEnrichedVocabForLesson, 
  getLessonUnitNumber, 
  getAdjacentLessons, 
  getRelatedGuidesForLesson,
  type EnrichedVocabItem 
} from '../data/lesson-helpers.ts';
import { getWordByHanzi } from '../data/vocab-helpers.ts';
import { playAudio } from '../utils/speech';
import { updateSeoMeta } from '../utils/seo';
import { markLessonCompleted, activeProgress } from '../stores/auth';
import type { Lesson, HskLevel } from '../types';

const route = useRoute();
const router = useRouter();

const slug = computed(() => route.params.slug as string);
const lesson = computed<Lesson | undefined>(() => {
  return lessonsData.find(l => l.slug === slug.value) || lessonsData[0];
});

const unitNumber = computed(() => getLessonUnitNumber(slug.value));
const enrichedVocab = computed<EnrichedVocabItem[]>(() => {
  return lesson.value ? getEnrichedVocabForLesson(lesson.value) : [];
});

const { prevLesson, nextLesson } = computed(() => getAdjacentLessons(slug.value)).value;
const adjacent = computed(() => getAdjacentLessons(slug.value));
const relatedGuides = computed(() => lesson.value ? getRelatedGuidesForLesson(lesson.value) : []);

// Quiz state
const quizAnswers = ref<Record<number, number>>({});
const showQuizResults = ref(false);

function answerQuestion(qIdx: number, optIdx: number) {
  quizAnswers.value[qIdx] = optIdx;
}

function checkQuiz() {
  showQuizResults.value = true;
  if (lesson.value?.slug) {
    markLessonCompleted(lesson.value.slug);
  }
}

const isCompleted = computed(() => {
  return lesson.value ? activeProgress.value.completedLessons.includes(lesson.value.slug) : false;
});

function toggleComplete() {
  if (lesson.value?.slug) {
    markLessonCompleted(lesson.value.slug);
  }
}

// Audio helpers
function playFullDialogue() {
  if (!lesson.value) return;
  const fullText = lesson.value.dialogue.map(d => d.zh).join(' ');
  playAudio(fullText, 0.85);
}

// Watch slug to reset quiz and update dynamic SEO & JSON-LD
watch(lesson, (cur) => {
  if (!cur) return;
  quizAnswers.value = {};
  showQuizResults.value = false;

  const unitNum = getLessonUnitNumber(cur.slug);
  const cefrLevel = cur.level === 1 ? 'A1' : cur.level === 2 ? 'A2' : 'B1';
  const pageTitle = `HSK ${cur.level} Lesson ${unitNum}: ${cur.title} | HSK Free Lab`;
  const pageDesc = `${cur.description} Comprehensive HSK ${cur.level} lesson featuring conversational dialogue, enriched vocabulary definitions, sentence grammar rules, and interactive quiz.`;
  const canonicalUrl = `https://mybwn.com/lessons/${cur.slug}`;

  updateSeoMeta({
    title: pageTitle,
    description: pageDesc,
    canonical: canonicalUrl,
    type: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: `HSK ${cur.level} Lesson ${unitNum}: ${cur.title}`,
        description: cur.description,
        educationalLevel: `HSK ${cur.level} (CEFR ${cefrLevel})`,
        isAccessibleForFree: true,
        inLanguage: 'zh-CN',
        publisher: {
          '@type': 'Organization',
          name: 'HSK Free Lab',
          url: 'https://mybwn.com/'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://mybwn.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Lessons',
            item: 'https://mybwn.com/lessons'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `HSK ${cur.level}`,
            item: `https://mybwn.com/hsk-${cur.level}`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: cur.title,
            item: canonicalUrl
          }
        ]
      }
    ]
  }, route.path);
}, { immediate: true });
</script>

<template>
  <div v-if="lesson" class="max-w-4xl mx-auto space-y-12 pb-24 px-4">
    
    <!-- Top Breadcrumbs & Back Link -->
    <div class="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
      <nav class="flex items-center gap-1.5 flex-wrap">
        <router-link to="/" class="hover:underline">Home</router-link>
        <span>&gt;</span>
        <router-link to="/lessons" class="hover:underline">Lessons</router-link>
        <span>&gt;</span>
        <router-link :to="`/hsk-${lesson.level}`" class="hover:underline">HSK {{ lesson.level }}</router-link>
        <span>&gt;</span>
        <span class="text-stone-800 dark:text-stone-200 font-semibold truncate max-w-[200px]">{{ lesson.title }}</span>
      </nav>

      <router-link to="/lessons" class="font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 shrink-0">
        <ArrowLeft class="w-3.5 h-3.5" /> All 30 Lessons
      </router-link>
    </div>

    <!-- Lesson Header Hero Card -->
    <header class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-10 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
        <BookOpen class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>HSK {{ lesson.level }} &bull; Unit {{ unitNumber }} of 10</span>
      </div>

      <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
        {{ lesson.title }}
      </h1>

      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
        {{ lesson.description }}
      </p>

      <div class="pt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          @click="toggleComplete"
          :class="[
            'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs',
            isCompleted 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-50 hover:text-emerald-700'
          ]"
        >
          <CheckCircle2 class="w-4 h-4" />
          <span>{{ isCompleted ? 'Completed (Saved in Browser)' : 'Mark Lesson as Completed' }}</span>
        </button>

        <button
          type="button"
          @click="playFullDialogue"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:bg-rose-700 dark:hover:bg-rose-600 dark:hover:text-white transition-colors shadow-xs"
        >
          <Volume2 class="w-4 h-4" />
          <span>Listen to Full Dialogue</span>
        </button>
      </div>
    </header>

    <!-- SECTION 1: Dialogue Transcript -->
    <section class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div class="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 flex items-center justify-center">
            <MessageSquare class="w-4 h-4" />
          </div>
          <div>
            <h2 class="text-lg sm:text-xl font-black text-stone-900 dark:text-stone-100">Conversational Dialogue</h2>
            <p class="text-xs text-stone-500 dark:text-stone-400">Authentic native conversational exchange</p>
          </div>
        </div>
        <button
          type="button"
          @click="playFullDialogue"
          class="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
        >
          <Volume2 class="w-3.5 h-3.5" /> Play All
        </button>
      </div>

      <div class="space-y-4">
        <div 
          v-for="(line, idx) in lesson.dialogue" 
          :key="idx"
          class="p-4 sm:p-5 rounded-2xl bg-stone-50/70 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-700/60 flex items-start justify-between gap-4 transition-all hover:bg-stone-50 dark:hover:bg-stone-800/70"
        >
          <div class="space-y-1.5 flex-1">
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200">
                {{ line.speaker }}
              </span>
            </div>
            <div class="font-serif font-black text-lg sm:text-xl text-stone-900 dark:text-stone-100 leading-snug">
              {{ line.zh }}
            </div>
            <div class="text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400">
              {{ line.py }}
            </div>
            <div class="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
              {{ line.en }}
            </div>
          </div>

          <button
            type="button"
            @click="playAudio(line.zh, 0.85)"
            class="w-9 h-9 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400 flex items-center justify-center transition-colors shrink-0 shadow-2xs"
            :aria-label="`Listen to line: ${line.zh}`"
          >
            <Volume2 class="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>

    <!-- SECTION 2: Key Vocabulary Breakdown -->
    <section class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div class="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
            <BookOpen class="w-4 h-4" />
          </div>
          <div>
            <h2 class="text-lg sm:text-xl font-black text-stone-900 dark:text-stone-100">Key Vocabulary Breakdown</h2>
            <p class="text-xs text-stone-500 dark:text-stone-400">Detailed character stroke breakdowns &amp; practical collocations</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="item in enrichedVocab" 
          :key="item.hanzi"
          class="p-4 rounded-2xl bg-stone-50/70 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-700/60 space-y-3 flex flex-col justify-between"
        >
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <router-link 
                  v-if="getWordByHanzi(item.hanzi)"
                  :to="'/words/' + getWordByHanzi(item.hanzi)?.slug"
                  class="font-serif font-black text-2xl text-stone-900 dark:text-stone-100 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  {{ item.hanzi }}
                </router-link>
                <span v-else class="font-serif font-black text-2xl text-stone-900 dark:text-stone-100">
                  {{ item.hanzi }}
                </span>
                <span class="text-sm font-bold text-rose-600 dark:text-rose-400">
                  {{ item.pinyin }}
                </span>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 uppercase">
                {{ item.partOfSpeech }}
              </span>
            </div>

            <div class="text-xs font-semibold text-stone-800 dark:text-stone-200">
              {{ item.meaning }}
            </div>

            <div class="p-2.5 rounded-xl bg-white dark:bg-stone-800/90 border border-stone-200/60 dark:border-stone-700 text-xs space-y-1">
              <div class="font-serif font-bold text-stone-900 dark:text-stone-100">{{ item.exampleZh }}</div>
              <div class="text-[11px] text-rose-600 dark:text-rose-400 font-medium">{{ item.examplePy }}</div>
              <div class="text-[11px] text-stone-500 dark:text-stone-400">{{ item.exampleEn }}</div>
            </div>
          </div>

          <div class="pt-2 flex items-center justify-between border-t border-stone-200/50 dark:border-stone-700/50 text-xs">
            <div class="flex items-center gap-3">
              <router-link 
                v-if="getWordByHanzi(item.hanzi)"
                :to="'/words/' + getWordByHanzi(item.hanzi)?.slug"
                class="text-rose-600 dark:text-rose-400 hover:underline font-semibold flex items-center gap-0.5"
              >
                <span>Word Guide</span> &rarr;
              </router-link>
              <router-link 
                :to="`/stroke-order/${encodeURIComponent(item.hanzi.charAt(0))}`"
                class="text-stone-500 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 font-semibold flex items-center gap-1"
              >
                <span>Stroke Order</span> &rarr;
              </router-link>
            </div>

            <button
              type="button"
              @click="playAudio(item.hanzi, 0.85)"
              class="w-7 h-7 rounded-lg bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:text-rose-600 flex items-center justify-center transition-colors shadow-2xs"
              :aria-label="`Listen to ${item.hanzi}`"
            >
              <Volume2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: Grammar Points Breakdown -->
    <section class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div class="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-2xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center">
            <FileText class="w-4 h-4" />
          </div>
          <div>
            <h2 class="text-lg sm:text-xl font-black text-stone-900 dark:text-stone-100">Essential Grammar Structures</h2>
            <p class="text-xs text-stone-500 dark:text-stone-400">Syntactic patterns and sentence structure rules</p>
          </div>
        </div>

        <router-link to="/grammar" class="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1">
          <span>88-Point Grammar Hub</span> &rarr;
        </router-link>
      </div>

      <div class="space-y-4">
        <div 
          v-for="(gp, idx) in lesson.grammarPoints" 
          :key="idx"
          class="p-5 rounded-2xl bg-stone-50/70 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-700/60 space-y-3"
        >
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
              {{ idx + 1 }}
            </span>
            <h3 class="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
              {{ gp }}
            </h3>
          </div>

          <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            This pattern is critical for HSK {{ lesson.level }} fluency. Master the exact word sequence and observe how it connects subject and predicate.
          </p>

          <div class="p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-200/60 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300">
            <strong>Example in Context:</strong> {{ lesson.dialogue[idx % lesson.dialogue.length]?.zh }} 
            <span class="text-rose-600 dark:text-rose-400">({{ lesson.dialogue[idx % lesson.dialogue.length]?.py }})</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 4: Interactive Comprehension Quiz -->
    <section class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div class="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center">
            <Award class="w-4 h-4" />
          </div>
          <div>
            <h2 class="text-lg sm:text-xl font-black text-stone-900 dark:text-stone-100">Comprehension Practice</h2>
            <p class="text-xs text-stone-500 dark:text-stone-400">Test your mastery of this unit's vocabulary and grammar</p>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div 
          v-for="(q, qIdx) in lesson.practiceQuestions" 
          :key="qIdx"
          class="p-5 rounded-2xl bg-stone-50/70 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-700/60 space-y-4"
        >
          <div class="font-bold text-sm text-stone-900 dark:text-stone-100">
            {{ qIdx + 1 }}. {{ q.question }}
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              v-for="(opt, optIdx) in q.options"
              :key="optIdx"
              type="button"
              @click="answerQuestion(qIdx, optIdx)"
              :class="[
                'p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between',
                quizAnswers[qIdx] === optIdx
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                  : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
              ]"
            >
              <span>{{ opt }}</span>
              <Check v-if="quizAnswers[qIdx] === optIdx" class="w-3.5 h-3.5 text-rose-600" />
            </button>
          </div>

          <!-- Explanation after checking -->
          <div 
            v-if="showQuizResults" 
            :class="[
              'p-3.5 rounded-xl text-xs space-y-1',
              quizAnswers[qIdx] === q.correctIndex
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            ]"
          >
            <div class="font-bold">
              {{ quizAnswers[qIdx] === q.correctIndex ? '✓ Correct Answer!' : '✗ Incorrect' }}
            </div>
            <p>{{ q.explanation }}</p>
          </div>
        </div>

        <button
          type="button"
          @click="checkQuiz"
          class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs hover:bg-stone-800 transition-colors shadow-sm"
        >
          Check Answers
        </button>
      </div>
    </section>

    <!-- SECTION 5: Previous / Next Lesson Navigation Cards -->
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <router-link 
        v-if="adjacent.prevLesson" 
        :to="`/lessons/${adjacent.prevLesson.slug}`"
        class="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-sm transition-all group flex flex-col justify-between"
      >
        <div class="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider flex items-center gap-1">
          <ArrowLeft class="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Previous Unit
        </div>
        <div class="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mt-2">
          {{ adjacent.prevLesson.title }}
        </div>
      </router-link>
      <div v-else class="p-5 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800 opacity-40"></div>

      <router-link 
        v-if="adjacent.nextLesson" 
        :to="`/lessons/${adjacent.nextLesson.slug}`"
        class="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-sm transition-all group flex flex-col justify-between text-right"
      >
        <div class="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider flex items-center justify-end gap-1">
          Next Unit <ArrowRight class="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
        <div class="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mt-2">
          {{ adjacent.nextLesson.title }}
        </div>
      </router-link>
    </section>

    <!-- SECTION 6: Contextual Level Hub & Guides Internal Linking Mesh -->
    <section class="bg-stone-100/70 dark:bg-stone-900/50 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 space-y-6">
      <div class="space-y-1">
        <h3 class="text-base font-bold text-stone-900 dark:text-stone-100">
          Continue Your HSK {{ lesson.level }} Prep
        </h3>
        <p class="text-xs text-stone-500 dark:text-stone-400">
          Accelerate your retention with official vocabulary lists, diagnostic mock tests, and curated study guides.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- Level Hub Link -->
        <router-link 
          :to="`/hsk-${lesson.level}`"
          class="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-rose-400 transition-colors shadow-2xs group flex flex-col justify-between"
        >
          <div>
            <span class="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">Syllabus Hub</span>
            <div class="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-600 mt-1">
              HSK {{ lesson.level }} Complete Vocab
            </div>
            <p class="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
              Browse all official words with native audio and flashcards.
            </p>
          </div>
          <div class="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-3">
            Open Hub &rarr;
          </div>
        </router-link>

        <!-- Related Guides -->
        <router-link 
          v-for="guide in relatedGuides.slice(0, 2)" 
          :key="guide.slug"
          :to="`/guides/${guide.slug}`"
          class="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-rose-400 transition-colors shadow-2xs group flex flex-col justify-between"
        >
          <div>
            <span class="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase">{{ guide.tags[0] }}</span>
            <div class="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-600 mt-1 line-clamp-2">
              {{ guide.title }}
            </div>
          </div>
          <div class="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-3">
            Read Guide &rarr;
          </div>
        </router-link>
      </div>
    </section>

  </div>
</template>
