<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  Mail, 
  Send, 
  MessageSquare, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronDown, 
  Sparkles,
  Copy,
  Check
} from 'lucide-vue-next';
import { updateSeoMeta } from '../utils/seo';

onMounted(() => {
  updateSeoMeta({
    title: 'Contact HSK Free Lab - Support, Feedback & Inquiries',
    description: 'Get in touch with the HSK Free Lab editorial and technical team. Send bug reports, vocabulary corrections, syllabus feedback, or general questions.',
    canonical: 'https://mybwn.com/contact',
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact HSK Free Lab',
      url: 'https://mybwn.com/contact',
      description: 'Contact information and feedback form for HSK Free Lab educational platform.',
      mainEntity: {
        '@type': 'EducationalOrganization',
        name: 'HSK Free Lab',
        url: 'https://mybwn.com/',
        email: 'contact@mybwn.com'
      }
    }
  }, '/contact');
});

// Form state
const name = ref('');
const email = ref('');
const subject = ref('Bug Report');
const message = ref('');
const isSubmitted = ref(false);
const copiedEmail = ref(false);

const subjectOptions = [
  'Bug Report',
  'Vocabulary or Audio Correction',
  'Syllabus & Curriculum Feedback',
  'General Inquiry',
  'Legal & Copyright'
];

