import '../styles/globals.css'
import type { AppProps } from 'next/app'
import client from '../src/client'
import { ApolloProvider } from '@apollo/client'
import Sidebar from '../components/Aside/Aside/Sidebar'
import { RecoilRoot } from 'recoil'
import { Nav } from '../components/Nav/Nav'
import { BottomMenu } from '../components/Aside/BottomMenu/BottomMenu'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Nav />
        <div className="mx-0 h-full min-h-screen justify-center bg-bg py-16">
          <Sidebar />
          <div className="md:pl-[200px]">
            <Component {...pageProps} />
          </div>
          <BottomMenu />
        </div>
      </RecoilRoot>
    </ApolloProvider>
  )
}
