import {ApolloClient, ApolloError} from 'apollo-client'
import { setContext } from "apollo-link-context";
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { from } from "apollo-link";
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { StorageService } from "@/services/storageService";
import router from "@/router";



// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: `${import.meta.env.VITE_APP_DIGITAL_CLUBS_SERVER}/api`,
})

let storageService = new StorageService()

const authLink = setContext(async (_, { headers }) => {
  const token = storageService.getItem('access_token') || null

  let expireTime = storageService.getItem('expireTime')
  expireTime = new Date(parseInt(expireTime))

  let currentTime = new Date()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }

  // if (expireTime > currentTime) {
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token ? `Bearer ${token}` : null,
  //     }
  //   }
  // } else {
  //   storageService.clearStorage()
  //   router.push({ name: "Login" })
  //   throw new ApolloError({ errorMessage: 'Token has expired' });
  // }
});
const errorLink = onError(({ graphQLErrors, networkError,  operation, forward }) => {
  if (graphQLErrors){
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      if (Object.hasOwn(extensions?.exception, "message")) {
        const oldHeaders = operation.getContext().headers;

        operation.setContext({
          headers: {
            ...oldHeaders,
            authorization: "Bearer " + storageService.getItem('access_token'),
          },
        });
        // Modify the operation context with a new token
        // Retry the request, returning the new observable
        return forward(operation);
      }
    });
  }
  if (networkError) {
    console.error(`Error : ${networkError}`)
  }
});
// Create the apollo client
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({addTypename: false}),
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
