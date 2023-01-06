// import { defineStore } from "pinia";

export const useProductPageStore = defineStore("productPageStore", {
  state: () => {
    return {
      searchWord: "",
      displayCount: 45,
      selectedType: "",
      sortByProperty: "Name",
      brandList: [],
      selectedBrand: "",
    };
  },
  getters: {
    getSearchWord(state) {
      return state.searchWord;
    },
    getSelectedType(state) {
      return state.selectedType;
    },
  },
  actions: {
    setSearchWord(value: String) {
      this.searchWord = value;
    },
    setType(value: any) {
      this.selectedType = value;
    },
    setSortByProperty(value: any) {
      this.sortByProperty = value;
    },
    setBrandList(value: any) {
      this.brandList = value;
    },
    setSelectedBrand(value: string) {
      this.selectedBrand = value;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductPageStore, import.meta.hot));
}
