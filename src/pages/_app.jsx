import '@/styles/globals.css';
import Head from 'next/head';
import initAuth from '@/firebase/initAuth.js' // the module you created above

initAuth()

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>NPCA</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
