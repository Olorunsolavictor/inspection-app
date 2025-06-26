<script setup lang="ts">
import { computed } from "vue";
import { useStepStore } from "~/stores/useStepStore";

const stepStore = useStepStore();

const step = computed(() => stepStore.selectedStep);

const viewMap: Record<number, string> = {
  2: "front view",
  3: "left view",
  4: "right view",
  5: "back view",
  7: "dashboard",
  8: "interior back",
};

const dynamicPart = computed(() => viewMap[step.value] || "selected part");
</script>

<template>
  <div
    class="text-lg text-start bg-yellow-100 flex-1 py-2 leading-relaxed text-gray-primay"
  >
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
          Take a picture of your vehicle’s
          <span class="text-blue-700 font-semibold"> chassis number</span>.
        </p>

        <div class="space-y-2 text-sm">
          <div class="flex items-start gap-2">
            <div
              class="w-2 h-2 mt-1 border border-purple-600 rounded-full shrink-0"
            ></div>
            <span
              >You can locate the chassis number on the front windshield</span
            >
          </div>

          <div class="flex items-start gap-2">
            <div
              class="w-2 h-2 mt-1 border border-purple-600 rounded-full shrink-0"
            ></div>
            <span>Or find it on the interior door of the driver’s side</span>
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
