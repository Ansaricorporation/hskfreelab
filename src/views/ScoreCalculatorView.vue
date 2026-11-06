<script setup lang="ts">
import ScoreCalculator from '../components/tools/ScoreCalculator.vue';
import { Calculator, Award, HelpCircle, ShieldCheck } from 'lucide-vue-next';
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-12 pb-16">
    <!-- Header (Boxed Card) -->
    <div class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold">
        <Calculator class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
        <span>Official Examination Grading System</span>
      </div>
      <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
        HSK Score Calculator & CEFR Converter
      </h1>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
        Verify your passing score for HSK 1, 2, and 3. Get instant section breakdown, CEFR level mapping, and targeted review recommendations.
      </p>
    </div>

    <!-- Calculator Component -->
    <ScoreCalculator />

    <!-- Official Structure Reference Table -->
    <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6 transition-all">
      <h3 class="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
        <Award class="w-5 h-5 text-amber-600 dark:text-amber-400" />
        <span>Official HSK Score Formulas & Cutoffs</span>
      </h3>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr class="bg-stone-50 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-700 font-bold text-stone-600 dark:text-stone-300">
              <th class="py-3 px-4">HSK Level</th>
              <th class="py-3 px-4">Sections</th>
              <th class="py-3 px-4">Max Score</th>
              <th class="py-3 px-4">Passing Score</th>
              <th class="py-3 px-4">CEFR Benchmark</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 dark:divide-stone-800">
            <tr>
              <td class="py-3 px-4 font-bold text-emerald-800 dark:text-emerald-400">HSK 1</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">Listening (100) + Reading (100)</td>
              <td class="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100">200</td>
              <td class="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">120 (60%)</td>
              <td class="py-3 px-4 text-stone-600 dark:text-stone-400">A1 (Breakthrough)</td>
            </tr>
            <tr>
              <td class="py-3 px-4 font-bold text-sky-800 dark:text-sky-400">HSK 2</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">Listening (100) + Reading (100)</td>
              <td class="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100">200</td>
              <td class="py-3 px-4 font-bold text-sky-700 dark:text-sky-400">120 (60%)</td>
              <td class="py-3 px-4 text-stone-600 dark:text-stone-400">A2 (Waystage)</td>
            </tr>
            <tr>
              <td class="py-3 px-4 font-bold text-rose-800 dark:text-rose-400">HSK 3</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">Listening (100) + Reading (100) + Writing (100)</td>
              <td class="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100">300</td>
              <td class="py-3 px-4 font-bold text-rose-700 dark:text-rose-400">180 (60%)</td>
              <td class="py-3 px-4 text-stone-600 dark:text-stone-400">B1 (Threshold)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- FAQ Accordion / Notes -->
      <div class="pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-3">
        <div class="font-bold text-stone-900 dark:text-stone-100 text-sm">Frequently Asked Questions:</div>
        <div class="space-y-1">
          <div class="font-semibold text-stone-800 dark:text-stone-200">Q: Is there an individual minimum score required for each section?</div>
          <p class="text-stone-500 dark:text-stone-400">
            No. The official HSK certificate evaluates the **cumulative composite score**. Even if your listening is 50, if your reading is 75, your total is 125/200, which qualifies as an official pass.
          </p>
        </div>
        <div class="space-y-1">
          <div class="font-semibold text-stone-800 dark:text-stone-200">Q: How long is an HSK score report valid?</div>
          <p class="text-stone-500 dark:text-stone-400">
            For academic admissions to Chinese colleges and universities, HSK results are generally valid for two years from the test date.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
