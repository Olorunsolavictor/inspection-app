<script setup lang="ts">
import { useCameraStore } from "~/stores/useCameraStore";
import checkWhite from "~/assets/svgs/check-gray.svg";
import checkGray from "~/assets/svgs/check-white.svg";

const cameraStore = useCameraStore();
</script>

<template>
  <div
    class="absolute bottom-6 bg-[#2B2B2B80] left-1/2 p-2 rounded-[18px] z-50 transform -translate-x-1/2 flex gap-2"
  >
    <div
      v-for="(step, index) in cameraStore.steps"
      :key="step"
      class="w-[26px] h-[26px] rounded-full flex items-center justify-center"
      :class="{
        'bg-green-success border-green-success':
          step in cameraStore.completedSteps,
        'bg-white/35 border-white/35': !(step in cameraStore.completedSteps),
        'ring-2 ring-green-success': index === cameraStore.currentStepIndex,
      }"
    >
      <img
        :src="step in cameraStore.completedSteps ? checkWhite : checkGray"
        alt="check icon"
        class="w-3.5 h-3.5"
      />
    </div>
  </div>
</template>
