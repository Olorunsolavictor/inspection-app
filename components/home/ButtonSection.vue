<script setup lang="ts">
import { useStepStore } from "~/stores/useStepStore";
import Button from "../util/Button.vue";

const stepStore = useStepStore();

const router = useRouter();

function skipToCamera() {
  router.push("/camera");
}
</script>

<template>
  <section
    v-show="stepStore.selectedStep <= 7"
    class="w-full flex gap-2 items-center justify-center py-4"
  >
    <Button variant="outline" size="sm" @click="skipToCamera">Skip</Button>
    <Button variant="filled" size="sm" @click="stepStore.nextStep"
      >Next Step</Button
    >
  </section>
  <section class="w-full py-4" v-show="stepStore.selectedStep === 8">
    <Button variant="filled" size="sm" @click="skipToCamera"
      >Start Inspection</Button
    >
  </section>
</template>
