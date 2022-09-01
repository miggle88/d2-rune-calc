import type { AppProps } from 'next/app'
import Head from 'next/head'

import NavBar from '@/components/navigation/NavBar'

import 'tailwindcss/tailwind.css'
import '../../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>D2 Runeword Calculator</title>
        <link rel={'icon'} href={'/favicon.ico'} />
        <meta charSet={'UTF-8'} />
        <meta name={'author'} content={'Mike Rogers'} />
        <meta
          name={'viewport'}
          content={'initial-scale=1.0, width=device-width'}
        />
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </div>
  )
}

export default App
