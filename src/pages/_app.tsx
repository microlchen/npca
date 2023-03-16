import { clientCredentials } from '@/firebase/credentials';
import '@/styles/globals.css';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import {
  browserSessionPersistence,
  getAuth,
  initializeAuth
} from 'firebase/auth';
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
  let app: FirebaseApp;
  if (!getApps().length) {
    app = initializeApp(clientCredentials);
  } else {
    app = getApp();
  }
  const storage = getFirestore(app);
  const auth = initializeAuth(app, {
    persistence: browserSessionPersistence,
    popupRedirectResolver: undefined
  });
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
