<script setup lang="ts">
type Row = {
  [key: string]: any;
};

const props = defineProps<{
  headers: string[];
  rows: Row[];
  headerKeyMap?: Record<string, string>;
}>();

const headerKeyMap = props.headerKeyMap || {};
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
