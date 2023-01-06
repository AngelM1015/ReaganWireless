<script setup lang="ts">
import googleSheetApiService from '@/services/googleSheetApiService'
import { defineComponent, onMounted } from 'vue'

const route = useRoute()
const productInfo = ref({})
const colors = ref([])
const colorTypes = ref([])
const photoUrls = ref({})
const shopUrls = ref({})
const buyCount = ref<number>(0)
const selectedColor = ref('')
const selectedType = ref('')
const selectedPhotoUrl = ref('')
const descriptionPhotoUrl = ref('')
const selectedShopUrls = ref([])
const selectedPhotoNumber = ref(0)

onMounted(async () => {
  await googleSheetApiService
    .getProductByDeviceName({ deviceName: route.params.id[0] })
    .then((response: any) => {
      productInfo.value = response.data[0]
      colors.value = Object.values(JSON.parse(productInfo.value.Colors))
      colorTypes.value = Object.keys(JSON.parse(productInfo.value.Colors))
      photoUrls.value = JSON.parse(productInfo.value.Photos)
      shopUrls.value = JSON.parse(productInfo.value.Shops)

      selectedType.value = colorTypes.value[0]
      selectedColor.value = colors.value[0]
      selectedPhotoUrl.value = photoUrls.value[selectedType.value][0]
      descriptionPhotoUrl.value = selectedPhotoUrl.value
      selectedShopUrls.value = shopUrls.value[selectedType.value]
    })
    .catch((e: Error) => {
      console.log(e)
    })
})

const selectType = (type, color) => {
  selectedType.value = type
  selectedColor.value = color
  selectedShopUrls.value = shopUrls.value[selectedType.value]
  selectedPhotoNumber.value = 0
  selectedPhotoUrl.value = photoUrls.value[selectedType.value][0]
}

const clickPhoto = (selectedUrl, no) => {
  selectedPhotoUrl.value = selectedUrl
  selectedPhotoNumber.value = no
}
</script>

