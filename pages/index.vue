<script setup>
async function logout() {
  // const token = useCookie("token");
  try {
    // console.log("token", token.value);
    // const res = await useFetch("/api/auth0/logout", {
    //   method: "POST",
    //   body: { token },
    // });
    // console.log("res", res);
    // const res = await useFetch("/api/auth0/logout", {
    //   method: "GET",
    // });
    // console.log("res", res.data.value);
    // navigateTo(res.data.value, { external: true });
    // console.log("res.value", res.value);
    // console.log("logoutUrl", logoutUrl.value);

    window.location.href = "/api/auth0/logout";
  } catch (e) {
    console.error("Error in logging out: ", e);
  }
}
</script>

<template>
  <div class="flex flex-col h-screen justify-center items-center bg-black">
    <div class="text-white text-4xl">Hello, Nuxt!</div>
    <button
      @click="logout"
      class="border-2 border-gray-300 rounded-lg px-2 py-1 m-3 text-white"
    >
      Logout
    </button>
  </div>
</template>
