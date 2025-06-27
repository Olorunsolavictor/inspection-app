<script setup lang="ts">
import { useStepStore } from "~/stores/useStepStore";
import Button from "../util/Button.vue";
import { useRouter } from "vue-router";

const stepStore = useStepStore();
const router = useRouter();

function goToCamera() {
  router.push("/camera");
}
</script>

<template>
  <section
    v-if="stepStore.selectedStep <= 7"
    class="w-full flex gap-2 items-center justify-center py-4"
  >
    <Button variant="outline" size="sm" @click="goToCamera">Skip</Button>
    <Button variant="filled" size="sm" @click="stepStore.nextStep"
      >Next Step</Button
    >
  </section>

  <section v-else class="w-full flex justify-center items-center py-4">
    <Button variant="filled" size="sm" full-width @click="goToCamera"
      >Start Inspection</Button
    >
  </section>
</template>
