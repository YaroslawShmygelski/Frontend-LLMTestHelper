import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { tokenService } from '../utils/tokenService';
import { baseQuery } from '@/api/LLMTestHelperApi';
import { logout, setCredentials } from '../state/authSlice';

// Decorator of built-in base Query option in RTKQ createAPI
export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, store, extraOptions) => {
  let result = await baseQuery(args, store, extraOptions);

  if (result.error && result.error.status === 401) {
    // Request to refresh endpoint
    const refreshResult = await baseQuery(
      { url: 'auth/refresh', method: 'POST' },
      store,
      extraOptions
    );
    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };
      tokenService.setToken(accessToken);
      store.dispatch(setCredentials({ accessToken }));
      result = await baseQuery(args, store, extraOptions);
    } else {
      // RTK Slice logout action if request to refresh endpoint failed
      store.dispatch(logout());
    }
  }
  return result;
};
