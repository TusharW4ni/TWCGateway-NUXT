<script lang="ts" setup>
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  BuildingOffice2Icon,
} from "@heroicons/vue/24/solid";

const isLoggingOut = ref(false);
const menuOpened = ref(false);
const currentUserRole = useCookie("currentUser").value?.role;

async function handleButtonClicked(button: string) {
  if (button === "users") {
    await navigateTo("/admin/users");
  } else if (button === "departments") {
    await navigateTo("/admin/departments");
  } else if (button === "logout") {
    isLoggingOut.value = true;
    window.location.href = "/api/auth0/logout";
  }
}
</script>

<template>
  <div v-if="currentUserRole === 'Admin'">
    <div class="flex p-3 bg-gray-900 text-white">
      <img src="../assets/TWCGatewayLogo.svg" class="w-24 md:w-36" />
      <div class="flex items-center w-full overflow-auto p-3">
        <button
          @click="handleButtonClicked('users')"
          class="px-4 py-2 md:mx-3 rounded-lg hover:bg-gray-800 hidden md:block"
        >
          <div class="flex items-center justify-center space-x-2">
            <span class=""><UserIcon class="w-6" /></span>
            <span class="text-lg font-semibold"> Users </span>
          </div>
        </button>
        <button
          @click="handleButtonClicked('departments')"
          class="px-4 py-2 md:mx-3 rounded-lg hover:bg-gray-800 hidden md:block"
        >
          <div class="flex items-center justify-center space-x-2">
            <span class=""><BuildingOffice2Icon class="w-6" /></span>
            <span class="text-lg font-semibold"> Departments </span>
          </div>
        </button>
      </div>
      <div class="flex justify-center items-center p-3">
        <button
          v-if="!isLoggingOut"
          @click="handleButtonClicked('logout')"
          class="px-4 py-2 mx-3 rounded-lg hover:bg-gray-800 hidden md:block"
        >
          <ArrowRightStartOnRectangleIcon class="w-6 h-6" />
        </button>
        <button
          v-else
          @click="handleButtonClicked('logout')"
          class="px-4 py-2 mx-3 rounded-lg bg-white hover:bg-white hidden md:block"
        >
          <img src="/assets/blocks-shuffle-3.svg" class="w-12" />
        </button>
        <button
          @click="menuOpened = true"
          class="px-4 py-2 mx-3 rounded-lg hover:bg-gray-800 block md:hidden"
        >
          <Bars3Icon class="w-6 h-6" />
        </button>
      </div>
    </div>
    <div
      v-if="menuOpened"
      @click.self="menuOpened = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 block md:hidden"
    >
      <div
        class="fixed right-0 top-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out block md:hidden"
      >
        <div
          class="flex justify-between items-center p-4 border-b border-gray-700"
        >
          <h2 class="text-white text-lg font-semibold">Menu</h2>
          <button
            @click="menuOpened = false"
            class="text-white hover:text-gray-400"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        <div class="p-4 flex flex-col space-y-4">
          <button
            @click="
              handleButtonClicked('users');
              menuOpened = false;
            "
            class="w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg"
          >
            <div class="flex items-center space-x-2">
              <span class=""><UserIcon class="w-6" /></span>
              <span class="text-lg font-semibold"> Users </span>
            </div>
          </button>
          <button
            @click="
              handleButtonClicked('departments');
              menuOpened = false;
            "
            class="w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg"
          >
            <div class="flex items-center space-x-2">
              <span class=""><BuildingOffice2Icon class="w-6" /></span>
              <span class="text-lg font-semibold"> Departments </span>
            </div>
          </button>
          <button
            @click="
              handleButtonClicked('logout');
              menuOpened = false;
            "
            class="w-full text-left px-4 py-2 text-white hover:bg-red-600 rounded-lg"
          >
            <div class="flex items-center space-x-2">
              <span class=""
                ><ArrowRightStartOnRectangleIcon class="w-6"
              /></span>
              <span class="text-lg font-semibold"> Logout </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
