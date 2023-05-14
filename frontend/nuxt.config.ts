// @ts-ignore
// import { defineNuxtConfig } from 'nuxt';
// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  // @ts-ignore
  css: ['@/assets/scss/bundle.scss'], // импортируем глобальный файл стилей
  device: {
    refreshOnResize: true
  },
  modules: [
    '@nuxtjs/device'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // импортируем миксины и переменные для стилей
          additionalData: '@import "@/assets/scss/shared/_mixins.scss"; @import "@/assets/scss/shared/_variables.scss";'
        }
      }
    }
  }
})
