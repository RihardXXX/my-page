
// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/device'
  ],
  device: {
    refreshOnResize: true
  }
});
