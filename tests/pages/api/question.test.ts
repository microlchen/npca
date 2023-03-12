/**
 * @jest-environment node
 */
import { describe, expect } from '@jest/globals';
import { createMocks, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/questions';
import { QuestionType } from '@/types/questions';

describe('/api/questions API Endpoint', () => {
  function mockRequestResponse(
    questionType: QuestionType,
    method: RequestMethod = 'GET'
  ) {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } =
      createMocks({ method });
    req.headers = {
      'Content-Type': 'application/json'
    };
    req.body = { type: questionType };
    return { req, res };
  }

  it('should return a successful response from phq9 questions', async () => {
    const { req, res } = mockRequestResponse(QuestionType.PHQ9);
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
    expect(res.json);
  });

  it('should return a successful response from questions', async () => {
    const { req, res } = mockRequestResponse(QuestionType.PHQ9);
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });

  //   it('should return a 404 if Gateway UID is invalid', async () => {
  //     const { req, res } = mockRequestResponse();
  //     req.query = { gatewayID: 'hello_world' }; // invalid gateway ID

  //     await gatewaysHandler(req, res);

  //     expect(res.statusCode).toBe(404);
  //     expect(res._getJSONData()).toEqual({ err: 'Unable to find device' });
  //   });

  //   it('should return a 400 if Gateway ID is missing', async () => {
  //     const { req, res } = mockRequestResponse();
  //     req.query = {}; // Equivalent to a null gateway ID

  //     await gatewaysHandler(req, res);

  //     expect(res.statusCode).toBe(400);
  //     expect(res._getJSONData()).toEqual({
  //       err: 'Invalid gateway UID parameter'
  //     });
  //   });

  //   it('should return a 405 if HTTP method is not GET', async () => {
  //     const { req, res } = mockRequestResponse('POST'); // Invalid HTTP call

  //     await gatewaysHandler(req, res);

  //     expect(res.statusCode).toBe(405);
  //     expect(res._getJSONData()).toEqual({
  //       err: 'Method not allowed'
  //     });
  //   });
});
