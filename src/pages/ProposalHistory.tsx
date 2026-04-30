import { useState, useEffect } from "react";
import { getProposalHistory, } from "../api/proposalApi";
import type { ProposalHistoryItem } from "../api/proposalApi"
import { Stack, Card, CardContent, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils";

const ProposalHistory = () => {
    const [proposals, setProposals] = useState<ProposalHistoryItem[]>([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProposalHistory();
                setProposals(data);
            } catch (err) {
                setError(err);
            }

        }
        fetchData();
    }, []);

    return (
        <Box sx={{ mx: 3, my: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                History
            </Typography>
            {error ?
                <Alert severity="error">{error}</Alert> :
                null
            }
            <Stack>
                {
                    proposals.map(p => (
                        <Card key={p.id} sx={{ cursor: "pointer", mb: 2 }} onClick={() => navigate(`${p.id}`)}>
                            <CardContent>
                                <Typography>Proposal ID: {p.id}</Typography>
                                <Typography>{p.jobDescription.slice(0, 120)} ...</Typography>
                                <Typography>Created At: {formatDate(p.createdAt)}</Typography>
                            </CardContent>
                        </Card>
                    ))
                }

            </Stack>
        </Box>



    )
}

export default ProposalHistory;