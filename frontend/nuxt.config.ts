// @ts-ignore
import { defineNuxtConfig } from 'nuxt/config'
import { apiClient, apiSsr } from './config'
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // @ts-ignore
  css: ['@/assets/scss/bundle.scss'], // импортируем глобальный файл стилей
  // @ts-ignore
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
    // proxyCookies: true,
    clients: {
      default: {
        // @ts-ignore
        httpEndpoint: apiSsr, // useQuery endpoint
        browserHttpEndpoint: apiClient, // useMutation endpoint
        // wsEndpoint: '',
        httpLinkOptions: {},
        wsLinkOptions: {},
        // websocketsOnly: false,
        connectToDevTools: true,
        defaultOptions: {},
        inMemoryCacheOptions: {},
        // tokenName: 'apollo:<client-name>.token',
        tokenStorage: 'cookie',
        authType: 'Bearer',
        authHeader: 'Authorization'
      }
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
