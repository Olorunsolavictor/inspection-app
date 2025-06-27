<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  watch,
  ref,
  computed,
  type CSSProperties,
} from "vue";
import { useRouter } from "vue-router";
import { useCamera } from "~/composables/useCamera";
import { useCameraStore } from "~/stores/useCameraStore";
import CameraOverlay from "~/components/camera/CameraOverlay.vue";
import StepIndicator from "~/components/camera/StepIndicator.vue";
import Button from "~/components/util/Button.vue";

const router = useRouter();
const cameraStore = useCameraStore();
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

onMounted(async () => {
  window.addEventListener("orientationchange", updateOrientation);
  updateOrientation();

  const success = await startCamera();
  if (success) {
    cameraStore.showRotateNotice = true;
    setTimeout(() => {
      cameraStore.showRotateNotice = false;
      cameraStore.setOverlayMode("menu");
    }, 2000);
  } else {
    cameraStore.showRotateNotice = false;
    console.error("Camera not available or permission denied");
  }
});

onUnmounted(() => {
  window.removeEventListener("orientationchange", updateOrientation);
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

watch(capturedImage, (val) => {
  if (val) {
    cameraStore.capturedImage = val;
    cameraStore.setOverlayMode("verify");
  }
});

watch(sizeError, (val) => {
  cameraStore.sizeError = val;
});

function handleGoBack() {
  cameraStore.resetCameraUI();
  router.push("/");
}

const indicatorStyle = computed<CSSProperties>(() => {
  const isCaptureMode = cameraStore.overlayMode === "capture";

  if (isCaptureMode) {
    switch (orientationLabel.value) {
      case "landscape-primary":
        return {
          position: "absolute",
          bottom: "10%",
          left: "0px",
          width: "content-fit",
          flexDirection: "column",
        };
      case "landscape-secondary":
        return {
          position: "absolute",
          top: "10%",
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
        rotate: "360deg",
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
      };
  }
});

const capturedImageStyle = computed<CSSProperties>(() => {
  switch (orientationLabel.value) {
    case "landscape-primary":
      return {
        position: "absolute",
        bottom: "25%",
        right: "12%",
        // transform: "rotate(0deg)",
        width: "230px",
      };
    case "landscape-secondary":
      return {
        position: "absolute",
        bottom: "25%",
        left: "25%",
        // transform: "rotate(180deg)",
        width: "230px",
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
        bottom: "13%",
        right: "20%",
        transform: "rotate(270deg)",
        flexDirection: "column",
        width: "230px",
      };
  }
});
</script>

<template>
  <div class="relative w-full h-[100dvh] flex flex-col bg-black text-white">
    <div
      v-if="cameraStore.showRotateNotice"
      class="absolute inset-0 bg-black/70 z-30 flex items-center justify-center"
    >
      <p class="text-lg animate-pulse">Rotate Device</p>
    </div>

    <StepIndicator :style="indicatorStyle" />

    <div class="w-screen relative h-screen bg-black rounded">
      <CameraOverlay :on-capture="capturePhoto" />
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
      class="bg-white p-2 rounded border border-black border-dashed shadow-lg"
    >
      <img
        :src="cameraStore.capturedImage"
        alt="Captured"
        class="w-full rounded"
      />
    </div>

    <div
      v-if="errorMessage || cameraStore.sizeError"
      class="absolute bottom-30 text-sm text-center flex justify-center items-center flex-col gap-2 w-full"
    >
      <p class="text-red-500 max-w-[70%]">
        {{
          errorMessage ||
          "Photo too large. Try a closer shot or better lighting."
        }}
      </p>
      <Button variant="filled" size="sm" @click="handleGoBack">Go Home</Button>
    </div>
  </div>
</template>
