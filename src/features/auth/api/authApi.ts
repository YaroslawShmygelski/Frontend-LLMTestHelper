import { LLMTestHelperApi } from "@/api/LLMTestHelperApi";
import { logout, setCredentials } from "../state/authSlice";
import type { LoginRequest, LoginResponse } from "../types/authTypes";

export const authApi = LLMTestHelperApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        // Optimize object to form parameter for OAUTH2.0
        body: new URLSearchParams({
          username: credentials.username,
          password: credentials.password,
        }).toString(),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
  }),
});

export const { useLoginUserMutation } = authApi;
