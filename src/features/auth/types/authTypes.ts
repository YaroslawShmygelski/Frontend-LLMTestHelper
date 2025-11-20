export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  country_code: number;
  phone_number: number;
  password: string;
}

export interface RegisterResponse {
  userId: number;
}
