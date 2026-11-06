import { ref, computed } from 'vue';

export interface UserProgress {
  learnedWordIds: string[];
  completedLessons: string[];
  completedMockTests: string[];
  mockTestScores: Record<string, { score: number; maxScore: number; passed: boolean; date: string }>;
  lastActive: string;
}

const BROWSER_PROGRESS_KEY = 'hsk_browser_progress_v1';
const LEGACY_GUEST_KEY = 'hsk_guest_progress';
const LEGACY_USERS_KEY = 'hsk_users_db';

// Safely initialize from localStorage with migration from any previous account/guest data
function loadBrowserProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return { learnedWordIds: [], completedLessons: [], completedMockTests: [], mockTestScores: {}, lastActive: '' };
  }

  try {
    // 1. Primary storage
    const saved = localStorage.getItem(BROWSER_PROGRESS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        learnedWordIds: Array.isArray(parsed.learnedWordIds) ? parsed.learnedWordIds : [],
        completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
        completedMockTests: Array.isArray(parsed.completedMockTests) ? parsed.completedMockTests : [],
        mockTestScores: parsed.mockTestScores && typeof parsed.mockTestScores === 'object' ? parsed.mockTestScores : {},
        lastActive: parsed.lastActive || new Date().toISOString()
      };
    }

    // 2. Migration: check if user had previous guest progress
    const legacyGuest = localStorage.getItem(LEGACY_GUEST_KEY);
    if (legacyGuest) {
      const parsed = JSON.parse(legacyGuest);
      if (parsed && (parsed.learnedWordIds?.length || parsed.completedLessons?.length)) {
        return {
          learnedWordIds: parsed.learnedWordIds || [],
          completedLessons: parsed.completedLessons || [],
          completedMockTests: parsed.completedMockTests || [],
          mockTestScores: parsed.mockTestScores || {},
          lastActive: new Date().toISOString()
        };
      }
    }

    // 3. Migration: check if user had previous account in users db
    const legacyUsers = localStorage.getItem(LEGACY_USERS_KEY);
    if (legacyUsers) {
      const users = JSON.parse(legacyUsers);
      const userKeys = Object.keys(users);
      if (userKeys.length > 0) {
        const lastUser = users[userKeys[0]];
        if (lastUser && lastUser.progress) {
          return {
            learnedWordIds: lastUser.progress.learnedWordIds || [],
            completedLessons: lastUser.progress.completedLessons || [],
            completedMockTests: lastUser.progress.completedMockTests || [],
            mockTestScores: lastUser.progress.mockTestScores || {},
            lastActive: new Date().toISOString()
          };
        }
      }
    }
  } catch (err) {
    console.warn('Could not read existing HSK progress from localStorage:', err);
  }

  return {
    learnedWordIds: [],
    completedLessons: [],
    completedMockTests: [],
    mockTestScores: {},
    lastActive: new Date().toISOString()
  };
}

// Global Reactive State
export const browserProgress = ref<UserProgress>(loadBrowserProgress());
export const isBackupModalOpen = ref(false);
export const lastSavedAt = ref<string>(new Date().toLocaleTimeString());
export const activeToast = ref<string | null>(null);

let toastTimer: any = null;
export function showToast(message: string, duration = 3000) {
  activeToast.value = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    activeToast.value = null;
  }, duration);
}

// Persist immediately to browser localStorage
export function saveBrowserProgress(notify = false) {
  if (typeof window === 'undefined') return;
  try {
    browserProgress.value.lastActive = new Date().toISOString();
    localStorage.setItem(BROWSER_PROGRESS_KEY, JSON.stringify(browserProgress.value));
    lastSavedAt.value = new Date().toLocaleTimeString();
    if (notify) {
      showToast('✓ Progress successfully saved to browser data!');
    }
  } catch (e) {
    console.error('Failed to save HSK progress to localStorage:', e);
  }
}

// Modal controls
export function openBackupModal() {
  isBackupModalOpen.value = true;
}

export function closeBackupModal() {
  isBackupModalOpen.value = false;
}

// Export progress as JSON string
export function exportProgressJSON(): string {
  return JSON.stringify({
    version: '1.0',
    exportedAt: new Date().toISOString(),
    platform: 'HSK Free Lab',
    data: browserProgress.value
  }, null, 2);
}

