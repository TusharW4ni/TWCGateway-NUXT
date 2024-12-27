<script setup lang="ts">
import {
  UsersIcon,
  ClipboardDocumentListIcon,
  ArrowLeftStartOnRectangleIcon,
  BuildingOffice2Icon,
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
    <div class="md:flex-col md:h-screen md:w-20 flex bg-gray-900 h-16">
      <div
        class="flex flex-grow justify-center items-center md:items-start p-2"
      >
        <img
          src="/assets/img/TWCGatewayLogo.svg"
          class="p-1"
          draggable="false"
          alt="Logo"
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
          @click="navigate('/admin/departments')"
          class="flex justify-center items-center p-1 border border-gray-300 rounded hover:bg-opacity-50 hover:bg-gray-100"
        >
          <BuildingOffice2Icon class="w-8" />
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
    <div><slot /></div>
  </div>
</template>
