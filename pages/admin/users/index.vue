<script setup lang="ts"></script>

<template>
  <NuxtLayout name="admin-navbar">
    <div
      class="flex flex-col h-[calc(100vh-4rem)] md:h-screen md:w-[calc(100vw-5rem)]"
    >
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
  </NuxtLayout>
</template>
