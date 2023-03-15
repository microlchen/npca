import { Firestore, collection, doc, setDoc } from 'firebase/firestore/lite';

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

export default create_user_set;
