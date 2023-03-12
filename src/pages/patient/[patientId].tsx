import { Box, List, ListItem, ListItemText, Tab, Tabs } from '@mui/material';
import { QuestionType, Question } from '@/types/questions';
import { get_questions } from '@/data/data';
import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function displayQuestion(question: Question) {
  return <ListItemText primary={question.question} />;
}

function createQuestionsTabs(
  tabValue: number,
  setTabValue: React.Dispatch<React.SetStateAction<number>>,
  phq9: Question[]
) {
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="PHQ-9" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <List>
          {phq9.map((question) => (
            <ListItem key={question.key}>{displayQuestion(question)}</ListItem>
          ))}
        </List>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      // will be passed to the page component as props
      questions: get_questions(QuestionType.PHQ9)
    }
  };
}

export default function Login({ questions }) {
  console.log(questions);
  const [tabValue, setTabValue] = React.useState(0);
  const tabs = createQuestionsTabs(tabValue, setTabValue, questions);

  return tabs;
}
