<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useCameraStore } from "~/stores/useCameraStore";
import { useRouter } from "vue-router";
import MenuSection from "./MenuSection.vue";
import CompletedSection from "./CompletedSection.vue";
import VerifySection from "./VerifySection.vue";
import CaptureButton from "./CaptureButton.vue";

const props = defineProps<{
  onCapture: () => void;
}>();

const cameraStore = useCameraStore();
const router = useRouter();

const stepImages: Record<string, string> = {
  Front: "/images/front.png",
  "Left Side": "/images/left.png",
  "Right Side": "/images/front.png",
  Back: "/images/left.png",
  "Chassis No.": "/images/front.png",
  Dashboard: "/images/left.png",
  "Interior Back": "/images/front.png",
};

const rotationAngle = ref(0);

function updateRotation() {
  const angle =
    window.screen.orientation?.angle ?? (window.orientation as number) ?? 0;
  rotationAngle.value = -angle;
}

onMounted(() => {
  updateRotation();
  window.addEventListener("orientationchange", updateRotation);
});
onUnmounted(() => {
  window.removeEventListener("orientationchange", updateRotation);
});

const rotationStyle = computed(() => ({
  transform: `rotate(${rotationAngle.value}deg)`,
  transition: "transform 0.3s ease",
}));

function handleStart() {
  cameraStore.setOverlayMode("capture");
}
function handleGallery() {
  cameraStore.resetCameraUI();
  router.push("/gallery");
}
function handleGoHome() {
  router.push("/");
  cameraStore.resetCameraUI();
}
function handleVerify() {
  if (cameraStore.capturedImage) {
    localStorage.setItem("verifiedImage", cameraStore.capturedImage);
    cameraStore.verifyImage();
  }
}
function handleRecapture() {
  cameraStore.setCapturedImage("");
  cameraStore.setOverlayMode("capture");
}

const imageSrc = computed(() => {
  return stepImages[cameraStore.currentStep] || "/images/default.png";
});

type OrientationLabel =
  | "portrait-primary"
  | "portrait-secondary"
  | "landscape-primary"
  | "landscape-secondary";

const orientationLabel = ref<OrientationLabel>("portrait-primary");

function updateOrientation() {
  const orientation = window.screen.orientation || ({} as any);
  const angle = orientation.angle ?? (window.orientation as number) ?? 0;

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

const captureOverlayStyle = computed(() => {
  const isCapture = cameraStore.overlayMode === "capture";

  switch (orientationLabel.value) {
    case "landscape-primary":
      return {
        top: "0",
        bottom: "0",
        [isCapture ? "right" : "left"]: "0",
        height: "100vh",
        width: "100px",
      };
    case "landscape-secondary":
      return {
        top: "0",
        bottom: "0",
        [isCapture ? "left" : "right"]: "0",
        height: "100vh",
        width: "100px",
      };
    case "portrait-primary":
      return {
        bottom: "0",
        [isCapture ? "left" : "right"]: "0",
        width: "100vw",
      };
    case "portrait-secondary":
    default:
      return {
        [isCapture ? "top" : "bottom"]: "0",
        left: "0",
        right: "0",
        width: "100vw",
        height: "auto",
      };
  }
});

const containerStyle = computed(() => {
  const baseStyles = (() => {
    switch (orientationLabel.value) {
      case "landscape-primary":
        return {
          top: "0",
          right: "0",
          left: "0",
          width: "90dvh",
          height: "100vh",
        };
      case "landscape-secondary":
        return {
          top: "0",
          bottom: "0",
          right: "0",
          width: "90dvh",
          height: "100vh",
        };
      case "portrait-secondary":
      case "portrait-primary":
      default:
        return {
          left: "0",
          right: "0",
          top: "0",
          height: "50dvh",
          width: "100vw",
        };
    }
  })();

  if (cameraStore.overlayMode === "capture") {
    return {
      ...baseStyles,
      width: "100px",
    };
  }

  return baseStyles;
});

const sectionRotationClass = computed(() => {
  switch (orientationLabel.value) {
    case "portrait-primary":
      return "rotate-270";
    case "portrait-secondary":
      return "-rotate-180";
    case "landscape-primary":
      return "-rotate-360";
    case "landscape-secondary":
      return "rotate-360";
    default:
      return "";
  }
});

onMounted(() => {
  updateOrientation();
  window.addEventListener("orientationchange", updateOrientation);
});

onUnmounted(() => {
  window.removeEventListener("orientationchange", updateOrientation);
});
</script>

<template>
  <div
    v-if="
      ['menu', 'capture', 'verify', 'completed'].includes(
        cameraStore.overlayMode ?? ''
      )
    "
    :class="[
      'absolute z-20 text-white flex flex-col items-center justify-center shadow-md transition-all duration-300 px-6.5 backdrop-blur-md bg-gradient-to-b from-primaryGradientStart to-primaryGradientEnd',
      cameraStore.overlayMode === 'capture'
        ? 'py-3 bg-black/65 h-fit'
        : 'top-0 bottom-0 h-[55dvh] py-6.5',
    ]"
    :style="
      cameraStore.overlayMode === 'capture'
        ? captureOverlayStyle
        : containerStyle
    "
  >
    <MenuSection
      v-if="cameraStore.overlayMode === 'menu'"
      :sectionRotationClass="sectionRotationClass"
      :imageSrc="imageSrc"
      :onStart="handleStart"
      :onGoBack="handleGoHome"
    />
    <CompletedSection
      v-if="cameraStore.overlayMode === 'completed'"
      :sectionRotationClass="sectionRotationClass"
      :onGoHome="handleGoHome"
      :onGoGallery="handleGallery"
    />
    <VerifySection
      v-if="cameraStore.overlayMode === 'verify'"
      :sectionRotationClass="sectionRotationClass"
      :onRecapture="handleRecapture"
      :onVerify="handleVerify"
    />
    <CaptureButton
      v-else-if="cameraStore.overlayMode === 'capture'"
      :onCapture="props.onCapture"
    />
  </div>
</template>
