<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { 
  Clock, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  Award,
  Play,
  Check,
  Sparkles,
  ArrowUp,
  HelpCircle,
  FileText,
  Headphones,
  CheckCircle,
  ArrowRight
} from 'lucide-vue-next';
import { MockTest } from '../../types';
import { playAudio, playSlowAudio, isSpeaking } from '../../utils/speech';
import { recordMockTestResult } from '../../stores/auth';

const props = defineProps<{
  mockTest: MockTest;
}>();

const emit = defineEmits<{
  (e: 'exit'): void;
}>();

// State
const isStarted = ref(false);
const userAnswers = ref<Record<number, any>>({});
const isSubmitted = ref(false);
const hasAutoSubmitted = ref(false);
const timeRemainingSeconds = ref(props.mockTest.timeMinutes * 60);
const isTimerPaused = ref(false);
const currentlyPlayingQuestionId = ref<number | null>(null);
let timerInterval: any = null;

// Formatted time
const formattedTime = computed(() => {
  const m = Math.floor(timeRemainingSeconds.value / 60);
  const s = timeRemainingSeconds.value % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
});

// Total answered count
const totalAnswered = computed(() => {
  return Object.keys(userAnswers.value).length;
});

// Score computation
const calculatedScore = computed(() => {
  if (!isSubmitted.value) return 0;
  let correctCount = 0;
  props.mockTest.questions.forEach((q) => {
    if (userAnswers.value[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });
  const pointsPerQuestion = props.mockTest.totalScore / props.mockTest.questions.length;
  return Math.round(correctCount * pointsPerQuestion);
});

const correctAnswersCount = computed(() => {
  let count = 0;
  props.mockTest.questions.forEach((q) => {
    if (userAnswers.value[q.id] === q.correctAnswer) {
      count++;
    }
  });
  return count;
});

const isPassed = computed(() => {
  return calculatedScore.value >= props.mockTest.passingScore;
});

// Option label helper: 0 -> A, 1 -> B, 2 -> C, 3 -> D
function getOptionLabel(idx: number): string {
  return String.fromCharCode(65 + idx);
}

// Select an answer
function selectAnswer(questionId: number, option: any) {
  if (isSubmitted.value) return;
  userAnswers.value[questionId] = option;
}

// Play audio for a listening question (Normal or Slow Turtle speed)
function playQuestionAudio(questionId: number, audioPrompt?: string, slow = false) {
  if (!audioPrompt) return;
  currentlyPlayingQuestionId.value = questionId;
  const runner = slow ? playSlowAudio(audioPrompt) : playAudio(audioPrompt, 0.85);
  runner.then(() => {
    currentlyPlayingQuestionId.value = null;
  });
}

// Test sound in pre-test lobby
const isTestingSound = ref(false);
function testSound() {
  isTestingSound.value = true;
  playAudio('你好！欢迎参加模拟考试。祝你取得好成绩！', 0.85).then(() => {
    isTestingSound.value = false;
  });
}

// Start exam (Play button)
function startExam() {
  isStarted.value = true;
  startTimer();
  // Smooth scroll to top of questions container
  window.scrollTo({ top: 180, behavior: 'smooth' });
}

// Timer logic
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!isTimerPaused.value && timeRemainingSeconds.value > 0 && !isSubmitted.value) {
      timeRemainingSeconds.value--;
      if (timeRemainingSeconds.value <= 0) {
        hasAutoSubmitted.value = true;
        isSubmitted.value = true;
        clearInterval(timerInterval);
        recordMockTestResult(props.mockTest.slug || props.mockTest.id, calculatedScore.value, props.mockTest.totalScore, isPassed.value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, 1000);
}

// Submit exam
function submitExam() {
  const unansweredCount = props.mockTest.questions.length - totalAnswered.value;
  if (unansweredCount > 0) {
    const confirmMsg = `You have ${unansweredCount} unanswered question(s). Are you sure you want to submit your mock test now?`;
    if (!confirm(confirmMsg)) {
      return;
    }
  } else {
    if (!confirm('Are you ready to submit your mock test and see your results?')) {
      return;
    }
  }

  isSubmitted.value = true;
  clearInterval(timerInterval);
  recordMockTestResult(props.mockTest.slug || props.mockTest.id, calculatedScore.value, props.mockTest.totalScore, isPassed.value);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Retake exam
function retakeExam() {
  userAnswers.value = {};
  isSubmitted.value = false;
  hasAutoSubmitted.value = false;
  timeRemainingSeconds.value = props.mockTest.timeMinutes * 60;
  isStarted.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Quick jump to a question on the page
function scrollToQuestion(questionId: number) {
  const el = document.getElementById(`q-${questionId}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    
    <!-- ========================================== -->
    <!-- PRE-TEST LOBBY SCREEN (BEFORE START / PLAY) -->
    <!-- ========================================== -->
    <div v-if="!isStarted" class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-lg p-4 sm:p-10 lg:p-12 space-y-6 sm:space-y-8 animate-in fade-in transition-all">
      
      <!-- Friendly Lobby Header -->
      <div class="text-center space-y-4 max-w-2xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-bold">
          <Sparkles class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          <span>HSK {{ mockTest.level }} Official Syllabus Simulation</span>
        </div>

        <h1 class="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 leading-tight">
          {{ mockTest.title }}
        </h1>

        <p class="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {{ mockTest.description }} Take a moment to review the exam instructions below, test your audio, and press the play button when you're ready to begin.
        </p>
      </div>

      <!-- 4 Quick Fact Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 text-center space-y-1">
          <div class="text-[11px] font-bold text-stone-400 dark:text-stone-400 uppercase tracking-wider">Time Allowed</div>
          <div class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center justify-center gap-1.5">
            <Clock class="w-4 h-4 text-rose-500" />
            <span>{{ mockTest.timeMinutes }}m</span>
          </div>
          <div class="text-[11px] text-stone-500 dark:text-stone-400">Auto-submits on 0:00</div>
        </div>

        <div class="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 text-center space-y-1">
          <div class="text-[11px] font-bold text-stone-400 dark:text-stone-400 uppercase tracking-wider">All Questions</div>
          <div class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center justify-center gap-1.5">
            <FileText class="w-4 h-4 text-sky-500" />
            <span>{{ mockTest.questions.length }}</span>
          </div>
          <div class="text-[11px] text-stone-500 dark:text-stone-400">All on one page</div>
        </div>

        <div class="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 text-center space-y-1">
          <div class="text-[11px] font-bold text-stone-400 dark:text-stone-400 uppercase tracking-wider">Pass Cutoff</div>
          <div class="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1.5">
            <Award class="w-4 h-4 text-emerald-600" />
            <span>{{ mockTest.passingScore }}</span>
          </div>
          <div class="text-[11px] text-stone-500 dark:text-stone-400">Out of {{ mockTest.totalScore }} pts</div>
        </div>

        <div class="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 text-center space-y-1">
          <div class="text-[11px] font-bold text-stone-400 dark:text-stone-400 uppercase tracking-wider">Exam Format</div>
          <div class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center justify-center gap-1.5 capitalize">
            <Headphones v-if="mockTest.category === 'listening'" class="w-4 h-4 text-purple-500" />
            <FileText v-else class="w-4 h-4 text-amber-500" />
            <span>{{ mockTest.category }}</span>
          </div>
          <div class="text-[11px] text-stone-500 dark:text-stone-400">Gate {{ mockTest.gateNumber }}</div>
        </div>
      </div>

      <!-- Friendly Preparation Advice & Audio Test -->
      <div class="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-stone-50 to-stone-100/70 dark:from-stone-800/80 dark:to-stone-800/40 border border-stone-200/80 dark:border-stone-700 space-y-4">
        <h3 class="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Headphones class="w-4 h-4 text-rose-600 dark:text-rose-400" />
          <span>Before You Press Play</span>
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600 dark:text-stone-300">
          <div class="flex items-start gap-2">
            <CheckCircle class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>All on One Page:</strong> You can scroll through and answer any question at any time.</span>
          </div>
          <div class="flex items-start gap-2">
            <CheckCircle class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Audio Playback:</strong> For listening items, click the speaker icon to replay the dialogue whenever needed.</span>
          </div>
          <div class="flex items-start gap-2">
            <CheckCircle class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Continuous Timer:</strong> Once started, the countdown runs until you finish or time runs out.</span>
          </div>
          <div class="flex items-start gap-2">
            <CheckCircle class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Instant Review:</strong> Detailed explanations and correct answers are revealed immediately after submission.</span>
          </div>
        </div>

        <!-- Audio Check Button -->
        <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-200 dark:border-stone-700">
          <span class="text-xs text-stone-500 dark:text-stone-400">Want to test your audio output first?</span>
          <button 
            @click="testSound"
            :disabled="isTestingSound"
            class="px-4 py-2 rounded-xl bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-bold text-xs inline-flex items-center gap-2 transition-all shadow-2xs active:scale-95"
          >
            <Volume2 class="w-4 h-4 text-rose-600 dark:text-rose-400" :class="{ 'animate-pulse': isTestingSound }" />
            <span>{{ isTestingSound ? 'Playing audio test...' : '🔊 Test Sound (Sound Check)' }}</span>
          </button>
        </div>
      </div>

      <!-- Big Friendly PLAY BUTTON -->
      <div class="text-center pt-2 space-y-3">
        <button 
          @click="startExam"
          class="w-full sm:w-auto sm:min-w-80 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-base sm:text-lg shadow-xl shadow-rose-600/30 inline-flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Play class="w-6 h-6 fill-current text-white shrink-0" />
          <span>START MOCK TEST NOW (PLAY)</span>
        </button>
        <p class="text-xs text-stone-400">
          Timer starts immediately upon pressing play · No logins required
        </p>
      </div>

    </div>

    <!-- ========================================== -->
    <!-- ACTIVE EXAM SCREEN (ALL QUESTIONS ON ONE PAGE) -->
    <!-- ========================================== -->
    <div v-else class="space-y-8 animate-in fade-in">
      
      <!-- STICKY TOP HUD BAR -->
      <div class="sticky top-16 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-md p-4 transition-all">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <!-- Title & Level Info -->
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300">
                HSK {{ mockTest.level }}
              </span>
              <span class="text-xs font-bold text-stone-900 dark:text-stone-100 truncate max-w-xs sm:max-w-md">
                {{ mockTest.title }}
              </span>
            </div>
            
            <!-- Question jump buttons and Answered counter -->
            <div class="flex items-center gap-3 mt-1.5 flex-wrap">
              <span class="text-xs text-stone-500 dark:text-stone-400 font-medium">
                Answered: <strong class="text-stone-900 dark:text-stone-100">{{ totalAnswered }}</strong> / {{ mockTest.questions.length }}
              </span>

              <!-- Quick scroll jump pills -->
              <div class="flex items-center gap-1.5">
                <button 
                  v-for="(q, idx) in mockTest.questions"
                  :key="q.id"
                  @click="scrollToQuestion(q.id)"
                  :class="[
                    'w-6 h-6 rounded-md text-[11px] font-bold flex items-center justify-center transition-all',
                    userAnswers[q.id] !== undefined
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
                  ]"
                  :title="`Scroll to question ${idx + 1}`"
                >
                  {{ idx + 1 }}
                </button>
              </div>
            </div>
          </div>

          <!-- Live Timer & Submit Action -->
          <div class="flex items-center gap-3 shrink-0 self-end sm:self-center">
            <!-- Timer Clock -->
            <div 
              class="flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-sm sm:text-base font-black shadow-2xs border"
              :class="timeRemainingSeconds < 180 ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700 animate-pulse' : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700'"
            >
              <Clock class="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>{{ formattedTime }}</span>
            </div>

            <!-- Submit Button (active while test is running) -->
            <button 
              v-if="!isSubmitted"
              @click="submitExam"
              class="px-4 py-2 text-xs font-black rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
            >
              <CheckCircle2 class="w-4 h-4" />
              <span>Submit Test</span>
            </button>
          </div>

        </div>
      </div>

      <!-- AUTO-SUBMITTED ALERT BANNER (If time expired) -->
      <div v-if="hasAutoSubmitted" class="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-950 dark:text-amber-200 text-sm font-semibold flex items-center gap-3 shadow-xs">
        <Clock class="w-6 h-6 text-amber-600 shrink-0" />
        <div>
          <div class="font-bold text-amber-900 dark:text-amber-200">⏰ Time has expired!</div>
          <div class="text-xs text-amber-800 dark:text-amber-300 mt-0.5">Your mock exam has been automatically submitted according to official test timing rules.</div>
        </div>
      </div>

      <!-- EXAM SCORE & RESULTS CARD (Appears after submission) -->
      <div 
        v-if="isSubmitted" 
        class="rounded-3xl border shadow-lg p-6 sm:p-8 transition-all space-y-6"
        :class="isPassed ? 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 dark:from-emerald-950/40 dark:via-stone-900 dark:to-emerald-950/30 border-emerald-300 dark:border-emerald-800' : 'bg-gradient-to-br from-rose-50 via-white to-rose-50/50 dark:from-rose-950/40 dark:via-stone-900 dark:to-rose-950/30 border-rose-300 dark:border-rose-800'"
      >
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div 
              class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
              :class="isPassed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'"
            >
              <CheckCircle2 v-if="isPassed" class="w-8 h-8" />
              <AlertCircle v-else class="w-8 h-8" />
            </div>

            <div>
              <div class="text-xs font-bold uppercase tracking-wider" :class="isPassed ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'">
                {{ isPassed ? 'Test Passed Successfully' : 'Test Completed — Practice Recommended' }}
              </div>
              <h2 class="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 mt-0.5">
                {{ isPassed ? 'Congratulations! You Passed!' : 'Good Effort! Keep Practicing.' }}
              </h2>
              <p class="text-xs text-stone-600 dark:text-stone-300 mt-1">
                {{ isPassed 
                  ? `You achieved ${calculatedScore} points, surpassing the official ${mockTest.passingScore}-point passing benchmark.` 
                  : `You scored ${calculatedScore} points. The official passing cutoff is ${mockTest.passingScore} points. Review question breakdowns below.` 
                }}
              </p>
            </div>
          </div>

          <!-- Big Score Stats -->
          <div class="flex items-center gap-4 shrink-0">
            <div class="text-center sm:text-right">
              <div class="text-3xl sm:text-4xl font-black" :class="isPassed ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'">
                {{ calculatedScore }} <span class="text-base font-normal text-stone-400 dark:text-stone-500">/ {{ mockTest.totalScore }}</span>
              </div>
              <div class="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-0.5">
                {{ correctAnswersCount }} of {{ mockTest.questions.length }} correct ({{ Math.round((calculatedScore / mockTest.totalScore) * 100) }}%)
              </div>
            </div>

            <button 
              @click="retakeExam"
              class="px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 text-white dark:text-stone-900 font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <RotateCcw class="w-4 h-4" />
              <span>Retake Test</span>
            </button>
          </div>
        </div>

        <div class="pt-4 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>Scroll down to inspect full question-by-question analysis.</span>
          <span class="font-semibold text-stone-700 dark:text-stone-300">All {{ mockTest.questions.length }} Questions Below</span>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- CONTINUOUS QUESTIONS LIST (ALL ON ONE PAGE) -->
      <!-- ========================================== -->
      <div class="space-y-6">
        
        <div 
          v-for="(q, idx) in mockTest.questions" 
          :key="q.id"
          :id="`q-${q.id}`"
          class="bg-white dark:bg-stone-900 rounded-3xl border shadow-xs p-6 sm:p-8 space-y-6 scroll-mt-36 transition-all"
          :class="[
            isSubmitted 
              ? (userAnswers[q.id] === q.correctAnswer ? 'border-emerald-200/90 dark:border-emerald-800 bg-emerald-50/10' : 'border-rose-200/90 dark:border-rose-800 bg-rose-50/10')
              : (userAnswers[q.id] !== undefined ? 'border-stone-300 dark:border-stone-700 shadow-sm' : 'border-stone-200/80 dark:border-stone-800')
          ]"
        >
          
          <!-- Question Header Row -->
          <div class="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800 flex-wrap gap-2">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-black text-xs flex items-center justify-center shrink-0">
                #{{ idx + 1 }}
              </span>
              <div>
                <span class="text-xs font-bold text-stone-900 dark:text-stone-100">Question {{ idx + 1 }} of {{ mockTest.questions.length }}</span>
                <span class="text-[10px] text-stone-400 dark:text-stone-500 ml-2 uppercase tracking-wider font-semibold">({{ q.section }} Section)</span>
              </div>
            </div>

            <!-- Answer Status Badge -->
            <div class="flex items-center gap-2">
              <span 
                v-if="!isSubmitted"
                :class="[
                  'text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1',
                  userAnswers[q.id] !== undefined 
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                ]"
              >
                <Check v-if="userAnswers[q.id] !== undefined" class="w-3 h-3" />
                <span>{{ userAnswers[q.id] !== undefined ? 'Answer Selected' : 'Not Answered' }}</span>
              </span>

              <!-- Post-Submission Result Badge -->
              <span 
                v-else
                :class="[
                  'text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1',
                  userAnswers[q.id] === q.correctAnswer
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                ]"
              >
                <CheckCircle2 v-if="userAnswers[q.id] === q.correctAnswer" class="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <XCircle v-else class="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
                <span>{{ userAnswers[q.id] === q.correctAnswer ? 'Correct (+20 pts)' : 'Incorrect (0 pts)' }}</span>
              </span>
            </div>
          </div>

          <!-- LISTENING AUDIO PLAYER BOX (If question has audio prompt) -->
          <div 
            v-if="q.section === 'listening' && q.audioPrompt"
            class="p-4 rounded-2xl bg-gradient-to-r from-rose-50/80 to-amber-50/60 dark:from-rose-950/40 dark:to-stone-850 border border-rose-200/90 dark:border-rose-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
          >
            <div class="flex items-center gap-3">
              <button 
                @click="playQuestionAudio(q.id, q.audioPrompt)"
                class="w-11 h-11 rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 text-white flex items-center justify-center shrink-0 shadow-md transition-all"
                :title="`Listen to Question ${idx + 1} audio`"
              >
                <Volume2 class="w-5 h-5" :class="{ 'animate-pulse': currentlyPlayingQuestionId === q.id }" />
              </button>
              <div>
                <div class="text-xs sm:text-sm font-bold text-rose-950 dark:text-rose-200 flex items-center gap-1.5">
                  <span>Audio Dialogue Prompt</span>
                  <span v-if="currentlyPlayingQuestionId === q.id" class="text-[10px] font-bold px-2 py-0.2 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 animate-pulse">Playing</span>
                </div>
                <div class="text-[11px] text-rose-700 dark:text-rose-300">Tap speaker button to listen to native pronunciation (repeat anytime)</div>
              </div>
            </div>

            <div class="flex items-center gap-2 self-start sm:self-center">
              <button 
                @click="playQuestionAudio(q.id, q.audioPrompt, false)"
                class="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700 text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Play class="w-3 h-3 fill-current text-rose-600 dark:text-rose-400" />
                <span>Play Dialogue</span>
              </button>

              <button 
                @click="playQuestionAudio(q.id, q.audioPrompt, true)"
                class="px-2.5 py-1.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 text-xs font-bold inline-flex items-center gap-1 transition-all shadow-2xs"
                title="Slow speed for beginners"
              >
                <span>🐢 Slow</span>
              </button>
            </div>
          </div>

          <!-- Question Prompt Text -->
          <div class="space-y-1">
            <div class="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">Question Statement</div>
            <div class="text-base sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-relaxed font-sans">
              {{ q.textPrompt }}
            </div>
          </div>

          <!-- Multiple-Choice Options List -->
          <div class="space-y-3 pt-1">
            <div class="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">Choose the Correct Answer</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div 
                v-for="(option, optIdx) in q.options"
                :key="optIdx"
                @click="selectAnswer(q.id, option)"
                :class="[
                  'p-4 rounded-2xl border text-sm sm:text-base font-medium transition-all flex items-center justify-between gap-3 cursor-pointer select-none',
                  !isSubmitted && userAnswers[q.id] === option 
                    ? 'border-rose-600 dark:border-rose-500 bg-rose-50/90 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100 font-bold ring-2 ring-rose-500/20 shadow-xs' 
                    : (!isSubmitted ? 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200' : ''),
                  isSubmitted && option === q.correctAnswer
                    ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 font-bold ring-2 ring-emerald-500/20'
                    : '',
                  isSubmitted && userAnswers[q.id] === option && option !== q.correctAnswer
                    ? 'border-rose-500 bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300 line-through'
                    : '',
                  isSubmitted && userAnswers[q.id] !== option && option !== q.correctAnswer
                    ? 'border-stone-200 dark:border-stone-700 opacity-60 text-stone-600 dark:text-stone-400'
                    : ''
                ]"
              >
                <div class="flex items-center gap-3">
                  <!-- Letter Badge (A, B, C, D) -->
                  <span 
                    class="w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 transition-colors"
                    :class="[
                      userAnswers[q.id] === option 
                        ? 'bg-rose-600 text-white' 
                        : (isSubmitted && option === q.correctAnswer ? 'bg-emerald-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300')
                    ]"
                  >
                    {{ getOptionLabel(optIdx) }}
                  </span>
                  <span class="leading-snug">{{ option }}</span>
                </div>

                <!-- Check icon on selection -->
                <div class="shrink-0">
                  <div 
                    v-if="userAnswers[q.id] === option && !isSubmitted" 
                    class="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xs"
                  >
                    <Check class="w-3.5 h-3.5" />
                  </div>
                  <div 
                    v-else-if="isSubmitted && option === q.correctAnswer"
                    class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs"
                  >
                    <Check class="w-3.5 h-3.5" />
                  </div>
                  <div 
                    v-else-if="isSubmitted && userAnswers[q.id] === option && option !== q.correctAnswer"
                    class="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xs"
                  >
                    <XCircle class="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- POST-SUBMISSION EXPLANATION CARD -->
          <div 
            v-if="isSubmitted"
            class="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/90 dark:border-stone-700 text-xs sm:text-sm space-y-2 animate-in fade-in"
          >
            <div class="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100">
              <HelpCircle class="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>Official Explanation & Breakdown</span>
            </div>
            <div class="text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
              {{ q.explanation }}
            </div>
            <div class="pt-2 flex items-center gap-2 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 border-t border-stone-200 dark:border-stone-700">
              <span>Correct Answer:</span>
              <span class="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200">{{ q.correctAnswer }}</span>
            </div>
          </div>

        </div>

      </div>

      <!-- BOTTOM PAGE ACTIONS & SUBMISSION BAR -->
      <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-md p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
        <div class="text-center sm:text-left">
          <div class="text-sm font-bold text-stone-900 dark:text-stone-100">
            {{ isSubmitted ? 'Exam Review Finished' : `You have answered ${totalAnswered} of ${mockTest.questions.length} questions.` }}
          </div>
          <div class="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            {{ isSubmitted ? 'Click Retake to try again, or exit to all gates.' : 'Make sure you have reviewed all answers before submitting.' }}
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button 
            @click="scrollToTop"
            class="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <ArrowUp class="w-4 h-4" />
            <span>Top</span>
          </button>

          <button 
            v-if="!isSubmitted"
            @click="submitExam"
            class="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow-md shadow-rose-600/25 flex items-center gap-2 transition-all active:scale-95"
          >
            <CheckCircle2 class="w-4 h-4" />
            <span>Submit Mock Test</span>
          </button>

          <button 
            v-else
            @click="retakeExam"
            class="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-black text-sm shadow-md flex items-center gap-2 transition-all active:scale-95"
          >
            <RotateCcw class="w-4 h-4" />
            <span>Retake This Test</span>
          </button>
        </div>
      </div>

    </div>

  </div>
</template>
