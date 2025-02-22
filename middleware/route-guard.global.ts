export default defineNuxtRouteMiddleware(async (to, from) => {
  const currentUser = useCookie("currentUser");
  if (currentUser.value?.role !== "Admin" && to.path.includes("admin")) {
    return navigateTo("/unauthorized");
  }
});
