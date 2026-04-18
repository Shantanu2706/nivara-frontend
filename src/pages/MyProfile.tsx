import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { ProfileResponse } from '../types';
import { getProfile } from '../api/userApi';

type ListItemType = {
  text: string;
  variableName: keyof ProfileResponse; // 🔥 important
};

const MyProfile = () => {
  const [profile, setProfile] = useState<ProfileResponse>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProfile();
      setProfile(data);
    }
    fetchData();
  }, []);

  const listItems: ListItemType[] = [
    { text: 'Name', variableName: 'name' },
    { text: 'Email', variableName: 'email' },
    { text: 'Email verified?', variableName: 'verified' },
    { text: 'Tier', variableName: 'tier' },
    { text: 'Profile Created Date', variableName: 'createdAt' },

  ];

  return (
    <Box sx={{ mx: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        My Profile
      </Typography>
      <Card variant="outlined" >
        <CardContent>
          <Grid container spacing={2}>
            {
              listItems.map(li => (
                <Grid size={6}>
                  <Typography>{li.text}</Typography>
                  <Typography>{String(profile?.[li.variableName])}</Typography>
                </Grid>
              )
              )
            }
          </Grid>
        </CardContent>
      </Card>
    </Box>

  )
}

export default MyProfile;
