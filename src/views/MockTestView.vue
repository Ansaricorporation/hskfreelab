<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  Volume2, 
  BookOpen, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  Play
} from 'lucide-vue-next';
import { getMockTestsByLevel, getMockTestByLevelAndSlug } from '../data';
import MockTestEngine from '../components/tools/MockTestEngine.vue';
import LevelBadge from '../components/ui/LevelBadge.vue';
import { HskLevel, MockTest } from '../types';

const route = useRoute();
const router = useRouter();

const selectedLevel = ref<HskLevel>(1);
const selectedCategory = ref<'all' | 'listening' | 'reading'>('all');

watch(() => route.params.level, (lvl) => {
  if (lvl) {
    const num = parseInt(String(lvl).replace(/\D/g, ''));
    if (num === 1 || num === 2 || num === 3) {
      selectedLevel.value = num as HskLevel;
    }
  }
}, { immediate: true });

// Check if currently inside a specific test gate route: /mock-test/:level/:id
const isGateActive = computed(() => {
  return !!route.params.level && !!route.params.id;
});

const activeTest = computed<MockTest | undefined>(() => {
  if (!isGateActive.value) return undefined;
  const levelParam = route.params.level as string;
  const idParam = route.params.id as string;
  return getMockTestByLevelAndSlug(levelParam, idParam);
});

const levelTests = computed(() => {
  let list = getMockTestsByLevel(selectedLevel.value);
  if (selectedCategory.value !== 'all') {
    list = list.filter(t => t.category === selectedCategory.value);
  }
  return list;
});

function enterGate(test: MockTest) {
  router.push(`/mock-test/hsk${test.level}/${test.slug}`);
}

