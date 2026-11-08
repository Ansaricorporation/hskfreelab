<script setup lang="ts">
import { Sparkles, ShieldCheck, Heart } from 'lucide-vue-next';
</script>

<template>
  <footer class="bg-stone-900 text-stone-300 mt-20 border-t border-stone-800 w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        <!-- Brand & Mission -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 text-white flex items-center justify-center font-serif text-lg font-black shadow-md">
              汉
            </div>
            <span class="font-bold text-xl text-white tracking-tight">HSK Free Lab</span>
          </div>
          <p class="text-sm text-stone-400 leading-relaxed max-w-sm">
            The most complete, genuinely 100% free HSK 1–3 preparation platform. No subscriptions, no paywalls, and zero login required. Designed for serious self-learners worldwide.
          </p>
          <div class="flex flex-wrap gap-2 pt-2">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-stone-800 text-emerald-400 font-medium border border-stone-700">
              <Sparkles class="w-3.5 h-3.5" /> 100% Free Forever
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-stone-800 text-sky-400 font-medium border border-stone-700">
              <ShieldCheck class="w-3.5 h-3.5" /> No Registration Required
            </span>
          </div>
        </div>

        <!-- Levels -->
        <div>
          <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">HSK Levels</h4>
          <ul class="space-y-2.5 text-sm">
            <li><router-link to="/words" class="hover:text-white transition-colors">603 Words Dictionary</router-link></li>
            <li><router-link to="/hsk-1" class="hover:text-white transition-colors">HSK 1 (A1 · 150 Vocab)</router-link></li>
            <li><router-link to="/hsk-2" class="hover:text-white transition-colors">HSK 2 (A2 · 300 Vocab)</router-link></li>
            <li><router-link to="/hsk-3" class="hover:text-white transition-colors">HSK 3 (B1 · 600 Vocab)</router-link></li>
            <li><router-link to="/lessons" class="hover:text-white transition-colors">Interactive Lessons</router-link></li>
            <li><router-link to="/grammar" class="hover:text-white transition-colors">Grammar Compendium</router-link></li>
          </ul>
        </div>

        <!-- Tools -->
        <div>
          <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Interactive Tools</h4>
          <ul class="space-y-2.5 text-sm">
            <li><router-link to="/pinyin-trainer#tone-guide" class="hover:text-white transition-colors">Pinyin &amp; 5 Tones Guide</router-link></li>
            <li><router-link to="/stroke-order" class="hover:text-white transition-colors">Stroke Animator &amp; Quiz</router-link></li>
            <li><router-link to="/calculator" class="hover:text-white transition-colors">HSK Score Calculator</router-link></li>
            <li><router-link to="/pinyin-trainer" class="hover:text-white transition-colors">Pinyin Tone Trainer</router-link></li>
            <li><router-link to="/mock-tests" class="hover:text-white transition-colors">Timed Mock Exams</router-link></li>
            <li><router-link to="/guides/hsk-1-study-plan" class="hover:text-white transition-colors">30-Day Study Plan</router-link></li>
          </ul>
        </div>

        <!-- Trust & Information -->
        <div>
          <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Trust & Legal</h4>
          <ul class="space-y-2.5 text-sm">
            <li><router-link to="/about" class="hover:text-white transition-colors">About Us</router-link></li>
            <li><router-link to="/contact" class="hover:text-white transition-colors">Contact Us</router-link></li>
            <li><router-link to="/hsk-history" class="hover:text-white transition-colors">HSK History & 3.0</router-link></li>
            <li><router-link to="/data-sources" class="hover:text-white transition-colors">Data Sources & Licenses</router-link></li>
            <li><router-link to="/privacy-policy" class="hover:text-white transition-colors">Privacy Policy</router-link></li>
            <li><router-link to="/terms" class="hover:text-white transition-colors">Terms of Service</router-link></li>
            <li><router-link to="/disclaimer" class="hover:text-white transition-colors">Disclaimer</router-link></li>
            <li><router-link to="/sitemap" class="hover:text-white transition-colors text-rose-400 font-semibold">HTML Sitemap (67 Pages)</router-link></li>
          </ul>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <div>
          © 2026 HSK Free Lab. Factual examination data based on official CLEC syllabus. Powered by Hanzi Writer (MIT) & pinyin-pro (MIT).
        </div>
        <div class="flex items-center gap-1 text-stone-400">
          <span>Crafted with</span>
          <Heart class="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>for Chinese language learners everywhere.</span>
        </div>
      </div>
    </div>
  </footer>
</template>
