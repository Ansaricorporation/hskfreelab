<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  ChevronRight, 
  BookOpen, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  HelpCircle, 
  Award, 
  Check, 
  FileText,
  Compass,
  Layers,
  GraduationCap
} from 'lucide-vue-next';
import { 
  getGrammarRuleBySlug, 
  type EnrichedGrammarRule 
} from '../data/grammar-helpers.ts';
import { playAudio, playSlowAudio } from '../utils/speech';
import { updateSeoMeta } from '../utils/seo';
import LevelBadge from '../components/ui/LevelBadge.vue';
import StudyCardPinModal from '../components/tools/StudyCardPinModal.vue';

const route = useRoute();
const router = useRouter();

const slug = computed(() => route.params.slug as string);

const rule = computed<EnrichedGrammarRule | undefined>(() => {
  return getGrammarRuleBySlug(slug.value);
});

// Fallback redirect if slug is invalid
watch(
  () => rule.value,
  (val) => {
    if (!val && slug.value) {
      router.replace('/grammar');
    }
  },
  { immediate: true }
);

// Pinterest Pin Modal state
const showPinModal = ref(false);

// Interactive Quiz state
const userAnswers = ref<Record<number, number>>({});
const submitted = ref<Record<number, boolean>>({});

function selectOption(qId: number, optIdx: number) {
  if (submitted.value[qId]) return;
  userAnswers.value[qId] = optIdx;
  submitted.value[qId] = true;
}

function resetQuiz() {
  userAnswers.value = {};
  submitted.value = {};
}

const quizScore = computed(() => {
  if (!rule.value) return 0;
  return rule.value.quiz.reduce((acc, q) => {
    return acc + (userAnswers.value[q.id] === q.correctIndex ? 1 : 0);
  }, 0);
});

const quizCompleted = computed(() => {
  if (!rule.value) return false;
  return rule.value.quiz.every(q => submitted.value[q.id]);
});

// SEO & JSON-LD Update
function applySeo() {
  if (!rule.value) return;
  const r = rule.value;
  const canonicalUrl = `https://mybwn.com/grammar/${r.slug}`;
  const title = `${r.title} - HSK ${r.level} Chinese Grammar Guide | HSK Free Lab`;
  const description = `Master ${r.title} for HSK ${r.level}. Syntax pattern: ${r.pattern}. Free bilingual examples with native audio, common mistakes, and interactive quiz.`;

  // FAQ Schema from Quiz
  const faqQuestions = r.quiz.map(q => ({
    '@type': 'Question',
    'name': q.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': `${q.options[q.correctIndex]}. Explanation: ${q.explanation}`
    }
  }));

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://mybwn.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': `HSK ${r.level} Hub`,
          'item': `https://mybwn.com/hsk-${r.level}`
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': 'Grammar Compendium',
          'item': 'https://mybwn.com/grammar'
        },
        {
          '@type': 'ListItem',
          'position': 4,
          'name': r.title,
          'item': canonicalUrl
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      'name': r.title,
      'description': description,
      'learningResourceType': 'Grammar Guide',
      'educationalLevel': `HSK Level ${r.level} / CEFR ${r.cefr}`,
      'url': canonicalUrl,
      'inLanguage': ['zh-Hans', 'en'],
      'isAccessibleForFree': true,
      'author': {
        '@type': 'Organization',
        'name': 'HSK Free Lab Editorial Team',
        'url': 'https://mybwn.com/'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqQuestions
    }
  ];

  updateSeoMeta({
    title,
    description,
    canonical: canonicalUrl,
    jsonLd
  });
}

watch(
  () => rule.value,
  () => {
    applySeo();
    resetQuiz();
  },
  { immediate: true }
);

onMounted(() => {
  applySeo();
});
</script>

