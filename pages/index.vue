<script setup lang="ts">
import { onMounted } from "vue";
import ButtonSection from "~/components/home/ButtonSection.vue";
import Header from "~/components/home/Header.vue";
import Card from "~/components/home/card/Card.vue";

useHead({
  title: "Inspection App",
  meta: [
    {
      name: "description",
      content:
        "A quick car inspection app. Capture and preview inspection photos easily.",
    },
  ],
});

definePageMeta({
  layout: "base",
});

const stepStore = useStepStore();
const cameraStore = useCameraStore();

onMounted(() => {
  stepStore.resetSteps();
  cameraStore.resetCameraUI();
  localStorage.removeItem("inspectionData");
});
</script>

<template>
  <div
    class="w-full min-h-screen md:w-[400px] mx-auto gap-10 px-5 pt-5 pb-10 flex flex-col justify-start text-gray-primary font-semibold"
  >
    <Header />
    <Card />
    <ButtonSection />
  </div>
</template>
