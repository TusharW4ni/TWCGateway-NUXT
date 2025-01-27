<script lang="ts" setup>
const props = defineProps<{
  type: "borderless";
  class?: string;
}>();

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>

<template>
  <button
    v-if="props.type === 'borderless'"
    :class="[
      'flex justify-center items-center m-2 px-2 rounded-lg hover:bg-gray-800 focus:inner-border-2 focus:outline-none focus:bg-gray-800',
      props.class,
    ]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
