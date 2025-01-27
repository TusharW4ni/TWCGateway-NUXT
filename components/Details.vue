<script lang="ts" setup>
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
  summary: string;
}>();

const isOpen = ref(true);

function toggleOpen() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <details
    :open="isOpen"
    @toggle="toggleOpen"
    class="bg-yellow-100 text-black rounded my-3"
  >
    <summary class="flex cursor-pointer bg-twc-yellow text-black rounded p-2">
      <component
        :is="isOpen ? ChevronUpIcon : ChevronDownIcon"
        class="flex justify-center items-center w-6 h-6"
      />
      <div class="flex w-full justify-center items-center">
        {{ props.summary }}
      </div>
    </summary>
    <div class="p-2">
      <slot />
    </div>
  </details>
</template>
