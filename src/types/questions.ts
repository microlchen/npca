export enum QuestionType {
  PHQ9 = 'PHQ-9'
}

export type QuestionRequest = {
  type: QuestionType;
};

export type QuestionResponse = {
  questions: Question[];
};

export type Question = { key: string; question: string; responses: string[] };

export type QuestionSet = { name: string; questions: Question[] };

export type KeyedQuestionSet = {
  key: string;
  name: string;
  questions: Question[];
};
