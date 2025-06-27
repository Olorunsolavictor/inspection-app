<script setup lang="ts">
import { useCameraStore } from "~/stores/useCameraStore";
import Button from "../util/Button.vue";
import { useRouter } from "vue-router";
import { useAttrs } from "vue";

const props = defineProps<{
  sectionRotationClass: string;
  imageSrc: string;
  onStart: () => void;
  onGoBack: () => void;
}>();

const attrs = useAttrs();

const cameraStore = useCameraStore();
const router = useRouter();

function handleGoBack() {
  if (cameraStore.currentStepIndex > 0) {
    cameraStore.goToPreviousStep();
  } else {
    props.onGoBack();
  }
}
</script>

<template>
  <section
    class="flex flex-col items-center mt-4 gap-5 h-fit w-full justify-center"
    :class="props.sectionRotationClass"
    v-bind="attrs"
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
        :src="props.imageSrc"
        :alt="cameraStore.currentStep"
        class="absolute left-1/2 top-1/2 w-auto h-auto max-w-none max-h-none transform -translate-x-1/2 -translate-y-1/2 rotate-[90deg]"
      />
    </div>

    <div class="w-[84%] flex gap-2 items-center justify-center">
      <Button variant="outline" size="sm" @click="handleGoBack">Go Back</Button>
      <Button variant="filled" size="sm" @click="props.onStart">Start</Button>
    </div>
  </section>
</template>
