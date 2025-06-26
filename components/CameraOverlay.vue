<script setup lang="ts">
import { useCameraStore } from "~/stores/useCameraStore";
import { useRouter } from "vue-router";

const props = defineProps<{
  onCapture: () => void;
}>();

const cameraStore = useCameraStore();
const router = useRouter();

function handleStart() {
  cameraStore.setOverlayMode("capture");
}

function handleGoBack() {
  router.push("/");
}

function handleVerify() {
  if (cameraStore.capturedImage) {
    localStorage.setItem("verifiedImage", cameraStore.capturedImage);
    // Optionally transition to another state
    // cameraStore.setOverlayMode("done");
  }
}

function handleRecapture() {
  cameraStore.setCapturedImage("");
  cameraStore.setOverlayMode("capture");
}

const imageSrc = computed(() => `/images/snap-1.png`);
</script>

<template>
  <div
    v-if="['menu', 'capture', 'verify'].includes(cameraStore.overlayMode ?? '')"
    class="absolute top-0 bottom-0 right-0 h-fit w-screen z-20 text-white flex flex-col items-center justify-center shadow-md transition-all duration-300 py-6.5 px-6.5 backdrop-blur-md bg-gradient-to-b from-primaryGradientStart to-primaryGradientEnd"
  >
    <!-- Menu Mode -->
    <section
      v-if="cameraStore.overlayMode === 'menu'"
      class="flex flex-col items-center rotate-[270deg] mt-4 gap-5 h-fit w-full justify-center"
    >
      <div class="gap-1 text-center mb-6">
        <h1 class="text-[22px] font-semibold">
          Vehicle
          <span class="font-bold text-green-primary">Left Side</span> View
        </h1>
        <h3 class="text-sm font-medium">Take Vehicle left view</h3>
      </div>
      <div class="relative w-full h-[80px] overflow-hidden">
        <img
          :src="imageSrc"
          alt="Left View"
          class="absolute left-1/2 top-1/2 w-auto h-auto max-w-none max-h-none transform -translate-x-1/2 -translate-y-1/2 rotate-[90deg]"
        />
      </div>
      <div class="w-full flex gap-2 items-center justify-center py-4 px-6">
        <Button variant="outline" size="sm" @click="handleGoBack">
          Go back
        </Button>
        <Button variant="filled" size="sm" @click="handleStart">Start</Button>
      </div>
    </section>
    <!-- Menu Mode -->
    <section
      v-if="cameraStore.overlayMode === 'verify'"
      class="flex flex-col items-center rotate-[270deg] mt-4 gap-5 h-fit w-full justify-center"
    >
      <div class="gap-1 text-center mb-6">
        <h1 class="text-[22px] font-semibold">
          Vehicle
          <span class="font-bold text-green-primary">Left Side</span> View
        </h1>
        <h3 class="text-sm mt-2 font-medium">
          Confirm Vehicle side view to<br />
          move to the next Vehicle view
        </h3>
      </div>
      <div class="relative w-full h-[80px] overflow-hidden">
        <img
          :src="imageSrc"
          alt="Left View"
          class="absolute left-1/2 top-1/2 w-auto h-auto max-w-none max-h-none transform -translate-x-1/2 -translate-y-1/2 rotate-[90deg]"
        />
      </div>
      <div class="w-full flex gap-2 items-center justify-center py-4 px-6">
        <Button variant="outline" size="sm" @click="handleRecapture">
          Re-Capture
        </Button>
        <Button variant="filled" size="sm" @click="handleVerify">Verify</Button>
      </div>
    </section>

    <!-- Capture Mode -->
    <button
      v-else-if="cameraStore.overlayMode === 'capture'"
      @click="props.onCapture"
      class="text-white h-15 w-15 p-1.5 bg-white rounded-full hover:bg-blue-700 transition"
    >
      <div class="w-full h-full border border-black bg-pink-200 rounded-full" />
    </button>

    <!-- Verify Mode -->
    <!-- <section
      v-else-if="cameraStore.overlayMode === 'verify'"
      class="flex flex-col items-center gap-4"
    >
      <p class="text-white font-semibold text-lg">
        Are you satisfied with this photo?
      </p>
      <div class="w-full flex gap-2 items-center justify-center py-4 px-6">
        <Button variant="outline" size="sm" @click="handleGoBack">
          Go back
        </Button>
        <Button variant="filled" size="sm" @click="handleStart">Start</Button>
      </div>
    </section> -->
  </div>
</template>
