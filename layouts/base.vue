<script setup lang="ts">
import Navbar from "~/components/layout/Navbar.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen text-gray-primary pt-[60px]">
    <Navbar />
    <main class="flex-1 md:flex-0 w-full md:w-[800px] mx-auto">
      <slot />
    </main>
  </div>
</template>
