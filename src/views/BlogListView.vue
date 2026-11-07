<script setup lang="ts">
import { ref, computed } from 'vue';
import { getAllBlogPosts } from '../data';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Filter,
  Bookmark,
  TrendingUp,
  User
} from 'lucide-vue-next';

const allPosts = getAllBlogPosts();

const searchQuery = ref('');
const selectedTag = ref('All');

const availableTags = [
  'All',
  'HSK 1',
  'HSK 2',
  'HSK 3',
  'Study Guide',
  'Grammar',
  'Exam Prep',
  'Listening',
  'Characters',
  'Writing',
  'Memory Strategy'
];

const filteredPosts = computed(() => {
  return allPosts.filter(p => {
    const matchesTag = selectedTag.value === 'All' || p.tags.includes(selectedTag.value);
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return matchesTag;

    const matchesQuery = 
      p.title.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query)) ||
      p.author.toLowerCase().includes(query);

    return matchesTag && matchesQuery;
  });
});

const featuredPost = computed(() => {
  // If showing All and no search query, highlight first guide
  if (selectedTag.value === 'All' && !searchQuery.value) {
    return allPosts[0];
  }
  return null;
});

const gridPosts = computed(() => {
  if (featuredPost.value) {
    return filteredPosts.value.slice(1);
  }
  return filteredPosts.value;
});
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-10 pb-20">
    
    <!-- Hero Header (Boxed Card) -->
    <div class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 lg:p-10 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-bold">
        <BookOpen class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
        <span>18 Comprehensive Masterclasses · 1,000+ Words Each</span>
      </div>
      <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
        HSK Free Lab Academic Guides
      </h1>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
        Exhaustive test strategies, cognitive retention systems, character anatomy guides, and level transition blueprints. 100% free with zero paywalls.
      </p>

      <!-- Quick Stats Banner -->
      <div class="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-2 text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-medium">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-100/80 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60"><CheckCircle2 class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> 18 Comprehensive Guides</span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-100/80 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60"><TrendingUp class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> 29,000+ Words Total</span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-100/80 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60"><Sparkles class="w-3.5 h-3.5 text-amber-500" /> Web Speech Audio Embedded</span>
      </div>
    </div>

    <!-- Search & Filter Controls -->
    <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs p-5 sm:p-6 space-y-4">
      <!-- Search Input -->
      <div class="relative">
        <Search class="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Search by keyword, topic, grammar point, or author (e.g. 'HSK 1', 'Stroke order', 'Tones', 'Pass')..."
          class="w-full pl-12 pr-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-sm outline-hidden transition-all bg-stone-50/50 dark:bg-stone-800 dark:text-stone-100"
        />
        <button 
          v-if="searchQuery" 
          @click="searchQuery = ''"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
        >
          Clear
        </button>
      </div>

      <!-- Tag Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <button 
          v-for="tag in availableTags" 
          :key="tag"
          @click="selectedTag = tag"
          :class="[
            'px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all',
            selectedTag === tag 
              ? 'bg-rose-600 text-white shadow-xs' 
              : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
          ]"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- FEATURED HERO GUIDE (When viewing default unfiltered feed) -->
    <router-link 
      v-if="featuredPost"
      :to="`/blog/${featuredPost.slug}`"
      class="block bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 rounded-3xl p-6 sm:p-10 text-white border border-stone-800 shadow-md hover:shadow-xl transition-all group relative overflow-hidden"
    >
      <div class="relative z-10 space-y-4 max-w-3xl">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-[10px] font-black px-2.5 py-0.8 rounded-full bg-rose-500 text-white uppercase tracking-wider">
            Featured Masterclass
          </span>
          <span class="text-[10px] font-bold px-2.5 py-0.8 rounded-full bg-white/10 text-stone-200">
            1,600+ Words · Comprehensive
          </span>
        </div>

        <h2 class="text-xl sm:text-3xl font-black leading-tight group-hover:text-rose-300 transition-colors">
          {{ featuredPost.title }}
        </h2>

        <p class="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3">
          {{ featuredPost.summary }}
        </p>

        <div class="flex flex-wrap items-center gap-4 text-xs text-stone-400 pt-2">
          <span class="flex items-center gap-1.5"><User class="w-3.5 h-3.5" /> {{ featuredPost.author }}</span>
          <span class="flex items-center gap-1.5"><Calendar class="w-3.5 h-3.5" /> {{ featuredPost.date }}</span>
          <span class="flex items-center gap-1.5"><Clock class="w-3.5 h-3.5" /> {{ featuredPost.readTime }}</span>
          <span class="text-rose-400 font-bold ml-auto flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Read Complete Guide <ArrowRight class="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </router-link>

    <!-- POSTS GRID -->
    <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <router-link 
        v-for="post in gridPosts" 
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between group hover:border-rose-200 dark:hover:border-rose-900/60"
      >
        <div class="space-y-3.5">
          <!-- Tags Row -->
          <div class="flex items-center gap-1.5 flex-wrap">
            <span 
              v-for="t in post.tags.slice(0, 3)" 
              :key="t"
              class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 uppercase tracking-wider"
            >
              {{ t }}
            </span>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              1,600+ words
            </span>
          </div>

          <!-- Title -->
          <h2 class="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors leading-snug">
            {{ post.title }}
          </h2>

          <!-- Summary -->
          <p class="text-xs text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-3">
            {{ post.summary }}
          </p>
        </div>

        <!-- Footer Meta -->
        <div class="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400 dark:text-stone-500">
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1"><Calendar class="w-3 h-3" /> {{ post.date }}</span>
            <span class="flex items-center gap-1"><Clock class="w-3 h-3" /> {{ post.readTime }}</span>
          </div>

          <span class="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Read <ArrowRight class="w-3 h-3" />
          </span>
        </div>
      </router-link>
    </div>

    <!-- Empty Search State -->
    <div v-else class="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-4">
      <div class="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 mx-auto flex items-center justify-center">
        <Search class="w-6 h-6" />
      </div>
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100">No matching articles found</h3>
      <p class="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
        We couldn't find any articles matching "{{ searchQuery }}". Try searching for 'HSK 1', 'Grammar', 'Listening', or clearing filters.
      </p>
      <button 
        @click="searchQuery = ''; selectedTag = 'All'"
        class="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:bg-stone-800"
      >
        Reset Filters
      </button>
    </div>

  </div>
</template>
