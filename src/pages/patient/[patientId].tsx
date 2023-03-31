import * as React from 'react';
import nookies from 'nookies';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';

import { ListItemButton, List, Box, Typography } from '@mui/material/';
import Header from '@/components/subpages/header';
import { getServerLoggedIn } from '@/data/user';
import { getAdminAuth } from '@/firebase/initFirebaseAdmin';
import { Patient } from '@/types/users';
import { collection, doc } from 'firebase/firestore';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import {
  generateQuestionLink,
  getForms,
  get_generic_question_types
} from '@/data/questions';
import { QuestionType } from '@/types/questions';
import { useRouter } from 'next/router';
import {
  useFirestore,
  useFirestoreDocData,
  useFirestoreDocDataOnce
} from 'reactfire';
import { Form } from '@/types/forms';
import { FormDialog } from '@/components/subpages/formDialog';

function Redirect() {
  return (
    <div className="splash-screen">
      Redirecting.
      <div className="loading-dot">.</div>
    </div>
  );
}

function CompletedForms({ completedForms }: { completedForms: Form[] }) {
  const router = useRouter();
  const handleClick = (formId: string) => {
    router.push(`/completedForm/${formId}`);
  };

  return (
    <>
      {completedForms.length > 0 && (
        <>
          <Typography variant="h4">Completed Forms</Typography>
          <List>
            {completedForms.map((completedForm) => (
              <Box key={completedForm.id}>
                <ListItemButton
                  sx={{
                    backgroundColor: '#34497980',
                    borderRadius: 50,
                    mt: '1%'
                  }}
                  onClick={() => handleClick(completedForm.id)}
                >
                  {`${
                    completedForm.questionName
                  } form completed ${completedForm.timeCompleted
                    .toDate()
                    .toLocaleString()}`}
                </ListItemButton>
              </Box>
            ))}
          </List>
        </>
      )}
    </>
  );
}

function OutstandingForms({
  host,
  outstandingForms
}: {
  host: string;
  outstandingForms: Form[];
}) {
  const [open, setOpen] = React.useState(false);
  const [formId, setFormId] = useState<string>('');

  const handleClickOpen = (formId: string) => {
    // console.log('base path', req);
    setFormId(`${host}/forms/${formId}`);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FormDialog
        title={'Resend Form'}
        open={open}
        handleClose={handleClose}
        formId={formId}
      />
      <>
        <Typography variant="h4">Sent Forms</Typography>
        <List>
          {outstandingForms.map((outstandingForm) => (
            <Box key={outstandingForm.id}>
              <ListItemButton
                sx={{
                  backgroundColor: '#34497980',
                  borderRadius: 50,
                  mt: '1%'
                }}
                onClick={() => handleClickOpen(outstandingForm.id)}
              >
                {`${
                  outstandingForm.questionName
                } form created ${outstandingForm.timeCreated
                  .toDate()
                  .toLocaleString()}`}
              </ListItemButton>
            </Box>
          ))}
        </List>
      </>
    </>
  );
}

function PatientForms({
  host,
  patientId,
  userId
}: {
  host: string;
  patientId: string;
  userId: string;
}) {
  const db = useFirestore();
  const [outstandingForms, setOutstandingForms] = useState([] as Form[]);
  const [completedForms, setCompletedForms] = useState([] as Form[]);
  const { status, data } = useFirestoreDocData(
    doc(db, `users/${userId}/patient_info/${patientId}`)
  );

  React.useEffect(() => {
    if (status !== 'loading') {
      if (data.outstandingForms) {
        getForms(db, data.outstandingForms).then((form) =>
          setOutstandingForms(form)
        );
      }
      if (data.completedForms) {
        getForms(db, data.completedForms).then((form) =>
          setCompletedForms(form)
        );
      }
    }
  }, [db, status, data]);

  return (
    <>
      <OutstandingForms host={host} outstandingForms={outstandingForms} />
      <Box sx={{ mb: '2%' }}></Box>
      <CompletedForms completedForms={completedForms} />
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const adminAuth = getAdminAuth();

  const user = await getServerLoggedIn(cookies, adminAuth);
  return {
    props: {
      host: ctx.req.headers.host,
      userId: user.userId,
      isLoggedIn: user.isLoggedIn
    }
  };
};

export default function Individuals({
  host,
  userId,
  isLoggedIn
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const db = useFirestore();
  const patientId = router.query['patientId'] as string;
  // Should check if patient is actually a patient of the user
  // Don't have time right now

  const [questionTypes, updateQuestionTypes] = useState([] as QuestionType[]);

  React.useEffect(() => {
    get_generic_question_types(db).then(updateQuestionTypes);
  }, [db, isLoggedIn]);

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
      await generateQuestionLink(
        db,
        patientId,
        userId,
        questionType.id,
        router.basePath
      )
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
  }, [data, status]);

  // Redirect to login if not logged in
  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  });

  return isLoggedIn ? (
    <>
      <Header />
      <FormDialog
        title={'Send New Form'}
        open={open}
        handleClose={handleClose}
        formId={formId}
      />
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
            <Box key={questionType.id}>
              <ListItemButton
                sx={{
                  backgroundColor: '#34497980',
                  borderRadius: 50,
                  mt: '1%'
                }}
                onClick={() => onClickForm(questionType)}
              >
                {`Send ${questionType.name} form`}
              </ListItemButton>
            </Box>
          ))}
        </List>
        <Box sx={{ mb: '2%' }}></Box>
        <PatientForms host={host} patientId={patientId} userId={userId} />
        <Box sx={{ mb: '2%' }}></Box>
      </div>
    </>
  ) : (
    <Redirect />
  );
}
