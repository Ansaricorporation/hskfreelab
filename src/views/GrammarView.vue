<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  FileText, 
  Sparkles, 
  AlertTriangle, 
  Lightbulb, 
  Volume2, 
  Search, 
  ArrowRight, 
  BookOpen,
  CheckCircle2
} from 'lucide-vue-next';
import { all88GrammarRules, type EnrichedGrammarRule } from '../data/grammar-helpers.ts';
import { playAudio } from '../utils/speech';
import LevelBadge from '../components/ui/LevelBadge.vue';

const selectedLevel = ref<number | 'all'>('all');
const searchQuery = ref('');

const allGrammar = all88GrammarRules;

const counts = computed(() => {
  return {
    all: allGrammar.length,
    hsk1: allGrammar.filter(g => g.level === 1).length,
    hsk2: allGrammar.filter(g => g.level === 2).length,
    hsk3: allGrammar.filter(g => g.level === 3).length
  };
});

const filteredGrammar = computed(() => {
  let list = allGrammar;
  if (selectedLevel.value !== 'all') {
    list = list.filter(g => g.level === selectedLevel.value);
  }
  const q = searchQuery.value.trim().toLowerCase();
  if (q) {
    list = list.filter(g => 
      g.title.toLowerCase().includes(q) ||
      g.pattern.toLowerCase().includes(q) ||
      g.explanation.toLowerCase().includes(q) ||
      g.examples.some(e => e.zh.includes(q) || e.py.toLowerCase().includes(q) || e.en.toLowerCase().includes(q))
    );
  }
  return list;
});
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-10 pb-20 px-4">
    <!-- Header (Boxed Card) -->
    <header class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-10 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs font-semibold">
        <FileText class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
        <span>Comprehensive Grammar Compendium</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
        Complete 88-Rule HSK Grammar Syllabus
      </h1>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
        The definitive compendium of all 88 essential sentence structures, function words, disposal patterns, and comparative formulas for HSK 1, 2, and 3.
      </p>
    </header>

    <!-- Search & Filter Controls -->
    <div class="space-y-4 max-w-xl mx-auto">
      <!-- Search Input -->
      <div class="relative">
        <Search class="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search by rule, particle (把, 过, 比, 吗), or keyword..."
          class="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
        />
      </div>

      <!-- Level Filter Pills -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <button 
          type="button"
          @click="selectedLevel = 'all'"
          :class="[
            'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-xs',
            selectedLevel === 'all' 
              ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold' 
              : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
          ]"
        >
          All ({{ counts.all }})
        </button>
        <button 
          v-for="lvl in [1, 2, 3]" 
          :key="lvl"
          type="button"
          @click="selectedLevel = lvl"
          :class="[
            'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-xs',
            selectedLevel === lvl 
              ? lvl === 1 ? 'bg-emerald-600 text-white' : lvl === 2 ? 'bg-sky-600 text-white' : 'bg-rose-600 text-white'
              : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
          ]"
        >
          HSK {{ lvl }} ({{ lvl === 1 ? counts.hsk1 : lvl === 2 ? counts.hsk2 : counts.hsk3 }})
        </button>
      </div>
    </div>

    <!-- Results Meta -->
    <div class="text-xs text-stone-500 dark:text-stone-400 text-center font-medium">
      Showing {{ filteredGrammar.length }} of 88 grammar points
      <span v-if="searchQuery">matching "{{ searchQuery }}"</span>
    </div>

    <!-- Grammar Cards List -->
    <div class="space-y-6">
      <div 
        v-for="item in filteredGrammar" 
        :key="item.id"
        class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-md p-6 sm:p-8 space-y-5 transition-all"
      >
        <!-- Card Header -->
        <div class="flex items-start justify-between gap-4 pb-3 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span 
                :class="[
                  'text-[10px] font-bold px-2 py-0.5 rounded-md border',
                  item.level === 1 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300' 
                    : item.level === 2 
                    ? 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950 dark:text-sky-300' 
                    : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300'
                ]"
              >
                HSK {{ item.level }}
              </span>
              <span class="text-xs text-stone-400 dark:text-stone-500 font-mono">{{ item.id }}</span>
            </div>
            <h2 class="text-lg sm:text-2xl font-black text-stone-900 dark:text-stone-100">
              <router-link :to="`/grammar/${item.slug}`" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                {{ item.title }}
              </router-link>
            </h2>
          </div>
        </div>

        <!-- Pattern Formula Box -->
        <div class="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700">
          <div class="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Sentence Pattern Formula:</div>
          <div class="font-mono text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">{{ item.pattern }}</div>
        </div>

        <!-- Explanation -->
        <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {{ item.explanation }}
        </p>

        <!-- Practical Examples with Audio -->
        <div v-if="item.examples && item.examples.length > 0" class="space-y-2 pt-1">
          <div class="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Example Sentences:</div>
          <div 
            v-for="(ex, exIdx) in item.examples" 
            :key="exIdx"
            class="p-3 rounded-xl bg-stone-50/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between gap-3 text-xs"
          >
            <div class="space-y-0.5">
              <div class="font-serif font-black text-sm text-stone-900 dark:text-stone-100">{{ ex.zh }}</div>
              <div class="font-medium text-rose-600 dark:text-rose-400 text-[11px]">{{ ex.py }}</div>
              <div class="text-stone-500 dark:text-stone-400 text-[11px]">{{ ex.en }}</div>
            </div>
            <button
              type="button"
              @click="playAudio(ex.zh, 0.85)"
              class="w-7 h-7 rounded-lg bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:text-rose-600 flex items-center justify-center transition-colors shadow-2xs shrink-0"
              :aria-label="`Listen to: ${ex.zh}`"
            >
              <Volume2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- Common Mistake Warning -->
        <div v-if="item.commonMistakes && item.commonMistakes.length > 0" class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
          <AlertTriangle class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Common Pitfall:</strong> {{ item.commonMistakes[0] }}
          </div>
        </div>

        <!-- Card Footer: Internal Link to Full Rule and Parent Lesson -->
        <div class="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between flex-wrap gap-2 text-xs">
          <router-link 
            :to="`/grammar/${item.slug}`" 
            class="font-black text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 group"
          >
            <span>Full Grammar Guide & Quiz</span>
            <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </router-link>

          <router-link 
            v-if="item.parentLessonSlug"
            :to="`/lessons/${item.parentLessonSlug}`" 
            class="font-semibold text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:underline flex items-center gap-1"
          >
            <span>Lesson Context: {{ item.parentLessonTitle }} &rarr;</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
