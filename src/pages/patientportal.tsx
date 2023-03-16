import * as React from 'react';
import nookies from 'nookies';
import { TextField, Autocomplete, Box, ListItemButton } from '@mui/material/';
import { useState } from 'react';
import GuardedPage from '@/components/GuardedPage';
import styles from '@/styles/Home.module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getAdminAuth } from '@/firebase/initFirebaseAdmin';
import { Auth } from 'firebase-admin/auth';
import Header from '@/components/subpages/header';
import { addPatientId, getPatientIds } from '@/data/user';
import { Firestore, collection, doc, getFirestore } from 'firebase/firestore';
import { createPatient, getPatientsData } from '@/data/patients';
import getFirebaseApp from '@/firebase/initFirebase';
import NewPatientFormDialog from '@/components/subpages/NewPatient';
import { Patient } from '@/types/users';
import { useFirestore, useFirestoreDocData } from 'reactfire';

async function getServerLoggedIn(
  cookies: {
    [key: string]: string;
  },
  adminAuth: Auth
): Promise<{
  isLoggedIn: boolean;
  userId: string;
}> {
  if (!cookies.token) {
    return {
      isLoggedIn: false,
      userId: null
    };
  }

  try {
    const token = await adminAuth.verifyIdToken(cookies.token);
    if (!token) {
      return {
        isLoggedIn: false,
        userId: null
      };
    }

    // the user is authenticated!
    const { uid } = token;
    const user = await adminAuth.getUser(uid);

    return {
      isLoggedIn: true,
      userId: user.uid
    };
  } catch (error) {
    return {
      isLoggedIn: false,
      userId: null
    };
  }
}

async function getAllPatients(db: Firestore, userId: string) {
  const patients = await getPatientsData(db, await getPatientIds(db, userId));
  return patients;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const adminAuth = getAdminAuth();

  const user = await getServerLoggedIn(cookies, adminAuth);

  if (user.isLoggedIn) {
    const db = getFirebaseApp();
    const patients = await getAllPatients(getFirestore(db), user.userId);
    return {
      props: {
        patients: patients,
        userId: user.userId,
        isLoggedIn: user.isLoggedIn
      }
    };
  }

  return {
    props: {
      patients: [],
      userId: user.userId,
      isLoggedIn: user.isLoggedIn
    }
  };
};

function Dashboard({
  patients,
  userId,
  isLoggedIn
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const db = useFirestore();

  const addPatient = React.useCallback<(patient: Patient) => Promise<void>>(
    async (patient) => {
      const uid = await createPatient(db, patient);
      addPatientId(db, userId, uid);
    },
    []
  );

  const [patientNames, setPatientNames] = useState(patients);

  const { status, data } = useFirestoreDocData(
    doc(collection(db, 'users'), userId)
  );

  React.useEffect(() => {
    if (status !== 'loading') {
      getPatientsData(db, data.patients).then((patients) => {
        console.log(patients);
        setPatientNames(patients);
      });
    }
  }, [status, data]);
  console.log(patientNames);

  return (
    <>
      <Header />
      <GuardedPage>
        <div>
          <Box sx={{ ml: '5%', mt: '2%', mr: '5%' }}>
            <Box sx={{ mt: '1%' }}></Box>
            <h1 className={styles.mainheading}>Dashboard</h1>
            <Box sx={{ mt: '0.5%', mb: '1%' }}>
              <NewPatientFormDialog callback={addPatient} />
            </Box>
            <Autocomplete
              multiple
              id="Searchbar"
              options={patientNames}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  sx={{ backgroundColor: 'white', borderRadius: 25 }}
                  {...params}
                  label="Search for Patients"
                  placeholder="Enter Patient Name"
                />
              )}
              sx={{ flexGrow: 7 }}
            />
            <Box sx={{ mb: '2%' }}></Box>
            <ul>
              {patientNames.map((patient: Patient) => (
                <ListItemButton
                  sx={{
                    backgroundColor: '#34497980',
                    borderRadius: 50,
                    mt: '1%'
                  }}
                  key={patient.name}
                >
                  {patient.name}
                </ListItemButton>
              )) ?? 'No patients'}
            </ul>
          </Box>
        </div>
      </GuardedPage>
    </>
  );
}

export default Dashboard;
