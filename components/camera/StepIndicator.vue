<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, type CSSProperties } from "vue";
import { useCameraStore } from "~/stores/useCameraStore";
import checkWhite from "~/assets/svgs/check-white.svg";
import checkGray from "~/assets/svgs/check-gray.svg";
import FocusTimer from "~/components/camera/CountDownRing.vue";
import { useFocusHighlight } from "~/composables/useFocusHighlight";

const cameraStore = useCameraStore();
const { focusPoint, focusTimer, stopFocusTimer } = useFocusHighlight();

const orientationLabel = ref<
  | "portrait-primary"
  | "portrait-secondary"
  | "landscape-primary"
  | "landscape-secondary"
>("portrait-primary");

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
  stopFocusTimer();
});

const indicatorStyle = computed<CSSProperties>(() => {
  const isCaptureMode = cameraStore.overlayMode === "capture";

  if (isCaptureMode) {
    switch (orientationLabel.value) {
      case "landscape-primary":
        return {
          position: "absolute",
          bottom: "2%",
          left: "2%",
          flexDirection: "column",
        };
      case "landscape-secondary":
        return {
          position: "absolute",
          bottom: "10%",
          right: "20px",
          flexDirection: "column",
        };
      case "portrait-primary":
        return {
          position: "absolute",
          top: "2%",
          right: "20px",
          flexDirection: "row",
        };
      default:
        return {
          position: "absolute",
          right: "50%",
          transform: "translateX(-50%)",
          flexDirection: "row",
          bottom: "24px",
        };
    }
  }

  switch (orientationLabel.value) {
    case "landscape-primary":
      return {
        position: "absolute",
        right: "2%",
        bottom: "7%",
        flexDirection: "column",
      };
    case "landscape-secondary":
      return {
        position: "absolute",
        left: "2%",
        bottom: "7%",
        flexDirection: "column",
      };
    default:
      return {
        position: "absolute",
        bottom: "10px",
        right: "20px",
        flexDirection: "row",
      };
  }
});

const checkmarkTransform = computed(() => {
  switch (orientationLabel.value) {
    case "landscape-primary":
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
    class="absolute z-50 flex gap-2 items-center"
    :class="indicatorStyle.flexDirection === 'column' ? 'flex-col' : 'flex-row'"
    :style="indicatorStyle"
  >
    <FocusTimer
      v-if="focusPoint && cameraStore.overlayMode === 'capture'"
      :focusTimer="focusTimer"
    />

    <div
      class="bg-black/50 p-2 rounded-[18px] flex gap-2 items-center"
      :class="
        indicatorStyle.flexDirection === 'column' ? 'flex-col' : 'flex-row'
      "
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
  </div>
</template>
