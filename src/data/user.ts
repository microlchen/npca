import { app } from '@/firebase/initFirebase';
import { KeyedQuestionSet, Question, QuestionSet } from '@/types/questions';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc
} from 'firebase/firestore/lite';

const info = "info";

export async function create_user_set(email: string, password: string) {
  try {
    const db = getFirestore(app);
    await setDoc(doc(db, email, "info"), {
        email: email, 
        password: password
      });

  } catch (error) {
    console.log(error);
    return 1;
  }
}

export default create_user_set
