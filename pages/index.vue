<script setup lang="ts">
async function logout() {
  loggingOut.value = true;
  window.location.href = "/api/auth0/logout";
}

const loggingOut = ref(false);
</script>

<!-- <template>
  <div class="flex flex-col h-screen justify-center items-center bg-black">
    <div class="text-white text-4xl">Hello, Nuxt!</div>
    <button
      @click="logout"
      class="border-2 border-gray-300 rounded-lg px-2 py-1 m-3 text-white"
    >
      Logout
    </button>
  </div>
</template> -->

<template>
  <div class="flex h-screen justify-center items-center">
    <div class="flex flex-col items-center">
      <div class="text-4xl">404</div>
      <div class="mt-3 uppercase font-bold">page not found</div>
      <div class="flex space-x-10 mt-3">
        <button
          v-if="!loggingOut"
          class="border-2 px-2 py-1 rounded hover:bg-red-300 hover:text-black"
          @click="logout"
        >
          Logout
        </button>
        <button v-if="loggingOut" class="border-2 px-2 py-1 rounded bg-white">
          <img src="/assets/blocks-shuffle-3.svg" />
        </button>
      </div>
    </div>
  </div>
</template>
