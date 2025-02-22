<script setup lang="ts">
function logout() {
  window.location.href = "/api/auth0/logout";
}
</script>

<template>
  <div
    class="flex-col text-4xl flex h-screen justify-center items-center bg-black text-white"
  >
    🚧 Onboarding Employee Page - Under Construction 🚧
    <button class="border border-white rounded-lg m-3 p-2" @click="logout">
      Logout
    </button>
  </div>
</template>
