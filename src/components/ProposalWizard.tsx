import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  getProposalHistory,
  getProposalHistoryById,
  ProposalHistoryDetail,
  ProposalHistoryItem,
  streamProposal,
} from '../api/proposalApi.ts';

interface ProposalWizardProps {
  userId: number | null;
}

function ProposalWizard({ userId }: ProposalWizardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobDescription, setJobDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [relevantPastWork, setRelevantPastWork] = useState('');
  const [generatedProposal, setGeneratedProposal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState('');
  const [history, setHistory] = useState<ProposalHistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [selectedHistoryId, setSelectedHistoryId] = useState('');
  const [selectedHistory, setSelectedHistory] = useState<ProposalHistoryDetail | null>(null);
  const [historyDetailLoading, setHistoryDetailLoading] = useState(false);
  const proposalTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setHistoryLoading(true);
      setHistoryError('');
      setSelectedHistoryId('');
      setSelectedHistory(null);

      try {
        const items = await getProposalHistory(userId);
        setHistory(items);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to fetch proposal history.';
        setHistoryError(message);
        setHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    };

    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  const scrollProposalToBottom = () => {
    if (proposalTextRef.current) {
      const input = proposalTextRef.current.querySelector('textarea');
      if (input) {
        input.scrollTop = input.scrollHeight;
      }
    }
  };

  const generateProposal = async () => {
    setIsGenerating(true);
    setGenerateError('');
    setGeneratedProposal('');

    try {
      await streamProposal(
        {
          jobDescription,
          skills,
          yearsOfExperience: yearsExperience,
          relevantPastWork,
        },
        {
          onChunk: (chunk) => {
            setGeneratedProposal((prev: string) => {
              const updated = prev + chunk;
              requestAnimationFrame(() => scrollProposalToBottom());
              return updated;
            });
          },
        }
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to reach API.';
      setGenerateError(message);
      setGeneratedProposal('');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleHistoryClick = async (id: string) => {
    setSelectedHistoryId(id);
    setHistoryDetailLoading(true);

    try {
      const detail = await getProposalHistoryById(id);
      setSelectedHistory(detail);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to fetch selected proposal history.';
      setGenerateError(message);
      setSelectedHistory(null);
    } finally {
      setHistoryDetailLoading(false);
    }
  };

  return (
    <>
      <Alert severity="info" sx={{ mb: 3 }}>
        It will just take a minute.
      </Alert>

      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
        Page {currentPage} of 3
      </Typography>

      <Box
        sx={{
          mb: 3,
          p: 2,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '12px',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
          Proposal History
        </Typography>

        {historyLoading ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <CircularProgress size={18} />
            <Typography variant="body2" color="text.secondary">
              Loading history...
            </Typography>
          </Stack>
        ) : null}

        {!historyLoading && historyError ? (
          <Alert severity="error" sx={{ mb: 1.5 }}>
            {historyError}
          </Alert>
        ) : null}

        {!historyLoading && !historyError && history.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No proposal history found yet.
          </Typography>
        ) : null}

        {!historyLoading && history.length > 0 ? (
          <List dense sx={{ mb: selectedHistory ? 1.5 : 0 }}>
            {history.map((item: ProposalHistoryItem) => (
              <ListItemButton
                key={item.id}
                selected={selectedHistoryId === item.id}
                onClick={() => handleHistoryClick(item.id)}
                sx={{ borderRadius: '10px' }}
              >
                <ListItemText
                  primary={item.title || `Proposal ${item.id}`}
                  secondary={item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Open to view details'}
                />
              </ListItemButton>
            ))}
          </List>
        ) : null}

        {historyDetailLoading ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <CircularProgress size={18} />
            <Typography variant="body2" color="text.secondary">
              Loading selected proposal...
            </Typography>
          </Stack>
        ) : null}

        {selectedHistory && !historyDetailLoading ? (
          <TextField
            fullWidth
            label={selectedHistory.title || 'Selected History'}
            value={selectedHistory.proposalText}
            multiline
            minRows={6}
            InputProps={{ readOnly: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />
        ) : null}
      </Box>

      {currentPage === 1 ? (
        <>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Write the job description.
          </Typography>
          <TextField
            fullWidth
            label="Job Description"
            value={jobDescription}
              onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setJobDescription(event.target.value)}
            multiline
            minRows={7}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2.5 }}>
            <Button
              variant="contained"
              onClick={() => setCurrentPage(2)}
              disabled={!jobDescription.trim()}
              sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}
            >
              Next
            </Button>
          </Stack>
        </>
      ) : null}

      {currentPage === 2 ? (
        <>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Add profile details.
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Skills"
              value={skills}
              onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSkills(event.target.value)}
              placeholder="React, Node.js, API integrations"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
            <TextField
              fullWidth
              label="Years of Experience"
              type="number"
              value={yearsExperience}
              onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setYearsExperience(event.target.value)}
              inputProps={{ min: 0 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
            <TextField
              fullWidth
              label="Relevant Past Work"
              value={relevantPastWork}
              onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setRelevantPastWork(event.target.value)}
              multiline
              minRows={4}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
          </Stack>

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2.5 }}>
            <Button
              variant="outlined"
              onClick={() => setCurrentPage(1)}
              sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => setCurrentPage(3)}
              disabled={!skills.trim() || !yearsExperience || !relevantPastWork.trim()}
              sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}
            >
              Next
            </Button>
          </Stack>
        </>
      ) : null}

      {currentPage === 3 ? (
        <>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Generate proposal from your inputs.
          </Typography>

          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2.5 }}>
            <Button
              variant="outlined"
              onClick={() => setCurrentPage(2)}
              sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={generateProposal}
              disabled={
                isGenerating ||
                !jobDescription.trim() ||
                !skills.trim() ||
                !yearsExperience ||
                !relevantPastWork.trim()
              }
              sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}
            >
              {isGenerating ? 'Generating...' : 'Generate Proposal'}
            </Button>
          </Stack>

          {generateError ? (
            <Alert severity="error" sx={{ mb: 2.5 }}>
              {generateError}
            </Alert>
          ) : null}

          {generatedProposal || isGenerating ? (
            <Box sx={{ position: 'relative' }}>
              <TextField
                ref={proposalTextRef}
                fullWidth
                label={isGenerating ? 'Generating proposal...' : 'Generated Proposal'}
                value={generatedProposal}
                multiline
                minRows={12}
                InputProps={{ readOnly: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
              {isGenerating && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    width: 2,
                    height: 20,
                    backgroundColor: 'primary.main',
                    animation: 'blink 1s infinite',
                    '@keyframes blink': {
                      '0%, 49%': { opacity: 1 },
                      '50%, 100%': { opacity: 0 },
                    },
                  }}
                />
              )}
            </Box>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default ProposalWizard;
