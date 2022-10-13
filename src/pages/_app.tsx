import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { trpc } from '@/utils/trpc'
import NavBar from '@/components/navigation/NavBar'

import 'tailwindcss/tailwind.css'
import '@/styles/globals.css'

type CustomAppProps = {
  session: Session
}

function App({ Component, pageProps }: AppProps<CustomAppProps>) {
  return (
    <div>
      <Head>
        <title>D2 Runeword Calculator</title>
        <link rel={'icon'} href={'/favicon.ico'} />
        <meta charSet={'UTF-8'} />
        <meta name={'author'} content={'Mike Rogers'} />
        <meta name={'viewport'} content={'initial-scale=1.0, width=device-width'} />
      </Head>
      <SessionProvider session={pageProps.session}>
        <NavBar />
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  )
}

export default trpc.withTRPC(App)
