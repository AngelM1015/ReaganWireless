<script setup lang="ts">
const socials = [
  { link: '#', iconPath: '_nuxt/assets/images/facebook.svg', ariaLabel: 'Facebook Page Link' },
  { link: '#', iconPath: '_nuxt/assets/images/twitter.svg', ariaLabel: 'Twitter Account Link' },
  { link: '#', iconPath: '_nuxt/assets/images/pinterest.svg', ariaLabel: 'Pinterest Link' },
]
</script>
<template>
  <div class="border-b border-cyan-300 custom-gradient">
    <footer class="grid p-5 text-white flex-col py-20 gap-5 container mx-auto">
      <div class="gap-x-10 gap-y-10 mt-5 md:mt-0 grid grid-cols-[repeat(auto,minmax(12rem,1fr))] w-full md:grid-cols-[repeat(4,minmax(8rem,1fr))]">
        <div class="flex flex-col gap-5 text-sm items-center md:items-start text-center md:text-left">
          <img loading="lazy" src="~assets/images/logo.svg" alt="logo" class="max-w-full w-[13rem] mx-auto md:m-0" width="167" height="60" />
          <p>720 South Powerline Rd. Suite D Deerfield Beach FL 33442</p>
          <div class="flex gap-3 flex-wrap">
            <span> Follow Us </span>
            <a :href="social.link" v-for="(social, i) of socials" :key="i" :aria-label="social.ariaLabel">
              <img loading="lazy" :src="social.iconPath" alt="social-icon" width="24" height="24" />
            </a>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <h3 class="text-md font-semibold text-center md:text-left">How to buy</h3>
          <ul class="flex flex-col font-medium text-center text-sm md:text-left leading-7 footer-text">
            <li><router-link to="/wholesale" class="footer-text-hover">Wholesale Application</router-link></li>
            <li><router-link to="/company" class="footer-text-hover">About Us</router-link></li>
            <li><router-link to="/contact" class="footer-text-hover">Contact Us</router-link></li>
            <li><router-link to="/company" class="footer-text-hover">Environmental</router-link></li>
            <li><router-link to="/company" class="footer-text-hover">Management Team</router-link></li>
            <li><router-link to="/company" class="footer-text-hover">Press Releases</router-link></li>
            <li><router-link to="/company" class="footer-text-hover">Social Responsibility</router-link></li>
            <li><router-link to="/company" class="footer-text-hover">Recycling</router-link></li>
          </ul>
        </div>
        <div class="flex flex-col gap-3 text-center md:text-left">
          <h3 class="text-md font-semibold text-center md:text-left">Privacy Policy</h3>
          <ul class="flex flex-col font-medium text-center text-sm md:text-left leading-7 footer-text">
            <li>Returns</li>
            <li>Terms</li>
            <li>GDPR</li>
          </ul>
        </div>

        <div class="flex flex-col gap-3">
          <h3 class="text-md font-semibold text-center md:text-left">Contact</h3>
          <ul class="flex flex-col font-medium text-center md:text-left text-sm leading-7 footer-text">
            <li class="leading-5 mb-4">
              <span class="text-blue-300 font-medium">Toll Free</span>
              <p class="select-all" title="Click to select all">877-724-3266</p>
            </li>
            <li class="leading-5 mb-4">
              <span class="text-blue-300 font-medium">International</span>
              <p class="select-all" title="Click to select all">1-954-596-2355</p>
            </li>
            <li class="leading-5 mb-4">
              <span class="text-blue-300 font-medium">WhatsApp</span>
              <p class="select-all" title="Click to select all">1-754-600-9064</p>
            </li>
            <li class="leading-5 mb-4">
              <span class="text-blue-300 font-medium">Timings</span>
              <p class="">
                Mon – Fri <br />
                9:00am – 5:30pm
              </p>
            </li>
            <br />
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.footer-text {
  @apply text-cyan-500;
}

.footer-text-hover {
  @apply hover:text-white;
}
</style>
