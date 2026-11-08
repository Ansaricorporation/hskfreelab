<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  Search, 
  BookOpen, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  ArrowRight,
  Layers,
  Filter
} from 'lucide-vue-next';
import { allVocabWithSlugs, type VocabItemWithSlug } from '../data/vocab-helpers.ts';
import LevelBadge from '../components/ui/LevelBadge.vue';
import { playAudio, playSlowAudio } from '../utils/speech';
import { isWordLearned, toggleLearnedWord } from '../stores/auth';
import type { HskLevel } from '../types';

const searchQuery = ref('');
const activeLevel = ref<'all' | HskLevel>('all');
const activePos = ref<string>('all');
const progressFilter = ref<'all' | 'learned' | 'unlearned'>('all');

const partsOfSpeech = computed(() => {
  const set = new Set<string>();
  allVocabWithSlugs.forEach(w => {
    if (w.partOfSpeech) set.add(w.partOfSpeech.toLowerCase());
  });
  return ['all', ...Array.from(set)];
});

const filteredWords = computed<VocabItemWithSlug[]>(() => {
  let list = allVocabWithSlugs;

  if (activeLevel.value !== 'all') {
    list = list.filter(w => w.level === activeLevel.value);
  }

  if (activePos.value !== 'all') {
    list = list.filter(w => w.partOfSpeech.toLowerCase().includes(activePos.value));
  }

  if (progressFilter.value === 'learned') {
    list = list.filter(w => isWordLearned(w.id));
  } else if (progressFilter.value === 'unlearned') {
    list = list.filter(w => !isWordLearned(w.id));
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    list = list.filter(w => 
      w.hanzi.includes(q) ||
      w.pinyin.toLowerCase().includes(q) ||
      w.meaning.toLowerCase().includes(q)
    );
  }

  return list;
});

