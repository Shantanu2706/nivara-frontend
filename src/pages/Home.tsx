import { Box, Card, CardContent, FormControl, Grid, FormLabel, TextField, Button, Alert, Typography, ToggleButtonGroup, ToggleButton, InputLabel, Select, MenuItem, Slider, InputAdornment, OutlinedInput } from "@mui/material";
import { useState, useRef, useEffect } from "react";


import { streamProposal } from "../api/proposalApi";
import { getCreditsBalance } from "../api/creditsApi";


const Home = () => {
    const [transaction, setTransaction] = useState('rent');
    const [relevantPastWork, setRelevantPastWork] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const [proposal, setProposal] = useState('');
    const [credits, setCredits] = useState<number>(null);
    const proposalTextRef = useRef<HTMLDivElement | null>(null);
    const [value, setValue] = useState<number[]>([2000, 3700]);

    const handleChange = (event: Event, newValue: number[]) => {
        setValue(newValue);
    };

    const fetchData = async () => {
        try {
            const data = await getCreditsBalance();
            setCredits(data.balance);
        } catch (err: any) {
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
            // await streamProposal(
            //     {
            //         // transaction,
            //         relevantPastWork,
            //     },
            //     {
            //         onChunk: (chunk) => {
            //             setProposal((prev: string) => {
            //                 const updated = prev + chunk;
            //                 requestAnimationFrame(() => scrollProposalToBottom());
            //                 return updated;
            //             });
            //         },
            //     }
            // );
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
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                Find your next home with someone who has done this for 13 years.
            </Typography>
            <Card>
                <CardContent>
                    <>
                        <Grid container component="form"
                            onSubmit={handleSubmit}
                            gap={2}
                        >
                            <Grid size={{ xs: 6, md:2, lg: 1.5 }}>
                                <ToggleButtonGroup
                                    value={transaction}
                                    size="large"
                                    onChange={(e, newValue) => setTransaction(newValue)}
                                    exclusive
                                >
                                    <ToggleButton value="buy">
                                        Buy
                                    </ToggleButton>
                                    <ToggleButton value="rent">
                                        Rent
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid size={{ xs: 12, md: 3, lg: 2 }}>
                                <FormControl fullWidth>
                                    <FormLabel htmlFor="location">Location</FormLabel>
                                    <Select
                                        id="location"
                                        // value={age}
                                        size="small"
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Pimple Saudagar</MenuItem>
                                        <MenuItem value={20}>Rahatani</MenuItem>
                                        <MenuItem value={30}>Baner</MenuItem>
                                        <MenuItem value={40}>Aundh</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, md: 3, lg: 2 }}>
                                <FormControl fullWidth>
                                    <FormLabel htmlFor="property-type">Property Type</FormLabel>
                                    <Select
                                        id="property-type"
                                        // value={age}
                                        label="Property Type"
                                        size="small"
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value={10}>1 BHK</MenuItem>
                                        <MenuItem value={20}>2 BHK</MenuItem>
                                        <MenuItem value={30}>3 BHK</MenuItem>
                                        <MenuItem value={40}>4 BHK</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container size={{ xs: 12, md:8,lg: 4 }} gap={2}>
                                    <Grid size={{ xs: 12, md: 5.5 }}>
                                        <FormControl fullWidth>
                                            <FormLabel htmlFor="minBudget">Minimum Budget</FormLabel>
                                            <Select
                                                id="minBudget"
                                                // value={age}
                                                label="Minimum Budget"
                                                size="small"
                                            // onChange={handleChange}
                                            >
                                                <MenuItem value={10}>20,000</MenuItem>
                                                <MenuItem value={20}>30,000</MenuItem>
                                                <MenuItem value={30}>40,000</MenuItem>
                                                <MenuItem value={40}>50,000</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 5.5 }}>
                                        <FormControl fullWidth>
                                            <FormLabel htmlFor="maxBudget">Maximum Budget</FormLabel>
                                            <Select
                                                id="maxBudget"
                                                // value={age}
                                                label="Maximum Budget"
                                                size="small"
                                            // onChange={handleChange}
                                            >
                                                <MenuItem value={10}>20,000</MenuItem>
                                                <MenuItem value={20}>30,000</MenuItem>
                                                <MenuItem value={30}>40,000</MenuItem>
                                                <MenuItem value={40}>50,000</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                            </Grid>
                            <Grid size={{ xs: 12, md:3,lg: 1 }}>
                                <FormLabel htmlFor="search">&nbsp;</FormLabel>
                                <Button
                                id="search"
                                    fullWidth
                                    variant="contained"
                                    color='warning'
                                    disabled={isGenerating || credits === 0}
                                    type="submit">
                                    Search
                                </Button>
                            </Grid>




                        </Grid>
                    </>


                </CardContent>
            </Card>
        </Box>
    )

}

export default Home;