<script lang="ts" setup>
// pagination, search, add, edit, and delete would like to do all in table.
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/vue/24/solid";
import Input from "@/components/Input.vue";

const props = defineProps<{
  headers: string[];
  data: any[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
}>();

const searchQuery = ref("");
const selectedRow = ref(null);
const isDataEmpty = ref(false);
const trashClickedOn = ref(null);

const emits = defineEmits<{
  (event: "prevPage"): void;
  (event: "nextPage"): void;
  (event: "searchString", value: string): void;
  (event: "deleteRow", value: object): void;
}>();

watch(searchQuery, (newVal) => {
  emits("searchString", newVal);
});

watch(
  () => props.data,
  (newData) => {
    if (newData.length === 0) {
      isDataEmpty.value = true;
      console.log("data is empty");
    } else {
      isDataEmpty.value = false;
      console.log("data is not empty");
    }
  },
  { deep: true }
);

const mapHeaderToKey = (header: string) => {
  return header
    .toLowerCase()
    .replace(/\s(.)/g, (match, group1) => group1.toUpperCase())
    .replace(/\s+/g, "");
};

function handleRowClick(row: any) {
  if (selectedRow.value === null) {
    selectedRow.value = row;
    console.log("selectedRow", selectedRow.value);
  }
}

function handlePrevPage() {
  selectedRow.value = null;
  if (props.currentPage === 1) return;
  emits("prevPage");
}

function handleNextPage() {
  selectedRow.value = null;
  if (props.currentPage === props.totalPages) return;
  emits("nextPage");
}

function handleDeleteConfirmed(row: any) {
  console.log("deleting", row);
  emits("deleteRow", row);
  trashClickedOn.value = null;
}
</script>

<template>
  <div
    class="flex justify-center items-center p-2 rounded-t bg-white border-l border-r border-t border-black space-x-1"
  >
    <button
      class="py-1 px-2 rounded hover:bg-gray-300 disabled:text-gray-300 disabled:hover:bg-white disabled:cursor-not-allowed"
      @click="handlePrevPage"
      :disabled="props.currentPage === 1"
    >
      <ChevronLeftIcon class="w-6 h-6" />
    </button>

    <span class="flex justify-center items-center rounded p-1 bg-gray-100">
      {{ props.currentPage }}/{{ props.totalPages }}
    </span>

    <button
      class="py-1 px-2 rounded hover:bg-gray-300 disabled:text-gray-300 disabled:hover:bg-white disabled:cursor-not-allowed"
      @click="handleNextPage"
      :disabled="props.currentPage === props.totalPages"
    >
      <ChevronRightIcon class="w-6 h-6" />
    </button>
  </div>

  <div class="flex p-2 bg-white border-l border-r border-t border-black">
    <MagnifyingGlassIcon class="w-6 h-6 mr-2" />
    <Input
      placeholder="Search"
      v-model:modelValue="searchQuery"
      :isDisabled="selectedRow ? true : false"
    />
  </div>

  <div class="overflow-auto">
    <table class="min-w-full bg-white border border-black">
      <thead class="bg-gray-500">
        <tr>
          <th v-if="selectedRow"></th>
          <th v-if="selectedRow"></th>
          <th
            v-for="header in props.headers"
            :key="header"
            class="uppercase text-sm tracking-wide px-4 py-2 text-center text-white font-semibold"
          >
            {{ header }}
          </th>
          <th v-if="selectedRow"></th>
        </tr>
      </thead>
      <tbody v-if="!isDataEmpty && !props.loading">
        <tr
          v-for="row in props.data"
          :key="row.email"
          :class="
            selectedRow
              ? 'bg-white'
              : 'bg-white cursor-pointer hover:bg-gray-100'
          "
          @click="handleRowClick(row)"
        >
          <td v-if="selectedRow" class="px-4 py-2 border-t border-gray-300">
            <button
              v-if="selectedRow === row"
              class="p-1 rounded-md bg-gray-200 hover:bg-gray-300"
              @click.stop="selectedRow = null"
            >
              <XMarkIcon class="w-6 mx-auto" />
            </button>
          </td>
          <td v-if="selectedRow" class="px-4 py-2 border-t border-gray-300">
            <button
              v-if="selectedRow === row"
              class="p-1 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              <PencilSquareIcon class="w-6 mx-auto" />
            </button>
          </td>
          <td
            v-for="header in props.headers"
            :key="header"
            class="px-4 py-2 border-t border-gray-300 text-center"
          >
            {{ row[mapHeaderToKey(header)] }}
          </td>
          <td v-if="selectedRow" class="px-4 py-2 border-t border-gray-300">
            <button
              v-if="selectedRow === row"
              class="p-1 rounded-md bg-gray-200 hover:bg-red-300"
              @click.stop="trashClickedOn = row"
            >
              <TrashIcon class="w-6" />
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-if="isDataEmpty && !props.loading">
        <tr>
          <td
            :colspan="props.headers.length"
            class="text-center text-gray-500 py-4"
          >
            No data available
          </td>
        </tr>
      </tbody>
      <tbody v-if="props.loading">
        <tr>
          <td :colspan="props.headers.length" class="py-4">
            <div class="flex justify-center items-center">
              <img src="/assets/blocks-shuffle-3.svg" alt="Loading..." />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="trashClickedOn"
      class="bg-black bg-opacity-50 fixed top-0 left-0 w-screen h-screen flex justify-center items-center"
      @click.stop="trashClickedOn = null"
    >
      <div
        class="flex flex-col overflow-auto bg-white border border-black rounded-md w-3/4 h-1/2 md:w-1/2 md:h-1/4"
        @click.stop=""
      >
        <div class="h-1/2">
          <div class="text-black text-2xl p-2">Are you sure?</div>
          <div class="text-red-500 p-2">This action cannot be undone.</div>
        </div>
        <div class="flex justify-center items-end space-x-10 p-2 h-1/2">
          <button
            class="py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300"
            @click.stop="trashClickedOn = null"
          >
            <XMarkIcon class="w-6" />
          </button>
          <button
            class="py-2 px-4 rounded-md bg-gray-200 hover:bg-red-300"
            @click.stop="handleDeleteConfirmed(trashClickedOn)"
          >
            <TrashIcon class="w-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
