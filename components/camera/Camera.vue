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
import { useFocusHighlight } from "~/composables/useFocusHighlight";
import { useCameraStore } from "~/stores/useCameraStore";
import CameraOverlay from "~/components/camera/CameraOverlay.vue";
import StepIndicator from "~/components/camera/StepIndicator.vue";
import Button from "~/components/util/Button.vue";

const router = useRouter();
const cameraStore = useCameraStore();

const { focusPoint, handleFocusTap, focusTimer } = useFocusHighlight();

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

const capturedImageStyle = computed<CSSProperties>(() => {
  switch (orientationLabel.value) {
    case "landscape-primary":
      return {
        position: "absolute",
        bottom: "20%",
        right: "12%",
        width: "230px",
      };
    case "landscape-secondary":
      return {
        position: "absolute",
        bottom: "20%",
        left: "12%",
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
  <div class="relative w-screen h-screen bg-black text-white overflow-hidden">
    <div
      v-if="cameraStore.showRotateNotice"
      class="absolute inset-0 bg-black/70 z-30 flex items-center justify-center"
    >
      <p class="text-lg animate-pulse">Rotate Device</p>
    </div>

    <div
      v-if="focusPoint && cameraStore.overlayMode === 'capture'"
      class="absolute z-30 border-2 border-green-success rounded-sm pointer-events-none transition-opacity duration-300"
      :style="{
        top: `${focusPoint.y}px`,
        left: `${focusPoint.x}px`,
        width: '80%',
        height: '80%',
        transform: 'translate(-50%, -50%)',
      }"
    />

    <div class="relative w-full h-full bg-black overflow-hidden">
      <video
        ref="videoRef"
        class="w-full h-full object-cover"
        autoplay
        playsinline
        @click="(e) => handleFocusTap(e, e.currentTarget)"
        @touchstart="(e) => handleFocusTap(e, e.currentTarget)"
      />
      <CameraOverlay :on-capture="capturePhoto" />

      <div class="absolute inset-0 z-10 pointer-events-none">
        <StepIndicator />
        <FocusTimer
          v-if="focusPoint && cameraStore.overlayMode === 'capture'"
          :focusTimer="focusTimer"
        />

        <div
          v-if="cameraStore.capturedImage"
          :style="capturedImageStyle"
          class="bg-white p-2 rounded border border-black border-dashed shadow-lg w-fit pointer-events-auto"
        >
          <img
            :src="cameraStore.capturedImage"
            alt="Captured"
            class="w-full rounded"
          />
        </div>
      </div>
    </div>

    <canvas ref="canvasRef" class="hidden" />

    <div
      v-if="errorMessage || cameraStore.sizeError"
      class="absolute bottom-30 text-sm text-center flex justify-center items-center flex-col gap-2 w-full z-20"
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
