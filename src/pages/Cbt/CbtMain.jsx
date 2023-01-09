import { Box, Divider, Grid, ListItem, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect } from 'react'
import CbtCard from '../../components/Cbt/CbtCard'
import useDocumentTitle from '../../components/hooks/useDocumentTitle'
import useFormatDate from '../../components/hooks/useFormatDate'
import Spinner from '../../components/Spinner'
import { useGetCbtsQuery } from '../../features/cbts/cbtSlice'


const cbtData = [
    {
        id: 'adsf-sdflk-1232',
        title: 'FUCK YOU anjing sia bangsat setan',
        startDate: "	2023-07-01 09:55:51",
        endDate: "	2023-09-01 09:55:51",
        duration: 60,
        requireCompetition: [
            { id: 1 },
            { id: 2 },
        ],
        memberCount: 90,
        imgUrl: 'https://img.freepik.com/free-vector/colourful-science-work-concept_23-2148539571.jpg?w=2000'
    },
    {
        id: 'adsf-sfdd-1232',
        title: 'FUCK HER',
        startDate: "	2023-07-01 09:55:51",
        endDate: "	2023-08-01 09:55:51",
        duration: 90,
        requireCompetition: [],
        memberCount: 80,
        imgUrl: 'https://img.freepik.com/free-vector/colourful-science-work-concept_23-2148539571.jpg?w=2000'
    },
]


const CbtMain = () => {
    useDocumentTitle('CBT')
    const formatDate = useFormatDate()

    const { data, isLoading, refetch, isFetching } = useGetCbtsQuery({}, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })


    return (
        <>

            <Spinner open={isLoading || isFetching} />

            <Stack spacing={6}>
                {data &&
                    data.rows.map((row) => {
                        return (
                            <CbtCard key={row.id}
                                id={row.id}
                                title={row.title}
                                subHeader={formatDate(row.startDate)}
                                imgUrl={row.imgUrl}
                            >
                                <Box padding={4}>
                                    <Grid container direction={'row'} padding={1} alignItems={'baseline'}>
                                        <Grid item xs={4}>
                                            <Typography variant='h6'>Title</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant='body' fontWeight={'bold'} fontStyle={'italic'}>{row.title}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider />

                                    <Grid container direction={'row'} padding={1} alignItems={'baseline'}>
                                        <Grid item xs={4}>
                                            <Typography fontWeight={'bold'}>Start Date</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant='body'>{formatDate(row.startDate)}</Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container direction={'row'} padding={1} alignItems={'baseline'}>
                                        <Grid item xs={4}>
                                            <Typography fontWeight={'bold'}>Closed Date</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant='body'>{formatDate(row.endDate)}</Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container direction={'row'} padding={1} alignItems={'baseline'}>
                                        <Grid item xs={4}>
                                            <Typography fontWeight={'bold'}>Duration</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant='body'>{row.duration} Minutes</Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container direction={'row'} padding={1} alignItems={'baseline'}>
                                        <Grid item xs={4}>
                                            <Typography fontWeight={'bold'}>Options</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant='body'>{row.optionCount} options</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>

                            </CbtCard>
                        )
                    })
                }
            </Stack>

        </>
    )
}

export default CbtMain