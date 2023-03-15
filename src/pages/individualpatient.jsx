import * as React from 'react';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useState } from 'react';

import {
    ListItemButton,
    TextField,
    List,
    Box,
    FormControlLabel,
    Typography,
    Link,
    Button,
    Toolbar
} from '@mui/material/';

const inter = Inter({ subsets: ['latin'] });

export default function Individuals() {
    const nameplaceHolder = "Patient Name"
    const dob = "03/15/2023"
    const [FormNames, setFormNames] = useState(['Send Form1', 'Send Form2']);
    return (
        <>
            <Toolbar className={styles.appbar} sx={{ border: 1, borderColor: 'white', mb: '1%' }}>
                <Image
                    src="/npca.png"
                    alt="Next.js Logo"
                    width={300}
                    height={100}
                    priority
                />
            </Toolbar>
            <div className={styles.individualpatientboxspacing}>
                <div className={styles.mainheading}>
                    {nameplaceHolder}&nbsp;&nbsp;&nbsp;&nbsp;{dob}
                </div>
                <Box sx={{ mt: '1%' }}>
                    <Image
                        src="/npca.png"
                        alt="Next.js Logo"
                        width={700}
                        height={700}
                        priority
                    />
                    <p className={inter.className}>
                        Relevant stats from&nbsp;{nameplaceHolder} as of Today! Replace IMAGE WITH ACATUAL GRAPHS IDK
                    </p>
                </Box>
                <Box sx={{ mt: '1%' }}></Box>
                <List>
                    {FormNames.map((FormNames) => (
                        <ListItemButton sx={{ backgroundColor: '#34497980', borderRadius: 50, mt: "1%" }} key={FormNames}>
                            {FormNames}

                        </ListItemButton>
                    ))}
                </List>
                <Box sx={{ mb: '2%' }}></Box>
            </div>
        </>

    );
}