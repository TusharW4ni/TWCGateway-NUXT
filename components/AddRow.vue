<script setup lang="ts">
import OnboardingEmployee from "~/components/AddRow/OnboardingEmployee.vue";

const props = defineProps<{
  type: string;
}>();

if (props.type === "Onboarding Employee") {
  console.log("Onboarding Employee from AddRow.vue");
}
</script>

<template>
  <OnboardingEmployee v-if="props.type === 'Onboarding Employee'" />
</template>
