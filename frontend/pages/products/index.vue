<script lang="ts">
import { defineComponent, onMounted } from "vue";
import googleSheetApiService from "@/services/googleSheetApiService";
import { useProductPageStore } from "@/stores/ProductPageStore";

export default defineComponent({
  setup() {
    const store = useProductPageStore();
    return {
      store,
    };
  },
  data() {
    return {
      loadingProducts: true,
      products: [],
      filteredProducts: [],
      pageofProducts: [],
      currentPage: 1,
      perPage: 12,
      pages: [],
    };
  },
  methods: {
    setPages() {
      this.pages = [];
      let numberOfPages = Math.ceil(
        this.filteredProducts.length / this.perPage
      );
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(products) {
      let page = this.currentPage;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return products.slice(from, to);
    },
    searchFilter(newValue) {
      let currentProducts = this.products;
      let filtered = currentProducts
        .filter((product) => {
          return product.Device.toLowerCase().includes(
            newValue.searchWord.toLowerCase()
          );
        })
        .filter((product) => {
          return newValue.selectedType.includes(product.Type);
        })
        .filter((product) => {
          return newValue.selectedBrand.length
            ? product.Brand == newValue.selectedBrand
            : true;
        })
        .sort((a, b) => {
          if (newValue.sortByProperty == "Name") {
            const nameA = a.Device.toUpperCase();
            const nameB = b.Device.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          } else if (newValue.sortByProperty == "Price") {
            return a.A - b.A;
          } else if (newValue.sortByProperty == "Date") {
            const dateA = new Date(a.created_at_iso);
            const dateB = new Date(b.created_at_iso);
            return dateA.getTime() - dateB.getTime();
          }
        });
      this.filteredProducts = filtered;
    },
    filterByType(newValue) {
      let currentProducts = this.products;
      let filtered = currentProducts.filter((product) => {
        return product.Type.toLowerCase() == newValue.selectedType;
      });
      this.filteredProducts = filtered;
    },
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.filteredProducts);
    },
  },
  watch: {
    filteredProducts() {
      this.setPages();
    },
    store: {
      handler(newValue, oldValue) {
        this.searchFilter(newValue);
      },
      deep: true,
    },
  },
  mounted() {
    googleSheetApiService
      .getProducts()
      .then((response: any) => {
        this.products = response.data;
        this.filteredProducts = this.products;
        let allBrandList = response.data.map((product) => {
          return product.Brand;
        });
        let uniqueBrandList = allBrandList.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
        this.store.setBrandList(uniqueBrandList);
        this.loadingProducts = false;
      })
      .catch((e: Error) => {
        console.log(e);
      });
  },
});
</script>

<template>
  <div class="py-5 min-h-[1300px] relative">
    <Spinner v-if="loadingProducts" class="mt-96" />
    <div
      v-else
      class="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] lg:grid-cols-[repeat(3,minmax(12rem,1fr))] xl:grid-cols-[repeat(4,minmax(12rem,1fr))] gap-5"
    >
      <!-- class="h-90" -->

      <ProductCard
        v-for="(product, i) in displayedPosts"
        :key="i"
        :title="product.Device"
        :price="product.A"
        :productInfo="product"
        :original-price="product.Regular_Price"
        type="phone"
      />
    </div>
    <div class="absolute -bottom-20 md:-bottom-8 right-0">
      <nav aria-label="Page navigation example">
        <ul class="flex">
          <li class="hover:bg-gray-300">
            <button
              type="button"
              class="p-2 border border-gray-300 rounded"
              :class="{
                'bg-gray-400 text-gray-500': currentPage == 1,
              }"
              :disabled="currentPage == 1"
              @click="currentPage--"
            >
              Previous
            </button>
          </li>
          <li>
            <button
              type="button"
              class="p-2 px-3 border border-gray-300 hover:bg-gray-300 mx-1 rounded"
              :class="{
                'bg-blue-primary hover:bg-blue-primary':
                  pageNumber == currentPage,
              }"
              v-for="pageNumber in pages"
              :key="pageNumber"
              @click="currentPage = pageNumber"
            >
              {{ pageNumber }}
            </button>
          </li>
          <li class="hover:bg-gray-300">
            <button
              type="button"
              @click="currentPage++"
              :disabled="currentPage == pages.length"
              :class="{
                'bg-gray-400 text-gray-500': currentPage == pages.length,
              }"
              class="p-2 border border-gray-300 rounded"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
