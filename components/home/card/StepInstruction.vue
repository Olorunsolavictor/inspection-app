<script setup lang="ts">
import { computed } from "vue";
import { useStepStore } from "~/stores/useStepStore";

const stepStore = useStepStore();

const step = computed(() => stepStore.selectedStep);

const viewMap: Record<number, string> = {
  2: "front view",
  3: "left view",
  4: "back view",
  5: "right view",
  7: "dashboard",
  8: "interior back",
};

const dynamicPart = computed(() => viewMap[step.value] || "selected part");
</script>

<template>
  <div class="text-lg text-start flex-1 py-2 leading-relaxed text-gray-primay">
    <template v-if="step === 1">
      <p>
        Park your vehicle in a
        <span class="font-semibold"> well-lit</span>,
        <span class="font-semibold"> shaded</span>, and
        <span class="font-semibold"> spacious</span> area, ensuring there are no
        obstructions.
      </p>
    </template>
    <template v-else-if="step === 6">
      <div class="space-y-4 text-left text-gray-700 text-lg">
        <p class="text-lg">
          Take a picture of your <span class="font-semibold">vehicle’s</span>
          <span class="text-green-primary font-semibold"> chassis number</span>.
        </p>

        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2">
            <div
              class="w-2 h-2 mt-1 border border-purple-primary rounded-full shrink-0"
            ></div>
            <p>
              You can locate the chassis number on the
              <span class="text-green-primary">front windshield</span>
            </p>
          </div>

          <div class="flex items-start gap-2">
            <div
              class="w-2 h-2 mt-1 border border-purple-primary rounded-full shrink-0"
            ></div>
            <p>
              Or find it on the
              <span class="text-green-primary">interior door</span> of the
              <span class="text-green-primary">driver’s side</span>
            </p>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <p>
        Take picture of your vehicle’s
        <span class="text-green-primary font-semibold capitalize">
          {{ dynamicPart }} </span
        >, ensuring it fills about
        <span class="font-semibold text-green-primary">80%</span> of your camera
        screen.
      </p>
    </template>
  </div>
</template>
