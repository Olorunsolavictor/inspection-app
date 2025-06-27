<script setup lang="ts">
import { computed } from "vue";
import { useStepStore } from "~/stores/useStepStore";

const stepStore = useStepStore();

const imageSrc = computed(() => `/images/step-${stepStore.selectedStep}.png`);

const stepTitles: Record<number, string> = {
  2: "Front View",
  3: "Left View (driver's side)",
  4: "Back View",
  5: "Right View",
  6: "Chassis Number",
  7: "Dashboard",
  8: "Interior Back",
};

const imageTitle = computed(() => stepTitles[stepStore.selectedStep] || "");
</script>

<template>
  <div
    class="w-full h-[260px] flex flex-col gap-3.5 rounded overflow-hidden mx-auto"
  >
    <label v-if="imageTitle" class="text-[#909090] font-normal mb- text-center">
      {{ imageTitle }}
    </label>

    <img
      :src="imageSrc"
      :alt="`Vehicle step ${stepStore.selectedStep}`"
      class="w-full h-auto rounded shadow transition-all duration-300"
    />
  </div>
</template>
