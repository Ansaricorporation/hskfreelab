<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  BookOpen, 
  Volume2, 
  PenTool, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  ArrowLeft, 
  ArrowRight, 
  Layers, 
  HelpCircle, 
  Award, 
  ChevronRight,
  FileText,
  Compass,
  Check
} from 'lucide-vue-next';
import { 
  getWordBySlug, 
  getAdjacentWords, 
  getConstituentCharacters, 
  getToneBreakdown, 
  getSharedCharacterFamily, 
  getWordCorpusAppearances, 
  getWordUsageGuide, 
  getWordPracticeQuiz,
  type VocabItemWithSlug
} from '../data/vocab-helpers.ts';
import StrokeAnimator from '../components/tools/StrokeAnimator.vue';
import LevelBadge from '../components/ui/LevelBadge.vue';
import { playAudio, playSlowAudio } from '../utils/speech';
import { updateSeoMeta } from '../utils/seo';
import { isWordLearned, toggleLearnedWord } from '../stores/auth';

const route = useRoute();
const router = useRouter();

const slug = computed(() => route.params.slug as string);

const word = computed<VocabItemWithSlug | undefined>(() => {
  return getWordBySlug(slug.value);
});

// Fallback redirect if slug invalid
watch(
  () => word.value,
  (val) => {
    if (!val && slug.value) {
      router.replace('/words');
    }
  },
  { immediate: true }
);

// Constituent Hanzi characters for multi-character tab switcher
const constituentChars = computed(() => {
  return word.value ? getConstituentCharacters(word.value.hanzi) : [];
});

const activeStrokeChar = ref<string>('');

watch(
  () => constituentChars.value,
  (chars) => {
    if (chars.length > 0) {
      activeStrokeChar.value = chars[0];
    }
  },
  { immediate: true }
);

// Adjacent navigation
const adjacent = computed(() => {
  return slug.value ? getAdjacentWords(slug.value) : undefined;
});

// Tone breakdown & sandhi
const toneData = computed(() => {
  return word.value ? getToneBreakdown(word.value) : undefined;
});

// Word family
const family = computed(() => {
  return word.value ? getSharedCharacterFamily(word.value, 8) : [];
});

// Corpus appearances in lessons & grammar
const corpusMatches = computed(() => {
  return word.value ? getWordCorpusAppearances(word.value) : [];
});

// Usage guide
const usageGuide = computed(() => {
  return word.value ? getWordUsageGuide(word.value) : undefined;
});

// Practice quiz
const quizQuestions = computed(() => {
  return word.value ? getWordPracticeQuiz(word.value) : [];
});

const userAnswers = ref<Record<number, number>>({});
const showQuizAnswers = ref<Record<number, boolean>>({});

function selectOption(qId: number, optIdx: number) {
  userAnswers.value[qId] = optIdx;
  showQuizAnswers.value[qId] = true;
}

// Reset quiz state when word changes
watch(
  () => slug.value,
  () => {
    userAnswers.value = {};
    showQuizAnswers.value = {};
  }
);

