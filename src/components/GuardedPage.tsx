'use client';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth, useSigninCheck } from 'reactfire';

export default function GuardedPage({
  children,
  whenSignedOut
}: React.PropsWithChildren<{
  whenSignedOut?: string;
}>) {
  const router = useRouter();
  const auth = useAuth();
  const check = useSigninCheck();

  useEffect(() => {
    // this should run once and only on success
    console.log(check);
    if (check.status !== 'success') {
      console.log('failed to get sign in status');
      return;
    }

    // keep this running for the whole session
    // unless the component was unmounted, for example, on log-outs
    const listener = auth.onAuthStateChanged((user) => {
      const shouldLogOut = !user && whenSignedOut;

      // log user out if user is falsy
      // and if the consumer provided a route to redirect the user
      if (shouldLogOut) {
        // we then redirect the user to the page
        // specified in the props of the component
        if (window.location.pathname !== whenSignedOut) {
          window.location.assign(whenSignedOut);
        }
      }
    });

    // destroy listener on un-mounts
    return () => listener();
  }, [auth, check, whenSignedOut]);

  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === 'loading') {
    return <span>loading...</span>;
  }

  if (signInCheckResult.signedIn === true) {
    return <>{children}</>;
  } else {
    router.push('/');
  }
}
