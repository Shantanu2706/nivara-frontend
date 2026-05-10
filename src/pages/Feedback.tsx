import { Alert, Box, Button, Card, CardContent, FormControl, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sendFeedback } from '../api/feedbackApi';

const Feedback = () => {
    const [error, setError] = useState();
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('NOT_SENT'); // NOT_SENT, SENDING, SENT

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setStatus('SENDING');
        setError(null);
        try {
            await sendFeedback(message);
            setMessage('');
            setStatus('SENT');
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        } 
    }

    return (
        <Box sx={{ mx: 3, my: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Feedback
            </Typography>
            <Card>
                <CardContent>
                    <Box component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl>
                            <FormLabel htmlFor="message">Write your feedback</FormLabel>
                            <TextField
                                id="message"
                                multiline
                                size="small"
                                minRows={6}
                                name="message"
                                value={message}
                                onChange={(e: any) => setMessage(e.target.value)}
                                fullWidth />
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color='warning'
                            disabled={status === 'SENDING'}
                            type="submit">
                            {status === 'SENDING' ? 'Sending...' : 'Send Feedback'}
                        </Button>
                        {error ?
                            <Alert severity="error">{error}</Alert> :
                            null
                        }
                        {status === 'SENT' ?
                            <Alert severity="success">Feedback sent successfully</Alert> :
                            null}


                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Feedback
