<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import { X, Download, Copy, Check, ExternalLink, Share2, Sparkles } from 'lucide-vue-next';

interface Props {
  show: boolean;
  type: 'word' | 'grammar';
  level: number;
  title: string;
  subtitle?: string;
  pattern?: string;
  englishMeaning: string;
  exampleZh?: string;
  examplePy?: string;
  exampleEn?: string;
  canonicalUrl: string;
  slug: string;
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: '',
  pattern: '',
  exampleZh: '',
  examplePy: '',
  exampleEn: ''
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isCopied = ref(false);
const isGenerating = ref(false);
const previewUrl = ref<string>('');

function getLevelColors(lvl: number) {
  if (lvl === 1) return { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0', accent: '#059669', name: 'HSK 1 • A1' };
  if (lvl === 2) return { bg: '#F0F9FF', text: '#075985', border: '#BAE6FD', accent: '#0284C7', name: 'HSK 2 • A2' };
  return { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A', accent: '#D97706', name: 'HSK 3 • B1' };
}

// Wrap long text onto canvas
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  // Handle Chinese characters that don't have spaces
  if (words.length <= 1 && text.length > 20) {
    let currentLine = '';
    for (let n = 0; n < text.length; n++) {
      const testLine = currentLine + text[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(currentLine, x, currentY);
        currentLine = text[n];
        currentY += lineHeight;
      } else {
        currentLine = testLine;
      }
    }
    ctx.fillText(currentLine, x, currentY);
    return currentY + lineHeight;
  }

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY + lineHeight;
}

function renderCanvas() {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  isGenerating.value = true;

  // High-res Pinterest dimensions: 1000 x 1500 (2:3 ratio)
  canvas.width = 1000;
  canvas.height = 1500;

  const lvl = getLevelColors(props.level);

  // Background
  ctx.fillStyle = '#FAF7F2';
  ctx.fillRect(0, 0, 1000, 1500);

  // Outer decorative border
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#E8E2D8';
  ctx.strokeRect(36, 36, 928, 1428);

  // Inner card background
  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, 50, 50, 900, 1400, 36);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#EFE9DE';
  ctx.stroke();

  // Top header bar
  ctx.fillStyle = '#FAF7F2';
  roundRect(ctx, 70, 70, 860, 100, 24);
  ctx.fill();

  // Brand Name
  ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#1C1917';
  ctx.fillText('HSK FREE LAB', 100, 132);

  // Top sub-brand dot & text
  ctx.fillStyle = lvl.accent;
  ctx.beginPath();
  ctx.arc(315, 122, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#78716C';
  ctx.fillText('mybwn.com', 335, 130);

  // Level Pill
  ctx.fillStyle = lvl.bg;
  roundRect(ctx, 730, 90, 175, 60, 20);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = lvl.border;
  ctx.stroke();

  ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = lvl.text;
  ctx.textAlign = 'center';
  ctx.fillText(lvl.name, 817, 128);
  ctx.textAlign = 'left';

  // Card Type Tag
  ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = lvl.accent;
  const tagText = props.type === 'grammar' ? 'HSK GRAMMAR SYLLABUS CARD' : 'HSK VOCABULARY STUDY CARD';
  ctx.fillText(tagText, 100, 230);

  let currentY = 270;

  if (props.type === 'word') {
    // Large Hanzi Character
    ctx.font = 'bold 130px "Noto Serif SC", "Songti SC", "SimSun", serif';
    ctx.fillStyle = '#0C0A09';
    ctx.fillText(props.title, 100, currentY + 100);

    // Pinyin
    ctx.font = '600 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = lvl.accent;
    ctx.fillText(props.subtitle || '', 100, currentY + 175);

    currentY += 210;

    // English Meaning Card
    ctx.fillStyle = '#F8F6F0';
    roundRect(ctx, 100, currentY, 800, 120, 20);
    ctx.fill();
    ctx.strokeStyle = '#E8E2D8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#78716C';
    ctx.fillText('ENGLISH DEFINITION & PART OF SPEECH', 125, currentY + 38);

    ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#1C1917';
    const defText = props.pattern ? `${props.englishMeaning} (${props.pattern})` : props.englishMeaning;
    wrapText(ctx, defText, 125, currentY + 80, 750, 40);

    currentY += 150;
  } else {
    // Grammar Title
    ctx.font = 'bold 52px "Noto Serif SC", "Songti SC", "SimSun", serif';
    ctx.fillStyle = '#0C0A09';
    currentY = wrapText(ctx, props.title, 100, currentY + 40, 800, 64);

    // English Meaning
    if (props.englishMeaning) {
      ctx.font = '500 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#57534E';
      currentY = wrapText(ctx, props.englishMeaning, 100, currentY + 10, 800, 38);
    }

    currentY += 20;

    // Syntax Formula Box
    if (props.pattern) {
      ctx.fillStyle = '#F4EFE6';
      roundRect(ctx, 100, currentY, 800, 140, 24);
      ctx.fill();
      ctx.strokeStyle = '#DECFC0';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = lvl.accent;
      ctx.fillText('SYNTAX FORMULA PATTERN', 130, currentY + 42);

      ctx.font = 'bold 36px "Noto Sans SC", -apple-system, sans-serif';
      ctx.fillStyle = '#1C1917';
      wrapText(ctx, props.pattern, 130, currentY + 95, 740, 46);

      currentY += 170;
    }
  }

  // Example Sentence Section
  if (props.exampleZh) {
    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, 100, currentY, 800, 360, 24);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#E8E2D8';
    ctx.stroke();

    // Section title
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#78716C';
    ctx.fillText('PRACTICAL USAGE & EXAMPLE SENTENCE', 135, currentY + 48);

    // Example Chinese
    ctx.font = 'bold 42px "Noto Serif SC", "Songti SC", "SimSun", serif';
    ctx.fillStyle = '#0C0A09';
    let exY = wrapText(ctx, props.exampleZh, 135, currentY + 110, 730, 56);

    // Example Pinyin
    if (props.examplePy) {
      ctx.font = '500 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = lvl.accent;
      exY = wrapText(ctx, props.examplePy, 135, exY + 14, 730, 34);
    }

    // Example English
    if (props.exampleEn) {
      ctx.font = '400 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#57534E';
      wrapText(ctx, `"${props.exampleEn}"`, 135, exY + 14, 730, 32);
    }
  }

  // Footer Banner
  const footerY = 1290;
  ctx.fillStyle = '#1C1917';
  roundRect(ctx, 100, footerY, 800, 120, 24);
  ctx.fill();

  ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('Learn Chinese Free • Audio & Practice Quizzes', 140, footerY + 52);

  ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#D6D3D1';
  ctx.fillText('Save this study card to your Pinterest Board! • mybwn.com', 140, footerY + 90);

  // Tiny external icon marker
  ctx.fillStyle = lvl.accent;
  roundRect(ctx, 810, footerY + 35, 50, 50, 14);
  ctx.fill();
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('→', 835, footerY + 68);
  ctx.textAlign = 'left';

  previewUrl.value = canvas.toDataURL('image/png');
  isGenerating.value = false;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function downloadImage() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const link = document.createElement('a');
  link.download = `hsk${props.level}-${props.type}-${props.slug}-study-card.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function getPinDescription(): string {
  const levelTag = `HSK ${props.level}`;
  if (props.type === 'grammar') {
    return `📌 ${props.title} — ${levelTag} Chinese Grammar Rule. Learn the pattern: ${props.pattern || ''}. Practice with free audio and mastery quizzes at ${props.canonicalUrl} #learnchinese #hsk${props.level} #mandarin #chinesegrammar #hsk`;
  }
  return `📌 ${props.title} (${props.subtitle}) — ${levelTag} Chinese Vocabulary Word. Meaning: ${props.englishMeaning}. Learn character strokes, audio, and example sentences at ${props.canonicalUrl} #learnchinese #hsk${props.level} #mandarin #chinesevocab #hsk`;
}

