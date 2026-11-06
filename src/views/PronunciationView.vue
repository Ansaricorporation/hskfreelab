<script setup lang="ts">
import PronunciationPlayer from '../components/tools/PronunciationPlayer.vue';
import { Volume2, Sparkles, BookOpen } from 'lucide-vue-next';
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-12 pb-16">
    <!-- Header (Boxed Card) -->
    <div class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-semibold">
        <Volume2 class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span>Mandarin Pinyin Masterclass</span>
      </div>
      <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
        Chinese Pronunciation & Tone Trainer
      </h1>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
        Listen to all 23 initials and 24 finals with high clarity audio. Train your musical pitch recognition with our interactive tone game.
      </p>
    </div>

    <!-- Pronunciation Player Component -->
    <PronunciationPlayer />
  </div>
</template>
