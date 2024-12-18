<script setup lang="ts">
import { UserPlusIcon, XMarkIcon, CheckIcon } from "@heroicons/vue/24/solid";

import { toast, type ToastOptions } from "vue3-toastify";
// const notify = () => {
//   toast("Hello World 12345", {
//     autoClose: 5000,
//     position: toast.POSITION.TOP_CENTER,
//   } as ToastOptions);
// };

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
}>();

const headerKeyMap = props.headerKeyMap || {};
const isAddingRow = ref(false);
const newRow = ref<Row | null>(null);

const emits = defineEmits(["save"]);

function startAddingRow() {
  isAddingRow.value = true;
  newRow.value = {};
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
</script>

<template>
  <div class="relative">
    <button
      v-if="!isAddingRow && type === 'Admin'"
      @click="startAddingRow"
      class="mb-4 p-2 border-2 border-gray-300 rounded text-gray-300 bg-gray-100 hover:text-black hover:border-black hover:bg-white focus:outline-none focus:text-black focus:border-black focus:bg-white"
    >
      <UserPlusIcon class="h-5 w-5" />
    </button>
    <div class="border-2 rounded-lg border-gray-300 shadow-lg overflow-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th v-if="isAddingRow"></th>
            <th
              v-for="header in headers"
              :key="header"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
            <th v-if="isAddingRow"></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="row in rows"
            :key="row.id || row.email || JSON.stringify(row)"
          >
            <td v-if="isAddingRow"></td>
            <td
              v-for="header in headers"
              :key="header"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              {{ row[headerKeyMap[header] || header] }}
            </td>
            <td v-if="isAddingRow"></td>
          </tr>
          <tr v-if="isAddingRow && type === 'Admin'">
            <td class="px-6 py-4">
              <button
                @click="cancelAddingRow"
                class="text-red-500 border-2 border-red-500 bg-red-100 p-2 rounded focus:outline-none focus:bg-red-200 hover:bg-red-200"
              >
                <XMarkIcon class="h-5 w-5" />
              </button>
            </td>
            <td
              v-for="header in headers"
              :key="header"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              <input
                v-model="newRow[headerKeyMap[header] || header]"
                class="outline-none border-0 bg-gray-200 rounded p-2 focus:bg-white focus:ring-2 focus:ring-twc-purple"
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
  </div>
</template>
