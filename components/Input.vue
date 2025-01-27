<script lang="ts" setup>
const props = defineProps<{
  class?: string;
  placeholder: string;
  modelValue?: string;
  isDisabled: false;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <input
    :class="[
      'w-full border-2 border-gray-300 focus:outline-none rounded px-2 focus:border-twc-yellow hover:border-twc-blue bg-gray-100 focus:bg-white disabled:border-gray-100 disabled:cursor-not-allowed',
      props.class,
    ]"
    :placeholder="props.placeholder"
    :value="props.modelValue"
    :disabled="props.isDisabled"
    @input="handleInput"
  />
</template>
