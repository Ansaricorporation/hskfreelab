<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import StrokeAnimator from '../components/tools/StrokeAnimator.vue';
import { PenTool, BookOpen } from 'lucide-vue-next';

const route = useRoute();
const charQuery = ref<string>('爱');

function extractChar(): string {
  const param = route.params.character;
  const query = route.query.char;
  let raw = '';
  if (typeof param === 'string' && param) {
    raw = decodeURIComponent(param);
  } else if (typeof query === 'string' && query) {
    raw = decodeURIComponent(query);
  }
  if (!raw) return '爱';
  const firstHanzi = Array.from(raw).find(c => /\p{Script=Han}/u.test(c));
  return firstHanzi || raw.charAt(0) || '爱';
}

watch(
  () => [route.params.character, route.query.char],
  () => {
    charQuery.value = extractChar();
  },
  { immediate: true }
);
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-10 pb-16">
    <!-- Header (Boxed Card) -->
    <div class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold">
        <PenTool class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
        <span>MIT Licensed Hanzi Writer</span>
      </div>
      <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
        Chinese Character Stroke Animator & Quiz
      </h1>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
        Learn the correct stroke order and stroke count for any Chinese character. Watch animations or test your drawing accuracy with interactive quiz mode.
      </p>
    </div>

    <!-- Animator Widget Component -->
    <StrokeAnimator :initialCharacter="charQuery" :size="280" />

    <!-- Educational Guide on Stroke Rules -->
    <div class="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      <h3 class="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
        <BookOpen class="w-5 h-5 text-rose-600 dark:text-rose-400" />
        <span>The 7 Golden Rules of Chinese Stroke Order</span>
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 dark:text-stone-400">
        <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 space-y-1">
          <div class="font-bold text-stone-900 dark:text-stone-100">1. Top to bottom (从上到下)</div>
          <p>Characters with vertical layers are written starting from the top stroke. Example: 三 (sān), 二 (èr).</p>
        </div>

        <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 space-y-1">
          <div class="font-bold text-stone-900 dark:text-stone-100">2. Left to right (从左到右)</div>
          <p>Multi-component characters usually begin with the left radical before moving right. Example: 你 (nǐ), 好 (hǎo).</p>
        </div>

        <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 space-y-1">
          <div class="font-bold text-stone-900 dark:text-stone-100">3. Horizontal before vertical (先横后竖)</div>
          <p>When strokes intersect, horizontal strokes are generally drawn first. Example: 十 (shí).</p>
        </div>

        <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 space-y-1">
          <div class="font-bold text-stone-900 dark:text-stone-100">4. Right-to-left diagonals before left-to-right (先撇后捺)</div>
          <p>Downward-left strokes (撇 piě) precede downward-right strokes (捺 nà). Example: 八 (bā), 人 (rén).</p>
        </div>

        <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 space-y-1">
          <div class="font-bold text-stone-900 dark:text-stone-100">5. Outside before inside (从外到内)</div>
          <p>Enclosing frames are initiated before filling inside components. Example: 月 (yuè), 同 (tóng).</p>
        </div>

        <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 space-y-1">
          <div class="font-bold text-stone-900 dark:text-stone-100">6. Inside before closing (先进入后关门)</div>
          <p>Full box frames (囗) are completed inside before sealing the bottom line. Example: 四 (sì), 国 (guó).</p>
        </div>

        <div class="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 space-y-1 sm:col-span-2">
          <div class="font-bold text-stone-900 dark:text-stone-100">7. Center vertically before sides (先中间后两边)</div>
          <p>Characters with a dominant central axis flanked symmetrically by wings are written center first. Example: 小 (xiǎo), 水 (shuǐ).</p>
        </div>
      </div>
    </div>
  </div>
</template>
