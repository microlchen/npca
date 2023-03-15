import nookies from 'nookies';
import { getAuth, User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext<{ user: User | null }>({
  user: null
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
