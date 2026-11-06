<script setup lang="ts">
import { ref, computed } from 'vue';
import { Volume2, RotateCw, Check, X, ArrowLeft, ArrowRight, Shuffle } from 'lucide-vue-next';
import { VocabItem } from '../../types';
import { playAudio } from '../../utils/speech';

const props = defineProps<{
  vocabList: VocabItem[];
}>();

const currentIndex = ref(0);
const isFlipped = ref(false);
const knownCount = ref(0);
const reviewCount = ref(0);

const currentCard = computed(() => {
  if (props.vocabList.length === 0) return null;
  return props.vocabList[currentIndex.value];
});

function flipCard() {
  isFlipped.value = !isFlipped.value;
}

function nextCard() {
  isFlipped.value = false;
  if (currentIndex.value < props.vocabList.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0; // loop
  }
}

function prevCard() {
  isFlipped.value = false;
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = props.vocabList.length - 1;
  }
}

function markKnown() {
  knownCount.value++;
  nextCard();
}

function markReview() {
  reviewCount.value++;
  nextCard();
}

function playCardAudio(e?: Event) {
  if (e) e.stopPropagation();
  if (currentCard.value) {
    playAudio(currentCard.value.hanzi);
  }
}

function shuffleDeck() {
  isFlipped.value = false;
  currentIndex.value = Math.floor(Math.random() * props.vocabList.length);
}
</script>

<template>
  <div class="max-w-md mx-auto space-y-4">
    <!-- Flashcard Controls Top -->
    <div class="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
      <div class="flex items-center gap-2">
        <span class="font-bold text-stone-800 dark:text-stone-200">Card {{ currentIndex + 1 }} / {{ vocabList.length }}</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-emerald-700 dark:text-emerald-400 font-semibold">{{ knownCount }} Mastered</span>
        <span class="text-amber-700 dark:text-amber-400 font-semibold">{{ reviewCount }} Review</span>
        <button 
          @click="shuffleDeck" 
          class="p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          title="Shuffle Deck"
        >
          <Shuffle class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- 3D Flashcard -->
    <div 
      v-if="currentCard"
      @click="flipCard"
      class="w-full h-80 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 shadow-xl cursor-pointer p-8 flex flex-col items-center justify-between transition-all duration-300 hover:shadow-2xl hover:border-rose-300 dark:hover:border-rose-700 select-none relative overflow-hidden"
    >
      <!-- Level and Part of Speech Badge -->
      <div class="w-full flex items-center justify-between">
        <span class="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-800">
          HSK {{ currentCard.level }}
        </span>
        <span class="text-xs text-stone-400 dark:text-stone-500 capitalize">
          {{ currentCard.partOfSpeech }}
        </span>
      </div>

      <!-- Card Face Content -->
      <div class="text-center space-y-3">
        <!-- Front: Big Hanzi -->
        <div class="text-6xl sm:text-7xl font-serif font-black text-stone-900 dark:text-stone-100 tracking-wide">
          {{ currentCard.hanzi }}
        </div>

        <!-- Back: Revealed details -->
        <div v-if="isFlipped" class="space-y-1.5 animate-in fade-in zoom-in-95">
          <div class="text-xl font-bold text-rose-600 dark:text-rose-400">{{ currentCard.pinyin }}</div>
          <div class="text-sm font-medium text-stone-700 dark:text-stone-300 max-w-xs mx-auto">{{ currentCard.meaning }}</div>
          
          <div v-if="currentCard.exampleZh" class="pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
            <div class="text-stone-800 dark:text-stone-200 font-medium">{{ currentCard.exampleZh }}</div>
            <div>{{ currentCard.examplePy }}</div>
            <div class="text-stone-400 dark:text-stone-500 italic">{{ currentCard.exampleEn }}</div>
          </div>
        </div>

        <div v-else class="text-xs text-stone-400 dark:text-stone-500 flex items-center justify-center gap-1">
          <RotateCw class="w-3.5 h-3.5" />
          <span>Tap to flip and check answer</span>
        </div>
      </div>

      <!-- Audio Button & Hint -->
      <div class="w-full flex items-center justify-between">
        <button 
          @click="playCardAudio" 
          class="p-2 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-rose-100 dark:hover:bg-rose-950 text-stone-700 dark:text-stone-300 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
          title="Play Audio"
        >
          <Volume2 class="w-4 h-4" />
        </button>

        <span class="text-[11px] text-stone-400 dark:text-stone-500">
          {{ isFlipped ? 'Answer Revealed' : 'Click to Flip' }}
        </span>
      </div>
    </div>

    <!-- Rating / Action Buttons -->
    <div class="grid grid-cols-2 gap-3 pt-2">
      <button 
        @click="markReview" 
        class="py-2.5 px-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-xs"
      >
        <X class="w-4 h-4 text-amber-700 dark:text-amber-400" />
        <span>Still Learning</span>
      </button>

      <button 
        @click="markKnown" 
        class="py-2.5 px-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-xs"
      >
        <Check class="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
        <span>I Know This!</span>
      </button>
    </div>

    <!-- Navigation Arrows -->
    <div class="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-1">
      <button @click="prevCard" class="flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100">
        <ArrowLeft class="w-3.5 h-3.5" /> Previous
      </button>
      <button @click="nextCard" class="flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100">
        Next <ArrowRight class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
</template>
