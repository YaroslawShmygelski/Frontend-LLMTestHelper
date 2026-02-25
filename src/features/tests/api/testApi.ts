import { LLMTestHelperApi } from '@/api/LLMTestHelperApi';
import type { FullTestResponse } from '../types/testTypes';
import type {
  GetTestToSubmitResponse,
  GetUserTestsResponse,
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
    uploadDocument: build.mutation<void, FormData>({
      query: (formData) => ({
        url: '/tests/document/upload',
        method: 'POST',
        body: formData,
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
          title: rawData.title,
          isSubmitted: rawData.is_submitted,
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
    getUserTests: build.query<
      GetUserTestsResponse,
      { offset?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: `/users/tests`,
        params: {
          offset: params?.offset ?? 0,
          limit: params?.limit ?? 20,
        },
      }),
    }),
  }),
});

export const {
  useUploadTestMutation,
  useUploadDocumentMutation,
  useGetTestToSubmitQuery,
  useSubmitTestMutation,
  useGetUserTestsQuery,
} = testApi;
