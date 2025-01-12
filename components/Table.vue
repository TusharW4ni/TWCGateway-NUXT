<script setup lang="ts">
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  NoSymbolIcon,
} from "@heroicons/vue/24/solid";
import { useRowClickedStore } from "../stores/useRowClickedStore.ts";
import { useAddRowStore } from "../stores/useAddRowStore.ts";

const props = defineProps<{
  headers: string[];
  rows: Row[];
  loading: boolean;
}>();

console.log({ rows: props.rows });

type Row = {
  [key: string]: any;
};

function getRowValue(row: Row, header: string): any {
  const camelCaseKey = header
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
  return row[camelCaseKey];
}

const rowClickedStore = useRowClickedStore();
const addRowStore = useAddRowStore();
const isRowClicked = <Row>ref("");
const isEditing = ref(false);
const editingRowData = <Row>ref(null);
const emits = defineEmits([
  "edit",
  "close-edit",
  "search",
  "edit-save",
  "edit-error",
]);
const showSearch = ref(false);
const searchString = ref("");

function clickRow(row: Row) {
  if (isRowClicked.value === "" && !addRowStore.addingRow) {
    closeSearch();
    isRowClicked.value = row;
    rowClickedStore.rowClicked = true;
  }
}

function unclickRow() {
  isRowClicked.value = "";
  rowClickedStore.rowClicked = false;
  if (isEditing) {
    isEditing.value = false;
    emits("close-edit");
  }
}

function clickEdit(row: Row) {
  isEditing.value = true;
  editingRowData.value = row;
  console.log({ editingRowData });
  // emits("edit", row);
}

function toggleSearch() {
  showSearch.value = !showSearch.value;
  if (showSearch.value === false) {
    searchString.value = "";
  }
}

function closeSearch() {
  showSearch.value = false;
  searchString.value = "";
}

function submitSearch() {
  // event.preventDefault();
  emits("search", searchString.value);
}

watch([searchString], () => {
  submitSearch();
});

function emitEditSave(row: Row) {
  emits("edit-save", row);
  unclickRow();
}

function emitEditError(error: string) {
  emits("edit-error", error);
}
</script>

<template>
  <div
    v-if="!isRowClicked && !addRowStore.addingRow"
    class="flex justify-start ml-5"
  >
    <button
      class="p-1 border-l-2 border-t-2 border-r-2 rounded-tr-lg rounded-tl-lg border-gray-300 text-black bg-gray-100 hover:border-black hover:bg-white"
      @click="toggleSearch"
    >
      <div class="flex space-x-2">
        <ChevronUpIcon v-if="!showSearch" class="w-5" />
        <ChevronDownIcon v-if="showSearch" class="w-5" />
        <MagnifyingGlassIcon class="w-5" />
      </div>
    </button>
  </div>
  <div class="overflow-x-auto border-2 border-black rounded-lg">
    <div v-if="showSearch" class="w-full p-2 bg-white border-b-2 border-black">
      <form @submit.prevent="submitSearch()" class="flex space-x-2">
        <input
          class="w-full px-2 py-1 rounded-lg border-2 outline-none focus:border-twc-blue border-blue-200 hover:border-blue-400 bg-gray-200 focus:bg-white"
          placeholder="Search"
          v-model="searchString"
        />
        <button
          type="submit"
          class="border-2 px-2 py-1 rounded-lg bg-gray-100 hover:border-black hover:bg-white"
        >
          <MagnifyingGlassIcon class="w-5" />
        </button>
      </form>
    </div>
    <table class="table-auto w-full bg-white">
      <thead>
        <tr class="border-b-2 border-black uppercase tracking-wide text-sm">
          <!-- Add empty headers for the icon columns -->
          <th v-if="isRowClicked !== ''" class="text-center"></th>
          <th v-if="isRowClicked !== '' && !isEditing" class="text-center"></th>
          <th
            v-for="(header, index) in headers"
            :key="header"
            class="text-center whitespace-nowrap"
            :class="{
              'border-l-2': index !== 0,
              'border-r-2': index !== headers.length - 1,
              'border-black': true,
            }"
          >
            {{ header }}
          </th>
          <th v-if="isRowClicked !== '' && !isEditing" class="text-center"></th>
        </tr>
      </thead>
      <tbody v-if="!loading">
        <tr
          v-for="row in rows"
          :key="row.id"
          :class="{
            'bg-twc-blue text-white': isRowClicked === row,
            'hover:bg-gray-100 cursor-pointer':
              isRowClicked === '' && !addRowStore.addingRow,
          }"
          @click="clickRow(row)"
        >
          <td v-if="isRowClicked !== ''" class="text-center">
            <button
              v-if="isRowClicked === row"
              class="border m-2 p-2 rounded hover:bg-white hover:text-black"
              @click.stop="unclickRow"
            >
              <XMarkIcon class="w-5" />
            </button>
          </td>
          <td v-if="isRowClicked !== '' && !isEditing" class="text-center">
            <button
              v-if="isRowClicked === row"
              class="border m-2 p-2 rounded hover:bg-white hover:text-twc-green"
              @click="clickEdit(row)"
            >
              <PencilSquareIcon class="w-5" />
            </button>
          </td>
          <td
            v-for="(header, colIndex) in headers"
            :key="header"
            class="text-center whitespace-nowrap"
            :class="{
              'border-l-2': colIndex !== 0,
              'border-r-2': colIndex !== headers.length - 1,
              'border-black': true,
            }"
          >
            {{ getRowValue(row, header) }}
          </td>
          <td v-if="isRowClicked !== '' && !isEditing" class="text-center">
            <button
              v-if="isRowClicked === row"
              class="border m-2 p-2 rounded hover:bg-white hover:text-twc-red"
            >
              <TrashIcon class="w-5" />
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-if="loading">
        <tr class="bg-white">
          <td :colspan="props.headers.length" class="p-2">
            <div class="flex justify-center items-center">
              <img src="/assets/blocks-shuffle-3.svg" alt="Loading..." />
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-if="!loading && props.rows.length === 0">
        <tr>
          <td :colspan="props.headers.length" class="p-2">
            <div
              class="flex justify-center items-center uppercase text-sm tracking-wide font-bold space-x-3"
            >
              No Items Found
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <EditRow
    v-if="isEditing"
    :type="'Admin'"
    :rowData="editingRowData"
    @save="emitEditSave"
    @error="emitEditError"
  />
</template>
