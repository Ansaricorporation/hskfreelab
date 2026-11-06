<script setup lang="ts">
import { Clock, BookOpen, CheckCircle2, ChevronRight } from 'lucide-vue-next';
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-12 pb-16">
    <!-- Header -->
    <!-- Header (Boxed Card) -->
    <div class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-300 text-xs font-semibold">
        <Clock class="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
        <span>Chronological Evolution</span>
      </div>
      <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
        The History of the HSK Exam: 1984 to 3.0
      </h1>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
        From its origins at Beijing Language and Culture University to the modern 9-level HSK 3.0 standard.
      </p>
    </div>

    <!-- Timeline Cards -->
    <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-10 space-y-8 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
      
      <!-- Era 1 -->
      <div class="border-l-2 border-stone-200 dark:border-stone-700 pl-6 space-y-2 relative">
        <div class="w-3.5 h-3.5 rounded-full bg-stone-900 dark:bg-stone-100 absolute -left-[8px] top-1"></div>
        <div class="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">1984 – 2009</div>
        <h3 class="text-xl font-bold text-stone-900 dark:text-stone-100">HSK 1.0: Academic Origins</h3>
        <p>
          Initiated in 1984 by Beijing Language and Culture University (BLCU) and officially designated as China's national standardized foreign Chinese test in 1992. HSK 1.0 consisted of 11 levels categorized into Basic, Elementary-Intermediate, and Advanced. However, it was widely criticized for testing obscure classical vocabulary that gave everyday communicative learners steep difficulty.
        </p>
      </div>

      <!-- Era 2 -->
      <div class="border-l-2 border-rose-400 dark:border-rose-600 pl-6 space-y-2 relative">
        <div class="w-3.5 h-3.5 rounded-full bg-rose-600 absolute -left-[8px] top-1"></div>
        <div class="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">2010 – 2021</div>
        <h3 class="text-xl font-bold text-stone-900 dark:text-stone-100">HSK 2.0: The 6-Level Global Standard</h3>
        <p>
          Hanban overhauled the exam into the widely recognized 6-level format (HSK 1 to HSK 6). This version lowered the barrier of entry for beginners: HSK 1 required only 150 words, HSK 2 required 300, and HSK 3 required 600 words. Pinyin was supplied on the lower tests, making Chinese accessible to millions worldwide.
        </p>
      </div>

      <!-- Era 3 -->
      <div class="border-l-2 border-emerald-400 dark:border-emerald-600 pl-6 space-y-2 relative">
        <div class="w-3.5 h-3.5 rounded-full bg-emerald-600 absolute -left-[8px] top-1"></div>
        <div class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">2021 – Present</div>
        <h3 class="text-xl font-bold text-stone-900 dark:text-stone-100">HSK 3.0: "Three Stages, Nine Levels"</h3>
        <p>
          Published by the Ministry of Education and the Center for Language Education and Cooperation (CLEC), the "Chinese Proficiency Grading Standards for International Chinese Language Education" introduced a 3-stage, 9-level framework. Levels 1–3 represent the Elementary Stage, focusing on foundational Hanzi literacy, communicative grammar, and practical dialogues.
        </p>
      </div>

    </div>

    <!-- Comparative Table -->
    <div class="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-4">
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100">HSK 2.0 vs. HSK 3.0 Elementary Stages (1–3)</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr class="bg-stone-50 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 font-bold text-stone-600 dark:text-stone-300">
              <th class="py-3 px-4">Level</th>
              <th class="py-3 px-4">HSK 2.0 Vocab</th>
              <th class="py-3 px-4">HSK 3.0 Cumulative Vocab</th>
              <th class="py-3 px-4">CEFR Goal</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 dark:divide-stone-800">
            <tr>
              <td class="py-3 px-4 font-bold text-emerald-800 dark:text-emerald-400">HSK 1</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">150 words</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">500 words</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">A1</td>
            </tr>
            <tr>
              <td class="py-3 px-4 font-bold text-sky-800 dark:text-sky-400">HSK 2</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">300 words</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">1,272 words</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">A2</td>
            </tr>
            <tr>
              <td class="py-3 px-4 font-bold text-rose-800 dark:text-rose-400">HSK 3</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">600 words</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">2,245 words</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">B1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-stone-500 dark:text-stone-400 italic">
        Note: Current testing centers worldwide continue to administer HSK Levels 1–6 under the official 2.0/transition standards. HSK Free Lab prepares you thoroughly across both syllabi.
      </p>
    </div>
  </div>
</template>
