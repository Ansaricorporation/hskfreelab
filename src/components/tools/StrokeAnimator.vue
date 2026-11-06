<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import HanziWriter from 'hanzi-writer';
import { 
  Play, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  PenTool, 
  HelpCircle,
  Volume2
} from 'lucide-vue-next';
import { toPinyin } from '../../utils/pinyin';
import { playAudio } from '../../utils/speech';

const props = withDefaults(defineProps<{
  initialCharacter?: string;
  size?: number;
}>(), {
  initialCharacter: '爱',
  size: 260
});

const characterInput = ref(props.initialCharacter);
const currentCharacter = ref(props.initialCharacter);
const targetContainer = ref<HTMLDivElement | null>(null);

let writerInstance: any = null;

const isQuizMode = ref(false);
const quizMessage = ref('');
const isOutlineVisible = ref(true);
const animationSpeed = ref(1);

const popularCharacters = [
  '爱', '你', '好', '中', '国', '学', '生', '水', '茶', '家', '大', '小', '多', '少', '天', '月', '年', '书'
];

function setCharacter(char: string) {
  if (!char || char.trim().length === 0) return;
  const firstChar = char.trim().charAt(0);
  characterInput.value = firstChar;
  currentCharacter.value = firstChar;
  initWriter();
}

function handleInputSubmit() {
  if (characterInput.value) {
    setCharacter(characterInput.value);
  }
}

