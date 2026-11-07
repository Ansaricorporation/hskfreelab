<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAllBlogPosts, getBlogPostBySlug } from '../data';
import { updateSeoMeta } from '../utils/seo';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Check, 
  Volume2, 
  BookOpen, 
  Compass, 
  ListOrdered, 
  Sparkles,
  HelpCircle,
  Award,
  Bookmark
} from 'lucide-vue-next';
import { playAudio } from '../utils/speech';

const route = useRoute();
const router = useRouter();

const slug = computed(() => route.params.slug as string);
const post = computed(() => getBlogPostBySlug(slug.value));
const allPosts = getAllBlogPosts();

watch(post, (currentPost) => {
  if (currentPost) {
    updateSeoMeta({
      title: `${currentPost.title} | HSK Free Lab`,
      description: currentPost.summary,
      canonical: `https://mybwn.com/guides/${currentPost.slug}`,
      type: 'article',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: currentPost.title,
          description: currentPost.summary,
          author: {
            '@type': 'Organization',
            name: 'HSK Free Lab',
            url: 'https://mybwn.com/'
          },
          publisher: {
            '@type': 'Organization',
            name: 'HSK Free Lab',
            logo: {
              '@type': 'ImageObject',
              url: 'https://mybwn.com/favicon.svg'
            }
          },
          datePublished: currentPost.date,
          dateModified: '2026-11-07',
          mainEntityOfPage: `https://mybwn.com/guides/${currentPost.slug}`,
          image: 'https://mybwn.com/og-preview.png'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://mybwn.com/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Guides',
              item: 'https://mybwn.com/guides'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: currentPost.title,
              item: `https://mybwn.com/guides/${currentPost.slug}`
            }
          ]
        }
      ]
    }, route.path);
  }
}, { immediate: true });

// Scroll progress bar
const scrollProgress = ref(0);
function updateScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (docHeight > 0) {
    scrollProgress.value = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress);
});

// Calculate word count
const wordCount = computed(() => {
  if (!post.value) return 0;
  return post.value.content.trim().split(/\s+/).length;
});

// Navigation: previous & next post
const postIndex = computed(() => {
  return allPosts.findIndex(p => p.slug === slug.value);
});

const prevPost = computed(() => {
  if (postIndex.value > 0) return allPosts[postIndex.value - 1];
  return null;
});

const nextPost = computed(() => {
  if (postIndex.value >= 0 && postIndex.value < allPosts.length - 1) {
    return allPosts[postIndex.value + 1];
  }
  return null;
});

// Related posts (same or similar tags, excluding current)
const relatedPosts = computed(() => {
  if (!post.value) return [];
  const currentTags = new Set(post.value.tags);
  return allPosts
    .filter(p => p.slug !== slug.value)
    .map(p => ({
      post: p,
      score: p.tags.filter(t => currentTags.has(t)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.post);
});

// Copy link feedback
const copied = ref(false);
function copyArticleLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2500);
  });
}

// Parse markdown content into structured sections
interface BlogSection {
  id: string;
  title: string;
  paragraphs: string[];
}

