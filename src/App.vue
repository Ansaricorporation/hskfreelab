<script setup lang="ts">
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
import BrowserBackupModal from './components/progress/BrowserBackupModal.vue';
import PinyinToneGuideModal from './components/tools/PinyinToneGuideModal.vue';
import CookieConsent from './components/layout/CookieConsent.vue';
import ToastBanner from './components/ui/ToastBanner.vue';
import { isToneGuideOpen, closeToneGuide } from './stores/auth';
</script>

<template>
  <div class="min-h-screen w-full flex flex-col bg-[#fdfbf7] dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-rose-200 dark:selection:bg-rose-900 selection:text-rose-900 dark:selection:text-rose-100 font-sans transition-colors duration-200 overflow-x-hidden">
    <Header />
    <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 flex flex-col items-center">
      <router-view class="w-full" />
    </main>
    <Footer />

    <!-- Global Modals & Notifications -->
    <BrowserBackupModal />
    <PinyinToneGuideModal :isOpen="isToneGuideOpen" @close="closeToneGuide" />
    <CookieConsent />
    <ToastBanner />
  </div>
</template>
