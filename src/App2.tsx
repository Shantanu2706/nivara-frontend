import React, { useMemo, useState } from 'react';
import { getUserByEmail, createUser } from './api/userApi.ts';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  IconButton,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginStep from './components/LoginStep.tsx';
import ProposalWizard from './components/ProposalWizard.tsx';
import ProposalHistory from './components/ProposalHistory.tsx';
import './App.css';

type AppPage = 'proposal' | 'history';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loggedInName, setLoggedInName] = useState('');
  const [loginStep, setLoginStep] = useState('email');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<AppPage>('proposal');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          primary: {
            main: isDarkMode ? '#5eead4' : '#0f766e',
          },
          background: {
            default: isDarkMode ? '#0f172a' : '#f3f9f8',
          },
        },
        shape: {
          borderRadius: 10,
        },
        typography: {
          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", sans-serif',
        },
      }),
    [isDarkMode]
  );

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    setLoginError('');

    if (loginStep === 'email') {
      if (!trimmedEmail) return;
      setLoginLoading(true);
      try {
        const { name: existingName, id: userId } = await getUserByEmail(trimmedEmail);
        if (existingName) {
          setLoggedInName(existingName || trimmedEmail);
          setUserId(userId);
          setSubmittedEmail(trimmedEmail);
        } else {
          setLoginStep('name');
        }
      } catch (err: any) {
        // if error is 404, it means user doesn't exist, so we move to name step. For other errors, show message.
        if (err?.response?.status === 404) {
          setLoginStep('name');
        } else {
        setLoginError(err?.response?.data?.message || err?.message || 'Login failed. Please try again.');
        }
      } finally {
        setLoginLoading(false);
      }
    } else {
      const trimmedName = name.trim();
      if (!trimmedName) return;
      setLoginLoading(true);
      try {
        await createUser(trimmedEmail, trimmedName);
        const { id: createdUserId } = await getUserByEmail(trimmedEmail);
        setLoggedInName(trimmedName);
        setUserId(createdUserId);
        setSubmittedEmail(trimmedEmail);
      } catch (err: any) {
        setLoginError(err?.response?.data?.message || err?.message || 'Account creation failed. Please try again.');
      } finally {
        setLoginLoading(false);
      }
    }
  };

  const handleLogout = () => {
    setLoggedInName('');
    setSubmittedEmail('');
    setEmail('');
    setName('');
    setLoginStep('email');
    setLoginError('');
    setUserId(null);
    setCurrentPage('proposal');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        className="login-page"
        sx={{
          background: isDarkMode
            ? 'radial-gradient(circle at 15% 10%, rgba(94, 234, 212, 0.18), transparent 35%), radial-gradient(circle at 85% 90%, rgba(14, 116, 144, 0.2), transparent 30%), #0f172a'
            : 'radial-gradient(circle at 15% 10%, rgba(15, 118, 110, 0.15), transparent 35%), radial-gradient(circle at 85% 90%, rgba(20, 184, 166, 0.14), transparent 30%), #f3f9f8',
          transition: 'background 240ms ease',
        }}
      >
        <Container maxWidth="sm">
          <Card
            elevation={0}
            sx={{
              borderRadius: '16px',
              backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.86)',
              border: isDarkMode ? '1px solid rgba(148, 163, 184, 0.25)' : '1px solid rgba(15, 118, 110, 0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: isDarkMode
                ? '0 24px 50px rgba(0, 0, 0, 0.4)'
                : '0 24px 50px rgba(15, 118, 110, 0.14)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h4" component="h1" fontWeight={700}>
                  {submittedEmail ? 'Proposal Writer' : 'Proposal Writer Login'}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {submittedEmail && (
                    <Button
                      size="small"
                      variant={currentPage === 'proposal' ? 'contained' : 'outlined'}
                      onClick={() => setCurrentPage('proposal')}
                      sx={{ borderRadius: '10px', textTransform: 'none' }}
                    >
                      New Proposal
                    </Button>
                  )}
                  {submittedEmail && (
                    <Button
                      size="small"
                      variant={currentPage === 'history' ? 'contained' : 'outlined'}
                      onClick={() => setCurrentPage('history')}
                      sx={{ borderRadius: '10px', textTransform: 'none' }}
                    >
                      History
                    </Button>
                  )}
                  {submittedEmail && loggedInName && (
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      {loggedInName}
                    </Typography>
                  )}
                  {submittedEmail && (
                    <Tooltip title="Logout">
                      <IconButton
                        color="primary"
                        onClick={handleLogout}
                        sx={{ border: '1px solid', borderColor: 'divider' }}
                      >
                        <LogoutRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                    <IconButton
                      color="primary"
                      onClick={() => setIsDarkMode((prev: boolean) => !prev)}
                      sx={{ border: '1px solid', borderColor: 'divider' }}
                    >
                      {isDarkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
              {!submittedEmail ? (
                <LoginStep
                  step={loginStep}
                  email={email}
                  name={name}
                  onEmailChange={setEmail}
                  onNameChange={setName}
                  onSubmit={handleSubmit}
                  isLoading={loginLoading}
                  error={loginError}
                />
              ) : currentPage === 'history' ? (
                <ProposalHistory userId={userId} />
              ) : (
                <ProposalWizard />
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
