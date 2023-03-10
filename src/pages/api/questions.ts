import {
  Question,
  QuestionRequest,
  QuestionResponse,
  QuestionType
} from '@/types/questions';
import { isValidBody } from '@/utils/typescript_helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

function get_questions(type: QuestionType): Question[] {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuestionResponse>
) {
  const { body } = req;

  if (!isValidBody<QuestionRequest>(body, ['type'])) {
    return res.status(402);
  }

  const questions = get_questions(body.type);

  res.status(200).json({ questions: questions });
}
