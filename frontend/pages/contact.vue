<script setup lang="ts">
import googleSheetApiService from '@/services/googleSheetApiService'
import { ref } from 'vue'

export interface contactInfo {
  name: string
  email: string
  phone: string
  msg: string
}

const contactInfo = ref<contactInfo>({
  name: '',
  email: '',
  phone: '',
  msg: '',
})


useHead({
  title: 'Contact Us',
  meta: [
    {
      name: 'description',
      content: 'We would love to help you! Send an email, make a call or visit out Office! Address: 720 South Powerline Rd Suite D Deerfield Beach FL 33442 U.S.A',
    },
  ],
})


const submitting = ref(false)

const submit = async () => {
  submitting.value = true
  await googleSheetApiService.postContact(JSON.stringify(contactInfo.value))
  contactInfo.value = {
    name: '',
    email: '',
    phone: '',
    msg: '',
  }
  submitting.value = false
}
</script>

<template>
  <div>
    <div class="pt-24 pb-12">
      <p class="text-center text-xl md:text-2xl lg:text-3xl font-bold">We Would Love To Help You</p>
    </div>
    <!-- <div class="p-5 container py-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-10 xl:gap-12"> -->
    <div class="p-5 container py-10 mx-auto flex flex-wrap justify-center gap-4 lg:gap-10 xl:gap-12">
      <div class="relative border border-gray-300 grow w-64 rounded-lg p-6 px-12 my-5">
        <div class="absolute bg-red-primary p-4 rounded-md -top-10">
          <img src="~assets/images/email_icon.svg" width="53" height="60" class="contact-card-icons" alt="email_icon" />
        </div>
        <div class="flex justify-end">
          <img src="~assets/images/email_icon_white.svg" width="53" height="60" class="contact-card-icons" alt="email_icon" />
        </div>
        <div class="flex flex-col gap-5">
          <h3 class="contact-card-heading">Send Email</h3>
          <div class="contact-card-content">
            <div class="mb-4 leading-5">
              <p class="sub-heading">Sales</p>
              <p class="select-all">sales@reaganwireless.com</p>
            </div>
            <div class="mb-4 leading-5">
              <p class="sub-heading">General Info</p>
              <p class="select-all">info@reaganwireless.com</p>
            </div>
            <div class="mb-4 leading-5">
              <p class="sub-heading">Suggestions & Complaints</p>
              <p class="select-all">complaints@reaganwireless.com</p>
            </div>
            <div class="mb-4 leading-5">
              <p class="sub-heading">Customer Support</p>
              <p class="select-all">customersupport@reaganwireless.com</p>
            </div>
          </div>
        </div>
      </div>
      <div class="relative border border-gray-300 grow w-64 rounded-lg p-6 px-12 my-5">
        <div class="absolute bg-red-primary p-4 rounded-md -top-10">
          <img src="~assets/images/call_icon.svg" width="53" height="60" class="contact-card-icons" alt="call_icon" />
        </div>
        <div class="flex justify-end">
          <img src="~assets/images/call_icon_white.svg" class="contact-card-icons" alt="call_icon" />
        </div>
        <div class="flex flex-col gap-5">
          <h3 class="contact-card-heading">Make A Call</h3>
          <div class="contact-card-content">
            <div class="mb-4 leading-5">
              <p class="sub-heading">Toll Free</p>
              <p class="select-all">877-724-3266</p>
            </div>
            <div class="mb-4 leading-5">
              <p class="sub-heading">International</p>
              <p class="select-all">1-954-596-2355</p>
            </div>
            <div class="mb-4 leading-5">
              <p class="sub-heading">WhatsApp</p>
              <p class="select-all">1-754-600-9064</p>
            </div>
          </div>
        </div>
      </div>
      <div class="relative border border-gray-300 grow w-64 rounded-lg p-6 px-12 my-5">
        <div class="absolute bg-red-primary p-4 rounded-md w-auto h-auto -top-10">
          <img src="~assets/images/location_icon_white.svg" width="53" height="60" class="contact-card-icons" alt="location_icon" />
        </div>
        <div class="flex justify-end">
          <img src="~assets/images/location_icon.svg" width="53" height="60" class="contact-card-icons" alt="location_icon" />
        </div>
        <div class="flex flex-col gap-5">
          <h3 class="contact-card-heading">Visit Our Office</h3>
          <div class="contact-card-content">
            <div class="mb-4 leading-5">
              <p class="sub-heading">Location</p>
              <p>720 South Powerline Rd Suite D Deerfield Beach FL 33442 U.S.A</p>
            </div>
            <div class="mb-4 leading-5">
              <p class="sub-heading">Hours of Operation</p>
              <p>Monday – Friday: 9:00am – 5:30pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-5 container py-24 mx-auto grid md:grid-cols-2 gap-10">
      <iframe
      title="Google Maps Location"
        class="w-full h-full min-h-[400px] md:min-h-[500px]"
        src="https://maps.google.com/maps?q=26.307562344073112,-80.14916326867528&hl=es;z=14&amp;output=embed&z=12"
      ></iframe>
      <div>
        <form @submit.prevent="submit()">
          <div class="mb-4">
            <label class="block text-sm text-gray-500 font-semibold mb-2" for="name"> Name* </label>
            <input
              v-model="contactInfo.name"
              class="shadow appearance-none text-sm md:text-base border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm text-gray-500 font-semibold mb-2" for="email"> Email* </label>
            <input
              v-model="contactInfo.email"
              class="shadow appearance-none text-sm md:text-base border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email "
              type="email"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm text-gray-500 font-semibold mb-2" for="phone"> Phone </label>
            <input
              v-model="contactInfo.phone"
              class="shadow appearance-none text-sm md:text-base border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              placeholder="Enter Your Number"
              type="tel"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm text-gray-500 font-semibold mb-2" for="msg">Message</label>
            <textarea
              v-model="contactInfo.msg"
              class="shadow appearance-none text-sm md:text-base border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64"
              id="msg"
              placeholder="Type here..."
            ></textarea>
          </div>
          <button class="flex justify-center bg-blue-primary text-white py-3 rounded p-2 px-12 text-center text-sm md:text-base mt-4 w-full md:w-auto" type="submit">
            <ButtonSpiner v-if="submitting" />
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.contact-card-heading {
  @apply text-center md:text-left text-lg md:text-xl lg:text-2xl font-semibold;
}
.contact-card-content {
  @apply text-center font-medium md:font-normal md:text-left text-sm lg:text-[15px] text-black-700 truncate whitespace-normal;
}
.contact-card-icons {
  @apply h-5 md:h-7 lg:h-10;
}

.sub-heading {
  @apply text-sm text-gray-400 font-semibold;
}
</style>
