<script setup lang="ts">
type Row = {
  [key: string]: any;
};

const props = defineProps<{
  headers: string[];
  rows: Row[];
  loading: Boolean;
}>();

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
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-if="!loading"
            v-for="row in rows"
            :key="row.id || row.email || JSON.stringify(row)"
          >
            <td
              v-for="header in headers"
              :key="header"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              {{ getRowValue(row, header) }}
            </td>
          </tr>
          <tr v-else>
            <td :colspan="props.headers.length" class="p-2">
              <div class="flex justify-center items-center">
                <img src="/assets/blocks-shuffle-3.svg" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
