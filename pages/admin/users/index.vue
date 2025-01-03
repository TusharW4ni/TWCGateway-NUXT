<script setup lang="ts">
import type { User } from "@prisma/client";
import { toast, type ToastOptions } from "vue3-toastify";

function notify_success(message: string) {
  toast(message, {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
    pauseOnHover: true,
    transition: "slide",
    progressStyle: {
      background: "purple",
    },
  } as ToastOptions);
}

function notify_error(message: string) {
  toast(message, {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
    pauseOnHover: true,
    transition: "slide",
    progressStyle: {
      background: "red",
    },
  } as ToastOptions);
}

const adminHeaders = ["First Name", "Last Name", "Email"];
const adminPageSize = ref(3);
const adminCurrentPage = ref(1);
const adminTotalPages = ref(1);
const adminRows = ref<User[]>([]);
const adminLoading = ref(false);
const adminLoadingTotalPages = ref(false);
const adminEditRow = ref(null);
const adminAddRow = ref(false);
const adminAddRowData = ref(null);

async function adminFetchAll() {
  try {
    adminLoading.value = true;
    const res = await $fetch(`/api/users/get/admins`, {
      method: "GET",
      query: {
        page: adminCurrentPage.value,
        pageSize: adminPageSize.value,
      },
    });
    adminRows.value = res.admins || [];
    adminLoading.value = false;
  } catch (e) {
    console.log(e);
    notify_error("Error fetching all Admins.");
    adminLoading.value = false;
  }
}

async function adminFetchTotalPages() {
  try {
    adminLoadingTotalPages.value = true;
    const res = await $fetch(`/api/users/get/admins-totalPages`, {
      method: "GET",
      query: {
        pageSize: adminPageSize.value,
      },
    });
    adminTotalPages.value = res.totalPages;
    adminLoadingTotalPages.value = false;
  } catch (e) {
    console.log(e);
    notify_error("Error fetching Admin's total pages.");
    adminLoadingTotalPages.value = false;
  }
}
adminFetchTotalPages();

// const fetchOnboardingEmployees = async () => {
//   const response = await $fetch(`/api/users/get/onboardingEmployees`, {
//     method: "GET",
//     query: {
//       page: 1,
//       pageSize: 3,
//     },
//   });
//   console.log({ OnboardingEmployees: response });
// };
// fetchOnboardingEmployees();

watch(
  [adminCurrentPage, adminPageSize],
  () => {
    adminFetchAll();
  },
  {
    immediate: true,
  }
);

function nextPage() {
  adminCurrentPage.value += 1;
}

function prevPage() {
  adminCurrentPage.value -= 1;
}

function onEditRow(row: any) {
  adminEditRow.value = row;
}
//start here
function onSaveEditRow(row: any) {
  try {
    const editedAdmin = $fetch("/api/users/put/admin", {
      method: "PUT",
      body: row,
    });
    notify_success("User Edited Successfully");
    adminFetchAll();
    onCloseEditRow();
  } catch (e) {
    console.log({ e });
    notify_error("Problem Editing User");
  }
}

function onCloseEditRow() {
  adminEditRow.value = null;
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    onCloseEditRow();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

function onAdminAddRow() {
  adminAddRow.value = true;
}

async function onAdminAddRowSubmit(row: any) {
  adminAddRowData.value = row;
  try {
    const newAdmin = await $fetch("/api/users/post/admin", {
      method: "POST",
      body: {
        firstName: adminAddRowData.value?.firstName,
        lastName: adminAddRowData.value?.lastName,
        email: adminAddRowData.value?.email,
      },
    });
    notify_success("Admin added successfully!");
    adminCurrentPage.value = 1;
    adminFetchAll();
    adminFetchTotalPages();
    onCancelAdminAddRow();
  } catch (e) {
    console.log({ ErrorInAddingAdming: e });
    notify_error("Error in adding new admin.");
  }
}

function onCancelAdminAddRow() {
  adminAddRow.value = false;
  adminAddRowData.value = null;
}
//stop here
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
    <div class="flex flex-col md:items-center">
      <Details summary="Onboarding Employees" class="md:w-3/4"> </Details>
    </div>
    <div class="flex flex-col md:items-center">
      <Details summary="Admins" class="md:w-3/4">
        <Pagination
          v-if="!adminEditRow && !adminAddRow"
          :currentPage="adminCurrentPage"
          :totalPages="adminTotalPages"
          :loading="adminLoadingTotalPages"
          v-on:nextPage="nextPage"
          v-on:prevPage="prevPage"
          class="mb-1"
        />
        <Table
          :headers="adminHeaders"
          :rows="adminRows"
          :loading="adminLoading"
          @editRow="onEditRow"
          @closeEditRow="onCloseEditRow"
        />
        <EditRow
          v-if="adminEditRow"
          :rowData="adminEditRow"
          :type="'Admin'"
          @save="onSaveEditRow"
        />
        <AddRow
          v-if="!adminEditRow"
          :type="'Admin'"
          @activated="onAdminAddRow"
          @deactivated="onCancelAdminAddRow"
          @submit="onAdminAddRowSubmit"
        />
      </Details>
    </div>
  </NuxtLayout>
</template>
