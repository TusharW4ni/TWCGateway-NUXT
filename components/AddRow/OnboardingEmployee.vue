<script setup lang="ts">
import { XMarkIcon, CheckIcon } from "@heroicons/vue/24/solid";
import type { Department } from "@prisma/client";
import { validateNewOnEm } from "./validator.ts";

const { notify } = useToast();

const emits = defineEmits<{
  (event: "cancelAddRow"): void;
  (event: "submitAddRow", value: object): void;
  (event: "refresh"): void;
}>();

const row = ref({
  firstName: "",
  lastName: "",
  email: "",
  departmentId: "",
});

const departmentNames = ref<{ id: string; title: string }[]>([]);
const departments = await useFetch("/api/departments/get", {
  method: "GET",
  onRequestError({ error }) {
    console.log({ error });
    notify("Error: Cannot fetch departments", "error");
  },
  onResponse({ response }) {
    console.log({ response });
    departmentNames.value = response._data.res.map((dep: Department) => ({
      id: dep.id,
      title: dep.name,
    }));
  },
  onResponseError({ error }) {
    console.log({ error });
    notify("Error: Cannot fetch departments", "error");
  },
});

async function handleOnEmSubmit() {
  const trimmedRow = {
    firstName: row.value.firstName.trim(),
    lastName: row.value.lastName.trim(),
    email: row.value.email.trim(),
    departmentId: row.value.departmentId.trim(),
  };

  const errors = await validateNewOnEm(trimmedRow);
  console.log({ errors });
  if (errors.length > 0) {
    errors.forEach((error) => notify(error, "error"));
    return;
  }

  try {
    const res = await $fetch("/api/users/post/on-em", {
      method: "POST",
      body: {
        firstName: trimmedRow.firstName,
        lastName: trimmedRow.lastName,
        email: trimmedRow.email,
        departmentId: trimmedRow.departmentId,
      },
    });
    console.log({ res });
    notify(`Onboarding employee ${trimmedRow.firstName} added`, "success");
    emits("refresh");
  } catch (e) {
    console.log({ e });
    notify("Error: Cannot add onboarding employee, server error", "error");
  }
}
</script>

<template>
  <table class="w-full">
    <tbody>
      <tr class="">
        <td class="flex justify-center items-center">
          <button
            class="p-1 m-1 rounded-md bg-gray-200 hover:bg-gray-300"
            @click.stop="emits('cancelAddRow')"
          >
            <XMarkIcon class="w-6" />
          </button>
        </td>
        <td class="md:px-2 text-center">
          <Input
            :class="'w-full'"
            :placeholder="'First Name'"
            v-model="row.firstName"
          />
        </td>
        <td class="md:px-2 text-center">
          <Input
            :class="'w-full'"
            :placeholder="'Last Name'"
            v-model="row.lastName"
          />
        </td>
        <td class="md:px-2 text-center">
          <Input :class="'w-full'" :placeholder="'Email'" v-model="row.email" />
        </td>
        <td class="md:px-2 text-center">
          <Select
            v-if="departmentNames.length > 0"
            :type="'Department'"
            :options="departmentNames"
            v-model="row.departmentId"
          />
        </td>
        <td class="flex justify-center items-center">
          <button
            @click.stop="handleOnEmSubmit"
            class="p-1 m-1 rounded-md bg-gray-200 hover:bg-green-300 hover:text-green-700"
          >
            <CheckIcon class="w-6" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
