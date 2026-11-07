<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  ArrowRight, 
  Smile, 
  BookOpen, 
  Award,
  Check,
  RotateCcw,
  Star,
  Layers
} from 'lucide-vue-next';
import { playAudio, playSlowAudio } from '../../utils/speech';
import { isWordLearned, toggleLearnedWord, totalLearnedWordsCount, openToneGuide } from '../../stores/auth';

const activeStep = ref<1 | 2 | 3>(1);

// Step 1 tones
const toneSounds = [
  { tone: '1st (High Flat)', hanzi: '妈', pinyin: 'mā', hint: 'Sing high: mā' },
  { tone: '2nd (Rising)', hanzi: '麻', pinyin: 'má', hint: 'Question: má?' },
  { tone: '3rd (Dipping)', hanzi: '马', pinyin: 'mǎ', hint: 'Dip & rise: mǎ' },
  { tone: '4th (Falling)', hanzi: '骂', pinyin: 'mà', hint: 'Firm stop: mà!' }
];

// Step 2 essential beginner words
const survivalWords = [
  { id: 'hsk1-44', hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'Hello / Hi', toneTip: 'Both are 3rd tones, so pronounce "ní hǎo"!' },
  { id: 'hsk1-118', hanzi: '谢谢', pinyin: 'xièxie', meaning: 'Thank you', toneTip: '1st syllable is 4th tone, 2nd is neutral light.' },
  { id: 'hsk1-7', hanzi: '不客气', pinyin: 'bú kèqi', meaning: "You're welcome", toneTip: 'Essential politeness phrase.' },
  { id: 'hsk1-31', hanzi: '对不起', pinyin: 'duìbuqǐ', meaning: "I'm sorry / Excuse me", toneTip: 'Use whenever asking for pardon.' },
  { id: 'hsk1-137', hanzi: '再见', pinyin: 'zàijiàn', meaning: 'Goodbye / See you again', toneTip: 'Both characters are decisive 4th tones!' }
];

// Step 3 mini quiz
const quizQuestions = [
  {
    question: 'How do you say "Hello" in Chinese?',
    options: ['谢谢 (Xièxie)', '你好 (Nǐ hǎo)', '再见 (Zàijiàn)'],
    correct: 1,
    tip: '你好 (Nǐ hǎo) literally means "You good"!'
  },
  {
    question: 'Which word means "Thank you"?',
    options: ['不客气 (Bú kèqi)', '对不起 (Duìbuqǐ)', '谢谢 (Xièxie)'],
    correct: 2,
    tip: '谢谢 (Xièxie) is spoken with a crisp first syllable.'
  },
  {
    question: 'What does "再见" (Zàijiàn) mean?',
    options: ['Goodbye', 'Please sit', 'I am happy'],
    correct: 0,
    tip: '再见 (Zàijiàn) literally translates to "See you again"!'
  }
];

const quizAnswers = ref<Record<number, number>>({});
const isQuizSubmitted = ref(false);

const quizScore = computed(() => {
  let score = 0;
  quizQuestions.forEach((q, idx) => {
    if (quizAnswers.value[idx] === q.correct) {
      score++;
    }
  });
  return score;
});

function playSound(text: string, slow = false) {
  if (slow) {
    playSlowAudio(text);
  } else {
    playAudio(text, 0.85);
  }
}

function submitQuiz() {
  isQuizSubmitted.value = true;
}

function resetQuiz() {
  quizAnswers.value = {};
  isQuizSubmitted.value = false;
}
</script>

