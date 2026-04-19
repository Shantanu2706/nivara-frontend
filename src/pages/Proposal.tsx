import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProposalHistoryById,ProposalHistoryDetail } from "../api/proposalApi";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { formatDate } from "../utils";

const Proposal = () => {
    const {proposalId} = useParams<string>();
    const [proposalItem,setProposalItem] = useState<ProposalHistoryDetail>();

    useEffect(() => {
        const fetchData = async() => {
            if(proposalId){
                const data = await getProposalHistoryById(proposalId);
                setProposalItem(data);
            }
            
        }
        fetchData();
    },[proposalId])

    return(
        <Box sx={{mx:3,my:2}}>
                <Typography>Job Description: {proposalItem?.jobDescription}</Typography>
                <br/>
                <Typography>Skills: {proposalItem?.skills}</Typography>
                <br/>
                <Typography>Years of Experience: {proposalItem?.yearsOfExperience}</Typography>
                <br/>
                <Typography>Relevant Past Work: {proposalItem?.relevantPastWork}</Typography>
                <br/>
                <Typography>Proposal: {proposalItem?.proposal}</Typography>
                <br/>
                <Typography>Created At: {formatDate(proposalItem?.createdAt)}</Typography>
        </Box>
    )
}

export default Proposal;