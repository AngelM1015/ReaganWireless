<script setup lang="ts">
useHead({
  title: 'Products - We source new and used cell phones and accessories directly from carrier trade-in programs, big-box retailers, and manufacturers.',
  meta: [
    {
      name: 'description',
      content:
        'All cell phones and accessories that we source undergo our stringent, best-in-class triage process during which they are both functionally tested and cosmetically graded. As veterans of the industry, we are well aware of the challenges that come along with inconsistent and incomplete triage, and we, therefore, strive to differentiate ourselves through transparency and consistency.',
    },
  ],
})

const productPageStore = useProductPageStore()
const isOpenCountDropDown = ref(false)
const isOpenSortDropDown = ref(false)
const countArray = ref([45, 90, 135])
const selectedBrand = ref('')

const selectBrand = (brand) => {
  selectedBrand.value = brand
  productPageStore.setSelectedBrand(brand)
}
</script>

<template>
  <div>
    <section class="p-5 py-20 gap-5 container mx-auto flex justify-start">
      <div class="block md:w-60"><ProductsSideBar /></div>
      <div class="w-full">
        <div class="flex flex-col lg:flex-row w-full justify-between gap-2">
          <div class="flex items-center">
            <div class="relative w-full">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                v-model="productPageStore.searchWord"
                type="text"
                id="simple-search"
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 outline-0"
                placeholder="Search"
              />
            </div>
          </div>
          <div @mouseover="isOpenSortDropDown = true" @mouseleave="isOpenSortDropDown = false" class="relative">
            <div class="w-full lg:w-52 flex justify-between bg-gray-50 border border-gray-300 rounded-md p-2">
              <button class="text-sm md:text-base font-medium md:font-normal" v-if="productPageStore.sortByProperty">
                Sort by <b>{{ productPageStore.sortByProperty }}</b>
              </button>
              <button class="text-sm md:text-base font-medium md:font-normal" v-else>Sort by</button>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            <div v-if="isOpenSortDropDown" class="flex flex-col absolute w-full lg:w-52 b-0 z-10 text-sm md:text-base font-medium md:font-normal">
              <button @click="productPageStore.setSortByProperty('Name')" class="bg-gray-50 hover:bg-gray-200 border border-gray-300 p-1">Sort By Name</button>
              <button @click="productPageStore.setSortByProperty('Price')" class="bg-gray-50 hover:bg-gray-200 border border-gray-300 p-1">Sort By Price</button>
              <button @click="productPageStore.setSortByProperty('Date')" class="bg-gray-50 hover:bg-gray-200 border border-gray-300 p-1">Sort By Date</button>
            </div>
          </div>
          <div @mouseover="isOpenCountDropDown = true" @mouseleave="isOpenCountDropDown = false" class="relative">
            <div class="flex w-full lg:w-52 gap-5 justify-between bg-gray-50 border border-gray-300 rounded-md p-2">
              <button class="text-sm md:text-base font-medium md:font-normal" v-if="productPageStore.selectedBrand">
                Show <b>{{ productPageStore.selectedBrand }}</b> Product
              </button>
              <button class="text-sm md:text-base font-medium md:font-normal" v-else>Filter by <b>Brand</b></button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            <div v-if="isOpenCountDropDown" class="flex flex-col absolute w-full lg:w-52 b-0 z-10 text-sm md:text-base font-medium md:font-normal">
              <button
                v-for="brand in productPageStore.brandList"
                :key="brand"
                @click="selectBrand(brand)"
                class="bg-gray-50 hover:bg-gray-200 border border-gray-300 p-1"
              >
                Show {{ brand }} Products
              </button>
            </div>
          </div>
          <div class="flex-none flex gap-5 justify-between">
            <button class="mx-auto p-1 px-2 border border-gray-300 rounded-md">
              <img src="~/assets/images/view_type1.svg" alt="view-tile" width="24" height="24" />
            </button>
            <button class="mx-auto p-1 border border-gray-300 rounded-md">
              <img src="~/assets/images/view_type2.svg" alt="view-list" width="28" height="24" />
            </button>
          </div>
        </div>
        <NuxtPage />
      </div>
    </section>
    <Subscribe />
  </div>
</template>
