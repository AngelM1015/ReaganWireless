<script setup lang="ts">
import googleSheetApiService from '@/services/googleSheetApiService'
import { ref } from 'vue'

const subscribeEmail = ref<string>('')
const sending = ref<boolean>(false)

const subscribe = async () => {
  sending.value = true
  await googleSheetApiService.postSubscribers(JSON.stringify({ email: subscribeEmail.value }))
  subscribeEmail.value = ''
  sending.value = false
}
</script>

<template>
  <section class="p-5 py-10 gap-5 container mx-auto">
    <div class="grid lg:grid-cols-2 bg-blue-primary px-5 md:px-0 pt-5 lg:pt-0 rounded-md">
      <div class="flex flex-col gap-3 m-auto text-center">
        <p class="text-xl md:text-3xl lg:text-4xl text-center lg:text-left text-white font-bold">Stay Updated!</p>
        <p class="text-sm md:text-base lg:text-lg text-center text-blue-200 font-semibold lg:text-left text-white">Subscribe to our newsletter</p>
        <form @submit.prevent="subscribe()" class="flex justify-center m-auto md:m-0">
          <input v-model="subscribeEmail" class="h-10 md:h-12 rounded-l-lg pl-5 outline-0 text-sm w-4/5 text-xs font-semibold md:font-medium md:text-sm" type="email" placeholder="Enter Your Email" />
          <button class="flex items-center h-10 md:h-12 bg-red-primary rounded-r-lg text-white p-1.5 md:p-2 text-xs md:text-sm  font-medium md:font-normal" type="submit">
            <ButtonSpiner  v-if="sending" />
            Subscribe
          </button>
        </form>
      </div>
      <div class="pt-6">
        <img src="~assets/images/girl_with_phone.png" alt="subscribe-image" width="320" height="300" class="flex m-auto" loading="lazy" />
      </div>
    </div>
  </section>
</template>