<template>
  <div>
    <section class="p-5 py-20 gap-5 container mx-auto">
      <div class="grid gap-5 lg:grid-cols-2 w-full">
        <div class="flex flex-col gap-1">
          <div>
            <img :src="selectedPhotoUrl" class="w-auto h-72 m-auto" alt="product-photo" />
          </div>
          <div class="mx-auto">
            <div class="flex gap-5 xl:gap-10">
              <img
                v-for="(url, i) in photoUrls[selectedType]"
                @click="clickPhoto(url, i)"
                :src="url"
                :key="url"
                class="w-auto h-16 md:h-20 lg:h-24"
                :class="{
                  'border-2 border-blue-primary': i == selectedPhotoNumber,
                }"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3 md:gap-5 items-center md:items-start">
          <p class="text-xl md:text-2xl lg:text-3xl font-bold">{{ productInfo.Device }}</p>
          <div
            class="flex flex-wrap gap-0.5 md:gap-2 justify-center md:justify-start text-sm font-medium lg:font-normal text-gray-700 md:text-black lg:text-base w-full md:w-auto"
          >
            <div class="p-2 px-4 bg-gray-200 rounded-md text-center w-max md:w-auto">
              Regular Price: <b>${{ productInfo.Regular_Price }}</b>
            </div>
            <div
              class="p-2 px-4 rounded-md text-center w-max md:w-auto border"
              :class="productInfo.In_Stock ? 'bg-green-100  border-green-400' : 'bg-red-100 border-red-400'"
            >
              <b>{{ productInfo.In_Stock ? 'In Stock' : 'Out of Stock' }}</b>
            </div>
            <div class="p-2 px-4 bg-gray-200 rounded-md text-center w-max md:w-auto">
              Brand: <b>{{ productInfo.Brand }}</b>
            </div>
          </div>
          <div class="flex items-center flex-wrap gap-1 md:gap-3">
            <div class="w-16 text-sm md:text-base font-semibold text-gray-600">Storage</div>
            <p class="p-2 rounded-md text-sm font-medium" :class="productInfo.Size == 128 ? 'bg-blue-primary text-white' : 'bg-gray-200 text-gray-500'">128GB</p>
            <p class="p-2 rounded-md text-sm font-medium" :class="productInfo.Size == 256 ? 'bg-blue-primary text-white' : 'bg-gray-200 text-gray-500'">256GB</p>
            <p class="p-2 rounded-md text-sm font-medium" :class="productInfo.Size == 512 ? 'bg-blue-primary text-white' : 'bg-gray-200 text-gray-500'">512GB</p>
            <p class="p-2 bg-gray-200 rounded-md text-sm font-medium" :class="productInfo.Size == 1024 ? 'bg-blue-primary text-white' : 'bg-gray-200 text-gray-500'">
              1TB
            </p>
          </div>
          <div class="flex items-center gap-5">
            <div class="w-16 text-sm md:text-base font-semibold text-gray-600">Color</div>
            <div
              v-for="(color, i) in colors"
              @click="selectType(colorTypes[i], color)"
              :key="i"
              class="w-6 h-6 rounded-full cursor-pointer"
              :style="{
                backgroundColor: `${color}`,
              }"
              :class="{
                'border-2 border-blue-primary': selectedColor == color,
              }"
            ></div>
          </div>
          <div class="flex items-center gap-5">
            <div class="w-16 text-sm md:text-base font-semibold text-gray-600">Quantity</div>
            <div class="flex items-center">
              <button
                @click="buyCount--"
                :disabled="buyCount === 0"
                class="bg-blue-100 border-l border-t border-b rounded-l-md text-xl h-8 p-1"
                :class="buyCount === 0 ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : 'hover:bg-blue-300 active:bg-blue-500 active:text-white border-blue-primary'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 13H5v-2h14v2Z" />
                </svg>
              </button>
              <div class="flex border justify-center items-center border-blue-primary w-10 h-8 px-2">
                <p>
                  {{ buyCount }}
                </p>
              </div>
              <button
                @click="buyCount++"
                class="bg-blue-100 border-r border-t border-b border-blue-primary rounded-r-md text-xl h-8 p-1 hover:bg-blue-300 active:bg-blue-500 active:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />
                </svg>
              </button>
            </div>
          </div>
          <button
            :disabled="buyCount === 0"
            :class="buyCount === 0 ? 'bg-gray-500 opacity-50 cursor-not-allowed' : 'bg-blue-primary '"
            class="w-10/12 md:w-24 p-3 text-white rounded-md m-auto md:m-0 text-sm md:text-base"
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
    <section class="p-5 py-20 gap-5 container mx-auto">
      <div>
        <div class="w-8/12 border-b border-gray-300">
          <button class="bg-red-primary rounded-t-md text-white p-2">Description</button>
        </div>
        <div class="grid grid-cols-4 md:flex-nowrap gap-5 items-center">
          <img :src="descriptionPhotoUrl" class="col-span-4 md:col-span-1" alt="description-photo" />
          <div class="col-span-4 md:col-span-3 flex flex-col gap-6 py-5">
            <p class="text-xl md:text-2xl font-bold">
              {{ productInfo.Device }}
            </p>
            <p class="text-gray-600 text-sm md:text-base">
              {{ productInfo.Extra_Details }}
            </p>
            <div class="flex flex-col gap-2">
              <p class="text-red-primary font-bold text-sm md:font-medium">APPLY FOR WHOLESALE TODAY!</p>
              <p class="text-sm md:text-base">Retail customers shop for cases on our ebay store here.</p>
            </div>
            <div class="flex flex-wrap items-center m-auto md:m-0 justify-between md:justify-start gap-10">
              <a :href="selectedShopUrls[0]" target="_blank">
                <img loading="lazy" src="~assets/images/EBay_logo.svg" class="w-24 md:w-auto" width="189" height="75" alt="Ebay_logo" />
              </a>
              <a :href="selectedShopUrls[1]" target="_blank">
                <img loading="lazy" src="~assets/images/Amazon_logo.svg" class="w-24 md:w-auto pt-4 md:pt-8" width="245" height="75" alt="Amazon_logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Subscribe />
  </div>
</template>
