<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  BookOpen, 
  Volume2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Layers,
  Award
} from 'lucide-vue-next';
import { lessonsData } from '../data/lessons.ts';
import { activeProgress } from '../stores/auth';
import type { Lesson, HskLevel } from '../types';

const selectedLevel = ref<HskLevel | 'all'>('all');

const filteredLessons = computed(() => {
  if (selectedLevel.value === 'all') return lessonsData;
  return lessonsData.filter(l => l.level === selectedLevel.value);
});

function isLessonCompleted(slug: string): boolean {
  return activeProgress.value.completedLessons.includes(slug);
}

const completionCount = computed(() => {
  return lessonsData.filter(l => isLessonCompleted(l.slug)).length;
});
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-12 pb-24 px-4">
    
    <!-- Header (Boxed Hero Card) -->
    <header class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-10 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
        <GraduationCap class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>Official Curriculum &bull; 30 Core Units</span>
      </div>

      <h1 class="text-3xl sm:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
        Interactive HSK Lessons Curriculum
      </h1>

      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
        Step-by-step Mandarin Chinese dialogues, enriched vocabulary breakdowns, grammar formula explanations, and interactive quizzes for HSK 1, 2, and 3.
      </p>

      <div class="pt-2 flex items-center justify-center gap-4 text-xs font-semibold text-stone-500 dark:text-stone-400">
        <span class="flex items-center gap-1.5">
          <BookOpen class="w-4 h-4 text-emerald-600" /> 30 Units
        </span>
        <span>&bull;</span>
        <span class="flex items-center gap-1.5">
          <Layers class="w-4 h-4 text-sky-600" /> 88 Grammar Patterns
        </span>
        <span>&bull;</span>
        <span class="flex items-center gap-1.5">
          <CheckCircle2 class="w-4 h-4 text-rose-600" /> {{ completionCount }} / 30 Completed
        </span>
      </div>
    </header>

    <!-- Level Filter Tabs -->
    <div class="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
      <button 
        type="button"
        @click="selectedLevel = 'all'"
        :class="[
          'py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs',
          selectedLevel === 'all' 
            ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900' 
            : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50'
        ]"
      >
        All 30 Units
      </button>

      <button 
        v-for="lvl in [1, 2, 3]" 
        :key="lvl"
        type="button"
        @click="selectedLevel = lvl as HskLevel"
        :class="[
          'py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs',
          selectedLevel === lvl 
            ? lvl === 1 ? 'bg-emerald-600 text-white' : lvl === 2 ? 'bg-sky-600 text-white' : 'bg-rose-600 text-white'
            : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50'
        ]"
      >
        HSK {{ lvl }} (10 Units)
      </button>
    </div>

    <!-- Units Grid (30 Distinct Cards) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link
        v-for="(lesson, idx) in filteredLessons" 
        :key="lesson.id"
        :to="`/lessons/${lesson.slug}`"
        class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 shadow-xs hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all flex flex-col justify-between group"
      >
        <div class="space-y-3.5">
          <div class="flex items-center justify-between">
            <span 
              :class="[
                'text-[10px] font-bold px-2.5 py-0.5 rounded-full border',
                lesson.level === 1 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                  : lesson.level === 2
                  ? 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
                  : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
              ]"
            >
              HSK {{ lesson.level }} &bull; Unit {{ (idx % 10) + 1 }}
            </span>

            <span 
              v-if="isLessonCompleted(lesson.slug)"
              class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 class="w-3.5 h-3.5" /> Done
            </span>
          </div>

          <h2 class="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
            {{ lesson.title }}
          </h2>

          <p class="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
            {{ lesson.description }}
          </p>

          <div class="flex items-center gap-2 flex-wrap pt-1 text-[11px] text-stone-500 dark:text-stone-400">
            <span class="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800">
              {{ lesson.dialogue.length }} Dialogue Lines
            </span>
            <span class="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800">
              {{ lesson.keyVocab.length }} Vocab Words
            </span>
            <span class="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800">
              {{ lesson.grammarPoints.length }} Grammar Rules
            </span>
          </div>
        </div>

        <div class="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
          <span>Start Lesson</span>
          <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </router-link>
    </div>

    <!-- Curriculum Footer Summary -->
    <div class="p-8 rounded-3xl bg-stone-100/80 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 text-center space-y-3">
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100">
        Ready to Test Your Knowledge?
      </h3>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
        Complement your lesson practice with our 30 full-length timed mock exams featuring native audio dialogues and real-time score grading.
      </p>
      <div class="pt-2">
        <router-link 
          to="/mock-tests" 
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:bg-stone-800 transition-colors"
        >
          <span>Take a Timed Mock Exam</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </router-link>
      </div>
    </div>

  </div>
</template>
