<script setup lang="ts">
import landingBgImg from '@/assets/images/hero-bg.svg'
import googleSheetApiService from '@/services/googleSheetApiService'
import { ref, onMounted } from 'vue'
import bestSellerImg from '@/assets/images/best-seller.svg'
import fastDeliveryImg from '@/assets/images/fast-delivery.svg'
import stampImg from '@/assets/images/stamp.svg'
import chatImg from '@/assets/images/chat.svg'


const faq = [
  {
    title: 'Will I receive the same product that I see in the picture?',
    content:
      'Yes, you will receive the same product that you see in the picture. We have a very strict quality control system to ensure that the product you receive is the same as the product you see in the picture.',
  },
  {
    title: 'Where can I view my sales receipt?',
    content:
      'We send all sales receipts to your email address. If you have not received your sales receipt, please check your spam folder. If you still cannot find it, please contact us at: sales@reaganwireless.com',
  },
  {
    title: 'How can I return an item?',
    content:
      'All Whole items are no\
      n-refundable. If you have any questions about your order, please contact us at: complaints@reaganwireless.com, All individual sold items purchased through our shop, Amazon,or  Ebay are eligible for a full refund within 30 days of purchase. If you have any questions about your order, please contact us at: customersupport@reaganwireless.com',
  },
  {
    title: 'Will you restock items indicated as “out of stock?”',
    content:
      'Yes we will restock items indicated as “out of stock.” Please check back with us in a few days. If you have any questions about your order, please contact us at: customersupport@reaganwireless.com',
  },
  {
    title: 'Where can I ship my order?',
    content:
      'We ship to all countries. By using FedEx and Amazon we can ship to almost country in the world. If you have any questions about your order, please contact us at: sales@reaganwireless.com',
  },
]

const articles = [
  {
    title: 'BEST PRODUCTS',
    content: 'Enjoy the best products at the best price',
    imgUrl: bestSellerImg,
  },
  {
    title: 'FAST DELIVERY',
    content: 'With our shipping you can expect a fast 2 day delivery',
    imgUrl: fastDeliveryImg,
  },
  {
    title: 'PHONE CHECK',
    content: 'Partnered with PhoneCheck to verify and certify all smartphones',
    imgUrl: stampImg,
  },
  {
    title: 'HAPPY TO BUY',
    content: "There's customers and there's family, you are family",
    imgUrl: chatImg,
  },
]
const bestSellers = ref([])
const recentProducts = ref([])
const loadingBestSeller = ref(true)
const loadingRecentSeller = ref(true)
onMounted(async () => {
  await googleSheetApiService
    .getSheetName({ sheetName: 'bestsellersJsonData' })
    .then((response: any) => {
      bestSellers.value = response.data
      loadingBestSeller.value = false
      console.log(response.data)
    })
    .catch((e: Error) => {
      console.log(e)
    })
  await googleSheetApiService
    .getSheetName({ sheetName: 'recentproductsJsonData' })
    .then((response: any) => {
      recentProducts.value = response.data
      loadingRecentSeller.value = false
      console.log(response.data)
    })
    .catch((e: Error) => {
      console.log(e)
    })
})
</script>

