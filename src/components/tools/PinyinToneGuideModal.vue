<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { 
  X, 
  Volume2, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Smile
} from 'lucide-vue-next';
import { playAudio, playSlowAudio } from '../../utils/speech';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const selectedToneTab = ref<number>(1);

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close');
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown);
});

const tones = [
  {
    num: 1,
    name: '1st Tone: High & Flat',
    mark: 'ˉ (e.g. mā)',
    pitch: '5-5',
    color: 'rose',
    accentColor: 'text-rose-600 bg-rose-50 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    englishHint: 'Singing a steady, high musical note. Keep pitch high and flat.',
    examples: [
      { hanzi: '妈', pinyin: 'mā', en: 'Mom / Mother' },
      { hanzi: '八', pinyin: 'bā', en: 'Eight (8)' },
      { hanzi: '他', pinyin: 'tā', en: 'He / Him' },
      { hanzi: '吃', pinyin: 'chī', en: 'To eat' }
    ]
  },
  {
    num: 2,
    name: '2nd Tone: Rising Pitch',
    mark: 'ˊ (e.g. má)',
    pitch: '3-5',
    color: 'emerald',
    accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    englishHint: 'Just like asking a question in surprise: "Really?! What?!"',
    examples: [
      { hanzi: '麻', pinyin: 'má', en: 'Hemp / Sesame' },
      { hanzi: '十', pinyin: 'shí', en: 'Ten (10)' },
      { hanzi: '来', pinyin: 'lái', en: 'To come' },
      { hanzi: '国', pinyin: 'guó', en: 'Country' }
    ]
  },
  {
    num: 3,
    name: '3rd Tone: Dipping & Rising',
    mark: 'ˇ (e.g. mǎ)',
    pitch: '2-1-4',
    color: 'indigo',
    accentColor: 'text-indigo-700 bg-indigo-50 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    englishHint: 'Pitch starts low, dips down deep, then swoops gently back up.',
    examples: [
      { hanzi: '马', pinyin: 'mǎ', en: 'Horse' },
      { hanzi: '好', pinyin: 'hǎo', en: 'Good / Well' },
      { hanzi: '你', pinyin: 'nǐ', en: 'You' },
      { hanzi: '我', pinyin: 'wǒ', en: 'I / Me' }
    ]
  },
  {
    num: 4,
    name: '4th Tone: Falling & Firm',
    mark: 'ˋ (e.g. mà)',
    pitch: '5-1',
    color: 'amber',
    accentColor: 'text-amber-800 bg-amber-50 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    englishHint: 'A firm, decisive command: like saying "No!" or "Stop!"',
    examples: [
      { hanzi: '骂', pinyin: 'mà', en: 'To scold' },
      { hanzi: '不', pinyin: 'bù', en: 'No / Not' },
      { hanzi: '去', pinyin: 'qù', en: 'To go' },
      { hanzi: '看', pinyin: 'kàn', en: 'To look / read' }
    ]
  },
  {
    num: 5,
    name: 'Neutral Tone: Light & Soft',
    mark: '· (e.g. ma)',
    pitch: 'light',
    color: 'stone',
    accentColor: 'text-stone-700 bg-stone-100 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700',
    englishHint: 'A soft, light whisper. Unstressed, like a gentle breath.',
    examples: [
      { hanzi: '吗', pinyin: 'ma', en: 'Question marker' },
      { hanzi: '的', pinyin: 'de', en: 'Possessive marker' },
      { hanzi: '爸爸', pinyin: 'bàba', en: 'Dad (2nd syllable)' },
      { hanzi: '谢谢', pinyin: 'xièxie', en: 'Thanks (2nd syllable)' }
    ]
  }
];

function playWord(zh: string, slow = false) {
  if (slow) {
    playSlowAudio(zh);
  } else {
    playAudio(zh, 0.85);
  }
}
</script>

