import {LLMTestHelperApi} from "@/api/LLMTestHelperApi";
import {logout, setCredentials} from "../state/authSlice";

export interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
}

export const authApi = LLMTestHelperApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation<LoginResponse, { username: string; password: string }>({
            query: ({ username, password }) => ({
                url: '/auth/login',
                method: 'POST',
                body: new URLSearchParams({ username, password }).toString(),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }),
            async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
                try {
                    console.log(1);
                    const {data} = await queryFulfilled;
                    console.log(data);
                    dispatch(setCredentials({accessToken: data.accessToken}));
                } catch (error) {
                    dispatch(logout());
                }
            },
        }),
    }),
});

export const {useLoginUserMutation} = authApi;
