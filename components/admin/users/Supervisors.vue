<script setup lang="ts">
const headers = ["First Name", "Last Name", "Email"];
const page = ref(1);
const pageSize = ref(3);
const search = ref("");
const dataLoading = ref(false);

const data = await useFetch("/api/users/get/allSupervisors", {
  query: {
    page,
    pageSize,
    searchString: search,
  },
  onRequest() {
    dataLoading.value = true;
  },
  onResponse() {
    dataLoading.value = false;
  },
});

function handlePrevPage() {
  page.value -= 1;
}

function handleNextPage() {
  page.value += 1;
}

function handleSearchString(searchString: string) {
  search.value = searchString;
}

function handleDelete(row: any) {
  console.log("HELLO)");
}
</script>

<template>
  <Details :summary="'Supervisors'" class="md:w-3/4">
    <Table
      :type="'Onboarding Employee'"
      :headers="headers"
      :data="data.data.value.supervisors"
      :loading="dataLoading"
      :currentPage="page"
      :totalPages="data.data.value.totalPages"
      @deleteRow="handleDelete"
      @prevPage="handlePrevPage"
      @nextPage="handleNextPage"
      @searchString="handleSearchString"
    />
  </Details>
</template>
