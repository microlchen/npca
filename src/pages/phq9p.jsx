import styles from '@/styles/Home.module.css'
import * as React from 'react';
import { Button, Box, Text } from "@mui/material/";
import WriteToCloudFirestore from '@/components/cloudFirestore/Write.js';
import ReadToCloudFirestore from '@/components/cloudFirestore/Read.js';
import VideocamIcon from '@mui/icons-material/Videocam';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



const patientform = () => {
    //make a hashmap

    const handleChange1 = (value) => {
        
    }
    const handleChange2 = (value) => {
        
    }
    const handleChange3 = (value) => {
        
    }
    const handleChange4 = (value) => {
        
    }
    const handleChange5 = (value) => {
      
    }
    const handleChange6 = (value) => {
       
    }
    const handleChange7 = (value) => {
        
    }
    const handleChange8 = (value) => {
        
    }
    const handleChange9 = (value) => {
        
    }

    return (

        <Box sx={{ marginTop: "5%", marginLeft: "4%", backgroundColor: "white", marginRight: "4%" }}>
            <Box sx={{ paddingTop: "1%" }}>
                <div className={styles.mainheading}> &nbsp; &nbsp;PHQ - 9 &nbsp;&nbsp;
                    <VideocamIcon />
                </div>

                <div className={styles.questionheading2}>Over the last 2 weeks, how often have you been bothered
                    by any of the following problems?</div>
                <div className={styles.questions}> Q1 - Little interest or pleasure in doing things</div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={q1answer}
                        label="Answer"
                        onChange={handleChange1}
                    >
                        <MenuItem value={0}>0 - Not at all</MenuItem>
                        <MenuItem value={1}>1 - Several days</MenuItem>
                        <MenuItem value={2}>2 - More than half the days</MenuItem>
                        <MenuItem value={3}>3 - Nearly every day</MenuItem>
                    </Select>
                </FormControl>

                <div className={styles.questions}> Q2 - Feeling down, depressed, or hopeless</div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={q2answer}
                        label="Answer"
                        onChange={handleChange2}
                    >
                        <MenuItem value={0}>0 - Not at all</MenuItem>
                        <MenuItem value={1}>1 - Several days</MenuItem>
                        <MenuItem value={2}>2 - More than half the days</MenuItem>
                        <MenuItem value={3}>3 - Nearly every day</MenuItem>
                    </Select>
                </FormControl>
                <div className={styles.questions}> Q3 - Trouble falling or staying asleep, or sleeping too much</div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={q3answer}
                        label="Answer"
                        onChange={handleChange3}
                    >
                        <MenuItem value={0}>0 - Not at all</MenuItem>
                        <MenuItem value={1}>1 - Several days</MenuItem>
                        <MenuItem value={2}>2 - More than half the days</MenuItem>
                        <MenuItem value={3}>3 - Nearly every day</MenuItem>
                    </Select>
                </FormControl>

                <div className={styles.questions}> Q4 - Feeling tired or having little energy</div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={q4answer}
                        label="Answer"
                        onChange={handleChange4}
                    >
                        <MenuItem value={0}>0 - Not at all</MenuItem>
                        <MenuItem value={1}>1 - Several days</MenuItem>
                        <MenuItem value={2}>2 - More than half the days</MenuItem>
                        <MenuItem value={3}>3 - Nearly every day</MenuItem>
                    </Select>
                </FormControl>


                <div className={styles.questions}> Q5 - Poor appetite or overeating </div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={q5answer}
                        label="Answer"
                        onChange={handleChange5}
                    >
                        <MenuItem value={0}>0 - Not at all</MenuItem>
                        <MenuItem value={1}>1 - Several days</MenuItem>
                        <MenuItem value={2}>2 - More than half the days</MenuItem>
                        <MenuItem value={3}>3 - Nearly every day</MenuItem>
                    </Select>
                </FormControl>

                <div className={styles.questions}> Q6 - Feeling bad about yourself — or that you are a failure or
                    have let yourself or your family down </div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={q6answer}
                        label="Answer"
                        onChange={handleChange6}
                    >
                        <MenuItem value={0}>0 - Not at all</MenuItem>
                        <MenuItem value={1}>1 - Several days</MenuItem>
                        <MenuItem value={2}>2 - More than half the days</MenuItem>
                        <MenuItem value={3}>3 - Nearly every day</MenuItem>
                    </Select>
                </FormControl>

                <div className={styles.questions}> Q7 - Trouble concentrating on things, such as reading the
                    newspaper or watching television</div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={q7answer}
                        label="Answer"
                        onChange={handleChange7}
                    >
                        <MenuItem value={0}>0 - Not at all</MenuItem>
                        <MenuItem value={1}>1 - Several days</MenuItem>
                        <MenuItem value={2}>2 - More than half the days</MenuItem>
                        <MenuItem value={3}>3 - Nearly every day</MenuItem>
                    </Select>
                </FormControl>

                <div className={styles.questions}> Q8 - Moving or speaking so slowly that other people could have
                    noticed? Or the opposite — being so fidgety or restless
                    that you have been moving around a lot more than usual </div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={q8answer}
                        label="Answer"
                        onChange={handleChange8}
                    >
                        <MenuItem value={0}>0 - Not at all</MenuItem>
                        <MenuItem value={1}>1 - Several days</MenuItem>
                        <MenuItem value={2}>2 - More than half the days</MenuItem>
                        <MenuItem value={3}>3 - Nearly every day</MenuItem>
                    </Select>
                </FormControl>

                <div className={styles.questions}> Q9 - Thoughts that you would be better off dead or of hurting
                    yourself in some way </div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={q9answer}
                        label="Answer"
                        onChange={handleChange9}
                    >
                        <MenuItem value={0}>0 - Not at all</MenuItem>
                        <MenuItem value={1}>1 - Several days</MenuItem>
                        <MenuItem value={2}>2 - More than half the days</MenuItem>
                        <MenuItem value={3}>3 - Nearly every day</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: -7 }}>
                    <Button className={styles.submit}>Submit</Button>
                    <WriteToCloudFirestore />
                    <ReadToCloudFirestore />
                </Box>
            </Box>
        </Box>
    )
}
export default patientform