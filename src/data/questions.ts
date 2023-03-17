import {
  KeyedQuestionSet,
  Question,
  QuestionSet,
  QuestionType
} from '@/types/questions';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocFromServer,
  getDocs,
  setDoc
} from 'firebase/firestore';

const generic_questions_index_id = 'generic_questions_index';
const generic_questions_id = 'generic_questions';

export async function create_question_set(
  db: Firestore,
  name: string,
  questions: Question[]
) {
  try {
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

export async function get_generic_question_types(
  db: Firestore
): Promise<QuestionType[]> {
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

export async function get_question_set(
  db: Firestore,
  id: string
): Promise<KeyedQuestionSet> {
  const question_collection = collection(db, generic_questions_id);

  const querySnapshot = await getDoc(doc(question_collection, id));
  const value: KeyedQuestionSet = {
    key: querySnapshot.id,
    name: querySnapshot.get('name'),
    prompt: querySnapshot.get('prompt'),
    questions: querySnapshot.get('questions')
  };
  return value;
}

export async function generateQuestionForm(
  db: Firestore,
  patientId: string,
  providerId: string,
  questionId: string
): Promise<string> {
  const formCollection = collection(db, 'forms');
  const form = await addDoc(formCollection, {
    patientId: patientId,
    providerId: providerId,
    questionId: questionId
  });
  return form.id;
}

export async function generateQuestionLink(
  db: Firestore,
  patientId: string,
  providerId: string,
  questionId: string
) {
  const id = await generateQuestionForm(db, patientId, providerId, questionId);
  return `https://npca-delta.vercel.app/forms/${id}`;
}

export async function getUserForm(db: Firestore, formId: string) {
  const formCollection = collection(db, 'forms');
  return await getDocFromServer(doc(formCollection, formId));
}