function exitGate() {
  router.push('/mock-test');
}
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-10 pb-16">
    
    <!-- IF INSIDE A SPECIFIC TEST GATE: RENDER TEST ENGINE -->
    <div v-if="isGateActive && activeTest" class="space-y-6 animate-in fade-in">
      <div class="flex items-center justify-between">
        <button 
          @click="exitGate" 
          class="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-950 transition-colors"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Exit to HSK {{ activeTest.level }} Test Gates</span>
        </button>

        <div class="flex items-center gap-2">
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 font-bold text-stone-700 capitalize">
            Gate {{ activeTest.gateNumber }}: {{ activeTest.category }}
          </span>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">
            {{ activeTest.difficulty }}
          </span>
        </div>
      </div>

      <MockTestEngine :key="activeTest.id" :mockTest="activeTest" />
    </div>

    <!-- GATE NOT FOUND FALLBACK -->
    <div v-else-if="isGateActive && !activeTest" class="text-center py-16 space-y-4">
      <div class="text-xl font-bold text-stone-900">Test gate not found.</div>
      <button @click="exitGate" class="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold">
        Return to All Gates
      </button>
    </div>

    <!-- MAIN TEST GATES DIRECTORY (10 TESTS PER LEVEL) -->
    <div v-else class="space-y-10 animate-in fade-in">
      
      <!-- Directory Header (Enclosed in Boxed Card) -->
      <div class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-4 sm:p-8 text-center space-y-4 shadow-sm">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300 text-xs font-semibold">
          <Award class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span>Official Syllabus Exam Simulation</span>
        </div>
        <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          HSK Examination Test Gates
        </h1>
        <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Ten structured test gates per level. Five listening assessments and five reading evaluations, engineered under timed conditions with automatic submission.
        </p>

        <!-- Friendly user tip banner -->
        <div class="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 dark:border-amber-800/60 text-amber-950 dark:text-amber-200 text-xs max-w-xl mx-auto shadow-2xs text-left">
          <Sparkles class="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span><strong>One-Page Experience:</strong> Tap Play on any gate to begin. All questions display on a single page with live timer and audio dialogue controls.</span>
        </div>
      </div>

      <!-- Level Switcher Tabs -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        
        <!-- HSK 1, 2, 3 Tabs (Non-breaking, Responsive Pill Bar) -->
        <div class="flex items-center gap-1 sm:gap-2 p-1.5 bg-stone-100 dark:bg-stone-800/90 rounded-2xl w-full sm:w-auto shrink-0 shadow-inner">
          <button 
            @click="selectedLevel = 1"
            :class="[
              'flex-1 sm:flex-initial px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap text-center shrink-0',
              selectedLevel === 1 
                ? 'bg-white dark:bg-stone-700 text-emerald-800 dark:text-emerald-300 shadow-xs font-black' 
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            ]"
          >
            <span class="whitespace-nowrap">HSK&nbsp;1</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 shrink-0">10</span>
          </button>

          <button 
            @click="selectedLevel = 2"
            :class="[
              'flex-1 sm:flex-initial px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap text-center shrink-0',
              selectedLevel === 2 
                ? 'bg-white dark:bg-stone-700 text-sky-800 dark:text-sky-300 shadow-xs font-black' 
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            ]"
          >
            <span class="whitespace-nowrap">HSK&nbsp;2</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-300 shrink-0">10</span>
          </button>

          <button 
            @click="selectedLevel = 3"
            :class="[
              'flex-1 sm:flex-initial px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap text-center shrink-0',
              selectedLevel === 3 
                ? 'bg-white dark:bg-stone-700 text-rose-800 dark:text-rose-300 shadow-xs font-black' 
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            ]"
          >
            <span class="whitespace-nowrap">HSK&nbsp;3</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300 shrink-0">10</span>
          </button>
        </div>

        <!-- Section Category Filter -->
        <div class="flex items-center gap-1.5 text-xs overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span class="text-stone-400 dark:text-stone-500 font-semibold uppercase tracking-wider text-[10px] mr-1 whitespace-nowrap">Section:</span>
          <button 
            @click="selectedCategory = 'all'"
            :class="[
              'px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap',
              selectedCategory === 'all' 
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold' 
                : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
            ]"
          >
            All Gates (10)
          </button>
          <button 
            @click="selectedCategory = 'listening'"
            :class="[
              'px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 whitespace-nowrap',
              selectedCategory === 'listening' 
                ? 'bg-rose-600 text-white font-bold' 
                : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60'
            ]"
          >
            <Volume2 class="w-3.5 h-3.5" />
            <span>Listening (5)</span>
          </button>
          <button 
            @click="selectedCategory = 'reading'"
            :class="[
              'px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 whitespace-nowrap',
              selectedCategory === 'reading' 
                ? 'bg-sky-600 text-white font-bold' 
                : 'bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/60'
            ]"
          >
            <BookOpen class="w-3.5 h-3.5" />
            <span>Reading (5)</span>
          </button>
        </div>

      </div>

      <!-- Test Gates Cards Grid (10 Gates per Level) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="test in levelTests" 
          :key="test.id"
          class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-xl transition-all p-6 flex flex-col justify-between group"
        >
          <div class="space-y-4">
            <!-- Header badges -->
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider" :class="test.category === 'listening' ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800' : 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'">
                <Volume2 v-if="test.category === 'listening'" class="w-3 h-3" />
                <BookOpen v-else class="w-3 h-3" />
                <span>{{ test.category }} Gate {{ test.gateNumber }}</span>
              </span>

              <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 uppercase">
                {{ test.difficulty }}
              </span>
            </div>

            <!-- Title & Description -->
            <div>
              <h3 class="text-lg font-black text-stone-900 dark:text-stone-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors leading-snug">
                {{ test.title }}
              </h3>
              <p class="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
                {{ test.description }}
              </p>
            </div>

            <!-- Exam Specs details -->
            <div class="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                  <Clock class="w-3.5 h-3.5 text-stone-400" /> Time Limit:
                </span>
                <strong class="text-stone-900 dark:text-stone-100">{{ test.timeMinutes }} Minutes (Auto-Submit)</strong>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                  <Target class="w-3.5 h-3.5 text-stone-400" /> Pass Cutoff:
                </span>
                <strong class="text-emerald-700 dark:text-emerald-400">{{ test.passingScore }} / {{ test.totalScore }} pts</strong>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                  <Zap class="w-3.5 h-3.5 text-stone-400" /> Questions:
                </span>
                <span class="text-stone-800 dark:text-stone-200 font-semibold">{{ test.questions.length }} Items</span>
              </div>
            </div>
          </div>

          <!-- Enter Gate Button -->
          <div class="pt-5 mt-2">
            <button 
              @click="enterGate(test)"
              class="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95 group-hover:shadow-md"
              :class="test.category === 'listening' ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20' : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20'"
            >
              <Play class="w-3.5 h-3.5 fill-current" />
              <span>Start Gate {{ test.gateNumber }} (Play Test)</span>
            </button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
