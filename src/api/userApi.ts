import { ProfileResponse,UpdateProfileRequest } from '../types';
import { apiClient } from './apiClient';

export const getProfile = async ():Promise<ProfileResponse> => {
  const res = await apiClient.get("/users/my");
  return res.data;
};

export const updateProfile = async (payload: UpdateProfileRequest):Promise<ProfileResponse> => {
  const res = await apiClient.patch("/users/my", payload);
  return res.data;
};