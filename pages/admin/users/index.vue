<script setup lang="ts">
import {
  UsersIcon,
  ClipboardDocumentListIcon,
  ArrowLeftStartOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/vue/24/solid";

async function logout() {
  window.location.href = "/api/auth0/logout";
}

function navigate(path: string) {
  navigateTo(path);
}
</script>
<template>
  <div class="flex-col md:flex md:flex-row">
    <div class="md:flex-col md:h-screen flex md:flex-grow-0 bg-gray-900">
      <div class="flex flex-grow justify-center items-center md:items-start">
        <img
          src="/assets/TWCGatewayLogo.svg"
          class="w-16 m-1"
          draggable="false"
        />
      </div>
      <div
        class="flex flex-grow md:flex-col w-full justify-center items-center space-x-2 md:space-x-0 md:space-y-2 overflow-auto"
      >
        <button
          @click="navigate('/admin/users')"
          class="flex justify-center items-center p-1 border border-gray-300 rounded hover:bg-opacity-50 hover:bg-gray-100"
        >
          <UsersIcon class="w-8" />
        </button>
        <button
          @click="navigate('/admin/tasks')"
          class="flex justify-center items-center p-1 border border-gray-300 rounded hover:bg-opacity-50 hover:bg-gray-100"
        >
          <ClipboardDocumentListIcon class="w-8" />
        </button>
      </div>
      <div class="flex flex-grow justify-center items-center md:items-end p-2">
        <button
          @click="logout"
          class="flex justify-center items-center p-1 border border-gray-300 rounded hover:bg-opacity-50 hover:bg-red-200"
        >
          <ArrowLeftStartOnRectangleIcon class="w-8" />
        </button>
      </div>
    </div>
    <div class="md:flex-grow h-screen">
      <div class="m-3 p-3">
        <button
          class="flex justify-center items-center p-1 border border-gray-300 rounded hover:bg-opacity-50 hover:bg-gray-100"
        >
          <UserPlusIcon class="w-8" />
        </button>
      </div>
      <div
        class="border h-1/2 border-gray-300 m-3 p-3 rounded-lg overflow-auto"
      ></div>
    </div>
  </div>
</template>
