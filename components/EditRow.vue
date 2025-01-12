<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/solid";
import { useAdminEditRowStore } from "../stores/useAdminEditRowStore.ts";
import { useRowClickedStore } from "../stores/useRowClickedStore.ts";

const { notify } = useToast();

const props = defineProps({
  rowData: Object as PropType<any>,
  type: String,
});

const emits = defineEmits(["save", "error"]);

const rowClickedStore = useRowClickedStore();

// ------------------ Admin ------------------------- //
const adminShowingEditRow = useAdminEditRowStore();
const currUser = useCookie("currentUser");
const isCurrUser = computed(() => {
  return currUser.value?.email === props.rowData.email;
});

const adminRow = {
  id: props.rowData.id,
  firstName: props.rowData.firstName || "",
  lastName: props.rowData.lastName || "",
  email: props.rowData.email || "",
};
const adminOgEmail = props.rowData.email;

async function isAdminEmailDuplicate() {
  try {
    console.log({ adminOgEmail });
    console.log({ adminRow });
    if (adminOgEmail === adminRow.email) {
      return false;
    }
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
    emits("error", "Error in editing admin user: Fields cannot be empty");
    return false;
  } else if (await isAdminEmailDuplicate()) {
    emits("error", "Error in editing admin user: Email is duplicated");
    return false;
  }
  return true;
}

async function adminSubmit() {
  if (await isAdminRowValid()) {
    emits("save", adminRow);
    adminShowingEditRow.adminEditRow = false;
    rowClickedStore.rowClicked = false;
  }
}
</script>

<template>
  <div
    v-if="type === 'Admin' && !isCurrUser"
    class="border-2 rounded-lg overflow-auto mt-2 shadow-lg"
  >
    <form @submit.prevent="adminSubmit()" @keydown.enter.prevent>
      <table class="w-full bg-twc-blue">
        <tbody>
          <tr class="overflow-auto">
            <td class="p-2">
              <input
                v-model="adminRow.firstName"
                type="text"
                class="p-2 rounded-lg bg-gray-200 outline-none border-2 border-blue-300 hover:border-blue-500 focus:border-black focus:bg-white"
              />
            </td>
            <td class="p-2">
              <input
                v-model="adminRow.lastName"
                type="text"
                class="p-2 rounded-lg bg-gray-200 outline-none border-2 border-blue-300 hover:border-blue-500 focus:border-black focus:bg-white"
              />
            </td>
            <td class="p-2">
              <input
                v-model="adminRow.email"
                type="email"
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
        </tbody>
      </table>
    </form>
  </div>
  <div
    v-if="type === 'Admin' && isCurrUser"
    class="border-2 rounded-lg overflow-auto mt-2 shadow-lg"
  >
    <table class="w-full bg-twc-blue">
      <tbody>
        <tr class="overflow-auto flex justify-center items-center p-2">
          <td
            class="text-red-400 uppercase font-bold text-sm tracking-wide"
            colspan="3"
          >
            <div class="bg-red-100 p-2 rounded">Cannot Edit Yourself</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
