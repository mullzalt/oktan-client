import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { grey } from '@mui/material/colors'

const ProfileCard = props => {
    const { user, profile } = props


    return (
        <Paper sx={{
            py: 8,
            boxShadow: 3,
            borderRadius: 4
        }}>
            <Stack gap={2}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 1
                }}>
                    <Avatar sx={{ height: { md: 250, sm: 200, xs: 150 }, width: { md: 250, sm: 200, xs: 150 } }}></Avatar>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Typography variant='h4' fontStyle={'italic'}>
                        {user.username}
                    </Typography>
                </Box>

                <Box sx={{ px: { xs: 1, sm: 6, md: 10, lg: 60 }, py: 2 }}>
                    <Stack gap={2} divider={<Divider />} sx={{ border: { xs: 0, md: 1 }, p: 2, borderColor: grey[400], borderRadius: 2 }}>
                        <Grid
                            container
                            alignItems={'baseline'}
                            columnGap={4}
                        >
                            <Grid item >
                                <Typography variant='h6'>
                                    Name
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography>
                                    {profile.name}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            alignItems={'baseline'}
                            columnGap={4}
                        >
                            <Grid item >
                                <Typography variant='h6'>
                                    Email
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography>
                                    {user.email}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            alignItems={'baseline'}
                            columnGap={4}
                        >
                            <Grid item >
                                <Typography variant='h6'>
                                    Institute
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography>
                                    {profile.institute}
                                </Typography>
                            </Grid>
                        </Grid>




                    </Stack>
                </Box>


            </Stack>
        </Paper>

    )
}

ProfileCard.propTypes = {
    user: PropTypes.object,
    profile: PropTypes.object
}

export default ProfileCard