<script setup lang="ts">
import OnboardingEmployee from "~/components/AddRow/OnboardingEmployee.vue";

const props = defineProps<{
  type: string;
}>();
</script>

<template>
  <OnboardingEmployee v-if="props.type === 'Onboarding Employee'" />
</template>
