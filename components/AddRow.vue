<script setup lang="ts">
import { XMarkIcon, CheckIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
  type: string;
}>();

const onEmRow = ref({
  firstName: "",
  lastName: "",
  email: "",
  department: "",
});

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

const emits = defineEmits<{
  (event: "cancelAddRow"): void;
  (event: "submitAddRow", value: object): void;
}>();
</script>

<template>
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
            :modelValue="onEmRow.firstName"
          />
        </td>
        <td class="">
          <Input
            :class="''"
            :placeholder="'Last Name'"
            :modelValue="onEmRow.lastName"
          />
        </td>
        <td class="">
          <Input
            :class="''"
            :placeholder="'Email'"
            :modelValue="onEmRow.email"
          />
        </td>
        <td class="">
          <Select :type="'Department'" />
        </td>
        <td class="">
          <button
            class="p-1 m-1 rounded-md bg-gray-200 hover:bg-gray-300"
            @click.stop=""
          >
            <CheckIcon class="w-6" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
