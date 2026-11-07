<script setup lang="ts">
import { 
  TrendingUp, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  HardDrive, 
  ArrowRight,
  Flame
} from 'lucide-vue-next';
import { 
  totalLearnedWordsCount, 
  overallProgressPercent, 
  hsk1LearnedCount, 
  hsk1ProgressPercent, 
  hsk2LearnedCount, 
  hsk2ProgressPercent, 
  hsk3LearnedCount, 
  hsk3ProgressPercent, 
  completedLessonsCount, 
  completedMockTestsCount,
  openBackupModal
} from '../../stores/auth';
</script>

<template>
  <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-md p-6 sm:p-8 space-y-6 transition-all">
    
    <!-- Top Row: Title & Account Status -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
          <TrendingUp class="w-4 h-4" />
          <span>Active Learning Progress</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
          Track Your Learning Journey
        </h3>
        <p class="text-xs text-stone-500 dark:text-stone-400">
          Mark vocabulary words as learned, complete lessons, and pass mock tests. Everything is saved automatically in this browser.
        </p>
      </div>

      <!-- Browser Storage & Backup CTA -->
      <div class="shrink-0">
        <button 
          @click="openBackupModal"
          class="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs active:scale-98"
        >
          <HardDrive class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Browser Data & Backup</span>
        </button>
      </div>
    </div>

    <!-- Main Progress Bar (603 Words Total) -->
    <div class="space-y-2">
      <div class="flex items-center justify-between text-xs font-bold">
        <span class="text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
          <Flame class="w-4 h-4 text-amber-500" />
          <span>Total Words Mastered</span>
        </span>
        <span class="text-stone-900 dark:text-stone-100 font-black">
          {{ totalLearnedWordsCount }} <span class="text-stone-400 font-normal">/ 603 words ({{ overallProgressPercent }}%)</span>
        </span>
      </div>

      <div class="w-full h-3.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden p-0.5">
        <div 
          class="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 rounded-full transition-all duration-500 shadow-xs"
          :style="{ width: `${overallProgressPercent}%` }"
        ></div>
      </div>
    </div>

    <!-- Level Breakdown 3 Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
      
      <!-- HSK 1 -->
      <div class="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800 space-y-2">
        <div class="flex items-center justify-between text-xs font-bold">
          <span class="text-emerald-700 dark:text-emerald-400 whitespace-nowrap">HSK&nbsp;1</span>
          <span class="text-stone-800 dark:text-stone-200 whitespace-nowrap">{{ hsk1LearnedCount }} / 153</span>
        </div>
        <div class="w-full h-2 rounded-full bg-stone-200/80 dark:bg-stone-700 overflow-hidden">
          <div class="h-full bg-emerald-500 rounded-full transition-all duration-300" :style="{ width: `${hsk1ProgressPercent}%` }"></div>
        </div>
        <div class="text-[11px] text-stone-500 dark:text-stone-400 text-right">{{ hsk1ProgressPercent }}% Complete</div>
      </div>

      <!-- HSK 2 -->
      <div class="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800 space-y-2">
        <div class="flex items-center justify-between text-xs font-bold">
          <span class="text-sky-700 dark:text-sky-400 whitespace-nowrap">HSK&nbsp;2</span>
          <span class="text-stone-800 dark:text-stone-200 whitespace-nowrap">{{ hsk2LearnedCount }} / 150</span>
        </div>
        <div class="w-full h-2 rounded-full bg-stone-200/80 dark:bg-stone-700 overflow-hidden">
          <div class="h-full bg-sky-500 rounded-full transition-all duration-300" :style="{ width: `${hsk2ProgressPercent}%` }"></div>
        </div>
        <div class="text-[11px] text-stone-500 dark:text-stone-400 text-right">{{ hsk2ProgressPercent }}% Complete</div>
      </div>

      <!-- HSK 3 -->
      <div class="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800 space-y-2">
        <div class="flex items-center justify-between text-xs font-bold">
          <span class="text-rose-700 dark:text-rose-400 whitespace-nowrap">HSK&nbsp;3</span>
          <span class="text-stone-800 dark:text-stone-200 whitespace-nowrap">{{ hsk3LearnedCount }} / 300</span>
        </div>
        <div class="w-full h-2 rounded-full bg-stone-200/80 dark:bg-stone-700 overflow-hidden">
          <div class="h-full bg-rose-500 rounded-full transition-all duration-300" :style="{ width: `${hsk3ProgressPercent}%` }"></div>
        </div>
        <div class="text-[11px] text-stone-500 dark:text-stone-400 text-right">{{ hsk3ProgressPercent }}% Complete</div>
      </div>

    </div>

    <!-- Quick stats footer -->
    <div class="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-1.5">
          <BookOpen class="w-4 h-4 text-emerald-600" />
          <span>{{ completedLessonsCount }} of 30 Lessons Read</span>
        </span>
        <span class="flex items-center gap-1.5">
          <Award class="w-4 h-4 text-purple-600" />
          <span>{{ completedMockTestsCount }} of 30 Mock Tests Taken</span>
        </span>
      </div>

      <router-link to="/hsk-1" class="text-rose-600 dark:text-rose-400 font-bold hover:underline flex items-center gap-1">
        <span>Study Vocabulary</span> <ArrowRight class="w-3.5 h-3.5" />
      </router-link>
    </div>

  </div>
</template>
