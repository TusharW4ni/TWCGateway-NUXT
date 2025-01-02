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

const headers = ["First Name", "Last Name", "Email"];
const pageSize = ref(3);
const currentPage = ref(1);
const totalPages = ref(1);
const rows = ref<User[]>([]);

const loadingAdmins = ref(false);
const loadingAdminTotalPages = ref(false);

const editAdminRow = ref(null);

const fetchAdmins = async () => {
  loadingAdmins.value = true;
  const response = await $fetch(`/api/users/get/admins`, {
    method: "GET",
    query: {
      page: currentPage.value,
      pageSize: pageSize.value,
    },
  });
  console.log({ Admins: response });
  rows.value = response.admins || [];

  loadingAdmins.value = false;
};

const fetchAdminsTotalPages = async () => {
  loadingAdminTotalPages.value = true;
  const response = await $fetch(`/api/users/get/admins-totalPages`, {
    method: "GET",
    query: {
      pageSize: pageSize.value,
    },
  });

  totalPages.value = response.totalPages;
  loadingAdminTotalPages.value = false;
};
fetchAdminsTotalPages();

const fetchOnboardingEmployees = async () => {
  const response = await $fetch(`/api/users/get/onboardingEmployees`, {
    method: "GET",
    query: {
      page: 1,
      pageSize: 1,
    },
  });
  console.log({ OnboardingEmployees: response });
};
fetchOnboardingEmployees();

watch(
  [currentPage, pageSize],
  () => {
    fetchAdmins();
  },
  {
    immediate: true,
  }
);

function nextPage() {
  currentPage.value += 1;
}

function prevPage() {
  currentPage.value -= 1;
}

function onEditRow(row: any) {
  // console.log("A row has been selected", row);
  editAdminRow.value = row;
}

function onSaveEditRow(row: any) {
  try {
    const editedAdmin = $fetch("/api/users/put/admin", {
      method: "PUT",
      body: row,
    });
    notify_success("User Edited Successfully");
    fetchAdmins();
    onCloseEditRow();
  } catch (e) {
    console.log({ e });
    notify_error("Problem Editing User");
  }
}

function onCloseEditRow() {
  editAdminRow.value = null;
}

// Handle Esc key press to clear clickedRow
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

const adminAddRow = ref(false);
const adminAddRowData = ref(null);

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
    fetchAdmins();
    fetchAdminsTotalPages();
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
      <Details summary="Admins" class="md:w-3/4">
        <Pagination
          v-if="!editAdminRow && !adminAddRow"
          :currentPage="currentPage"
          :totalPages="totalPages"
          :loading="loadingAdminTotalPages"
          v-on:nextPage="nextPage"
          v-on:prevPage="prevPage"
          class="mb-1"
        />
        <Table
          :headers="headers"
          :rows="rows"
          :loading="loadingAdmins"
          @editRow="onEditRow"
          @closeEditRow="onCloseEditRow"
        />
        <EditRow
          v-if="editAdminRow"
          :rowData="editAdminRow"
          :type="'Admin'"
          @save="onSaveEditRow"
        />
        <AddRow
          v-if="!editAdminRow"
          :type="'Admin'"
          @activated="onAdminAddRow"
          @deactivated="onCancelAdminAddRow"
          @submit="onAdminAddRowSubmit"
        />
      </Details>
    </div>
  </NuxtLayout>
</template>
