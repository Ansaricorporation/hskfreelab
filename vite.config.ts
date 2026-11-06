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
  base: './', // enables easy local viewing of dist/index.html and any static serverless host
  build: {
    target: 'es2020',
    cssMinify: true,
    chunkSizeWarningLimit: 1200,
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
