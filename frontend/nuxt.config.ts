// @ts-ignore
import { defineNuxtConfig } from 'nuxt/config';
import { api_client, api_ssr } from './config';
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
        httpEndpoint: process.env.API_SSR, // useQuery endpoint
        browserHttpEndpoint: process.env.API_CLIENT, // useMutation endpoint
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
      },
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
