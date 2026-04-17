import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export interface GetUserResponse {
    id: number;
  name: string;
}

export const getUserByEmail = async (email: string): Promise<GetUserResponse> => {
  const response = await axios.get<GetUserResponse>(`${BASE_URL}/api/users/by-email`, {
    params: { email },
  });
  return response.data;
};

export const createUser = async (email: string, name: string): Promise<void> => {
  await axios.post(`${BASE_URL}/api/users`, { email, name });
};
