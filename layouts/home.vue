<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100 text-gray-800">
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
