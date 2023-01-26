<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import image1 from '@/assets/dummyImages/img1.jpg'
import image2 from '@/assets/dummyImages/img2.jpg'
import image3 from '@/assets/dummyImages/img3.jpg'

import { useAuctionStore } from "@/stores/AuctionStore";
import { useAuthStore } from "@/stores/AuthStore";

export type User = {
  name: string
  email: string
}

export type Product = {
  title: string
  price?: string
  images?: File[] | string[]
  description?: string
  id?: string
  user?: User
  added_by?: string
  added_at?: Date
}

let openModal = ref(false)

useHead({
  title: 'Auction',
  meta: [
    {
      name: 'description',
      content: 'If you have any questions, please contact us at sales@reaganwireless.com',
    },
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/flowbite@1.6.0/dist/flowbite.min.css',
    },
  ],
  script: [
    {
      src: 'https://unpkg.com/flowbite@1.6.0/dist/flowbite.min.js',
    },
  ],
})

const auctionStore = useAuctionStore();
const authStore = useAuthStore();
let loading = ref(false);
let searchWord = ref('')
let sortByProperty = ref('Name')
const products: Product[] = [
  {
    title: 'Iphone 14pro',
    price: '$1700.00',
    images: [image1],
  },
]
let addProduct = reactive({
  title: '',
  price: '',
  description: '',
  images: [],
})
onMounted(() => {
  auctionStore.getAuctionProducts()
})
function onImageFileChanged(e) {
  var files = e.target.files
  addProduct.images = files
}
function handleAdd() {
  this.loading = true
  let onComplete = (completeStatus: boolean) => {
    if (completeStatus === true) {
      this.openModal = false;
      this.addProduct = {
        title: '',
        price: '',
        description: '',
        images: [],
      }
    }
    this.loading = false
  }
  auctionStore.addAuctionProduct(addProduct, onComplete)

}
function deleteProductImage(idx) {
  addProduct.images = Array.from(addProduct.images).filter((_, _idx) => idx !== _idx)
}
function getFilteredProducts() {
  let result = auctionStore.allProducts
  if (this.searchWord !== '') {
    result = auctionStore.allProducts.filter((product: Product) => product.title.toLowerCase().includes((this.searchWord as string).toLowerCase()));
  }
  if (this.sortByProperty === "Name") {
    result.sort((a: Product, b: Product) => a.title.localeCompare(b.title))
  }
  else if (this.sortByProperty === "Price") {
    result.sort((a: Product, b: Product) => Number(a.price) - Number(b.price))
  }
  else if (this.sortByProperty === "Date") {
    result.sort((a: Product, b: Product) => b.added_at - a.added_at)
  }
  return result
}

