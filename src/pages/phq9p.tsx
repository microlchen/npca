import styles from '@/styles/Home.module.css';
import * as React from 'react';
import { Button, Box } from '@mui/material/';
import VideocamIcon from '@mui/icons-material/Videocam';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { get_generic_question_types, get_question_set } from '@/data/questions';
import { KeyedQuestionSet } from '@/types/questions';

async function getPHQ9(): Promise<KeyedQuestionSet> {
  const types = await get_generic_question_types();
  const { id } = types.find((value) => value.name == 'PHQ-9');
  return get_question_set(id);
}

export async function getServerSideProps() {
  const phq9 = await getPHQ9();
  return {
    props: { questions: phq9 } // will be passed to the page component as props
  };
}

const PatientForm = ({ questions }) => {
  const typed_questions = questions as KeyedQuestionSet;
  return (
    <Box
      sx={{
        marginTop: '5%',
        marginLeft: '4%',
        backgroundColor: 'white',
        marginRight: '4%'
      }}
    >
      <Box sx={{ paddingTop: '1%' }}>
        <div className={styles.mainheading}>
          {' '}
          &nbsp; &nbsp;PHQ - 9 &nbsp;&nbsp;
          <VideocamIcon />
        </div>
        <div className={styles.questionheading2}>
          Over the last 2 weeks, how often have you been bothered by any of the
          following problems?
        </div>
        {typed_questions.questions.map((question) => (
          <div key={question.key}>
            <div className={styles.questions}>{question.question}</div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Answer</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={q1answer}
                label="Answer"
                //onChange={handleChange1}
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
        <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: -7 }}>
          <Button className={styles.submit}>Submit</Button>
        </Box>
      </Box>
    </Box>
  );
};
export default PatientForm;
