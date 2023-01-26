<script setup lang="ts">

useHead({
  title: 'FAQ',
  meta: [
    {
      name: 'description',
      content: 'If you have any questions, please contact us at sales@reaganwireless.com',
    },
  ],
})

const faq = [
  {
    title: 'Will I receive the same product that I see in the picture?',
    content:
      'Yes, you will receive the same product that you see in the picture. We have a very strict quality control system to ensure that the product you receive is the same as the product you see in the picture, quality may very.',
  },
  {
    title: 'Where can I view my sales receipt?',
    content:
      'We send all sales receipts to your email address. If you have not received your sales receipt, please check your spam folder. If you still cannot find it, please contact us at: sales@reaganwireless.com',
  },
  {
    title: 'How can I return an item?',
    content:
      'All Whole items are non-refundable. If you have any questions about your order, please contact us at: complaints@reaganwireless.com, All individual sold items purchased through our shop, Amazon,or  Ebay are eligible for a full refund within 30 days of purchase. If you have any questions about your order, please contact us at: customersupport@reaganwireless.com',
  },
  {
    title: 'Will you restock items indicated as “out of stock?”',
    content:
      'Yes we will restock items indicated as “out of stock.” Please check back with us in a few days. If you have any questions about your order, please contact us at: customersupport@reaganwireless.com',
  },
  {
    title: 'Where can I ship my order?',
    content:
      'We ship to all countries. By using FedEx and Amazon we can ship to almost any countries in the world. If you have any questions about your order, please contact us at: sales@reaganwireless.com',
  },
]
</script>

<template>
  <div>
    <div class="bg-[#082B56]">
      <div class="p-10 mx-auto grid md:grid-cols-2">
        <div class="my-auto max-w-2xl lg:ml-12">
          <p class="text-red-400 font-semibold text-sm lg:text-base text-center md:text-left mb-3">This is the right place to have…</p>
          <p class="text-white text-xl lg:text-4xl font-bold pb-3 text-center md:text-left">All the Questions</p>
          <p class="text-white text-blue-300 text-center text-sm lg:text-base md:text-left">
            A list of common questions asked question by majority of our users.
            <br /><br />
            If you have any question please contact us at <span class="text-blue-100 font-semibold opacity-100 whitespace-nowrap p-0.5 select-all">+1-954-596-2355</span>,
            <!-- <br /> -->
            or send us an email at <span class="text-blue-100 font-semibold opacity-100 whitespace-nowrap p-0.5 select-all">sales@reaganwireless.com</span>
          </p>
        </div>
        <div>
          <img loading="lazy" src="~assets/images/faq_img.svg" class="m-auto" width="350" height="100" alt="talking_people" />
        </div>
      </div>
    </div>
    <div class="container mx-auto text-center mt-20">
      <p class="text-xl md:text-2xl lg:text-3xl font-bold text-center">Frequently asked Questions</p>
      <p class="text-sm md:text-base font-semibold text-gray-500 text-center px-6 lg:px-24">
        Below is a list of frequently asked questions. If you have any other questions, please contact us at
        <span class="text-black font-semibold opacity-100 whitespace-nowrap p-0.5 select-all">sales@reaganwireless.com</span>
      </p>
      <div class="p-5 container py-10 mx-auto grid md:grid-cols-3">
        <div>
          <img loading="lazy" src="~assets/images/asking_img.svg" class="flex m-auto" width="407" height="457" alt="asking" />
        </div>
        <div class="md:col-span-2">
          <Accordion :items="faq"></Accordion>
        </div>
      </div>
      <Subscribe />
    </div>
  </div>
</template>
