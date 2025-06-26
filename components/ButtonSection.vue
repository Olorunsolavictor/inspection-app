<script setup lang="ts">
import { useStepStore } from "~/stores/useStepStore";

const stepStore = useStepStore();

const router = useRouter();

function skipToCamera() {
  router.push("/camera");
}
</script>

<template>
  <section class="w-full flex gap-2 items-center justify-center py-4">
    <Button variant="outline" size="sm" @click="skipToCamera">Skip</Button>
    <Button variant="filled" size="sm" @click="stepStore.nextStep"
      >Next Step</Button
    >
  </section>
</template>
