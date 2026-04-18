import { useState, useEffect } from "react";
import { getProposalHistory, } from "../api/proposalApi";
import type { ProposalHistoryItem } from "../api/proposalApi"
import { Stack, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProposalHistory = () => {
    const [proposals, setProposals] = useState<ProposalHistoryItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProposalHistory();
            setProposals(data);
        }
        fetchData();
    }, []);

    return (
        <Box sx={{mx:3}}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                History
            </Typography>
            <Stack>
                {
                    proposals.map(p => (
                        <Card key={p.id} sx={{ cursor: "pointer", mb: 2 }} onClick={() => navigate(`${p.id}`)}>
                            <CardContent>
                                <Typography>{p.jobDescription.slice(0, 120)} ...</Typography>
                                <Typography>Created At: {p.createdAt}</Typography>
                            </CardContent>
                        </Card>
                    ))
                }

            </Stack>
        </Box>



    )
}

export default ProposalHistory;