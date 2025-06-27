<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useCameraStore } from "~/stores/useCameraStore";
import checkWhite from "~/assets/svgs/check-gray.svg";
import checkGray from "~/assets/svgs/check-white.svg";

const cameraStore = useCameraStore();

type OrientationLabel =
  | "portrait-primary"
  | "portrait-secondary"
  | "landscape-primary"
  | "landscape-secondary";

const orientationLabel = ref<OrientationLabel>("portrait-primary");

function updateOrientation() {
  const angle =
    window.screen.orientation?.angle ?? (window.orientation as number) ?? 0;

  switch (angle) {
    case 0:
      orientationLabel.value = "portrait-primary";
      break;
    case 180:
      orientationLabel.value = "portrait-secondary";
      break;
    case 90:
      orientationLabel.value = "landscape-primary";
      break;
    case -90:
    case 270:
      orientationLabel.value = "landscape-secondary";
      break;
    default:
      orientationLabel.value = "portrait-primary";
  }
}

onMounted(() => {
  updateOrientation();
  window.addEventListener("orientationchange", updateOrientation);
});

onUnmounted(() => {
  window.removeEventListener("orientationchange", updateOrientation);
});

const checkmarkTransform = computed(() => {
  switch (orientationLabel.value) {
    case "landscape-primary":
      return "rotate(90deg)";
    case "landscape-secondary":
      return "rotate(90deg)";
    case "portrait-secondary":
      return "rotate(180deg)";
    default:
      return "rotate(0deg)";
  }
});
</script>

<template>
  <div
    class="absolute bg-[#2B2B2B80] p-2 rounded-[18px] z-50 transform flex gap-2"
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
        :style="{ transform: checkmarkTransform }"
      />
    </div>
  </div>
</template>
