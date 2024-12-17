<script setup lang="ts">
import type { User } from "@prisma/client";
import { UserPlusIcon } from "@heroicons/vue/24/solid";
import Table from "~/components/Table.vue";

const headers = ["First Name", "Last Name", "Email"];
const admins = await useFetch("/api/user/get/admins");
const rows = admins.data.value;

const headerKeyMap = {
  "First Name": "firstName",
  "Last Name": "lastName",
  Email: "email",
};

const showSecondaryPane = ref(true);
const showAddUserForm = ref(false);

function enableAddUserForm() {
  showAddUserForm.value = true;
}
function disableAddUserForm() {
  showAddUserForm.value = false;
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
    <div>
      <Details summary="Admins">
        <Table :headers="headers" :rows="rows" :headerKeyMap="headerKeyMap" />
      </Details>
    </div>
  </NuxtLayout>
</template>
