import { ref } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'sepia';

const STORAGE_KEY = 'hsk_theme';

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (saved && (saved === 'light' || saved === 'dark' || saved === 'sepia')) {
    return saved;
  }
  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export const currentTheme = ref<ThemeMode>(getInitialTheme());

export function applyTheme(theme: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  root.classList.remove('dark', 'sepia-mode');

  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'sepia') {
    root.classList.add('sepia-mode');
  }

  localStorage.setItem(STORAGE_KEY, theme);
  currentTheme.value = theme;
}

export function setTheme(theme: ThemeMode) {
  applyTheme(theme);
}

export function toggleTheme() {
  if (currentTheme.value === 'light') {
    setTheme('dark');
  } else if (currentTheme.value === 'dark') {
    setTheme('sepia');
  } else {
    setTheme('light');
  }
}

// Initial application
if (typeof window !== 'undefined') {
  applyTheme(currentTheme.value);
}
