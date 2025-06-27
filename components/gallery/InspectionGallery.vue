<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "~/components/util/Button.vue";

const images = ref<string[]>([]);
const previewedImage = ref<string | null>(null);

function loadImages() {
  const stored = localStorage.getItem("inspectionData");
  if (stored) {
    const parsed = JSON.parse(stored);
    images.value = Object.values(parsed);
  }
}

function clearGallery() {
  localStorage.removeItem("inspectionData");
  images.value = [];
}

function deleteImage(index: number) {
  images.value.splice(index, 1);
  localStorage.setItem("inspectionData", JSON.stringify(images.value));
}

function previewImage(src: string) {
  previewedImage.value = src;
}

function closePreview() {
  previewedImage.value = null;
}

onMounted(() => {
  loadImages();
});
</script>

<template>
  <div class="p-4 max-w-6xl bg-purple-secondary rounded-lg mx-auto relative">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-primary">Gallery</h2>
      <div v-if="images.length > 0" class="">
        <Button variant="filled" size="sm" @click="clearGallery">Clear</Button>
      </div>
    </div>

    <div v-if="images.length === 0" class="text-center text-gray-400 py-20">
      <p class="text-lg">No inspection photos found.</p>
    </div>

    <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-3">
      <div
        v-for="(src, index) in images"
        :key="index"
        class="rounded-lg pb-4 bg-white col-span-1 shadow hover:shadow-md transition overflow-hidden relative"
      >
        <button
          @click="deleteImage(index)"
          class="absolute top-2 right-2 bg-green-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
          title="Delete"
        >
          ✕
        </button>

        <img
          :src="src"
          alt="Inspection"
          class="w-full h-48 object-cover cursor-pointer"
          loading="lazy"
          @click="previewImage(src)"
        />

        <div class="p-3 text-center space-y-2">
          <p class="text-sm text-gray-primary">Step {{ index + 1 }}</p>
          <a
            :href="src"
            download
            class="text-xs text-purple-primary hover:underline"
          >
            Download
          </a>
        </div>
      </div>
    </div>

    <div
      v-if="previewedImage"
      class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      @click.self="closePreview"
    >
      <div class="relative max-w-3xl w-full p-4">
        <button
          @click="closePreview"
          class="absolute -top-6 right-2 text-white text-2xl font-bold"
          title="Close"
        >
          ✕
        </button>
        <img
          :src="previewedImage"
          alt="Full preview"
          class="w-full max-h-[80vh] object-contain rounded"
        />
      </div>
    </div>
  </div>
</template>
