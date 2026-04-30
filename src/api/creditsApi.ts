import { GetCreditsResponse } from "../types";
import { apiClient } from "./apiClient";

export const getCreditsBalance = async (): Promise<GetCreditsResponse> => {
  const response = await apiClient.get(`/credits`);
  return response.data;
};