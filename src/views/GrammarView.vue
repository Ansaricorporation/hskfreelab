<script setup lang="ts">
import { ref, computed } from 'vue';
import { FileText, Sparkles, AlertTriangle, Lightbulb, Volume2 } from 'lucide-vue-next';
import { grammarData } from '../data';
import { HskLevel } from '../types';
import AudioButton from '../components/ui/AudioButton.vue';
import LevelBadge from '../components/ui/LevelBadge.vue';

const selectedLevel = ref<number | 'all'>('all');

const filteredGrammar = computed(() => {
  if (selectedLevel.value === 'all') return grammarData;
  return grammarData.filter(g => g.level === selectedLevel.value);
});
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-10 pb-16">
    <!-- Header (Boxed Card) -->
    <div class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs font-semibold">
        <FileText class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
        <span>Grammar Reference Compendium</span>
      </div>
      <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
        Essential HSK 1–3 Grammar Points
      </h1>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
        Formula patterns, practical examples, common mistakes to avoid, and native speech audio.
      </p>
    </div>

    <!-- Filter Pills (Responsive, Non-breaking) -->
    <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
      <button 
        @click="selectedLevel = 'all'"
        :class="[
          'px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0',
          selectedLevel === 'all' 
            ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs font-bold' 
            : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700'
        ]"
      >
        All Grammar
      </button>
      <button 
        v-for="lvl in [1, 2, 3]" 
        :key="lvl"
        @click="selectedLevel = lvl"
        :class="[
          'px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0',
          selectedLevel === lvl 
            ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs font-bold' 
            : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700'
        ]"
      >
        <span class="whitespace-nowrap">HSK&nbsp;{{ lvl }}</span>
      </button>
    </div>

    <!-- Grammar Cards List -->
    <div class="space-y-6">
      <div 
        v-for="item in filteredGrammar" 
        :key="item.id"
        class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-8 space-y-5 transition-all"
      >
        <!-- Card Header -->
        <div class="flex items-start justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <LevelBadge :level="item.level" size="sm" />
              <span class="text-xs text-stone-400 dark:text-stone-500 font-mono">{{ item.slug }}</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
              {{ item.title }}
            </h2>
          </div>
        </div>

        <!-- Pattern Formula Box -->
        <div class="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60">
          <div class="text-[11px] font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider mb-1">Sentence Pattern Formula:</div>
          <div class="font-mono text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">{{ item.pattern }}</div>
        </div>

        <!-- Explanation -->
        <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {{ item.explanation }}
        </p>

        <!-- Examples List -->
        <div class="space-y-2 pt-2">
          <div class="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Example Sentences:</div>
          <div 
            v-for="(eg, eIdx) in item.examples" 
            :key="eIdx"
            class="p-3 rounded-xl bg-stone-50/80 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 flex items-center justify-between"
          >
            <div>
              <div class="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">{{ eg.zh }}</div>
              <div class="text-xs font-semibold text-rose-700 dark:text-rose-400">{{ eg.py }}</div>
              <div class="text-xs text-stone-500 dark:text-stone-400 italic">{{ eg.en }}</div>
            </div>
            <AudioButton :text="eg.zh" size="sm" />
          </div>
        </div>

        <!-- Pitfalls & Tips -->
        <div class="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div v-if="item.commonMistake" class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 space-y-1">
            <div class="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
              <AlertTriangle class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Common Pitfall</span>
            </div>
            <p class="text-stone-700 dark:text-stone-300 leading-relaxed">{{ item.commonMistake }}</p>
          </div>

          <div v-if="item.tip" class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 space-y-1">
            <div class="font-bold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
              <Lightbulb class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Pro Tip</span>
            </div>
            <p class="text-stone-700 dark:text-stone-300 leading-relaxed">{{ item.tip }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
