import { Box, Card, CardContent, FormControl, FormLabel, TextField, Button, Alert, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";


import { streamProposal } from "../api/proposalApi";
import { getCreditsBalance } from "../api/creditsApi";


const Home = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [relevantPastWork, setRelevantPastWork] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const [proposal, setProposal] = useState('');
    const [credits, setCredits] = useState<number>(null);
    const proposalTextRef = useRef<HTMLDivElement | null>(null);

    const fetchData = async () => {
        try{
            const data = await getCreditsBalance();
        setCredits(data.balance);
        }catch(err:any){
            setError(err.response?.data?.message || err.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const scrollProposalToBottom = () => {
        if (proposalTextRef.current) {
            const input = proposalTextRef.current.querySelector('textarea');
            if (input) {
                input.scrollTop = input.scrollHeight;
            }
        }
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsGenerating(true);
        setError('');
        setProposal('');
        try {
            await streamProposal(
                {
                    jobDescription,
                    relevantPastWork,
                },
                {
                    onChunk: (chunk) => {
                        setProposal((prev: string) => {
                            const updated = prev + chunk;
                            requestAnimationFrame(() => scrollProposalToBottom());
                            return updated;
                        });
                    },
                }
            );
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
            setProposal('');
        } finally {
            setIsGenerating(false);
            fetchData();
        }
    }

    return (
        <Box sx={{ mx: 3, my: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Home
            </Typography>
            <Card>
                <CardContent>
                    {
                            <>
                                
                                {credits === 0 ? 
                                <Alert severity="warning" sx={{mb:1}}>You have used all your free proposals. Get 10 more for ₹49. Contact: shantanupimprikar27@gmail.com</Alert> :
                                <Alert severity="info" sx={{mb:1}}>Free proposals left: {credits}</Alert>}
                                
                                
                                <Box component="form"
                                    onSubmit={handleSubmit}
                                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <FormControl>
                                        <FormLabel htmlFor="jobDescription">Job Description</FormLabel>
                                        <TextField
                                            id="jobDescription"
                                            multiline
                                            size="small"
                                            minRows={6}
                                            name="jobDescription"
                                            value={jobDescription}
                                            onChange={(e) => setJobDescription(e.target.value)}
                                            fullWidth />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="relevantPastWork">Relevant Past Work</FormLabel>
                                        <TextField
                                            id="relevantPastWork"
                                            multiline
                                            minRows={3}
                                            size="small"
                                            name="relevantPastWork"
                                            value={relevantPastWork}
                                            onChange={(e) => setRelevantPastWork(e.target.value)}
                                            fullWidth />
                                    </FormControl>
                                    <Alert severity="info" sx={{mb:0}}>
                                    Keep skills and YOE updated in your profile for better proposals. Go to My Profile &gt; Update.
                                </Alert>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color='warning'
                                        disabled={isGenerating || credits === 0}
                                        type="submit">
                                        {isGenerating ? 'Thinking...' : 'Generate Proposal'}
                                    </Button>
                                    {error ?
                                        <Alert severity="error">{error}</Alert> :
                                        null
                                    }
                                    {
                                        proposal &&
                                        <FormControl>
                                            <FormLabel htmlFor="proposal">Proposal</FormLabel>
                                            <TextField
                                                id="proposal"
                                                multiline
                                                minRows={6}
                                                size="small"
                                                name="proposal"
                                                value={proposal}
                                                onChange={(e) => setProposal(e.target.value)}
                                                fullWidth />
                                        </FormControl>
                                    }

                                </Box>
                            </>

                    }

                </CardContent>
            </Card>
        </Box>
    )

}

export default Home;