<template>
  <div>
    <div
      :style="{
        backgroundImage: `url(${landingBgImg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
      }"
    >
      <Hero />
      <section class="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-5 p-5 content-center container mx-auto">
        <article
          v-for="(article, i) in articles"
          :key="i"
          class="bg-white hover:bg-blue-600 rounded-xl p-5 hover:text-white flex flex-col items-center text-center gap-3 shrink-0 shadow-lg"
        >
          <img loading="lazy" :src="article.imgUrl" width="69" height="69" alt="article" />
          <h2 class="text-sm md:text-base font-semibold md:font-bold uppercase">{{ article.title }}</h2>
          <p class="text-sm md:text-base">{{ article.content }}</p>
        </article>
      </section>
    </div>
    <div :style="{ backgroundColor: '#F6FAFB' }">
      <section class="p-5 pt-32 grid items-center text-center gap-5 container mx-auto md:grid-cols-2 md:text-left">
        <div class="flex flex-col items-center md:items-start gap-5">
          <h2 class="text-xl lg:text-2xl font-semibold text-green-600">24/7 Support</h2>
          <div class="flex gap-5 items-center p-5">
            <img loading="lazy" src="~assets/images/phonecheckmark.png" class="h-full" width="108" height="100" alt="phone-check" />
            <h3 class="font-bold text-teal-600 text-xl md:text-2xl lg:text-3xl md:text-5xl">Certified By Phonecheck</h3>
          </div>
          <p class="text-sm md:text-base">
            Our team is here 24 hours a day to help you get started and support you along the way. Our average response time is under 2 minutes.
          </p>
          <Button secondary class="text-sm md:text-lg lg:text-xl"
            >Check Now
            <div class="text-base md:text-xl i-mdi-arrow-right-thin" />
          </Button>
        </div>
        <img src="~/assets/images/phonecheck.svg" class="animation-bounce" width="622" height="505" alt="phoneCheck" />
      </section>
    </div>
    <div class="bg-[#FFFFF]">
      <section class="p-5 py-20 flex flex-col gap-5 container mx-auto">
        <h2 class="pl-2 border-l-8 border-blue-600 uppercase font-semibold">Best Seller</h2>
        <Spinner v-if="loadingBestSeller" />
        <BestSellerCarousel v-else :bestSellerLists="bestSellers" />
      </section>
    </div>
    <section class="p-5 py-20 flex flex-col gap-5 container mx-auto">
      <h2 class="pl-2 border-l-8 border-blue-600 uppercase font-semibold">Recent Products</h2>
      <Spinner v-if="loadingRecentSeller" />

      <div v-else class=" grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] lg:grid-cols-[repeat(4,minmax(12rem,1fr))] gap-10">
        <ProductCard
          v-for="(product, i) in recentProducts"
          :key="i"
          :title="product.Device"
          :price="product.A"
          :productInfo="product"
          :original-price="product.Regular_Price"
          type="phone"
        />
      </div>
    </section>
    <section class="p-5 grid gap-4 md:gap-6 lg:gap-10 md:grid-cols-2 container mx-auto">
      <div class="flex flex-col gap-4 lg:gap-5">
        <div class="relative w-full">
          <img loading="lazy" src="~assets/images/dot.svg" alt="" class="absolute" />
          <img loading="lazy" src="~assets/images/about.svg" class="pt-2 pl-2 z-10 relative w-full" width="639" height="507" alt="about" />
        </div>
        <div class="flex flex-wrap lg:flex-nowrap gap-5 md:gap-2 justify-center md:justify-between">
          <article class="text-center lg:text-left bg-white h-auto shadow-lg p-3 pb-6 rounded-xl gap-2 md:gap-4 w-full lg:w-2/4 flex align-center flex-col">
            <h2 class="flex gap-2 justify-center lg:text-left items-center h-10 text-base md:text-base lg:text-lg font-bold">
              <div class="bg-blue-600 text-white rounded-full p-2 text-sm md:text-base">
                <div class="i-mdi-phone"></div>
              </div>
              Phone
            </h2>
            <div class="text-sm xl:px-5">
              <p>Toll Free: <span class="font-bold text-gray-700 select-all whitespace-nowrap">1-877-724-3266</span></p>
              <p>International: <span class="font-bold text-gray-700 select-all whitespace-nowrap">1-954-596-2355</span></p>
              <p>Fax: <span class="font-bold text-gray-700 select-all whitespace-nowrap">1-954-596-0070</span></p>
            </div>
          </article>
          <article class="text-center lg:text-left bg-white h-auto shadow-lg p-3 pb-6 rounded-xl gap-2 md:gap-4 w-full lg:w-2/4 flex align-center flex-col">
            <h2 class="flex gap-2 justify-center lg:text-left items-center h-10 text-base md:text-base lg:text-lg font-bold">
              <div class="bg-blue-600 text-white rounded-full p-2 text-sm md:text-base">
                <div class="i-mdi-place"></div>
              </div>
              Location
            </h2>
            <div class="select-all text-sm font-medium md:text-sm xl:px-5">
              <p class="whitespace-nowrap">720 South Powerline Rd Suite D,</p>
              <p>Deerfield Beach <span class="whitespace-nowrap">FL 33442</span> U.S.A</p>
            </div>
          </article>
        </div>
      </div>
      <div class="text-center md:text-left flex flex-col gap-6">
        <h2 class="uppercase text-base md:text-lg lg:text-xl text-blue-600 font-semibold mt-6">About our company</h2>
        <p class="font-bold text-lg md:text-2xl lg:text-3xl md:leading-10">
          Reagan Wireless is one of the country’s most trusted value-added suppliers of wholesale cell phones and accessories.
        </p>
        <p class="leading-relaxed text-sm md:text-base">
          We source new and used cell phones and accessories directly from carrier trade-in programs, big-box retailers, and manufacturers.
        </p>
        <p class="leading-relaxed text-sm md:text-base">
          All cell phones and accessories that we source undergo our stringent, best-in-class triage process during which they are both functionally tested and
          cosmetically graded. As veterans of the industry, we are well aware of the challenges that come along with inconsistent and incomplete triage, and we,
          therefore, strive to differentiate ourselves through transparency and consistency.
        </p>
        <p class="leading-relaxed text-sm md:text-base">
          We aim to redefine this industry by using best in class technology to simplify the process of buying and selling used wholesale cell phones and accessories.
          Please use the links on the right to help you get started.
        </p>
        <div>
          <p class="block leading-7 text-sm md:text-base">Covid-19 Update:</p>
          <p class="md:leading-7 text-sm md:text-base font-semibold text-gray-600">No Mask Required at Reagan Wireless</p>
          <p class="md:leading-7 text-sm md:text-base font-semibold text-gray-600">All Employees are Vaccinated</p>
        </div>
      </div>
    </section>
    <div class="bg-[#FFFF]">
      <section class="p-5 container mx-auto">
        <p class="text-center text-xl md:text-3xl lg:text-4xl font-bold my-12">What Our Customers Say</p>
        <CustomerReview />
      </section>
    </div>
    <Subscribe />
    <section class="mt-6">
      <p class="text-center text-xl md:text-3xl lg:text-4xl font-bold text-blue-primary">Find us on Google Maps</p>
      <p class="text-black-700 text-sm font-medium md:font-normal md:text-base text-center my-6">Clicking on Directions will send you to Google Maps</p>
      <iframe title="Google Maps Location" class="w-full h-[490px]" src="https://maps.google.com/maps?q=26.307562344073112,-80.14916326867528&hl=es;z=14&amp;output=embed&z=12"></iframe>
    </section>
  </div>
</template>
<style scoped>
.article-description:hover {
  color: white !important;
}
.animation-bounce {
  animation: bounce 1.5s infinite;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(-1%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
}
</style>
