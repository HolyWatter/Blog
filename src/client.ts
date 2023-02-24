import { onError } from 'apollo-link-error'
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

const EXPIRE_MESSAGE = 'Context creation failed: jwt expired'

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(async ({ message, locations, path }) => {
        if (message === EXPIRE_MESSAGE) {
          await fetch(
            'https://blog-nu-neon.vercel.app/api/server?query={reAuth{acessToken}}',
            {
              method: 'GET',
              credentials: 'include',
            }
          )
            .then((res) => res.json())
            .then((res) =>
              localStorage.setItem('token', res.data.reAuth.acessToken)
            )
          operation.setContext({
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          })
        }
        return forward(operation)
      })
  }
)

const UploadLink = createUploadLink({
  uri: 'http://localhost:3000/api/graphql',
  credentials: 'include',
})

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem('token')
  if (accessToken) {
    operation.setContext(({ headers }: any) => {
      return {
        headers: {
          ...headers,
          Authorization: accessToken,
        },
      }
    })
  }
  return forward(operation)
})

const link = ApolloLink.from([errorLink as any, authLink, UploadLink])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

export default client
