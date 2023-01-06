<script lang="ts">
import { defineComponent } from 'vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
export default defineComponent({
  props: {
    bestSellerLists: Array,
  },
  data() {
    return {
      settings: {
        itemsToShow: 1,
        snapAlign: 'start',
      },
      breakpoints: {
        300: {
          itemsToShow: 2,
          snapAlign: 'start',
        },
        700: {
          itemsToShow: 3,
          snapAlign: 'start',
        },
        1024: {
          itemsToShow: 5,
          snapAlign: 'start',
        },
      },
    }
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
})
</script>
<template>
  <!-- :autoplay="2000" -->

  <carousel :settings="settings" :breakpoints="breakpoints" :items-to-show="1.5">
    <slide v-for="(product, i) in bestSellerLists" :key="i">
      <ProductCard :title="product.Device" :price="product.A" :original-price="product.Regular_Price" :productInfo="product" type="phone" carousel />
    </slide>
    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<style>
.carousel_slide {
  @apply bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1;
}
</style>
