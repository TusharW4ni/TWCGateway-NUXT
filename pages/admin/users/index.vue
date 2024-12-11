<script setup lang="ts">
import {
  UserPlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/vue/24/solid";
import Table from "~/components/Table.vue";

const headers = ["ID", "First Name", "Last Name", "Email"];
const rows = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@gmail.com",
  },
  {
    id: 3,
    firstName: "Admin",
    lastName: "",
    email: "admin@gmail.com",
  },
];

// Mapping between headers and row keys
const headerKeyMap: { [key: string]: keyof (typeof rows)[0] } = {
  ID: "id",
  "First Name": "firstName",
  "Last Name": "lastName",
  Email: "email",
};

interface TransformedRow {
  [key: string]: any;
}

// Transform rows to match the headers
const transformedRows = rows.map((row) => {
  const transformedRow: TransformedRow = {};
  for (const header of headers) {
    transformedRow[header] = row[headerKeyMap[header]];
  }
  return transformedRow;
});
</script>

<template>
  <NuxtLayout name="admin-navbar">
    <div
      class="flex flex-col h-[calc(100vh-4rem)] md:h-screen md:w-[calc(100vw-5rem)]"
    >
      <div class="m-3 p-3">
        <button
          class="flex justify-center items-center p-1 border border-gray-300 rounded hover:bg-opacity-50 hover:bg-gray-100"
        >
          <UserPlusIcon class="w-8" />
        </button>
      </div>
      <div class="flex h-full">
        <div
          class="border w-1/2 border-gray-300 m-3 p-3 rounded-lg overflow-auto"
        >
          <Details summary="Admins">
            <Table :headers="headers" :rows="transformedRows" />
          </Details>
        </div>
        <div
          class="border w-1/2 border-gray-300 m-3 p-3 rounded-lg overflow-auto"
        ></div>
      </div>
    </div>
  </NuxtLayout>
</template>
