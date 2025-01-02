<script setup lang="js">
import Table from './Table.vue';

import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  summary: String,
  details: Table,
});
</script>

<template>
  <details class="p-3 group" open="true">
    <summary
      class="bg-twc-yellow text-black p-3 list-none flex items-center cursor-pointer"
    >
      <span class="group-open:hidden">
        <ChevronDownIcon class="w-6" />
      </span>
      <span class="hidden group-open:inline">
        <ChevronUpIcon class="w-6" />
      </span>
      <span class="ml-2">{{ summary }}</span>
    </summary>
    <div class="bg-[#fcf4c3] rounded-b-lg text-black p-3">
      <slot />
    </div>
  </details>
</template>
