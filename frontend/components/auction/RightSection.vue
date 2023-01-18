<script setup lang="ts">
import { onMounted } from 'vue'
import image1 from '@/assets/dummyImages/img1.jpg'
import image2 from '@/assets/dummyImages/img2.jpg'
import image3 from '@/assets/dummyImages/img3.jpg'

export interface products {
  title: string
  price?: string
  image?: any
}

onMounted(() => {
  console.log('Mounted')
})

const products: products[] = [
  {
    title: 'Iphone 14pro',
    price: '$1700.00',
    image: image1,
  },
  {
    title: 'Iphone 14',
    price: '$1600.00',
    image: image2,
  },
  {
    title: 'Pixel 7 pro',
    price: '$1200.00',
    image: image3,
  },
  {
    title: 'Iphone 14pro',
    price: '$1700.00',
    image: image1,
  },
  {
    title: 'Pixel 7 pro',
    price: '$1200.00',
    image: image3,
  },
  {
    title: 'Iphone 14',
    price: '$1600.00',
    image: image2,
  },
  {
    title: 'Iphone 14pro',
    price: '$1700.00',
    image: image1,
  },
  {
    title: 'Iphone 14',
    price: '$1600.00',
    image: image2,
  },
  {
    title: 'Pixel 7 pro',
    price: '$1200.00',
    image: image3,
  },
]
</script>

<template>
  <div>
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -m-4">
        <div class="lg:w-1/4 md:w-1/2 p-4 w-full text-center" v-for="(data, index) in products" :key="index">
          <a class="block relative h-48 rounded overflow-hidden cursor-pointer">
            <img
              alt="Product Image"
              class="w-full block object-cover object-center hover:-translate-y-24 hover:scale-110 transition-all duration-700"
              :src="data.image"
            />
          </a>
          <div class="mt-4">
            <a href="" class="cursor-pointer"
              ><h2 class="text-gray-900 title-font text-lg font-medium">{{ data.title }}</h2></a
            >
            <p class="mt-1">{{ data.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
