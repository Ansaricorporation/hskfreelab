# HSK Free Lab (HSK 1–3) — 100% Free Chinese Learning Platform

> Zero Paywalls · Zero Logins Required · Serverless Static Client Architecture

**HSK Free Lab** is an open-access, fully client-side web application designed to help Mandarin learners master **HSK Levels 1, 2, and 3**. Built with **Vue.js 3**, **TypeScript**, and **Tailwind CSS**, the entire platform compiles directly into a standalone `dist/` bundle that can be deployed to any static host (Cloudflare Pages, Vercel, Netlify, GitHub Pages, or any serverless static bucket) with zero backend runtime required.

---

## 🚀 Key Features Implemented

### 1. Level Hubs (HSK 1, HSK 2, HSK 3)
- **Official Exam Specifications:** Real-time breakdown of sections, time limits, question counts, and passing cutoffs (120/200 for HSK 1–2, 180/300 for HSK 3).
- **Interactive Vocabulary Decks:** Filter by search term (Hanzi, Pinyin, English), part of speech, and toggle between:
  - **Table View:** Clean tabular layout with direct audio playback and stroke animation shortcuts.
  - **Cards Grid:** Visual card layout with example sentences and Pinyin.
  - **Flashcard Mode:** Interactive 3D flip card trainer with "Mastered" and "Still Learning" tracking plus shuffle.

### 2. Interactive Character Stroke Order Animator & Quiz
- Powered by **Hanzi Writer (MIT License)**.
- Features:
  - Guided stroke animations with configurable speeds (0.5x, 1x, 2x).
  - Tianzige and Mizige grid backgrounds.
  - **Quiz Draw Mode:** Real-time interactive canvas where learners draw strokes directly with mouse/touch, complete with stroke feedback and mistake tallies.
  - Pinyin audio pronunciation integration.

### 3. Official HSK Score Calculator & CEFR Converter
- Real-time sliders and inputs for Listening, Reading, and Writing sections.
- Verified passing formulas:
  - **HSK 1 & 2:** Passing score $\ge 120 / 200$.
  - **HSK 3:** Passing score $\ge 180 / 300$.
- Diagnostic engine offering personalized recommendations for sections scoring below 60%.
- CEFR level alignment (A1, A2, B1).

### 4. Pronunciation & Tone Recognition Trainer
- Complete interactive soundboards for **23 Initials** and **24 Finals**.
- Detailed guide to the **4 Tones + Neutral Tone** with visual pitch contours ($55, 35, 214, 51$).
- **Tone Ear-Training Challenge:** Gamified listening test where learners listen to spoken syllables and identify the pitch tone, featuring streak counters and sound replay.

### 5. Timed Mock Exam Engine
- Realistic timed practice simulations for HSK 1, 2, and 3.
- Active countdown timer, question navigator palette, listening audio prompts with Web Speech API TTS, instant auto-scoring, and answer explanations.

### 6. Lessons & Grammar Reference
- Conversational dialogues with speaker tags, native audio buttons, key vocabulary pills, and practice quiz questions.
- Comprehensive grammar compendium covering core structures (`吗`, `的`, `比`, `过`, `把`, `越来越`, `虽然...但是...`, `因为...所以...`).

### 7. AdSense & Trust Readiness
- Dedicated **About Us** page with mission statement and open-source attribution.
- **HSK History** timeline (1984 inception, HSK 1.0, HSK 2.0, and HSK 3.0 evolution).
- **Privacy Policy** (Zero login, data minimization).
- **Terms of Service**, **Disclaimer**, and **Data Sources & Licenses** citation table.

---

## 🛠️ Tech Stack

- **Framework:** Vue 3 (Composition API, `<script setup>`)
- **Routing:** Vue Router 4 (Hash history mode for 100% resilient static hosting)
- **Styling:** Tailwind CSS 3 with custom Chinese calligraphy palette
- **Stroke Animations:** Hanzi Writer 3 (MIT)
- **Pinyin Engine:** pinyin-pro 3 (MIT)
- **Icons:** Lucide Icons
- **Audio:** Web Speech API (`SpeechSynthesis` with `zh-CN` voice fallback)
- **Build Tool:** Vite 8 + TypeScript 5

---

## 📦 Build & Deployment

### Production Build
The project compiles directly into a clean, zero-server static `dist/` directory:

```bash
npm run build
```

The output in `dist/` includes:
- `dist/index.html` — Base HTML referencing relative assets (`./assets/...`)
- `dist/assets/vue-vendor-*.js` — Split vendor chunk for Vue core and Router
- `dist/assets/chinese-tools-*.js` — Pinyin and Hanzi animation tools
- `dist/assets/index-*.js` — Application logic and components
- `dist/assets/index-*.css` — Minified Tailwind CSS bundle

### Local Preview
To preview the production build locally:

```bash
npm run preview
```
Or open any static server (e.g. `npx serve dist`).