function handleSubmit() {
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    alert('Please fill in all required fields (Name, Email, and Message).');
    return;
  }

  const mailtoSubject = encodeURIComponent(`[HSK Free Lab] ${subject.value} from ${name.value.trim()}`);
  const mailtoBody = encodeURIComponent(
    `Name: ${name.value.trim()}\n` +
    `Email: ${email.value.trim()}\n` +
    `Topic: ${subject.value}\n\n` +
    `Message:\n${message.value.trim()}\n\n` +
    `---\nSent via HSK Free Lab (https://mybwn.com/contact)`
  );

  // Trigger default email client
  window.location.href = `mailto:contact@mybwn.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  isSubmitted.value = true;
}

function copyDirectEmail() {
  navigator.clipboard.writeText('contact@mybwn.com').then(() => {
    copiedEmail.value = true;
    setTimeout(() => {
      copiedEmail.value = false;
    }, 2500);
  });
}

// FAQs
const faqs = [
  {
    q: 'Is HSK Free Lab really 100% free forever?',
    a: 'Yes. All 1,050+ official HSK 1, 2, and 3 vocabulary words, native audio pronunciations, interactive Hanzi stroke animations, and 30 timed mock exams are completely free with zero subscription fees, zero paywalls, and no required registration.'
  },
  {
    q: 'How is my study progress saved without an account?',
    a: 'Your marked vocabulary words, flashcard review decks, mock exam diagnostic scores, and theme settings are automatically stored directly inside your browser\'s local storage (localStorage). Your data remains strictly on your personal device and is not collected or stored on remote servers.'
  },
  {
    q: 'How do I report a character, stroke order, or audio error?',
    a: 'We take syllabus accuracy very seriously. Select "Vocabulary or Audio Correction" in the contact form above, provide the character (Hanzi), and specify what needs review. Our editorial team inspects and updates the database promptly.'
  },
  {
    q: 'Can educators use HSK Free Lab in schools and universities?',
    a: 'Absolutely! Teachers and educational institutions worldwide are welcome to utilize our vocabulary lists, stroke animator, and mock tests in non-commercial classroom instruction and student assignments.'
  }
];

const openFaq = ref<number | null>(null);
function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index;
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-12 pb-20 px-4">
    
    <!-- Hero / Header -->
    <div class="bg-white/80 dark:bg-stone-900/85 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-10 text-center space-y-4 shadow-sm">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold">
        <Mail class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
        <span>Direct Communication</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
        Contact HSK Free Lab
      </h1>
      <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
        Have a question, feedback on our vocabulary syllabus, or discovered a bug? We welcome your input and respond to community messages promptly.
      </p>
    </div>

    <!-- Contact Grid: Form & Info Box -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Left Column: Direct Email & Channels -->
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 shadow-sm space-y-5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 flex items-center justify-center shrink-0">
              <Mail class="w-5 h-5" />
            </div>
            <div>
              <h2 class="text-base font-bold text-stone-900 dark:text-stone-100">Direct Email</h2>
              <p class="text-xs text-stone-500 dark:text-stone-400">Official inquiries & support</p>
            </div>
          </div>
          
          <div class="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 space-y-2">
            <div class="text-xs font-mono font-bold text-stone-800 dark:text-stone-200 break-all">
              contact@mybwn.com
            </div>
            <button 
              type="button"
              @click="copyDirectEmail"
              class="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              <Check v-if="copiedEmail" class="w-3.5 h-3.5 text-emerald-600" />
              <Copy v-else class="w-3.5 h-3.5 text-stone-500" />
              <span>{{ copiedEmail ? 'Copied to Clipboard!' : 'Copy Email Address' }}</span>
            </button>
          </div>

          <div class="space-y-3 pt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800">
            <div class="flex items-start gap-2">
              <Sparkles class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Typical response time is within <strong>24–48 hours</strong>.</span>
            </div>
            <div class="flex items-start gap-2">
              <CheckCircle2 class="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>Syllabus corrections are verified against CLEC official benchmarks.</span>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-stone-900 to-stone-800 text-stone-100 rounded-3xl p-6 shadow-md space-y-3 text-xs leading-relaxed">
          <div class="font-bold text-sm text-white flex items-center gap-2">
            <span>Democratizing Chinese</span>
          </div>
          <p class="text-stone-300">
            HSK Free Lab is an independent open educational project. We prioritize learner feedback above all else.
          </p>
        </div>
      </div>

      <!-- Right Column: Interactive Form -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm">
          
          <div v-if="isSubmitted" class="py-8 text-center space-y-4">
            <div class="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 class="w-8 h-8" />
            </div>
            <h2 class="text-xl font-black text-stone-900 dark:text-stone-100">Email Draft Created!</h2>
            <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
              Your message was prepared in your default email application. If your email client did not open automatically, please send your note directly to:
            </p>
            <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-xl font-mono text-xs font-bold text-stone-800 dark:text-stone-200 inline-block border border-stone-200 dark:border-stone-700">
              contact@mybwn.com
            </div>
            <div class="pt-2">
              <button 
                type="button"
                @click="isSubmitted = false; message = ''" 
                class="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Send Another Message
              </button>
            </div>
          </div>

          <form v-else @submit.prevent="handleSubmit" class="space-y-5">
            <h2 class="text-xl font-black text-stone-900 dark:text-stone-100">Send Us a Message</h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label for="contact-name" class="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Your Name <span class="text-rose-600">*</span>
                </label>
                <input 
                  id="contact-name" 
                  v-model="name"
                  type="text" 
                  required
                  placeholder="e.g. Alex Chen"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all"
                />
              </div>

              <div class="space-y-1.5">
                <label for="contact-email" class="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Your Email Address <span class="text-rose-600">*</span>
                </label>
                <input 
                  id="contact-email" 
                  v-model="email"
                  type="email" 
                  required
                  placeholder="name@example.com"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <label for="contact-subject" class="block text-xs font-bold text-stone-700 dark:text-stone-300">
                Topic / Subject <span class="text-rose-600">*</span>
              </label>
              <select 
                id="contact-subject" 
                v-model="subject"
                class="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all"
              >
                <option v-for="opt in subjectOptions" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label for="contact-message" class="block text-xs font-bold text-stone-700 dark:text-stone-300">
                Your Message <span class="text-rose-600">*</span>
              </label>
              <textarea 
                id="contact-message" 
                v-model="message"
                rows="5" 
                required
                placeholder="Describe your inquiry, bug details, or syllabus suggestion here..."
                class="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all"
              ></textarea>
            </div>

            <button 
              type="submit"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 dark:bg-rose-600 text-white font-bold text-xs hover:bg-stone-800 dark:hover:bg-rose-700 transition-colors shadow-sm"
            >
              <Send class="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>

        </div>
      </div>

    </div>

    <!-- Frequently Asked Questions Accordion -->
    <div class="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-10 shadow-sm space-y-6">
      <div class="flex items-center gap-2">
        <HelpCircle class="w-5 h-5 text-rose-600 dark:text-rose-400" />
        <h2 class="text-2xl font-black text-stone-900 dark:text-stone-100">Frequently Asked Questions</h2>
      </div>
      
      <div class="divide-y divide-stone-100 dark:divide-stone-800">
        <div v-for="(faq, idx) in faqs" :key="idx" class="py-4">
          <button 
            type="button"
            @click="toggleFaq(idx)"
            class="w-full flex items-center justify-between text-left text-sm font-bold text-stone-900 dark:text-stone-100 hover:text-rose-600 dark:hover:text-rose-400 transition-colors gap-4"
          >
            <span>{{ faq.q }}</span>
            <ChevronDown 
              class="w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200" 
              :class="{ 'rotate-180': openFaq === idx }"
            />
          </button>
          <div 
            v-if="openFaq === idx" 
            class="mt-2.5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed pr-6"
          >
            {{ faq.a }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
