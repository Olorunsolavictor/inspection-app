<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useCamera } from "~/composables/useCamera";
import { useCameraStore } from "~/stores/useCameraStore";
import CameraOverlay from "~/components/camera/CameraOverlay.vue";
import StepIndicator from "~/components/camera/StepIndicator.vue";

const router = useRouter();
const cameraStore = useCameraStore();

const {
  videoRef,
  canvasRef,
  capturedImage,
  errorMessage,
  sizeError,
  startCamera,
  capturePhoto,
} = useCamera();

onMounted(() => {
  cameraStore.showRotateNotice = true;

  setTimeout(async () => {
    cameraStore.showRotateNotice = false;
    await startCamera();
    if (!errorMessage.value) {
      cameraStore.setOverlayMode("menu");
    }
  }, 4000);
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
      <p class="text-lg animate-pulse">🔄 Rotate your camera</p>
    </div>

    <CameraOverlay :on-capture="capturePhoto" />
    <StepIndicator />

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
      class="absolute rotate-270 bottom-20 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg"
    >
      <img
        :src="cameraStore.capturedImage"
        alt="Captured"
        class="h-32 w-auto object-cover rounded"
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
