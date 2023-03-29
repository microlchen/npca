import styles from '@/styles/Home.module.css';
import * as React from 'react';
import { Button, Box } from '@mui/material/';
import VideocamIcon from '@mui/icons-material/Videocam';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  createCompletedForm,
  get_question_set,
  getUserForm,
  removeOutstandingForm
} from '@/data/questions';
import { Form, KeyedQuestionSet } from '@/types/questions';
import { Firestore } from 'firebase/firestore';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useFirestore } from 'reactfire';
import { getAdminAuth } from '@/firebase/initFirebaseAdmin';
import nookies from 'nookies';
import { getServerLoggedIn } from '@/data/user';

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
  const defaultForm: Form = {
    patientId: '',
    providerId: '',
    questionId: ''
  };
  const defaultQuestionSet: KeyedQuestionSet = {
    key: '',
    name: '',
    prompt: '',
    questions: []
  };
  const [currentForm, updateCurrentForm] = React.useState(defaultForm);
  const [currentQuestionSet, updateQuestionSet] =
    React.useState(defaultQuestionSet);
  const db = useFirestore();

  React.useEffect(() => {
    getUserForm(db, formId).then((value) =>
      updateCurrentForm(value.data() as unknown as Form)
    );
  }, []);

  React.useEffect(() => {
    if (currentForm.questionId) {
      get_question_set(db, currentForm.questionId).then((value) =>
        updateQuestionSet(value)
      );
    }
  }, [currentForm]);

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
      <Box
        sx={{
          marginTop: '5%',
          marginLeft: '4%',
          backgroundColor: 'white',
          marginRight: '4%'
        }}
      >
        <Box component="form" onSubmit={onSubmit} sx={{ paddingTop: '1%' }}>
          <div className={styles.questionheading2}>
            {' '}
            {currentQuestionSet.name}
            {/* <VideocamIcon /> */}
          </div>
          <div className={styles.questionheading2}>
            {currentQuestionSet.prompt}
          </div>
          {currentQuestionSet.questions.map((question) => (
            <div key={question.key}>
              <div className={styles.questions}>{question.question}</div>
              <FormControl required fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  Answer
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name={question.key}
                  label="Answer"
                  defaultValue={''}
                >
                  {question.responses.map((response, index) => (
                    <MenuItem key={response} value={index}>
                      {response}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          ))}
          <Box
            sx={{ display: 'flex', justifyContent: 'center', marginLeft: -7 }}
          >
            <Button type="submit" className={styles.submit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default PatientForm;
