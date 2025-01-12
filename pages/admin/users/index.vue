<script setup lang="ts">
import type { User } from "@prisma/client";
import { useToast } from "../../../composables/useToast.ts";
import { useAdminEditRowStore } from "../../../stores/useAdminEditRowStore.ts";
const { notify } = useToast();

// ------------------ Admin ------------------------- //
const adminHeaders = ["First Name", "Last Name", "Email"];
const adminCurrentPage = ref(1);
const adminPageSize = ref(3);
const adminSearchString = ref("");
const adminShowingEditRow = useAdminEditRowStore();
// const adminIsEditingRow = ref(false);
const adminEditingRowData = ref(null);

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
    // notify("Error fetching all admin users (onRequestError).", "error");
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
    // notify(
    //   "Error fetching total pages for admin table pagination (onRequestError).",
    //   "error"
    // );
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

function toggleAdminEditingRow(row: any) {
  console.log({ row });
  if (row) {
    adminShowingEditRow.adminEditRow = true;
    adminEditingRowData.value = row;
  } else {
    adminShowingEditRow.adminEditRow = false;
    adminEditingRowData.value = null;
  }
}

function adminEditRowError(error: string) {
  notify(error, "error");
}

async function adminEditSave(row: any) {
  try {
    await $fetch("/api/users/put/admin", {
      method: "PUT",
      body: {
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
      },
    });
    admins.refresh();
    notify("Edited admin user successfully.", "success");
  } catch (e) {
    console.log(e);
    notify("Error editing admin user.", "error");
  }
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
            @edit="toggleAdminEditingRow"
            @close-edit="toggleAdminEditingRow"
            @edit-save="adminEditSave"
            @edit-error="adminEditRowError"
          />
          <AddRow
            v-if="!adminShowingEditRow.adminEditRow"
            :type="'Admin'"
            @submit="adminNewUser"
            @error="adminAddRowError"
          />
        </Details>
      </div>
    </div>
  </NuxtLayout>
</template>
