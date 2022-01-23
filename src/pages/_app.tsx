import Head from 'next/head'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

import { fetcher } from 'lib/helpers'

import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Doctor Finder</title>
      </Head>
      <SWRConfig value={{ fetcher, dedupingInterval: 5000 }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  )
}

export default MyApp
