<script setup lang="ts">
import googleSheetApiService from '@/services/googleSheetApiService'
import { ref } from 'vue'

export interface AccessInfo {
  fName: string
  lName: string
  email: string
  company: string
  country: string
  phone: string
}

const accessInfo = ref<AccessInfo>({
  fName: '',
  lName: '',
  email: '',
  company: '',
  country: '',
  phone: '',
})

useHead({
  title: 'Wholesale - How to buy?',
  meta: [
    {
      name: 'description',
      content:
        "It's so easy! Just submit the form with your information to request access to the online application. Applications are approved within 1-3 business days.",
    },
  ],
})

const submitting = ref(false)

const submit = async () => {
  submitting.value = true
  console.log(accessInfo.value)
  await googleSheetApiService.postLeads(JSON.stringify(accessInfo.value)).then(() => {
    accessInfo.value = {
      fName: '',
      lName: '',
      email: '',
      company: '',
      country: '',
      phone: '',
    }
    submitting.value = false
  })
}
</script>
<template>
  <div>
    <div class="bg-[#082B56]">
      <div class="p-5 container py-10 mx-auto grid md:grid-cols-2">
        <div class="my-auto text-sky-100 text-sm lg:text-base">
          <p class="text-xl text-white md:text-2xl lg:text-4xl font-bold pb-5 text-center md:text-left">HOW TO BUY</p>
          <p class="pb-5 text-center md:text-left">
            <span class="font-bold">It's so easy!</span> Just submit the form with your information to request access to the online application.
          </p>
          <p class="flex pb-2 justify-center md:justify-start">
            <img loading="lazy" src="~assets/images/check_vector.svg" class="mr-2" width="14" height="14" alt="check_mark" />
            <span>Applications are approved within 1-3 business days.</span>
          </p>
          <p class="flex pb-2 justify-center md:justify-start">
            <img loading="lazy" src="~assets/images/check_vector.svg" class="mr-2" width="14" height="14" alt="check_mark" />
            <span>For wholesale large bulk purchases only.</span>
          </p>
        </div>
        <div>
          <img loading="lazy" src="~assets/images/talking_people.svg" class="m-auto" width="500" height="310" alt="talking_people" />
        </div>
      </div>
    </div>

    <div class="p-5 py-10 container mx-auto">
      <div class="grid md:grid-cols-2 rounded-xl border mt-10">
        <div class="bg-red-primary py-16 md:py-32 rounded-l-none md:rounded-bl-xl rounded-tl-xl rounded-tr-xl md:rounded-tr-none">
          <p class="text-white text-sm lg:text-lg text-center font-bold">You MUST have a current and valid Tax ID</p>
          <p class="text-white text-sm lg:text-lg text-center">to complete our online wholesale new customer application.</p>
          <img loading="lazy" src="~assets/images/caluator_man.svg" width="506" height="426" class="mx-auto mt-10 md:mt-28" />
        </div>
        <div class="py-8 px-8">
          <div class="mb-6">
            <p class="text-lg md:text-xl lg:text-2xl font-bold mb-4">REQUEST ACCESS</p>
          </div>
          <form @submit.prevent="submit()">
            <p class="text-sm text-slate-400 font-semibold mb-8">Fields marked with * are required</p>
            <div class="mb-4">
              <label class="block text-sm text-gray-500 font-semibold mb-2" for="firstName"> FirstName* </label>
              <input
                v-model="accessInfo.fName"
                class="shadow appearance-none border rounded w-full py-3 text-sm md:text-base px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm text-gray-500 font-semibold mb-2" for="lname"> LastName* </label>
              <input
                v-model="accessInfo.lName"
                class="shadow appearance-none border rounded w-full py-3 text-sm md:text-base px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm text-gray-500 font-semibold mb-2" for="email"> Email* </label>
              <input
                v-model="accessInfo.email"
                class="shadow appearance-none border rounded w-full py-3 text-sm md:text-base px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email "
                type="email"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm text-gray-500 font-semibold mb-2" for="company"> Company* </label>
              <input
                v-model="accessInfo.company"
                class="shadow appearance-none border rounded w-full py-3 text-sm md:text-base px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="company"
                type="text"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm text-gray-500 font-semibold mb-2" for="country"> Country* </label>
              <input
                v-model="accessInfo.country"
                class="shadow appearance-none border rounded w-full py-3 text-sm md:text-base px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="contry"
                type="text"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm text-gray-500 font-semibold mb-2" for="phone"> Phone* </label>
              <input
                v-model="accessInfo.phone"
                class="shadow appearance-none border rounded w-full py-3 text-sm md:text-base px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                required
              />
            </div>
            <button class="flex justify-center bg-blue-primary text-white py-3 rounded p-2 px-12 text-center text-sm md:text-base mt-4 w-full md:w-auto" type="submit">
              <ButtonSpiner v-if="submitting" />
              Request Access
            </button>
          </form>
        </div>
      </div>
      <div class="grid md:grid-cols-2 mt-20">
        <div class="mb-8">
          <div class="mb-4">
            <p class="font-bold text-center md:text-left">We keep your information secure</p>
            <p class="pt-4 text-center md:text-left text-sm md:text-base">
              Reagan Wireless respects your privacy and we never share your information with any other parties.
              <!-- To read our Privacy Statement in
            full CLICK HERE. -->
            </p>
          </div>
          <div>
            <p class="pt-4 font-bold pb-1 text-center md:text-left mb-2">We proudly accept</p>
            <img loading="lazy" src="~assets/images/payments.png" class="m-auto md:m-0" width="179" height="39" alt="visa" />
          </div>
        </div>
        <div class="px-10">
          <p class="font-bold text-center">Retail Customers can buy our products at our Ebay Store</p>
          <div class="flex m-auto">
            <div class="flex items-center gap-10 mx-auto">
              <a href="#" target="_blank">
                <img loading="lazy" src="~assets/images/EBay_logo.svg" class="w-24 md:w-auto" width="189" height="75" alt="Ebay_logo" />
              </a>
              <a href="#" target="_blank">
                <img loading="lazy" src="~assets/images/Amazon_logo.svg" class="w-24 md:w-auto pt-4 md:pt-8" width="245" height="75" alt="Amazon_logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
