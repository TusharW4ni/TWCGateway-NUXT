<script setup lang="ts">
interface SupervisorsResponse {
  supervisors: {
    email: string;
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    archived: boolean;
  }[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const headers = ["First Name", "Last Name", "Email"];
const page = ref(1);
const pageSize = ref(10);
const search = ref("");
const dataLoading = ref(false);

const fetched = await useFetch<SupervisorsResponse>(
  "/api/users/get/supervisors",
  {
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
  }
);

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

function handleRefresh() {
  fetched.refresh();
}
</script>

<template>
  <Details :summary="'Supervisors'" class="md:w-3/4">
    <Table
      :type="'Supervisor'"
      :headers="headers"
      :data="fetched.data.value?.supervisors || []"
      :loading="dataLoading"
      :currentPage="page"
      :totalPages="fetched.data.value?.totalPages || 0"
      @deleteRow="handleDelete"
      @prevPage="handlePrevPage"
      @nextPage="handleNextPage"
      @searchString="handleSearchString"
      @refresh="handleRefresh"
    />
  </Details>
</template>
