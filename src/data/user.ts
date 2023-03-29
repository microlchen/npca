import { Auth } from 'firebase-admin/auth';
import {
  Firestore,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';

export async function create_user_set(
  db: Firestore,
  email: string,
  uid: string
) {
  const userCollection = collection(db, 'users');

  setDoc(doc(userCollection, uid), {
    email: email,
    patients: [],
    outstanding_forms: [],
    completed_forms: []
  });
}

export async function getPatientIds(
  db: Firestore,
  uid: string
): Promise<string[]> {
  const userCollection = collection(db, 'users');
  return (await getDoc(doc(userCollection, uid))).get('patients');
}

export function addPatientId(db: Firestore, userId: string, patientId: string) {
  const userCollection = collection(db, 'users');
  updateDoc(doc(userCollection, userId), {
    patients: arrayUnion(patientId)
  });
}

export async function getServerLoggedIn(
  cookies: {
    [key: string]: string;
  },
  adminAuth: Auth
): Promise<{
  isLoggedIn: boolean;
  userId: string;
}> {
  if (!cookies.token) {
    return {
      isLoggedIn: false,
      userId: null
    };
  }

  try {
    const token = await adminAuth.verifyIdToken(cookies.token);
    if (!token) {
      return {
        isLoggedIn: false,
        userId: null
      };
    }

    // the user is authenticated!
    const { uid } = token;
    const user = await adminAuth.getUser(uid);

    return {
      isLoggedIn: true,
      userId: user.uid
    };
  } catch (error) {
    return {
      isLoggedIn: false,
      userId: null
    };
  }
}
