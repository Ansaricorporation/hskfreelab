<script setup lang="ts">
import { ref, computed } from 'vue';
import { BookOpen, Volume2, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-vue-next';
import { lessonsData } from '../data';
import { Lesson, HskLevel } from '../types';
import { playAudio } from '../utils/speech';
import AudioButton from '../components/ui/AudioButton.vue';
import { markLessonCompleted, activeProgress } from '../stores/auth';

const selectedLevel = ref<HskLevel>(1);
const selectedLessonSlug = ref<string>(lessonsData[0].slug);
const quizAnswers = ref<Record<number, number>>({});
const showQuizResults = ref(false);

const filteredLessons = computed(() => {
  return lessonsData.filter(l => l.level === selectedLevel.value);
});

const activeLesson = computed(() => {
  return lessonsData.find(l => l.slug === selectedLessonSlug.value) || filteredLessons.value[0];
});

function selectLesson(slug: string) {
  selectedLessonSlug.value = slug;
  quizAnswers.value = {};
  showQuizResults.value = false;
}

function answerQuestion(qIdx: number, optIdx: number) {
  quizAnswers.value[qIdx] = optIdx;
}

function checkQuiz() {
  showQuizResults.value = true;
  if (activeLesson.value?.slug) {
    markLessonCompleted(activeLesson.value.slug);
  }
}

function toggleCompleteLesson() {
  if (activeLesson.value?.slug) {
    markLessonCompleted(activeLesson.value.slug);
  }
}

function playDialogueAudio(text: string) {
  playAudio(text, 0.85);
}
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-10 pb-16">
    <!-- Header (Boxed Card) -->
    <div class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
        <BookOpen class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>Curated Curriculum</span>
      </div>
      <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
        Interactive HSK Lessons
      </h1>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
        Structured dialogues with native speech audio, real-time vocabulary breakdowns, and comprehension quizzes.
      </p>
    </div>

    <!-- Level Filter Tabs (Responsive Segmented Control) -->
    <div class="grid grid-cols-3 sm:flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 bg-stone-100 dark:bg-stone-800/90 rounded-2xl max-w-md mx-auto shadow-inner">
      <button 
        v-for="lvl in [1, 2, 3]" 
        :key="lvl"
        @click="selectedLevel = lvl as HskLevel; selectedLessonSlug = filteredLessons[0]?.slug || ''"
        :class="[
          'w-full sm:w-auto py-2 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap text-center shrink-0',
          selectedLevel === lvl 
            ? 'bg-emerald-600 text-white shadow-sm font-black' 
            : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
        ]"
      >
        <span class="inline sm:hidden whitespace-nowrap">HSK&nbsp;{{ lvl }}</span>
        <span class="hidden sm:inline whitespace-nowrap">HSK&nbsp;{{ lvl }} Lessons</span>
      </button>
    </div>

    <!-- Main Content Layout (Sidebar + Active Lesson) -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      <!-- Lesson Navigation Sidebar -->
      <div class="lg:col-span-1 space-y-2">
        <div class="flex items-center justify-between px-1">
          <h4 class="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">Lessons List</h4>
          <span class="text-[10px] text-stone-400 lg:hidden">Swipe →</span>
        </div>
        
        <!-- Responsive Container: Horizontal Scroll on Mobile, Vertical Stack on Desktop -->
        <div class="flex lg:flex-col overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 gap-1.5 lg:max-h-[600px] pr-1 scrollbar-thin">
          <button 
            v-for="(lesson, idx) in filteredLessons" 
            :key="lesson.id"
            @click="selectLesson(lesson.slug)"
            :class="[
              'text-left p-2.5 sm:p-3 rounded-xl text-xs font-semibold transition-all flex items-center lg:items-start gap-2 shrink-0 lg:shrink w-auto lg:w-full whitespace-nowrap lg:whitespace-normal',
              activeLesson?.slug === lesson.slug 
                ? 'bg-emerald-600 text-white shadow-sm font-bold' 
                : 'bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700'
            ]"
          >
            <span class="w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 font-bold" :class="activeLesson?.slug === lesson.slug ? 'bg-emerald-700 text-white' : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300'">
              {{ idx + 1 }}
            </span>
            <span class="line-clamp-1 lg:line-clamp-2">{{ lesson.title }}</span>
          </button>
        </div>
      </div>

      <!-- Active Lesson Body -->
      <div v-if="activeLesson" class="lg:col-span-3 space-y-8">
        
        <!-- Lesson Banner -->
        <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-8 space-y-4 transition-all">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              HSK {{ activeLesson.level }}
            </span>
            <span class="text-xs text-stone-400 dark:text-stone-500 font-mono">Lesson ID: {{ activeLesson.slug }}</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
            {{ activeLesson.title }}
          </h2>

          <p class="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {{ activeLesson.description }}
          </p>

          <!-- Key Vocabulary Pills -->
          <div class="pt-2 flex flex-wrap items-center gap-1.5">
            <span class="text-xs font-semibold text-stone-400 dark:text-stone-500 mr-1">Key Vocab:</span>
            <span 
              v-for="word in activeLesson.keyVocab" 
              :key="word"
              class="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-serif font-bold border border-stone-200 dark:border-stone-700"
            >
              {{ word }}
            </span>
          </div>
        </div>

        <!-- Dialogue Section -->
        <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-8 space-y-6 transition-all">
          <div class="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
            <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>Conversational Dialogue (对话)</span>
            </h3>
            <span class="text-xs text-stone-400 dark:text-stone-500">Tap speaker for audio</span>
          </div>

          <div class="space-y-4">
            <div 
              v-for="(line, lIdx) in activeLesson.dialogue" 
              :key="lIdx"
              class="p-4 rounded-2xl bg-stone-50/70 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all flex items-start gap-4"
            >
              <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
                {{ line.speaker }}
              </div>

              <div class="flex-1 space-y-1">
                <div class="flex items-center justify-between">
                  <div class="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">{{ line.zh }}</div>
                  <AudioButton :text="line.zh" size="sm" />
                </div>
                <div class="text-xs font-semibold text-emerald-700 dark:text-emerald-400">{{ line.py }}</div>
                <div class="text-xs text-stone-600 dark:text-stone-300 italic">{{ line.en }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Grammar Points Section -->
        <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-8 space-y-4 transition-all">
          <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>Core Grammar & Usage Notes</span>
          </h3>

          <ul class="space-y-2.5">
            <li 
              v-for="(point, pIdx) in activeLesson.grammarPoints" 
              :key="pIdx"
              class="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium flex items-start gap-2.5 border border-stone-100 dark:border-stone-800"
            >
              <span class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                {{ pIdx + 1 }}
              </span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>

        <!-- Comprehension Check Quiz -->
        <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-8 space-y-6 transition-all">
          <div class="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
            <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100">
              Comprehension Check Quiz
            </h3>
            <span class="text-xs text-stone-400 dark:text-stone-500">{{ activeLesson.practiceQuestions.length }} Questions</span>
          </div>

          <div class="space-y-6">
            <div 
              v-for="(q, qIdx) in activeLesson.practiceQuestions" 
              :key="qIdx"
              class="space-y-3"
            >
              <div class="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {{ qIdx + 1 }}. {{ q.question }}
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button 
                  v-for="(opt, optIdx) in q.options" 
                  :key="optIdx"
                  @click="answerQuestion(qIdx, optIdx)"
                  :class="[
                    'p-3 rounded-xl border text-xs sm:text-sm font-medium text-left transition-all',
                    quizAnswers[qIdx] === optIdx 
                      ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 font-bold ring-2 ring-emerald-500/20' 
                      : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200',
                    showQuizResults && optIdx === q.correctIndex ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/60 font-bold text-emerald-950 dark:text-emerald-100' : '',
                    showQuizResults && quizAnswers[qIdx] === optIdx && optIdx !== q.correctIndex ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200' : ''
                  ]"
                >
                  {{ opt }}
                </button>
              </div>

              <!-- Explanation -->
              <div v-if="showQuizResults" class="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300">
                <strong>Explanation:</strong> {{ q.explanation }}
              </div>
            </div>

            <div class="pt-2">
              <button 
                @click="checkQuiz"
                class="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white dark:text-stone-900 font-bold text-xs transition-colors shadow-xs"
              >
                Check Answers
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>
