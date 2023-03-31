import { Timestamp } from '@firebase/firestore';

export type Form = {
  patientId: string;
  providerId: string;
  questionId: string;
  questionName: string | null;
  timeCreated: Timestamp;
  timeCompleted: Timestamp | null;
  answerMap: { answer: string; id: string }[];
  id: string;
};

export const getDefaultForm = (): Form => {
  return {
    patientId: '',
    providerId: '',
    questionId: '',
    questionName: '',
    timeCreated: Timestamp.now(),
    timeCompleted: null,
    answerMap: [],
    id: ''
  };
};
