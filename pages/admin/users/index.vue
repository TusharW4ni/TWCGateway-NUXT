<script setup lang="ts">
import type { User } from "@prisma/client";
import { useToast } from "../../../composables/useToast.ts";
const { notify } = useToast();

// ------------------ Admin ------------------------- //
const adminHeaders = ["First Name", "Last Name", "Email"];
const adminCurrentPage = ref(1);
const adminPageSize = ref(3);
const adminSearchString = ref("");

const adminsLoading = ref(false);
const admins = await useFetch(`/api/users/get/admins`, {
  query: {
    page: adminCurrentPage,
    pageSize: adminPageSize,
    searchString: adminSearchString,
  },
  onRequest() {
    adminsLoading.value = true;
  },
  onResponse() {
    adminsLoading.value = false;
  },
  onRequestError({ error }) {
    console.log({ adminsOnRequestError: error });
    notify("Error fetching all admin users (onRequestError).", "error");
  },
  onResponseError() {
    notify("Error fetching all admin users (onResponseError).", "error");
  },
});

const adminTotalPagesLoading = ref(false);
const adminTotalPages = await useFetch(`/api/users/get/admins-totalPages`, {
  query: {
    pageSize: adminPageSize,
    searchString: adminSearchString,
  },
  onRequest() {
    adminTotalPagesLoading.value = true;
  },
  onResponse() {
    adminTotalPagesLoading.value = false;
  },
  onRequestError() {
    notify(
      "Error fetching total pages for admin table pagination (onRequestError).",
      "error"
    );
  },
  onResponseError() {
    notify(
      "Error fetching total pages for admin tbale pagination (onResponseError).",
      "error"
    );
  },
});

function adminChangePage(direction: String) {
  if (direction === "increment") {
    adminCurrentPage.value += 1;
  } else if (direction === "decrement") {
    adminCurrentPage.value -= 1;
  } else {
    console.log("Error changing page for admins");
  }
}

function updateAdminSearchString(searchString: string) {
  adminSearchString.value = searchString;
}

async function adminNewUser(adminRow: any) {
  try {
    await $fetch("/api/users/post/admin", {
      method: "POST",
      body: {
        firstName: adminRow.firstName,
        lastName: adminRow.lastName,
        email: adminRow.email,
      },
    });
    adminCurrentPage.value = 1;
    adminTotalPages.refresh();
    // admins.refresh() // No need to do this because adminCurrentPage.value = 1 reloads admins.
    notify("Added new admin successfully!", "success");
  } catch (e) {
    console.log(e);
    notify("Error adding new admin user.", "error");
  }
}

function adminAddRowError(error: string) {
  notify(error, "error");
}
</script>

<template>
  <NuxtLayout name="admin-navbar">
    <div
      class="w-full h-[calc(100vh-4rem)] md:h-screen md:w-[calc(100vw-4rem)]"
    >
      <div
        class="flex p-2 w-full justify-center items-center uppercase tracking-widest font-bold text-lg"
      >
        Users
      </div>
      <div class="md:flex md:justify-center">
        <Details summary="Admins" class="md:w-3/4">
          <Pagination
            :currentPage="adminCurrentPage"
            :totalPages="adminTotalPages.data.value.totalPages"
            :loading="adminTotalPagesLoading"
            @nextPage="adminChangePage('increment')"
            @prevPage="adminChangePage('decrement')"
          />
          <Table
            :headers="adminHeaders"
            :rows="admins.data.value.admins"
            :loading="adminsLoading"
            @search="updateAdminSearchString"
          />
          <AddRow
            :type="'Admin'"
            @submit="adminNewUser"
            @error="adminAddRowError"
          />
        </Details>
      </div>
    </div>
  </NuxtLayout>
</template>
