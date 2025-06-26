<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const videoRef = ref<HTMLVideoElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const capturedImage = ref<string | null>(null);
const errorMessage = ref<string | null>(null);
const hasBackCamera = ref(false);
const stream = ref<MediaStream | null>(null);

async function checkBackCameraSupport() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoInputs = devices.filter((device) => device.kind === "videoinput");
  hasBackCamera.value = videoInputs.some(
    (device) =>
      device.label.toLowerCase().includes("back") ||
      device.label.toLowerCase().includes("rear")
  );
}

async function startCamera() {
  try {
    await checkBackCameraSupport();

    if (!hasBackCamera.value) {
      errorMessage.value = "No rear camera found on this device.";
      return;
    }

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

function capturePhoto() {
  const canvas = canvasRef.value;
  const video = videoRef.value;
  if (canvas && video) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image as base64 (png format, can be changed to jpeg)
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    capturedImage.value = dataUrl;
  }
}

onMounted(() => {
  startCamera();
});

onBeforeUnmount(() => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
  }
});
</script>

<template>
  <div class="w-full flex flex-col items-center gap-4">
    <div class="w-full max-w-sm aspect-video bg-black rounded overflow-hidden">
      <video
        ref="videoRef"
        class="w-full h-full object-cover"
        autoplay
        playsinline
      ></video>
    </div>

    <button
      @click="capturePhoto"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Capture Photo
    </button>

    <canvas ref="canvasRef" class="hidden"></canvas>

    <div v-if="capturedImage" class="w-full max-w-sm mt-4">
      <p class="text-sm mb-2 text-center text-gray-600">Captured Image:</p>
      <img :src="capturedImage" alt="Captured" class="rounded shadow" />
    </div>

    <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
      {{ errorMessage }}
    </p>
  </div>
</template>
