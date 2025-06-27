<script setup lang="ts">
const props = defineProps<{
  onCapture: () => void;
}>();
</script>

<template>
  <button
    @click="props.onCapture"
    class="text-white h-15 w-15 p-1.5 bg-white rounded-full active:bg-green-primary transition"
  >
    <div class="w-full h-full border border-black rounded-full" />
  </button>
</template>
