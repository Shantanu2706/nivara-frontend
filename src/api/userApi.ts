import { ProfileResponse } from '../types';
import { apiClient } from './apiClient';

export const getProfile = async ():Promise<ProfileResponse> => {
  const res = await apiClient.get("/users/my");
  return res.data;
};




