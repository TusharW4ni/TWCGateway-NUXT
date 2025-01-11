export const useAddRowStore = defineStore("addRow", () => {
  const addingRow = ref(false);
  return { addingRow };
});
