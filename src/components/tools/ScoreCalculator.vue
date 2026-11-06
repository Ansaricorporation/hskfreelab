<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  Calculator, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  BookOpen, 
  Award,
  RotateCcw
} from 'lucide-vue-next';
import { HskLevel } from '../../types';

const selectedLevel = ref<HskLevel>(1);
const listeningScore = ref<number>(75);
const readingScore = ref<number>(70);
const writingScore = ref<number>(65);

const maxScore = computed(() => selectedLevel.value === 3 ? 300 : 200);
const passingThreshold = computed(() => selectedLevel.value === 3 ? 180 : 120);

const totalScore = computed(() => {
  if (selectedLevel.value === 3) {
    return Number(listeningScore.value) + Number(readingScore.value) + Number(writingScore.value);
  }
  return Number(listeningScore.value) + Number(readingScore.value);
});

const percentage = computed(() => {
  return Math.round((totalScore.value / maxScore.value) * 100);
});

const isPassed = computed(() => totalScore.value >= passingThreshold.value);

const cefrLevel = computed(() => {
  if (selectedLevel.value === 1) return isPassed.value ? 'A1 (Breakthrough)' : 'Below A1';
  if (selectedLevel.value === 2) return isPassed.value ? 'A2 (Waystage)' : 'A1';
  return isPassed.value ? 'B1 (Threshold)' : 'A2';
});

const diagnosis = computed(() => {
  const recommendations: string[] = [];

  if (listeningScore.value < 60) {
    recommendations.push('Listening is below 60%. Prioritize our audio mock tests and daily Pinyin tone drills.');
  } else if (listeningScore.value >= 85) {
    recommendations.push('Outstanding listening comprehension! You grasp native cadences well.');
  }

  if (readingScore.value < 60) {
    recommendations.push('Reading speed and character recognition need work. Review high-frequency flashcards daily.');
  } else if (readingScore.value >= 85) {
    recommendations.push('Excellent reading ability! You quickly identify syntax patterns and Hanzi.');
  }

  if (selectedLevel.value === 3 && writingScore.value < 60) {
    recommendations.push('Writing section is falling behind. Practice unscrambling sentence word orders (把 / 被 structures).');
  }

  if (recommendations.length === 0) {
    recommendations.push('Well-balanced performance across all evaluated sections. Continue regular timed mock drills.');
  }

  return recommendations;
});

function resetScores() {
  listeningScore.value = 75;
  readingScore.value = 70;
  writingScore.value = 65;
}
</script>

