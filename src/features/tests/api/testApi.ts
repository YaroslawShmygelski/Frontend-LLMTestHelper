import { LLMTestHelperApi } from '@/api/LLMTestHelperApi';
import type { UploadTestRequest, UploadTestResponse } from '../types/testTypes';

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
  }),
});

export const { useUploadTestMutation } = testApi;