<template>
  <div class="bg-gradient-to-br from-amber-500/5 via-rose-500/5 to-emerald-500/5 dark:from-stone-900 dark:to-stone-900 border-2 border-amber-300/80 dark:border-amber-700/60 rounded-3xl p-4 sm:p-8 lg:p-10 shadow-lg space-y-6 sm:space-y-8 relative overflow-hidden transition-all">
    
    <!-- Top Badge & Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-stone-200/80 dark:border-stone-800">
      <div class="space-y-1.5">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-xs font-black uppercase tracking-wider">
          <Smile class="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Beginner QuickStart Hub (Start Here!)</span>
        </div>
        <h2 class="text-xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Your First 5 Minutes in Mandarin Chinese
        </h2>
        <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl leading-relaxed">
          Never studied Chinese before? Follow these 3 easy steps to learn how tones work, master your first 5 essential words, and pass a friendly mini-quiz.
        </p>
      </div>

      <!-- Step Navigation Indicator (Responsive Segmented Tabs with Never-Wrap Design) -->
      <div class="grid grid-cols-3 sm:flex items-center gap-1 sm:gap-2 bg-stone-100 dark:bg-stone-800/90 p-1 sm:p-1.5 rounded-2xl w-full sm:w-auto shrink-0 shadow-inner">
        <button 
          @click="activeStep = 1"
          :class="[
            'w-full sm:w-auto py-2 px-2 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap text-center shrink-0',
            activeStep === 1 
              ? 'bg-amber-500 text-white shadow-sm font-black' 
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
          ]"
        >
          <span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0" :class="activeStep === 1 ? 'bg-white/25 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'">1</span>
          <span class="inline sm:hidden whitespace-nowrap">Tones</span>
          <span class="hidden sm:inline whitespace-nowrap">Step 1: Tones</span>
        </button>

        <button 
          @click="activeStep = 2"
          :class="[
            'w-full sm:w-auto py-2 px-2 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap text-center shrink-0',
            activeStep === 2 
              ? 'bg-rose-600 text-white shadow-sm font-black' 
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
          ]"
        >
          <span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0" :class="activeStep === 2 ? 'bg-white/25 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'">2</span>
          <span class="inline sm:hidden whitespace-nowrap">Words</span>
          <span class="hidden sm:inline whitespace-nowrap">Step 2: 5 Words</span>
        </button>

        <button 
          @click="activeStep = 3"
          :class="[
            'w-full sm:w-auto py-2 px-2 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap text-center shrink-0',
            activeStep === 3 
              ? 'bg-emerald-600 text-white shadow-sm font-black' 
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
          ]"
        >
          <span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0" :class="activeStep === 3 ? 'bg-white/25 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'">3</span>
          <span class="inline sm:hidden whitespace-nowrap">Quiz</span>
          <span class="hidden sm:inline whitespace-nowrap">Step 3: Mini Quiz</span>
        </button>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- STEP 1: THE 4 TONES MINI PRIMER -->
    <!-- ========================================== -->
    <div v-if="activeStep === 1" class="space-y-6 animate-in fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="space-y-1">
          <span class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Step 1 of 3</span>
          <h3 class="text-lg sm:text-xl font-black text-stone-900 dark:text-stone-100">
            Listen to the 4 Lexical Tones
          </h3>
          <p class="text-xs text-stone-500 dark:text-stone-400">
            Click each sound button below. Notice how the pitch goes flat, rises, dips, or drops sharply.
          </p>
        </div>

        <button 
          @click="openToneGuide" 
          class="self-start sm:self-center px-3.5 py-2 rounded-xl bg-amber-100 dark:bg-amber-950/70 hover:bg-amber-200 dark:hover:bg-amber-900/70 text-amber-900 dark:text-amber-200 text-xs font-bold border border-amber-300/80 dark:border-amber-800 flex items-center gap-1.5 transition-colors shadow-2xs shrink-0"
        >
          <Sparkles class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Interactive 5-Tone Visual Guide</span>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          v-for="(t, idx) in toneSounds" 
          :key="idx"
          class="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 p-5 space-y-3 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div class="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{{ t.tone }}</div>
            <div class="text-3xl font-serif font-black text-stone-900 dark:text-stone-100 mt-1">{{ t.hanzi }}</div>
            <div class="text-sm font-bold text-rose-600 dark:text-rose-400 mt-0.5">{{ t.pinyin }}</div>
            <p class="text-xs text-stone-500 dark:text-stone-400 mt-2">{{ t.hint }}</p>
          </div>

          <div class="pt-2 flex items-center gap-2">
            <button 
              @click="playSound(t.hanzi)"
              class="flex-1 py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Volume2 class="w-3.5 h-3.5" />
              <span>Hear Sound</span>
            </button>

            <button 
              @click="playSound(t.hanzi, true)"
              class="py-2 px-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 font-bold text-[11px] transition-colors"
              title="Slow speed"
            >
              🐢
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <button 
          @click="activeStep = 2"
          class="px-6 py-3 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-rose-700 dark:hover:bg-rose-600 text-white dark:text-stone-900 font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-98"
        >
          <span>Step 2: Learn 5 Essential Words</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- STEP 2: 5 ESSENTIAL SURVIVAL WORDS -->
    <!-- ========================================== -->
    <div v-else-if="activeStep === 2" class="space-y-6 animate-in fade-in">
      <div class="space-y-1">
        <span class="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Step 2 of 3</span>
        <h3 class="text-lg sm:text-xl font-black text-stone-900 dark:text-stone-100">
          Master Your First 5 Essential Words
        </h3>
        <p class="text-xs text-stone-500 dark:text-stone-400">
          Listen to the native pronunciation, read the tone tip, and click "Mark as Learned" to auto-save them to your browser data!
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="word in survivalWords" 
          :key="word.id"
          class="bg-white dark:bg-stone-900 rounded-2xl border shadow-xs hover:shadow-md p-5 space-y-4 flex flex-col justify-between transition-all"
          :class="isWordLearned(word.id) ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/15' : 'border-stone-200/90 dark:border-stone-800'"
        >
          <div>
            <div class="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
              <span class="text-xs font-bold text-stone-500 dark:text-stone-400">Survival Essential</span>
              <!-- Audio buttons -->
              <div class="flex items-center gap-1">
                <button 
                  @click="playSound(word.hanzi)"
                  class="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors"
                  title="Listen"
                >
                  <Volume2 class="w-4 h-4" />
                </button>
                <button 
                  @click="playSound(word.hanzi, true)"
                  class="px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-[10px] font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-200 transition-colors"
                  title="Slow speed"
                >
                  🐢
                </button>
              </div>
            </div>

            <div class="pt-3">
              <div class="font-serif text-3xl font-black text-stone-900 dark:text-stone-100">{{ word.hanzi }}</div>
              <div class="text-base font-bold text-rose-600 dark:text-rose-400 mt-0.5">{{ word.pinyin }}</div>
              <div class="text-sm font-semibold text-stone-800 dark:text-stone-200 mt-1">{{ word.meaning }}</div>
              <div class="text-[11px] text-stone-500 dark:text-stone-400 mt-2 italic bg-stone-50 dark:bg-stone-800/60 p-2 rounded-lg">
                💡 {{ word.toneTip }}
              </div>
            </div>
          </div>

          <!-- Mark Learned Toggle Button -->
          <div class="pt-2">
            <button 
              @click="toggleLearnedWord(word.id)"
              class="w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-2xs"
              :class="isWordLearned(word.id)
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300'"
            >
              <Check v-if="isWordLearned(word.id)" class="w-3.5 h-3.5" />
              <span>{{ isWordLearned(word.id) ? '✓ Saved to Learned Words' : '+ Mark as Learned' }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2">
        <button 
          @click="activeStep = 1"
          class="text-xs font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
        >
          ← Back to Step 1: Tones
        </button>

        <button 
          @click="activeStep = 3"
          class="px-6 py-3 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-rose-700 dark:hover:bg-rose-600 text-white dark:text-stone-900 font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-98"
        >
          <span>Step 3: Try First Friendly Quiz</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- STEP 3: 3-QUESTION BEGINNER QUIZ -->
    <!-- ========================================== -->
    <div v-else class="space-y-6 animate-in fade-in">
      <div class="space-y-1">
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Step 3 of 3</span>
        <h3 class="text-lg sm:text-xl font-black text-stone-900 dark:text-stone-100">
          Friendly Zero-Stress Mini Quiz
        </h3>
        <p class="text-xs text-stone-500 dark:text-stone-400">
          Test what you just learned. There's no timer and no penalty — practice at your own relaxed pace!
        </p>
      </div>

      <!-- Quiz Questions Grid -->
      <div class="space-y-5">
        <div 
          v-for="(q, qIdx) in quizQuestions" 
          :key="qIdx"
          class="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 p-5 space-y-3 shadow-2xs"
        >
          <div class="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-black flex items-center justify-center shrink-0">
              {{ qIdx + 1 }}
            </span>
            <span>{{ q.question }}</span>
          </div>

          <!-- Options -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button 
              v-for="(opt, optIdx) in q.options"
              :key="optIdx"
              @click="quizAnswers[qIdx] = optIdx"
              :disabled="isQuizSubmitted"
              :class="[
                'p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all text-left flex items-center justify-between',
                quizAnswers[qIdx] === optIdx 
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20' 
                  : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200',
                isQuizSubmitted && optIdx === q.correct ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-950 font-bold' : '',
                isQuizSubmitted && quizAnswers[qIdx] === optIdx && optIdx !== q.correct ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/60 text-rose-900 line-through' : ''
              ]"
            >
              <span>{{ opt }}</span>
              <Check v-if="isQuizSubmitted && optIdx === q.correct" class="w-4 h-4 text-emerald-600" />
            </button>
          </div>

          <div v-if="isQuizSubmitted" class="text-xs text-stone-600 dark:text-stone-400 p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
            💡 <strong>Why:</strong> {{ q.tip }}
          </div>
        </div>
      </div>

      <!-- Result Banner or Check Answers Button -->
      <div v-if="!isQuizSubmitted" class="flex justify-end pt-2">
        <button 
          @click="submitQuiz"
          :disabled="Object.keys(quizAnswers).length === 0"
          class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-98"
        >
          Check My Answers!
        </button>
      </div>

      <!-- Post-Quiz Congratulations Card -->
      <div 
        v-else
        class="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-emerald-500/10 border border-emerald-400 dark:border-emerald-700 space-y-4 animate-in fade-in"
      >
        <div class="flex items-center gap-3">
          <Star class="w-8 h-8 text-amber-500 fill-current shrink-0" />
          <div>
            <h4 class="text-lg font-black text-stone-900 dark:text-stone-100">
              {{ quizScore === 3 ? '🎉 Perfect 3/3! You are a Natural!' : `Awesome Work! You scored ${quizScore}/3!` }}
            </h4>
            <p class="text-xs text-stone-600 dark:text-stone-400">
              You just mastered the foundational elements of Mandarin Chinese. Now explore all 150 words in HSK 1!
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3 pt-2">
          <router-link 
            to="/hsk-1" 
            class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <span>Explore All 150 HSK 1 Words</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </router-link>

          <button 
            @click="resetQuiz"
            class="px-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs flex items-center gap-1.5 hover:bg-stone-50"
          >
            <RotateCcw class="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>

    </div>

  </div>
</template>
