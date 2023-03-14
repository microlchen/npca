import * as React from 'react';
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
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

function Dashboard() {
    const [anchorDrawer, setAnchorDrawer] = useState(null);

    const openDrawer = (event) => {
        setAnchorDrawer(event.currentTarget);
    };
    const closeDrawer = () => {
        setAnchorDrawer(null);
    };

    const [patientNames, setPatientNames] = useState(["Test One", "Test 2"]);

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
                    Track your patient&apos;s growth and wellness through our
                    automated system over time!
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
                <Box sx={{ml: '5%', mt: "2%"}}>
                    <h1 className={styles.mainheading} >Dashboard</h1>
                    <ul>
                        {patientNames.map(patientName => (
                            <li key={patientName}>
                                {patientName} 
                                <Button sx={{backgroundColor: 'white', ml: "2%"}}></Button>
                            </li>
                        ))}
                    </ul>
                </Box>

            </Drawer>

        </div>
    );
}

export default Dashboard;
