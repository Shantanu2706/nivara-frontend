export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ProfileResponse {
  name: string;
  email: string;
  tier: string;
  verified: boolean;
  createdAt: string;
}

export interface GetCreditsResponse{
  balance: number;
}