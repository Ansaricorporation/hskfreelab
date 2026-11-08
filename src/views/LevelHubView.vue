<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { 
  BookOpen, 
  Award, 
  FileText, 
  Layers, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-vue-next';
import { HskLevel } from '../types';
import { getVocabByLevel, getLessonsByLevel, getGrammarByLevel, getMockTestByLevel } from '../data';
import VocabTable from '../components/vocab/VocabTable.vue';
import LevelBadge from '../components/ui/LevelBadge.vue';
import { 
  hsk1LearnedCount, 
  hsk1ProgressPercent,
  hsk2LearnedCount, 
  hsk2ProgressPercent,
  hsk3LearnedCount, 
  hsk3ProgressPercent 
} from '../stores/auth';

const route = useRoute();

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
</script>

<template>
  <div class="space-y-12 pb-16">
    
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
          <router-link 
            to="/mock-tests" 
            class="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-rose-700 dark:hover:bg-rose-600 text-white dark:text-stone-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Award class="w-3.5 h-3.5" />
            <span>Take HSK {{ currentLevel }} Mock Exam Gates</span>
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

      <VocabTable :vocabList="vocabList" :level="currentLevel" />
    </div>

  </div>
</template>
