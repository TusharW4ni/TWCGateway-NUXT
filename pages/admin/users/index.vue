<script setup lang="ts">
import type { User } from "@prisma/client";
import { ref, watch } from "vue";

const headers = ["First Name", "Last Name", "Email"];
const admins = await useFetch("/api/user/get/admins");
const rows = ref<User[]>(admins.data.value || []);

const headerKeyMap = {
  "First Name": "firstName",
  "Last Name": "lastName",
  Email: "email",
};

function refreshUsers() {
  admins.refresh();
  watch(
    () => admins.data.value,
    (newValue) => {
      rows.value = newValue || [];
    }
  );
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
    <div class="md:flex md:justify-center">
      <Details summary="Admins" class="md:w-3/4">
        <UsersTable
          :headers="headers"
          :rows="rows"
          :headerKeyMap="headerKeyMap"
          :type="'Admin'"
          @save="refreshUsers"
        />
      </Details>
    </div>
  </NuxtLayout>
</template>
