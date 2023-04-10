/**
 * @jest-environment node
 */
import { describe, expect } from '@jest/globals';
import { Question } from '@/types/questions';
import { createQuestionSet } from '@/data/questions';
import initFirebase from '@/firebase/initFirebase';

describe.only('Test question helper functions', () => {
  const questions: Question[] = [
    {
      key: '0',
      question: 'Do you have little interest or pleasure in doing things?',
      responses: ['0', '1', '2', '3']
    },
    {
      key: '1',
      question: 'Do you feel down, depressed, or hopeless?',
      responses: ['0', '1', '2', '3']
    },
    {
      key: '2',
      question:
        'Do you have trouble falling or staying asleep, or sleep too much?',
      responses: ['0', '1', '2', '3']
    },
    {
      key: '3',
      question: 'Do you have feel tired or have little energy?',
      responses: ['0', '1', '2', '3']
    },
    {
      key: '4',
      question: 'Do you have poor appetite or overeat?',
      responses: ['0', '1', '2', '3']
    },
    {
      key: '5',
      question:
        'Do you feel bad about yourself — or feel that you are a failure or have let yourself or your family down?',
      responses: ['0', '1', '2', '3']
    },
    {
      key: '6',
      question:
        'Do you have trouble concentrating on things, such as reading the newspaper or watching television?',
      responses: ['0', '1', '2', '3']
    },
    {
      key: '7',
      question:
        'Do you move or speak so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?',
      responses: ['0', '1', '2', '3']
    },
    {
      key: '8',
      question:
        'Do you have thoughts that you would be better off dead or of hurting yourself in some way?',
      responses: ['0', '1', '2', '3']
    }
  ];

  // beforeAll(() => {
  //   initFirebase();
  // });

  // it('should return a successful response from phq9 questions', async () => {
  //   const res = await create_question_set('PHQ-9', questions);

  //   expect(res == 0);
  // });
});
