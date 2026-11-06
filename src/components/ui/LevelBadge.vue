<script setup lang="ts">
import { computed } from 'vue';
import { HskLevel } from '../../types';

const props = withDefaults(defineProps<{
  level: HskLevel | number;
  size?: 'sm' | 'md' | 'lg';
}>(), {
  size: 'md'
});

const badgeClasses = computed(() => {
  const sizeClass = props.size === 'sm' 
    ? 'text-xs px-2 py-0.5' 
    : props.size === 'lg' 
      ? 'text-sm px-3.5 py-1.5 font-bold' 
      : 'text-xs px-2.5 py-1 font-semibold';

  if (props.level === 1) {
    return `${sizeClass} bg-emerald-50 text-emerald-700 border border-emerald-200`;
  } else if (props.level === 2) {
    return `${sizeClass} bg-sky-50 text-sky-700 border border-sky-200`;
  } else {
    return `${sizeClass} bg-rose-50 text-rose-700 border border-rose-200`;
  }
});
</script>

<template>
  <span :class="['inline-flex items-center rounded-full tracking-wide', badgeClasses]">
    HSK {{ level }}
  </span>
</template>
