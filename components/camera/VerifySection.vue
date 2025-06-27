<script setup lang="ts">
import Button from "../util/Button.vue";
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
      <Button variant="outline" size="sm" @click="props.onRecapture"
        >Re-Capture</Button
      >
      <Button variant="filled" size="sm" @click="props.onVerify">Verify</Button>
    </div>
  </section>
</template>
