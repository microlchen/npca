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

  await setDoc(doc(userCollection, uid), {
    email: email,
    patients: []
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
