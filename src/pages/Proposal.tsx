import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProposalHistoryById, ProposalHistoryDetail } from "../api/proposalApi";
import { Alert, Box, Card, CardContent, Typography } from "@mui/material";
import { formatDate } from "../utils";

const Proposal = () => {
    const { proposalId } = useParams<string>();
    const [proposalItem, setProposalItem] = useState<ProposalHistoryDetail>();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (proposalId) {
                    const data = await getProposalHistoryById(proposalId);
                    setProposalItem(data);
                }
            } catch (err) {
                setError(err);
            }


        }
        fetchData();
    }, [proposalId])

    return (
        <Box sx={{ mx: 3, my: 2 }}>
            {error ?
                <Alert severity="error">{error}</Alert> :
                null
            }
            <Typography>Job Description: {proposalItem?.jobDescription}</Typography>
            <br />
            <Typography>Relevant Past Work: {proposalItem?.relevantPastWork}</Typography>
            <br />
            <Typography>Proposal: {proposalItem?.proposal}</Typography>
            <br />
            <Typography>Created At: {formatDate(proposalItem?.createdAt)}</Typography>
        </Box>
    )
}

export default Proposal;