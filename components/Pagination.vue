<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import { useRowClickedStore } from "../stores/useRowClickedStore.ts";
import { useAddRowStore } from "../stores/useAddRowStore.ts";

const rowClickedStore = useRowClickedStore();
const addRowStore = useAddRowStore();

const props = defineProps({
  currentPage: {
    type: Number,
    default: 0,
  },
  totalPages: {
    type: Number,
    default: 0,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["nextPage", "prevPage"]);
const disableNextPage = computed(() => {
  return (
    props.currentPage >= props.totalPages ||
    rowClickedStore.rowClicked ||
    addRowStore.addingRow
  );
});
const disablePrevPage = computed(() => {
  return (
    props.currentPage <= 1 ||
    rowClickedStore.rowClicked ||
    addRowStore.addingRow
  );
});

function nextPage() {
  if (props.currentPage < props.totalPages) {
    emit("nextPage");
  }
}

function prevPage() {
  if (props.currentPage > 1) {
    emit("prevPage");
  }
}
</script>

<template>
  <div class="flex justify-center items-center p-2 overflow-auto">
    <div class="flex">
      <button
        class="flex justify-center items-center bg-white p-2 border-t-2 border-l-2 border-b-2 rounded-tl-lg rounded-bl-lg border-gray-200 text-black hover:border-r-2 hover:border-gray-900 hover:text-black disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-100 disabled:text-gray-200 disabled:border-none"
        @click="prevPage"
        :disabled="disablePrevPage"
      >
        <ChevronLeftIcon class="w-5" />
      </button>

      <div
        class="flex justify-center items-center bg-white p-2 border-t-2 border-b-2 w-20"
      >
        <span v-if="!loading">
          {{ props.currentPage }}/{{ props.totalPages }}
        </span>
        <span v-else>
          <img src="/assets/blocks-shuffle-3.svg" class="h-6 w-5" />
        </span>
      </div>

      <button
        class="flex justify-center items-center bg-white p-2 border-t-2 border-r-2 border-b-2 rounded-tr-lg rounded-br-lg border-gray-200 text-black hover:border-l-2 hover:border-gray-900 hover:text-black disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-100 disabled:text-gray-200 disabled:border-none"
        @click="nextPage"
        :disabled="disableNextPage"
      >
        <ChevronRightIcon class="w-5" />
      </button>
    </div>
  </div>
</template>
