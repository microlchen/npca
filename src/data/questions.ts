import { Form } from '@/types/forms';
import {
  KeyedQuestionSet,
  Question,
  QuestionSet,
  QuestionType
} from '@/types/questions';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
  updateDoc
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
    setDoc(doc(question_collection, id), question_set, { merge: true });
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

  console.log(id);
  const querySnapshot = await getDoc(doc(question_collection, id));
  const value: KeyedQuestionSet = {
    key: querySnapshot.id,
    name: querySnapshot.get('name'),
    prompt: querySnapshot.get('prompt'),
    questions: querySnapshot.get('questions')
  };
  return value;
}

export async function createCompletedForm(
  db: Firestore,
  patientId: string,
  providerId: string,
  formId: string,
  answerMap: { id: string; answer: string }[]
) {
  // Create answer document for a complete form
  const formsDocument = doc(db, `forms/${formId}`);
  updateDoc(formsDocument, {
    answerMap: answerMap,
    timeCompleted: Timestamp.now()
  });

  // Create top level reference
  const userDocument = doc(db, `users/${providerId}`);
  updateDoc(userDocument, {
    completedForms: arrayUnion(formId)
  });

  // Create patient level reference for the user
  const patientInfoCollection = collection(userDocument, `patient_info`);
  const patientInfoDocument = doc(patientInfoCollection, patientId);

  setDoc(
    patientInfoDocument,
    { completedForms: arrayUnion(formId) },
    { merge: true }
  );

  // Create reference inside patient data
  const patientDocument = doc(db, `patients/${patientId}`);

  updateDoc(patientDocument, { completedForms: arrayUnion(formId) });
}

export async function removeOutstandingForm(
  db: Firestore,
  patientId: string,
  providerId: string,
  formId: string
) {
  // Remove top level reference
  const userDocument = doc(db, `users/${providerId}`);
  updateDoc(userDocument, {
    outstandingForms: arrayRemove(formId)
  });

  // Remove patient level reference
  const patientInfoCollection = collection(userDocument, `patient_info`);
  const patientInfoDocument = doc(patientInfoCollection, patientId);

  updateDoc(patientInfoDocument, { outstandingForms: arrayRemove(formId) });

  // Remove reference inside patient data
  const patientDocument = doc(db, `patients/${patientId}`);

  updateDoc(patientDocument, { outstandingForms: arrayRemove(formId) });
}

async function createOutstandingForm(
  db: Firestore,
  patientId: string,
  providerId: string,
  formId: string
): Promise<void> {
  // Create top level reference
  const userDocument = doc(db, `users/${providerId}`);
  updateDoc(userDocument, {
    outstandingForms: arrayUnion(formId)
  });

  // create patient level reference
  const patientInfoCollection = collection(userDocument, `patient_info`);
  const patientInfoDocument = doc(patientInfoCollection, patientId);

  setDoc(
    patientInfoDocument,
    { outstandingForms: arrayUnion(formId) },
    { merge: true }
  );

  // Create reference inside patient data
  const patientDocument = doc(db, `patients/${patientId}`);

  updateDoc(patientDocument, { outstandingForms: arrayUnion(formId) });
}

async function getQuestionName(db: Firestore, id: string): Promise<string> {
  const question_collection_index = collection(db, generic_questions_index_id);
  const question = await getDoc(doc(question_collection_index, id));
  return question.data().name;
}

export async function getForms(
  db: Firestore,
  formIds: string[]
): Promise<Form[]> {
  // Create top level reference
  const userDocument = collection(db, `forms`);
  const formSnapshots: Promise<DocumentSnapshot<DocumentData>>[] = [];
  for (const formId of formIds) {
    formSnapshots.push(getDoc(doc(userDocument, formId)));
  }

  const snapshots = await Promise.all(formSnapshots);
  const forms: Promise<Form>[] = snapshots.map(async (snapshot) => ({
    patientId: snapshot.data().patientId,
    providerId: snapshot.data().providerId,
    questionId: snapshot.data().questionId,
    questionName: await getQuestionName(db, snapshot.data().questionId),
    timeCreated: snapshot.data().timeCreated,
    timeCompleted: snapshot.data().timeCompleted,
    answerMap: snapshot.data().answerMap,
    id: snapshot.id
  }));

  return await Promise.all(forms);
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
    questionId: questionId,
    timeCreated: Timestamp.now()
  });
  // do not wait for this result!
  createOutstandingForm(db, patientId, providerId, form.id);
  return form.id;
}

export async function generateQuestionLink(
  db: Firestore,
  patientId: string,
  providerId: string,
  questionId: string,
  baseUrl: string
) {
  const id = await generateQuestionForm(db, patientId, providerId, questionId);
  return `${baseUrl}/forms/${id}`;
}

export async function getUserForm(db: Firestore, formId: string) {
  const formCollection = collection(db, 'forms');
  return await getDoc(doc(formCollection, formId));
}
