<script setup lang="ts">
import { useStepStore } from "~/stores/useStepStore";
import Step from "~/components/home/card/Step.vue";
import StepInstruction from "~/components/home/card/StepInstruction.vue";
import PicCard from "~/components/home/card/PicCard.vue";

const stepStore = useStepStore();
const steps = stepStore.steps;
</script>

<template>
  <div
    class="w-full h-fit px-2 pb-0.5 pt-8 flex flex-col justify-between items-center gap-8 rounded-xl text-sm bg-purple-secondary"
  >
    <section
      class="w-full flex flex-wrap justify-between gap-1"
      aria-label="Inspection steps"
    >
      <Step v-for="step in steps" :key="step" :step="step" />
    </section>
    <StepInstruction />

    <PicCard />
  </div>
</template>
