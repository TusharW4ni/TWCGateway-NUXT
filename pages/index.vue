<script setup>
async function logout() {
  window.location.href = "/api/auth0/logout";
}
</script>

<template>
  <div class="flex flex-col h-screen justify-center items-center bg-black">
    <div class="text-white text-4xl">Hello, Nuxt!</div>
    <button
      @click="logout"
      class="border-2 border-gray-300 rounded-lg px-2 py-1 m-3 text-white"
    >
      Logout
    </button>
  </div>
</template>
