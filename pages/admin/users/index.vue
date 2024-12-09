<script setup lang="ts">
import {
  UserPlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/vue/24/solid";
</script>

<template>
  <NuxtLayout name="admin-navbar">
    <div
      class="flex flex-col h-[calc(100vh-4rem)] md:h-screen md:w-[calc(100vw-5rem)]"
    >
      <div class="m-3 p-3">
        <button
          class="flex justify-center items-center p-1 border border-gray-300 rounded hover:bg-opacity-50 hover:bg-gray-100"
        >
          <UserPlusIcon class="w-8" />
        </button>
      </div>
      <div class="flex h-full">
        <div
          class="border w-1/2 border-gray-300 m-3 p-3 rounded-lg overflow-auto"
        >
          <details class="p-3 group">
            <summary
              class="bg-twc-yellow text-black p-3 list-none flex items-center"
            >
              <span class="group-open:hidden">
                <ChevronDownIcon class="w-6" />
              </span>
              <span class="hidden group-open:inline">
                <ChevronUpIcon class="w-6" />
              </span>
              <span class="ml-2">Onboarding Employees</span>
            </summary>
            <div class="bg-[#fcf4c3] rounded-b-lg text-black p-3">
              <ul>
                <li>user1</li>
                <li>user2</li>
                <li>user3</li>
              </ul>
            </div>
          </details>
          <details class="p-3 group">
            <summary
              class="bg-twc-yellow text-black p-3 list-none flex items-center"
            >
              <span class="group-open:hidden">
                <ChevronDownIcon class="w-6" />
              </span>
              <span class="hidden group-open:inline">
                <ChevronUpIcon class="w-6" />
              </span>
              <span class="ml-2">Supervisors</span>
            </summary>
            <div class="bg-[#fcf4c3] rounded-b-lg text-black p-3">
              <ul>
                <li>user1</li>
                <li>user2</li>
                <li>user3</li>
              </ul>
            </div>
          </details>
          <details class="p-3 group">
            <summary
              class="bg-twc-yellow text-black p-3 list-none flex items-center"
            >
              <span class="group-open:hidden">
                <ChevronDownIcon class="w-6" />
              </span>
              <span class="hidden group-open:inline">
                <ChevronUpIcon class="w-6" />
              </span>
              <span class="ml-2">Admins</span>
            </summary>
            <div class="bg-[#fcf4c3] rounded-b-lg text-black p-3">
              <ul>
                <li>user1</li>
                <li>user2</li>
                <li>user3</li>
              </ul>
            </div>
          </details>
        </div>
        <div
          class="border w-1/2 border-gray-300 m-3 p-3 rounded-lg overflow-auto"
        ></div>
      </div>
    </div>
  </NuxtLayout>
</template>
