<script lang="ts" setup>
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/vue/24/solid";
import Input from "@/components/Input.vue";

const props = defineProps<{
  headers: string[];
  data: any[];
  type: string;
  loading: boolean;
  currentPage: number;
  totalPages: number;
}>();

const emits = defineEmits<{
  (event: "prevPage"): void;
  (event: "nextPage"): void;
  (event: "searchString", value: string): void;
  (event: "deleteRow", value: object): void;
}>();

const searchQuery = ref("");
const selectedRow = ref(null);
const isDataEmpty = ref(false);
const addingRow = ref(false);

const disablePagination = ref(false);
const disableSearch = ref(false);
const trashClickedOn = ref(null);

watch(searchQuery, (newVal) => {
  emits("searchString", newVal);
});

watch(
  () => props.data,
  (newData) => {
    if (newData.length === 0) {
      isDataEmpty.value = true;
    } else {
      isDataEmpty.value = false;
    }
  }
);

const mapHeaderToKey = (header: string) => {
  return header
    .toLowerCase()
    .replace(/\s(.)/g, (match, group1) => group1.toUpperCase())
    .replace(/\s+/g, "");
};

function handleRowClick(row: any) {
  if (addingRow.value) return;
  disableSearch.value = true;
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
  <!-- Pagination -->
  <div
    class="flex justify-center items-center p-2 rounded-t bg-white border-l border-r border-t border-black space-x-1"
  >
    <button
      class="py-1 px-2 rounded hover:bg-gray-300 disabled:text-gray-300 disabled:hover:bg-white disabled:cursor-not-allowed"
      @click="handlePrevPage"
      :disabled="props.currentPage === 1 || disablePagination"
    >
      <ChevronLeftIcon class="w-6 h-6" />
    </button>

    <span class="flex justify-center items-center rounded p-1 bg-gray-100">
      {{ props.currentPage }}/{{ props.totalPages }}
    </span>

    <button
      class="py-1 px-2 rounded hover:bg-gray-300 disabled:text-gray-300 disabled:hover:bg-white disabled:cursor-not-allowed"
      @click="handleNextPage"
      :disabled="props.currentPage === props.totalPages || disablePagination"
    >
      <ChevronRightIcon class="w-6 h-6" />
    </button>
  </div>

  <!-- Search -->
  <div class="flex p-2 bg-white border-l border-r border-t border-black">
    <MagnifyingGlassIcon
      :class="disableSearch ? 'w-6 h-6 mr-2 text-gray-300' : 'w-6 h-6 mr-2'"
    />
    <Input
      :class="'w-full'"
      placeholder="Search"
      v-model:modelValue="searchQuery"
      :isDisabled="disableSearch"
    />
  </div>

  <div class="overflow-auto">
    <!-- Table -->
    <table class="min-w-full bg-white border border-black">
      <thead class="bg-gray-500">
        <tr>
          <th v-if="selectedRow || addingRow"></th>
          <th
            v-for="header in props.headers"
            :key="header"
            class="uppercase text-sm tracking-wide px-4 py-2 text-center text-white font-semibold"
          >
            {{ header }}
          </th>
          <th v-if="addingRow"></th>
        </tr>
      </thead>

      <!-- Data loading -->
      <tbody v-if="props.loading">
        <tr>
          <td :colspan="props.headers.length" class="py-4">
            <div class="flex justify-center items-center">
              <img src="/assets/blocks-shuffle-3.svg" alt="Loading..." />
            </div>
          </td>
        </tr>
      </tbody>

      <!-- Show data -->
      <tbody v-if="!isDataEmpty && !props.loading" class="">
        <tr
          v-for="row in props.data"
          :key="row.email"
          :class="
            selectedRow || addingRow
              ? selectedRow === row
                ? 'bg-gray-300'
                : 'bg-white'
              : 'bg-white cursor-pointer hover:bg-gray-100'
          "
          @click="handleRowClick(row)"
        >
          <td
            v-if="addingRow"
            class="px-4 py-2 border-t border-gray-300 text-center"
          ></td>
          <td
            v-if="selectedRow"
            :class="
              selectedRow === row
                ? 'px-4 py-2 border-t border-gray-300 bg-gray-500'
                : 'px-4 py-2 border-t border-gray-300'
            "
          >
            <div class="flex space-x-3 md:space-x-0 md:justify-between">
              <button
                v-if="selectedRow === row"
                class="p-1 rounded-md bg-gray-200 hover:bg-gray-300"
                @click.stop="
                  selectedRow = null;
                  disableSearch = false;
                "
              >
                <XMarkIcon class="w-6" />
              </button>
              <button
                v-if="selectedRow === row"
                class="px-7 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                <PencilSquareIcon class="w-6" />
              </button>
              <button
                v-if="selectedRow === row"
                class="p-1 rounded-md bg-gray-200 hover:bg-red-300"
                @click.stop="trashClickedOn = row"
              >
                <TrashIcon class="w-6" />
              </button>
            </div>
          </td>

          <td
            v-for="header in props.headers"
            :key="header"
            class="px-4 py-2 border-t border-gray-300 text-center"
          >
            {{ row[mapHeaderToKey(header)] }}
          </td>
          <td
            v-if="addingRow"
            class="px-4 py-2 border-t border-gray-300 text-center"
          ></td>
        </tr>
        <tr>
          <td :colspan="props.headers.length + 2">
            <div v-if="!selectedRow && !addingRow" class="mt-1">
              <button
                @click="
                  addingRow = true;
                  disablePagination = true;
                  disableSearch = true;
                "
                class="flex justify-center items-center w-full border border-gray-200 rounded hover:bg-gray-200 hover:border-black"
              >
                <PlusIcon class="w-6 h-6" />
              </button>
            </div>
            <AddRow
              v-if="addingRow"
              :type="props.type"
              @cancelAddRow="
                addingRow = false;
                disablePagination = false;
                disableSearch = false;
              "
            />
          </td>
        </tr>
      </tbody>

      <!-- No data available -->
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
    </table>

    <!-- Delete Model -->
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
