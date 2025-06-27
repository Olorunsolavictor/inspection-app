import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useStepStore = defineStore("step", () => {
  const steps = ref([1, 2, 3, 4, 5, 6, 7, 8]);
  const selectedStep = ref(1);

  function setStep(step: number) {
    if (steps.value.includes(step)) {
      selectedStep.value = step;
    }
  }

  function nextStep() {
    const currentIndex = steps.value.indexOf(selectedStep.value);
    const next = steps.value[currentIndex + 1];
    if (next) selectedStep.value = next;
  }

  function prevStep() {
    const currentIndex = steps.value.indexOf(selectedStep.value);
    const prev = steps.value[currentIndex - 1];
    if (prev) selectedStep.value = prev;
  }
  function resetSteps() {
    selectedStep.value = 1;
  }

  const isStep = (step: number) => computed(() => selectedStep.value === step);

  return {
    steps,
    selectedStep,
    setStep,
    nextStep,
    prevStep,
    isStep,
    resetSteps,
  };
});
