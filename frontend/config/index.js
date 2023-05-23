// получаем пути для работы graphql
// ssr путь для запроса nuxt сервера к сервису апи
// client путь для запроса мутаций с браузера домена на апи
export const apiSsr = process.env.API_SSR
export const apiClient = process.env.API_CLIENT
