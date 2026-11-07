<script setup lang="ts">
import { ref } from 'vue';
import { 
  HardDrive, 
  Download, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  X, 
  Save, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw,
  FileText,
  AlertCircle
} from 'lucide-vue-next';
import { 
  isBackupModalOpen, 
  closeBackupModal, 
  browserProgress, 
  lastSavedAt,
  saveBrowserProgress,
  downloadBackupFile,
  importProgressJSON,
  resetBrowserProgress,
  totalLearnedWordsCount,
  completedLessonsCount,
  completedMockTestsCount,
  overallProgressPercent,
  showToast
} from '../../stores/auth';

const fileInput = ref<HTMLInputElement | null>(null);
const showResetConfirm = ref(false);
const pasteModalOpen = ref(false);
const pastedJson = ref('');
const importError = ref<string | null>(null);

function handleManualSave() {
  saveBrowserProgress(true);
}

function handleDownload() {
  downloadBackupFile();
}

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target?.result as string;
    if (text) {
      const res = importProgressJSON(text);
      if (res.success) {
        closeBackupModal();
      } else {
        importError.value = res.error || 'Invalid backup file';
      }
    }
  };
  reader.readAsText(file);
  target.value = ''; // Reset input
}

function handlePastedImport() {
  importError.value = null;
  if (!pastedJson.value.trim()) {
    importError.value = 'Please paste valid backup JSON text.';
    return;
  }
  const res = importProgressJSON(pastedJson.value.trim());
  if (res.success) {
    pasteModalOpen.value = false;
    pastedJson.value = '';
    closeBackupModal();
  } else {
    importError.value = res.error || 'Failed to parse JSON backup.';
  }
}

function handleConfirmReset() {
  resetBrowserProgress();
  showResetConfirm.value = false;
  closeBackupModal();
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div 
      v-if="isBackupModalOpen" 
      class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-stone-950/70 backdrop-blur-sm animate-in fade-in overflow-y-auto"
      @click.self="closeBackupModal"
      role="dialog"
      aria-modal="true"
    >
      <!-- Modal Dialog Window -->
      <div 
        class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl w-full max-w-lg max-h-[90dvh] overflow-y-auto transition-all text-stone-900 dark:text-stone-100 space-y-6 p-5 sm:p-8 relative my-auto animate-in zoom-in-95 duration-200"
      >
      <!-- Close Button -->
      <button 
        @click="closeBackupModal"
        class="absolute right-5 top-5 p-2 rounded-xl text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        aria-label="Close modal"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- Modal Header -->
      <div class="space-y-2">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
          <HardDrive class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Browser Data Storage (No Login Required)</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-black tracking-tight">
          Browser Study Progress & Backup
        </h3>
        <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          Your learning progress is stored directly inside your browser’s local database (<code class="text-xs bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">localStorage</code>). It requires zero passwords, zero accounts, and never leaves your device.
        </p>
      </div>

      <!-- Current Storage Live Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 text-xs">
        <div class="space-y-0.5">
          <div class="text-[11px] text-stone-500 dark:text-stone-400">Total Words</div>
          <div class="font-black text-sm text-rose-600 dark:text-rose-400">{{ totalLearnedWordsCount }} / 603</div>
        </div>
        <div class="space-y-0.5">
          <div class="text-[11px] text-stone-500 dark:text-stone-400">Lessons Read</div>
          <div class="font-black text-sm text-emerald-600 dark:text-emerald-400">{{ completedLessonsCount }} / 30</div>
        </div>
        <div class="space-y-0.5">
          <div class="text-[11px] text-stone-500 dark:text-stone-400">Mock Tests</div>
          <div class="font-black text-sm text-purple-600 dark:text-purple-400">{{ completedMockTestsCount }} / 30</div>
        </div>
        <div class="space-y-0.5">
          <div class="text-[11px] text-stone-500 dark:text-stone-400">Overall</div>
          <div class="font-black text-sm text-amber-600 dark:text-amber-400">{{ overallProgressPercent }}%</div>
        </div>
      </div>

      <!-- Action 1: Manual Save Button -->
      <div class="space-y-3">
        <button 
          @click="handleManualSave"
          class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
        >
          <Save class="w-4 h-4" />
          <span>Save Progress to Browser Now</span>
        </button>
        <div class="text-[11px] text-center text-stone-500 dark:text-stone-400 flex items-center justify-center gap-1.5">
          <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span>Automatic real-time autosave is active (Last saved: {{ lastSavedAt }})</span>
        </div>
      </div>

      <!-- Action 2: Backup and Restore Options -->
      <div class="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-3">
        <div class="text-xs font-bold text-stone-700 dark:text-stone-300">
          Transfer or Backup Your Progress:
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <!-- Download Backup -->
          <button 
            @click="handleDownload"
            class="py-2.5 px-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            <Download class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Download .JSON Backup</span>
          </button>

          <!-- Restore / Import File -->
          <button 
            @click="triggerFileInput"
            class="py-2.5 px-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            <Upload class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Import / Restore File</span>
          </button>
        </div>

        <!-- Hidden input for file picker -->
        <input 
          ref="fileInput"
          type="file" 
          accept=".json,application/json" 
          class="hidden" 
          @change="handleFileChange" 
        />

        <!-- Paste Text Alternative -->
        <div class="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-1">
          <button 
            @click="pasteModalOpen = !pasteModalOpen"
            class="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 underline font-medium"
          >
            {{ pasteModalOpen ? 'Hide text paste box' : 'Or paste backup JSON code directly' }}
          </button>
        </div>

        <!-- Direct JSON Paste Box -->
        <div v-if="pasteModalOpen" class="space-y-2 pt-2 animate-in fade-in">
          <textarea 
            v-model="pastedJson"
            placeholder="Paste your exported backup JSON text here..."
            rows="3"
            class="w-full p-2.5 text-xs font-mono rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-emerald-500/30"
          ></textarea>
          <button 
            @click="handlePastedImport"
            class="py-1.5 px-3 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs"
          >
            Apply Restored Data
          </button>
        </div>

        <!-- Error notification if import fails -->
        <div v-if="importError" class="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle class="w-4 h-4 shrink-0" />
          <span>{{ importError }}</span>
        </div>
      </div>

      <!-- Action 3: Danger Zone / Reset -->
      <div class="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
        <div v-if="!showResetConfirm">
          <button 
            @click="showResetConfirm = true"
            class="text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-1.5 text-[11px]"
          >
            <Trash2 class="w-3.5 h-3.5" />
            <span>Clear / Reset study progress</span>
          </button>
        </div>

        <div v-else class="w-full flex items-center justify-between p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200">
          <span class="text-xs font-bold">Are you sure? This cannot be undone.</span>
          <div class="flex items-center gap-2">
            <button 
              @click="handleConfirmReset"
              class="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px]"
            >
              Yes, Reset
            </button>
            <button 
              @click="showResetConfirm = false"
              class="px-2 py-1 rounded-lg bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-[11px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</Teleport>
</template>
