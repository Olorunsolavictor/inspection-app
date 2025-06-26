<script lang="ts" setup>
import { useStepStore } from "~/stores/useStepStore";

const stepStore = useStepStore();
const steps = stepStore.steps;
</script>

<template>
  <div
    class="w-full min-h-[502px] h-fit px-2 py-8 flex flex-col justify-between items-center gap-8 md:w-[50%] bg-purple-secondary text-sm rounded-xl"
  >
    <section class="flex gap-2">
      <Step v-for="step in steps" :key="step" :step="step" />
    </section>

    <StepInstruction />

    <PicCard />
  </div>
</template>
