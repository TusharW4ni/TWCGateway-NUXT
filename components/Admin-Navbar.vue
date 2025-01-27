<script lang="ts" setup>
import { ArrowRightStartOnRectangleIcon } from "@heroicons/vue/24/solid";

const isLoggingOut = ref(false);

function handleUsersButtonClick() {
  navigateTo("/admin/users");
}

function handleDepartmentsButtonClick() {
  navigateTo("/admin/departments");
}

function handleLogoutClick() {
  isLoggingOut.value = true;
  window.location.href = "/api/auth0/logout";
}
</script>

<template>
  <div class="flex w-full bg-gray-900 p-2">
    <img src="../assets/img/TWCGatewayLogo.svg" class="w-12" />
    <Button :type="'borderless'" @click="handleUsersButtonClick">
      Users
    </Button>
    <Button :type="'borderless'" @click="handleDepartmentsButtonClick">
      Departments
    </Button>
    <div class="w-full flex justify-end items-center">
      <Button
        v-if="!isLoggingOut"
        :type="'borderless'"
        class="p-2"
        @click="handleLogoutClick"
      >
        <!-- based on isLoggingOut change the image in the button -->
        <!-- <img src="/assets/blocks-shuffle-3.svg" /> -->
        <ArrowRightStartOnRectangleIcon class="w-6 h-6" />
      </Button>
      <Button
        v-else
        :type="'borderless'"
        class="p-2 bg-white hover:bg-white"
        @click="handleLogoutClick"
      >
        <img src="/assets/blocks-shuffle-3.svg" />
      </Button>
    </div>
  </div>
</template>
