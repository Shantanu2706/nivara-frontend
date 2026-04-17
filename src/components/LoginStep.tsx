import { Alert, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';

interface LoginStepProps {
  step: string;
  email: string;
  name?: string;
  onEmailChange: (email: string) => void;
  onNameChange?: (name: string) => void;
  onSubmit: (event: any) => void;
  isLoading?: boolean;
  error?: string;
}

function LoginStep({ step, email, name, onEmailChange, onNameChange, onSubmit, isLoading, error }: LoginStepProps) {
  return (
    <>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {step === 'email' ? 'Enter your email to continue.' : 'Enter your name to create an account.'}
      </Typography>

      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : null}

      <Box component="form" onSubmit={onSubmit} noValidate>
        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(event: any) => onEmailChange(event.target.value)}
          required
          disabled={step === 'name'}
          margin="normal"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
        />
        {step === 'name' && (
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={name || ''}
            onChange={(event: any) => onNameChange && onNameChange(event.target.value)}
            required
            autoFocus
            margin="normal"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />
        )}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{
            mt: 2,
            borderRadius: '12px',
            py: 1.3,
            textTransform: 'none',
            fontWeight: 700,
          }}
        >
          {isLoading ? <CircularProgress size={22} color="inherit" /> : step === 'email' ? 'Continue' : 'Create Account'}
        </Button>
      </Box>
    </>
  );
}

export default LoginStep;
