<script setup lang="ts">
import landingBgImg from "@/assets/images/hero-bg.svg";
</script>

<template>
  <div>
    <section
      class="grid place-items-center text-center p-5 gap-5 grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] container mx-auto lg:p-10"
    >
      <div class="flex flex-col md:text-left gap-5 items-center md:items-start">
        <p>We Make Sales Happen!</p>
        <h1 class="text-5xl font-poppins leading-tight">
          <div class="font-bold text-blue-600">Apple IPhone</div>
          <div>13, Pro &amp; Pro Max</div>
        </h1>
        <p>
          The most reliable wholesale and retail mobile
          phone store.<br> If you are looking for a trusted shop, you can come to
          us!
        </p>
        <Button
          >Buy Now
          <div class="text-xl i-mdi-arrow-right-thin" />
        </Button>
      </div>
      <HeroCarousel />
    </section>
  </div>
</template>
