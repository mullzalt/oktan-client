import { AccountCircle } from '@mui/icons-material'
import { Box, Button, Grid, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import ImageEditor from '../../components/Files/ImageEditor'

import TitleIcon from '@mui/icons-material/Title';
import TransferList from '../../components/Files/TransferList'
import SpeedDialTooltipOpen from '../../components/Menu/SpeedDialAction'

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




const CbtEditor = () => {
    const data = cbtData
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            startDate: new Date(),
            endDate: new Date(),
            optionCount: '',
            rules: {
                onCorrect: '',
                onWrong: '',
                onNull: ''
            },
            duration: '',
            requiredCompetition: [],
            coverImg: ''
        },
        mode: 'onChange'
    })

    const handleCbt = (data) => {
        console.log(data)
    }



    return (
        <Box sx={{ py: 4 }}>
            <form onSubmit={handleSubmit(handleCbt,)}>
                <Grid container spacing={4} columns={12}>
                    <Grid item key={'image-editor'} sm={12} md={6}>
                        <ImageEditor imageUrl={data.imgUrl} title={'Cover Image'} />
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
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment>
                                                    <TitleIcon />
                                                </InputAdornment>
                                            ),
                                        }}
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
                                        label="Test Begin Date and Time"
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
                                        label="Test Closed Date and Time"
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
                                                    <Typography>m</Typography>
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

                            <Button type='submit'>
                                Send
                            </Button>


                        </Stack>

                    </Grid>
                    <Grid item sm={12} md={12}>
                        <Typography variant='h6'>Required Competitions</Typography>
                    </Grid>
                    <Grid item sm={12} md={12}>
                        <TransferList />
                    </Grid>
                </Grid>

                <SpeedDialTooltipOpen />

            </form>
        </Box>
    )
}

export default CbtEditor