<script setup lang="ts">
import { Sparkles, Mail, Heart, Globe, BookOpen, ShieldCheck } from 'lucide-vue-next';
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-12 pb-16">
    <!-- Header (Boxed Card) -->
    <div class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
        <Sparkles class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>Our Mission</span>
      </div>
      <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
        About HSK Free Lab
      </h1>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
        Democratizing Chinese language learning worldwide with zero paywalls, zero required logins, and completely accessible study tools for independent self-learners and educators.
      </p>
    </div>

    <!-- Core Ethos Card -->
    <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-10 space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
      <h2 class="text-2xl font-black text-stone-900 dark:text-stone-100">Why We Built HSK Free Lab</h2>
      <p>
        Too many language learning websites lock basic vocabulary lists, stroke orders, and mock exams behind aggressive monthly subscriptions, mandatory signups, or paywalls. We believe that access to foundational language tools—especially for international students, immigrants, and independent self-learners—should be genuinely open and freely accessible.
      </p>

      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">Our Three Core Principles</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
        <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 space-y-2">
          <div class="font-bold text-rose-700 dark:text-rose-400 text-sm">1. Zero Paywalls</div>
          <p class="text-stone-600 dark:text-stone-400">Every single character, mock question, lesson, and audio clip is 100% unlocked for everyone with no subscription.</p>
        </div>
        <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 space-y-2">
          <div class="font-bold text-emerald-700 dark:text-emerald-400 text-sm">2. Local Privacy</div>
          <p class="text-stone-600 dark:text-stone-400">No account required. Your study progress and test records are saved in your browser's local storage.</p>
        </div>
        <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 space-y-2">
          <div class="font-bold text-sky-700 dark:text-sky-400 text-sm">3. Verified Syllabus Data</div>
          <p class="text-stone-600 dark:text-stone-400">Strictly aligned with official CLEC HSK 1, 2, and 3 vocabulary guidelines and standard stroke data.</p>
        </div>
      </div>

      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-4">Editorial Integrity & Authorship</h3>
      <p>
        All educational articles, vocabulary guides, grammar explanations, and study routines published on HSK Free Lab are researched, created, and maintained by the <strong>HSK Free Lab Editorial Team</strong>. We do not attribute our articles to fictional or unverifiable personas; our content reflects collective linguistic curation and rigorous cross-referencing against official testing materials.
      </p>

      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-4">Attribution & Open Source Roots</h3>
      <p>
        HSK Free Lab is made possible thanks to exceptional open-source contributions including <strong>Hanzi Writer</strong> (MIT License by Chanind), <strong>pinyin-pro</strong> (MIT License by bialov), and the <strong>Make Me a Hanzi</strong> stroke data repository.
      </p>

      <div class="pt-6 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
        <div>HSK Free Lab Project &bull; Independent Educational Resource</div>
        <div class="flex items-center gap-3">
          <router-link to="/contact" class="font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1">
            <Mail class="w-3.5 h-3.5" /> Contact Support
          </router-link>
          <span>&bull;</span>
          <a href="mailto:contact@mybwn.com" class="hover:underline">contact@mybwn.com</a>
        </div>
      </div>
    </div>
  </div>
</template>
