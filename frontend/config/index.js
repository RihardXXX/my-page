// получаем пути для работы graphql
// ssr путь для запроса nuxt сервера к сервису апи
// client путь для запроса мутаций с браузера домена на апи
const api_ssr = process.env.API_SSR;
const api_client = process.env.API_CLIENT;

console.log('api_client: ', api_client);
console.log('api_ssr: ', api_ssr);
console.log('process.env: ', process.env);

export {
  api_ssr,
  api_client
};
