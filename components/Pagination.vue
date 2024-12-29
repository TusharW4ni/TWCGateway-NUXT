<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";

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
const disableNextPage = computed(() => props.currentPage >= props.totalPages);
const disablePrevPage = computed(() => props.currentPage <= 1);

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
  <div
    class="flex justify-center items-center bg-white p-2 rounded-lg border-2 space-x-20"
  >
    <button
      class="flex justify-center items-center bg-gray-100 w-1/2 py-2 border-2 border-gray-200 rounded text-gray-200 hover:border-gray-900 hover:text-black disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-100 disabled:text-gray-200"
      @click="prevPage"
      :disabled="disablePrevPage"
    >
      <ChevronLeftIcon class="w-5" />
    </button>

    <div>
      <span
        v-if="!loading"
        class="flex justify-center items-center bg-gray-100 p-2 rounded"
      >
        {{ props.currentPage }}/{{ props.totalPages }}
      </span>
      <span
        v-else
        class="flex justify-center items-center bg-gray-100 p-2 rounded"
      >
        <img src="/assets/blocks-shuffle-3.svg" class="w-10" />
      </span>
    </div>

    <button
      class="flex justify-center items-center bg-gray-100 w-1/2 py-2 border-2 border-gray-200 rounded text-gray-200 hover:border-gray-900 hover:text-black disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-100 disabled:text-gray-200"
      @click="nextPage"
      :disabled="disableNextPage"
    >
      <ChevronRightIcon class="w-5" />
    </button>
  </div>
</template>
