<script setup lang="ts">
import { ref, onMounted } from "vue";

const images = ref<string[]>([]);

function loadImages() {
  const stored = localStorage.getItem("inspectionData");
  if (stored) {
    const parsed = JSON.parse(stored);
    images.value = Object.values(parsed);
  }
}

function clearGallery() {
  localStorage.removeItem("inspectionSteps");
  images.value = [];
}

onMounted(() => {
  loadImages();
});
</script>
<template>
  <div class="p-4 max-w-6xl bg-purple-secondary rounded-lg mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-primary">Inspection Gallery</h2>
      <div class="w-16">
        <Button variant="filled" size="sm" @click="clearGallery"> Clear</Button>
      </div>
    </div>
    <div v-if="images.length === 0" class="text-center text-gray-400 py-20">
      <p class="text-lg">No inspection photos found.</p>
    </div>

    <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-3">
      <div
        v-for="(src, index) in images"
        :key="index"
        class="rounded-lg pb-4 bg-white col-span-1 shadow hover:shadow-md transition overflow-hidden"
      >
        <img :src="src" alt="Inspection" class="w-full h-48 object-cover" />
        <div class="p-3 text-center">
          <p class="text-sm text-gray-primary">Step {{ index + 1 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
