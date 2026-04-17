import { apiClient } from "./apiClient.ts";
import { LoginRequest, LoginResponse } from "../types/auth.ts";

export const login = async (payload: LoginRequest):Promise<LoginResponse> => {
  const res = await apiClient.post("/auth/login", payload);
  return res.data;
};