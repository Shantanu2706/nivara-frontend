import { Box, Card, TextField, CardContent, Button, FormControl, FormLabel, Alert, Typography, Link } from "@mui/material"
import { useState } from "react"
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

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

    return (
        <Card sx={{ mx: 50, mt: 10 }}>
            <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            id="email"
                            type="email"
                            name="email"
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
                </Box>
            </CardContent>
        </Card>
    )
}

export default Login;