import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

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
  { path: '/', name: 'home', component: HomeView },
  { path: '/hsk-1', name: 'hsk-1', component: LevelHubView },
  { path: '/hsk-2', name: 'hsk-2', component: LevelHubView },
  { path: '/hsk-3', name: 'hsk-3', component: LevelHubView },
  { path: '/stroke-order', name: 'stroke-order', component: StrokeOrderView },
  { path: '/stroke-order/:character', name: 'stroke-order-char', component: StrokeOrderView },
  { path: '/hsk-score-calculator', name: 'score-calculator', component: ScoreCalculatorView },
  { path: '/calculator', redirect: '/hsk-score-calculator' },
  { path: '/pronunciation', name: 'pronunciation', component: PronunciationView },
  { path: '/pinyin-trainer', redirect: '/pronunciation' },
  { path: '/mock-test', name: 'mock-test', component: MockTestView },
  { path: '/mock-tests', redirect: '/mock-test' },
  { path: '/mock-test/:level', name: 'mock-test-level', component: MockTestView },
  { path: '/mock-test/:level/:id', name: 'mock-test-item', component: MockTestView },
  { path: '/lessons', name: 'lessons', component: LessonsView },
  { path: '/grammar', name: 'grammar', component: GrammarView },
  { path: '/blog', name: 'blog', component: BlogListView },
  { path: '/guides', redirect: '/blog' },
  { path: '/blog/:slug', name: 'blog-post', component: BlogPostView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/hsk-history', name: 'hsk-history', component: HskHistoryView },
  { path: '/privacy-policy', name: 'privacy', component: LegalView },
  { path: '/terms', name: 'terms', component: LegalView },
  { path: '/disclaimer', name: 'disclaimer', component: LegalView },
  { path: '/data-sources', name: 'data-sources', component: LegalView },
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

export default router;
