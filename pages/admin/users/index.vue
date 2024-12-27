<script setup lang="ts">
import type { User } from "@prisma/client";

const headers = ["First Name", "Last Name", "Email"];
const pageSize = ref(3);
const currentPage = ref(1);
const totalPages = ref(1);
const rows = ref<User[]>([]);

const headerKeyMap = {
  "First Name": "firstName",
  "Last Name": "lastName",
  Email: "email",
};

const fetchAdmins = async () => {
  const response = await $fetch(`/api/users/get/admins`, {
    method: "GET",
    query: {
      page: currentPage.value,
      pageSize: pageSize.value,
    },
  });

  rows.value = response.admins || [];
  totalPages.value = response.totalPages;
};

// Fetch admins when the component is mounted and whenever `currentPage` changes
watch([currentPage, pageSize], fetchAdmins, { immediate: true });

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
}
</script>

<template>
  <NuxtLayout name="admin-navbar">
    <div>
      <h1
        class="text-md p-3 uppercase font-bold tracking-widest flex justify-center md:w-[calc(100vw-5rem)]"
      >
        Users
      </h1>
    </div>
    <div class="md:flex md:justify-center">
      <Details summary="Admins" class="md:w-3/4">
        <UsersTable
          :headers="headers"
          :rows="rows"
          :headerKeyMap="headerKeyMap"
          :type="'Admin'"
          @save="fetchAdmins"
          :currentPage="currentPage"
          :totalPages="totalPages"
          @nextPage="nextPage"
          @prevPage="prevPage"
          @update="fetchAdmins"
          @refresh="fetchAdmins"
        />
      </Details>
    </div>
  </NuxtLayout>
</template>
