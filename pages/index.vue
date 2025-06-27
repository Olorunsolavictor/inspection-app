<script setup lang="ts">
import ButtonSection from "~/components/home/ButtonSection.vue";
import Header from "~/components/home/Header.vue";
import Card from "~/components/home/card/Card.vue";

definePageMeta({
  layout: "base",
});
</script>

<template>
  <div
    class="w-full min-h-screen md:w-[400px] mx-auto gap-9.5 p-5 flex flex-col justify-between text-gray-primary font-semibold"
  >
    <Header />
    <Card />
    <ButtonSection />
  </div>
</template>
