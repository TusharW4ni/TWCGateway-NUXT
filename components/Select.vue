<script setup lang="ts">
import { ArrowTopRightOnSquareIcon, CheckIcon } from "@heroicons/vue/24/solid";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";

const props = defineProps<{
  type: string;
  options: Array<{
    id: number;
    title: string;
  }>;
  modelValue: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// had to write this because HOME and END keys were not working in the input
const handleKeydown = (event: KeyboardEvent) => {
  const input = event.target as HTMLInputElement;

  if (event.key === "Home") {
    input.setSelectionRange(0, 0); //cursor to start//
    event.preventDefault();
  } else if (event.key === "End") {
    const length = input.value.length;
    input.setSelectionRange(length, length); //cursor to end//
    event.preventDefault();
  }
};

const buttonClicked = ref(false);

const selected = ref(props.options[0].title);
const query = ref("");

const filteredOptions = computed(() =>
  query.value === ""
    ? props.options
    : props.options.filter((option) => {
        return option.title.toLowerCase().includes(query.value.toLowerCase());
      })
);

watch(selected, () => {
  const department = props.options.filter((option) => {
    return option.title.includes(selected.value);
  });
  const departmentId = department[0].id.toString();
  updateSelected(departmentId);
});

function updateSelected(newValue: string) {
  emits("update:modelValue", newValue);
  buttonClicked.value = false;
}
</script>

<template>
  <!-- max-w-[200px] old button -->
  <div>
    <button
      @click="buttonClicked = true"
      class="flex items-center w-full border-2 border-gray-300 focus:outline-none rounded px-2 focus:border-twc-yellow hover:border-twc-blue bg-gray-100 focus:bg-white"
    >
      <span class="truncate overflow-hidden whitespace-nowrap flex-1">
        {{ selected }}
      </span>
      <ArrowTopRightOnSquareIcon class="w-5 ms-2 flex-shrink-0" />
    </button>
  </div>
  <div
    v-if="buttonClicked"
    @click="buttonClicked = false"
    class="bg-black bg-opacity-50 w-screen h-screen fixed top-0 left-0 flex justify-center items-center"
  >
    <div
      @click.stop=""
      class="p-2 bg-white md:w-1/2 md:h-1/2 w-[calc(100vw-5rem)] h-3/4 rounded border"
    >
      <h1 class="mt-1 mb-3 text-xl font-semibold">Choose {{ props.type }}</h1>
      <Combobox v-model="selected">
        <ComboboxInput
          @change="query = $event.target.value"
          @keydown="handleKeydown"
          class="truncate w-full border-2 border-gray-300 focus:outline-none rounded px-2 py-1 focus:border-twc-yellow hover:border-twc-blue bg-gray-100 focus:bg-white"
        />
        <ComboboxOptions
          class="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="filteredOptions.length === 0 && query !== ''"
            class="relative cursor-default select-none px-4 py-2 text-gray-700"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="option in filteredOptions"
            :key="option.id"
            :value="option.title"
            v-slot="{ selected, active }"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-teal-600 text-white': active,
                'text-gray-900': !active,
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ option.title }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-teal-600': !active }"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </Combobox>
    </div>
  </div>
</template>
