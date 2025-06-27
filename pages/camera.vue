<script setup lang="ts">
import Camera from "~/components/camera/Camera.vue";
import Button from "~/components/util/Button.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="md:hidden">
    <Camera />
  </div>
  <div
    class="md:flex h-[50dvh] gap-6 flex-col justify-center items-center hidden"
  >
    <h1>Hi, Please View Camera on Mobile Device</h1>
    <div class="w-[140px]">
      <Button variant="filled" size="sm" @click="goHome">Go Home</Button>
    </div>
  </div>
</template>
