<script setup lang="ts">
import Button from "../util/Button.vue";
import spinner from "~/assets/svgs/loading-spinner.svg";
import { useCameraStore } from "~/stores/useCameraStore";

const props = defineProps<{
  sectionRotationClass: string;
  onRecapture: () => void;
  onVerify: () => void;
}>();

const cameraStore = useCameraStore();
</script>

<template>
  <section
    class="flex flex-col items-center mt-4 gap-6 h-fit w-full justify-between"
    :class="props.sectionRotationClass"
  >
    <div class="gap-1 text-center">
      <h1 v-if="cameraStore.isVerifying" class="text-[22px] font-semibold">
        Verifying
        <span class="text-green-success font-semibold">{{
          cameraStore.currentStep
        }}</span>
        View
      </h1>
      <h1 v-else class="text-[22px] font-semibold">
        Vehicle
        <span class="text-green-success font-semibold">{{
          cameraStore.currentStep
        }}</span>
        View
      </h1>
    </div>
    <div v-if="cameraStore.isVerifying">
      <img :src="spinner" alt="loading spinner" class="suspense-loading-icon" />
    </div>
    <h3
      v-if="cameraStore.isVerifying"
      class="text-sm mt-2 text-center font-medium"
    >
      Hold on while we verify <br />
      your image
    </h3>
    <h3 v-else class="text-sm mt-2 font-medium">
      Confirm Vehicle <span>{{ cameraStore.currentStep }}</span> View to<br />
      move to the next Vehicle view
    </h3>

    <div class="flex w-[80%] mt-5 gap-2 items-center justify-center">
      <Button
        variant="outline"
        size="sm"
        :disabled="cameraStore.isVerifying"
        @click="props.onRecapture"
        >Re-capture</Button
      >
      <Button
        variant="filled"
        size="sm"
        :disabled="cameraStore.isVerifying"
        @click="props.onVerify"
        >Verify</Button
      >
    </div>
  </section>
</template>
