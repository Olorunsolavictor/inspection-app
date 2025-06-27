<script setup lang="ts">
import Camera from "~/components/camera/Camera.vue";
import Button from "~/components/util/Button.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => router.push("/");
</script>

<template>
  <div>
    <Camera />
  </div>

  <!-- <div
    class="hidden md:flex h-[50dvh] flex-col items-center justify-center gap-6 text-center px-4"
  >
    <h1 class="text-lg font-semibold text-gray-700">
      Hi, please view the camera on a mobile device with a supported back
      camera.
    </h1>
    <div class="w-[140px]">
      <Button variant="filled" size="sm" @click="goHome">Go Home</Button>
    </div>
  </div> -->
</template>
