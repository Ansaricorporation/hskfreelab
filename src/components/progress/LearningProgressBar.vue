<script setup lang="ts">
import { ref } from 'vue';
import { 
  TrendingUp, 
  ChevronDown, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Sparkles,
  HardDrive
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

const isDropdownOpen = ref(false);
</script>

<template>
  <div class="relative">
    <!-- Compact Header Progress Pill -->
    <button 
      @click="isDropdownOpen = !isDropdownOpen"
      class="px-2 sm:px-2.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-rose-300 dark:hover:border-rose-700 transition-all flex items-center gap-1 sm:gap-1.5 shadow-xs group shrink-0"
      title="View Learning Progress"
    >
      <div class="flex items-center gap-1 text-xs font-bold text-stone-800 dark:text-stone-200 shrink-0">
        <TrendingUp class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
        <span class="hidden 2xl:inline whitespace-nowrap">Progress:</span>
        <span class="text-rose-600 dark:text-rose-400 whitespace-nowrap">{{ totalLearnedWordsCount }}</span>
        <span class="text-[10px] text-stone-400 whitespace-nowrap">/ 603</span>
      </div>

      <!-- Mini visual progress line -->
      <div class="hidden sm:block w-8 lg:w-10 xl:w-12 h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden shrink-0">
        <div 
          class="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-300"
          :style="{ width: `${overallProgressPercent}%` }"
        ></div>
      </div>

      <span class="text-[10px] sm:text-[11px] font-black text-stone-700 dark:text-stone-200 whitespace-nowrap shrink-0">{{ overallProgressPercent }}%</span>
      <ChevronDown class="w-3 h-3 text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-transform shrink-0" :class="{ 'rotate-180': isDropdownOpen }" />
    </button>

    <!-- Dropdown Progress Summary Popover -->
    <div 
      v-if="isDropdownOpen"
      @mouseleave="isDropdownOpen = false"
      class="absolute right-0 mt-2 w-72 sm:w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-5 z-50 animate-in fade-in slide-in-from-top-1 space-y-4"
    >
      <!-- Popover Header -->
      <div class="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
        <div>
          <div class="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            <Sparkles class="w-3.5 h-3.5 text-amber-500" />
            <span>Learning Progress Dashboard</span>
          </div>
          <div class="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span>Auto-Saved in Browser (100% Private)</span>
          </div>
        </div>

        <span class="text-xs font-black px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
          {{ overallProgressPercent }}% Total
        </span>
      </div>

      <!-- Level by Level Progress Bars -->
      <div class="space-y-3 text-xs">
        <!-- HSK 1 -->
        <div class="space-y-1">
          <div class="flex justify-between font-semibold text-stone-700 dark:text-stone-300">
            <span class="whitespace-nowrap">HSK&nbsp;1 Vocabulary</span>
            <span class="whitespace-nowrap">{{ hsk1LearnedCount }} / 153 words ({{ hsk1ProgressPercent }}%)</span>
          </div>
          <div class="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <div class="h-full bg-emerald-500 rounded-full transition-all duration-300" :style="{ width: `${hsk1ProgressPercent}%` }"></div>
          </div>
        </div>

        <!-- HSK 2 -->
        <div class="space-y-1">
          <div class="flex justify-between font-semibold text-stone-700 dark:text-stone-300">
            <span class="whitespace-nowrap">HSK&nbsp;2 Vocabulary</span>
            <span class="whitespace-nowrap">{{ hsk2LearnedCount }} / 150 words ({{ hsk2ProgressPercent }}%)</span>
          </div>
          <div class="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <div class="h-full bg-sky-500 rounded-full transition-all duration-300" :style="{ width: `${hsk2ProgressPercent}%` }"></div>
          </div>
        </div>

        <!-- HSK 3 -->
        <div class="space-y-1">
          <div class="flex justify-between font-semibold text-stone-700 dark:text-stone-300">
            <span class="whitespace-nowrap">HSK&nbsp;3 Vocabulary</span>
            <span class="whitespace-nowrap">{{ hsk3LearnedCount }} / 300 words ({{ hsk3ProgressPercent }}%)</span>
          </div>
          <div class="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <div class="h-full bg-rose-500 rounded-full transition-all duration-300" :style="{ width: `${hsk3ProgressPercent}%` }"></div>
          </div>
        </div>
      </div>

      <!-- Lessons & Mock Tests Stats Grid -->
      <div class="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
        <div class="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60">
          <div class="text-[10px] text-stone-400 font-bold uppercase">Lessons Read</div>
          <div class="text-sm font-black text-stone-900 dark:text-stone-100 mt-0.5">
            {{ completedLessonsCount }} / 30
          </div>
        </div>

        <div class="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60">
          <div class="text-[10px] text-stone-400 font-bold uppercase">Mock Tests Taken</div>
          <div class="text-sm font-black text-stone-900 dark:text-stone-100 mt-0.5">
            {{ completedMockTestsCount }} / 30
          </div>
        </div>
      </div>

      <!-- Browser Storage & Backup CTA -->
      <div class="pt-2">
        <button 
          @click="isDropdownOpen = false; openBackupModal()"
          class="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
        >
          <HardDrive class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Browser Data, Backup & JSON Export</span>
        </button>
      </div>
    </div>
  </div>
</template>
