<script setup lang="ts">
import { ref } from "vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  headers: Array,
  rows: Array,
});

const selectedRow = ref(null);

function selectRow(row) {
  selectedRow.value = row;
}

function closeOverlay() {
  selectedRow.value = null;
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
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="row in rows"
            @click="selectRow(row)"
            class="cursor-pointer"
            :class="{ 'bg-gray-100': selectedRow === row }"
          >
            <td
              v-for="header in headers"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              {{ row[header] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="selectedRow"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeOverlay"
    >
      <div class="bg-white p-4 rounded-lg shadow-lg" @click.stop>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="header in headers"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td
                v-for="header in headers"
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                {{ selectedRow[header] }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-end mt-4 space-x-2">
          <button
            class="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <PencilIcon class="w-5 h-5 mr-2" />
            Edit
          </button>
          <button
            class="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <TrashIcon class="w-5 h-5 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