const parsedSections = computed<BlogSection[]>(() => {
  if (!post.value) return [];
  const raw = post.value.content;
  const parts = raw.split(/\n(?=###\s+)/);
  const sections: BlogSection[] = [];

  parts.forEach((part, idx) => {
    const trimmed = part.trim();
    if (!trimmed) return;
    const lines = trimmed.split('\n');
    let title = `Section ${idx + 1}`;
    let bodyStartIndex = 0;

    if (lines[0].startsWith('### ')) {
      title = lines[0].replace('### ', '').trim();
      bodyStartIndex = 1;
    }

    const paragraphs = lines.slice(bodyStartIndex).join('\n').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    sections.push({
      id: `section-${idx + 1}`,
      title,
      paragraphs
    });
  });

  return sections;
});

// Audio pronunciation helper for example sentences
function playChineseAudio(text: string) {
  // Extract Chinese characters if text has (Pinyin - English)
  const hanziMatch = text.match(/[\u4e00-\u9fa5]+/g);
  if (hanziMatch) {
    playAudio(hanziMatch.join(''), 0.85);
  } else {
    playAudio(text, 0.85);
  }
}

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
</script>

<template>
  <div>
    <!-- Sticky Reading Progress Bar -->
    <div class="fixed top-0 left-0 right-0 h-1 z-50 bg-stone-100 dark:bg-stone-800">
      <div 
        class="h-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 transition-all duration-150"
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>

    <div class="max-w-6xl mx-auto space-y-10 pb-20 pt-2 px-2 sm:px-4">
      
      <!-- Top Navigation & Breadcrumbs -->
      <div class="flex items-center justify-between text-xs">
        <router-link 
          to="/guides" 
          class="inline-flex items-center gap-1.5 font-bold text-stone-600 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back to All 18 Guides</span>
        </router-link>

        <button 
          @click="copyArticleLink" 
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 font-semibold transition-all shadow-xs"
        >
          <Check v-if="copied" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <Share2 v-else class="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
          <span>{{ copied ? 'Link Copied!' : 'Share Guide' }}</span>
        </button>
      </div>

      <!-- MAIN ARTICLE WRAPPER -->
      <div v-if="post" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- LEFT: MAIN CONTENT COLUMN (8 COLS) -->
        <article class="lg:col-span-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 sm:p-10 space-y-8">
          
          <!-- Article Header -->
          <header class="space-y-4 pb-6 border-b border-stone-100 dark:border-stone-800">
            <!-- Tags -->
            <div class="flex items-center gap-2 flex-wrap">
              <span 
                v-for="t in post.tags" 
                :key="t"
                class="text-[11px] font-bold px-2.5 py-0.8 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 uppercase tracking-wider"
              >
                {{ t }}
              </span>
              <span class="text-[11px] font-bold px-2.5 py-0.8 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                1000+ Words Verified
              </span>
            </div>

            <!-- Title -->
            <h1 class="text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 leading-tight tracking-tight">
              {{ post.title }}
            </h1>

            <!-- Metadata Row -->
            <div class="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 pt-2">
              <span class="flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-200">
                <User class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> {{ post.author }}
              </span>
              <span class="flex items-center gap-1.5">
                <Calendar class="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" /> {{ post.date }}
              </span>
              <span class="flex items-center gap-1.5">
                <Clock class="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" /> {{ post.readTime }}
              </span>
              <span class="flex items-center gap-1.5 font-mono text-stone-500 dark:text-stone-400">
                <Bookmark class="w-3.5 h-3.5 text-amber-500" /> {{ wordCount.toLocaleString() }} words
              </span>
            </div>
          </header>

          <!-- Executive Abstract Lead Box -->
          <div class="p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 dark:border-amber-800/40 text-stone-800 dark:text-stone-200 space-y-2">
            <div class="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
              <Sparkles class="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Core Takeaway & Executive Summary</span>
            </div>
            <p class="text-sm font-medium leading-relaxed italic text-stone-700 dark:text-stone-300">
              "{{ post.summary }}"
            </p>
          </div>

          <!-- Structured Sections -->
          <div class="space-y-10 pt-2">
            <section 
              v-for="(sec, secIdx) in parsedSections" 
              :key="sec.id"
              :id="sec.id"
              class="space-y-4 scroll-mt-20"
            >
              <!-- Section Header -->
              <div class="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800 first:border-0 first:pt-0">
                <span class="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-black text-xs flex items-center justify-center shrink-0">
                  {{ secIdx + 1 }}
                </span>
                <h2 class="text-lg sm:text-2xl font-black text-stone-900 dark:text-stone-100 leading-snug">
                  {{ sec.title }}
                </h2>
              </div>

              <!-- Paragraphs and Content Blocks -->
              <div class="space-y-4 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                <template v-for="(p, pIdx) in sec.paragraphs" :key="pIdx">
                  
                  <!-- If paragraph contains Example sentences (with Chinese and Pinyin) -->
                  <div 
                    v-if="p.startsWith('- Example') || p.startsWith('Example') || p.includes('Zhǐyào') || p.includes('Suīrán')"
                    class="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200/90 dark:border-stone-700 text-stone-800 dark:text-stone-200 space-y-2 my-2"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div class="space-y-1">
                        <div class="font-bold text-stone-900 dark:text-stone-100 text-base">
                          {{ p.split('(')[0].replace(/^-\s*/, '') }}
                        </div>
                        <div v-if="p.includes('(')" class="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif">
                          ({{ p.split('(')[1] }}
                        </div>
                      </div>
                      <button 
                        @click="playChineseAudio(p)" 
                        class="p-2 rounded-lg bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 hover:bg-rose-50 dark:hover:bg-stone-600 hover:border-rose-300 text-rose-600 dark:text-rose-400 shrink-0 transition-colors shadow-xs"
                        title="Listen to native audio"
                      >
                        <Volume2 class="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <!-- If paragraph is a numbered diagnostic or question point -->
                  <div 
                    v-else-if="/^[0-9]+\.\s+/.test(p) || p.startsWith('Question') || p.startsWith('Response:')"
                    class="p-4 rounded-xl bg-stone-50/70 dark:bg-stone-800/50 border-l-4 border-rose-500 pl-4 py-3 my-2"
                  >
                    <div class="font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
                      {{ p }}
                    </div>
                  </div>

                  <!-- If paragraph is a phase roadmap point -->
                  <div 
                    v-else-if="p.startsWith('- Phase') || p.startsWith('Phase')"
                    class="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-emerald-950 dark:text-emerald-200 flex items-start gap-3 my-2"
                  >
                    <Award class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div class="text-xs sm:text-sm font-medium leading-relaxed">
                      {{ p.replace(/^-\s*/, '') }}
                    </div>
                  </div>

                  <!-- Standard readable narrative paragraph -->
                  <p v-else class="text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
                    {{ p }}
                  </p>

                </template>
              </div>
            </section>
          </div>

          <!-- Author Bio & Open Access Box -->
          <div class="pt-8 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold flex items-center justify-center shrink-0">
                HF
              </div>
              <div>
                <div class="font-bold text-stone-900 dark:text-stone-100">HSK Free Lab Educational Core</div>
                <div>Peer-reviewed Mandarin Chinese curriculum repository</div>
              </div>
            </div>
            <div class="text-center sm:text-right font-medium">
              100% Free · Zero Login · Zero Subscription
            </div>
          </div>

          <!-- Bottom Article Navigation: Previous & Next -->
          <div class="pt-6 border-t border-stone-100 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <router-link 
              v-if="prevPost" 
              :to="`/guides/${prevPost.slug}`"
              class="p-4 rounded-2xl border border-stone-200 dark:border-stone-700 hover:border-rose-300 dark:hover:border-rose-600 hover:bg-stone-50/80 dark:hover:bg-stone-800 transition-all group flex flex-col justify-between"
            >
              <div class="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider flex items-center gap-1">
                <ArrowLeft class="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Previous Guide
              </div>
              <div class="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2 mt-1">
                {{ prevPost.title }}
              </div>
            </router-link>
            <div v-else class="p-4 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800 opacity-40"></div>

            <router-link 
              v-if="nextPost" 
              :to="`/guides/${nextPost.slug}`"
              class="p-4 rounded-2xl border border-stone-200 dark:border-stone-700 hover:border-rose-300 dark:hover:border-rose-600 hover:bg-stone-50/80 dark:hover:bg-stone-800 transition-all group flex flex-col justify-between text-right"
            >
              <div class="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider flex items-center justify-end gap-1">
                Next Guide <ArrowRight class="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
              <div class="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2 mt-1">
                {{ nextPost.title }}
              </div>
            </router-link>
          </div>
        </article>

        <!-- RIGHT: STICKY TABLE OF CONTENTS & QUICK TOOLS SIDEBAR (4 COLS) -->
        <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
          
          <!-- Table of Contents Card -->
          <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 space-y-4">
            <div class="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100 text-sm">
              <ListOrdered class="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>Table of Contents</span>
            </div>

            <nav class="space-y-1.5 text-xs">
              <button 
                v-for="(sec, idx) in parsedSections" 
                :key="sec.id"
                @click="scrollToSection(sec.id)"
                class="w-full text-left p-2 rounded-xl text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-start gap-2.5 group"
              >
                <span class="w-5 h-5 rounded-md bg-stone-100 dark:bg-stone-800 group-hover:bg-rose-100 dark:group-hover:bg-rose-950 group-hover:text-rose-800 dark:group-hover:text-rose-300 font-bold text-[10px] flex items-center justify-center shrink-0 transition-colors">
                  {{ idx + 1 }}
                </span>
                <span class="leading-snug line-clamp-2">{{ sec.title }}</span>
              </button>
            </nav>
          </div>

          <!-- Quick Test Gate Callout Card -->
          <div class="bg-gradient-to-br from-rose-700 to-rose-900 rounded-3xl p-6 text-white space-y-4 shadow-md">
            <div class="flex items-center gap-2 text-rose-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles class="w-4 h-4 text-amber-300" />
              <span>Apply Your Knowledge</span>
            </div>
            <h3 class="text-lg font-black leading-snug">
              Ready to test your retention under timed conditions?
            </h3>
            <p class="text-xs text-rose-100 leading-relaxed">
              Take an official format timed mock test. 10 test gates per level with listening and reading.
            </p>
            <router-link 
              to="/mock-tests"
              class="block w-full py-2.5 text-center text-xs font-bold rounded-xl bg-white text-rose-900 hover:bg-rose-50 transition-colors shadow-xs"
            >
              Start Free Timed Mock Test
            </router-link>
          </div>

          <!-- Related Reading Cards -->
          <div v-if="relatedPosts.length > 0" class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 space-y-4">
            <div class="font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center gap-2">
              <BookOpen class="w-4 h-4 text-stone-500 dark:text-stone-400" />
              <span>Related Masterclasses</span>
            </div>

            <div class="space-y-3">
              <router-link 
                v-for="rel in relatedPosts" 
                :key="rel.slug"
                :to="`/guides/${rel.slug}`"
                class="block p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-100 dark:border-stone-800 transition-colors space-y-1 group"
              >
                <div class="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                  {{ rel.tags[0] }} · {{ rel.readTime }}
                </div>
                <div class="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
                  {{ rel.title }}
                </div>
              </router-link>
            </div>
          </div>
        </aside>

      </div>

      <!-- NOT FOUND STATE -->
      <div v-else class="text-center py-20 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-4">
        <h2 class="text-2xl font-bold text-stone-900 dark:text-stone-100">Guide not found</h2>
        <p class="text-xs text-stone-500 dark:text-stone-400">The requested article slug could not be located in our repository.</p>
        <router-link to="/guides" class="inline-block px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold">
          Return to Blog Directory
        </router-link>
      </div>

    </div>
  </div>
</template>
