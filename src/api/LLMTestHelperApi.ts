import { baseQueryWithReAuth } from "@/features/auth/api/baseQueryConfig";
import { tokenService } from "@/features/auth/services/tokenService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseQuery = fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/v1/",
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = tokenService.getToken();
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
    },
});

export const LLMTestHelperApi = createApi({
  reducerPath: "LLMTestHelperApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
