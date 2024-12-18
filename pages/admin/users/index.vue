<script setup lang="ts">
import type { User } from "@prisma/client";
import { ref } from "vue";
import Table from "~/components/Table.vue";

const headers = ["First Name", "Last Name", "Email"];
const admins = await useFetch("/api/user/get/admins");
const rows = ref(admins.data.value || []);

const headerKeyMap = {
  "First Name": "firstName",
  "Last Name": "lastName",
  Email: "email",
};

function addNewRow(newRow) {
  rows.value.push(newRow);
}

function cancelAddingRow() {
  // Logic if needed when a row addition is canceled
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
        <Table
          :headers="headers"
          :rows="rows"
          :headerKeyMap="headerKeyMap"
          @save="addNewRow"
        />
      </Details>
    </div>
  </NuxtLayout>
</template>
