<script setup lang="ts">
definePageMeta({
  title: "Users",
});

const { notify } = useToast();

const onEmHeaders = ["First Name", "Last Name", "Email", "Department"];
const adminHeaders = ["First Name", "Last Name", "Email"];

const onEmPage = ref(1);
const onEmPageSize = ref(3);
const onEmSearchString = ref("");
const onEmDataLoading = ref(false);
const onEmTotalPagesLoading = ref(false);

const onEmData = await useFetch(`/api/users/get/onEm`, {
  query: {
    page: onEmPage,
    pageSize: onEmPageSize,
    searchString: onEmSearchString,
  },
  onRequest() {
    onEmDataLoading.value = true;
  },
  onResponse() {
    onEmDataLoading.value = false;
  },
});
console.log("onEmData", onEmData.data.value);

function handlePrevPage() {
  onEmPage.value -= 1;
}

function handleNextPage() {
  onEmPage.value += 1;
}

function handleSearchString(searchString: string) {
  onEmSearchString.value = searchString;
}

function deleteOnEm(row: any) {
  console.log("HELLO)");
}
</script>

<template>
  <div>
    <Navbar />
    <div class="p-3 md:w-full md:flex md:flex-col md:items-center">
      <Details :summary="'Onboarding Employees'" class="md:w-3/4">
        <Table
          :type="'Onboarding Employee'"
          :headers="onEmHeaders"
          :data="onEmData.data.value.employees"
          :loading="onEmDataLoading"
          :currentPage="onEmPage"
          :totalPages="onEmData.data.value.totalPages"
          @deleteRow="deleteOnEm"
          @prevPage="handlePrevPage"
          @nextPage="handleNextPage"
          @searchString="handleSearchString"
        />
      </Details>
      <Details :summary="'Supervisors'" class="md:w-3/4">Hello</Details>
      <Details :summary="'Admins'" class="md:w-3/4">Hello</Details>
    </div>
  </div>
</template>
