import { Alert, Box, Button, Card, CardContent, FormControl, FormLabel, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { ProfileResponse } from '../types';
import { getProfile, updateProfile } from '../api/userApi';
import { formatValue } from '../utils';

type ListItemType = {
  text: string;
  variableName: keyof ProfileResponse;
  type: string
};

const MyProfile = () => {
  const [profile, setProfile] = useState<ProfileResponse>();
  const [error, setError] = useState();
  const [skills, setSkills] = useState<string>();
  const [yearsOfExperience, setYearsOfExperience] = useState<number>();
  const [status, setStatus] = useState('NOT_SENT'); // NOT_SENT, SENDING, SENT

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      }

    }
    fetchData();
  }, []);

  const listItems: ListItemType[] = [
    { text: 'Name', variableName: 'name', type: 'text' },
    { text: 'Email', variableName: 'email', type: 'text' },
    { text: 'Tier', variableName: 'tier', type: 'text' },
    { text: 'Profile Created Date', variableName: 'createdAt', type: 'date' },

  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setStatus('SENDING');
      const updatedProfile = await updateProfile({ skills, yearsOfExperience });
      setProfile(updatedProfile);
      setStatus('SENT');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      setStatus('NOT_SENT');
    }

  };

  return (
    <Box sx={{ mx: 3, my: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        My Profile
      </Typography>
      <Card>
        <CardContent>
          {/* <Grid container spacing={2}>
            {
              listItems.map(li => (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography>{li.text}</Typography>
                  <Typography>{formatValue(profile?.[li.variableName], li.type)}</Typography>
                </Grid>
              )
              )
            }
          </Grid> */}
          <Box component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2} >
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <TextField
                    id="name"
                    size="small"
                    name="name"
                    disabled
                    value={profile?.name}
                  />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    id="email"
                    size="small"
                    name="email"
                    value={profile?.email}
                    disabled
                  />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="tier">Tier</FormLabel>
                  <TextField
                    id="tier"
                    size="small"
                    name="tier"
                    value={profile?.tier}
                    disabled
                  />

                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="skills">Skills</FormLabel>
                  <TextField
                    id="skills"
                    name="skills"
                    size="small"
                    value={skills || profile?.skills}
                    onChange={(e) => { setSkills(e.target.value) }}
                    fullWidth />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="yearsOfExperience">Years of Experience</FormLabel>
                  <TextField
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    size="small"
                    value={yearsOfExperience || profile?.yearsOfExperience}
                    type='number'
                    onChange={(e) => { setYearsOfExperience(Number(e.target.value)) }}
                    fullWidth />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="createdAt">Created At</FormLabel>
                  <TextField
                    id="createdAt"
                    name="createdAt"
                    size="small"
                    disabled
                    value={formatValue(profile?.createdAt, 'date')}
                  />
                </FormControl>
                
              </Grid>
              <Grid  size={{ xs: 12, md: 6 }}>
<FormControl fullWidth>
                  <FormLabel htmlFor="updatedAt">Updated At</FormLabel>
                  <TextField
                    id="updatedAt"
                    name="updatedAt"
                    size="small"
                    disabled
                    value={formatValue(profile?.updatedAt, 'date')}
                  />
                </FormControl>
              </Grid>
              
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color='warning'
              disabled={status === 'SENDING'}
              type="submit">
              {status === 'SENDING' ? 'Updating...' : 'Update Profile'}
            </Button>
            {error ?
              <Alert severity="error">{error}</Alert> :
              null
            }
            {status === 'SENT' ?
              <Alert severity="success">Profile updated successfully</Alert> :
              null}


          </Box>
        </CardContent>
      </Card>
    </Box>

  )
}

export default MyProfile;
