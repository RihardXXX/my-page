import {provideApolloClient} from '@vue/apollo-composable';

export default defineNuxtPlugin(() => {
  // ts-ignore
  provideApolloClient(useApollo().clients.default)
})
