import { AccountCircle } from '@mui/icons-material'
import { Box, Button, Grid, InputAdornment, Modal, Paper, Stack, TextField, Typography } from '@mui/material'

import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import moment from 'moment'
import PropTypes from 'prop-types'

import { LoadingButton } from '@mui/lab'





const CbtEditor = props => {

    const { data, onSave, isLoading, onCancel, variant } = props

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: data?.title || '',
            startDate: data ? moment(data?.startDate).format('YYYY-MM-DDThh:mm') : '',
            endDate: data ? moment(data?.endDate).format('YYYY-MM-DDThh:mm') : '',
            optionCount: data?.optionCount || '',
            duration: data?.duration || '',
            imgUrl: data?.imgUrl || '',
            onCorrectPoint: data?.onCorrectPoint || 0,
            onNullPoint: data?.onNullPoint || 0,
            onWrongPoint: data?.onWrongPoint || 0,
        },
        mode: 'onChange'
    })

    return (
        <Box sx={{ py: 4 }} component={'form'} onSubmit={handleSubmit(onSave)}>



            <Grid container spacing={4} columns={12}>
                <Grid item key={'rules-editor'} xs={12} sm={12} md={6}>
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
                            rules={{ required: 'Please enter option counts!' }}
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






                    </Stack>

                </Grid>
                <Grid item key={'form-editor'} xs={12} sm={12} md={6}>
                    <Stack gap={4}>

                        <Typography variant='h6'>Rules</Typography>
                        <Controller
                            name="onCorrectPoint"
                            control={control}
                            rules={{ required: 'Please enter a value!' }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    id="onCorrectPoint"
                                    variant="outlined"
                                    label="Point on correct answer"
                                    type="number"
                                    fullWidth
                                    error={!!errors.onCorrectPoint}
                                    helperText={errors?.onCorrectPoint?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <Typography>point</Typography>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="onWrongPoint"
                            control={control}
                            rules={{ required: 'Please enter a value!' }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    id="onWrongPoint"
                                    variant="outlined"
                                    label="Point on wrong answer"
                                    type="number"
                                    fullWidth
                                    error={!!errors.onWrongPoint}
                                    helperText={errors?.onWrongPoint?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <Typography>point</Typography>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="onNullPoint"
                            control={control}
                            rules={{ required: 'Please enter a value!' }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    id="onNullPoint"
                                    variant="outlined"
                                    label="Point on empty answer"
                                    type="number"
                                    fullWidth
                                    error={!!errors.onNullPoint}
                                    helperText={errors?.onNullPoint?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <Typography>point</Typography>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Stack>

                </Grid>

                <Grid item key={'form-submit'} xs={12} sm={12} md={12} display={'flex'} justifyContent={'flex-end'} gap={2}>
                    <LoadingButton type='button'
                        onClick={onCancel}
                        loading={isLoading}
                        color={'error'}
                    >
                        Cancel
                    </LoadingButton>

                    <LoadingButton type='submit'

                        loading={isLoading}
                        variant="contained"
                    >
                        {variant}
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}

CbtEditor.propTypes = {
    data: PropTypes.object,
    onSave: PropTypes.func,
    isLoading: PropTypes.bool,
    onCancel: PropTypes.func,
    variant: PropTypes.oneOf(['update', 'new'])
}

export default CbtEditor