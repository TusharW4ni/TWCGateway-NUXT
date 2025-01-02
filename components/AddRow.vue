<script setup lang="ts">
import { UserPlusIcon, XMarkIcon, CheckIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  type: String,
});

const emits = defineEmits(["activated", "deactivated", "submit"]);

// Handle Esc key press to clear clickedRow
function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    toggleActivate();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

const activated = ref(false);

function toggleActivate() {
  console.log({ activated: activated });
  activated.value = !activated.value;
  if (activated.value === true) {
    emits("activated");
  } else {
    emits("deactivated");
  }
}

const adminAddRow = {
  firstName: "",
  lastName: "",
  email: "",
};

function adminSubmit(event: SubmitEvent) {
  event.preventDefault();
  emits("submit", adminAddRow);
  activated.value = false;
  emits("deactivated");
  adminAddRow.value = {
    firstName: "",
    lastName: "",
    email: "",
  };
}
</script>

<template>
  <div v-if="props.type === 'Admin'">
    <div v-if="!activated">
      <button
        class="w-full border-2 bg-gray-100 flex justify-center items-center mt-1 rounded-lg p-1 hover:border-gray-900 text-gray-400 hover:text-gray-900 hover:bg-white"
        @click="toggleActivate"
      >
        <UserPlusIcon class="w-5" />
      </button>
    </div>
    <div v-else class="border-2 rounded-lg overflow-auto mt-1">
      <form>
        <table class="w-full bg-white">
          <tr class="overflow-auto">
            <td class="p-2">
              <button
                class="border-2 border-gray-400 rounded px-3 py-1 bg-gray-300 hover:bg-white"
                @click="toggleActivate"
              >
                <XMarkIcon class="w-6" />
              </button>
            </td>
            <td class="p-2">
              <input
                v-model="adminAddRow.firstName"
                type="text"
                placeholder="First Name"
                class="border-2 border-gray-300 rounded px-2 py-1 min-w-min hover:border-twc-blue focus:outline-none focus:border-twc-blue bg-blue-100 focus:bg-white"
              />
            </td>
            <td class="p-2">
              <input
                v-model="adminAddRow.lastName"
                type="text"
                placeholder="Last Name"
                class="border-2 border-gray-300 rounded px-2 py-1 min-w-min hover:border-twc-blue focus:outline-none focus:border-twc-blue bg-blue-100 focus:bg-white"
              />
            </td>
            <td class="p-2">
              <input
                v-model="adminAddRow.email"
                type="text"
                placeholder="Email"
                class="border-2 border-gray-300 rounded px-2 py-1 min-w-min hover:border-twc-blue focus:outline-none focus:border-twc-blue bg-blue-100 focus:bg-white"
              />
            </td>
            <td class="p-2">
              <button
                type="submit"
                class="bg-gray-300 border-2 border-gray-500 rounded text-black px-3 py-1 hover:bg-twc-green hover:border-twc-green hover:text-white focus:outline-none focus:border-twc-green focus:bg-twc-green focus:text-white"
                @click="adminSubmit"
              >
                <CheckIcon class="w-6" />
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>
