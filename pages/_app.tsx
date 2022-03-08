/* eslint-disable @next/next/no-css-tags */
import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <ChakraProvider>
      <Head>
        <title>Meditation</title>
        <link href="//db.onlinewebfonts.com/c/07bc241768c969f6b6a27a7bf0dfb490?family=TT+Norms+Regular" rel="stylesheet" type="text/css"/>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
    );
}

export default MyApp
