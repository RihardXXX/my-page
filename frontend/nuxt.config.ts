// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        // импорт миксин и переменных scss для страниц
        scss: {
          additionalData: `
            @import "@/assets/scss/shared/_mixins";
            @import "@/assets/scss/shared/_variables";
        `,
        },
      },
    },
  },

  // глобальный файл стилей
  css: ["@/assets/scss/bundle.scss"],

  // переменные окружения, которые будут использоваться в приложении
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      apiBase: "/api",
    },
  },
});
