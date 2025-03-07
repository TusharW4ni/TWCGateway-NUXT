<script setup lang="ts">
import { XMarkIcon, CheckIcon } from "@heroicons/vue/24/solid";
import type { Department } from "@prisma/client";

const { notify } = useToast();

const props = defineProps<{
  type: string;
}>();

const emits = defineEmits<{
  (event: "cancelAddRow"): void;
  (event: "submitAddRow", value: object): void;
}>();

const onEmRow = ref({
  firstName: "",
  lastName: "",
  email: "",
  departmentId: "",
});

let departments: Department;

if (props.type === "Onboarding Employee") {
  try {
    departments = await $fetch("/api/departments/get", {
      method: "GET",
    });
    console.log({ departments });
  } catch (e) {
    console.log({ error: e });
    notify("Error: Cannot fetch departments", "error");
  }
}

const departmentNames = departments.res.map((dep) => ({
  id: dep.id,
  title: dep.name,
}));

async function validateOnEm(row: any) {
  const emailRegex = /^.+@.+$/;
  if (row.firstName === "") {
    notify(
      "Error: Cannot add onboarding employee because of empty first name",
      "error"
    );
    return false;
  }
  if (row.lastName === "") {
    notify(
      "Error: Cannot add onboarding employee because of empty last name",
      "error"
    );
    return false;
  }
  if (row.email === "") {
    notify(
      "Error: Cannot add onboarding employee because of empty email",
      "error"
    );
    return false;
  }
  if (emailRegex.test(row.email)) {
    try {
      const user = await $fetch(`/api/users/get/${row.email}`);
      console.log({ user });
      if (Object.keys(user.user.res).length === 0) {
        console.log({ error: "inside of user.res.length" });
        notify("Error: User with this email already exists", "error");
        return false;
      }
    } catch (e) {
      notify("Error: Cannot fetch user based on email", "error");
      return false;
    }
  } else {
    notify("Error: Email not in correct structure", "error");
    return false;
  }
  return true;
}

async function handleOnEmSubmit() {
  const trimmedRow = {
    firstName: onEmRow.value.firstName.trim(),
    lastName: onEmRow.value.lastName.trim(),
    email: onEmRow.value.email.trim(),
    departmentId: onEmRow.value.departmentId.trim(),
  };
  if (await validateOnEm(trimmedRow)) {
    try {
      const res = await $fetch("/api/users/post/onEm", {
        method: "POST",
        body: {
          firstName: trimmedRow.firstName,
          lastName: trimmedRow.lastName,
          email: trimmedRow.email,
          departmentId: trimmedRow.departmentId,
        },
      });
      console.log({ res });
      // notify(`${res.then.}`)
    } catch (e) {
      console.log({ e });
      notify("Error: Cannot add onboarding employee, server error", "error");
    }
  }
}
</script>

<template>
  <!-- <form
    v-if="props.type === 'Onboarding Employee'"
    @submit.prevent="handleOnEmSubmit"
  > -->
  <table class="w-full">
    <tbody>
      <tr v-if="props.type === 'Onboarding Employee'" class="">
        <td class="">
          <button
            class="p-1 m-1 rounded-md bg-gray-200 hover:bg-gray-300"
            @click.stop="emits('cancelAddRow')"
          >
            <XMarkIcon class="w-6" />
          </button>
        </td>
        <td class="">
          <Input
            :class="''"
            :placeholder="'First Name'"
            v-model="onEmRow.firstName"
          />
        </td>
        <td class="">
          <Input
            :class="''"
            :placeholder="'Last Name'"
            v-model="onEmRow.lastName"
          />
        </td>
        <td class="">
          <Input :placeholder="'Email'" v-model="onEmRow.email" />
        </td>
        <td class="">
          <Select
            :type="'Department'"
            :options="departmentNames"
            v-model="onEmRow.departmentId"
          />
        </td>
        <td class="">
          <button
            @click.stop="handleOnEmSubmit"
            class="p-1 m-1 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            <CheckIcon class="w-6" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- </form> -->
</template>
