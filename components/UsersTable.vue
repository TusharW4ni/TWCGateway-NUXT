<script setup lang="ts">
import {
  UserPlusIcon,
  XMarkIcon,
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/solid";
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

type Row = {
  [key: string]: any;
};

const props = defineProps<{
  headers: string[];
  rows: Row[];
  headerKeyMap?: Record<string, string>;
  type: String;
  currentPage: number;
  totalPages: number;
}>();

const headerKeyMap = props.headerKeyMap || {};
const isAddingRow = ref(false);
const newRow = ref<Row | null>(null);

const isEditingRow = ref(false);
const editingRow = ref<Row | null>(null);

const emits = defineEmits(["save", "nextPage", "prevPage"]);

function startAddingRow() {
  isAddingRow.value = true;
  newRow.value = {};
}

function startEditingRow(row: Row) {
  console.log({ row });
  isEditingRow.value = true;
  editingRow.value = row;
}

function cancelEditingRow() {
  isEditingRow.value = false;
  editingRow.value = null;
}

function saveEditedRow() {
  if (editingRow.value) {
    console.log({ editingRow: editingRow.value });
    isEditingRow.value = false;
    editingRow.value = null;
  }
}

function cancelAddingRow() {
  isAddingRow.value = false;
  newRow.value = null;
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

async function saveNewRow() {
  if (newRow.value) {
    let firstName = newRow.value.firstName;
    let lastName = newRow.value.lastName;
    let email = newRow.value.email;

    if (!firstName || !lastName || !email) {
      notify_error("All fields are required.");
      return;
    }

    firstName = newRow.value.firstName.trim();
    lastName = newRow.value.lastName.trim();
    email = newRow.value.email;

    if (/\s/.test(firstName) || /\s/.test(lastName)) {
      notify_error("First name and last name should not contain spaces.");
      return;
    }

    if (!isValidEmail(email)) {
      notify_error("Please enter a valid email address.");
      return;
    }

    try {
      const res = await $fetch("/api/user/post/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          firstName,
          lastName,
          email,
        },
      });
      console.log({ res });
      emits("save");
      notify_success("User added successfully!");
    } catch (e) {
      console.error(e);
    }
    isAddingRow.value = false;
    newRow.value = null;
  }
}

const disableNextPage = computed(() => props.currentPage >= props.totalPages);
const disablePrevPage = computed(() => props.currentPage <= 1);

function nextPage() {
  if (!disableNextPage.value) {
    emits("nextPage");
  }
}

