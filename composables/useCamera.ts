// composables/useCamera.ts
import { ref, onMounted, onBeforeUnmount } from "vue";

export function useCamera() {
  const videoRef = ref<HTMLVideoElement | null>(null);
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const capturedImage = ref<string | null>(null);
  const errorMessage = ref<string | null>(null);
  const stream = ref<MediaStream | null>(null);
  const sizeError = ref(false);

  async function startCamera() {
    try {
      stream.value = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } }, // strict back cam
        audio: false,
      });

      if (videoRef.value) {
        videoRef.value.srcObject = stream.value;
        await videoRef.value.play();
      }
    } catch (error) {
      errorMessage.value =
        "Back camera not available or permission denied. Please use a supported device.";
      console.error(error);
    }
  }

  function capturePhoto() {
    const canvas = canvasRef.value;
    const video = videoRef.value;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    let imageDataUrl = canvas.toDataURL("image/jpeg", 0.8);
    let imageSize = Math.ceil((imageDataUrl.length * 3) / 4); // bytes

    if (imageSize > 2 * 1024 * 1024) {
      imageDataUrl = canvas.toDataURL("image/png");
      imageSize = Math.ceil((imageDataUrl.length * 3) / 4);
    }

    if (imageSize > 2 * 1024 * 1024) {
      sizeError.value = true;
      return;
    }

    capturedImage.value = imageDataUrl;
    sizeError.value = false;
  }

  function stopCamera() {
    stream.value?.getTracks().forEach((track) => track.stop());
  }

  onBeforeUnmount(stopCamera);

  return {
    videoRef,
    canvasRef,
    capturedImage,
    errorMessage,
    sizeError,
    startCamera,
    capturePhoto,
    stopCamera,
  };
}
