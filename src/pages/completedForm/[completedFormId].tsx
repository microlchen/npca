import { FormLayout } from '@/components/subpages/form';
import Header from '@/components/subpages/header';
import { getUserForm, getQuestionSet } from '@/data/questions';
import { Form } from '@/types/forms';
import { doc } from '@firebase/firestore';
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next/types';
import { useEffect, useState } from 'react';
import { useFirestore, useFirestoreDocDataOnce } from 'reactfire';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const formId = ctx.params['completedFormId'] as string;

  return {
    props: {
      formId: formId
    }
  };
};

export default function CompletedForm({
  formId
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const db = useFirestore();
  const { status, data } = useFirestoreDocDataOnce(doc(db, `forms/${formId}`));
  const [answerMap, setAnswerMap] = useState([]);

  const [currentForm, updateCurrentForm] = useState(null);
  const [currentQuestionSet, updateQuestionSet] = useState(null);

  useEffect(() => {
    getUserForm(db, formId).then((value) =>
      updateCurrentForm(value.data() as unknown as Form)
    );
  }, [db, formId]);

  useEffect(() => {
    if (currentForm && currentForm.questionId) {
      getQuestionSet(db, currentForm.questionId).then((value) =>
        updateQuestionSet(value)
      );
    }
  }, [db, currentForm]);

  useEffect(() => {
    if (status != 'loading') {
      if (data && data.answerMap) {
        console.log('Got data');
        setAnswerMap(data.answerMap);
      }
    }
  }, [status, data]);

  return (
    <>
      <Header />
      <FormLayout
        onSubmit={null}
        currentQuestionSet={currentQuestionSet}
        answers={answerMap}
        subtitle=""
      />
    </>
  );
}