function prevPage() {
  if (!disablePrevPage.value) {
    emits("prevPage");
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (isEditingRow.value && event.key === "Escape") {
    cancelEditingRow();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});

const currentUser = useCookie("currentUser");
</script>

<template>
  <div class="relative">
    <!--Pagination Bar -->
    <div
      class="border-2 rounded-lg border-gray-300 overflow-auto mb-1 flex justify-center items-center bg-white"
    >
      <button
        class="border-2 border-gray-300 rounded text-gray-300 bg-gray-100 hover:text-black hover:border-black hover:bg-white flex justify-center items-center p-2 m-2 disabled:cursor-not-allowed disabled:hover:text-gray-300 disabled:hover:border-gray-300 disabled:hover:bg-gray-100"
        @click="prevPage"
        :disabled="disablePrevPage"
      >
        <ChevronLeftIcon class="h-5 w-5" />
      </button>
      <span class="rounded p-2 m-2 bg-gray-100 text-black">
        {{ props.currentPage }}/{{ props.totalPages }}
      </span>
      <button
        class="border-2 border-gray-300 rounded text-gray-300 bg-gray-100 hover:text-black hover:border-black hover:bg-white flex justify-center items-center p-2 m-2 disabled:cursor-not-allowed disabled:hover:text-gray-300 disabled:hover:border-gray-300 disabled:hover:bg-gray-100"
        @click="nextPage"
        :disabled="disableNextPage"
      >
        <ChevronRightIcon class="h-5 w-5" />
      </button>
    </div>
    <div class="border-2 rounded-lg border-gray-300 shadow-lg overflow-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th v-if="!isAddingRow"></th>
            <th v-if="isAddingRow"></th>
            <th
              v-for="header in props.headers"
              :key="header"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
            <th v-if="isAddingRow"></th>
            <th v-if="!isAddingRow"></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <!--Data Row -->
          <tr
            v-for="row in props.rows"
            :key="row.id || row.email || JSON.stringify(row)"
          >
            <td
              class="flex justify-center items-center py-4"
              v-if="!isAddingRow"
            >
              <button
                v-if="!isEditingRow && currentUser.email !== row.email"
                class="p-2"
                @click="startEditingRow(row)"
              >
                <PencilSquareIcon class="h-5 w-5 hover:text-twc-blue" />
              </button>
              <button
                v-if="isEditingRow && editingRow.id === row.id"
                class="text-red-500 border-2 border-red-500 bg-red-100 p-2 rounded focus:outline-none focus:bg-red-200 hover:bg-red-200"
                @click="cancelEditingRow"
              >
                <XMarkIcon class="h-5 w-5 hover:text-red-500" />
              </button>
            </td>
            <td v-if="isAddingRow"></td>
            <td
              v-if="isEditingRow && editingRow.id === row.id"
              v-for="header in props.headers"
              :key="header"
            >
              <input
                v-model="editingRow[headerKeyMap[header] || header]"
                class="w-full outline-none border-0 bg-gray-200 rounded p-2 focus:bg-white focus:ring-2 focus:ring-twc-purple"
                type="text"
                :placeholder="header"
              />
            </td>
            <td
              v-if="!isEditingRow || editingRow.id !== row.id"
              v-for="header in props.headers"
              :key="header"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              {{ row[headerKeyMap[header] || header] }}
            </td>
            <td v-if="isAddingRow"></td>
            <td
              class="flex justify-center items-center py-4"
              v-if="!isAddingRow"
            >
              <button
                v-if="!isEditingRow && currentUser.email !== row.email"
                class="p-2"
              >
                <TrashIcon class="h-5 w-5 hover:text-red-500" />
              </button>
              <button
                v-if="isEditingRow && editingRow.id === row.id"
                class="text-green-500 border-2 border-green-500 bg-green-100 p-2 rounded focus:outline-none focus:bg-green-200 hover:bg-green-200"
                @click="saveEditedRow"
              >
                <CheckIcon class="h-5 w-5 hover:text-green-500" />
              </button>
            </td>
          </tr>
          <!--Add Admin Row -->
          <tr v-if="isAddingRow && props.type === 'Admin'">
            <td class="px-6 py-4">
              <button
                @click="cancelAddingRow"
                class="text-red-500 border-2 border-red-500 bg-red-100 p-2 rounded focus:outline-none focus:bg-red-200 hover:bg-red-200"
              >
                <XMarkIcon class="h-5 w-5" />
              </button>
            </td>
            <td
              v-for="header in props.headers"
              :key="header"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              <input
                v-model="newRow[headerKeyMap[header] || header]"
                class="w-full outline-none border-0 bg-gray-200 rounded p-2 focus:bg-white focus:ring-2 focus:ring-twc-purple"
                type="text"
                :placeholder="header"
              />
            </td>
            <td class="px-6 py-4">
              <button
                @click="saveNewRow"
                class="text-green-500 border-2 border-green-500 bg-green-100 p-2 rounded focus:outline-none focus:bg-green-200 hover:bg-green-200"
              >
                <CheckIcon class="h-5 w-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button
      v-if="!isAddingRow && props.type === 'Admin'"
      @click="startAddingRow"
      class="w-full mt-1 p-1 border-2 border-gray-300 rounded text-gray-300 bg-gray-100 hover:text-black hover:border-black hover:bg-white focus:outline-none focus:text-black focus:border-black focus:bg-white flex justify-center items-center"
    >
      <UserPlusIcon class="h-5 w-5" />
    </button>
  </div>
</template>
