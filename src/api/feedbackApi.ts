import { apiClient } from "./apiClient";

export const sendFeedback = async (message: string): Promise<void> => {
  await apiClient.post(`/feedback`, { message });
};