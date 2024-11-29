<script setup lang="tsx">
import {
  UsersIcon,
  ClipboardDocumentListIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/vue/24/solid";

async function logout() {
  window.location.href = "/api/auth0/logout";
}
</script>
<template>
  <div
    class="md:flex-col md:h-screen md:w-20 flex flex-grow bg-gray-900 h-16 overflow-auto"
  >
    <div
      class="flex flex-grow overflow-auto justify-center items-center md:items-start p-1"
    >
      <img src="/assets/TWCGatewayLogo.svg" class="p-1" />
    </div>
    <div
      class="flex flex-grow md:flex-col w-full justify-center items-center space-x-2 md:space-x-0 md:space-y-2 overflow-auto"
    >
      <button
        class="flex justify-center items-center p-1 border border-gray-300 rounded hover:bg-opacity-50 hover:bg-gray-100"
      >
        <UsersIcon class="w-8" />
      </button>
      <button
        class="flex justify-center items-center p-1 border border-gray-300 rounded hover:bg-opacity-50 hover:bg-gray-100"
      >
        <ClipboardDocumentListIcon class="w-8" />
      </button>
    </div>
    <div
      class="flex flex-grow overflow-auto justify-center items-center md:items-end p-1"
    >
      <button
        @click="logout"
        class="flex justify-center items-center p-1 border border-gray-300 rounded hover:bg-opacity-50 hover:bg-gray-100"
      >
        <ArrowLeftStartOnRectangleIcon class="w-8" />
      </button>
    </div>
  </div>
</template>
