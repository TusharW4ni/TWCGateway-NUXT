<script setup lang="ts">
const currentUser = useCookie("currentUser");

if (currentUser.value?.role === "Admin") {
  await navigateTo("/admin/users");
}
</script>

<template></template>
