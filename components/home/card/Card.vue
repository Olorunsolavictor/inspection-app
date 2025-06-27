<script lang="ts" setup>
import { useStepStore } from "~/stores/useStepStore";
import Step from "~/components/home/card/Step.vue";
import StepInstruction from "~/components/home/card/StepInstruction.vue";
import PicCard from "~/components/home/card/PicCard.vue";

const stepStore = useStepStore();
const steps = stepStore.steps;
</script>

<template>
  <div
    class="w-full min-h-[570px] h-fit px-3 py-8 flex flex-col justify-between items-center gap-8 rounded-xl text-sm bg-purple-secondary"
  >
    <section
      class="w-full flex flex-wrap justify-center gap-2 md:justify-between md:gap-2"
    >
      <Step v-for="step in steps" :key="step" :step="step" />
    </section>

    <StepInstruction />

    <PicCard />
  </div>
</template>
