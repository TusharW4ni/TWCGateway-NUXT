<script setup lang="ts">
import OnboardingEmployees from "~/components/pages/admin/users/OnboardingEmployees.vue";
import Supervisors from "~/components/pages/admin/users/Supervisors.vue";
import Admins from "~/components/pages/admin/users/Admins.vue";

definePageMeta({
  name: "admin | users",
});

const { notify } = useToast();
</script>

<template>
  <div>
    <Navbar />
    <div class="p-3 md:w-full md:flex md:flex-col md:items-center">
      <OnboardingEmployees />
      <Supervisors />
      <Admins />
    </div>
  </div>
</template>
