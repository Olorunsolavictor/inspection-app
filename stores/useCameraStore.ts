import { defineStore } from "pinia";
import { ref } from "vue";
type OverlayMode = "menu" | "capture" | "verify" | null;

export const useCameraStore = defineStore("camera", () => {
  const overlayMode = ref<OverlayMode>(null);
  const showRotateNotice = ref(true);
  const capturedImage = ref<string | null>(null);

  function setOverlayMode(mode: OverlayMode) {
    overlayMode.value = mode;
  }

  function setCapturedImage(image: string) {
    capturedImage.value = image;
  }

  function resetCameraUI() {
    overlayMode.value = "menu";
    showRotateNotice.value = true;
    capturedImage.value = null;
  }

  return {
    overlayMode,
    showRotateNotice,
    capturedImage,
    setOverlayMode,
    setCapturedImage,
    resetCameraUI,
  };
});
