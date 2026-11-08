<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import { 
  Sparkles, 
  PenTool, 
  Calculator, 
  Volume2, 
  Award, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap,
  Heart,
  Smile,
  Compass
} from 'lucide-vue-next';
import AudioButton from '../components/ui/AudioButton.vue';
import ProgressDashboard from '../components/progress/ProgressDashboard.vue';
import BeginnerQuickStart from '../components/tools/BeginnerQuickStart.vue';

// Lazy-load StrokeAnimator dynamically to minimize initial bundle size and boost page load performance
const StrokeAnimator = defineAsyncComponent(() => import('../components/tools/StrokeAnimator.vue'));

// Lightweight featured blogs metadata (prevents bundling 230kB blog markdown articles on home page)
const featuredBlogs = [
  {
    slug: 'hsk-1-study-plan',
    title: 'HSK 1 Study Plan: The Definitive 30-Day Blueprint to Pass with a Perfect Score',
    summary: 'A scientifically structured 4-week daily routine to master 150 vocabulary words, essential grammar patterns, and native auditory comprehension with zero fluff.',
    date: '2026-10-15',
    readTime: '9 min read',
    tags: ['Study Guide', 'HSK 1', 'Beginner']
  },
  {
    slug: 'hsk-1-vs-hsk-2',
    title: 'HSK 1 vs HSK 2: Comprehensive Level Comparison, Vocabulary Expansion, and Transition Guide',
    summary: 'A detailed comparative analysis dissecting vocabulary count, syntax structures, listening speeds, and functional fluency differences between HSK Level 1 and Level 2.',
    date: '2026-10-18',
    readTime: '8 min read',
    tags: ['Comparison', 'HSK 1', 'HSK 2']
  },
  {
    slug: 'hsk-3-writing-section-explained',
    title: 'Mastering the HSK 3 Writing Section: Sentence Reconstruction, Character Stroke Accuracy, and Common Pitfalls',
    summary: 'An authoritative tactical breakdown of the HSK 3 written examination section, featuring sentence scramble ordering strategies, stroke direction rules, and grading rubrics.',
    date: '2026-10-22',
    readTime: '10 min read',
    tags: ['HSK 3', 'Writing', 'Exam Prep']
  }
];

const dailyWords = [
  { hanzi: '好', pinyin: 'hǎo', meaning: 'Good; well; fine', level: 1, example: '今天天气很好。' },
  { hanzi: '爱', pinyin: 'ài', meaning: 'To love; affection', level: 1, example: '我爱学习汉语。' },
  { hanzi: '学', pinyin: 'xué', meaning: 'To study; to learn', level: 1, example: '他在学校学习。' }
];

const selectedDaily = ref(dailyWords[0]);
</script>

