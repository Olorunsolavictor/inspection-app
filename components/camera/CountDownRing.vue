<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  focusTimer: number;
  maxTime?: number;
}>();

const max = props.maxTime ?? 5;
const circumference = 2 * Math.PI * 16;

const dashOffset = computed(() => {
  return circumference * ((max - props.focusTimer) / max);
});
</script>

<template>
  <div class="relative w-10.5 h-10.5">
    <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
      <circle
        cx="18"
        cy="18"
        r="16"
        stroke="rgba(255,0,0,0.2)"
        stroke-width="4"
        fill="none"
      />

      <circle
        cx="18"
        cy="18"
        r="16"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        stroke="red"
        stroke-width="4"
        fill="white"
        stroke-linecap="round"
        class="transition-[stroke-dashoffset] duration-1000 ease-linear"
      />
    </svg>

    <div
      class="absolute inset-0 flex items-center justify-center text-red-500 text-sm font-semibold"
    >
      {{ focusTimer }}
    </div>
  </div>
</template>
