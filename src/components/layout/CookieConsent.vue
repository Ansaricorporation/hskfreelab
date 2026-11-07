<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ShieldCheck, Cookie, Check, X } from 'lucide-vue-next';

const isVisible = ref(false);

onMounted(() => {
  // Check if consent has already been given
  try {
    const consent = localStorage.getItem('hsk_cookie_consent');
    if (!consent) {
      // Delay slightly to ensure smooth entry without layout shift
      setTimeout(() => {
        isVisible.value = true;
      }, 600);
    }
  } catch (e) {
    // Graceful fallback if localStorage is disabled in restricted mode
  }
});

function acceptAll() {
  try {
    localStorage.setItem('hsk_cookie_consent', 'all');
  } catch (e) {}
  isVisible.value = false;
}

function acceptEssential() {
  try {
    localStorage.setItem('hsk_cookie_consent', 'essential');
  } catch (e) {}
  isVisible.value = false;
}
</script>

<template>
  <Transition
    enter-active-class="transform transition ease-out duration-300"
    enter-from-class="translate-y-8 opacity-0 scale-95"
    enter-to-class="translate-y-0 opacity-100 scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <aside 
      v-if="isVisible" 
      aria-label="Cookie and Privacy Consent Banner"
      class="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 p-5 rounded-3xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200/90 dark:border-stone-800 shadow-2xl space-y-3 text-stone-800 dark:text-stone-200"
    >
      <div class="flex items-start gap-3">
        <div class="w-9 h-9 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 flex items-center justify-center shrink-0">
          <Cookie class="w-4 h-4" />
        </div>
        <div class="space-y-1">
          <h3 class="text-xs font-black tracking-tight text-stone-900 dark:text-stone-100">
            Privacy &amp; Local Progress Storage
          </h3>
          <p class="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
            HSK Free Lab uses local browser storage (<code class="text-[10px] bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">localStorage</code>) to save your vocabulary progress and test scores privately on your device. We and third-party partners (such as Google AdSense) also use standard cookies to support free hosting in accordance with our 
            <router-link to="/privacy-policy" class="text-rose-600 dark:text-rose-400 font-semibold underline">Privacy Policy</router-link>.
          </p>
        </div>
      </div>

      <div class="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          @click="acceptEssential"
          class="px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-[11px] font-semibold transition-colors"
        >
          Essential Only
        </button>
        <button
          type="button"
          @click="acceptAll"
          class="px-3.5 py-1.5 rounded-xl bg-stone-900 dark:bg-rose-600 text-white text-[11px] font-bold hover:bg-stone-800 dark:hover:bg-rose-700 transition-colors shadow-sm"
        >
          Accept All
        </button>
      </div>
    </aside>
  </Transition>
</template>
