<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ShieldCheck, FileText, AlertCircle, Database, Mail } from 'lucide-vue-next';

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
      <p class="text-xs text-stone-400 dark:text-stone-500">Last updated: November 2026</p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">1. Zero Registration & Data Minimization</h2>
      <p>
        HSK Free Lab (<a href="https://mybwn.com" class="text-rose-600 dark:text-rose-400 hover:underline">https://mybwn.com</a>) is designed from the ground up to respect user privacy. We do not require users to register an account, log in, or submit personal identifiable information (PII) such as your legal name, physical address, or phone number to access our educational study tools, vocabulary lists, and practice tests.
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">2. Local Browser Storage (localStorage)</h2>
      <p>
        To preserve your learning progress across sessions—such as vocabulary words marked as learned, quiz scores, custom tone preference, and dark mode toggles—HSK Free Lab utilizes your browser's client-side <code>localStorage</code>. This data resides solely on your personal device and is never transmitted to or stored on external database servers.
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">3. Cookies & Advertising Disclosures (Google AdSense & Third Parties)</h2>
      <p>
        We may partner with third-party advertising networks, including Google AdSense, to support the ongoing free availability and hosting of our educational materials:
      </p>
      <ul class="list-disc pl-5 space-y-2 text-stone-600 dark:text-stone-300">
        <li>
          <strong>DoubleClick DART Cookie:</strong> Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
        </li>
        <li>
          <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" class="text-rose-600 dark:text-rose-400 underline font-medium">Google Ad Settings</a>. Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting the <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" class="text-rose-600 dark:text-rose-400 underline font-medium">Network Advertising Initiative Consumer Opt-Out page</a> or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" class="text-rose-600 dark:text-rose-400 underline font-medium">AboutAds.info</a>.
        </li>
        <li>
          <strong>Browser Cookie Controls:</strong> You can choose to disable or selectively turn off our cookies or third-party cookies in your browser settings. However, this may affect how you are able to interact with our site or other websites.
        </li>
      </ul>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">4. Third-Party CDNs & Web APIs</h2>
      <p>
        Speech synthesis utilizes your browser's built-in Web Speech API (<code>SpeechSynthesis</code>). Font files and character vector coordinates are retrieved via secure public CDNs (such as Google Fonts and jsDelivr) subject to standard open-source licenses and privacy practices.
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">5. Contact Information & Data Inquiries</h2>
      <p>
        If you have any questions or feedback regarding our privacy practices, you can contact our privacy officer directly via our <router-link to="/contact" class="text-rose-600 dark:text-rose-400 underline font-medium">Contact Page</router-link> or by emailing <a href="mailto:contact@mybwn.com" class="text-rose-600 dark:text-rose-400 underline font-medium">contact@mybwn.com</a>.
      </p>
    </div>

    <!-- Terms of Service -->
    <div v-else-if="docType === 'terms'" class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-10 space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
      <div class="flex items-center gap-2">
        <FileText class="w-6 h-6 text-sky-600 dark:text-sky-400" />
        <h1 class="text-3xl font-black text-stone-900 dark:text-stone-100">Terms of Service</h1>
      </div>
      <p class="text-xs text-stone-400 dark:text-stone-500">Last updated: November 2026</p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">1. Free Educational License</h2>
      <p>
        HSK Free Lab grants all users a personal, non-exclusive, non-transferable, revocable license to access and use our study materials, pinyin trainer, stroke animations, and practice exams for personal self-study and classroom educational purposes free of charge.
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">2. Prohibited Uses</h2>
      <p>
        You agree not to scrape, index via automated means that impose unreasonable load on our infrastructure, reverse-engineer, or commercially resell our proprietary interactive learning applications without express written permission.
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">3. Intellectual Property Rights</h2>
      <p>
        The official HSK (Hanyu Shuiping Kaoshi) test trademarks, official vocabulary standards, and exam formats belong to their respective regulatory authorities (including the Ministry of Education of the PRC, CLEC, and Chinese Testing International). HSK Free Lab is an independent educational initiative and does not claim ownership over official standardized test syllabi.
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">4. Support & Contact</h2>
      <p>
        For inquiries regarding these Terms, please reach out through our <router-link to="/contact" class="text-rose-600 dark:text-rose-400 underline font-medium">Contact Page</router-link> or email <a href="mailto:contact@mybwn.com" class="text-rose-600 dark:text-rose-400 underline font-medium">contact@mybwn.com</a>.
      </p>
    </div>

    <!-- Disclaimer -->
    <div v-else-if="docType === 'disclaimer'" class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-10 space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
      <div class="flex items-center gap-2">
        <AlertCircle class="w-6 h-6 text-amber-600 dark:text-amber-400" />
        <h1 class="text-3xl font-black text-stone-900 dark:text-stone-100">Legal Disclaimer</h1>
      </div>
      <p class="text-xs text-stone-400 dark:text-stone-500">Last updated: November 2026</p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">1. Educational Study Aid Only</h2>
      <p>
        HSK Free Lab is an independent educational tool designed to assist learners preparing for Chinese language proficiency assessments. We are not officially affiliated with, endorsed by, or sponsored by Hanban, the Center for Language Education and Cooperation (CLEC), or Chinese Testing International (CTI).
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">2. Score Prediction Non-Guarantee</h2>
      <p>
        Scores calculated through our Score Calculator and Mock Test engines reflect diagnostic practice performance. They serve as self-assessment aids and do not constitute a guarantee of actual examination scores on official testing dates.
      </p>

      <h2 class="text-lg font-bold text-stone-900 dark:text-stone-100 pt-2">3. Accuracy of Syllabus Information</h2>
      <p>
        While our editorial team endeavors to ensure all character strokes, pinyin pronunciations, and vocabulary translations match official testing benchmarks, language standards evolve. If you discover an error, please notify us via our <router-link to="/contact" class="text-rose-600 dark:text-rose-400 underline font-medium">Contact Page</router-link>.
      </p>
    </div>

    <!-- Data Sources & Licenses -->
    <div v-else class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-10 space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
      <div class="flex items-center gap-2">
        <Database class="w-6 h-6 text-rose-600 dark:text-rose-400" />
        <h1 class="text-3xl font-black text-stone-900 dark:text-stone-100">Data Sources & Open Licenses</h1>
      </div>
      <p class="text-xs text-stone-400 dark:text-stone-500">Open source transparency, open data, and proper attribution</p>

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

      <div class="pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <div>For licensing questions or data corrections:</div>
        <router-link to="/contact" class="text-rose-600 dark:text-rose-400 underline font-medium">Contact Editorial Team</router-link>
      </div>
    </div>

  </div>
</template>
