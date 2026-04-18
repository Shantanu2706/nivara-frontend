import { useState, useEffect } from "react";
import { getProposalHistory,  } from "../api/proposalApi";
import type {ProposalHistoryItem} from "../api/proposalApi"
import { Stack, Card, CardContent } from "@mui/material";
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

        <Stack>
            {
                proposals.map(p => (
                    <Card key={p.id} sx={{cursor: "pointer"}}onClick={() => navigate(`${p.id}`)}>
                        <CardContent>
                            {p.createdAt}
                        </CardContent>
                    </Card>
                ))
            }

        </Stack>


    )
}

export default ProposalHistory;