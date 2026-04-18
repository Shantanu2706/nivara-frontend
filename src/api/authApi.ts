import { apiClient } from "./apiClient";
import { LoginRequest, AuthResponse, RegisterRequest } from "../types";

export const login = async (payload: LoginRequest):Promise<AuthResponse> => {
  const res = await apiClient.post("/auth/login", payload);
  return res.data;
};

export const register = async (payload: RegisterRequest):Promise<AuthResponse> => {
  const res = await apiClient.post("/auth/register", payload);
  return res.data;
};