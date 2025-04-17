<script setup lang="ts">
interface OnboardingEmployeesResponse {
  onEms: {
    email: string;
    id: number;
    firstName: string;
    lastName: string;
    department: string;
  }[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const headers = ["First Name", "Last Name", "Email", "Department"];
const page = ref(1);
const pageSize = ref(10);
const search = ref("");
const dataLoading = ref(false);

const fetched = await useFetch<OnboardingEmployeesResponse>(
  `/api/users/get/on-ems`,
  {
    query: {
      page: page,
      pageSize: pageSize,
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

function handleDeleteOnEm(row: any) {
  console.log("HELLO)");
}

function handleRefresh() {
  fetched.refresh();
}
</script>

<template>
  <Details :summary="'Onboarding Employees'" class="md:w-3/4">
    <Table
      :type="'Onboarding Employee'"
      :headers="headers"
      :data="fetched.data.value?.onEms || []"
      :loading="dataLoading"
      :currentPage="page"
      :totalPages="fetched.data.value?.totalPages || 0"
      @deleteRow="handleDeleteOnEm"
      @prevPage="handlePrevPage"
      @nextPage="handleNextPage"
      @searchString="handleSearchString"
      @refresh="handleRefresh"
    />
  </Details>
</template>
