import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProposalHistoryById,ProposalHistoryDetail,ProposalHistoryItem } from "../api/proposalApi.ts";
import { Card, CardContent, Typography } from "@mui/material";

const Proposal = () => {
    const {proposalId} = useParams<string>();
    const [proposalItem,setProposalItem] = useState<ProposalHistoryDetail>({});

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
        <Card>
            <CardContent>
                <Typography>Job Description: {proposalItem.jobDescription}</Typography>
                <Typography>Skills: {proposalItem.skills}</Typography>
                <Typography>Years of Experience: {proposalItem.yearsOfExperience}</Typography>
                <Typography>Relevant Past Work: {proposalItem.relevantPastWork}</Typography>
                <br/>
                <Typography>Proposal: {proposalItem.proposal}</Typography>
                <Typography>Created At: {proposalItem.createdAt}</Typography>
            </CardContent>
        </Card>
    )
}

export default Proposal;