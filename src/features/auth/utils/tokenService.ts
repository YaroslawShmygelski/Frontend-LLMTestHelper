import type { ApiErrorResponse } from '@/types/types';

export const tokenService = {
  getToken() {
    return localStorage.getItem('accessToken');
  },
  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  },
  removeToken() {
    localStorage.removeItem('accessToken');
  },
};

export const getErrorMessage = (error: unknown): string => {
  if (!error) return 'An unexpected error occurred';

  const err = error as ApiErrorResponse;

  if (err.data && typeof err.data === 'object') {
    return err.data.message || err.data.error || 'Invalid credentials';
  }

  if (err.message) {
    return err.message;
  }

  return 'Network error or server unavailable';
};
