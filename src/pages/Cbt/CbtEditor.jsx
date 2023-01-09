import { AccountCircle } from '@mui/icons-material'
import { Box, Button, Grid, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import moment from 'moment'


import ImageEditor from '../../components/Files/ImageEditor'

import TitleIcon from '@mui/icons-material/Title';
import TransferList from '../../components/Files/TransferList'
import SpeedDialTooltipOpen from '../../components/Menu/SpeedDialAction'
import { LoadingButton } from '@mui/lab'

const cbtData = {
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
}




const CbtEditor = props => {

    const { data, onSave, isLoading } = props

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: data?.title || '',
            startDate: moment(data?.startDate).format('YYYY-MM-DDThh:mm') || '',
            endDate: moment(data?.endDate).format('YYYY-MM-DDThh:mm') || '',
            optionCount: data?.optionCount || '',
            duration: data?.duration || '',
            imgUrl: data?.imgUrl || '',
        },
        mode: 'onChange'
    })

    return (
        <Box sx={{ py: 4 }} component={'form'} onSubmit={handleSubmit(onSave)}>
            <Grid container spacing={4} columns={12}>
                <Grid item key={'image-editor'} sm={12} md={6}>
                    <ImageEditor imageUrl={''} title={'Cover Image'} />
                </Grid>
                <Grid item key={'form-editor'} sm={12} md={6}>
                    <Stack spacing={4}>
                        <Typography variant='h6'>Detail</Typography>

                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: 'Please enter a title' }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    id="title"
                                    variant="outlined"
                                    fullWidth
                                    label="Title"
                                    error={!!errors.title}
                                    helperText={errors?.title?.message}

                                />
                            )}
                        />

                        <Controller
                            name="startDate"
                            control={control}
                            rules={{ required: 'Please enter a Test Begin Date!' }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    id="startDate"
                                    variant="outlined"
                                    label="Test Begin"
                                    type="datetime-local"
                                    fullWidth
                                    error={!!errors.startDate}
                                    helperText={errors?.startDate?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="endDate"
                            control={control}
                            rules={{ required: 'Please enter a Test closed Date!' }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    id="endDate"
                                    variant="outlined"
                                    label="Test Closed"
                                    type="datetime-local"
                                    fullWidth
                                    error={!!errors.endDate}
                                    helperText={errors?.endDate?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="duration"
                            control={control}
                            rules={{ required: 'Please enter duration!' }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    id="duration"
                                    variant="outlined"
                                    label="Duration (Minutes)"
                                    type="number"
                                    fullWidth
                                    error={!!errors.duration}
                                    helperText={errors?.duration?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <Typography>minutes</Typography>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="optionCount"
                            control={control}
                            rules={{ required: 'Please enter optionCount!' }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    id="optionCount"
                                    variant="outlined"
                                    label="Number of options"
                                    type="number"
                                    fullWidth
                                    error={!!errors.optionCount}
                                    helperText={errors?.optionCount?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <Typography>choices</Typography>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />

                        <LoadingButton type='submit'
                            fullWidth
                            loading={isLoading}
                            variant="contained"
                        >
                            Update
                        </LoadingButton>


                    </Stack>

                </Grid>
            </Grid>
        </Box>
    )
}

export default CbtEditor