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

export interface UpdateProfileRequest {
  skills: string;
  yearsOfExperience: number;
}

export interface ProfileResponse {
  name: string;
  email: string;
  tier: string;
  createdAt: string;
  updatedAt: string;
  skills: string;
  yearsOfExperience: number;
}

export interface GetCreditsResponse{
  balance: number;
}