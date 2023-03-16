import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';
import { clientCredentials } from './credentials';

if (!getApps().length) {
  // Does it matter that the return values are thrown away?
  initializeApp(clientCredentials);
  if (typeof window !== 'undefined') {
    if ('measurementId' in clientCredentials) {
      getAnalytics();
      getPerformance();
    }
  }
  console.log('Firebase was successfully init.');
}
const app = getApp();
export { app };
