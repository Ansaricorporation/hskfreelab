<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  BookOpen, 
  Calculator, 
  PenTool, 
  Volume2, 
  Award, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown, 
  GitCompare,
  Sun, 
  Moon, 
  Coffee, 
  HardDrive
} from 'lucide-vue-next';
import { currentTheme, toggleTheme } from '../../stores/theme';
import { 
  openBackupModal,
  openToneGuide,
  totalLearnedWordsCount
} from '../../stores/auth';
import LearningProgressBar from '../progress/LearningProgressBar.vue';

const router = useRouter();
const isMobileMenuOpen = ref(false);
const isToolsDropdownOpen = ref(false);

function closeMenus() {
  isMobileMenuOpen.value = false;
  isToolsDropdownOpen.value = false;
}
</script>

<template>
  <header class="sticky top-0 z-40 w-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 shadow-xs transition-colors duration-200">
    <div class="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 flex items-center justify-between h-16 gap-2 xl:gap-3">
        
      <!-- Logo -->
      <router-link to="/" @click="closeMenus" class="flex items-center gap-1.5 sm:gap-2 group shrink-0">
        <div class="w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10 rounded-xl bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white border border-neutral-900 dark:border-neutral-700 flex items-center justify-center font-serif text-base sm:text-xl font-black shadow-sm group-hover:scale-105 transition-transform shrink-0">
          汉
        </div>
        <div>
          <div class="flex items-center gap-1.5 sm:gap-2">
            <span class="font-bold text-sm sm:text-base xl:text-lg text-stone-900 dark:text-stone-100 tracking-tight whitespace-nowrap">HSK Free Lab</span>
            <span class="hidden 2xl:inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded whitespace-nowrap">
              <Sparkles class="w-2.5 h-2.5" /> 100% Free
            </span>
          </div>
          <p class="text-[10px] text-stone-500 dark:text-stone-400 hidden 2xl:block whitespace-nowrap">Zero Paywalls · Track Progress</p>
        </div>
      </router-link>

      <!-- Desktop Navigation Links (Responsive, Compact, Never Wraps) -->
      <nav class="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
        <!-- Level Hubs with Non-breaking Spaces & Shrink-0 -->
        <router-link 
          to="/hsk-1" 
          class="px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors whitespace-nowrap shrink-0"
          active-class="text-emerald-700 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/60 font-bold"
        >
          <span class="whitespace-nowrap">HSK&nbsp;1</span>
        </router-link>
        <router-link 
          to="/hsk-2" 
          class="px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-sky-700 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-lg transition-colors whitespace-nowrap shrink-0"
          active-class="text-sky-700 dark:text-sky-400 bg-sky-50/80 dark:bg-sky-950/60 font-bold"
        >
          <span class="whitespace-nowrap">HSK&nbsp;2</span>
        </router-link>
        <router-link 
          to="/hsk-3" 
          class="px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-rose-700 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors whitespace-nowrap shrink-0"
          active-class="text-rose-700 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/60 font-bold"
        >
          <span class="whitespace-nowrap">HSK&nbsp;3</span>
        </router-link>

        <div class="h-4 w-px bg-stone-200 dark:bg-stone-700 mx-0.5 shrink-0"></div>

        <!-- Tools Dropdown -->
        <div class="relative shrink-0">
          <button 
            @click="isToolsDropdownOpen = !isToolsDropdownOpen" 
            class="px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Tools</span>
            <ChevronDown class="w-3.5 h-3.5 text-stone-400 shrink-0" />
          </button>

          <!-- Dropdown Menu -->
          <div 
            v-if="isToolsDropdownOpen" 
            @mouseleave="isToolsDropdownOpen = false"
            class="absolute left-0 mt-1 w-64 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 py-2 z-50 animate-in fade-in"
          >
            <router-link 
              to="/words" 
              @click="closeMenus" 
              class="flex items-center gap-3 px-4 py-2.5 text-xs text-stone-700 dark:text-stone-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-400"
            >
              <div class="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                <BookOpen class="w-4 h-4" />
              </div>
              <div>
                <div class="font-bold text-stone-900 dark:text-stone-100">603 Words Dictionary</div>
                <div class="text-[11px] text-stone-400">HSK 1-3 vocab with stroke orders</div>
              </div>
            </router-link>

            <router-link 
              to="/compare" 
              @click="closeMenus" 
              class="flex items-center gap-3 px-4 py-2.5 text-xs text-stone-700 dark:text-stone-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-700 dark:hover:text-amber-400"
            >
              <div class="p-2 rounded-lg bg-amber-100/70 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                <GitCompare class="w-4 h-4" />
              </div>
              <div>
                <div class="font-bold text-stone-900 dark:text-stone-100">Confusing Words Guide</div>
                <div class="text-[11px] text-stone-400">不 vs 没, 二 vs 两, 的 / 得 / 地</div>
              </div>
            </router-link>

            <router-link 
              to="/stroke-order" 
              @click="closeMenus" 
              class="flex items-center gap-3 px-4 py-2.5 text-xs text-stone-700 dark:text-stone-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-700 dark:hover:text-rose-400"
            >
              <div class="p-2 rounded-lg bg-rose-100/70 dark:bg-rose-950 text-rose-700 dark:text-rose-400">
                <PenTool class="w-4 h-4" />
              </div>
              <div>
                <div class="font-bold text-stone-900 dark:text-stone-100">Stroke Animator</div>
                <div class="text-[11px] text-stone-400">Hanzi stroke directions & quiz</div>
              </div>
            </router-link>

            <router-link 
              to="/calculator" 
              @click="closeMenus" 
              class="flex items-center gap-3 px-4 py-2.5 text-xs text-stone-700 dark:text-stone-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-700 dark:hover:text-amber-400"
            >
              <div class="p-2 rounded-lg bg-amber-100/70 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                <Calculator class="w-4 h-4" />
              </div>
              <div>
                <div class="font-bold text-stone-900 dark:text-stone-100">Score Calculator</div>
                <div class="text-[11px] text-stone-400">Official pass/fail scoring formulas</div>
              </div>
            </router-link>

            <router-link 
              to="/pinyin-trainer" 
              @click="closeMenus" 
              class="flex items-center gap-3 px-4 py-2.5 text-xs text-stone-700 dark:text-stone-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-700 dark:hover:text-blue-400"
            >
              <div class="p-2 rounded-lg bg-blue-100/70 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
                <Volume2 class="w-4 h-4" />
              </div>
              <div>
                <div class="font-bold text-stone-900 dark:text-stone-100">Pinyin Tone Trainer</div>
                <div class="text-[11px] text-stone-400">Initial, final & tone soundboard</div>
              </div>
            </router-link>

            <button 
              @click="openToneGuide(); closeMenus()" 
              class="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-stone-700 dark:text-stone-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-400 text-left transition-colors"
            >
              <div class="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                <Sparkles class="w-4 h-4" />
              </div>
              <div>
                <div class="font-bold text-stone-900 dark:text-stone-100">Pinyin &amp; 5 Tones Guide</div>
                <div class="text-[11px] text-stone-400">Interactive soundboard &amp; tone sandhi</div>
              </div>
            </button>
          </div>
        </div>

        <!-- Mock Tests -->
        <router-link 
          to="/mock-tests" 
          class="px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-purple-700 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          active-class="text-purple-700 dark:text-purple-400 bg-purple-50/80 dark:bg-purple-950/60 font-bold"
        >
          <Award class="w-3.5 h-3.5 text-purple-600 shrink-0" />
          <span class="whitespace-nowrap">Mock Tests</span>
        </router-link>

        <!-- Lessons -->
        <router-link 
          to="/lessons" 
          class="px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          active-class="text-emerald-700 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/60 font-bold"
        >
          <BookOpen class="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span class="whitespace-nowrap">Lessons</span>
        </router-link>

        <!-- Guides -->
        <router-link 
          to="/guides" 
          class="px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors whitespace-nowrap shrink-0"
          active-class="text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/60 font-bold"
        >
          <span class="whitespace-nowrap">Guides</span>
        </router-link>

        <!-- Beginner Tones Guide Button -->
        <button 
          @click="openToneGuide"
          class="hidden xl:inline-flex px-2 xl:px-2.5 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-lg items-center gap-1.5 transition-colors shadow-xs whitespace-nowrap shrink-0"
          title="Learn how Chinese Pinyin and the 4 Tones work"
        >
          <span>🌱 Tones Guide</span>
        </button>
      </nav>

      <!-- Right Side: Learning Progress Bar + Theme Toggle + User Account -->
      <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
        
        <!-- Learning Progress Bar Component -->
        <div class="shrink-0">
          <LearningProgressBar />
        </div>

        <!-- Theme Switcher Button -->
        <div class="relative shrink-0">
          <button 
            @click="toggleTheme"
            class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors shadow-xs shrink-0 flex items-center justify-center"
            :title="`Theme: ${currentTheme} (Click to switch Light / Dark / Sepia)`"
            aria-label="Toggle Color Theme"
          >
            <Sun v-if="currentTheme === 'light'" class="w-4 h-4 text-amber-500 shrink-0" />
            <Moon v-else-if="currentTheme === 'dark'" class="w-4 h-4 text-sky-400 shrink-0" />
            <Coffee v-else class="w-4 h-4 text-amber-700 shrink-0" />
          </button>
        </div>

        <!-- Browser Storage & Backup Button (Always fits comfortably on md+) -->
        <div class="relative hidden md:block shrink-0">
          <button 
            @click="openBackupModal"
            class="px-2.5 sm:px-3 py-1.5 rounded-xl border border-stone-200/90 dark:border-stone-700 bg-stone-50/80 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs hover:border-emerald-300 dark:hover:border-emerald-600 shrink-0"
            title="Study progress is saved automatically in this browser. Click to backup or export."
          >
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
            <span class="whitespace-nowrap">Browser Saved</span>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 lg:hidden shrink-0 border border-stone-200 dark:border-stone-800 flex items-center justify-center"
          aria-label="Toggle Navigation Menu"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <X v-else class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        </button>

      </div>

    </div>

    <!-- Mobile Slideout Menu (Scrollable on all phones) -->
    <div v-if="isMobileMenuOpen" class="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 pt-3 pb-6 space-y-3 shadow-lg text-xs max-h-[calc(100dvh-4rem)] overflow-y-auto">
      
      <!-- Browser Storage Status & Backup Link -->
      <button 
        @click="openBackupModal(); closeMenus()"
        class="w-full flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 transition-colors"
      >
        <div class="flex items-center gap-2.5">
          <HardDrive class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <div class="text-left">
            <div class="font-bold text-xs">Browser Progress & Backup</div>
            <div class="text-[11px] text-stone-500 dark:text-stone-400">Auto-saved in browser · Export JSON</div>
          </div>
        </div>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100">
          Auto-Saved
        </span>
      </button>

      <!-- Level Shortcuts -->
      <div class="grid grid-cols-3 gap-2">
        <router-link 
          to="/hsk-1" 
          @click="closeMenus" 
          class="text-center py-2.5 font-bold rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0"
        >
          <span class="whitespace-nowrap">HSK&nbsp;1</span>
        </router-link>
        <router-link 
          to="/hsk-2" 
          @click="closeMenus" 
          class="text-center py-2.5 font-bold rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800 whitespace-nowrap shrink-0"
        >
          <span class="whitespace-nowrap">HSK&nbsp;2</span>
        </router-link>
        <router-link 
          to="/hsk-3" 
          @click="closeMenus" 
          class="text-center py-2.5 font-bold rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 whitespace-nowrap shrink-0"
        >
          <span class="whitespace-nowrap">HSK&nbsp;3</span>
        </router-link>
      </div>

      <!-- Main Navigation Links -->
      <div class="space-y-1 pt-1">
        <router-link 
          to="/mock-tests" 
          @click="closeMenus" 
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 font-semibold"
        >
          <Award class="w-4 h-4 text-purple-600" />
          <span>30 Examination Mock Gates</span>
        </router-link>

        <router-link 
          to="/words" 
          @click="closeMenus" 
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 font-semibold"
        >
          <BookOpen class="w-4 h-4 text-emerald-600" />
          <span>603 Words Dictionary</span>
        </router-link>

        <router-link 
          to="/lessons" 
          @click="closeMenus" 
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 font-semibold"
        >
          <BookOpen class="w-4 h-4 text-emerald-600" />
          <span>30 Interactive Lessons</span>
        </router-link>

        <router-link 
          to="/stroke-order" 
          @click="closeMenus" 
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 font-semibold"
        >
          <PenTool class="w-4 h-4 text-rose-600" />
          <span>Stroke Order Animator</span>
        </router-link>

        <router-link 
          to="/calculator" 
          @click="closeMenus" 
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 font-semibold"
        >
          <Calculator class="w-4 h-4 text-amber-600" />
          <span>Score Calculator</span>
        </router-link>

        <router-link 
          to="/pinyin-trainer" 
          @click="closeMenus" 
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 font-semibold"
        >
          <Volume2 class="w-4 h-4 text-blue-600" />
          <span>Pronunciation Trainer</span>
        </router-link>

        <router-link 
          to="/guides" 
          @click="closeMenus" 
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 font-semibold"
        >
          <span>18 Academic Guides & Masterclasses</span>
        </router-link>

        <router-link 
          to="/compare" 
          @click="closeMenus" 
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-amber-800 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-950/30 hover:bg-amber-50 dark:hover:bg-amber-950/60 font-semibold"
        >
          <GitCompare class="w-4 h-4 text-amber-600" />
          <span>Confusing Words &amp; Comparisons</span>
        </router-link>

        <button 
          @click="openToneGuide(); closeMenus()" 
          class="w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800 transition-colors"
        >
          <span>🌱 Beginner Tones &amp; Pinyin Guide</span>
        </button>
      </div>

      <!-- Browser Storage & Backup (Mobile Menu) -->
      <div class="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2.5">
        <div class="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 tracking-wider flex items-center justify-between">
          <span>Browser Study Data</span>
          <span class="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span>Auto-Saved</span>
          </span>
        </div>

        <div class="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-2.5">
          <div class="flex items-center justify-between">
            <div class="text-xs font-bold text-stone-900 dark:text-stone-100">
              {{ totalLearnedWordsCount }} of 603 Words Learned
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Saved in Browser
            </span>
          </div>
          <p class="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
            Zero logins or passwords required. Your progress stays 100% private in this device's local database.
          </p>
          <button 
            @click="openBackupModal(); closeMenus()"
            class="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <HardDrive class="w-3.5 h-3.5" />
            <span>Manage Backup &amp; JSON Export</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
