<script setup lang="ts">
import OnboardingEmployee from "~/components/AddRow/OnboardingEmployee.vue";
import Admin from "~/components/AddRow/Admin.vue";

const props = defineProps<{
  type: string;
}>();

const emits = defineEmits<{
  (event: "cancelAddRow"): void;
  (event: "refresh"): void;
}>();

if (props.type === "Onboarding Employee") {
  console.log("Onboarding Employee from AddRow.vue");
}

function handleCancelAddRow() {
  emits("cancelAddRow");
}

function handleRefresh() {
  emits("refresh");
}
</script>

<template>
  <OnboardingEmployee
    v-if="props.type === 'Onboarding Employee'"
    @cancelAddRow="handleCancelAddRow"
    @refresh="handleRefresh"
  />
  <Admin
    v-if="props.type === 'Admin'"
    @cancelAddRow="handleCancelAddRow"
    @refresh="handleRefresh"
  />
</template>
