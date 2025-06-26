import { ref, onMounted, onBeforeUnmount } from "vue";

export function useCamera() {
  const videoRef = ref<HTMLVideoElement | null>(null);
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const capturedImage = ref<string | null>(null);
  const errorMessage = ref<string | null>(null);
  const stream = ref<MediaStream | null>(null);

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

  function capturePhoto() {
    const canvas = canvasRef.value;
    const video = videoRef.value;
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      capturedImage.value = canvas.toDataURL("image/jpeg", 0.8);
    }
  }

  onMounted(startCamera);

  onBeforeUnmount(() => {
    if (stream.value) {
      stream.value.getTracks().forEach((track) => track.stop());
    }
  });

  return {
    videoRef,
    canvasRef,
    capturedImage,
    errorMessage,
    capturePhoto,
  };
}
