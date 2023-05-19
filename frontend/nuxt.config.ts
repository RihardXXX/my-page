// @ts-ignore
import { defineNuxtConfig } from 'nuxt/config'
// https://nuxt.com/docs/api/configuration/nuxt-config

const endPoint = process.env.API_URL

console.log('endPoint', endPoint)

export default defineNuxtConfig({
  // @ts-ignore
  css: ['@/assets/scss/bundle.scss'], // импортируем глобальный файл стилей
  device: {
    refreshOnResize: true
  },
  modules: [
    '@nuxtjs/device',
    '@element-plus/nuxt',
    'nuxt-icon',
    '@nuxtjs/apollo'
  ],
  // options element UI
  elementPlus: { /** Options */ },
  // options apollo
  apollo: {
    autoImports: true,
    authType: 'Bearer',
    authHeader: 'Authorization',
    tokenStorage: 'cookie',
    proxyCookies: true,
    clients: {
      default: {
        httpEndpoint: endPoint || '/api'
        // browserHttpEndpoint: '',
        // wsEndpoint: '',
        // httpLinkOptions: {},
        // wsLinkOptions: {},
        // // wsEndpoint: '',
        // websocketsOnly: false,
        // connectToDevTools: true,
        // defaultOptions: {},
        // inMemoryCacheOptions: {},
        // tokenName: 'apollo:<client-name>.token',
        // tokenStorage: 'cookie',
        // authType: 'Bearer',
        // authHeader: 'Authorization'
      }
      // other: './apollo/other.ts'
    }
  },
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
