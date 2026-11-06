<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { 
  Search, 
  Volume2, 
  PenTool, 
  Layers, 
  Table as TableIcon, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  Check
} from 'lucide-vue-next';
import { VocabItem, HskLevel } from '../../types';
import AudioButton from '../ui/AudioButton.vue';
import LevelBadge from '../ui/LevelBadge.vue';
import FlashcardDeck from './FlashcardDeck.vue';
import { isWordLearned, toggleLearnedWord } from '../../stores/auth';
import { playSlowAudio } from '../../utils/speech';

function getPinyinToneColor(py: string): string {
  if (/[āēīōūǖ]/.test(py)) return 'text-rose-600 dark:text-rose-400';
  if (/[áéíóúǘ]/.test(py)) return 'text-emerald-600 dark:text-emerald-400';
  if (/[ǎěǐǒǔǚ]/.test(py)) return 'text-indigo-600 dark:text-indigo-400';
  if (/[àèìòùǜ]/.test(py)) return 'text-amber-600 dark:text-amber-400';
  return 'text-stone-600 dark:text-stone-300';
}

const props = defineProps<{
  vocabList: VocabItem[];
  level: HskLevel;
}>();

const router = useRouter();
const searchQuery = ref('');
const selectedPos = ref<string>('all');
const progressFilter = ref<'all' | 'learned' | 'unlearned'>('all');
const viewMode = ref<'table' | 'cards' | 'flashcards'>('table');
const expandedRowId = ref<string | null>(null);

const partsOfSpeech = computed(() => {
  const set = new Set<string>();
  props.vocabList.forEach(item => {
    if (item.partOfSpeech) {
      set.add(item.partOfSpeech.toLowerCase());
    }
  });
  return ['all', ...Array.from(set)];
});

const filteredList = computed(() => {
  let list = props.vocabList;

  if (selectedPos.value !== 'all') {
    list = list.filter(item => item.partOfSpeech.toLowerCase().includes(selectedPos.value));
  }

  if (progressFilter.value === 'learned') {
    list = list.filter(item => isWordLearned(item.id));
  } else if (progressFilter.value === 'unlearned') {
    list = list.filter(item => !isWordLearned(item.id));
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    list = list.filter(item => 
      item.hanzi.includes(q) ||
      item.pinyin.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q)
    );
  }

  return list;
});

function toggleExpandRow(id: string) {
  expandedRowId.value = expandedRowId.value === id ? null : id;
}

function openStrokeOrder(character: string) {
  const firstChar = character.charAt(0);
  router.push({ path: '/stroke-order', query: { char: firstChar } });
}
</script>

