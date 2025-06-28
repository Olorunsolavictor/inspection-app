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
      'rounded-full bg-white px-2 py-1.5 flex justify-center items-center text-sm font-medium  transition-all duration-300 ease-in-out gap-1',
      isSelected
        ? 'text-gray-primary  min-w-[70px]'
        : 'text-gray-secondary opacity-70',
    ]"
    role="presentation"
    :aria-label="`Inspection step: ${step}`"
    :aria-selected="isSelected"
  >
    <span
      class="transition-opacity duration-300"
      :class="isSelected ? 'opacity-100 text-gray-primary' : 'opacity-0 w-0'"
    >
      STEP
    </span>

    <span
      class="transition-colors duration-300"
      :class="isSelected ? 'text-purple-primary' : 'text-gray-light'"
    >
      {{ step }}
    </span>
  </div>
</template>
