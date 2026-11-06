<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ShieldCheck, FileText, AlertCircle, Database } from 'lucide-vue-next';

const route = useRoute();

const docType = computed(() => {
  const p = route.path;
  if (p.includes('privacy-policy')) return 'privacy';
  if (p.includes('terms')) return 'terms';
  if (p.includes('disclaimer')) return 'disclaimer';
  return 'sources';
});
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-8 pb-16">
    
    <!-- Privacy Policy -->
    <div v-if="docType === 'privacy'" class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-10 space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
      <div class="flex items-center gap-2">
        <ShieldCheck class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        <h1 class="text-3xl font-black text-stone-900 dark:text-stone-100">Privacy Policy</h1>
      </div>
      <p class="text-xs text-stone-400 dark:text-stone-500">Last updated: October 2026</p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">1. Zero Registration & Data Minimization</h2>
      <p>
        HSK Free Lab is designed from the ground up to respect user privacy. We do not require users to create an account, log in, or provide personal identifiable information (PII) such as your real name, email address, or phone number to access our educational materials.
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">2. Local Storage and Client-Side Processing</h2>
      <p>
        All interactive quiz scores, character drawings, and audio playback settings are processed strictly in your local browser runtime. We do not record or sell your individual test answers.
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">3. Cookies & Web Analytics</h2>
      <p>
        We may use standard, privacy-preserving client cookies or analytics to measure aggregate page visits, browser performance, and referral sources to optimize site speed and content relevance.
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">4. Third-Party Web Speech & Content Delivery</h2>
      <p>
        Speech synthesis uses the browser's built-in Web Speech API (`SpeechSynthesis`). Font files and Hanzi stroke vectors are loaded through secure public CDNs (jsDelivr / Google Fonts) under permissive open licenses.
      </p>
    </div>

    <!-- Terms of Service -->
    <div v-else-if="docType === 'terms'" class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-10 space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
      <div class="flex items-center gap-2">
        <FileText class="w-6 h-6 text-sky-600 dark:text-sky-400" />
        <h1 class="text-3xl font-black text-stone-900 dark:text-stone-100">Terms of Service</h1>
      </div>
      <p class="text-xs text-stone-400 dark:text-stone-500">Last updated: October 2026</p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">1. Free Educational License</h2>
      <p>
        HSK Free Lab grants you a personal, worldwide, non-exclusive, royalty-free license to use our platform for self-study, classroom instruction, and educational review without payment.
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">2. Prohibited Uses</h2>
      <p>
        You may not scrape our services in ways that impair system availability, attempt to bypass access boundaries, or redistribute our proprietary interactive application code for commercial resale.
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">3. Intellectual Property</h2>
      <p>
        The official HSK exam trademarks and syllabus standards belong to their respective regulatory bodies (Ministry of Education, CLEC, and CTI). HSK Free Lab is an independent educational study companion.
      </p>
    </div>

    <!-- Disclaimer -->
    <div v-else-if="docType === 'disclaimer'" class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-10 space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
      <div class="flex items-center gap-2">
        <AlertCircle class="w-6 h-6 text-amber-600 dark:text-amber-400" />
        <h1 class="text-3xl font-black text-stone-900 dark:text-stone-100">Legal Disclaimer</h1>
      </div>
      <p class="text-xs text-stone-400 dark:text-stone-500">Last updated: October 2026</p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">1. Educational Study Aid Only</h2>
      <p>
        HSK Free Lab is an independent educational tool designed to assist learners preparing for Chinese language proficiency assessments. We are not officially affiliated with, endorsed by, or sponsored by Hanban, the Center for Language Education and Cooperation (CLEC), or Chinese Testing International (CTI).
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">2. Score Prediction Non-Guarantee</h2>
      <p>
        Scores generated through our Score Calculator and Mock Test engines reflect your performance on our sample practice items. They serve as diagnostic aids and do not constitute a guarantee of actual results on official examination administrations.
      </p>
    </div>

    <!-- Data Sources & Licenses -->
    <div v-else class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-10 space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
      <div class="flex items-center gap-2">
        <Database class="w-6 h-6 text-rose-600 dark:text-rose-400" />
        <h1 class="text-3xl font-black text-stone-900 dark:text-stone-100">Data Sources & Open Licenses</h1>
      </div>
      <p class="text-xs text-stone-400 dark:text-stone-500">Open source transparency and attribution</p>

      <div class="overflow-x-auto pt-2">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="bg-stone-50 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 font-bold text-stone-700 dark:text-stone-200">
              <th class="py-3 px-4">Resource</th>
              <th class="py-3 px-4">License</th>
              <th class="py-3 px-4">Usage on HSK Free Lab</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 dark:divide-stone-800">
            <tr>
              <td class="py-3 px-4 font-bold text-stone-900 dark:text-stone-100">Hanzi Writer</td>
              <td class="py-3 px-4 font-mono text-emerald-700 dark:text-emerald-400 font-semibold">MIT License</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">Stroke animation engine & interactive drawing quiz</td>
            </tr>
            <tr>
              <td class="py-3 px-4 font-bold text-stone-900 dark:text-stone-100">pinyin-pro</td>
              <td class="py-3 px-4 font-mono text-emerald-700 dark:text-emerald-400 font-semibold">MIT License</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">Pinyin generation, tone mark placement, and romanization</td>
            </tr>
            <tr>
              <td class="py-3 px-4 font-bold text-stone-900 dark:text-stone-100">Make Me a Hanzi</td>
              <td class="py-3 px-4 font-mono text-sky-700 dark:text-sky-400 font-semibold">ARPHIC License</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">Open character stroke coordinates and decomposition vectors</td>
            </tr>
            <tr>
              <td class="py-3 px-4 font-bold text-stone-900 dark:text-stone-100">CLEC HSK Syllabus</td>
              <td class="py-3 px-4 font-mono text-stone-600 dark:text-stone-400">Public Factual Data</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">Examination structure facts, score cutoffs, and time limits</td>
            </tr>
            <tr>
              <td class="py-3 px-4 font-bold text-stone-900 dark:text-stone-100">Web Speech API</td>
              <td class="py-3 px-4 font-mono text-stone-600 dark:text-stone-400">W3C Standard</td>
              <td class="py-3 px-4 text-stone-700 dark:text-stone-300">Native browser text-to-speech audio pronunciation</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>
