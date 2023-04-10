import { useRouter } from 'next/router';
import { useSigninCheck } from 'reactfire';

export function Loading(): JSX.Element {
  return (
    <div className="splash-screen">
      Loading.
      <div className="loading-dot">.</div>
    </div>
  );
}

export default function GuardedPage({
  children,
  inverted,
  destination
}: {
  children: JSX.Element;
  inverted: boolean;
  destination: string;
}): JSX.Element {
  const { status, data: signInCheckResult } = useSigninCheck();
  const router = useRouter();

  if (status === 'loading') {
    return <Loading />;
  }

  if (!inverted === signInCheckResult.signedIn) {
    return children;
  } else {
    router.push(destination);
    return <Loading />;
  }
}
