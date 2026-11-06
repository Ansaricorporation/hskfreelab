<script setup lang="ts">
import { ref } from 'vue';
import { Volume2, Play, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-vue-next';
import { playAudio } from '../../utils/speech';
import { openToneGuide } from '../../stores/auth';

const initials = [
  'b', 'p', 'm', 'f', 'd', 't', 'n', 'l',
  'g', 'k', 'h', 'j', 'q', 'x',
  'zh', 'ch', 'sh', 'r', 'z', 'c', 's',
  'y', 'w'
];

const finals = [
  'a', 'o', 'e', 'i', 'u', 'ü',
  'ai', 'ei', 'ui', 'ao', 'ou', 'iu',
  'ie', 'üe', 'er', 'an', 'en', 'in',
  'un', 'ün', 'ang', 'eng', 'ing', 'ong'
];

const toneDemonstrations = [
  { tone: 1, name: 'First Tone (High Flat 55)', mark: 'ā', word: '妈', pinyin: 'mā', meaning: 'Mother', pitch: '5 → 5 (steady high)' },
  { tone: 2, name: 'Second Tone (Rising 35)', mark: 'á', word: '麻', pinyin: 'má', meaning: 'Hemp', pitch: '3 → 5 (questioning rise)' },
  { tone: 3, name: 'Third Tone (Dip & Rise 214)', mark: 'ǎ', word: '马', pinyin: 'mǎ', meaning: 'Horse', pitch: '2 → 1 → 4 (low dip)' },
  { tone: 4, name: 'Fourth Tone (Falling 51)', mark: 'à', word: '骂', pinyin: 'mà', meaning: 'To Scold', pitch: '5 → 1 (sharp drop)' },
  { tone: 5, name: 'Neutral Tone (Light & Short)', mark: 'a', word: '吗', pinyin: 'ma', meaning: 'Question Particle', pitch: 'Light, unaccented' },
];

// Tone Quiz Game State
const quizActive = ref(false);
const quizCurrentSyllable = ref<{ base: string; tone: number; pinyin: string; hanzi: string } | null>(null);
const quizStreak = ref(0);
const quizFeedback = ref<'correct' | 'wrong' | null>(null);

const testSyllables = [
  { base: 'ba', tone: 1, pinyin: 'bā', hanzi: '八' },
  { base: 'ba', tone: 2, pinyin: 'bá', hanzi: '拔' },
  { base: 'ba', tone: 3, pinyin: 'bǎ', hanzi: '把' },
  { base: 'ba', tone: 4, pinyin: 'bà', hanzi: '爸' },
  { base: 'ma', tone: 1, pinyin: 'mā', hanzi: '妈' },
  { base: 'ma', tone: 2, pinyin: 'má', hanzi: '麻' },
  { base: 'ma', tone: 3, pinyin: 'mǎ', hanzi: '马' },
  { base: 'ma', tone: 4, pinyin: 'mà', hanzi: '骂' },
  { base: 'shi', tone: 1, pinyin: 'shī', hanzi: '师' },
  { base: 'shi', tone: 2, pinyin: 'shí', hanzi: '十' },
  { base: 'shi', tone: 3, pinyin: 'shǐ', hanzi: '始' },
  { base: 'shi', tone: 4, pinyin: 'shì', hanzi: '是' }
];

function playSample(text: string) {
  playAudio(text, 0.8);
}

function startQuizRound() {
  quizActive.value = true;
  quizFeedback.value = null;
  const randomIndex = Math.floor(Math.random() * testSyllables.length);
  quizCurrentSyllable.value = testSyllables[randomIndex];
  playQuizAudio();
}

function playQuizAudio() {
  if (quizCurrentSyllable.value) {
    playAudio(quizCurrentSyllable.value.hanzi, 0.75);
  }
}

function submitGuess(selectedTone: number) {
  if (!quizCurrentSyllable.value || quizFeedback.value !== null) return;

  if (selectedTone === quizCurrentSyllable.value.tone) {
    quizFeedback.value = 'correct';
    quizStreak.value++;
  } else {
    quizFeedback.value = 'wrong';
    quizStreak.value = 0;
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-10">
    
    <!-- Tones Section -->
    <div class="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div>
          <h3 class="text-xl font-bold text-stone-900 dark:text-stone-100">The 4 Mandarin Tones (声调)</h3>
          <p class="text-xs text-stone-500 dark:text-stone-400">Tone determines meaning. Tap any card to hear the pitch differences.</p>
        </div>
        <button 
          @click="openToneGuide" 
          class="px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs self-start sm:self-center shrink-0"
        >
          <Sparkles class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Full 5-Tone Visual Soundboard</span>
        </button>
      </div>

      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div 
          v-for="item in toneDemonstrations" 
          :key="item.tone"
          @click="playSample(item.word)"
          class="group p-4 rounded-xl border border-stone-200 dark:border-stone-700/60 bg-stone-50/50 dark:bg-stone-800/50 hover:bg-rose-50/60 dark:hover:bg-stone-800 hover:border-rose-200 dark:hover:border-stone-600 transition-all cursor-pointer text-center relative overflow-hidden"
        >
          <div class="text-3xl font-serif font-black text-rose-700 dark:text-rose-400 group-hover:scale-110 transition-transform">
            {{ item.word }}
          </div>
          <div class="mt-1 text-lg font-bold text-stone-800 dark:text-stone-100">
            {{ item.pinyin }}
          </div>
          <div class="mt-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
            Tone {{ item.tone }}
          </div>
          <div class="mt-2 text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
            {{ item.meaning }}
          </div>
          <div class="mt-2 pt-2 border-t border-stone-200/60 dark:border-stone-700/60 text-[10px] text-stone-400 dark:text-stone-500">
            {{ item.pitch }}
          </div>
          <div class="mt-2 flex items-center justify-center">
            <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600 dark:text-stone-300 group-hover:text-rose-700 dark:group-hover:text-rose-300">
              <Volume2 class="w-3.5 h-3.5" /> Listen
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tone Quiz Game -->
    <div class="bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl text-white shadow-xl p-6 sm:p-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-700">
        <div>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/30 text-rose-300 border border-rose-500/40 uppercase tracking-wider">
            <Sparkles class="w-3 h-3" /> Ear Training Challenge
          </span>
          <h3 class="text-2xl font-black text-white mt-1">Tone Recognition Trainer</h3>
          <p class="text-xs text-stone-400">Listen to the spoken syllable and pick the correct tone.</p>
        </div>

        <div class="flex items-center gap-4">
          <div class="text-right">
            <div class="text-xs text-stone-400">Current Streak</div>
            <div class="text-2xl font-black text-emerald-400">{{ quizStreak }} 🔥</div>
          </div>
        </div>
      </div>

      <!-- Quiz Body -->
      <div v-if="!quizActive" class="py-10 text-center space-y-4">
        <p class="text-stone-300 text-sm max-w-md mx-auto">
          Test your ear against native Mandarin audio. Can you distinguish Tone 1, 2, 3, and 4?
        </p>
        <button 
          @click="startQuizRound" 
          class="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-white transition-all shadow-lg shadow-rose-600/30 active:scale-95"
        >
          Start Tone Trainer
        </button>
      </div>

      <div v-else class="py-6 space-y-6">
        <!-- Audio Playback Button -->
        <div class="flex flex-col items-center justify-center gap-3">
          <button 
            @click="playQuizAudio" 
            class="w-20 h-20 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 active:scale-95 transition-all"
            title="Replay Audio"
          >
            <Volume2 class="w-8 h-8 animate-pulse" />
          </button>
          <span class="text-xs text-stone-400">Click to replay syllable</span>
        </div>

        <!-- 4 Tone Choices -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
          <button 
            v-for="t in [1, 2, 3, 4]" 
            :key="t"
            @click="submitGuess(t)"
            :disabled="quizFeedback !== null"
            class="p-4 rounded-xl border border-stone-700 bg-stone-800/80 hover:bg-stone-700 hover:border-rose-400 transition-all font-bold text-base text-center active:scale-95 disabled:opacity-50"
          >
            Tone {{ t }}
          </button>
        </div>

        <!-- Feedback Result -->
        <div v-if="quizFeedback !== null" class="text-center pt-2 space-y-3">
          <div v-if="quizFeedback === 'correct'" class="inline-flex items-center gap-2 text-emerald-400 font-bold text-lg">
            <CheckCircle2 class="w-6 h-6" />
            <span>Correct! That was Tone {{ quizCurrentSyllable?.tone }} ({{ quizCurrentSyllable?.pinyin }} · {{ quizCurrentSyllable?.hanzi }})</span>
          </div>
          <div v-else class="inline-flex items-center gap-2 text-rose-400 font-bold text-lg">
            <XCircle class="w-6 h-6" />
            <span>Not quite! It was Tone {{ quizCurrentSyllable?.tone }} ({{ quizCurrentSyllable?.pinyin }} · {{ quizCurrentSyllable?.hanzi }})</span>
          </div>

          <div>
            <button 
              @click="startQuizRound" 
              class="px-5 py-2 rounded-lg bg-stone-700 hover:bg-stone-600 text-white text-sm font-semibold transition-colors"
            >
              Next Question →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pinyin Initials & Finals Reference -->
    <div class="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 space-y-8">
      <div>
        <h4 class="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">Mandarin Initials (声母 - 23 Consonants)</h4>
        <p class="text-xs text-stone-500 dark:text-stone-400 mb-4">Click any sound to listen to its pronunciation.</p>
        <div class="grid grid-cols-4 sm:grid-cols-8 gap-2">
          <button 
            v-for="init in initials" 
            :key="init"
            @click="playSample(init)"
            class="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-stone-700 hover:border-rose-300 dark:hover:border-stone-600 font-bold text-stone-800 dark:text-stone-200 text-sm transition-all text-center flex items-center justify-center gap-1 group"
          >
            <span>{{ init }}</span>
            <Volume2 class="w-3 h-3 text-stone-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 opacity-60" />
          </button>
        </div>
      </div>

      <div class="pt-6 border-t border-stone-100 dark:border-stone-800">
        <h4 class="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">Mandarin Finals (韵母 - 24 Vowels)</h4>
        <p class="text-xs text-stone-500 dark:text-stone-400 mb-4">Click any sound to listen to its pronunciation.</p>
        <div class="grid grid-cols-4 sm:grid-cols-8 gap-2">
          <button 
            v-for="fin in finals" 
            :key="fin"
            @click="playSample(fin)"
            class="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-stone-700 hover:border-rose-300 dark:hover:border-stone-600 font-bold text-stone-800 dark:text-stone-200 text-sm transition-all text-center flex items-center justify-center gap-1 group"
          >
            <span>{{ fin }}</span>
            <Volume2 class="w-3 h-3 text-stone-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 opacity-60" />
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