const counts = computed(() => {
  return {
    total: allVocabWithSlugs.length,
    hsk1: allVocabWithSlugs.filter(w => w.level === 1).length,
    hsk2: allVocabWithSlugs.filter(w => w.level === 2).length,
    hsk3: allVocabWithSlugs.filter(w => w.level === 3).length
  };
});
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-8 pb-16">
    
    <!-- Hero Header -->
    <header class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-10 shadow-sm text-center space-y-4">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold">
        <BookOpen class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
        <span>Official HSK 1–3 Complete Lexicon</span>
      </div>

      <h1 class="text-3xl sm:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
        Master Chinese Vocabulary Directory
      </h1>

      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
        Comprehensive study portal for all <strong>603 official HSK 1, 2, and 3 words</strong>. Click any Chinese character to explore dedicated stroke order animations, audio pronunciations, grammar collocations, and practice quizzes.
      </p>

      <!-- Level Switcher Tabs -->
      <div class="flex items-center justify-center gap-2 pt-2 flex-wrap">
        <button
          @click="activeLevel = 'all'"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition-all',
            activeLevel === 'all'
              ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-2xs'
              : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300'
          ]"
        >
          All Levels ({{ counts.total }})
        </button>

        <button
          @click="activeLevel = 1"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition-all',
            activeLevel === 1
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300'
          ]"
        >
          HSK 1 ({{ counts.hsk1 }} Words)
        </button>

        <button
          @click="activeLevel = 2"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition-all',
            activeLevel === 2
              ? 'bg-sky-600 text-white shadow-2xs'
              : 'bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 text-sky-800 dark:text-sky-300'
          ]"
        >
          HSK 2 ({{ counts.hsk2 }} Words)
        </button>

        <button
          @click="activeLevel = 3"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition-all',
            activeLevel === 3
              ? 'bg-rose-600 text-white shadow-2xs'
              : 'bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-800 dark:text-rose-300'
          ]"
        >
          HSK 3 ({{ counts.hsk3 }} Words)
        </button>
      </div>
    </header>

    <!-- Search & Filter Controls -->
    <div class="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs p-4 sm:p-5 space-y-4">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Search input -->
        <div class="relative w-full md:w-96">
          <Search class="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search Hanzi, Pinyin, English meaning..."
            class="w-full pl-10 pr-4 py-2.5 text-sm border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-xl focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 outline-none transition-all"
          />
        </div>

        <!-- Progress filters -->
        <div class="flex items-center gap-1.5 self-start md:self-auto text-xs">
          <span class="text-stone-400 font-semibold uppercase tracking-wider text-[10px] mr-1">Status:</span>
          <button
            @click="progressFilter = 'all'"
            :class="[
              'px-3 py-1.5 rounded-lg font-semibold transition-colors',
              progressFilter === 'all'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
            ]"
          >
            All
          </button>
          <button
            @click="progressFilter = 'learned'"
            :class="[
              'px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1',
              progressFilter === 'learned'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100'
            ]"
          >
            <CheckCircle2 class="w-3.5 h-3.5" />
            <span>Learned</span>
          </button>
          <button
            @click="progressFilter = 'unlearned'"
            :class="[
              'px-3 py-1.5 rounded-lg font-semibold transition-colors',
              progressFilter === 'unlearned'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
            ]"
          >
            To Learn
          </button>
        </div>
      </div>

      <!-- Parts of speech pills -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span class="text-stone-400 font-semibold uppercase tracking-wider text-[10px] mr-1 shrink-0">Type:</span>
        <button
          v-for="pos in partsOfSpeech"
          :key="pos"
          @click="activePos = pos"
          :class="[
            'px-2.5 py-1 rounded-lg capitalize whitespace-nowrap transition-colors font-medium',
            activePos === pos
              ? 'bg-rose-600 text-white font-semibold'
              : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300'
          ]"
        >
          {{ pos }}
        </button>
        <span class="text-stone-400 dark:text-stone-500 text-xs ml-auto whitespace-nowrap pl-2">
          Showing {{ filteredWords.length }} of {{ counts.total }}
        </span>
      </div>
    </div>

    <!-- WORDS GRID -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="word in filteredWords"
        :key="word.slug"
        class="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 p-4 shadow-xs hover:shadow-md hover:border-rose-300 dark:hover:border-rose-700 transition-all flex flex-col justify-between group"
        :class="{ 'bg-emerald-50/15 dark:bg-emerald-950/10 border-emerald-300/80 dark:border-emerald-800/80': isWordLearned(word.id) }"
      >
        <div class="space-y-2">
          <!-- Top row -->
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 uppercase">
              HSK {{ word.level }} · {{ word.partOfSpeech }}
            </span>

            <div class="flex items-center gap-1">
              <button
                type="button"
                @click="playAudio(word.hanzi)"
                class="p-1 rounded-md text-stone-400 hover:text-rose-600 transition-colors"
                :aria-label="`Listen to ${word.hanzi}`"
              >
                <Volume2 class="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                @click="playSlowAudio(word.hanzi)"
                class="px-1 text-[10px] text-stone-400 hover:text-amber-600 transition-colors"
                title="Slow audio"
              >
                🐢
              </button>
              <button
                type="button"
                @click="toggleLearnedWord(word.id)"
                class="p-1 text-stone-300 hover:text-emerald-600 transition-colors"
                :title="isWordLearned(word.id) ? 'Mark as not learned' : 'Mark as learned'"
              >
                <CheckCircle2 v-if="isWordLearned(word.id)" class="w-4 h-4 text-emerald-600" />
                <Circle v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Hanzi and Pinyin -->
          <div>
            <router-link
              :to="`/words/${word.slug}`"
              class="font-serif font-black text-3xl text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors block"
            >
              {{ word.hanzi }}
            </router-link>
            <div class="text-xs font-bold text-rose-600 dark:text-rose-400 mt-0.5">
              {{ word.pinyin }}
            </div>
          </div>

          <!-- Meaning -->
          <p class="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
            {{ word.meaning }}
          </p>
        </div>

        <!-- Footer link -->
        <div class="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400 dark:text-stone-500">
          <span v-if="word.radical">Radical: {{ word.radical }}</span>
          <span v-else>HSK {{ word.level }}</span>

          <router-link
            :to="`/words/${word.slug}`"
            class="text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
          >
            Study Guide <ArrowRight class="w-3 h-3" />
          </router-link>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="filteredWords.length === 0" class="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-8 space-y-3">
      <div class="text-3xl">🔍</div>
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100">No matching words found</h3>
      <p class="text-xs text-stone-500">Try clearing your search query or selecting a different level or part of speech.</p>
      <button
        @click="searchQuery = ''; activeLevel = 'all'; activePos = 'all'; progressFilter = 'all'"
        class="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold"
      >
        Reset All Filters
      </button>
    </div>

  </div>
</template>
