import * as React from 'react';
import nookies from 'nookies';
import { Inter } from 'next/font/google';
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Drawer,
  Button,
  Box
} from '@mui/material/';
import { useState } from 'react';
import GuardedPage from '@/components/GuardedPage';
import styles from '@/styles/Home.module.css';
import { useAuth } from 'reactfire';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { adminSDK } from '@/firebase/initFirebaseAdmin';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  if (!cookies.token) {
    return {
      props: {
        isLoggedIn: false
      }
    };
  }

  try {
    const token = await adminSDK.auth().verifyIdToken(cookies.token);
    if (!token) {
      return {
        props: {
          isLoggedIn: false
        }
      };
    }

    // the user is authenticated!
    const { uid } = token;
    const user = await adminSDK.auth().getUser(uid);

    return {
      props: {
        isLoggedIn: true
      }
    };
  } catch (error) {
    return {
      props: {
        isLoggedIn: false
      }
    };
  }
};

const inter = Inter({ subsets: ['latin'] });

function Dashboard({
  isLoggedIn
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(isLoggedIn);
  const [anchorDrawer, setAnchorDrawer] = useState(null);

  const openDrawer = (event) => {
    setAnchorDrawer(event.currentTarget);
  };
  const closeDrawer = () => {
    setAnchorDrawer(null);
  };

  const [patientNames, setPatientNames] = useState(['Test One', 'Test 2']);

  /*useEffect(() => {
        // Get the hashmap of patients from an API
        fetch('/api/patients/hashmap')
            .then(response => response.json())
            .then(patients => {
                // Extract the names of all patients from the hashmap
                const patientNames = Object.values(patients).map(patient => patient.name);

                // Update the state with the list of patient names
                setPatientNames(patientNames);
            })
            .catch(error => console.error(error));
    }, []);*/

  return (
    <GuardedPage>
      <div className={styles.grid2}>
        <a
          onClick={openDrawer}
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Patient Profiles <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Track your patient&apos;s growth and wellness through our automated
            system over time!
          </p>
        </a>
        <Drawer
          anchor="left"
          open={Boolean(anchorDrawer)}
          onClose={closeDrawer}
          PaperProps={{
            sx: {
              marginTop: '100px',
              backgroundColor: '#34497980',
              color: 'white',
              flexGrow: 1,
              width: '100%'
            }
          }}
        >
          <Box sx={{ ml: '5%', mt: '2%' }}>
            <h1 className={styles.mainheading}>Dashboard</h1>
            <ul>
              {patientNames.map((patientName) => (
                <li key={patientName}>
                  {patientName}
                  <Button sx={{ backgroundColor: 'white', ml: '2%' }}></Button>
                </li>
              ))}
            </ul>
          </Box>
        </Drawer>
      </div>
    </GuardedPage>
  );
}

export default Dashboard;
