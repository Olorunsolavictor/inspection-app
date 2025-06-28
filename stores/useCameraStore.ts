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
  const isVerifying = ref(false);
  const sizeError = ref(false);

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
    if (!capturedImage.value) return;

    isVerifying.value = true;

    setTimeout(() => {
      completedSteps.value[currentStep.value] = capturedImage.value!;
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

      isVerifying.value = false;
    }, 3000);
  }

  function resetCameraUI() {
    overlayMode.value = null;
    showRotateNotice.value = true;
    capturedImage.value = null;
    currentStepIndex.value = 0;
    completedSteps.value = {} as Record<Step, string>;
  }

  function goToPreviousStep() {
    if (currentStepIndex.value > 0) {
      currentStepIndex.value -= 1;
    }
  }

  return {
    overlayMode,
    showRotateNotice,
    capturedImage,
    isVerifying,
    steps,
    currentStepIndex,
    completedSteps,
    sizeError,
    currentStep,
    isInspectionComplete,
    setOverlayMode,
    setCapturedImage,
    verifyImage,
    resetCameraUI,
    goToPreviousStep,
  };
});
