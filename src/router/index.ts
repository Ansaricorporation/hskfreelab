import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { updateSeoMeta } from '../utils/seo';
import { getBlogPostBySlug } from '../data';

// Lazy-loaded route components for optimal initial paint & code-splitting
const HomeView = () => import('../views/HomeView.vue');
const LevelHubView = () => import('../views/LevelHubView.vue');
const StrokeOrderView = () => import('../views/StrokeOrderView.vue');
const ScoreCalculatorView = () => import('../views/ScoreCalculatorView.vue');
const PronunciationView = () => import('../views/PronunciationView.vue');
const MockTestView = () => import('../views/MockTestView.vue');
const LessonsView = () => import('../views/LessonsView.vue');
const GrammarView = () => import('../views/GrammarView.vue');
const BlogListView = () => import('../views/BlogListView.vue');
const BlogPostView = () => import('../views/BlogPostView.vue');
const AboutView = () => import('../views/AboutView.vue');
const HskHistoryView = () => import('../views/HskHistoryView.vue');
const LegalView = () => import('../views/LegalView.vue');

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    name: 'home', 
    component: HomeView,
    meta: {
      title: 'HSK Free Lab - 100% Free HSK Prep, Mock Tests & Pinyin Tools',
      description: 'Prepare for HSK 1, 2, and 3 with zero paywalls. Free timed mock exams, interactive pinyin tone trainer, and score calculator.'
    }
  },
  { 
    path: '/hsk-1', 
    name: 'hsk-1', 
    component: LevelHubView,
    meta: {
      title: 'HSK 1 Complete Prep Hub - 150 Words, Exam Format & Passing Rules',
      description: 'Master the 150 official HSK 1 vocabulary words. Includes audio pronunciation, stroke order, grammar patterns, and practice tests.'
    }
  },
  { 
    path: '/hsk-2', 
    name: 'hsk-2', 
    component: LevelHubView,
    meta: {
      title: 'HSK 2 Complete Prep Hub - 300 Words, Grammar & Exam Strategies',
      description: 'Master the 300 official HSK 2 vocabulary words. Native audio pronunciations, grammar breakdown, and full-length practice tests.'
    }
  },
  { 
    path: '/hsk-3', 
    name: 'hsk-3', 
    component: LevelHubView,
    meta: {
      title: 'HSK 3 Complete Prep Hub - 600 Words, Writing & Reading Mastery',
      description: 'Conquer HSK 3 with 600 essential vocabulary terms, sentence structure guides, writing section practice, and mock exams.'
    }
  },
  { 
    path: '/stroke-order', 
    name: 'stroke-order', 
    component: StrokeOrderView,
    meta: {
      title: 'Chinese Character Stroke Order Animator & Radical Breakdown',
      description: 'Animate and practice writing any Chinese character stroke-by-stroke with official direction, radical decomposition, and stroke count.'
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
    path: '/hsk-score-calculator', 
    name: 'score-calculator', 
    component: ScoreCalculatorView,
    meta: {
      title: 'HSK Score Calculator - Check Passing Thresholds & Scaled Scores',
      description: 'Calculate your HSK passing score instantly. Accurate scoring thresholds for HSK 1, HSK 2, and HSK 3 exam sections.'
    }
  },
  { path: '/calculator', redirect: '/hsk-score-calculator' },
  { 
    path: '/pronunciation', 
    name: 'pronunciation', 
    component: PronunciationView,
    meta: {
      title: 'Interactive Pinyin Tone Trainer & Audio Soundboard - Free Practice',
      description: 'Train your Mandarin ear. Practice distinguishing 1st, 2nd, 3rd, and 4th tones with native audio and interactive tests.'
    }
  },
  { path: '/pinyin-trainer', redirect: '/pronunciation' },
  { 
    path: '/mock-test', 
    name: 'mock-test', 
    component: MockTestView,
    meta: {
      title: 'Free Timed HSK Mock Tests - Real Exam Simulation',
      description: 'Take official-style timed HSK 1, 2, and 3 mock tests with automated scoring and answer explanations.'
    }
  },
  { path: '/mock-tests', redirect: '/mock-test' },
  { 
    path: '/mock-test/:level', 
    name: 'mock-test-level', 
    component: MockTestView,
    meta: {
      title: 'Free Timed HSK Mock Tests - Real Exam Simulation',
      description: 'Take official-style timed HSK 1, 2, and 3 mock tests with automated scoring and answer explanations.'
    }
  },
  { 
    path: '/mock-test/:level/:id', 
    name: 'mock-test-item', 
    component: MockTestView,
    meta: {
      title: 'Free Timed HSK Mock Tests - Real Exam Simulation',
      description: 'Take official-style timed HSK 1, 2, and 3 mock tests with automated scoring and answer explanations.'
    }
  },
  { 
    path: '/lessons', 
    name: 'lessons', 
    component: LessonsView,
    meta: {
      title: '30 Interactive HSK Lessons - Structured Chinese Curriculum',
      description: 'Step-by-step interactive Mandarin lessons covering HSK 1, 2, and 3 with real dialogs, native audio, and comprehension drills.'
    }
  },
  { 
    path: '/grammar', 
    name: 'grammar', 
    component: GrammarView,
    meta: {
      title: 'Essential HSK 1-3 Grammar Compendium - Sentence Structures & Rules',
      description: 'Comprehensive grammar reference for HSK 1, 2, and 3 with sentence patterns, particle explanations, and clear English examples.'
    }
  },
  { 
    path: '/blog', 
    name: 'blog', 
    component: BlogListView,
    meta: {
      title: 'HSK Guides & Masterclasses - Free Chinese Exam Strategies',
      description: 'Authoritative guides on passing HSK exams, master stroke order, 30-day blueprints, and vocabulary acquisition strategies.'
    }
  },
  { path: '/guides', redirect: '/blog' },
  { 
    path: '/blog/:slug', 
    name: 'blog-post', 
    component: BlogPostView,
    meta: {
      title: 'HSK Guides & Masterclasses - Free Chinese Exam Strategies',
      description: 'Authoritative guides on passing HSK exams, master stroke order, 30-day blueprints, and vocabulary acquisition strategies.'
    }
  },
  { 
    path: '/about', 
    name: 'about', 
    component: AboutView,
    meta: {
      title: 'About HSK Free Lab - 100% Free Open Chinese Learning Platform',
      description: 'Learn about HSK Free Lab mission to provide world-class, 100% free Chinese language study resources without paywalls or subscriptions.'
    }
  },
  { 
    path: '/hsk-history', 
    name: 'hsk-history', 
    component: HskHistoryView,
    meta: {
      title: 'History of the HSK Exam: HSK 1.0, 2.0 vs HSK 3.0 Standard',
      description: 'Discover the comprehensive history of the Chinese Proficiency Test, from its 1984 origins to the new 9-level 3.0 standard.'
    }
  },
  { 
    path: '/privacy-policy', 
    name: 'privacy', 
    component: LegalView,
    meta: {
      title: 'Privacy Policy - HSK Free Lab',
      description: 'Privacy policy for HSK Free Lab. We respect your privacy and do not track or store personal data on remote servers.'
    }
  },
  { 
    path: '/terms', 
    name: 'terms', 
    component: LegalView,
    meta: {
      title: 'Terms of Service - HSK Free Lab',
      description: 'Terms of service governing the use of HSK Free Lab free learning platform and tools.'
    }
  },
  { 
    path: '/disclaimer', 
    name: 'disclaimer', 
    component: LegalView,
    meta: {
      title: 'Disclaimer - HSK Free Lab',
      description: 'Educational disclaimer and official trademarks note for HSK Free Lab.'
    }
  },
  { 
    path: '/data-sources', 
    name: 'data-sources', 
    component: LegalView,
    meta: {
      title: 'Data Sources & Open Source Licenses - HSK Free Lab',
      description: 'Official data sources, vocab lists, and open source licenses powering HSK Free Lab.'
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
  let description = (to.meta?.description as string) || 'Prepare for HSK 1, 2, and 3 with zero paywalls. Free timed mock exams, interactive pinyin tone trainer, and score calculator.';
  let ogType = 'website';

  if (to.name === 'blog-post' && to.params.slug) {
    const post = getBlogPostBySlug(to.params.slug as string);
    if (post) {
      title = `${post.title} | HSK Free Lab`;
      description = post.summary;
      ogType = 'article';
    }
  } else if (to.name === 'stroke-order-char' && to.params.character) {
    title = `Write ${to.params.character} - Chinese Character Stroke Order & Animation | HSK Free Lab`;
    description = `Animate stroke order, radical decomposition, and stroke count for Chinese character ${to.params.character}.`;
  }

  updateSeoMeta({ title, description, type: ogType }, to.path);
});

export default router;
