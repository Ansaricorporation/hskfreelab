import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { updateSeoMeta } from '../utils/seo';
import { getBlogPostBySlug } from '../data/blogs';
import { getWordBySlug } from '../data/vocab-helpers';
import { getGrammarRuleBySlug } from '../data/grammar-helpers';

// Lazy-loaded route components for optimal initial paint & code-splitting
const HomeView = () => import('../views/HomeView.vue');
const LevelHubView = () => import('../views/LevelHubView.vue');
const WordsDirectoryView = () => import('../views/WordsDirectoryView.vue');
const WordDetailView = () => import('../views/WordDetailView.vue');
const StrokeOrderView = () => import('../views/StrokeOrderView.vue');
const ScoreCalculatorView = () => import('../views/ScoreCalculatorView.vue');
const PronunciationView = () => import('../views/PronunciationView.vue');
const MockTestView = () => import('../views/MockTestView.vue');
const LessonsView = () => import('../views/LessonsView.vue');
const LessonDetailView = () => import('../views/LessonDetailView.vue');
const GrammarView = () => import('../views/GrammarView.vue');
const GrammarDetailView = () => import('../views/GrammarDetailView.vue');
const BlogListView = () => import('../views/BlogListView.vue');
const BlogPostView = () => import('../views/BlogPostView.vue');
const AboutView = () => import('../views/AboutView.vue');
const ContactView = () => import('../views/ContactView.vue');
const HskHistoryView = () => import('../views/HskHistoryView.vue');
const LegalView = () => import('../views/LegalView.vue');
const SitemapView = () => import('../views/SitemapView.vue');

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    name: 'home', 
    component: HomeView,
    meta: {
      title: 'HSK Free Lab - 100% Free HSK Prep, Mock Tests & Pinyin Tools',
      description: 'Free online Chinese test preparation. Practice timed mock exams, master pronunciation with the interactive pinyin soundboard, and calculate passing scores.',
      canonical: 'https://mybwn.com/'
    }
  },
  { 
    path: '/hsk-1', 
    name: 'hsk-1', 
    component: LevelHubView,
    meta: {
      title: 'HSK 1 Preparation Hub - 150 Words, Exam Format & Passing Rules | HSK Free Lab',
      description: 'Master all 150 official HSK 1 vocabulary words. Includes tone audio, stroke breakdown, daily grammar patterns, and practice tests.',
      canonical: 'https://mybwn.com/hsk-1'
    }
  },
  { 
    path: '/hsk-2', 
    name: 'hsk-2', 
    component: LevelHubView,
    meta: {
      title: 'HSK 2 Preparation Hub - 300 Words & Listening Practice | HSK Free Lab',
      description: 'Transition from beginner to elementary Mandarin. Comprehensive HSK 2 vocabulary lists, listening drills, and passing score guides.',
      canonical: 'https://mybwn.com/hsk-2'
    }
  },
  { 
    path: '/hsk-3', 
    name: 'hsk-3', 
    component: LevelHubView,
    meta: {
      title: 'HSK 3 Preparation Hub - 600 Words & Reading Drills | HSK Free Lab',
      description: 'Intermediate Mandarin test preparation. Master 300 additional HSK 3 characters, reading comprehension drills, and full exam prep.',
      canonical: 'https://mybwn.com/hsk-3'
    }
  },
  { 
    path: '/words', 
    name: 'words-directory', 
    component: WordsDirectoryView,
    meta: {
      title: 'HSK 1-3 Chinese Vocabulary Directory (603 Words) | HSK Free Lab',
      description: 'Master all 603 official HSK 1, 2, and 3 Chinese words with stroke order animations, native audio pronunciation, tone pitch contours, and grammar quizzes.',
      canonical: 'https://mybwn.com/words'
    }
  },
  { 
    path: '/words/:slug', 
    name: 'word-detail', 
    component: WordDetailView,
    meta: {
      title: 'HSK Chinese Vocabulary Study Guide | HSK Free Lab',
      description: 'Master Chinese characters with stroke order animations, audio pronunciation, radical decomposition, and practice quizzes.'
    }
  },
  { 
    path: '/calculator', 
    alias: '/hsk-score-calculator',
    name: 'score-calculator', 
    component: ScoreCalculatorView,
    meta: {
      title: 'Free HSK Score Calculator - Check Passing Thresholds & Scaled Marks',
      description: 'Instant HSK exam score calculator. Check your exact passing margin, scaled listening and reading scores, and official test thresholds.',
      canonical: 'https://mybwn.com/calculator'
    }
  },
  { 
    path: '/pinyin-trainer', 
    alias: '/pronunciation',
    name: 'pronunciation', 
    component: PronunciationView,
    meta: {
      title: 'Interactive Pinyin Tone Trainer & Audio Soundboard - Free Practice',
      description: 'Master Mandarin pronunciation. Practice distinguishing 1st, 2nd, 3rd, and 4th tones with native audio examples and interactive tests.',
      canonical: 'https://mybwn.com/pinyin-trainer'
    }
  },
  { 
    path: '/mock-tests', 
    alias: '/mock-test',
    name: 'mock-test', 
    component: MockTestView,
    meta: {
      title: 'Free Timed HSK Mock Tests - Real Exam Simulation with Explanations',
      description: 'Practice real-time timed HSK 1, 2, and 3 mock tests featuring instant grading, answer breakdowns, and readiness reports.',
      canonical: 'https://mybwn.com/mock-tests'
    }
  },
  { 
    path: '/mock-tests/:level', 
    alias: '/mock-test/:level',
    name: 'mock-test-level', 
    component: MockTestView,
    meta: {
      title: 'Free Timed HSK Mock Tests - Real Exam Simulation with Explanations',
      description: 'Practice real-time timed HSK 1, 2, and 3 mock tests featuring instant grading, answer breakdowns, and readiness reports.'
    }
  },
  { 
    path: '/mock-tests/:level/:id', 
    alias: '/mock-test/:level/:id',
    name: 'mock-test-item', 
    component: MockTestView,
    meta: {
      title: 'Free Timed HSK Mock Tests - Real Exam Simulation with Explanations',
      description: 'Practice real-time timed HSK 1, 2, and 3 mock tests featuring instant grading, answer breakdowns, and readiness reports.'
    }
  },
  { 
    path: '/lessons', 
    name: 'lessons', 
    component: LessonsView,
    meta: {
      title: 'Free Mandarin Grammar & Vocabulary Lessons | HSK Free Lab',
      description: 'Bite-sized Chinese grammar lessons, sentence structure formulas, and daily practical conversation drills.',
      canonical: 'https://mybwn.com/lessons'
    }
  },
  { 
    path: '/lessons/:slug', 
    name: 'lesson-detail', 
    component: LessonDetailView,
    meta: {
      title: 'Free Mandarin Grammar & Vocabulary Lessons | HSK Free Lab',
      description: 'Bite-sized Chinese grammar lessons, sentence structure formulas, and daily practical conversation drills.'
    }
  },
  { 
    path: '/guides', 
    alias: '/blog',
    name: 'blog', 
    component: BlogListView,
    meta: {
      title: 'HSK Study Guides & 30-Day Passing Roadmaps | HSK Free Lab',
      description: 'Step-by-step revision strategies, test-day preparation tips, and structured study plans to pass your HSK exams on your first attempt.',
      canonical: 'https://mybwn.com/guides'
    }
  },
  { 
    path: '/guides/:slug', 
    alias: '/blog/:slug',
    name: 'blog-post', 
    component: BlogPostView,
    meta: {
      title: 'HSK Study Guides & 30-Day Passing Roadmaps | HSK Free Lab',
      description: 'Step-by-step revision strategies, test-day preparation tips, and structured study plans to pass your HSK exams on your first attempt.'
    }
  },
  { 
    path: '/stroke-order', 
    name: 'stroke-order', 
    component: StrokeOrderView,
    meta: {
      title: 'Chinese Character Stroke Order Animator & Radical Breakdown',
      description: 'Animate and practice writing any Chinese character stroke-by-stroke with official direction, radical decomposition, and stroke count.',
      canonical: 'https://mybwn.com/stroke-order'
    }
  },
  { 
    path: '/stroke-order/:character', 
    name: 'stroke-order-char', 
    component: StrokeOrderView,
    meta: {
      title: 'Chinese Character Stroke Order Animator & Radical Breakdown',
      description: 'Animate and practice writing any Chinese character stroke-by-stroke with official direction, radical decomposition, and stroke count.'
    }
  },
  { 
    path: '/grammar', 
    name: 'grammar', 
    component: GrammarView,
    meta: {
      title: 'Essential HSK 1-3 Grammar Compendium - Sentence Structures & Rules',
      description: 'Comprehensive grammar reference for HSK 1, 2, and 3 with sentence patterns, particle explanations, and clear English examples.',
      canonical: 'https://mybwn.com/grammar'
    }
  },
  { 
    path: '/grammar/:slug', 
    name: 'grammar-detail', 
    component: GrammarDetailView,
    meta: {
      title: 'HSK Chinese Grammar Guide & Quiz | HSK Free Lab',
      description: 'Master Chinese grammar structures with detailed syntactic formulas, authentic native audio, common mistakes, and interactive quizzes.'
    }
  },
  { 
    path: '/about', 
    name: 'about', 
    component: AboutView,
    meta: {
      title: 'About HSK Free Lab - 100% Free Open Chinese Learning Platform',
      description: 'Learn about HSK Free Lab mission to provide world-class, 100% free Chinese language study resources without paywalls or subscriptions.',
      canonical: 'https://mybwn.com/about'
    }
  },
  { 
    path: '/contact', 
    name: 'contact', 
    component: ContactView,
    meta: {
      title: 'Contact HSK Free Lab - Support, Feedback & Inquiries',
      description: 'Get in touch with the HSK Free Lab editorial and technical team. Send bug reports, vocabulary corrections, syllabus feedback, or general questions.',
      canonical: 'https://mybwn.com/contact'
    }
  },
  { 
    path: '/hsk-history', 
    name: 'hsk-history', 
    component: HskHistoryView,
    meta: {
      title: 'History of the HSK Exam: HSK 1.0, 2.0 vs HSK 3.0 Standard',
      description: 'Discover the comprehensive history of the Chinese Proficiency Test, from its 1984 origins to the new 9-level 3.0 standard.',
      canonical: 'https://mybwn.com/hsk-history'
    }
  },
  { 
    path: '/privacy-policy', 
    name: 'privacy', 
    component: LegalView,
    meta: {
      title: 'Privacy Policy - HSK Free Lab',
      description: 'Privacy policy for HSK Free Lab. We respect your privacy and do not track or store personal data on remote servers.',
      canonical: 'https://mybwn.com/privacy-policy'
    }
  },
  { 
    path: '/terms', 
    name: 'terms', 
    component: LegalView,
    meta: {
      title: 'Terms of Service - HSK Free Lab',
      description: 'Terms of service governing the use of HSK Free Lab free learning platform and tools.',
      canonical: 'https://mybwn.com/terms'
    }
  },
  { 
    path: '/disclaimer', 
    name: 'disclaimer', 
    component: LegalView,
    meta: {
      title: 'Disclaimer - HSK Free Lab',
      description: 'Educational disclaimer and official trademarks note for HSK Free Lab.',
      canonical: 'https://mybwn.com/disclaimer'
    }
  },
  { 
    path: '/data-sources', 
    name: 'data-sources', 
    component: LegalView,
    meta: {
      title: 'Data Sources & Open Source Licenses - HSK Free Lab',
      description: 'Official data sources, vocab lists, and open source licenses powering HSK Free Lab.',
      canonical: 'https://mybwn.com/data-sources'
    }
  },
  { 
    path: '/sitemap', 
    name: 'sitemap', 
    component: SitemapView,
    meta: {
      title: 'HTML Sitemap & All-Pages Directory | HSK Free Lab',
      description: 'Complete index of all 67 pages on HSK Free Lab: HSK 1, 2, and 3 level hubs, 30 interactive lessons, 88 grammar rules, 18 study guides, and diagnostic tools.',
      canonical: 'https://mybwn.com/sitemap'
    }
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.afterEach((to) => {
  let title = (to.meta?.title as string) || 'HSK Free Lab - 100% Free HSK Prep, Mock Tests & Pinyin Tools';
  let description = (to.meta?.description as string) || 'Free online Chinese test preparation. Practice timed mock exams, master pronunciation with the interactive pinyin soundboard, and calculate passing scores.';
  let ogType = 'website';
  let canonical = (to.meta?.canonical as string) || undefined;

  if (to.name === 'blog-post' && to.params.slug) {
    const post = getBlogPostBySlug(to.params.slug as string);
    if (post) {
      title = `${post.title} | HSK Free Lab`;
      description = post.summary;
      ogType = 'article';
      canonical = `https://mybwn.com/guides/${post.slug}`;
    }
  } else if (to.name === 'stroke-order-char' && to.params.character) {
    title = `Write ${to.params.character} - Chinese Character Stroke Order & Animation | HSK Free Lab`;
    description = `Animate stroke order, radical decomposition, and stroke count for Chinese character ${to.params.character}.`;
    canonical = `https://mybwn.com/stroke-order/${encodeURIComponent(to.params.character as string)}`;
  } else if (to.name === 'word-detail' && to.params.slug) {
    const word = getWordBySlug(to.params.slug as string);
    if (word) {
      title = `${word.hanzi} (${word.pinyin}) Meaning in English, Stroke Order & HSK ${word.level} Sentences | HSK Free Lab`;
      description = `Learn Chinese word ${word.hanzi} (${word.pinyin}): English meaning "${word.meaning}", animated stroke order, HSK ${word.level} audio pronunciation, grammar collocations, and practice quiz.`;
      ogType = 'article';
      canonical = `https://mybwn.com/words/${word.slug}`;
    }
  } else if (to.name === 'grammar-detail' && to.params.slug) {
    const rule = getGrammarRuleBySlug(to.params.slug as string);
    if (rule) {
      title = `${rule.title} - HSK ${rule.level} Chinese Grammar Guide | HSK Free Lab`;
      description = `Master ${rule.title} for HSK ${rule.level}. Syntax pattern: ${rule.pattern}. Free bilingual examples with native audio, common mistakes, and interactive quiz.`;
      ogType = 'article';
      canonical = `https://mybwn.com/grammar/${rule.slug}`;
    }
  }

  updateSeoMeta({ title, description, canonical, type: ogType }, to.path);
});

export default router;
