import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/', // HTML5 History mode with custom domain mybwn.com
  build: {
    target: 'es2020',
    cssMinify: true,
    chunkSizeWarningLimit: 1200,
    modulePreload: {
      polyfill: false,
      resolveDependencies(_filename: string, deps: string[], { hostType }: { hostId: string; hostType: 'html' | 'js' }) {
        if (hostType === 'html') {
          return deps.filter((dep) => {
            const normalized = dep.replace(/\\/g, '/');
            return !(
              normalized.includes('data-') ||
              normalized.includes('pinyin-pro') ||
              normalized.includes('hanzi-writer') ||
              normalized.includes('View-') ||
              normalized.includes('views/')
            );
          });
        }
        return deps;
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/');
          if (normalized.includes('node_modules')) {
            if (normalized.includes('vue') || normalized.includes('vue-router')) {
              return 'vue-vendor';
            }
            if (normalized.includes('hanzi-writer')) {
              return 'hanzi-writer';
            }
            if (normalized.includes('pinyin-pro')) {
              return 'pinyin-pro';
            }
            if (normalized.includes('lucide-vue-next')) {
              return 'icons';
            }
          }
          if (normalized.includes('src/data/blogs')) {
            return 'data-blogs';
          }
          if (normalized.includes('src/data/mock-tests')) {
            return 'data-mock-tests';
          }
          if (normalized.includes('src/data/hsk1-vocab') || normalized.includes('src/data/hsk2-vocab') || normalized.includes('src/data/hsk3-vocab')) {
            return 'data-vocab';
          }
          if (normalized.includes('src/data/lessons') || normalized.includes('src/data/grammar')) {
            return 'data-curriculum';
          }
        },
      },
    },
  },
})
