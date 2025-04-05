<script setup lang="ts">
import { XMarkIcon, CheckIcon } from "@heroicons/vue/24/solid";
import { validateNewAdmin } from "./validator.ts";

const { notify } = useToast();

const emits = defineEmits<{
  (event: "cancelAddRow"): void;
  (event: "refresh"): void;
}>();

const row = ref({
  firstName: "",
  lastName: "",
  email: "",
});

async function handleOnEmSubmit() {
  const trimmedRow = {
    firstName: row.value.firstName.trim(),
    lastName: row.value.lastName.trim(),
    email: row.value.email.trim(),
  };

  const errors = await validateNewAdmin(trimmedRow);
  console.log({ errors });
  if (errors.length > 0) {
    errors.forEach((error) => notify(error, "error"));
    return;
  }

  try {
    const res = await $fetch("/api/users/post/admin", {
      method: "POST",
      body: {
        firstName: trimmedRow.firstName,
        lastName: trimmedRow.lastName,
        email: trimmedRow.email,
      },
    });
    console.log({ res });
    notify(`Admin ${trimmedRow.firstName} added`, "success");
    emits("refresh");
  } catch (e) {
    console.log({ e });
    notify("Error: Cannot add admin, server error", "error");
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
