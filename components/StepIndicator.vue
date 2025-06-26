<script setup lang="ts">
import { useCameraStore } from "~/stores/useCameraStore";

const cameraStore = useCameraStore();
</script>

<template>
  <div
    class="absolute bottom-6 bg-pink-300 left-1/2 p-2 rounded-[18px] z-50 transform -translate-x-1/2 flex gap-2"
  >
    <div
      v-for="(step, index) in cameraStore.steps"
      :key="step"
      class="w-[25px] h-[25px] rounded-full flex items-center justify-center text-xs font-bold border-2"
      :class="{
        'bg-green-600 text-white border-green-600':
          step in cameraStore.completedSteps,
        'bg-gray-300 text-black border-gray-400': !(
          step in cameraStore.completedSteps
        ),
        'ring-2 ring-white': index === cameraStore.currentStepIndex,
      }"
    >
      {{ index + 1 }}
    </div>
  </div>
</template>