const isOpenSortDropDown = ref(false)
const selectedBrand = ref('')
</script>
<template>
  <div class="container mx-auto gap-2">
    <div class="container px-5 py-10 mx-auto">
      <div class="container flex flex-wrap">
        <!-- searchBox -->
        <div class="relative mx-4">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"></path>
            </svg>
          </div>
          <input v-model="searchWord" type="text" id="simple-search"
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 outline-0"
            placeholder="Search" />
        </div>
        <!-- sortFilter -->
        <div @click="isOpenSortDropDown = true" @mouseleave="isOpenSortDropDown = false" class="relative ml-auto">
          <div class="w-full lg:w-52 flex justify-between bg-gray-50 border border-gray-300 rounded-md p-2">
            <button class="text-sm md:text-base font-medium md:font-normal" v-if="sortByProperty">
              Sort by <b>{{ sortByProperty }}</b>
            </button>
            <button class="text-sm md:text-base font-medium md:font-normal" v-else>Sort by</button>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          <div v-if="isOpenSortDropDown"
            class="flex flex-col absolute w-full lg:w-52 b-0 z-10 text-sm md:text-base font-medium md:font-normal">
            <button @click="(sortByProperty = 'Name'), (isOpenSortDropDown = false)"
              class="bg-gray-50 hover:bg-gray-200 border border-gray-300 p-1">
              Sort By Name
            </button>
            <button @click="(sortByProperty = 'Price'), (isOpenSortDropDown = false)"
              class="bg-gray-50 hover:bg-gray-200 border border-gray-300 p-1">
              Sort By Price
            </button>
            <button @click="(sortByProperty = 'Date'), (isOpenSortDropDown = false)"
              class="bg-gray-50 hover:bg-gray-200 border border-gray-300 p-1">
              Sort By Date
            </button>
          </div>
        </div>
        <!-- Modal toggle -->

        <button v-if="Object.keys(authStore.user).length !== 0" @click="openModal = !openModal"
          class="flex ml-3 text-white bg-blue-500 border-0 py-2 px-3 focus:outline-none hover:bg-blue-400 rounded">
          Add New
        </button>
        <!-- Main modal -->
        <div
          class="fixed top-0 left-0 right-0 z-50  h-screen items-center justify-center w-full p-4 bg-black bg-opacity-40"
          :class="[openModal ? 'flex' : 'hidden']">
          <div class="relative max-w-2xl md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow">
              <!-- Modal header -->
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900">Add Product</h3>
                <button type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="openModal = !openModal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <!-- Modal body -->
              <div class="p-6 space-y-6">
                <form @submit.prevent="handleAdd()">
                  <div class="flex mb-2">
                    <div class="w-9/12">
                      <label for="title" class="block mb-2 text-sm font-medium">Title</label>
                      <input v-model="addProduct.title" type="text" id="title"
                        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required />
                    </div>
                    <div class="w-3/12 pl-3">
                      <label for="price" class="block mb-2 text-sm font-medium">Price</label>
                      <input v-model="addProduct.price" type="text" id="price"
                        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required />
                    </div>
                  </div>
                  <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Description</label>
                  <textarea v-model="addProduct.description" id="description" rows="6"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write details here..."></textarea>
                  <div class="flex items-center justify-center w-full mt-2">
                    <label for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                          </path>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag
                          and drop</p>
                        <p class="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                      </div>
                      <input ref="imageUploader" @change="onImageFileChanged" multiple id="dropzone-file" type="file"
                        accept="image/*" class="hidden" />
                    </label>
                  </div>

                  <div class="flex items-center mt-2" v-for="(image, idx) of Array.from(addProduct.images)">
                    <small><strong>{{ (image as File).name }}</strong></small>
                    <button type="button" @click="() => deleteProductImage(idx)"
                      class="ml-auto bg-red-600 text-white px-2 py-1 font-bold text-sm rounded">Delete</button>
                  </div>
                </form>
              </div>
              <!-- Modal footer -->
              <div
                class="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <!-- data-modal-hide="defaultModal" -->

                <button :disabled="loading" @click="handleAdd()" type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <span v-if="loading"><svg class="inline mr-2 w-4 h-4 text-gray-200 animate-spin fill-blue-600"
                      viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                    </svg></span>
                  <span v-else>Save</span>
                </button>
                <button :disabled="loading" @click="openModal = !openModal" type="button"
                  class="text-gray-500 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:text-gray-300 dark:hover:text-white">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
      <div v-if="auctionStore.allProducts === 'idle' || auctionStore.allProducts === 'loading'"
        class="flex items-center justify-center py-32">
        <strong>Loading Products</strong>
      </div>
      <div v-else class="flex flex-wrap">
        <div class="lg:w-1/4 md:w-1/2 p-4 w-full text-center" v-for="(data, index) in getFilteredProducts()"
          :key="index">
          <nuxt-link :to="`/auction/${data.id}`" class="block relative h-48 rounded overflow-hidden cursor-pointer">
            <img alt="Product Image"
              class="w-full block object-cover object-center hover:-translate-y-24 transition-all duration-700"
              :src="data.images[0]" />
          </nuxt-link>
          <div class="mt-4">
            <nuxt-link to="/auction/123" class="cursor-pointer">
              <h2 class="text-gray-900 title-font text-lg font-medium">{{ data.title }}</h2>
            </nuxt-link>
            <p class="mt-1">{{ data.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
