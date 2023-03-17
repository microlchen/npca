import styles from '@/styles/Home.module.css';
import * as React from 'react';
import { Button, Box } from '@mui/material/';
import VideocamIcon from '@mui/icons-material/Videocam';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { get_question_set, getUserForm } from '@/data/questions';
import { Form } from '@/types/questions';
import getFirebaseApp from '@/firebase/initFirebase';
import { collection, getFirestore, doc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const app = getFirebaseApp();
  const db = getFirestore(app);
  const formId = ctx.params['formId'] as string;
  const form = (await getUserForm(db, formId)).data() as unknown as Form;

  const questionSet = await get_question_set(db, form.questionId);

  return {
    props: {
      questionSet: questionSet,
      formId: formId,
      patientId: form.patientId,
      providerId: form.providerId
    }
  };
};

function PatientForm({ questionSet, formId, patientId, providerId }) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
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
            {questionSet.name}
            {/* <VideocamIcon /> */}
          </div>
          <div className={styles.questionheading2}>{questionSet.prompt}</div>
          {questionSet.questions.map((question) => (
            <div key={question.key}>
              <div className={styles.questions}>{question.question}</div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name={question.key}
                  label="Answer"
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
