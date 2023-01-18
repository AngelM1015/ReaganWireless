<script lang="ts">
import { defineComponent } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import image1 from '@/assets/dummyImages/img1.jpg'
import image2 from '@/assets/dummyImages/img2.jpg'
import image3 from '@/assets/dummyImages/img3.jpg'
import { useAuctionStore } from '@/stores/AuctionStore'

export default defineComponent({
  name: 'id',
  setup() {
    let auctionStore = useAuctionStore()
    return { auctionStore }
  },
  data: () => ({
    currentSlide: 0,
    imagesSlide: [image3, image2, image1],
  }),
  methods: {
    slideTo(val) {
      this.currentSlide = val
    },
    async copyUrl() {
      try {
        await navigator.clipboard.writeText(document.URL)
        alert('Copied')
      } catch (e) {
        alert('Cannot copy')
      }
    },
  },
  mounted() {
    this.auctionStore.getAuctionProduct(this.$route.params.id)
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
})
</script>
<template>
  <div class="container mx-auto">
    <strong class="flex w-full items-center justify-center py-32" v-if="auctionStore.singleProduct == 'idle' || auctionStore.singleProduct == 'loading'">
      Loading Product Detail
    </strong>
    <div v-else class="px-5 py-8">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <div class="lg:w-1/2 w-full lg:py-6">
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">{{ auctionStore.singleProduct.title }}</h1>
          <div class="flex mb-4">
            <a class="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Description</a>
          </div>
          <p class="leading-relaxed mb-4">
            {{ auctionStore.singleProduct.description }}
          </p>
          <!--  -->
          <div class="flex my-8 items-center">
            <img class="w-12 h-12 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Agent" />
            <p class="pl-5">{{ auctionStore.singleProduct.user.name }}</p>
          </div>
          <!--  -->
          <div class="flex items-center">
            <a
              :href="`tel:${auctionStore.singleProduct?.owner_phone}`"
              class="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            >
              Call
            </a>
            <button @click="copyUrl()" class="ml-2 flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Copy Url</button>
            <span class="title-font ml-auto font-medium text-2xl text-gray-900">${{ auctionStore.singleProduct.price }}</span>
          </div>
        </div>
        <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <Carousel id="gallery" :items-to-show="1" :autoplay="3000" :wrap-around="true" v-model="currentSlide">
            <Slide v-for="slide in auctionStore.singleProduct.images" :key="slide">
              <img :src="slide" class="carousel__item" />
            </Slide>
          </Carousel>

          <Carousel id="thumbnails" :items-to-show="4" :wrap-around="true" v-model="currentSlide" ref="carousel">
            <Slide v-for="slide in auctionStore.singleProduct.images" :key="slide">
              <img class="carousel__item" @click="slideTo(slide - 1)" :src="slide" />
            </Slide>
          </Carousel>
        </div>
      </div>
    </div>
  </div>
</template>
