<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from "@/stores/AuthStore";

export interface NavLink {
  title: string
  href?: string
  sublinks?: NavLink[]
}
export interface dropDownItems {
  title: string
  href?: string
}

const route = useRoute()
const isOpenNav = ref<boolean>(false)

let authStore = useAuthStore()

watchEffect(() => console.log('Path:', route.path))
const navLinks: NavLink[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Products',
    href: '/products',
    // sublinks: [],
  },
  {
    title: 'Auction',
    href: '/auction',
  },
  {
    title: 'How To Buy',
    href: '/wholesale',
  },
]
const dropDown: dropDownItems[] = [
  {
    title: 'About Us',
    href: '/company',
  },
  {
    title: 'Cont  act',
    href: '/contact',
  },
  {
    title: 'FAQ',
    href: '/faq',
  },
]
</script>

<template>
  <div class="fixed z-20 w-full">
    <nav class="flex justify-between p-5 bg-white items-center">
      <NuxtLink to="/">
        <img src="~assets/images/logo.svg" alt="logo" width="140" height="50" />
      </NuxtLink>

      <div class="relative flex items-center">
        <NuxtLink to="/login" v-if="authStore.uid === ''">
          <button
            class="md:hidden gap-3 items-center text-center w-32 py-2 text-white rounded font-medium text-sm bg-blue-500 border mx-2">Login</button>
        </NuxtLink>
        <NuxtLink to="/login" v-else>
          <button
            class="md:hidden gap-3 items-center text-center w-32 py-2 text-white rounded font-medium text-sm bg-blue-500 border mx-2">Logout</button>
        </NuxtLink>
        <div class="md:hidden cursor-pointer text-2xl text-blue-600 i-mdi-close"
          :class="isOpenNav ? `i-mdi-close` : `i-mdi-menu`" @click="isOpenNav = !isOpenNav" />
        <div v-if="isOpenNav"
          class="opacity-0 transition-opacity text-sm duration-300 md:hidden absolute z-20 right-0 top-14 border border-blue-300 rounded-lg p-1 gap-1 bg-white flex flex-col items-center"
          :class="{
            'opacity-full': isOpenNav,
          }">
          <NuxtLink v-for="{ title, href, sublinks } of navLinks" :key="title" :to="href">
            <div v-if="href" :key="title"
              class="select-none hover:bg-blue-200 cursor-pointer rounded-md w-36 py-2 text-center" :class="{
                'bg-[#4E80EE] rounded-md hover:bg-[#4E80EE] text-white': route.path === href,
              }">
              <span :class="{
                'font-semibold': route.path === href,
              }">
                {{ title }}
              </span>
              <div class="flex gap-1 items-center" v-if="sublinks">
                <span>
                  {{ title }}
                </span>
                <span class="i-mdi-expand-more"></span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="hidden md:flex lg:flex gap-8">
        <div class="flex items-start gap-3">
          <img src="~/assets/images/whatsapp.svg" width="24" height="24" alt="whatsapp" />
          <div class="flex flex-col">
            <span class="font-semibold text-sm lg:text-md">WhatsApp</span>
            <span
              class="text-sm font-semibold text-stone-500 lg:text-black lg:font-normal md:text-md lg:text-lg">+1-754-600-9064
            </span>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <img src="~/assets/images/earth.svg" width="24" height="24" alt="number" />
          <div class="flex flex-col">
            <span class="font-semibold text-sm lg:text-md">International</span>
            <span
              class="text-sm font-semibold text-stone-500 lg:text-black lg:font-normal md:text-md lg:text-lg">+1-954-596-2355</span>
          </div>
        </div>
      </div>
    </nav>
    <div class="hidden md:flex lg:flex justify-center bg-blue-600 text-white custom-gradient">
      <div class="p-3 lg:p-5 gap-7 flex w-full items-center">
        <div class="marquee justify-self-start whitespace-nowrap overflow-hidden">
          <p class="text-xs lg:text-sm font-semibold lg:font-normal text-yellow-300 max-w-[52ch] inline-block">
            Please call our Sales Team at 1-877-724-3266 for current inventory and pricing. WE ARE NOT AN E-COMMERCE
            COMPANY. Wholesale only. Our website is not regularly
            updated.
          </p>
        </div>
        <ul class="flex justify-self-end gap-3 lg:font-medium text-blue-300 lg:gap-5 text-xs lg:text-sm items-center">
          <li v-for="{ title, href, sublinks } of navLinks" :key="title">
            <NuxtLink :to="href" v-if="href">
              <span :class="{
                'text-white': route.path === href,
              }">
                {{ title }}
              </span>
            </NuxtLink>
            <div class="flex gap-1 items-center" v-if="sublinks">
              <span>
                {{ title }}
              </span>
              <span class="i-mdi-expand-more"></span>
            </div>
          </li>
          <!--  -->
          <div class="relative">
            <input type="checkbox" id="sortbox" class="hidden absolute" />
            <label for="sortbox" class="flex items-center space-x-1 cursor-pointer">
              <span>Company</span>
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </label>

            <div id="sortboxmenu"
              class="absolute mt-1 right-1 w-20 p-3 top-full min-w-max shadow rounded opacity-0 bg-blue-900 border border-blue-800 transition delay-75 ease-in-out z-10">
              <ul class="block text-center text-gray-900" v-for="{ title, href } of dropDown" :key="title">
                <NuxtLink :to="href" v-if="href">
                  <span :class="route.path === href ? `text-white` : `text-blue-300 hover:text-sky-700`">
                    {{ title }}
                  </span>
                </NuxtLink>
              </ul>
            </div>
          </div>
          <!--  -->
        </ul>
        <NuxtLink v-if="authStore.uid === ''" to="/login" class="ml-auto">
          <button
            class="min-w-[100px] text-white h-8 lg:h-12 text-xs lg:text-sm text-center py-4 lg:px-4 md:py-1 rounded font-semibold border bg-blue-500 hover:bg-blue-400 active:bg-blue-600">
            Login
          </button>
        </NuxtLink>
        <button @click="() => authStore.logout(() => {
          $router.push('/')
        })" v-else="authStore.uid === ''"
          class="min-w-[100px] ml-auto text-white h-8 lg:h-12 text-xs lg:text-sm text-center py-4 lg:px-4 md:py-1 rounded font-semibold border bg-blue-500 hover:bg-blue-400 active:bg-blue-600">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee p {
  animation: marquee 16s ease-in-out infinite;
}

@keyframes marquee {
  0% {
    transform: translate(15%, 0);
  }

  98% {
    transform: translate(-180%, 0);
  }

  100% {
    transform: translate(15%, 0);
  }
}

#sortbox:checked~#sortboxmenu {
  opacity: 1;
}
</style>
