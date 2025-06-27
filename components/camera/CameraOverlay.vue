<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useCameraStore } from "~/stores/useCameraStore";
import { useRouter } from "vue-router";
import Button from "../util/Button.vue";

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

// 🧭 Orientation logic
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

const orientationAngle = ref(0); // 0, 90, 180, 270
const orientationLabel = ref<OrientationLabel>("portrait-primary");

function updateOrientation() {
  const orientation = window.screen.orientation || ({} as any);
  const angle = orientation.angle ?? (window.orientation as number) ?? 0;

  orientationAngle.value = angle;

  // Assign label based on angle
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

const containerStyle = computed(() => {
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
        height: "45dvh",
        width: "100vw",
      };
  }
});
const sectionRotationClass = computed(() => {
  switch (orientationLabel.value) {
    case "portrait-primary":
      return "rotate-270"; // no rotation needed
    case "portrait-secondary":
      return "-rotate-180"; // 180deg rotation
    case "landscape-primary":
      return "-rotate-360"; // 90deg rotation clockwise
    case "landscape-secondary":
      return "-rotate-90"; // -90deg rotation (270deg clockwise)
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
      'absolute w-screen z-20 text-white flex flex-col items-center justify-center shadow-md transition-all duration-300 px-6.5 backdrop-blur-md bg-gradient-to-b from-primaryGradientStart to-primaryGradientEnd',
      cameraStore.overlayMode === 'capture'
        ? ' h-auto py-3 bg-black/65'
        : 'top-0 bottom-0 h-[45dvh] py-6.5 ',
    ]"
    :style="containerStyle"
  >
    <!-- Menu -->
    <section
      v-if="cameraStore.overlayMode === 'menu'"
      class="flex flex-col items-center mt-4 gap-5 h-fit w-full justify-center"
      :class="sectionRotationClass"
    >
      <div class="gap-1 text-center mb-6">
        <h1 class="text-[22px] font-semibold">
          Vehicle
          <span class="text-green-success">{{ cameraStore.currentStep }}</span>
          View
        </h1>
        <h3 class="text-sm font-medium">
          Take Vehicle
          <span class="font-semibold">{{ cameraStore.currentStep }}</span>
          View
        </h3>
      </div>
      <div class="relative w-full h-[110px] overflow-hidden">
        <img
          :src="imageSrc"
          :alt="cameraStore.currentStep"
          class="absolute left-1/2 top-1/2 w-auto h-auto max-w-none max-h-none transform -translate-x-1/2 -translate-y-1/2 rotate-[90deg]"
        />
      </div>
      <div class="w-[80%] flex gap-2 items-center justify-center">
        <Button
          variant="outline"
          size="sm"
          @click="
            cameraStore.currentStepIndex > 0
              ? cameraStore.goToPreviousStep()
              : handleGoHome()
          "
        >
          Go Back
        </Button>
        <Button variant="filled" size="sm" @click="handleStart">Start</Button>
      </div>
    </section>

    <!-- Completed -->
    <section
      v-if="cameraStore.overlayMode === 'completed'"
      class="flex flex-col items-center rotate-[270deg] mt-4 gap-6 h-fit w-full justify-center"
    >
      <div class="gap-1 text-center mb-4">
        <h1 class="text-[22px] font-bold text-green-success">
          All Steps Completed
        </h1>
        <h3 class="text-sm mt-2 font-medium text-white">
          You’ve successfully captured<br />
          all vehicle views.
        </h3>
      </div>
      <div class="flex w-[80%] mt-6 gap-2 items-center justify-center">
        <Button variant="outline" size="sm" @click="handleGoHome"
          >Go Home</Button
        >
        <Button variant="filled" size="sm" @click="handleGallery"
          >Go to Gallery</Button
        >
      </div>
    </section>

    <!-- Verify -->
    <section
      v-if="cameraStore.overlayMode === 'verify'"
      class="flex flex-col items-center rotate-[270deg] mt-4 gap-6 h-fit w-full justify-between"
    >
      <div class="gap-1 text-center">
        <h1 class="text-[22px] font-semibold">
          Vehicle
          <span class="text-green-success font-semibold">{{
            cameraStore.currentStep
          }}</span>
          View
        </h1>
      </div>
      <h3 class="text-sm mt-2 font-medium">
        Confirm Vehicle <span>{{ cameraStore.currentStep }}</span> View to<br />
        move to the next Vehicle view
      </h3>
      <div class="flex w-[80%] mt-12 gap-2 items-center justify-center">
        <Button variant="outline" size="sm" @click="handleRecapture">
          Re-Capture
        </Button>
        <Button variant="filled" size="sm" @click="handleVerify">Verify</Button>
      </div>
    </section>

    <!-- Capture Button -->
    <button
      v-else-if="cameraStore.overlayMode === 'capture'"
      @click="props.onCapture"
      class="text-white h-15 w-15 p-1.5 bg-white rounded-full active:bg-green-primary transition"
    >
      <div class="w-full h-full border border-black rounded-full" />
    </button>
  </div>
</template>
