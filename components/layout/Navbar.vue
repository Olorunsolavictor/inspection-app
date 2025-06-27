<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const links = [
  { name: "Home", path: "/" },
  { name: "Camera", path: "/camera" },
  { name: "Gallery", path: "/gallery" },
];
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-white shadow-md flex items-center justify-center text-sm font-medium"
  >
    <button
      v-for="link in links"
      :key="link.path"
      @click="router.push(link.path)"
      :class="[
        'px-3 py-1 rounded transition',
        route.path === link.path
          ? 'text-green-primary font-bold'
          : 'text-gray-primary hover:text-green-primary',
      ]"
    >
      {{ link.name }}
    </button>
  </nav>
</template>
