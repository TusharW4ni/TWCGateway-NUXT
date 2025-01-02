<script setup lang="ts">
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";

type Row = {
  [key: string]: any;
};

const props = defineProps<{
  headers: string[];
  rows: Row[];
  loading: Boolean;
}>();

const emits = defineEmits(["editRow", "closeEditRow"]);

const clickedRow = ref<Row | null>(null);
const editingRow = ref<Boolean>(false);

// Handle row click to toggle clickedRow
function rowClick(row: Row) {
  // If the clicked row is already selected, deselect it
  editingRow.value = false;
  emits("closeEditRow");
  if (clickedRow.value === row) {
    clickedRow.value = null;
  } else {
    clickedRow.value = row;
  }
}

// Handle Esc key press to clear clickedRow
function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    clickedRow.value = null;
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

// Derive keys from headers dynamically
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

function editRow(row: Row, event: MouseEvent) {
  event.stopPropagation();
  editingRow.value = true;
  emits("editRow", row);
}

function cancelEditRow(event: MouseEvent) {
  event.stopPropagation();
  editingRow.value = false;
  clickedRow.value = null;
  emits("closeEditRow");
}

function deleteRow(row: Row, event: MouseEvent) {
  event.stopPropagation();
}
</script>

<template>
  <div class="relative">
    <div class="border-2 rounded-lg border-gray-300 shadow-lg overflow-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th v-if="clickedRow" class="w-12"></th>
            <th
              v-for="header in headers"
              :key="header"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
            <th v-if="clickedRow" class="w-12"></th>
          </tr>
        </thead>
        <tbody v-if="!loading" class="bg-white divide-y divide-gray-200">
          <tr
            v-for="row in rows"
            :key="row.id || row.email || JSON.stringify(row)"
            :class="{
              'bg-blue-100': clickedRow === row,
              'hover:bg-gray-100': clickedRow !== row,
            }"
            class="hover:cursor-pointer"
            @click="rowClick(row)"
          >
            <!-- Left cell -->
            <td v-if="clickedRow" class="p-2">
              <button
                v-if="!editingRow && clickedRow === row"
                class="border-2 border-gray-500 bg-gray-300 p-2 rounded hover:border-green-900 hover:text-green-500 hover:bg-gray-100"
                @click="editRow(row, $event)"
              >
                <PencilSquareIcon class="w-6" />
              </button>
              <button
                v-if="editingRow && clickedRow === row"
                class="border-2 border-gray-500 bg-gray-300 p-2 rounded hover:bg-gray-100"
                @click="cancelEditRow($event)"
              >
                <XMarkIcon class="w-6" />
              </button>
            </td>

            <!-- Dynamic data cells -->
            <td
              v-for="header in headers"
              :key="header"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              {{ getRowValue(row, header) }}
            </td>

            <!-- Right cell -->
            <td v-if="clickedRow" class="p-2">
              <button
                v-if="clickedRow === row && !editingRow"
                class="border-2 border-gray-500 bg-gray-300 p-2 rounded hover:border-red-900 hover:text-red-500 hover:bg-gray-100"
                @click="deleteRow(row, $event)"
              >
                <TrashIcon class="w-6" />
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="bg-white">
            <td :colspan="props.headers.length" class="p-2">
              <div class="flex justify-center items-center">
                <img src="/assets/blocks-shuffle-3.svg" alt="Loading..." />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
