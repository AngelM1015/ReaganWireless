// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAtrs: {
        lang: 'en',
      },
      title: 'Reagan Wireless - The most reliable wholesale and retail mobile phone store',
      meta: [{ name: 'description', content: 'The most reliable wholesale and retail mobile phone store. If you are looking for a trusted shop, you can come to us!' }],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
  imports: {
    dirs: ['stores'],
  },
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@unocss/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
  ],
  ssr: true,
  unocss: {
    uno: false,
    icons: true,
    attributify: false,
  },
  nitro: {
    compressPublicAssets: true,
  }
})
