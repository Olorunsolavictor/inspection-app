<script setup lang="ts">
import Camera from "~/components/camera/Camera.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => router.push("/");
</script>

<template>
  <div>
    <Camera />
  </div>
</template>
