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

const generic_questions_index_id = 'generic_questions_index';
const generic_questions_id = 'generic_questions';

export async function create_question_set(name: string, questions: Question[]) {
  try {
    const db = getFirestore();
    const question_collection_index = collection(
      db,
      generic_questions_index_id
    );
    const { id } = await addDoc(question_collection_index, { name: name });

    const question_collection = collection(db, generic_questions_id);
    const question_set: QuestionSet = { name: name, questions: questions };
    setDoc(doc(question_collection, id), question_set);
    return 0;
  } catch (error) {
    console.log(error);
    return 1;
  }
}

export async function get_generic_question_types(): Promise<
  { id: string; name: string }[]
> {
  const db = getFirestore();
  const question_collection_index = collection(db, generic_questions_index_id);
  const all_docs = await getDocs(question_collection_index);
  const question_types = all_docs.docs.map((snapshot) => {
    return {
      id: snapshot.id,
      name: snapshot.data()['name']
    };
  });
  return question_types;
}

export async function get_question_set(id: string): Promise<KeyedQuestionSet> {
  const db = getFirestore();

  const question_collection = collection(db, generic_questions_id);

  const querySnapshot = await getDoc(doc(question_collection, id));
  const value: KeyedQuestionSet = {
    key: querySnapshot.id,
    name: querySnapshot.get('name'),
    questions: querySnapshot.get('questions')
  };
  return value;
}
