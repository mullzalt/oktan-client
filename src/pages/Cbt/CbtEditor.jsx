import { AccountCircle } from '@mui/icons-material'
import { Box, Button, Grid, InputAdornment, Modal, Paper, Stack, TextField, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import moment from 'moment'
import PropTypes from 'prop-types'

import { LoadingButton } from '@mui/lab'
import CbtEditorForm from './form/CbtEditorForm'
import { useGetQuery } from '../../features/generalSlice'
import { useParams } from 'react-router-dom'
import { useUpdateCbtMutation } from '../../features/cbts/cbtSlice'
import { toast } from 'react-toastify'
import ImageForm from '../../components/Files/ImageForm'





const CbtEditor = props => {
    const { id } = useParams()

    const { data, refetch } = useGetQuery({
        url: `cbts/${id}`
    })
    const [file, setFile] = useState(null)


    const [loading, setLoading] = useState(false)

    const [update,
        { isLoading: isUpdating,
            isError: isUpdateError,
            error: updateError,
            isSuccess: isUpdateSuccess
        }] = useUpdateCbtMutation()


    useEffect(() => {
        if (isUpdating) {
            toast.loading('Updating cbt data...', {
                toastId: 'UPDATE TOAST'
            })
            setLoading(true)
        }

        if (isUpdateError) {
            setTimeout(() => {
                toast.update('UPDATE TOAST', {
                    render: `Update error: ${updateError.data?.message}`,
                    type: toast.TYPE.ERROR,
                    autoClose: 2000,
                    closeButton: true,
                    isLoading: false
                })
                setLoading(false)
            }, 1000)
        }

        if (isUpdateSuccess) {
            refetch()
            setTimeout(() => {
                toast.update('UPDATE TOAST', {
                    render: 'Update success',
                    type: toast.TYPE.SUCCESS,
                    autoClose: 2000,
                    closeButton: true,
                    isLoading: false
                })
                setLoading(false)
            }, 1000)
        }
        return () => clearTimeout()
    }, [isUpdateSuccess, isUpdateError, isUpdating])

    const handleFile = (file) => {
        setFile(file)
    }

    const handleUpload = async () => {
        const formData = new FormData
        formData.append('file', file, 'cbt_cover.png')

        await update({ body: formData, id: data.id })
    }

    const handleRemoveImage = async () => {
        await update({ id: data.id, body: { imgUrl: null } })
    }



    const handleUpdateCbt = async (cbtData) => {
        await update({ id: id, body: cbtData })
    }

    return (
        <React.Fragment>

            {
                data &&
                <Box>
                    <Box sx={{ p: 4, mt: 4 }}>
                        <ImageForm
                            title={'Cover Image'}
                            src={data.imgUrl}
                            onDelete={handleRemoveImage}
                            onFileChange={handleFile} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5, }}>
                            <LoadingButton
                                variant='contained'
                                disabled={!Boolean(file)} onClick={handleUpload}
                                loading={loading}
                            >
                                Upload
                            </LoadingButton>
                        </Box>
                    </Box>
                    <CbtEditorForm
                        data={data}
                        onSave={handleUpdateCbt}
                        displayCancel={false}

                    />
                </Box>

            }
        </React.Fragment>


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