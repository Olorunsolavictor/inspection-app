<script setup lang="ts">
import { computed } from "vue";
import { useStepStore } from "~/stores/useStepStore";

const stepStore = useStepStore();

const imageSrc = computed(() => `/images/step-${stepStore.selectedStep}.png`);

// Map step numbers to titles (omit step 1)
const stepTitles: Record<number, string> = {
  2: "Front View",
  3: "Side View",
  4: "Back View",
  5: "Interior",
  6: "Dashboard",
  7: "Tyres",
  8: "Engine Bay",
};

const imageTitle = computed(() => stepTitles[stepStore.selectedStep] || "");
</script>

<template>
  <div class="w-full h-[220px] flex flex-col rounded overflow-hidden mx-auto">
    <label v-if="imageTitle" class="text-gray-700 font-normal mb-2 text-center">
      {{ imageTitle }}
    </label>

    <img
      :src="imageSrc"
      :alt="`Vehicle step ${stepStore.selectedStep}`"
      class="w-full h-auto rounded shadow transition-all duration-300"
    />
  </div>
</template>
