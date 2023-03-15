import { clientCredentials } from '@/firebase/initFirebase';
import '@/styles/globals.css';
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import Head from 'next/head';
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider
} from 'reactfire';
import { useEffect } from 'react';
import nookies from 'nookies';
import { getFirestore } from 'firebase/firestore';

function CookieSetter({ children }) {
  useEffect(() => {
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user) {
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  }, []);

  return <>{children}</>;
}

export default function App({ Component, pageProps }) {
  const app = initializeApp(clientCredentials);
  const storage = getFirestore(app);
  const auth = initializeAuth(app);
  return (
    <FirebaseAppProvider firebaseApp={app}>
      <FirestoreProvider sdk={storage}>
        <AuthProvider sdk={auth}>
          <CookieSetter>
            <Head>
              <title>NPCA</title>
              <meta name="description" content="Generated by create next app" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </CookieSetter>
        </AuthProvider>
      </FirestoreProvider>
    </FirebaseAppProvider>
  );
}
