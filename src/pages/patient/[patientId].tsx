import * as React from 'react';
import nookies from 'nookies';
import styles from '@/styles/Home.module.css';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import {
  ListItemButton,
  List,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton
} from '@mui/material/';
import GuardedPage from '@/components/GuardedPage';
import Header from '@/components/subpages/header';
import { getServerLoggedIn } from '@/data/user';
import getFirebaseApp from '@/firebase/initFirebase';
import { getAdminAuth } from '@/firebase/initFirebaseAdmin';
import { Patient } from '@/types/users';
import { collection, doc, getFirestore } from 'firebase/firestore';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import {
  generateQuestionLink,
  get_generic_question_types
} from '@/data/questions';
import { Question, QuestionType } from '@/types/questions';
import { useRouter } from 'next/router';
import { useFirestore, useFirestoreDocDataOnce } from 'reactfire';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const adminAuth = getAdminAuth();

  const user = await getServerLoggedIn(cookies, adminAuth);

  let questionTypes: QuestionType[] = [];
  if (user.isLoggedIn) {
    const db = getFirebaseApp();
    questionTypes = await get_generic_question_types(getFirestore(db));
  }

  return {
    props: {
      questionTypes: questionTypes,
      userId: user.userId,
      isLoggedIn: user.isLoggedIn
    }
  };
};

export default function Individuals({
  questionTypes,
  userId,
  isLoggedIn
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const db = useFirestore();
  const patientId = router.query['patientId'] as string;
  // Should check if patient is actually a patient of the user
  // Don't have time right now

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formId, setFormId] = useState<string>('');

  const onClickForm = async (questionType: QuestionType) => {
    setFormId(
      await generateQuestionLink(db, patientId, userId, questionType.id)
    );
    handleClickOpen();
  };

  const [patient, setPatient] = useState<Patient>({ name: '' });
  const { status, data } = useFirestoreDocDataOnce(
    doc(collection(db, 'patients'), patientId)
  );

  React.useEffect(() => {
    if (status !== 'loading') {
      setPatient({ name: data.name });
    }
  }, [status]);

  return (
    <>
      <Header />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <Typography>Send this form to your patient:</Typography>
          {/* <Typography>{formId}</Typography> */}
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              Copy to clipboard
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              value={formId}
              readOnly
              fullWidth
              role="textbox"
              sx={{
                width: '500px'
              }}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(formId);
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <div className={styles.individualpatientboxspacing}>
        <Typography variant="h3" component="h2">
          Patient: {patient.name}
        </Typography>
        {/* <Box sx={{ mt: '1%' }}>
            <Image
              src="/npca.png"
              alt="Next.js Logo"
              width={700}
              height={700}
              priority
            />
            <p className={inter.className}>
              Relevant stats from&nbsp;{patient.name} as of Today! Replace IMAGE
              WITH ACATUAL GRAPHS IDK
            </p>
          </Box> */}
        <Box sx={{ mt: '1%' }}></Box>
        <List>
          {questionTypes.map((questionType) => (
            <ListItemButton
              sx={{
                backgroundColor: '#34497980',
                borderRadius: 50,
                mt: '1%'
              }}
              onClick={() => onClickForm(questionType)}
              key={questionType.id}
            >
              {`Send ${questionType.name} form`}
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ mb: '2%' }}></Box>
      </div>
    </>
  );
}
