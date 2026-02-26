import { LLMTestHelperApi } from '@/api/LLMTestHelperApi';
import type { UserProfile } from '../types/userTypes';

export const userApi = LLMTestHelperApi.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<UserProfile, void>({
      query: () => ({ url: '/users/me' }),
    }),
  }),
});

export const { useGetUserProfileQuery } = userApi;
