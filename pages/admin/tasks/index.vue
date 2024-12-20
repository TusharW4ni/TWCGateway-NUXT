<script setup lang="ts">
const currentPage = ref("Departments");

const changePage = (page: string) => {
  currentPage.value = page;
};
</script>

<template>
  <NuxtLayout name="admin-navbar">
    <div class="p-3 h-[calc(100vh-4rem)] md:h-full md:w-[calc(100vw-5rem)]">
      <div>
        <button
          class="border-2 rounded-t-lg p-2 opacity-50"
          @click="changePage('Departments')"
          v-if="currentPage !== 'Departments'"
        >
          Departments
        </button>
        <button
          class="border-2 rounded-t-lg p-2 bg-gray-900"
          @click="changePage('Departments')"
          v-if="currentPage === 'Departments'"
        >
          Departments
        </button>
        <button
          class="border-2 rounded-t-lg p-2 opacity-50"
          @click="changePage('Task Assignment')"
          v-if="currentPage !== 'Task Assignment'"
        >
          Task Assignment
        </button>
        <button
          class="border-2 rounded-t-lg p-2 bg-gray-900"
          @click="changePage('Task Assignment')"
          v-if="currentPage === 'Task Assignment'"
        >
          Task Assignment
        </button>
      </div>
      <div
        v-if="currentPage === 'Departments'"
        class="flex justify-center p-2 border-2 bg-gray-900 h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)] rounded-b-lg rounded-tr-lg"
      >
        Departments
      </div>
      <div
        v-if="currentPage === 'Task Assignment'"
        class="flex justify-center p-2 border-2 bg-gray-900 h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)] rounded-b-lg rounded-tr-lg"
      >
        Task Assignment
      </div>
    </div>
  </NuxtLayout>
</template>
