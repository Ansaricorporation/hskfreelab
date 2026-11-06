<script setup lang="ts">
import { activeToast } from '../../stores/auth';
import { Sparkles, CheckCircle2 } from 'lucide-vue-next';
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-y-4 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-4 opacity-0"
  >
    <div 
      v-if="activeToast" 
      class="fixed bottom-6 right-6 z-50 max-w-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-stone-800 dark:border-stone-200 text-xs font-semibold pointer-events-none"
    >
      <CheckCircle2 class="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
      <span>{{ activeToast }}</span>
    </div>
  </transition>
</template>
