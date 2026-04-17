import { Box, Card, CardContent, FormControl, FormLabel, TextField, Button, IconButton, Alert, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth.ts";
import { getProposalHistoryCount, streamProposal } from "../api/proposalApi.ts";


const ProposalWizard = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState(0);
    const [relevantPastWork, setRelevantPastWork] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const [proposal, setProposal] = useState('');
    const [totalProposals,setTotalProposals] = useState<number>(0);
    const proposalTextRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            const data = await getProposalHistoryCount();
            setTotalProposals(data);
        }
        fetchData();
    },[]);

    const scrollProposalToBottom = () => {
        if (proposalTextRef.current) {
            const input = proposalTextRef.current.querySelector('textarea');
            if (input) {
                input.scrollTop = input.scrollHeight;
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

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
        } catch (err:any) {
            setError(err.response?.data?.message || err.message);
            setProposal('');
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <Box>
            <Card variant="outlined" sx={{ mx: 40, mt: 10 }}>
                <CardContent>
                    <Button
                        variant='contained'
                        onClick={handleLogout}
                        sx={{ mb: 2 }}
                    >
                        Logout
                    </Button>
                    <Button variant='contained'
                        onClick={() => navigate("/history")}
                        sx={{ ml: 2, mb: 2 }}>
                        Proposal History
                    </Button>
                    {
                        totalProposals == 2 ?
                        <Typography>Please subscribe.</Typography> :
                        <>
                        <Typography>Free proposals left: {2 - totalProposals}</Typography>
                        <Box component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl>
                            <FormLabel htmlFor="jobDescription">Job Description</FormLabel>
                            <TextField
                                id="jobDescription"
                                multiline
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
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                fullWidth />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="yearsOfExperience">Years of Experience</FormLabel>
                            <TextField
                                id="yearsOfExperience"
                                name="yearsOfExperience"
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
                            Generate Proposal
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

export default ProposalWizard;