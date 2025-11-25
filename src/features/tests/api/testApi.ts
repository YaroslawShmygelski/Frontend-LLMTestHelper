import { LLMTestHelperApi } from '@/api/LLMTestHelperApi';
import type { FullTestResponse } from '../types/testTypes';
import type {
  GetTestToSubmitResponse,
  SubmitTestRequest,
  UploadTestRequest,
  UploadTestResponse,
} from '../types/apiTypes';

export const testApi = LLMTestHelperApi.injectEndpoints({
  endpoints: (build) => ({
    uploadTest: build.mutation<UploadTestResponse, UploadTestRequest>({
      query: (payload) => ({
        url: '/tests/google-docs',
        method: 'Post',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      }),
      transformResponse: (response: { test_id: number }) => ({
        testId: response.test_id,
      }),
    }),
    getTestToSubmit: build.query<FullTestResponse, number>({
      query: (testId) => ({ url: `/tests/${testId}` }),
      transformResponse: (
        response: GetTestToSubmitResponse
      ): FullTestResponse => {
        console.log(response);
        const rawData = response;
        return {
          test_id: rawData.test_id,
          uploaded_date: String(rawData.uploaded_date),
          test_structure: {
            questions: rawData.test_structure.questions.map((q) => ({
              id: q.id,
              question: q.question,
              type: {
                type_id: q.type.type_id,
                description: q.type.description,
              },
              required: q.required,
              options: q.options,
              answer_mode: q.answer_mode,
            })),
          },
        };
      },
    }),
    submitTest: build.mutation<string, SubmitTestRequest>({
      query: ({ payload, testId }) => ({
        url: `/tests/submit/${testId}`,
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const {
  useUploadTestMutation,
  useGetTestToSubmitQuery,
  useSubmitTestMutation,
} = testApi;
