<script setup lang="ts">
import { PlusIcon, XMarkIcon, CheckIcon } from "@heroicons/vue/24/solid";
import { useRowClickedStore } from "../stores/useRowClickedStore.ts";
import { useAddRowStore } from "../stores/useAddRowStore.ts";

const props = defineProps({
  type: String,
});
const rowClickedStore = useRowClickedStore();
const addRowStore = useAddRowStore();
const activated = ref(false);

const emits = defineEmits(["activated", "deactivated", "submit", "error"]);

function toggleActivate() {
  activated.value = !activated.value;
  if (activated.value === true) {
    addRowStore.addingRow = true;
    emits("activated");
  } else {
    addRowStore.addingRow = false;
    emits("deactivated");
    if (props.type === "Admin") clearAdminRow();
  }
}

// ------------------ Admin ------------------------- //
let adminRow = {
  firstName: "",
  lastName: "",
  email: "",
};

function clearAdminRow() {
  adminRow = {
    firstName: "",
    lastName: "",
    email: "",
  };
}

async function isAdminEmailDuplicate() {
  try {
    const user = await $fetch("/api/users/get/adminByEmail", {
      method: "GET",
      query: {
        email: adminRow.email,
      },
    });
    if (user.user === null) {
      return false;
    }
    return true;
  } catch (e) {
    console.log(e);
    return true;
  }
}

async function isAdminRowValid() {
  adminRow.firstName = adminRow.firstName.trim();
  adminRow.lastName = adminRow.lastName.trim();
  adminRow.email = adminRow.email.trim();
  if (
    adminRow.firstName === "" ||
    adminRow.lastName === "" ||
    adminRow.email === ""
  ) {
    emits("error", "Error adding admin user: Values cannot be empty.");
    return false;
  } else if (await isAdminEmailDuplicate()) {
    emits("error", "Error adding admin user: Email is duplicate.");
    return false;
  }
  return true;
}

async function adminSubmit() {
  if (await isAdminRowValid()) {
    emits("submit", adminRow);
    toggleActivate();
    emits("deactivated");
    clearAdminRow();
  }
}
</script>

<template>
  <div v-if="props.type === 'Admin'">
    <div v-if="!rowClickedStore.rowClicked">
      <div v-if="!activated">
        <button
          class="w-full border-2 bg-gray-100 flex justify-center items-center mt-1 rounded-lg p-1 hover:border-gray-900 text-gray-900 hover:text-gray-900 hover:bg-white"
          @click="toggleActivate"
        >
          <PlusIcon class="w-4" />
        </button>
      </div>
      <div v-else class="border-2 rounded-lg overflow-auto mt-1">
        <form @submit.prevent="adminSubmit()" @keydown.enter.prevent>
          <table class="w-full bg-twc-blue">
            <tr class="overflow-auto">
              <td class="p-2">
                <button
                  class="p-2 border rounded text-white hover:bg-white hover:text-black"
                  @click="toggleActivate"
                >
                  <XMarkIcon class="w-6" />
                </button>
              </td>
              <td class="p-2">
                <input
                  v-model="adminRow.firstName"
                  type="text"
                  placeholder="First Name"
                  class="p-2 rounded-lg bg-gray-200 outline-none border-2 border-blue-300 hover:border-blue-500 focus:border-black focus:bg-white"
                />
              </td>
              <td class="p-2">
                <input
                  v-model="adminRow.lastName"
                  type="text"
                  placeholder="Last Name"
                  class="p-2 rounded-lg bg-gray-200 outline-none border-2 border-blue-300 hover:border-blue-500 focus:border-black focus:bg-white"
                />
              </td>
              <td class="p-2">
                <input
                  v-model="adminRow.email"
                  type="email"
                  placeholder="Email"
                  class="p-2 rounded-lg bg-gray-200 outline-none border-2 border-blue-300 hover:border-blue-500 focus:border-black focus:bg-white"
                />
              </td>
              <td class="p-2">
                <button
                  type="submit"
                  class="p-2 border text-white rounded-lg hover:bg-white hover:text-twc-green"
                >
                  <CheckIcon class="w-6" />
                </button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  </div>
</template>
