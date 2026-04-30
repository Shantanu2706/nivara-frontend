import { apiClient } from "./apiClient";
export interface LedgerItem {
  id: number;
  amount: number;
  reason: string;
  referenceId: string;
  createdAt: string;
  type: string;
}

export const getLedger = async (): Promise<LedgerItem[]> => {
  const response = await apiClient.get(`/credit-ledger/my`);
  return response.data;
};