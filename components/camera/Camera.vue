<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useCamera } from "~/composables/useCamera";
import { useCameraStore } from "~/stores/useCameraStore";
import CameraOverlay from "~/components/camera/CameraOverlay.vue";
import StepIndicator from "~/components/camera/StepIndicator.vue";
import Button from "~/components/util/Button.vue";

const router = useRouter();
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

import type { CSSProperties } from "vue";

const indicatorStyle = computed<CSSProperties>(() => {
  switch (orientationLabel.value) {
    case "landscape-primary":
      return {
        position: "absolute",
        lefte: "20px",
        bottom: "10px",
        flexDirection: "column",
      };
    case "landscape-secondary":
      return {
        position: "absolute",
        right: "20px",
        bottom: "10px",
        flexDirection: "column",
      };
    default:
      return {
        position: "absolute",
        bottom: "10px",
        right: "20px",
      };
  }
});

const capturedImageStyle = computed<CSSProperties>(() => {
  switch (orientationLabel.value) {
    case "landscape-primary":
    case "landscape-secondary":
      return {
        position: "absolute",
        bottom: "30%",
        right: "12%",
        transform: "rotate(0deg)",
      };
    case "portrait-secondary":
      return {
        position: "absolute",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%) rotate(-180deg)",
      };
    default:
      return {
        position: "absolute",
        bottom: "20%",
        right: "20%",
        transform: " rotate(270deg)",
        flexDirection: "column",
      };
  }
});

const {
  videoRef,
  canvasRef,
  capturedImage,
  errorMessage,
  sizeError,
  startCamera,
  capturePhoto,
} = useCamera();

onMounted(async () => {
  await startCamera();
  cameraStore.showRotateNotice = true;

  setTimeout(() => {
    cameraStore.showRotateNotice = false;
    cameraStore.setOverlayMode("menu");
  }, 2000);
});

watch(capturedImage, (val) => {
  if (val) {
    cameraStore.capturedImage = val;
    cameraStore.overlayMode = "verify";
  }
});

watch(sizeError, (val) => {
  cameraStore.sizeError = val;
});

function handleGoBack() {
  cameraStore.resetCameraUI();
  router.push("/");
}
</script>

<template>
  <div class="relative w-full h-[100dvh] flex flex-col bg-black text-white">
    <div
      v-if="cameraStore.showRotateNotice"
      class="absolute inset-0 h-full bg-black/70 z-30 flex items-center justify-center"
    >
      <p class="text-lg animate-pulse">Rotate Device</p>
    </div>

    <CameraOverlay :on-capture="capturePhoto" />
    <StepIndicator :style="indicatorStyle" />

    <div class="w-full h-full bg-black rounded overflow-hidden">
      <video
        ref="videoRef"
        class="w-full h-full object-cover"
        autoplay
        playsinline
      />
    </div>

    <canvas ref="canvasRef" class="hidden" />

    <div
      v-if="cameraStore.capturedImage"
      :style="capturedImageStyle"
      class="bg-white p-2 rounded border border-black divide-dashed border-dashed shadow-lg"
    >
      <img
        :src="cameraStore.capturedImage"
        alt="Captured"
        class="h-32 w-56 object-cover rounded"
      />
    </div>

    <div
      v-if="errorMessage || cameraStore.sizeError"
      class="absolute bottom-30 text-sm text-center w-full"
    >
      <p class="text-red-500 mb-2">
        {{
          errorMessage ||
          "Photo too large. Try a closer shot or better lighting."
        }}
      </p>
      <Button variant="filled" size="sm" @click="handleGoBack">
        Go Home
      </Button>
    </div>
  </div>
</template>
