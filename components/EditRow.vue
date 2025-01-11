<script setup lang="ts">
import { ref, computed } from "vue";
import { CheckIcon } from "@heroicons/vue/24/solid";
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

const props = defineProps({
  rowData: Object as PropType<any>,
  type: String,
});

const emits = defineEmits(["save"]);

const adminEditedRow = ref({
  id: props.rowData.id,
  firstName: props.rowData.firstName || "",
  lastName: props.rowData.lastName || "",
  email: props.rowData.email || "",
});

const errors = ref({
  firstName: "",
  lastName: "",
  email: "",
});

async function adminSaveChanges(event: SubmitEvent) {
  event.preventDefault();
  let hasError = false;

  // Reset errors
  errors.value.firstName = "";
  errors.value.lastName = "";
  errors.value.email = "";

  // Validate first name
  if (!adminEditedRow.value.firstName.trim()) {
    errors.value.firstName = "First name is required.";
    notify_error("First name is required.");
    hasError = true;
  }

  // Validate last name
  if (!adminEditedRow.value.lastName.trim()) {
    errors.value.lastName = "Last name is required.";
    notify_error("Last name is required.");
    hasError = true;
  }

  // Validate email
  if (adminEditedRow.value.email.trim()) {
    const isValid = await isValidEmail(adminEditedRow.value.email);
    if (!isValid) {
      errors.value.email = "Invalid email address or email already exists.";
      notify_error("Invalid email address or email already exists.");
      hasError = true;
    }
  } else {
    errors.value.email = "Email is required.";
    notify_error("Email is required.");
    hasError = true;
  }

  if (!hasError) {
    emits("save", adminEditedRow.value);
  }
}

async function isValidEmail(email: string): boolean {
  if (!(email === props.rowData.email)) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // return re.test(email);
    if (re.test(email)) {
      try {
        const response = await $fetch("/api/users/get/adminByEmail", {
          method: "GET",
          query: {
            email,
          },
        });
        console.log({ response });
        // console.log({ responseBoolean: response.user.id });
        if (response.user) {
          return false;
        } else {
          return true;
        }
      } catch (e) {
        console.log({ ErrorInTryCatchIsValidEmail: e });
        return false;
      }
    } else {
      return false;
    }
  } else {
    return true;
  }
}

const currUser = useCookie("currentUser");
const isCurrUser = computed(() => {
  return currUser.value?.email === props.rowData.email;
});
</script>

<template>
  <div
    v-if="type === 'Admin' && !isCurrUser"
    class="border-2 rounded-lg overflow-auto mt-2 shadow-lg"
  >
    <form @submit="adminSaveChanges">
      <table class="w-full bg-twc-blue">
        <tbody>
          <tr class="overflow-auto">
            <td class="p-2">
              <input
                v-model="adminEditedRow.firstName"
                type="text"
                class="p-2 rounded-lg bg-gray-200 outline-none border-2 border-blue-300 hover:border-blue-500 focus:border-black focus:bg-white"
              />
              <div v-if="errors.firstName" class="text-red-500 text-sm">
                {{ errors.firstName }}
              </div>
            </td>
            <td class="p-2">
              <input
                v-model="adminEditedRow.lastName"
                type="text"
                class="p-2 rounded-lg bg-gray-200 outline-none border-2 border-blue-300 hover:border-blue-500 focus:border-black focus:bg-white"
              />
              <div v-if="errors.lastName" class="text-red-500 text-sm">
                {{ errors.lastName }}
              </div>
            </td>
            <td class="p-2">
              <input
                v-model="adminEditedRow.email"
                type="email"
                class="p-2 rounded-lg bg-gray-200 outline-none border-2 border-blue-300 hover:border-blue-500 focus:border-black focus:bg-white"
              />
              <div v-if="errors.email" class="text-red-500 text-sm">
                {{ errors.email }}
              </div>
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
    <form>
      <table class="w-full bg-blue-100">
        <tbody>
          <tr class="overflow-auto flex justify-center items-center p-2">
            <td class="text-red-400 uppercase" colspan="3">
              Cannot Edit Yourself
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>
