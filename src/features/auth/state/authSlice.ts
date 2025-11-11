import { createSlice } from "@reduxjs/toolkit/react";
import { tokenService } from "../services/tokenService";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: !!tokenService.getToken(),
};

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      tokenService.setToken(action.payload.accessToken);
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      tokenService.removeToken();
    },
  },
});

export const { setCredentials, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