<template>
  <Teleport to="body">
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      @click.self="emit('close')"
      role="dialog"
      aria-modal="true"
      aria-label="How Chinese Tones & Pinyin Work"
    >
      <div 
        @click.stop
        class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90dvh] flex flex-col overflow-hidden relative my-auto animate-in zoom-in-95 duration-200 text-stone-900 dark:text-stone-100"
      >
        <!-- Modal Sticky Top Header -->
        <div class="p-4 sm:p-6 pb-3 border-b border-stone-100 dark:border-stone-800 flex items-start justify-between gap-3 shrink-0 bg-white dark:bg-stone-900">
          <div class="space-y-1">
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
              <Smile class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Beginner Friendly · Zero Prior Knowledge Needed</span>
            </div>

            <h2 class="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
              How Chinese Tones &amp; Pinyin Work
            </h2>

            <p class="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-lg">
              Pinyin is the phonetic alphabet for Chinese characters. In Mandarin, **the pitch tone changes the entire word's meaning**!
            </p>
          </div>

          <!-- Prominent Cross (X) Close Button -->
          <button 
            @click="emit('close')"
            class="p-2 sm:p-2.5 rounded-2xl text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 transition-all shadow-2xs shrink-0 active:scale-95"
            aria-label="Close Tone Guide"
            title="Close Tone Guide (Esc)"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Modal Scrollable Content Body -->
        <div class="overflow-y-auto p-4 sm:p-6 space-y-5 flex-1 overscroll-contain">
          
          <!-- Classic "Ma" Comparison Callout -->
          <div class="p-4 rounded-2xl bg-linear-to-r from-rose-50/80 via-amber-50/50 to-emerald-50/80 dark:from-stone-800 dark:to-stone-800/80 border border-stone-200/90 dark:border-stone-700 space-y-3">
            <div class="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Sparkles class="w-4 h-4 text-amber-500" />
              <span>The Famous "Ma" Example (Listen to the Pitch Difference!)</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button 
                @click="playWord('妈')"
                class="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-left hover:border-rose-400 transition-all shadow-2xs group"
              >
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-serif font-black text-stone-900 dark:text-stone-100">妈</span>
                  <Volume2 class="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
                </div>
                <div class="text-xs font-bold text-rose-600 dark:text-rose-400 mt-1">mā (1st)</div>
                <div class="text-[11px] text-stone-500 dark:text-stone-400">Mother</div>
              </button>

              <button 
                @click="playWord('麻')"
                class="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-left hover:border-emerald-400 transition-all shadow-2xs group"
              >
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-serif font-black text-stone-900 dark:text-stone-100">麻</span>
                  <Volume2 class="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                </div>
                <div class="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">má (2nd)</div>
                <div class="text-[11px] text-stone-500 dark:text-stone-400">Hemp</div>
              </button>

              <button 
                @click="playWord('马')"
                class="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-left hover:border-indigo-400 transition-all shadow-2xs group"
              >
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-serif font-black text-stone-900 dark:text-stone-100">马</span>
                  <Volume2 class="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                </div>
                <div class="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1">mǎ (3rd)</div>
                <div class="text-[11px] text-stone-500 dark:text-stone-400">Horse</div>
              </button>

              <button 
                @click="playWord('骂')"
                class="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-left hover:border-amber-400 transition-all shadow-2xs group"
              >
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-serif font-black text-stone-900 dark:text-stone-100">骂</span>
                  <Volume2 class="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                <div class="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">mà (4th)</div>
                <div class="text-[11px] text-stone-500 dark:text-stone-400">To scold</div>
              </button>
            </div>
          </div>

          <!-- Interactive 5-Tone Explorer (Responsive Segmented Tabs) -->
          <div class="space-y-3">
            <div class="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Explore Each Tone in Detail
            </div>

            <!-- Responsive 5-Column Segmented Tab Selector -->
            <div class="grid grid-cols-5 gap-1 sm:gap-1.5 bg-stone-100 dark:bg-stone-800/90 p-1 sm:p-1.5 rounded-2xl shadow-inner">
              <button 
                v-for="t in tones" 
                :key="t.num"
                @click="selectedToneTab = t.num"
                :class="[
                  'py-2 px-1 sm:px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 text-center',
                  selectedToneTab === t.num 
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-black' 
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                ]"
              >
                <span class="whitespace-nowrap">
                  <span class="sm:hidden">T{{ t.num }}</span>
                  <span class="hidden sm:inline">Tone&nbsp;{{ t.num }}</span>
                </span>
                <span class="text-[10px] opacity-75 font-mono whitespace-nowrap">({{ t.mark.split(' ')[0] }})</span>
              </button>
            </div>

            <!-- Selected Tone Card -->
            <div 
              v-for="t in tones" 
              :key="t.num"
              v-show="selectedToneTab === t.num"
              class="p-4 sm:p-5 rounded-2xl border space-y-4 animate-in fade-in"
              :class="t.accentColor"
            >
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-current/20">
                <div>
                  <div class="text-base sm:text-lg font-black">{{ t.name }}</div>
                  <div class="text-xs font-medium opacity-90 mt-0.5">{{ t.englishHint }}</div>
                </div>
                <div class="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 self-start sm:self-center">
                  Pitch curve: {{ t.pitch }}
                </div>
              </div>

              <!-- Interactive Examples List -->
              <div class="space-y-2">
                <div class="text-[11px] font-bold uppercase tracking-wider opacity-80">Click speaker to hear pronunciation:</div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div 
                    v-for="ex in t.examples" 
                    :key="ex.hanzi"
                    class="p-2.5 sm:p-3 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-current/20 flex items-center justify-between gap-2 text-stone-900 dark:text-stone-100"
                  >
                    <div class="flex items-baseline gap-2">
                      <span class="font-serif text-2xl font-black">{{ ex.hanzi }}</span>
                      <span class="font-bold text-sm text-rose-600 dark:text-rose-400">{{ ex.pinyin }}</span>
                      <span class="text-xs text-stone-500 dark:text-stone-400">({{ ex.en }})</span>
                    </div>

                    <div class="flex items-center gap-1 shrink-0">
                      <!-- Normal Speed Audio -->
                      <button 
                        @click="playWord(ex.hanzi, false)"
                        class="p-1.5 rounded-lg bg-current/10 hover:bg-current/20 text-current transition-colors"
                        title="Normal Speed"
                      >
                        <Volume2 class="w-4 h-4" />
                      </button>
                      <!-- Slow Turtle Audio for Beginners -->
                      <button 
                        @click="playWord(ex.hanzi, true)"
                        class="px-2 py-1 rounded-lg bg-current/10 hover:bg-current/20 text-[10px] font-bold text-current transition-colors"
                        title="Slow Speed (Turtle)"
                      >
                        🐢 Slow
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 2 Essential Golden Rules for Beginners -->
          <div class="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-2.5 text-xs">
            <div class="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-600" />
              <span>2 Golden Tone Rules (Tone Sandhi) Every Beginner Should Know</span>
            </div>

            <div class="space-y-2 text-stone-600 dark:text-stone-400 leading-relaxed">
              <p>
                <strong>1. Two 3rd Tones in a row:</strong> The first one turns into a 2nd tone! That's why <span class="font-bold text-stone-900 dark:text-stone-100">你好</span> (nǐ + hǎo) is naturally spoken as <strong class="text-rose-600 dark:text-rose-400">ní hǎo</strong>!
              </p>
              <p>
                <strong>2. 不 (bù) changes tone:</strong> When followed by a 4th tone, <span class="font-bold text-stone-900 dark:text-stone-100">不</span> turns into 2nd tone <strong class="text-rose-600 dark:text-rose-400">bú</strong> (e.g. 不是 bú shì).
              </p>
            </div>
          </div>

        </div>

        <!-- Modal Sticky Bottom Footer -->
        <div class="p-3.5 sm:p-4 border-t border-stone-100 dark:border-stone-800 shrink-0 bg-stone-50/80 dark:bg-stone-850/80 flex items-center justify-between gap-3">
          <span class="text-[11px] text-stone-500 dark:text-stone-400 hidden sm:inline">
            Press Esc or click outside to close
          </span>
          <button 
            @click="emit('close')"
            class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 ml-auto"
          >
            <span>I'm Ready! Let's Learn Chinese Words</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>