// SEO Metadata & JSON-LD schema
watch(
  () => word.value,
  (w) => {
    if (!w) return;
    const title = `${w.hanzi} (${w.pinyin}) Meaning in English, Stroke Order & HSK ${w.level} Sentences | HSK Free Lab`;
    const description = `Learn Chinese word ${w.hanzi} (${w.pinyin}): English meaning "${w.meaning}", animated stroke order, HSK ${w.level} audio pronunciation, grammar collocations, and practice quiz.`;
    const canonical = `https://mybwn.com/words/${w.slug}`;

    updateSeoMeta({
      title,
      description,
      canonical,
      type: 'article'
    }, route.path);

    // Inject JSON-LD Schema
    const scriptId = 'word-jsonld-schema';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'DefinedTerm',
          '@id': `https://mybwn.com/words/${w.slug}#term`,
          'name': w.hanzi,
          'alternateName': w.pinyin,
          'description': w.meaning,
          'inDefinedTermSet': {
            '@type': 'DefinedTermSet',
            'name': `HSK Level ${w.level} Vocabulary Syllabus`,
            'url': `https://mybwn.com/hsk-${w.level}`
          }
        },
        {
          '@type': 'LearningResource',
          '@id': `https://mybwn.com/words/${w.slug}#resource`,
          'name': `${w.hanzi} (${w.pinyin}) - HSK ${w.level} Chinese Word Study Guide`,
          'description': description,
          'educationalLevel': `HSK ${w.level}`,
          'learningResourceType': 'Study Guide',
          'inLanguage': ['zh-Hans', 'en'],
          'provider': {
            '@type': 'Organization',
            'name': 'HSK Free Lab',
            'url': 'https://mybwn.com/'
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `https://mybwn.com/words/${w.slug}#breadcrumb`,
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
              'name': `HSK ${w.level} Hub`,
              'item': `https://mybwn.com/hsk-${w.level}`
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': 'Words Directory',
              'item': 'https://mybwn.com/words'
            },
            {
              '@type': 'ListItem',
              'position': 4,
              'name': `${w.hanzi} (${w.pinyin})`,
              'item': `https://mybwn.com/words/${w.slug}`
            }
          ]
        }
      ]
    };

    scriptEl.textContent = JSON.stringify(schema);
  },
  { immediate: true }
);

function getCefr(level: number): string {
  if (level === 1) return 'A1 (Breakthrough)';
  if (level === 2) return 'A2 (Waystage)';
  return 'B1 (Threshold)';
}
</script>