// Trigger client-side file download of backup
export function downloadBackupFile() {
  if (typeof window === 'undefined') return;
  const json = exportProgressJSON();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStr = new Date().toISOString().slice(0, 10);
  a.download = `hsk-free-lab-progress-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('✓ Backup file downloaded! Keep it safe.');
}

// Import progress from JSON string
export function importProgressJSON(jsonStr: string): { success: boolean; error?: string } {
  try {
    const parsed = JSON.parse(jsonStr);
    const targetData = parsed.data || parsed;

    if (!targetData || !Array.isArray(targetData.learnedWordIds)) {
      return { success: false, error: 'Invalid backup file format. Missing vocabulary list.' };
    }

    // Merge or replace safely
    const words = Array.from(new Set([
      ...browserProgress.value.learnedWordIds,
      ...targetData.learnedWordIds
    ]));

    const lessons = Array.from(new Set([
      ...browserProgress.value.completedLessons,
      ...(Array.isArray(targetData.completedLessons) ? targetData.completedLessons : [])
    ]));

    const tests = Array.from(new Set([
      ...browserProgress.value.completedMockTests,
      ...(Array.isArray(targetData.completedMockTests) ? targetData.completedMockTests : [])
    ]));

    const scores = {
      ...browserProgress.value.mockTestScores,
      ...(targetData.mockTestScores || {})
    };

    browserProgress.value = {
      learnedWordIds: words,
      completedLessons: lessons,
      completedMockTests: tests,
      mockTestScores: scores,
      lastActive: new Date().toISOString()
    };

    saveBrowserProgress(false);
    showToast(`✓ Backup restored! Loaded ${words.length} learned words.`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: 'Failed to read JSON: ' + (err.message || 'Syntax error') };
  }
}

// Reset all progress
export function resetBrowserProgress() {
  browserProgress.value = {
    learnedWordIds: [],
    completedLessons: [],
    completedMockTests: [],
    mockTestScores: {},
    lastActive: new Date().toISOString()
  };
  saveBrowserProgress(false);
  showToast('Study progress has been reset.');
}

// ==========================================
// CORE PROGRESS MUTATIONS & GETTERS
// ==========================================

export const activeProgress = computed<UserProgress>(() => browserProgress.value);

export function toggleLearnedWord(wordId: string) {
  const currentProg = browserProgress.value;
  const list = [...currentProg.learnedWordIds];
  const idx = list.indexOf(wordId);

  let isNowLearned = false;
  if (idx > -1) {
    list.splice(idx, 1);
    isNowLearned = false;
  } else {
    list.push(wordId);
    isNowLearned = true;
  }

  currentProg.learnedWordIds = list;
  saveBrowserProgress(false);

  if (isNowLearned) {
    showToast(`Word marked as learned! (${list.length} total in browser)`);
  }
}

export function isWordLearned(wordId: string): boolean {
  return browserProgress.value.learnedWordIds.includes(wordId);
}

export function markLessonCompleted(slug: string) {
  const currentProg = browserProgress.value;
  if (!currentProg.completedLessons.includes(slug)) {
    currentProg.completedLessons.push(slug);
    saveBrowserProgress(false);
    showToast('Lesson marked completed! (+1 in browser data)');
  }
}

export function recordMockTestResult(slug: string, score: number, maxScore: number, passed: boolean) {
  const currentProg = browserProgress.value;
  if (!currentProg.completedMockTests.includes(slug)) {
    currentProg.completedMockTests.push(slug);
  }
  currentProg.mockTestScores[slug] = {
    score,
    maxScore,
    passed,
    date: new Date().toLocaleDateString()
  };
  saveBrowserProgress(false);
}

// ==========================================
// COMPUTED METRICS
// ==========================================

export const totalLearnedWordsCount = computed(() => {
  return browserProgress.value.learnedWordIds.length;
});

export const hsk1LearnedCount = computed(() => {
  return browserProgress.value.learnedWordIds.filter(id => id.startsWith('hsk1-')).length;
});

export const hsk2LearnedCount = computed(() => {
  return browserProgress.value.learnedWordIds.filter(id => id.startsWith('hsk2-')).length;
});

export const hsk3LearnedCount = computed(() => {
  return browserProgress.value.learnedWordIds.filter(id => id.startsWith('hsk3-')).length;
});

export const completedLessonsCount = computed(() => {
  return browserProgress.value.completedLessons.length;
});

export const completedMockTestsCount = computed(() => {
  return browserProgress.value.completedMockTests.length;
});

export const overallProgressPercent = computed(() => {
  return Math.min(100, Math.round((totalLearnedWordsCount.value / 603) * 100));
});

export const hsk1ProgressPercent = computed(() => {
  return Math.min(100, Math.round((hsk1LearnedCount.value / 153) * 100));
});

export const hsk2ProgressPercent = computed(() => {
  return Math.min(100, Math.round((hsk2LearnedCount.value / 150) * 100));
});

export const hsk3ProgressPercent = computed(() => {
  return Math.min(100, Math.round((hsk3LearnedCount.value / 300) * 100));
});

// ==========================================
// BACKWARDS-COMPATIBILITY EXPORTS
// (Prevents breaking existing components)
// ==========================================

export const currentUser = computed(() => null);
export const isLoggedIn = computed(() => false);
export const isAuthModalOpen = computed(() => isBackupModalOpen.value);
export const showRejoinPasswordModal = ref(false);
export const rejoinUsername = ref('');
export const authModalTab = ref<'login' | 'signup'>('signup');

// Global Interactive Pinyin & Tones Guide Modal State
export const isToneGuideOpen = ref(false);
export function openToneGuide() {
  isToneGuideOpen.value = true;
}
export function closeToneGuide() {
  isToneGuideOpen.value = false;
}

export function openAuthModal(_tab?: string) {
  openBackupModal();
}

export function closeAuthModal() {
  closeBackupModal();
}

export function initAuth() {
  // Automatically persists and checks browser storage
  saveBrowserProgress(false);
}

export function login(_u?: string, _p?: string) {
  return { success: true };
}

export function register(_u?: string, _p?: string) {
  return { success: true };
}

export function logout() {
  // No-op in browser storage mode
}

export function unlockRejoinSession(_p?: string) {
  return { success: true };
}

export function continueAsGuest() {
  showRejoinPasswordModal.value = false;
}
