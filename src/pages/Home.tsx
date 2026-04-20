import { Box, Card, CardContent, FormControl, FormLabel, TextField, Button, Alert, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";

import { getProposalHistoryCount, streamProposal } from "../api/proposalApi";


const Home = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState(0);
    const [relevantPastWork, setRelevantPastWork] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const [proposal, setProposal] = useState('');
    const [totalProposals, setTotalProposals] = useState<number>(0);
    const proposalTextRef = useRef<HTMLDivElement | null>(null);

    const fetchData = async () => {
        try{
            const data = await getProposalHistoryCount();
        setTotalProposals(data);
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
                    skills,
                    yearsOfExperience,
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
                        totalProposals === 5 ?
                            <Typography  sx={{mb:1}}>Please subscribe.</Typography> :
                            <>
                                <Typography sx={{mb:1}}>Free proposals left: {5 - totalProposals}</Typography>
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
                                        <FormLabel htmlFor="skills">Skills</FormLabel>
                                        <TextField
                                            id="skills"
                                            name="skills"
                                            size="small"
                                            value={skills}
                                            onChange={(e) => setSkills(e.target.value)}
                                            fullWidth />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="yearsOfExperience">Years of Experience</FormLabel>
                                        <TextField
                                            id="yearsOfExperience"
                                            name="yearsOfExperience"
                                            size="small"
                                            value={yearsOfExperience}
                                            type='number'
                                            onChange={(e) => setYearsOfExperience(Number(e.target.value))}
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
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        disabled={isGenerating}
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