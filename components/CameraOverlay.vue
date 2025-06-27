<script setup lang="ts">
import { useCameraStore } from "~/stores/useCameraStore";
import { useRouter } from "vue-router";

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

function handleStart() {
  cameraStore.setOverlayMode("capture");
}

function handleGoBack() {
  router.push("/");
}
function handleGallery() {
  router.push("/gallery");
}

function handleHome() {
  router.push("/");
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
  >
    <section
      v-if="cameraStore.overlayMode === 'menu'"
      class="flex flex-col items-center rotate-[270deg] mt-4 gap-5 h-fit w-full justify-center"
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
        <Button variant="outline" size="sm" @click="handleGoBack">
          Go back
        </Button>
        <Button variant="filled" size="sm" @click="handleStart">Start</Button>
      </div>
    </section>
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
        <Button variant="outline" size="sm" @click="handleHome">Go Home</Button>
        <Button variant="filled" size="sm" @click="handleGallery"
          >Go to Gallery</Button
        >
      </div>
    </section>

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
        Confirm Vehicle <Span>{{ cameraStore.currentStep }}</Span> View to<br />
        move to the next Vehicle view
      </h3>
      <div class="flex w-[80%] mt-12 gap-2 items-center justify-center">
        <Button variant="outline" size="sm" @click="handleRecapture">
          Re-Capture
        </Button>
        <Button variant="filled" size="sm" @click="handleVerify">Verify</Button>
      </div>
    </section>

    <button
      v-else-if="cameraStore.overlayMode === 'capture'"
      @click="props.onCapture"
      class="text-white h-15 w-15 p-1.5 bg-white rounded-full active:bg-green-primary transition"
    >
      <div class="w-full h-full border border-black rounded-full" />
    </button>
  </div>
</template>
