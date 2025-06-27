// stores/useCameraStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

type OverlayMode = "menu" | "capture" | "verify" | "completed" | null;

type Step =
  | "Front"
  | "Back"
  | "Left Side"
  | "Right Side"
  | "Chassis No."
  | "Dashboard"
  | "Interior Back";

export const useCameraStore = defineStore("camera", () => {
  const overlayMode = ref<OverlayMode>(null);
  const showRotateNotice = ref(true);
  const capturedImage = ref<string | null>(null);

  const steps = ref<Step[]>([
    "Front",
    "Left Side",
    "Right Side",
    "Back",
    "Chassis No.",
    "Dashboard",
    "Interior Back",
  ]);

  const currentStepIndex = ref(0);

  const completedSteps = ref<Record<Step, string>>({} as Record<Step, string>);

  const currentStep = computed(() => steps.value[currentStepIndex.value]);

  const isInspectionComplete = computed(() => {
    return Object.keys(completedSteps.value).length === steps.value.length;
  });

  function setOverlayMode(mode: OverlayMode) {
    overlayMode.value = mode;
  }

  function setCapturedImage(image: string) {
    capturedImage.value = image;
  }

  function verifyImage() {
    if (capturedImage.value) {
      completedSteps.value[currentStep.value] = capturedImage.value;
      capturedImage.value = null;

      if (currentStepIndex.value < steps.value.length - 1) {
        currentStepIndex.value += 1;
        overlayMode.value = "menu";
      } else {
        overlayMode.value = "completed";
      }

      localStorage.setItem(
        "inspectionData",
        JSON.stringify(completedSteps.value)
      );
    }
  }

  function resetCameraUI() {
    overlayMode.value = "menu";
    showRotateNotice.value = true;
    capturedImage.value = null;
    currentStepIndex.value = 0;
    completedSteps.value = {} as Record<Step, string>;
  }

  return {
    overlayMode,
    showRotateNotice,
    capturedImage,
    steps,
    currentStep,
    currentStepIndex,
    completedSteps,
    isInspectionComplete,
    setOverlayMode,
    setCapturedImage,
    verifyImage,
    resetCameraUI,
  };
});
