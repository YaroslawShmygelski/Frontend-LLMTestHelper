export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiErrorResponse {
  data?: {
    message?: string;
    error?: string;
  };
  status?: number;
  message?: string;
}
