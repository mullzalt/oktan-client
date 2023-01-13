import { Box, Divider, Fab, Grid, ListItem, Modal, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../../components/hooks/useDocumentTitle'
import useFormatDate from '../../components/hooks/useFormatDate'
import Spinner from '../../components/Spinner'
import { useCreateeCbtMutation, useGetCbtsQuery } from '../../features/cbts/cbtSlice'

import CbtCard from '../../components/cbt/CbtCard'
import { Add } from '@mui/icons-material'
import CbtEditor from './CbtEditor'
import GridCell from '../../components/Tables/GridCell'
import moment from 'moment'
import Moment from 'react-moment'
import 'moment/locale/id'
import MenuTab, { TabPanel } from '../../components/Tabs/MenuTab'
import { toast } from 'react-toastify'


const CbtMain = () => {
    useDocumentTitle('CBT')
    const formatDate = useFormatDate()

    const [create, setCreate] = useState(0)
    const [loading, setLoading] = useState(false)

    const { data, isLoading, refetch, isFetching } = useGetCbtsQuery({}, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })

    const [insert,
        { isLoading: isinserting,
            isError: isInsertError,
            error: InsertError,
            isSuccess: isInsertSuccess
        }] = useCreateeCbtMutation()

    useEffect(() => {
        if (isinserting) {
            toast.loading('Creating new cbt...', {
                toastId: 'CREATE TOAST'
            })
            setLoading(true)
        }

        if (isInsertError) {
            setTimeout(() => {
                toast.update('CREATE TOAST', {
                    render: InsertError.data.message,
                    type: toast.TYPE.ERROR,
                    autoClose: 2000,
                    closeButton: true,
                    isLoading: false
                })
                setLoading(false)
            }, 1000)
        }

        if (isInsertSuccess) {
            setTimeout(() => {
                toast.update('CREATE TOAST', {
                    render: 'Creating done',
                    type: toast.TYPE.SUCCESS,
                    autoClose: 2000,
                    closeButton: true,
                    isLoading: false
                })
                refetch()
                setLoading(false)
                setCreate(0)
            }, 1000)
        }
        return () => clearTimeout()
    }, [isInsertSuccess, isInsertError, isinserting])

    const handleCreate = async (data) => {
        await insert({ body: data })
    }


    return (
        <>



            <Spinner open={isLoading || isFetching} />


            <TabPanel value={create} index={0}>
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
                                                <Typography variant='body'><Moment local format='Do MMMM YYYY, hh:mm '>{row.startDate}</Moment></Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction={'row'} padding={1} alignItems={'baseline'}>
                                            <Grid item xs={4}>
                                                <Typography fontWeight={'bold'}>Closed Date</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant='body'>
                                                    <Moment local format='Do MMMM YYYY, hh:mm '>
                                                        {row.endDate}
                                                    </Moment>
                                                </Typography>
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

                                        <Grid container direction={'row'} padding={1} alignItems={'baseline'}>
                                            <Grid item xs={4}>

                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant='body' fontStyle={'italic'} fontSize={24}>
                                                    <Moment local fromNow>
                                                        {row.startDate}
                                                    </Moment>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                </CbtCard>
                            )
                        })
                    }
                </Stack>

                <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: 16, right: 16 }}>
                    <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        onClick={(e) => {
                            setCreate(1)
                        }}
                    >
                        <Add />
                    </Fab>
                </Box>
            </TabPanel>

            <TabPanel value={create} index={1}>
                <CbtEditor variant={'new'}
                    onCancel={(e) => {
                        setCreate(0)
                    }}
                    onSave={handleCreate}
                    isLoading={loading}
                />
            </TabPanel>


        </>
    )
}

export default CbtMain