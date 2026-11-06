import { ref } from 'vue';

export const isSpeaking = ref(false);
export const currentSpeakingText = ref<string | null>(null);

let selectedVoice: SpeechSynthesisVoice | null = null;

function initVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const updateVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    selectedVoice = 
      voices.find(v => v.lang.toLowerCase() === 'zh-cn') ||
      voices.find(v => v.lang.toLowerCase().startsWith('zh')) ||
      voices.find(v => v.lang.includes('cmn')) ||
      null;
  };

  updateVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }
}

initVoices();

export function playAudio(text: string, rate: number = 0.85): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Web Speech API is not supported in this browser.');
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = rate; // slightly slower for clear comprehension
    utterance.pitch = 1.0;

    if (!selectedVoice) {
      initVoices();
    }
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    isSpeaking.value = true;
    currentSpeakingText.value = text;

    utterance.onend = () => {
      isSpeaking.value = false;
      currentSpeakingText.value = null;
      resolve();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      isSpeaking.value = false;
      currentSpeakingText.value = null;
      resolve();
    };

    window.speechSynthesis.speak(utterance);
  });
}

export function playSlowAudio(text: string): Promise<void> {
  return playAudio(text, 0.6); // Beginner turtle speed
}

export function stopAudio() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    isSpeaking.value = false;
    currentSpeakingText.value = null;
  }
}
