import { Alert, Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { formatDate } from '../utils';
import { useNavigate } from 'react-router-dom';
import { getLedger, LedgerItem } from '../api/ledgerApi';

const Transactions = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState<LedgerItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getLedger();
                setTransactions(data);
            } catch (err) {
                setError(err);
            }

        }
        fetchData();
    }, []);
    return (
        <Box sx={{ mx: 3, my: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Transactions
            </Typography>
            {error ?
                <Alert severity="error">{error}</Alert> :
                null
            }
            <Stack>
                {
                    transactions.map(t => (
                        <Card key={t.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Grid container>
                                    <Grid size={{ xs: 10,md:11 }}>
                                        <Typography>{t.reason}</Typography>
                                        <Typography variant='subtitle2'>{t.type === 'ADD' ? 'Transaction ID:' : 'Proposal ID:'} {t.referenceId || 'NA'}</Typography>
                                        <Typography variant='subtitle2'>Created At: {formatDate(t.createdAt)}</Typography>
                                    </Grid>
                                    <Grid alignContent='center'>
                                        <Typography variant='h4' color={t.type === 'ADD' ? 'success' : 'error'}>{t.type === 'ADD' ? '+' : '-'} {t.amount}</Typography>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    ))
                }

            </Stack>
        </Box>
    )
}

export default Transactions
