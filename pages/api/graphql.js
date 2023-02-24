import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import Cors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import typeDefs from '../../src/server/typeDefs.js'
import resolvers from '../../src/server/resolvers'

const client = new PrismaClient()

const getCookieRefresh = (key, cookies) => {
  let matches = cookies.match(
    new RegExp(
      '(?:^|; )' +
        key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const checkToken = (acessToken) => {
  try {
    if (acessToken) {
      const token = jwt.verify(acessToken, process.env.SECRET_KEY)
      return token
    } else return null
  } catch (err) {
    throw new Error(err.message)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
  cors: {
    origin: '/',
    credentials: true,
  },
  context: async ({ req, res }) => {
    const token = req.headers.authorization || ''
    let refresh
    if (req.headers.cookie) {
      refresh = getCookieRefresh('refresh', req.headers.cookie)
    }
    const user = checkToken(token)
    let currentUser
    if (token) {
      currentUser = await client.User.findUnique({
        where: { email: user.email },
      })
    }
    return { user, currentUser, res, refresh }
  },
})

const cors = Cors()

const startServer = server.start()

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

export default cors(async function handler(req, res) {
  await startServer
  await server.createHandler({
    path: '/api/graphql',
  })(req, res)
})
