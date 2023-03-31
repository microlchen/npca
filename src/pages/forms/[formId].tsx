import * as React from 'react';
import Drawers from '@/components/Charlie/_drawer';
import {
  createCompletedForm,
  get_question_set,
  getUserForm,
  removeOutstandingForm
} from '@/data/questions';
import { Form } from '@/types/questions';
import { Firestore } from 'firebase/firestore';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useFirestore } from 'reactfire';
import Header from '@/components/subpages/header';
import { FormLayout } from '@/components/subpages/form';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const formId = ctx.params['formId'] as string;

  return {
    props: {
      formId: formId
    }
  };
};

async function uploadResults(
  db: Firestore,
  patientId: string,
  providerId: string,
  formId: string,
  answerMap: { id: string; answer: string }[]
) {
  createCompletedForm(db, patientId, providerId, formId, answerMap);
  removeOutstandingForm(db, patientId, providerId, formId);
}

function PatientForm({
  formId
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentForm, updateCurrentForm] = React.useState(null);
  const [currentQuestionSet, updateQuestionSet] = React.useState(null);
  const db = useFirestore();

  React.useEffect(() => {
    getUserForm(db, formId).then((value) =>
      updateCurrentForm(value.data() as unknown as Form)
    );
  }, [db, formId]);

  React.useEffect(() => {
    if (currentForm && currentForm.questionId) {
      get_question_set(db, currentForm.questionId).then((value) =>
        updateQuestionSet(value)
      );
    }
  }, [db, currentForm]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const answerMap: { id: string; answer: string }[] = [];
    for (const [key, value] of data.entries()) {
      answerMap.push({ id: key, answer: value as string });
    }
    uploadResults(
      db,
      currentForm.patientId,
      currentForm.providerId,
      formId,
      answerMap
    );
  };

  return (
    <>
      <Header />
      <Drawers />
      <FormLayout
        onSubmit={onSubmit}
        currentQuestionSet={currentQuestionSet}
        answers={[]}
        subtitle=""
      />
    </>
  );
}
export default PatientForm;
