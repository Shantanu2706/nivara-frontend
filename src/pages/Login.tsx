import { Box, Card, TextField, CardContent, Button, FormControl, FormLabel, Alert } from "@mui/material"
import { FormEvent, SubmitEventHandler, useState } from "react"
import { login } from "../api/authApi.ts";
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
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box>
            <Card variant="outlined" sx={{ mx: 40, mt: 10 }}>
                <CardContent>
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
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Login;