import { apiClient } from './apiClient';

export interface ProposalPayload {
  jobDescription: string;
  skills: string;
  yearsOfExperience: number;
  relevantPastWork: string;
}

export interface ProposalHistoryItem {
  id: number;
  jobDescription: string;
  createdAt: string;
}

export interface ProposalHistoryDetail {
  id: number;
  jobDescription: string;
  skills: string;
  yearsOfExperience: number;
  relevantPastWork: string;
  proposal: string;
  createdAt: string;
}

interface StreamProposalOptions {
  onChunk: (chunk: string) => void;
}

const extractSsePayload = (text: string): string => {
  const cleaned = text
    .split('\n')
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.replace('data:', ''))
    .filter((line) => line && line !== '[DONE]')
    .join('');

  return cleaned || text;
};

export const streamProposal = async (
  payload: ProposalPayload,
  { onChunk }: StreamProposalOptions
): Promise<void> => {
  let processedLength = 0;

  const response = await apiClient.post("/ai/ask", payload, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
    responseType: 'text',
    onDownloadProgress: (progressEvent) => {
      const target = progressEvent.event?.target as XMLHttpRequest | undefined;
      const fullText = target?.responseText || '';
      const delta = fullText.slice(processedLength);
      processedLength = fullText.length;

      if (!delta) {
        return;
      }

      const output = extractSsePayload(delta);
      if (output && output !== '[DONE]') {
        onChunk(output);
      }
    },
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error('Failed to generate proposal. Please try again.');
  }
};

const normalizeHistoryItem = (item: any): ProposalHistoryItem => ({
  id: item?.id,
  jobDescription: item?.jobDescription,
  createdAt: item?.createdAt,
});

const normalizeHistoryDetail = (item: any): ProposalHistoryDetail => ({
  id: item?.id,
  jobDescription: item?.jobDescription,
  skills: item?.skills,
  yearsOfExperience: item?.yearsOfExperience,
  relevantPastWork: item?.relevantPastWork,
  proposal: item?.proposal,
  createdAt: item?.createdAt, 
});

export const getProposalHistory = async (): Promise<ProposalHistoryItem[]> => {
  const response = await apiClient.get(`/proposals/my`);

  return response.data
    .map(normalizeHistoryItem)
    .filter((item: ProposalHistoryItem) => item.id);
};

export const getProposalHistoryCount = async (): Promise<number> => {
  const response = await apiClient.get(`/proposals/my`);
  return response.data.length;
};

export const getProposalHistoryById = async (id: string): Promise<ProposalHistoryDetail> => {
  const response = await apiClient.get(`/proposals/${id}`);
  return normalizeHistoryDetail(response.data);
};
