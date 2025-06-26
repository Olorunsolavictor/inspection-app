<script setup lang="ts">
import { computed } from "vue";
import { useStepStore } from "~/stores/useStepStore";

const props = defineProps<{
  step: number;
}>();

const stepStore = useStepStore();

const isSelected = computed(() => stepStore.selectedStep === props.step);
</script>

<template>
  <div
    :class="[
      'rounded-full bg-white h-8  flex justify-center items-center text-sm font-medium transition-all duration-300 ease-in-out',
      isSelected
        ? ' whitespace-nowrap gap-1 text-gray-700 px-4 min-w-[70px]'
        : 'text-gray-700 px-2 ',
    ]"
  >
    <span v-if="isSelected" class="text-gray-700">STEP </span>
    <span :class="isSelected ? 'text-purple-primary' : 'text-gray-light'">
      {{ step }}
    </span>
  </div>
</template>
