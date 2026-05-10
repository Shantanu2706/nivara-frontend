import { Box, Card, TextField, CardContent, Button, FormControl, FormLabel, Alert, Typography, Link } from "@mui/material"
import { useState } from "react"
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils";
import EmailIcon from '@mui/icons-material/Email';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await login({ email, password });
            localStorage.setItem("token", data.token);
            navigate("/home");
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleGoogleLogin = () => {
        // Redirect to backend OAuth endpoint
        if (!isTokenValid()) {
            window.location.href = process.env.REACT_APP_BACKEND_URL + "/oauth2/authorization/google";
        }

    };

    return (
        <Card sx={{ mx: { xs: '10%', sm: '20%' }, mt: 10 }}>
            <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    ProposalWala
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 3, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    You're skilled. You know you can do the job. But your proposal gets ignored — while less experienced freelancers from other countries win the project.
                    The difference isn't skill. It's how they communicate.
                    ProposalWala reads the job description and writes a sharp, professional proposal tailored to that exact client — in the tone international clients respond to. No templates. No generic openers. Just a ready-to-send proposal in under 30 seconds.
                    Built specifically for Indian freelancers.
                </Typography>
                <Button onClick={handleGoogleLogin} variant="contained" startIcon={<EmailIcon />} color='warning'>
                    Sign in with Google
                </Button>
                {/* <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            size="small"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            id="password"
                            type="password"
                            name="password"
                            size="small"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••"
                            fullWidth />
                    </FormControl>
                    {error ?
                        <Alert severity="error">{error}</Alert> :
                        null
                    }

                    <Button
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        type="submit">
                        Sign In
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don't have an account?{' '}
                        <Link href="/register">
                            Register
                        </Link>
                    </Typography>
                </Box> */}
            </CardContent>
        </Card>
    )
}

export default Login;