<template>
  <div class="space-y-4">
    
    <!-- Beginner-Friendly Helper Notice -->
    <div class="px-4 py-3 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 flex flex-wrap items-center justify-between gap-2.5 text-xs text-amber-900 dark:text-amber-200">
      <div class="flex items-center gap-2">
        <Sparkles class="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
        <span><strong>Beginner Tips:</strong> Click 🔊 for native audio, 🐢 for slow syllable speed, and click ✓ to mark words as learned. Everything auto-saves to your browser!</span>
      </div>
      <div class="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 shrink-0">
        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <span>Browser Auto-Saved</span>
      </div>
    </div>
    
    <!-- Controls Bar -->
    <div class="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
      
      <!-- Search Input -->
      <div class="relative w-full md:w-80">
        <Search class="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search Hanzi, Pinyin, English..." 
          class="w-full pl-10 pr-4 py-2 text-sm border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-xl focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 outline-none transition-all"
        />
      </div>

      <!-- View Switcher -->
      <div class="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl w-full sm:w-auto justify-center">
        <button 
          @click="viewMode = 'table'" 
          :class="[
            'px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all',
            viewMode === 'table' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
          ]"
        >
          <TableIcon class="w-3.5 h-3.5" />
          <span>Table View</span>
        </button>

        <button 
          @click="viewMode = 'cards'" 
          :class="[
            'px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all',
            viewMode === 'cards' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
          ]"
        >
          <Sparkles class="w-3.5 h-3.5" />
          <span>Cards</span>
        </button>

        <button 
          @click="viewMode = 'flashcards'" 
          :class="[
            'px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all',
            viewMode === 'flashcards' ? 'bg-white dark:bg-stone-700 text-rose-700 dark:text-rose-300 shadow-xs font-bold' : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
          ]"
        >
          <Layers class="w-3.5 h-3.5" />
          <span>Flashcard Mode</span>
        </button>
      </div>

    </div>

    <!-- Filter Pills (POS & Learned Progress) -->
    <div v-if="viewMode !== 'flashcards'" class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      
      <!-- Progress Filter Toggle (All / Learned / To Learn) -->
      <div class="flex items-center gap-1.5">
        <span class="text-stone-400 font-semibold uppercase tracking-wider text-[10px] mr-1">Status:</span>
        <button 
          @click="progressFilter = 'all'"
          :class="[
            'px-3 py-1 rounded-lg font-semibold transition-colors',
            progressFilter === 'all' ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
          ]"
        >
          All
        </button>
        <button 
          @click="progressFilter = 'learned'"
          :class="[
            'px-3 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1',
            progressFilter === 'learned' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100'
          ]"
        >
          <CheckCircle2 class="w-3.5 h-3.5" />
          <span>Learned</span>
        </button>
        <button 
          @click="progressFilter = 'unlearned'"
          :class="[
            'px-3 py-1 rounded-lg font-semibold transition-colors',
            progressFilter === 'unlearned' ? 'bg-amber-600 text-white' : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
          ]"
        >
          To Learn
        </button>
      </div>

      <!-- Part of speech pills -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button 
          v-for="pos in partsOfSpeech" 
          :key="pos"
          @click="selectedPos = pos"
          :class="[
            'px-2.5 py-1 rounded-lg capitalize whitespace-nowrap transition-colors font-medium',
            selectedPos === pos ? 'bg-rose-600 text-white font-semibold' : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300'
          ]"
        >
          {{ pos }}
        </button>
        <span class="text-stone-400 dark:text-stone-500 text-xs ml-auto whitespace-nowrap">
          {{ filteredList.length }} / {{ vocabList.length }} words
        </span>
      </div>

    </div>

    <!-- FLASHCARD VIEW -->
    <div v-if="viewMode === 'flashcards'" class="py-4">
      <FlashcardDeck :vocabList="filteredList" />
    </div>

    <!-- TABLE VIEW -->
    <div v-else-if="viewMode === 'table'" class="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-sm">
          <thead>
            <tr class="bg-stone-50/80 dark:bg-stone-800/60 border-b border-stone-200/80 dark:border-stone-700 text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              <th class="py-3 px-3 w-12 text-center" title="Mark as learned to track progress">Learned</th>
              <th class="py-3 px-3 w-12 text-center">Audio</th>
              <th class="py-3 px-4">Character</th>
              <th class="py-3 px-4">Pinyin</th>
              <th class="py-3 px-4">Meaning</th>
              <th class="py-3 px-4 hidden sm:table-cell">Type</th>
              <th class="py-3 px-4 text-right">Practice</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 dark:divide-stone-800">
            <template v-for="item in filteredList" :key="item.id">
              <tr 
                @click="toggleExpandRow(item.id)" 
                class="hover:bg-rose-50/30 dark:hover:bg-stone-800/50 transition-colors cursor-pointer group"
                :class="{ 'bg-emerald-50/15 dark:bg-emerald-950/10': isWordLearned(item.id) }"
              >
                <!-- Learned Checkbox Button -->
                <td class="py-3.5 px-3 text-center" @click.stop>
                  <button 
                    @click="toggleLearnedWord(item.id)"
                    class="p-1 rounded-lg transition-transform active:scale-90"
                    :title="isWordLearned(item.id) ? 'Mark as not learned' : 'Mark as learned'"
                  >
                    <CheckCircle2 v-if="isWordLearned(item.id)" class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <Circle v-else class="w-5 h-5 text-stone-300 dark:text-stone-600 hover:text-emerald-500 transition-colors" />
                  </button>
                </td>

                <!-- Audio button (Normal + Slow Turtle Speed) -->
                <td class="py-3.5 px-3 text-center" @click.stop>
                  <div class="flex items-center justify-center gap-1">
                    <AudioButton :text="item.hanzi" size="sm" />
                    <button 
                      @click="playSlowAudio(item.hanzi)"
                      class="p-1 rounded-md text-[11px] hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                      title="Slow pronunciation for beginners (0.6x)"
                    >
                      🐢
                    </button>
                  </div>
                </td>

                <!-- Hanzi -->
                <td class="py-3.5 px-4 font-serif text-2xl font-black text-stone-900 dark:text-stone-100 tracking-wide">
                  <span :class="{ 'text-emerald-700 dark:text-emerald-400': isWordLearned(item.id) }">
                    {{ item.hanzi }}
                  </span>
                </td>

                <!-- Pinyin with tone color -->
                <td class="py-3.5 px-4 font-bold" :class="getPinyinToneColor(item.pinyin)">
                  {{ item.pinyin }}
                </td>

                <!-- Meaning -->
                <td class="py-3.5 px-4 text-stone-700 dark:text-stone-300 font-medium">
                  {{ item.meaning }}
                </td>

                <!-- Part of Speech -->
                <td class="py-3.5 px-4 hidden sm:table-cell">
                  <span class="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 capitalize">
                    {{ item.partOfSpeech }}
                  </span>
                </td>

                <!-- Action: Open stroke order -->
                <td class="py-3.5 px-4 text-right" @click.stop>
                  <button 
                    @click="openStrokeOrder(item.hanzi)"
                    class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-rose-950 hover:text-rose-700 dark:hover:text-rose-300 text-stone-700 dark:text-stone-300 transition-colors"
                    title="Animate strokes"
                  >
                    <PenTool class="w-3 h-3 text-rose-600 dark:text-rose-400" />
                    <span>Write</span>
                  </button>
                </td>
              </tr>

              <!-- Expandable Example Sentence Row -->
              <tr v-if="expandedRowId === item.id" class="bg-stone-50/80 dark:bg-stone-800/40 border-b border-stone-200 dark:border-stone-700">
                <td colspan="7" class="p-4 sm:px-6">
                  <div class="space-y-1">
                    <div class="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Example Sentence:</div>
                    <div class="flex items-center gap-2">
                      <div class="text-base font-serif font-bold text-stone-900 dark:text-stone-100">{{ item.exampleZh }}</div>
                      <AudioButton :text="item.exampleZh" size="sm" />
                    </div>
                    <div class="text-xs font-semibold text-rose-700 dark:text-rose-400">{{ item.examplePy }}</div>
                    <div class="text-xs text-stone-600 dark:text-stone-400 italic">{{ item.exampleEn }}</div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- CARDS GRID VIEW -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="item in filteredList" 
        :key="item.id"
        class="bg-white dark:bg-stone-900 rounded-2xl border shadow-xs hover:shadow-md p-5 transition-all flex flex-col justify-between"
        :class="isWordLearned(item.id) ? 'border-emerald-300 dark:border-emerald-700/60 bg-emerald-50/10' : 'border-stone-200/80 dark:border-stone-800'"
      >
        <div>
          <div class="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
            <span class="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 capitalize">
              {{ item.partOfSpeech }}
            </span>
            <div class="flex items-center gap-1">
              <AudioButton :text="item.hanzi" size="sm" />
              <button 
                @click="playSlowAudio(item.hanzi)"
                class="px-1.5 py-0.5 rounded text-[11px] text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                title="Slow pronunciation for beginners (0.6x)"
              >
                🐢
              </button>
              <button 
                @click="openStrokeOrder(item.hanzi)" 
                class="p-1 rounded text-stone-400 hover:text-rose-600 dark:hover:text-rose-400"
                title="Practice stroke order"
              >
                <PenTool class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div class="pt-3">
            <div class="flex items-start justify-between">
              <div class="font-serif text-4xl font-black text-stone-900 dark:text-stone-100">{{ item.hanzi }}</div>
              <!-- Learned toggle button -->
              <button 
                @click="toggleLearnedWord(item.id)"
                class="px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 active:scale-95"
                :class="isWordLearned(item.id) 
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' 
                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-600 dark:text-stone-400'"
              >
                <CheckCircle2 v-if="isWordLearned(item.id)" class="w-3.5 h-3.5 text-emerald-600" />
                <Circle v-else class="w-3.5 h-3.5 text-stone-400" />
                <span>{{ isWordLearned(item.id) ? 'Learned' : 'Learn' }}</span>
              </button>
            </div>
            
            <div class="text-base font-bold mt-0.5" :class="getPinyinToneColor(item.pinyin)">{{ item.pinyin }}</div>
            <div class="text-sm font-medium text-stone-700 dark:text-stone-300 mt-2">{{ item.meaning }}</div>
          </div>
        </div>

        <div v-if="item.exampleZh" class="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
          <div class="font-bold text-stone-800 dark:text-stone-200">{{ item.exampleZh }}</div>
          <div class="italic text-stone-400 dark:text-stone-500">{{ item.exampleEn }}</div>
        </div>
      </div>
    </div>

  </div>
</template>