async function initWriter() {
  await nextTick();
  if (!targetContainer.value) return;

  targetContainer.value.innerHTML = '';
  isQuizMode.value = false;
  quizMessage.value = '';

  try {
    writerInstance = HanziWriter.create(targetContainer.value, currentCharacter.value, {
      width: props.size,
      height: props.size,
      padding: 15,
      showOutline: isOutlineVisible.value,
      strokeAnimationSpeed: animationSpeed.value,
      delayBetweenStrokes: 150,
      strokeColor: '#c02c38', // Imperial Chinese red
      outlineColor: '#e5e7eb',
      drawingColor: '#248067', // Jade green for user drawing
      drawingWidth: 16,
      showCharacter: true,
      charDataLoader: function(char: any, onComplete: any, onError: any) {
        fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${char}.json`)
          .then(res => {
            if (!res.ok) throw new Error('Network error');
            return res.json();
          })
          .then(onComplete)
          .catch(onError);
      }
    });
  } catch (err) {
    console.warn('Hanzi Writer initialization failed:', err);
  }
}

function startAnimation() {
  if (!writerInstance) return;
  isQuizMode.value = false;
  quizMessage.value = '';
  writerInstance.showCharacter();
  writerInstance.animateCharacter();
}

function resetCharacter() {
  if (!writerInstance) return;
  isQuizMode.value = false;
  quizMessage.value = '';
  writerInstance.showCharacter();
  writerInstance.hideCharacter();
  writerInstance.showOutline();
}

function toggleOutline() {
  isOutlineVisible.value = !isOutlineVisible.value;
  if (!writerInstance) return;
  if (isOutlineVisible.value) {
    writerInstance.showOutline();
  } else {
    writerInstance.hideOutline();
  }
}

function startQuiz() {
  if (!writerInstance) return;
  isQuizMode.value = true;
  quizMessage.value = 'Draw the first stroke in the box below!';

  writerInstance.quiz({
    onMistake: (strokeData: any) => {
      quizMessage.value = `Keep trying! Stroke ${strokeData.strokeNum + 1} was not quite right.`;
    },
    onCorrectStroke: (strokeData: any) => {
      quizMessage.value = `Excellent! Stroke ${strokeData.strokeNum + 1} completed.`;
    },
    onComplete: (summary: any) => {
      quizMessage.value = `🎉 Fantastic! You completed "${currentCharacter.value}" with ${summary.totalMistakes} mistake(s)!`;
      playAudio(currentCharacter.value);
    }
  });
}

function playCurrentAudio() {
  playAudio(currentCharacter.value);
}

onMounted(() => {
  initWriter();
});

watch(() => props.initialCharacter, (newVal) => {
  if (newVal) {
    setCharacter(newVal);
  }
});
</script>

<template>
  <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-4 sm:p-6 max-w-xl mx-auto transition-all">
    <!-- Header Controls -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
      <div>
        <h3 class="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>Stroke Order Animator</span>
          <span class="text-xs px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-medium">Interactive</span>
        </h3>
        <p class="text-xs text-stone-500 dark:text-stone-400">Practice writing Hanzi with guided stroke direction</p>
      </div>

      <!-- Character Search Input -->
      <form @submit.prevent="handleInputSubmit" class="flex items-center gap-1.5 w-full sm:w-auto">
        <input 
          v-model="characterInput"
          maxlength="1" 
          placeholder="字" 
          class="w-14 text-center px-2 py-1.5 text-lg font-bold border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 outline-none"
        />
        <button 
          type="submit"
          class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-rose-700 dark:hover:bg-rose-600 dark:hover:text-white transition-colors"
        >
          Load
        </button>
      </form>
    </div>

    <!-- Quick select character pills -->
    <div class="py-3">
      <div class="text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1.5">Popular HSK Characters</div>
      <div class="flex flex-wrap gap-1.5">
        <button 
          v-for="char in popularCharacters" 
          :key="char"
          @click="setCharacter(char)"
          :class="[
            'w-8 h-8 rounded-lg font-serif text-base flex items-center justify-center transition-all',
            currentCharacter === char 
              ? 'bg-rose-600 text-white font-bold shadow-xs scale-105' 
              : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200'
          ]"
        >
          {{ char }}
        </button>
      </div>
    </div>

    <!-- Canvas Container (Mizige Grid) -->
    <div class="flex flex-col items-center justify-center py-4">
      <div class="relative p-1 rounded-2xl bg-gradient-to-b from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-700 shadow-inner">
        <div 
          ref="targetContainer" 
          class="mizige rounded-xl overflow-hidden cursor-crosshair shadow-sm bg-white"
          :style="{ width: `${size}px`, height: `${size}px` }"
        ></div>
      </div>

      <!-- Character Information / Pinyin -->
      <div class="mt-4 flex items-center gap-3">
        <div class="text-3xl font-serif font-black text-rose-700 dark:text-rose-400">{{ currentCharacter }}</div>
        <div class="h-6 w-px bg-stone-300 dark:bg-stone-700"></div>
        <div class="text-xl font-bold text-stone-700 dark:text-stone-200">{{ toPinyin(currentCharacter) }}</div>
        <button 
          @click="playCurrentAudio" 
          class="p-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors"
          title="Play pronunciation"
        >
          <Volume2 class="w-4 h-4" />
        </button>
      </div>

      <!-- Quiz status banner -->
      <div v-if="isQuizMode" class="mt-3 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center w-full">
        <div class="text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-1.5">
          <PenTool class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{{ quizMessage }}</span>
        </div>
      </div>
    </div>

    <!-- Action Toolbar -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
      <button 
        @click="startAnimation" 
        class="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-xs"
      >
        <Play class="w-3.5 h-3.5" />
        <span>Animate</span>
      </button>

      <button 
        @click="startQuiz" 
        class="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-xs"
      >
        <PenTool class="w-3.5 h-3.5" />
        <span>Quiz Draw</span>
      </button>

      <button 
        @click="toggleOutline" 
        class="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
      >
        <Eye v-if="!isOutlineVisible" class="w-3.5 h-3.5" />
        <EyeOff v-else class="w-3.5 h-3.5" />
        <span>{{ isOutlineVisible ? 'Hide Guide' : 'Show Guide' }}</span>
      </button>

      <button 
        @click="resetCharacter" 
        class="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
      >
        <RotateCcw class="w-3.5 h-3.5" />
        <span>Reset</span>
      </button>
    </div>

    <!-- Instructional Note -->
    <div class="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 flex items-start gap-1.5">
      <HelpCircle class="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
      <span>
        In Quiz Draw mode, stroke direction and sequence matter. Hanzi Writer enforces authentic standard Chinese stroke order.
      </span>
    </div>
  </div>
</template>
