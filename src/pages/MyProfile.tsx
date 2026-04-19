import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { ProfileResponse } from '../types';
import { getProfile } from '../api/userApi';
import { formatValue } from '../utils';

type ListItemType = {
  text: string;
  variableName: keyof ProfileResponse;
  type: string
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
    { text: 'Name', variableName: 'name', type: 'text' },
    { text: 'Email', variableName: 'email', type: 'text' },
    { text: 'Email verified?', variableName: 'verified', type: 'boolean' },
    { text: 'Tier', variableName: 'tier', type: 'text' },
    { text: 'Profile Created Date', variableName: 'createdAt', type: 'date' },

  ];

  return (
    <Box sx={{ mx: 3,my:2  }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        My Profile
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            {
              listItems.map(li => (
                <Grid size={6}>
                  <Typography>{li.text}</Typography>
                  <Typography>{formatValue(profile?.[li.variableName],li.type)}</Typography>
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
