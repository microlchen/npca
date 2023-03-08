export enum QuestionType {
  PHQ9 = 'PHQ-9'
}

export type QuestionRequest = {
  type: QuestionType;
};

export type Questions = {
  questions: [string, string[]][];
};
