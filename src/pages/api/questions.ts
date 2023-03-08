import { QuestionRequest, QuestionType, Questions } from '@/types/questions';
// import { isValidBody } from '@/util/typescript_helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

function get_questions(type: QuestionType): [string, string[]][] {
  switch (type) {
    case QuestionType.PHQ9: {
      return [['How are you feeling today?', ['0', '1', '2', '3']]];
    }
    default: {
      return [['Are you feeling down?', ['0', '1', '2', '3']]];
    }
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Questions>
) {
  const { body } = req;

  if (!isValidBody<QuestionRequest>(body, ['type'])) {
    return res.status(402);
  }

  const questions = get_questions(body.type);

  res.status(200).json({ questions: questions });
}
