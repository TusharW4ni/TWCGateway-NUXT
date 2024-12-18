<script setup lang="ts">
import { ref } from "vue";

type Row = {
  [key: string]: any;
};

const props = defineProps<{
  headers: string[];
  rows: Row[];
  headerKeyMap?: Record<string, string>;
}>();

const emits = defineEmits(["add", "save", "cancel"]);

const headerKeyMap = props.headerKeyMap || {};
const isAddingRow = ref(false);
const newRow = ref<Row | null>(null);

function startAddingRow() {
  isAddingRow.value = true;
  newRow.value = {}; // Initialize empty row
}

function cancelAddingRow() {
  isAddingRow.value = false;
  newRow.value = null;
  emits("cancel");
}

function saveNewRow() {
  if (newRow.value) {
    emits("save", newRow.value);
    isAddingRow.value = false;
    newRow.value = null;
  }
}
</script>

<template>
  <div class="relative">
    <div class="border-2 rounded-lg border-gray-300 shadow-lg overflow-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in headers"
              :key="header"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
            <th class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="row in rows"
            :key="row.id || row.email || JSON.stringify(row)"
          >
            <td
              v-for="header in headers"
              :key="header"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              {{ row[headerKeyMap[header] || header] }}
            </td>
            <td></td>
          </tr>
          <!-- Editable row -->
          <tr v-if="isAddingRow">
            <td
              v-for="header in headers"
              :key="header"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              <input
                v-model="newRow[headerKeyMap[header] || header]"
                class="border border-gray-300 rounded px-2 py-1 w-full"
                type="text"
                :placeholder="header"
              />
            </td>
            <td class="px-6 py-4">
              <button @click="saveNewRow" class="text-green-500">Save</button>
              <button @click="cancelAddingRow" class="text-red-500 ml-2">
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button
      v-if="!isAddingRow"
      @click="startAddingRow"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Add New
    </button>
  </div>
</template>
