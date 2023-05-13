import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '@/components/layout/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>My Rank</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
