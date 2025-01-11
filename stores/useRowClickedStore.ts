export const useRowClickedStore = defineStore("rowClicked", () => {
  const rowClicked = ref(false);
  return { rowClicked };
});