<template>
  <div v-if="rule" class="max-w-4xl mx-auto space-y-10 pb-20 px-4">
    
    <!-- Breadcrumb Navigation -->
    <nav aria-label="Breadcrumb" class="pt-2">
      <ol class="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
        <li>
          <router-link to="/" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
            Home
          </router-link>
        </li>
        <li class="flex items-center gap-1.5">
          <ChevronRight class="w-3 h-3 text-stone-400" />
          <router-link :to="`/hsk-${rule.level}`" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
            HSK {{ rule.level }} Hub
          </router-link>
        </li>
        <li class="flex items-center gap-1.5">
          <ChevronRight class="w-3 h-3 text-stone-400" />
          <router-link to="/grammar" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
            Grammar Compendium
          </router-link>
        </li>
        <li class="flex items-center gap-1.5 text-stone-900 dark:text-stone-100 font-bold" aria-current="page">
          <ChevronRight class="w-3 h-3 text-stone-400" />
          <span>{{ rule.title }}</span>
        </li>
      </ol>
    </nav>

    <!-- HERO GRAMMAR CARD -->
    <header class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <!-- Badges & Action Row -->
      <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div class="flex items-center gap-2 flex-wrap">
          <LevelBadge :level="rule.level" size="md" />
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
            {{ rule.cefr }}
          </span>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300">
            {{ rule.category }}
          </span>
          <router-link 
            v-if="rule.parentLessonSlug"
            :to="`/lessons/${rule.parentLessonSlug}`"
            class="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:underline flex items-center gap-1"
          >
            <BookOpen class="w-3 h-3" />
            <span>Taught in {{ rule.parentLessonTitle || 'Core Lesson' }}</span>
          </router-link>
        </div>

        <!-- Pinterest Study Card Generator Trigger -->
        <button 
          @click="showPinModal = true"
          type="button"
          class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 active:scale-95"
          title="Generate 2:3 vertical Pinterest infographic study card"
        >
          <Share2 class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          <span>📌 Save Study Card (Pinterest)</span>
        </button>
      </div>

      <!-- Main Grammar Title -->
      <div class="space-y-3">
        <h1 class="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
          {{ rule.title }}
        </h1>
        <p class="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
          {{ rule.explanation }}
        </p>
      </div>

      <!-- Formula Pattern Highlight Box -->
      <div class="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/90 dark:border-stone-800 space-y-2">
        <div class="flex items-center gap-1.5 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          <Layers class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>Core Syntax Formula</span>
        </div>
        <div class="font-mono text-base sm:text-xl font-black text-sky-800 dark:text-sky-300 bg-white dark:bg-stone-900 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 shadow-2xs">
          {{ rule.pattern }}
        </div>
      </div>
    </header>

    <!-- SECTION 1: STRUCTURAL VARIATIONS & WORD ORDER -->
    <section class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-5">
      <div class="flex items-center gap-2">
        <span class="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
          <Compass class="w-5 h-5" />
        </span>
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Structural Variations & Sentence Flow
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Affirmative Form -->
        <div class="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 space-y-1.5">
          <div class="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
            <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Affirmative Structure</span>
          </div>
          <div class="text-sm font-semibold text-stone-900 dark:text-stone-100">
            {{ rule.structuralVariations.affirmative }}
          </div>
        </div>

        <!-- Negative Form -->
        <div class="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 space-y-1.5">
          <div class="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1">
            <AlertTriangle class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Negative Form (不 / 没)</span>
          </div>
          <div class="text-sm font-semibold text-stone-900 dark:text-stone-100">
            {{ rule.structuralVariations.negative }}
          </div>
        </div>

        <!-- Question Form -->
        <div class="p-4 rounded-2xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200/80 dark:border-sky-900/50 space-y-1.5">
          <div class="text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 flex items-center gap-1">
            <HelpCircle class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Interrogative Question Form</span>
          </div>
          <div class="text-sm font-semibold text-stone-900 dark:text-stone-100">
            {{ rule.structuralVariations.question }}
          </div>
        </div>
      </div>

      <!-- Structural Notes -->
      <div v-if="rule.structuralVariations.notes" class="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm text-stone-600 dark:text-stone-300 flex items-start gap-2">
        <Lightbulb class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <strong class="font-bold text-stone-800 dark:text-stone-200">Syntactic Note:</strong>
          {{ rule.structuralVariations.notes }}
        </div>
      </div>
    </section>

    <!-- SECTION 2: BILINGUAL EXAMPLES WITH NATIVE AUDIO -->
    <section class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-5">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
            <Volume2 class="w-5 h-5" />
          </span>
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            Authentic Exemplar Sentences & Native Audio
          </h2>
        </div>
        <span class="text-xs text-stone-500 dark:text-stone-400">
          Click speaker for 1.0x or 0.6x pronunciation
        </span>
      </div>

      <div class="space-y-3">
        <div 
          v-for="(example, idx) in rule.examples" 
          :key="idx"
          class="p-4 sm:p-5 rounded-2xl bg-stone-50/70 dark:bg-stone-950/50 border border-stone-200/80 dark:border-stone-800 hover:border-sky-300 dark:hover:border-sky-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div class="space-y-1.5 flex-1">
            <div class="text-lg sm:text-xl font-black text-stone-900 dark:text-stone-100 tracking-wide">
              {{ example.zh }}
            </div>
            <div class="text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400">
              {{ example.py }}
            </div>
            <div class="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
              {{ example.en }}
            </div>
          </div>

          <!-- Audio Controls -->
          <div class="flex items-center gap-2 shrink-0">
            <button
              type="button"
              @click="playAudio(example.zh, 1.0)"
              class="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 hover:bg-sky-50 dark:hover:bg-sky-950/60 text-stone-700 dark:text-stone-200 hover:text-sky-600 dark:hover:text-sky-400 text-xs font-bold flex items-center gap-1.5 transition-colors border border-stone-200 dark:border-stone-700 shadow-2xs"
              title="Play at standard speed"
            >
              <Volume2 class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>1.0x</span>
            </button>
            <button
              type="button"
              @click="playSlowAudio(example.zh)"
              class="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 hover:bg-amber-50 dark:hover:bg-amber-950/60 text-stone-700 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors border border-stone-200 dark:border-stone-700 shadow-2xs"
              title="Play at slow beginner speed"
            >
              <span>🐢 0.6x</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: COMMON PITFALLS & EXAM STRATEGY -->
    <section class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div class="flex items-center gap-2">
        <span class="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
          <AlertTriangle class="w-5 h-5" />
        </span>
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Common Pitfalls & HSK Test Traps
        </h2>
      </div>

      <!-- Common Mistakes list -->
      <div class="space-y-3">
        <div 
          v-for="(mistake, idx) in rule.commonMistakes" 
          :key="idx"
          class="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 flex items-start gap-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed"
        >
          <span class="px-2 py-0.5 rounded-md bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 font-black text-xs shrink-0 mt-0.5">
            Mistake {{ idx + 1 }}
          </span>
          <div>{{ mistake }}</div>
        </div>
      </div>

      <!-- Exam Strategy Box -->
      <div class="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2">
        <div class="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
          <Award class="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Official HSK Test Strategy & Scoring Advice</span>
        </div>
        <p class="text-xs sm:text-sm text-amber-950/90 dark:text-amber-200/90 leading-relaxed">
          {{ rule.examStrategy }}
        </p>
      </div>
    </section>

    <!-- SECTION 4: CROSS-LINKED SYLLABUS VOCABULARY -->
    <section v-if="rule.matchedVocab && rule.matchedVocab.length > 0" class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-5">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <BookOpen class="w-5 h-5" />
          </span>
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            Key Syllabus Words Used in this Structure
          </h2>
        </div>
        <router-link to="/words" class="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline">
          View All 603 Words →
        </router-link>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <router-link 
          v-for="v in rule.matchedVocab" 
          :key="v.slug"
          :to="`/words/${v.slug}`"
          class="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all group"
        >
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="font-serif font-black text-xl text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {{ v.hanzi }}
            </span>
            <LevelBadge :level="v.level" size="sm" />
          </div>
          <div class="text-xs font-semibold text-rose-600 dark:text-rose-400">
            {{ v.pinyin }}
          </div>
          <div class="text-[11px] text-stone-500 dark:text-stone-400 truncate">
            {{ v.meaning }}
          </div>
        </router-link>
      </div>
    </section>

    <!-- SECTION 5: INTERACTIVE 3-QUESTION MASTERY QUIZ -->
    <section class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div class="flex items-center gap-2">
          <span class="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <HelpCircle class="w-5 h-5" />
          </span>
          <div>
            <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
              Rule Mastery Practice Quiz
            </h2>
            <p class="text-xs text-stone-500 dark:text-stone-400">
              Test your grammar comprehension with immediate explanatory feedback.
            </p>
          </div>
        </div>

        <div v-if="quizCompleted" class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-bold" :class="quizScore === 3 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'">
            Score: {{ quizScore }} / 3
          </span>
          <button 
            type="button" 
            @click="resetQuiz"
            class="text-xs text-stone-500 hover:text-stone-800 underline"
          >
            Retry Quiz
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <div 
          v-for="(q, qIdx) in rule.quiz" 
          :key="q.id"
          class="p-4 sm:p-5 rounded-2xl bg-stone-50/70 dark:bg-stone-950/50 border border-stone-200/80 dark:border-stone-800 space-y-3"
        >
          <div class="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Question {{ qIdx + 1 }} of {{ rule.quiz.length }}
          </div>
          <div class="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
            {{ q.question }}
          </div>

          <!-- Options -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <button
              v-for="(opt, optIdx) in q.options"
              :key="optIdx"
              type="button"
              @click="selectOption(q.id, optIdx)"
              :disabled="submitted[q.id]"
              :class="[
                'p-3 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all border flex items-center justify-between gap-2',
                !submitted[q.id] 
                  ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 hover:border-sky-400 dark:hover:border-sky-600 text-stone-800 dark:text-stone-200' 
                  : optIdx === q.correctIndex
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                    : userAnswers[q.id] === optIdx
                      ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 opacity-60 text-stone-500'
              ]"
            >
              <span>{{ opt }}</span>
              <Check v-if="submitted[q.id] && optIdx === q.correctIndex" class="w-4 h-4 text-emerald-600 shrink-0" />
            </button>
          </div>

          <!-- Explanation after submission -->
          <div 
            v-if="submitted[q.id]" 
            class="p-3 rounded-xl text-xs leading-relaxed"
            :class="userAnswers[q.id] === q.correctIndex 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800'"
          >
            <strong>{{ userAnswers[q.id] === q.correctIndex ? '✓ Correct!' : '✗ Explanation:' }}</strong>
            {{ q.explanation }}
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 6: ADJACENT NAVIGATION & RELATED RULES -->
    <section class="space-y-6">
      <!-- Circular Prev / Next -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Prev -->
        <router-link
          v-if="rule.prevRule"
          :to="`/grammar/${rule.prevRule.slug}`"
          class="p-4 rounded-2xl bg-white/80 dark:bg-stone-900/85 border border-stone-200/90 dark:border-stone-800 hover:border-sky-400 dark:hover:border-sky-600 transition-all flex items-center gap-3 group shadow-xs"
        >
          <ArrowLeft class="w-5 h-5 text-stone-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors shrink-0" />
          <div class="overflow-hidden">
            <div class="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              Previous Rule (HSK {{ rule.prevRule.level }})
            </div>
            <div class="text-sm font-bold text-stone-900 dark:text-stone-100 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {{ rule.prevRule.title }}
            </div>
          </div>
        </router-link>

        <!-- Next -->
        <router-link
          v-if="rule.nextRule"
          :to="`/grammar/${rule.nextRule.slug}`"
          class="p-4 rounded-2xl bg-white/80 dark:bg-stone-900/85 border border-stone-200/90 dark:border-stone-800 hover:border-sky-400 dark:hover:border-sky-600 transition-all flex items-center justify-between gap-3 group shadow-xs text-right sm:text-right"
        >
          <div class="overflow-hidden text-left sm:text-right flex-1">
            <div class="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              Next Rule (HSK {{ rule.nextRule.level }})
            </div>
            <div class="text-sm font-bold text-stone-900 dark:text-stone-100 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {{ rule.nextRule.title }}
            </div>
          </div>
          <ArrowRight class="w-5 h-5 text-stone-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors shrink-0" />
        </router-link>
      </div>

      <!-- 4 Related Rules Grid -->
      <div v-if="rule.relatedRules && rule.relatedRules.length > 0" class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 class="text-lg font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <GraduationCap class="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <span>Related Grammar Points to Explore</span>
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <router-link
            v-for="rel in rule.relatedRules"
            :key="rel.slug"
            :to="`/grammar/${rel.slug}`"
            class="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800 hover:border-sky-400 dark:hover:border-sky-600 transition-all space-y-1.5 group"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="text-xs font-bold text-sky-600 dark:text-sky-400">
                HSK {{ rel.level }} • {{ rel.category }}
              </span>
              <span class="text-xs text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-200">
                Read Guide →
              </span>
            </div>
            <div class="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {{ rel.title }}
            </div>
            <div class="text-xs font-mono text-stone-500 dark:text-stone-400 truncate">
              {{ rel.pattern }}
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- PINTEREST CARD MODAL -->
    <StudyCardPinModal
      v-if="rule"
      :show="showPinModal"
      type="grammar"
      :level="rule.level"
      :title="rule.title"
      :subtitle="rule.category"
      :pattern="rule.pattern"
      :englishMeaning="rule.explanation"
      :exampleZh="rule.examples[0]?.zh"
      :examplePy="rule.examples[0]?.py"
      :exampleEn="rule.examples[0]?.en"
      :canonicalUrl="`https://mybwn.com/grammar/${rule.slug}`"
      :slug="rule.slug"
      @close="showPinModal = false"
    />

  </div>
</template>
