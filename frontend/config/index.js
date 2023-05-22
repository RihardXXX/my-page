// получаем пути для работы graphql
// ssr путь для запроса nuxt сервера к сервису апи
// client путь для запроса мутаций с браузера домена на апи
const api_ssr = process.env.API_SSR;
const api_client = process.env.API_CLIENT;


export {
  api_ssr,
  api_client
};
