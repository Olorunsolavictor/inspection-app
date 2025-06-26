<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useCameraStore } from "~/stores/useCameraStore";
import CameraOverlay from "~/components/CameraOverlay.vue";

const videoRef = ref<HTMLVideoElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const stream = ref<MediaStream | null>(null);
const errorMessage = ref<string | null>(null);

const cameraStore = useCameraStore();

function capturePhoto() {
  const canvas = canvasRef.value;
  const video = videoRef.value;
  if (canvas && video) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    cameraStore.capturedImage = canvas.toDataURL("image/jpeg", 0.8);
    cameraStore.overlayMode = "verify";
  }
}

async function startCamera() {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });
    if (videoRef.value) {
      videoRef.value.srcObject = stream.value;
      await videoRef.value.play();
    }
  } catch (error) {
    errorMessage.value = "Camera access denied or not supported.";
    console.error(error);
  }
}
onMounted(() => {
  cameraStore.showRotateNotice = true;

  setTimeout(async () => {
    cameraStore.showRotateNotice = false;
    await startCamera();
    cameraStore.setOverlayMode("menu");
  }, 4000);
});

onBeforeUnmount(() => {
  stream.value?.getTracks().forEach((track) => track.stop());
});
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

    <p
      v-if="errorMessage"
      class="absolute bottom-4 text-red-500 text-sm text-center"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
