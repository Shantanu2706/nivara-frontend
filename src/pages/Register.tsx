import { Alert, Box, Button, Card, CardContent, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authApi.ts";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (password !== confirmPassword) {
                setError("Password does not match!");
                return;
            }
            const data = await register({ email, password, name });
            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card variant="outlined" sx={{ mx: 50, mt: 10 }}>
            <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Register
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControl>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <TextField
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Rohit Sharma"
                            fullWidth />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            placeholder="rohit@email.com"
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
                    <FormControl>
                        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <TextField
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        type="submit"
                    >
                        Register
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Register;