function copyPinInfo() {
  const text = getPinDescription();
  navigator.clipboard.writeText(text).then(() => {
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2500);
  });
}

function openPinterestShare() {
  const description = encodeURIComponent(getPinDescription());
  const url = encodeURIComponent(props.canonicalUrl);
  // Pinterest create pin URL
  const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${url}&description=${description}`;
  window.open(pinUrl, '_blank', 'noopener,noreferrer');
}

watch(
  () => props.show,
  (val) => {
    if (val) {
      nextTick(() => {
        setTimeout(renderCanvas, 80);
      });
    }
  }
);

onMounted(() => {
  if (props.show) {
    nextTick(() => {
      setTimeout(renderCanvas, 80);
    });
  }
});
</script>

<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/70 backdrop-blur-sm overflow-y-auto"
    @click.self="emit('close')"
  >
    <div 
      class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
    >
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/80 dark:bg-stone-950/60">
        <div class="flex items-center gap-2">
          <span class="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
            <Share2 class="w-5 h-5" />
          </span>
          <div>
            <h3 class="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>Pinterest Visual Study Card</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">1000 × 1500 px</span>
            </h3>
            <p class="text-xs text-stone-500 dark:text-stone-400">
              High-resolution 2:3 vertical infographic ready to pin or download.
            </p>
          </div>
        </div>

        <button 
          type="button" 
          @click="emit('close')" 
          class="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          aria-label="Close modal"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <!-- Canvas Preview Left Column -->
        <div class="md:col-span-7 flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-950/70 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800">
          <canvas ref="canvasRef" class="hidden"></canvas>
          <img 
            v-if="previewUrl" 
            :src="previewUrl" 
            alt="Study Card Preview" 
            class="max-h-[52vh] w-auto rounded-xl shadow-lg border border-stone-200 dark:border-stone-800 object-contain"
          />
          <div v-else class="h-[48vh] flex items-center justify-center text-stone-400 text-sm">
            Generating high-resolution card...
          </div>
        </div>

        <!-- Actions Right Column -->
        <div class="md:col-span-5 space-y-4">
          <div class="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2">
            <div class="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
              <Sparkles class="w-3.5 h-3.5" />
              <span>100% Free Educational Resource</span>
            </div>
            <p class="text-xs text-amber-900/80 dark:text-amber-300/80 leading-relaxed">
              Save this study card to your personal Chinese language boards on Pinterest, or download it to revise offline on mobile devices.
            </p>
          </div>

          <!-- Buttons -->
          <div class="space-y-2.5 pt-2">
            <!-- Download PNG -->
            <button 
              type="button"
              @click="downloadImage"
              class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <Download class="w-4 h-4" />
              <span>Download Card (PNG)</span>
            </button>

            <!-- Copy Pin Info -->
            <button 
              type="button"
              @click="copyPinInfo"
              class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700/80 text-stone-800 dark:text-stone-200 font-semibold text-sm border border-stone-200 dark:border-stone-700 shadow-xs transition-all"
            >
              <Check v-if="isCopied" class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <Copy v-else class="w-4 h-4 text-stone-400" />
              <span>{{ isCopied ? 'Pin Text Copied to Clipboard!' : 'Copy Pin Title & Text' }}</span>
            </button>

            <!-- Save on Pinterest direct -->
            <button 
              type="button"
              @click="openPinterestShare"
              class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-sm hover:shadow-md transition-all"
            >
              <ExternalLink class="w-4 h-4" />
              <span>Save on Pinterest</span>
            </button>
          </div>

          <p class="text-[11px] text-stone-400 text-center pt-2">
            Links canonically back to <span class="font-mono text-stone-500 dark:text-stone-400">{{ canonicalUrl }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
