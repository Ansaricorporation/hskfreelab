<script setup lang="ts">
import PronunciationPlayer from '../components/tools/PronunciationPlayer.vue';
import { Volume2, Sparkles, BookOpen, Music, CheckCircle2, Info } from 'lucide-vue-next';
import { playAudio, playSlowAudio } from '../utils/speech';

const tones = [
  {
    num: 1,
    name: '1st Tone: High & Flat',
    mark: 'ˉ (e.g. mā)',
    pitch: '5-5',
    color: 'rose',
    accentColor: 'text-rose-600 bg-rose-50 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    englishHint: 'Singing a steady, high musical note. Keep pitch consistently high and flat.',
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
    englishHint: 'Pitch starts low, dips down deep into the chest, then swoops gently up.',
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
    mark: 'none (e.g. ma)',
    pitch: 'Variable',
    color: 'stone',
    accentColor: 'text-stone-700 bg-stone-100 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700',
    englishHint: 'Light, short, and de-emphasized, like an unstressed English syllable.',
    examples: [
      { hanzi: '吗', pinyin: 'ma', en: 'Question marker' },
      { hanzi: '呢', pinyin: 'ne', en: 'What about...?' },
      { hanzi: '吧', pinyin: 'ba', en: 'Suggestion marker' },
      { hanzi: '爸爸', pinyin: 'bàba', en: 'Dad (2nd syllable)' }
    ]
  }
];
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-12 pb-20 px-4">
    <!-- Header (Boxed Card) -->
    <div class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-semibold">
        <Volume2 class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span>Mandarin Pinyin Masterclass</span>
      </div>
      <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
        Chinese Pronunciation &amp; Tone Trainer
      </h1>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
        Listen to all 23 initials and 24 finals with high clarity audio. Train your musical pitch recognition with our interactive tone game and master the 5 Mandarin tones.
      </p>
    </div>

    <!-- Pronunciation Player Component -->
    <PronunciationPlayer />

    <!-- Indexable Comprehensive Pinyin & 5 Tones Guide -->
    <section id="tone-guide" class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-10 shadow-sm space-y-10">
      <div class="space-y-3">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold">
          <Music class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          <span>Foundational Phonology</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          The 5 Mandarin Tones &amp; Tone Sandhi Rules
        </h2>
        <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          Mandarin Chinese is a tonal language. The exact same syllable pronounced with different vocal pitch contours has entirely different meanings. Below is the definitive guide to mastering all 5 tones and natural tone change (Sandhi) rules.
        </p>
      </div>

      <!-- Tone Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="tone in tones" 
          :key="tone.num"
          class="p-5 rounded-2xl border border-stone-200/90 dark:border-stone-700/80 bg-stone-50/50 dark:bg-stone-800/40 space-y-4"
        >
          <div class="flex items-center justify-between">
            <span :class="['px-2.5 py-1 rounded-xl text-xs font-bold border', tone.accentColor]">
              {{ tone.name }}
            </span>
            <span class="text-xs font-mono font-bold text-stone-400 dark:text-stone-500">
              Pitch: {{ tone.pitch }}
            </span>
          </div>

          <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            <strong>Vocal Tip:</strong> {{ tone.englishHint }}
          </p>

          <div class="space-y-2 pt-1 border-t border-stone-200/60 dark:border-stone-700/60">
            <div class="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Example Vocabulary:</div>
            <div class="grid grid-cols-2 gap-2">
              <div 
                v-for="ex in tone.examples" 
                :key="ex.hanzi"
                class="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 text-xs shadow-2xs"
              >
                <div>
                  <span class="font-serif font-black text-sm text-stone-900 dark:text-stone-100">{{ ex.hanzi }}</span>
                  <span class="ml-1.5 font-bold text-rose-600 dark:text-rose-400">{{ ex.pinyin }}</span>
                  <div class="text-[10px] text-stone-500 dark:text-stone-400 truncate max-w-[90px]">{{ ex.en }}</div>
                </div>
                <button 
                  type="button"
                  @click="playAudio(ex.hanzi, 0.85)"
                  class="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:bg-rose-100 dark:hover:bg-rose-900 hover:text-rose-700 flex items-center justify-center transition-colors shrink-0"
                  :aria-label="`Listen to ${ex.hanzi}`"
                >
                  <Volume2 class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tone Sandhi Rules Section -->
      <div class="p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-5">
        <div class="flex items-center gap-2">
          <Sparkles class="w-5 h-5 text-amber-700 dark:text-amber-400" />
          <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100">
            Essential Tone Sandhi (Natural Pitch Shifts)
          </h3>
        </div>
        <p class="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
          In natural spoken Mandarin, certain tones change pitch dynamically when combined with adjacent syllables:
        </p>

        <div class="space-y-4 text-xs">
          <div class="p-4 rounded-xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-amber-800/60 space-y-2">
            <div class="font-bold text-stone-900 dark:text-stone-100">
              1. Third Tone Sandhi: Two 3rd Tones in a Row (3 + 3 &rarr; 2 + 3)
            </div>
            <p class="text-stone-600 dark:text-stone-300">
              When two 3rd tones appear consecutively, the first changes to a rising 2nd tone.
            </p>
            <div class="p-2 rounded-lg bg-stone-50 dark:bg-stone-800 font-mono text-[11px] text-stone-800 dark:text-stone-200">
              你好 (nǐ + hǎo) is pronounced <strong>ní hǎo</strong>.
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-amber-800/60 space-y-2">
            <div class="font-bold text-stone-900 dark:text-stone-100">
              2. Tone Changes for "一" (yī)
            </div>
            <p class="text-stone-600 dark:text-stone-300">
              Before a 4th tone syllable, 一 shifts to the 2nd tone: <strong>yí gè</strong> (一个). Before 1st, 2nd, or 3rd tones, it shifts to the 4th tone: <strong>yì tiān</strong> (一天), <strong>yì nián</strong> (一年), <strong>yì qǐ</strong> (一起).
            </p>
          </div>

          <div class="p-4 rounded-xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-amber-800/60 space-y-2">
            <div class="font-bold text-stone-900 dark:text-stone-100">
              3. Tone Changes for "不" (bù)
            </div>
            <p class="text-stone-600 dark:text-stone-300">
              Before a 4th tone syllable, 不 shifts to the 2nd tone: <strong>bú shì</strong> (不是), <strong>bú duì</strong> (不对). Before other tones, it remains 4th tone: <strong>bù gāo</strong> (不高).
            </p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
