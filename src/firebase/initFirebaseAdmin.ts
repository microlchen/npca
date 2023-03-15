import * as admin from 'firebase-admin';

import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

export function getAdminSDK() {
  // ONLY USE FROM SERVER SIDE
  if (!admin.apps.length) {
    initializeApp({
      credential: credential.cert(
        JSON.parse(process.env.FIREBASE_ADMIN_DATA) as admin.ServiceAccount
      )
    });
  }
  return admin;
}
