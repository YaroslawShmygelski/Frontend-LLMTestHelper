import { LLMTestHelperApi } from '@/api/LLMTestHelperApi';
import { logout, setCredentials } from '../state/authSlice';
import {
  type RegisterRequest,
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
} from '../types/authTypes';

export const authApi = LLMTestHelperApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        // Optimize object to form parameter for OAUTH2.0
        body: new URLSearchParams({
          username: credentials.username,
          password: credentials.password,
        }).toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
      transformResponse: (response: { access_token: string }) => ({
        accessToken: response.access_token,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setCredentials({ accessToken: data.accessToken }));
        } catch {
          dispatch(logout());
        }
      },
    }),
    registerUser: build.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/users/register',
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const registerResult = await queryFulfilled; // RegisterResponse { userId }
          console.log(registerResult);
          // После регистрации логинимся, чтобы получить токен
          const loginResponse = await dispatch(
            authApi.endpoints.loginUser.initiate({
              username: arg.email,
              password: arg.password,
            })
          ).unwrap();

          dispatch(setCredentials({ accessToken: loginResponse.accessToken }));
        } catch (err) {
          console.error('Registration/login failed:', err);
          dispatch(logout());
        }
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
