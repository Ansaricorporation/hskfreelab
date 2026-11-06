<script setup lang="ts">
import { computed } from 'vue';
import { Volume2 } from 'lucide-vue-next';
import { playAudio, isSpeaking, currentSpeakingText } from '../../utils/speech';

const props = withDefaults(defineProps<{
  text: string;
  size?: 'sm' | 'md' | 'lg';
  rate?: number;
  label?: string;
  variant?: 'icon' | 'pill' | 'button';
}>(), {
  size: 'md',
  rate: 0.85,
  variant: 'icon'
});

const isCurrentlyPlaying = computed(() => {
  return isSpeaking.value && currentSpeakingText.value === props.text;
});

function handlePlay(e: Event) {
  e.stopPropagation();
  playAudio(props.text, props.rate);
}
</script>

<template>
  <button
    type="button"
    @click="handlePlay"
    :title="`Listen to '${text}'`"
    :class="[
      'inline-flex items-center justify-center transition-all duration-150 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500/40',
      isCurrentlyPlaying 
        ? 'bg-rose-500 text-white animate-pulse shadow-sm' 
        : 'text-gray-500 hover:text-rose-600 hover:bg-rose-50 active:scale-95',
      size === 'sm' ? 'p-1 text-xs' : size === 'lg' ? 'p-2.5 text-base' : 'p-1.5 text-sm',
      variant === 'pill' ? 'px-3 py-1 bg-gray-100 hover:bg-rose-50 text-gray-700 font-medium' : ''
    ]"
  >
    <Volume2 :class="[size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4', isCurrentlyPlaying ? 'animate-bounce' : '']" />
    <span v-if="label" class="ml-1 text-xs font-medium">{{ label }}</span>
  </button>
</template>
