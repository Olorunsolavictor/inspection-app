<script setup lang="ts">
import Button from "../util/Button.vue";
import { useCameraStore } from "~/stores/useCameraStore";

const props = defineProps<{
  sectionRotationClass: string;
  onGoHome: () => void;
  onGoGallery: () => void;
}>();

const cameraStore = useCameraStore();
</script>

<template>
  <section
    class="flex flex-col items-center mt-4 gap-6 h-fit w-full justify-center"
    :class="props.sectionRotationClass"
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
    <div class="flex w-[85%] mt-6 gap-2 items-center justify-center">
      <Button variant="outline" size="sm" @click="props.onGoHome">Home</Button>
      <Button variant="filled" size="sm" @click="props.onGoGallery"
        >Gallery</Button
      >
    </div>
  </section>
</template>
