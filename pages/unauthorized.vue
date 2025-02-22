<script setup lang="ts">
import {
  ArrowRightStartOnRectangleIcon,
  ArrowLeftIcon,
} from "@heroicons/vue/24/solid";

function logout() {
  window.location.href = "/api/auth0/logout";
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen text-white">
    <div class="flex flex-col items-center">
      <h1 class="text-5xl md:text-9xl font-mono font-extrabold">401</h1>
      <p class="text-xl md:text-5xl font-medium uppercase tracking-wider">
        ⛔ Unauthorized ⛔
      </p>
      <div class="flex m-5 md:m-10 w-full">
        <button
          @click="$router.back()"
          class="border m-3 w-full flex justify-center items-center p-3 rounded-sm hover:rounded-xl"
        >
          <ArrowLeftIcon class="w-6 md:w-14" />
        </button>
        <button
          @click="logout"
          class="border m-3 w-full flex justify-center items-center p-3 rounded-sm hover:rounded-xl"
        >
          <ArrowRightStartOnRectangleIcon class="w-6 md:w-14" />
        </button>
      </div>
    </div>
  </div>
</template>