<template>
  <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-4 sm:p-8 max-w-2xl mx-auto transition-all">
    <!-- Header -->
    <div class="flex items-center justify-between pb-5 border-b border-stone-100 dark:border-stone-800">
      <div class="flex items-center gap-3">
        <div class="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
          <Calculator class="w-6 h-6" />
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">HSK Score Calculator</h2>
          <p class="text-xs text-stone-500 dark:text-stone-400">Official scoring benchmark for HSK 1, 2, and 3</p>
        </div>
      </div>
      <button 
        @click="resetScores" 
        class="text-xs text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 flex items-center gap-1 transition-colors"
        title="Reset to default values"
      >
        <RotateCcw class="w-3.5 h-3.5" />
        <span>Reset</span>
      </button>
    </div>

    <!-- Level Selector Tabs -->
    <div class="mt-5 grid grid-cols-3 gap-1.5 p-1.5 bg-stone-100 dark:bg-stone-800/90 rounded-2xl">
      <button 
        @click="selectedLevel = 1"
        :class="[
          'py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 whitespace-nowrap shrink-0',
          selectedLevel === 1 
            ? 'bg-white dark:bg-stone-700 text-emerald-800 dark:text-emerald-300 shadow-xs font-black' 
            : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
        ]"
      >
        <span class="whitespace-nowrap">HSK&nbsp;1</span>
        <span class="text-[10px] sm:text-xs opacity-75 font-normal whitespace-nowrap">(120/200)</span>
      </button>
      <button 
        @click="selectedLevel = 2"
        :class="[
          'py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 whitespace-nowrap shrink-0',
          selectedLevel === 2 
            ? 'bg-white dark:bg-stone-700 text-sky-800 dark:text-sky-300 shadow-xs font-black' 
            : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
        ]"
      >
        <span class="whitespace-nowrap">HSK&nbsp;2</span>
        <span class="text-[10px] sm:text-xs opacity-75 font-normal whitespace-nowrap">(120/200)</span>
      </button>
      <button 
        @click="selectedLevel = 3"
        :class="[
          'py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 whitespace-nowrap shrink-0',
          selectedLevel === 3 
            ? 'bg-white dark:bg-stone-700 text-rose-800 dark:text-rose-300 shadow-xs font-black' 
            : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
        ]"
      >
        <span class="whitespace-nowrap">HSK&nbsp;3</span>
        <span class="text-[10px] sm:text-xs opacity-75 font-normal whitespace-nowrap">(180/300)</span>
      </button>
    </div>

    <!-- Inputs Section -->
    <div class="mt-6 space-y-5">
      <!-- Listening Section -->
      <div>
        <div class="flex items-center justify-between text-sm mb-1.5">
          <label class="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
            <span>Listening Score (听力)</span>
            <span class="text-xs text-stone-400 font-normal">Max: 100</span>
          </label>
          <div class="flex items-center gap-2">
            <input 
              type="number" 
              v-model.number="listeningScore" 
              min="0" 
              max="100" 
              class="w-16 text-center font-bold text-sm px-2 py-1 border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:ring-2 focus:ring-amber-500/40 outline-none"
            />
            <span class="text-xs text-stone-400">/ 100</span>
          </div>
        </div>
        <input 
          type="range" 
          v-model.number="listeningScore" 
          min="0" 
          max="100" 
          class="w-full accent-amber-600 h-2 bg-stone-200 dark:bg-stone-700 rounded-lg cursor-pointer"
        />
      </div>

      <!-- Reading Section -->
      <div>
        <div class="flex items-center justify-between text-sm mb-1.5">
          <label class="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
            <span>Reading Score (阅读)</span>
            <span class="text-xs text-stone-400 font-normal">Max: 100</span>
          </label>
          <div class="flex items-center gap-2">
            <input 
              type="number" 
              v-model.number="readingScore" 
              min="0" 
              max="100" 
              class="w-16 text-center font-bold text-sm px-2 py-1 border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:ring-2 focus:ring-amber-500/40 outline-none"
            />
            <span class="text-xs text-stone-400">/ 100</span>
          </div>
        </div>
        <input 
          type="range" 
          v-model.number="readingScore" 
          min="0" 
          max="100" 
          class="w-full accent-amber-600 h-2 bg-stone-200 dark:bg-stone-700 rounded-lg cursor-pointer"
        />
      </div>

      <!-- Writing Section (HSK 3 only) -->
      <div v-if="selectedLevel === 3">
        <div class="flex items-center justify-between text-sm mb-1.5">
          <label class="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
            <span>Writing Score (书写)</span>
            <span class="text-xs text-stone-400 font-normal">Max: 100</span>
          </label>
          <div class="flex items-center gap-2">
            <input 
              type="number" 
              v-model.number="writingScore" 
              min="0" 
              max="100" 
              class="w-16 text-center font-bold text-sm px-2 py-1 border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:ring-2 focus:ring-rose-500/40 outline-none"
            />
            <span class="text-xs text-stone-400">/ 100</span>
          </div>
        </div>
        <input 
          type="range" 
          v-model.number="writingScore" 
          min="0" 
          max="100" 
          class="w-full accent-rose-600 h-2 bg-stone-200 dark:bg-stone-700 rounded-lg cursor-pointer"
        />
      </div>
    </div>

    <!-- Result Banner Card -->
    <div class="mt-8 p-5 rounded-2xl border transition-all" :class="isPassed ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' : 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <CheckCircle2 v-if="isPassed" class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <AlertCircle v-else class="w-6 h-6 text-rose-600 dark:text-rose-400" />
            <span class="text-xl font-black" :class="isPassed ? 'text-emerald-900 dark:text-emerald-200' : 'text-rose-900 dark:text-rose-200'">
              {{ isPassed ? 'OFFICIAL PASS' : 'NEEDS PRACTICE' }}
            </span>
            <span class="text-xs px-2 py-0.5 rounded-full font-bold" :class="isPassed ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100' : 'bg-rose-200 dark:bg-rose-800 text-rose-900 dark:text-rose-100'">
              {{ percentage }}%
            </span>
          </div>
          <p class="text-xs text-stone-600 dark:text-stone-400 mt-1">
            Required passing score: <strong class="text-stone-900 dark:text-stone-100">{{ passingThreshold }} / {{ maxScore }}</strong>
          </p>
        </div>

        <div class="text-center sm:text-right">
          <div class="text-3xl font-black tracking-tight" :class="isPassed ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'">
            {{ totalScore }} <span class="text-sm font-medium text-stone-500 dark:text-stone-400">/ {{ maxScore }}</span>
          </div>
          <div class="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-0.5">
            CEFR Level: <span class="text-stone-800 dark:text-stone-200 font-bold">{{ cefrLevel }}</span>
          </div>
        </div>
      </div>

      <!-- Visual Progress Bar with Threshold Needle -->
      <div class="mt-4 relative">
        <div class="w-full h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
          <div 
            class="h-full transition-all duration-300 rounded-full"
            :class="isPassed ? 'bg-emerald-500' : 'bg-rose-500'"
            :style="{ width: `${Math.min(100, percentage)}%` }"
          ></div>
        </div>
        <!-- 60% mark marker -->
        <div class="absolute top-0 bottom-0 left-[60%] w-0.5 bg-stone-900/60 dark:bg-stone-100/60 z-10" title="Pass threshold (60%)"></div>
      </div>
      <div class="flex justify-between text-[11px] text-stone-400 dark:text-stone-500 mt-1">
        <span>0</span>
        <span class="font-medium text-stone-700 dark:text-stone-300">Pass Line (60%)</span>
        <span>{{ maxScore }}</span>
      </div>
    </div>

    <!-- Recommendations & Diagnosis -->
    <div class="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800">
      <h4 class="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <TrendingUp class="w-4 h-4 text-amber-600 dark:text-amber-400" />
        <span>Personalized Study Recommendations</span>
      </h4>
      <ul class="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
        <li v-for="(item, idx) in diagnosis" :key="idx" class="flex items-start gap-2">
          <span class="text-rose-500 font-bold">•</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
