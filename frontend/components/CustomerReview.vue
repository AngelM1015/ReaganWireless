<script lang="ts">
import { defineComponent } from 'vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import stiveSmithImg from '@/assets/images/Stive Smith.jpg'
import ArishaSultanaImg from '@/assets/images/Arisha Sultana.svg'
import WiliumsonImg from '@/assets/images/Wiliusmson.jpg'

export default defineComponent({
  data() {
    return {
      customers: [
        {
          name: 'Stive Smith',
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          photo: stiveSmithImg,
          job: 'Customer',
          rating: 5,
        },
        {
          name: 'Arisha Sultana',
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          photo: ArishaSultanaImg,
          job: 'Customer',
          rating: 5,
        },
        {
          name: 'Wiliumson',
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          photo: WiliumsonImg,
          job: 'Customer',
          rating: 5,
        },
        {
          name: 'Stive Smith',
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          photo: stiveSmithImg,
          job: 'Customer',
          rating: 5,
        },
        {
          name: 'Arisha Sultana',
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          photo: ArishaSultanaImg,
          job: 'Customer',
          rating: 5,
        },
        {
          name: 'Wiliumson',
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
          photo: WiliumsonImg,
          job: 'Customer',
          rating: 5,
        },
      ],
      settings: {
        itemsToShow: 1,
        snapAlign: 'center',
      },
      breakpoints: {
        700: {
          itemsToShow: 2,
          snapAlign: 'center',
        },
        1024: {
          itemsToShow: 3,
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
  <carousel :settings="settings" :breakpoints="breakpoints" :items-to-show="1.5" :wrap-around="true">
    <slide v-for="(customer, i) in customers" :key="i">
      <div class="flex flex-col border rounded-md p-5 mx-4">
        <p class="text-left pb-10 text-black-600 text-sm">
          {{ customer.content }}
        </p>
        <div class="flex justify-between items-end">
          <div class="flex gap-2">
            <img loading="lazy" :src="customer.photo" width="60" height="60" alt="customer-photo" />
            <div>
              <p class="text-left text-sm md:text-base font-semibold font-medium">{{ customer.name }}</p>
              <p class="text-left text-sm font-semibold text-gray-400">{{ customer.job }}</p>
            </div>
          </div>
          <div class="flex items-center justify-bottom">
            <div class="text-sm md:text-lg i-mdi-star text-yellow-400"></div>
            <div class="text-sm md:text-lg i-mdi-star text-yellow-400"></div>
            <div class="text-sm md:text-lg i-mdi-star text-yellow-400"></div>
            <div class="text-sm md:text-lg i-mdi-star text-yellow-400"></div>
            <div class="text-sm md:text-lg i-mdi-star text-yellow-400"></div>
          </div>
        </div>
      </div>
    </slide>
    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>