<template>
  <div class="w-full max-w-7xl mx-auto flex flex-col items-center space-y-12 sm:space-y-16 pb-12">
    
    <!-- Hero Banner (Contained in a Modern Boxed Card) -->
    <section class="relative overflow-hidden pt-2 sm:pt-4 w-full max-w-7xl mx-auto">
      <div class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-5 sm:p-10 lg:p-12 shadow-sm space-y-6 sm:space-y-8 relative overflow-hidden w-full mx-auto">
        
        <!-- Subtle background glow -->
        <div class="absolute -top-24 -right-24 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Trust Badge Pill -->
        <div class="text-center">
          <div class="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-[11px] sm:text-xs font-bold shadow-xs max-w-full">
            <Sparkles class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
            <span class="whitespace-nowrap">100% Free Platform</span>
            <span class="text-rose-300 dark:text-rose-700 hidden xs:inline">·</span>
            <span class="whitespace-nowrap">Zero Paywalls</span>
            <span class="text-rose-300 dark:text-rose-700 hidden xs:inline">·</span>
            <span class="whitespace-nowrap">No Login Required</span>
          </div>
        </div>

        <!-- Main Heading -->
        <div class="text-center max-w-3xl mx-auto space-y-4">
          <h1 class="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-[1.2]">
            Master <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 whitespace-nowrap">HSK&nbsp;1,&nbsp;2&nbsp;&amp;&nbsp;3</span> With Complete Confidence.
          </h1>

          <!-- Descriptive Text Box -->
          <div class="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed text-center max-w-2xl mx-auto shadow-xs">
            Everything you need to pass official Chinese proficiency exams: interactive stroke order animator, real-time score calculator, Pinyin tone trainer, and verified vocabulary decks.
          </div>
        </div>

        <!-- CTA Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto sm:max-w-none">
          <router-link 
            to="/hsk-1" 
            class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-900 dark:text-white dark:border dark:border-neutral-700 dark:hover:bg-neutral-800 font-bold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Start HSK 1 Free</span>
            <ArrowRight class="w-4 h-4" />
          </router-link>

          <router-link 
            to="/stroke-order" 
            class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 font-bold text-sm sm:text-base transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <PenTool class="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>Animate Any Character</span>
          </router-link>

          <router-link 
            to="/mock-tests" 
            class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-800 font-bold text-sm sm:text-base transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Award class="w-4 h-4 text-purple-700 dark:text-purple-400" />
            <span>30 Mock Gates</span>
          </router-link>
        </div>

        <!-- 4 Core Modular Feature Boxes ("Text in boxes") -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
          
          <!-- Box 1: Vocab -->
          <router-link 
            to="/hsk-1" 
            class="p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/60 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group block shadow-xs"
          >
            <div class="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1.5">
              <BookOpen class="w-4 h-4" />
              <span>603 Syllabus Words</span>
            </div>
            <p class="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              HSK 1 (150), HSK 2 (150), and HSK 3 (300) cards with audio, Pinyin, and example sentences.
            </p>
          </router-link>

          <!-- Box 2: Stroke Animator -->
          <router-link 
            to="/stroke-order" 
            class="p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/60 hover:border-rose-300 dark:hover:border-rose-700 transition-all group block shadow-xs"
          >
            <div class="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400 mb-1.5">
              <PenTool class="w-4 h-4" />
              <span>Stroke Animator & Quiz</span>
            </div>
            <p class="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Step-by-step Hanzi Writer stroke animations, handwriting quiz mode, and 7 Golden Rules.
            </p>
          </router-link>

          <!-- Box 3: Mock Tests -->
          <router-link 
            to="/mock-tests" 
            class="p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/60 hover:border-purple-300 dark:hover:border-purple-700 transition-all group block shadow-xs"
          >
            <div class="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-400 mb-1.5">
              <Award class="w-4 h-4" />
              <span>30 Timed Mock Tests</span>
            </div>
            <p class="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              10 test gates per level with listening audio dialogue player, reading questions, and countdown timers.
            </p>
          </router-link>

          <!-- Box 4: Tone Trainer -->
          <router-link 
            to="/pinyin-trainer" 
            class="p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-all group block shadow-xs"
          >
            <div class="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400 mb-1.5">
              <Volume2 class="w-4 h-4" />
              <span>Pinyin & Tone Soundboard</span>
            </div>
            <p class="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Master the 4 Mandarin tones, 23 initials, 24 finals, and test pitch recognition with the ear trainer.
            </p>
          </router-link>

        </div>

        <!-- Trust Badges in Clean Boxed Pills -->
        <div class="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-stone-600 dark:text-stone-400 font-medium">
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100/70 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 text-[11px] sm:text-xs">
            <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>CLEC Official Syllabus Aligned</span>
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100/70 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 text-[11px] sm:text-xs">
            <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Native Web Speech Audio (TTS)</span>
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100/70 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 text-[11px] sm:text-xs">
            <ShieldCheck class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Client-Side Browser Storage</span>
          </span>
        </div>

      </div>
    </section>

    <!-- Beginner QuickStart Roadmap -->
    <section class="w-full max-w-7xl mx-auto">
      <BeginnerQuickStart />
    </section>

    <!-- Learning Progress Dashboard -->
    <section class="w-full max-w-7xl mx-auto">
      <ProgressDashboard />
    </section>

    <!-- Three Level Hubs Grid -->
    <section class="w-full max-w-7xl mx-auto">
      <div class="text-center max-w-xl mx-auto mb-10">
        <h2 class="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">Choose Your HSK Level</h2>
        <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">Structured vocabulary, lessons, and mock tests for every stage of your journey.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- HSK 1 Card -->
        <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md hover:shadow-xl transition-all p-7 flex flex-col justify-between group">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                HSK 1 · CEFR A1
              </span>
              <span class="text-xs text-stone-400 dark:text-stone-500">Beginner</span>
            </div>
            <h3 class="text-2xl font-black text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              HSK Level 1
            </h3>
            <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Understand and use simple phrases. Communicate in basic everyday scenarios like shopping, greetings, and numbers.
            </p>
            <div class="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
              <div class="flex justify-between"><span>Required Vocab:</span> <strong class="text-stone-900 dark:text-stone-100">150 Words</strong></div>
              <div class="flex justify-between"><span>Exam Format:</span> <strong class="text-stone-900 dark:text-stone-100">Listening + Reading (~40 min)</strong></div>
              <div class="flex justify-between"><span>Passing Score:</span> <strong class="text-emerald-700 dark:text-emerald-400">120 / 200</strong></div>
            </div>
          </div>

          <div class="pt-6">
            <router-link 
              to="/hsk-1" 
              class="w-full py-2.5 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 hover:text-white text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Explore HSK 1 Hub</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </router-link>
          </div>
        </div>

        <!-- HSK 2 Card -->
        <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md hover:shadow-xl transition-all p-7 flex flex-col justify-between group">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                HSK 2 · CEFR A2
              </span>
              <span class="text-xs text-stone-400 dark:text-stone-500">Elementary</span>
            </div>
            <h3 class="text-2xl font-black text-stone-900 dark:text-stone-100 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
              HSK Level 2
            </h3>
            <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Converse comfortably about familiar everyday topics: ordering at restaurants, travel, weather, and routines.
            </p>
            <div class="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
              <div class="flex justify-between"><span>Required Vocab:</span> <strong class="text-stone-900 dark:text-stone-100">300 Words</strong></div>
              <div class="flex justify-between"><span>Exam Format:</span> <strong class="text-stone-900 dark:text-stone-100">Listening + Reading (~55 min)</strong></div>
              <div class="flex justify-between"><span>Passing Score:</span> <strong class="text-sky-700 dark:text-sky-400">120 / 200</strong></div>
            </div>
          </div>

          <div class="pt-6">
            <router-link 
              to="/hsk-2" 
              class="w-full py-2.5 px-4 rounded-xl bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-600 hover:text-white text-sky-800 dark:text-sky-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Explore HSK 2 Hub</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </router-link>
          </div>
        </div>

        <!-- HSK 3 Card -->
        <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md hover:shadow-xl transition-all p-7 flex flex-col justify-between group">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                HSK 3 · CEFR B1
              </span>
              <span class="text-xs text-stone-400 dark:text-stone-500">Intermediate</span>
            </div>
            <h3 class="text-2xl font-black text-stone-900 dark:text-stone-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors">
              HSK Level 3
            </h3>
            <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Communicate in academic, professional, and leisure settings. Write simple sentences and grasp complex syntax.
            </p>
            <div class="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
              <div class="flex justify-between"><span>Required Vocab:</span> <strong class="text-stone-900 dark:text-stone-100">600 Words</strong></div>
              <div class="flex justify-between"><span>Exam Format:</span> <strong class="text-stone-900 dark:text-stone-100">Listening + Reading + Writing (~90 min)</strong></div>
              <div class="flex justify-between"><span>Passing Score:</span> <strong class="text-rose-700 dark:text-rose-400">180 / 300</strong></div>
            </div>
          </div>

          <div class="pt-6">
            <router-link 
              to="/hsk-3" 
              class="w-full py-2.5 px-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-600 hover:text-white text-rose-800 dark:text-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Explore HSK 3 Hub</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </router-link>
          </div>
        </div>

      </div>
    </section>

    <!-- Interactive Tool Showcase Section -->
    <section class="w-full max-w-7xl mx-auto">
      <div class="bg-gradient-to-b from-stone-50 to-white dark:from-stone-900 dark:to-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 sm:p-12 shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div class="space-y-5">
            <span class="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Built-in Interactive Tool</span>
            <h2 class="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 leading-tight">
              Master Hanzi Stroke Order With Instant Visual Feedback.
            </h2>
            <p class="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Writing characters correctly is essential for memory retention and HSK 3 written sections. Our animator shows the exact direction, stroke count, and radical decomposition with audio support.
            </p>

            <div class="space-y-3 pt-2">
              <div class="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
                <CheckCircle2 class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Interactive drawing quiz mode tests your finger strokes</span>
              </div>
              <div class="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
                <CheckCircle2 class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Speed controls (0.5x, 1x, 2x) for meticulous learners</span>
              </div>
              <div class="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
                <CheckCircle2 class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Powered by Hanzi Writer under permissive MIT open license</span>
              </div>
            </div>

            <div class="pt-4">
              <router-link 
                to="/stroke-order" 
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-rose-700 dark:hover:bg-rose-600 text-white dark:text-stone-900 font-bold text-xs transition-colors"
              >
                <span>Launch Full Stroke Studio</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </router-link>
            </div>
          </div>

          <!-- Embedded Live Stroke Animator Preview -->
          <div class="w-full">
            <StrokeAnimator initialCharacter="爱" :size="220" />
          </div>

        </div>
      </div>
    </section>

    <!-- Quick Tools Grid -->
    <section class="w-full max-w-7xl mx-auto">
      <div class="text-center max-w-xl mx-auto mb-10">
        <h2 class="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">Diagnostic & Study Tools</h2>
        <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">Accelerate your progress with zero setup or logins.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Score Calculator -->
        <router-link 
          to="/calculator" 
          class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 shadow-sm hover:shadow-md transition-all group block"
        >
          <div class="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 w-fit mb-4 group-hover:scale-105 transition-transform">
            <Calculator class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
            HSK Score Calculator
          </h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
            Input your test marks and calculate pass/fail status, CEFR benchmark, and personalized section advice.
          </p>
          <div class="mt-4 flex items-center text-xs font-semibold text-amber-700 dark:text-amber-400 gap-1">
            <span>Calculate now</span> <ArrowRight class="w-3 h-3" />
          </div>
        </router-link>

        <!-- Pronunciation Trainer -->
        <router-link 
          to="/pinyin-trainer" 
          class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 shadow-sm hover:shadow-md transition-all group block"
        >
          <div class="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 w-fit mb-4 group-hover:scale-105 transition-transform">
            <Volume2 class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors">
            Pinyin Tone Trainer
          </h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
            Full 23 initials and 24 finals interactive soundboard plus a gamified tone ear-training quiz.
          </p>
          <div class="mt-4 flex items-center text-xs font-semibold text-blue-700 dark:text-blue-400 gap-1">
            <span>Practice tones</span> <ArrowRight class="w-3 h-3" />
          </div>
        </router-link>

        <!-- Timed Mock Tests -->
        <router-link 
          to="/mock-tests" 
          class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 shadow-sm hover:shadow-md transition-all group block"
        >
          <div class="p-3 rounded-2xl bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 w-fit mb-4 group-hover:scale-105 transition-transform">
            <Award class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-purple-800 dark:group-hover:text-purple-400 transition-colors">
            Official Mock Tests
          </h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
            Simulate real timed conditions with authentic audio prompts, auto-grading, and question explanations.
          </p>
          <div class="mt-4 flex items-center text-xs font-semibold text-purple-700 dark:text-purple-400 gap-1">
            <span>Take test</span> <ArrowRight class="w-3 h-3" />
          </div>
        </router-link>

      </div>
    </section>

    <!-- Curriculum & Linguistic Reference Hubs Section -->
    <section class="w-full max-w-7xl mx-auto">
      <div class="text-center max-w-xl mx-auto mb-10">
        <h2 class="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">Curriculum & Grammar Compendium</h2>
        <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">Structured sequential lessons and comprehensive grammatical references.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1: 30 Interactive Lessons -->
        <router-link 
          to="/lessons" 
          class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 shadow-sm hover:shadow-md transition-all group block"
        >
          <div class="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 w-fit mb-4 group-hover:scale-105 transition-transform">
            <GraduationCap class="w-6 h-6" />
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 uppercase">
            30 Structured Units
          </span>
          <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors mt-2">
            HSK 1–3 Complete Course
          </h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
            Step-by-step conversational dialogues, verified vocabulary tables, grammar notes, and comprehension quizzes across all 3 levels.
          </p>
          <div class="mt-4 flex items-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 gap-1">
            <span>Explore lessons</span> <ArrowRight class="w-3 h-3" />
          </div>
        </router-link>

        <!-- Card 2: 88 Grammar Points -->
        <router-link 
          to="/grammar" 
          class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 shadow-sm hover:shadow-md transition-all group block"
        >
          <div class="p-3 rounded-2xl bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 w-fit mb-4 group-hover:scale-105 transition-transform">
            <BookOpen class="w-6 h-6" />
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 uppercase">
            88 Grammar Rules
          </span>
          <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors mt-2">
            Complete Grammar Compendium
          </h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
            Formula structures, native example sentences, common pitfalls, and direct links to practice lessons for every HSK 1, 2, and 3 rule.
          </p>
          <div class="mt-4 flex items-center text-xs font-semibold text-rose-700 dark:text-rose-400 gap-1">
            <span>Browse all rules</span> <ArrowRight class="w-3 h-3" />
          </div>
        </router-link>

        <!-- Card 3: HSK History & Evolution -->
        <router-link 
          to="/hsk-history" 
          class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 shadow-sm hover:shadow-md transition-all group block"
        >
          <div class="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 w-fit mb-4 group-hover:scale-105 transition-transform">
            <Compass class="w-6 h-6" />
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 uppercase">
            Official Standards
          </span>
          <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors mt-2">
            HSK History & 3.0 Standards
          </h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
            The evolution of Chinese proficiency testing from HSK 1.0 to 2.0 and the upcoming 3.0 9-band framework by CLEC.
          </p>
          <div class="mt-4 flex items-center text-xs font-semibold text-indigo-700 dark:text-indigo-400 gap-1">
            <span>Learn history</span> <ArrowRight class="w-3 h-3" />
          </div>
        </router-link>
      </div>
    </section>

    <!-- Academic Guides & Masterclasses Section -->
    <section class="w-full max-w-7xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold mb-2">
            <BookOpen class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Research-Backed Learning</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">Academic Guides & Test Strategies</h2>
          <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">18 in-depth masterclasses, each 1,000+ words of actionable linguistics.</p>
        </div>

        <router-link 
          to="/guides" 
          class="text-xs font-bold text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300 flex items-center gap-1 shrink-0"
        >
          <span>View All 18 Masterclasses</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <router-link 
          v-for="b in featuredBlogs" 
          :key="b.slug"
          :to="`/guides/${b.slug}`"
          class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div class="space-y-3">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 uppercase">
                {{ b.tags[0] }}
              </span>
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                1,600+ words
              </span>
            </div>
            <h3 class="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
              {{ b.title }}
            </h3>
            <p class="text-xs text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed">
              {{ b.summary }}
            </p>
          </div>

          <div class="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400 dark:text-stone-500">
            <span>{{ b.readTime }}</span>
            <span class="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Read <ArrowRight class="w-3 h-3" />
            </span>
          </div>
        </router-link>
      </div>
    </section>

  </div>
</template>
