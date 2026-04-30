import { Box, Card, CardActionArea, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'

const PremiumPlans = () => {
    return (
        <Box sx={{ mx: 3,my:2  }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Premium Plans
            </Typography>
            <Card sx={{ width: 250 }}>
                <CardActionArea>
                    <CardContent>

                        <Typography variant="h6">Pro</Typography>
                        <Typography variant="h4">₹ 299</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography>Unlimited Proposals for a month</Typography>


                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}

export default PremiumPlans