<template>
  <div v-if="word" class="max-w-4xl mx-auto space-y-10 pb-16">
    
    <!-- Breadcrumb Navigation -->
    <nav aria-label="Breadcrumb" class="text-xs text-stone-500 dark:text-stone-400">
      <ol class="flex items-center gap-1.5 flex-wrap">
        <li>
          <router-link to="/" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Home</router-link>
        </li>
        <li class="flex items-center gap-1.5">
          <ChevronRight class="w-3 h-3 text-stone-400" />
          <router-link :to="`/hsk-${word.level}`" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
            HSK {{ word.level }} Hub
          </router-link>
        </li>
        <li class="flex items-center gap-1.5">
          <ChevronRight class="w-3 h-3 text-stone-400" />
          <router-link to="/words" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
            Vocabulary Directory
          </router-link>
        </li>
        <li class="flex items-center gap-1.5 text-stone-900 dark:text-stone-100 font-bold" aria-current="page">
          <ChevronRight class="w-3 h-3 text-stone-400" />
          <span>{{ word.hanzi }} ({{ word.pinyin }})</span>
        </li>
      </ol>
    </nav>

    <!-- HERO LEXICON CARD -->
    <header class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      
      <!-- Badges row -->
      <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div class="flex items-center gap-2 flex-wrap">
          <LevelBadge :level="word.level" size="md" />
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
            CEFR {{ getCefr(word.level) }}
          </span>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 capitalize">
            {{ word.partOfSpeech }}
          </span>
          <span v-if="word.radical" class="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
            Radical: {{ word.radical }}
          </span>
          <span v-if="word.strokeCount" class="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300">
            {{ word.strokeCount }} Strokes
          </span>
        </div>

        <!-- Learned Status Button -->
        <button 
          @click="toggleLearnedWord(word.id)"
          class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs active:scale-95"
          :class="isWordLearned(word.id)
            ? 'bg-emerald-600 text-white' 
            : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300'"
        >
          <CheckCircle2 v-if="isWordLearned(word.id)" class="w-4 h-4" />
          <Circle v-else class="w-4 h-4 text-stone-400" />
          <span>{{ isWordLearned(word.id) ? 'Learned in Browser' : 'Mark as Learned' }}</span>
        </button>
      </div>

      <!-- Main Word Presentation -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div class="space-y-2">
          <div class="flex items-baseline gap-4 flex-wrap">
            <h1 class="font-serif font-black text-5xl sm:text-6xl text-stone-900 dark:text-stone-100 tracking-tight">
              {{ word.hanzi }}
            </h1>
            <span class="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
              {{ word.pinyin }}
            </span>
          </div>
          <div class="text-xl sm:text-2xl font-bold text-stone-800 dark:text-stone-200">
            {{ word.meaning }}
          </div>
        </div>

        <!-- Audio controls (Normal 1.0x and Turtle 0.7x) -->
        <div class="flex items-center gap-2 self-start sm:self-center bg-stone-50 dark:bg-stone-800/80 p-2 rounded-2xl border border-stone-200/80 dark:border-stone-700 shrink-0">
          <button
            type="button"
            @click="playAudio(word.hanzi, 1.0)"
            class="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-stone-800 dark:text-stone-100 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Listen to standard native pronunciation (1.0x)"
          >
            <Volume2 class="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>Normal (1.0x)</span>
          </button>

          <button
            type="button"
            @click="playSlowAudio(word.hanzi)"
            class="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 hover:bg-amber-50 dark:hover:bg-amber-950/60 text-stone-800 dark:text-stone-100 hover:text-amber-700 dark:hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Listen to slow beginner pronunciation (0.6x)"
          >
            <span>🐢 Turtle (0.6x)</span>
          </button>
        </div>
      </div>

      <!-- Quick summary note -->
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed pt-2 border-t border-stone-100 dark:border-stone-800">
        <strong>Overview:</strong> 「{{ word.hanzi }}」 ({{ word.pinyin }}) is an essential <strong>HSK {{ word.level }}</strong> {{ word.partOfSpeech }} meaning <em>"{{ word.meaning }}"</em>. Master its stroke order, tone contour, primary collocations, and practice exam questions below.
      </p>
    </header>

    <!-- MULTI-CHARACTER STROKE ORDER STUDIO -->
    <section class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <PenTool class="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <span>Stroke Order Animation &amp; Writing Studio</span>
          </h2>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Official stroke sequences for constituent characters. Watch real-time animations or switch to quiz mode to draw each stroke.
          </p>
        </div>

        <!-- Multi-character tab picker if compound word -->
        <div v-if="constituentChars.length > 1" class="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 p-1.5 rounded-2xl shrink-0">
          <span class="text-[11px] font-bold text-stone-400 px-2">Character:</span>
          <button
            v-for="char in constituentChars"
            :key="char"
            @click="activeStrokeChar = char"
            :class="[
              'w-9 h-9 font-serif font-black text-lg rounded-xl transition-all',
              activeStrokeChar === char
                ? 'bg-rose-600 text-white shadow-2xs scale-105'
                : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:text-rose-600'
            ]"
          >
            {{ char }}
          </button>
        </div>
      </div>

      <!-- Stroke Animator Component -->
      <div class="py-2">
        <StrokeAnimator 
          v-if="activeStrokeChar" 
          :key="activeStrokeChar" 
          :initialCharacter="activeStrokeChar" 
          :size="280" 
        />
      </div>

      <!-- Link to full screen stroke order tool -->
      <div class="text-center pt-2">
        <router-link
          :to="`/stroke-order/${encodeURIComponent(activeStrokeChar || word.hanzi.charAt(0))}`"
          class="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1"
        >
          <span>Open Full-Screen Stroke Canvas for 「{{ activeStrokeChar }}」</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </router-link>
      </div>
    </section>

    <!-- TONE CONTOUR & PHONETIC BREAKDOWN -->
    <section v-if="toneData" class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div class="pb-4 border-b border-stone-100 dark:border-stone-800">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Sparkles class="w-5 h-5 text-amber-500" />
          <span>Pinyin Tone Contour &amp; Sandhi Rules</span>
        </h2>
        <p class="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Detailed pitch height, tone contour numbers, and continuous speech tone modification rules.
        </p>
      </div>

      <!-- Syllable cards grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(syllable, idx) in toneData.syllables"
          :key="idx"
          class="p-4 rounded-2xl bg-stone-50/70 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-700/60 space-y-2"
        >
          <div class="flex items-center justify-between">
            <span class="font-serif text-3xl font-black text-stone-900 dark:text-stone-100">
              {{ syllable.hanziChar }}
            </span>
            <span class="text-base font-bold text-rose-600 dark:text-rose-400">
              {{ syllable.pinyin }}
            </span>
          </div>

          <div class="text-xs font-bold text-stone-800 dark:text-stone-200">
            {{ syllable.toneName }} · Pitch {{ syllable.tonePitch }}
          </div>

          <p class="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
            {{ syllable.toneDescription }}
          </p>

          <button
            type="button"
            @click="playAudio(syllable.hanziChar)"
            class="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 pt-1"
          >
            <Volume2 class="w-3 h-3" />
            <span>Hear syllable isolated</span>
          </button>
        </div>
      </div>

      <!-- Tone Sandhi Alert if applicable -->
      <div v-if="toneData.sandhiRules.length > 0" class="space-y-2">
        <div
          v-for="(rule, rIdx) in toneData.sandhiRules"
          :key="rIdx"
          class="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1"
        >
          <div class="font-bold flex items-center gap-1.5">
            <Sparkles class="w-4 h-4 text-amber-600 shrink-0" />
            <span>Tone Modification (Sandhi) Rule</span>
          </div>
          <p class="leading-relaxed">{{ rule }}</p>
        </div>
      </div>
    </section>

    <!-- CONTEXTUAL EXAMPLE SENTENCES & CORPUS -->
    <section class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div class="pb-4 border-b border-stone-100 dark:border-stone-800">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <BookOpen class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Real-World Example Sentences &amp; Exam Dialogue</span>
        </h2>
        <p class="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Authentic exam sentences and lesson dialogues showing how 「{{ word.hanzi }}」 functions in context.
        </p>
      </div>

      <!-- Primary syllabus example -->
      <div class="p-5 rounded-2xl bg-stone-50/80 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/70 space-y-2">
        <div class="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider">
          <span>Official Syllabus Example</span>
          <button
            type="button"
            @click="playAudio(word.exampleZh)"
            class="text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 lowercase font-semibold"
          >
            <Volume2 class="w-3.5 h-3.5" />
            <span>listen</span>
          </button>
        </div>
        <div class="font-serif font-black text-xl text-stone-900 dark:text-stone-100">
          {{ word.exampleZh }}
        </div>
        <div class="text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400">
          {{ word.examplePy }}
        </div>
        <div class="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
          {{ word.exampleEn }}
        </div>
      </div>

      <!-- Lesson & Grammar Corpus Appearances -->
      <div v-if="corpusMatches.length > 0" class="space-y-3 pt-2">
        <h3 class="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          Appearances in HSK Lessons &amp; Grammar Rules ({{ corpusMatches.length }})
        </h3>
        
        <div class="space-y-3">
          <div
            v-for="(match, mIdx) in corpusMatches"
            :key="mIdx"
            class="p-4 rounded-2xl bg-white dark:bg-stone-800/70 border border-stone-200/70 dark:border-stone-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:border-rose-300 dark:hover:border-rose-700"
          >
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 uppercase">
                  {{ match.source === 'lesson' ? 'Dialogue' : 'Grammar Point' }}
                </span>
                <router-link
                  :to="match.source === 'lesson' ? `/lessons/${match.slug}` : '/grammar'"
                  class="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
                >
                  {{ match.title }} &rarr;
                </router-link>
              </div>

              <div class="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                {{ match.zh }}
              </div>
              <div class="text-[11px] text-rose-600 dark:text-rose-400">{{ match.py }}</div>
              <div class="text-xs text-stone-500 dark:text-stone-400">{{ match.en }}</div>
            </div>

            <button
              type="button"
              @click="playAudio(match.zh)"
              class="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-700 hover:bg-rose-50 dark:hover:bg-rose-950 text-stone-700 dark:text-stone-200 hover:text-rose-600 flex items-center justify-center shrink-0 self-start sm:self-center"
              :aria-label="`Listen to line: ${match.zh}`"
            >
              <Volume2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- GRAMMAR & USAGE GUIDE -->
    <section v-if="usageGuide" class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div class="pb-4 border-b border-stone-100 dark:border-stone-800">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <FileText class="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Grammar Patterns, Syntactic Role &amp; Exam Tips</span>
        </h2>
        <p class="text-xs text-stone-500 dark:text-stone-400 mt-1">
          How to correctly position 「{{ word.hanzi }}」 in Mandarin sentences without grammatical errors.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Syntactic Formula -->
        <div class="p-5 rounded-2xl bg-stone-50/70 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-700/60 space-y-2">
          <div class="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Syntactic Formula</div>
          <div class="font-mono text-sm font-bold text-rose-700 dark:text-rose-300 bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-200/60 dark:border-stone-800">
            {{ usageGuide.syntacticPattern }}
          </div>
          <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pt-1">
            {{ usageGuide.grammaticalRole }}
          </p>
        </div>

        <!-- HSK Exam Strategy Tips -->
        <div class="p-5 rounded-2xl bg-stone-50/70 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-700/60 space-y-2">
          <div class="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Award class="w-4 h-4" />
            <span>HSK {{ word.level }} Exam Strategy</span>
          </div>
          <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            {{ usageGuide.examTips }}
          </p>
        </div>
      </div>
    </section>

    <!-- SHARED-CHARACTER WORD FAMILY & RADICAL NETWORK -->
    <section v-if="family.length > 0" class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div class="pb-4 border-b border-stone-100 dark:border-stone-800">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Layers class="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <span>Shared-Character Word Family &amp; Radical Network</span>
        </h2>
        <p class="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Accelerate your vocabulary acquisition by connecting related compound words that share characters or radicals with 「{{ word.hanzi }}」.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link
          v-for="item in family"
          :key="item.word.slug"
          :to="`/words/${item.word.slug}`"
          class="p-4 rounded-2xl bg-stone-50/70 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-700/60 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300">
                Shared: {{ item.sharedElement }}
              </span>
              <span class="text-[10px] font-bold text-stone-400">HSK {{ item.word.level }}</span>
            </div>

            <div class="font-serif font-black text-2xl text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              {{ item.word.hanzi }}
            </div>
            <div class="text-xs font-bold text-rose-600 dark:text-rose-400">
              {{ item.word.pinyin }}
            </div>
            <div class="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
              {{ item.word.meaning }}
            </div>
          </div>

          <div class="pt-3 mt-3 border-t border-stone-200/50 dark:border-stone-700/50 text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center justify-between">
            <span>Study Word</span>
            <ArrowRight class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </router-link>
      </div>
    </section>

    <!-- INTERACTIVE 3-QUESTION PRACTICE QUIZ -->
    <section v-if="quizQuestions.length > 0" class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div class="pb-4 border-b border-stone-100 dark:border-stone-800">
        <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <HelpCircle class="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <span>Interactive 3-Question Practice Quiz</span>
        </h2>
        <p class="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Test your retention of definition, tone pronunciation, and sentence cloze context for 「{{ word.hanzi }}」.
        </p>
      </div>

      <div class="space-y-6">
        <div
          v-for="(q, qIndex) in quizQuestions"
          :key="q.id"
          class="p-5 rounded-2xl bg-stone-50/70 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-700/60 space-y-4"
        >
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold flex items-center justify-center shrink-0">
              {{ qIndex + 1 }}
            </span>
            <div class="text-sm font-bold text-stone-900 dark:text-stone-100">
              {{ q.question }}
            </div>
          </div>

          <!-- Options grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              v-for="(opt, optIdx) in q.options"
              :key="optIdx"
              type="button"
              @click="selectOption(q.id, optIdx)"
              :disabled="showQuizAnswers[q.id]"
              :class="[
                'p-3 rounded-xl text-xs font-semibold text-left border transition-all flex items-center justify-between gap-2',
                showQuizAnswers[q.id]
                  ? (optIdx === q.correctIndex
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold'
                      : (userAnswers[q.id] === optIdx
                          ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-200'
                          : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-400 opacity-60'))
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700/80 text-stone-800 dark:text-stone-200 hover:border-rose-400 hover:bg-rose-50/30'
              ]"
            >
              <span>{{ opt }}</span>
              <Check v-if="showQuizAnswers[q.id] && optIdx === q.correctIndex" class="w-4 h-4 text-emerald-600 shrink-0" />
            </button>
          </div>

          <!-- Explanation display -->
          <div
            v-if="showQuizAnswers[q.id]"
            class="p-3 rounded-xl text-xs leading-relaxed"
            :class="userAnswers[q.id] === q.correctIndex
              ? 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
              : 'bg-rose-500/10 text-rose-900 dark:text-rose-200 border border-rose-300 dark:border-rose-800'"
          >
            <div class="font-bold pb-0.5">
              {{ userAnswers[q.id] === q.correctIndex ? '✓ Correct Answer!' : '✗ Needs Review:' }}
            </div>
            <div>{{ q.explanation }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ADJACENT SYLLABUS NAVIGATION -->
    <nav v-if="adjacent" aria-label="Adjacent words" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <router-link
        :to="`/words/${adjacent.prev.slug}`"
        class="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700 shadow-xs hover:shadow-md transition-all group flex items-center justify-between"
      >
        <div class="space-y-1">
          <div class="text-[11px] font-bold text-stone-400 flex items-center gap-1">
            <ArrowLeft class="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            <span>Previous Word</span>
          </div>
          <div class="font-serif font-black text-xl text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400">
            {{ adjacent.prev.hanzi }} <span class="text-sm font-normal text-stone-500">({{ adjacent.prev.pinyin }})</span>
          </div>
          <div class="text-xs text-stone-500 dark:text-stone-400 truncate max-w-xs">{{ adjacent.prev.meaning }}</div>
        </div>
      </router-link>

      <router-link
        :to="`/words/${adjacent.next.slug}`"
        class="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-700 shadow-xs hover:shadow-md transition-all group flex items-center justify-between text-right"
      >
        <div class="space-y-1 ml-auto">
          <div class="text-[11px] font-bold text-stone-400 flex items-center justify-end gap-1">
            <span>Next Word</span>
            <ArrowRight class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div class="font-serif font-black text-xl text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400">
            {{ adjacent.next.hanzi }} <span class="text-sm font-normal text-stone-500">({{ adjacent.next.pinyin }})</span>
          </div>
          <div class="text-xs text-stone-500 dark:text-stone-400 truncate max-w-xs ml-auto">{{ adjacent.next.meaning }}</div>
        </div>
      </router-link>
    </nav>

    <!-- QUICK CURRICULUM HUBS -->
    <div class="p-6 rounded-3xl bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
      <div class="text-stone-600 dark:text-stone-300">
        Explore related resources for HSK {{ word.level }}:
      </div>
      <div class="flex items-center gap-3 flex-wrap">
        <router-link :to="`/hsk-${word.level}`" class="text-rose-600 dark:text-rose-400 hover:underline">
          HSK {{ word.level }} Level Hub &rarr;
        </router-link>
        <router-link to="/words" class="text-rose-600 dark:text-rose-400 hover:underline">
          Master 603 Words Directory &rarr;
        </router-link>
        <router-link to="/lessons" class="text-rose-600 dark:text-rose-400 hover:underline">
          All 30 Lessons &rarr;
        </router-link>
        <router-link to="/mock-tests" class="text-rose-600 dark:text-rose-400 hover:underline">
          Timed Mock Tests &rarr;
        </router-link>
      </div>
    </div>

  </div>
</template>
