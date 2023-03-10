import { QuestionType, Question } from '@/types/questions';
import { Patient, UUID } from '@/types/users';

const patients: Map<UUID, Patient[]> = new Map([
  [
    '123',
    [
      { uuid: '0', name: 'Smith' },
      { uuid: '1', name: 'Sean' },
      { uuid: '2', name: 'Dean' }
    ]
  ]
]);

export function get_questions(type: QuestionType): Question[] {
  switch (type) {
    case QuestionType.PHQ9: {
      return [
        {
          key: '01',
          question: 'How are you feeling today?',
          responses: ['0', '1', '2', '3']
        }
      ];
    }
    default: {
      return [
        {
          key: '02',
          question: 'Are you feeling down?',
          responses: ['0', '1', '2', '3']
        }
      ];
    }
  }
}

export function getPatients(providerId: string): Patient[] {
  return patients.get(providerId);
}
