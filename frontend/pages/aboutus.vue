
<script setup lang="ts">

useHead({
  title: 'About Us',
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
    <body style="overflow: hidden">
          <div class="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
              <div class="flex flex-col lg:flex-row justify-between gap-8">
                  <div class="w-full lg:w-5/12 flex flex-col justify-center">
                      <h1 class="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About Us</h1>
                      <p class="font-normal text-base leading-6 text-gray-600">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.In the first place we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from</p>
                  </div>
                  <div class="w-full lg:w-8/12">
                      <img class="w-full h-full" src="https://i.ibb.co/FhgPJt8/Rectangle-116.png" alt="A group of People" />
                  </div>
              </div>
  
              <div class="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                  <div class="w-full lg:w-5/12 flex flex-col justify-center">
                      <h1 class="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Story</h1>
                      <p class="font-normal text-base leading-6 text-gray-600">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.In the first place we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from</p>
                  </div>
                  <div class="w-full lg:w-8/12 lg:pt-8">
                      <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                          <div class="p-4 pb-6 flex justify-center flex-col items-center">
                              <img class="md:block hidden" src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png" alt="Alexa featured Image" />
                              <img class="md:hidden block" src="https://i.ibb.co/zHjXqg4/Rectangle-118.png" alt="Alexa featured Image" />
                              <p class="font-medium text-xl leading-5 text-gray-800 mt-4">Alexa</p>
                          </div>
                          <div class="p-4 pb-6 flex justify-center flex-col items-center">
                              <img class="md:block hidden" src="https://i.ibb.co/fGmxhVy/Rectangle-119.png" alt="Olivia featured Image" />
                              <img class="md:hidden block" src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png" alt="Olivia featured Image" />
                              <p class="font-medium text-xl leading-5 text-gray-800 mt-4">Olivia</p>
                          </div>
                          <div class="p-4 pb-6 flex justify-center flex-col items-center">
                              <img class="md:block hidden" src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png" alt="Liam featued Image" />
                              <img class="md:hidden block" src="https://i.ibb.co/C5MMBcs/Rectangle-120.png" alt="Liam featued Image" />
                              <p class="font-medium text-xl leading-5 text-gray-800 mt-4">Liam</p>
                          </div>
                          <div class="p-4 pb-6 flex justify-center flex-col items-center">
                              <img class="md:block hidden" src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png" alt="Elijah featured image" />
                              <img class="md:hidden block" src="https://i.ibb.co/ThZBWxH/Rectangle-121.png" alt="Elijah featured image" />
                              <p class="font-medium text-xl leading-5 text-gray-800 mt-4">Elijah</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </body>
  </template>
