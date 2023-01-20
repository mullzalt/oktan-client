import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Card, CardContent, CardHeader, Checkbox, Divider, Fab, FormControlLabel, Grid, IconButton, ListItemIcon, ListItemText, MenuItem, Paper, Radio, Stack, Tooltip, Typography } from '@mui/material'
import { Add, Delete, Edit, EditOff } from '@mui/icons-material'
import { Box } from '@mui/system'
import TextEditor from '../../components/TextEditor/TextEditor'
import DialogCard from '../../components/Cards/DialogCard'
import { useParams } from 'react-router-dom'
import { grey } from '@mui/material/colors'
import moment, { now } from 'moment'

import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { useDeleteMutation, useGetQuery, useLazyGetQuery, usePostMutation } from '../../features/generalSlice'
import ImageForm from '../../components/Files/ImageForm'
import RTE from '../../components/TextEditor/RTE'
import MenuAction from '../../components/Menu/MenuAction'
import { toast } from 'react-toastify'

const QuestionInputForm = props => {
    const { data, onChange, title, textAttribute = 'text', placeholder, id, ...other } = props

    const initialState = {
        [textAttribute]: '',
        imgUrl: '',
        file: ''
    }

    const [hideToolbar, sethideToolbar] = useState(true)
    const [itemId, setItemId] = useState(data?.id || false)
    const [hide, setHide] = useState(true)
    const [file, setFile] = useState()
    const [src, setSrc] = useState(data?.imgUrl || null)
    const [text, setText] = useState(data?.[textAttribute] || null)
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        const formData = form
        onChange(formData)

    }, [form])

    const handleImage = (data) => {
        setFile(data)
        setForm(prev => ({
            ...prev,
            file: data
        }))
    }

    const handleDelete = () => {
        setSrc(null)
        setFile(null)
        setForm(prev => ({
            ...prev,
            file: null,
            imgUrl: ''
        }))
    }

    const handleSrc = (data) => {
        setSrc(data)
    }

    const hadleText = (data) => {
        setText(data)
        setForm(prev => ({
            ...prev,
            [textAttribute]: data
        }))
    }



    return (
        <React.Fragment>
            <Box sx={{
                width: 1
            }}
                {...other}
            >
                <Stack gap={1}>
                    <Box>
                        <Typography >{title}</Typography>
                    </Box>
                    <Box>
                        <ImageForm
                            variant={src ? 'display' : 'button'}
                            onFileChange={handleImage}
                            onSrcChange={handleSrc}
                            onDelete={handleDelete}
                            title={'Image'}
                        />
                    </Box>
                    <Card>
                        <CardHeader
                            action={
                                <Tooltip title={'Show toolbar'}>
                                    <IconButton onMouseDown={(e) => {
                                        sethideToolbar(prev => !prev)
                                    }}>
                                        {hideToolbar ?
                                            <Edit /> :
                                            <EditOff />
                                        }

                                    </IconButton>
                                </Tooltip>

                            }
                        >

                        </CardHeader>
                        <Box sx={{
                            px: 1,
                            borderColor: grey[500],
                        }}>
                            <RTE
                                onChange={hadleText}
                                hideToolbar={hideToolbar}
                                value={text}
                                placeholder={placeholder}
                            />
                        </Box>

                    </Card>
                </Stack>
            </Box>

        </React.Fragment>
    )
}

QuestionInputForm.defaultProps = {
    onChange: (e) => { }
}



const QuestionForm = props => {
    const { data, onSubmit, onCancel, optionCount } = props
    const initialQuestion = {
        question: data?.question || '',
        file: '',
        imgUrl: data?.imgUrl || '',
    }



    const initialOption = {
        option: '',
        file: '',
        imgUrl: '',
        isAnswer: false
    }

    const initialOptions = () => {
        let option = []


        if (data?.options) {
            console.log(data.options)
            data.options.map(op => {
                option.push(op)
            })
        } else {
            for (let i = 0; i < optionCount; i++) {
                option.push(initialOption)
            }
        }

        return option
    }

    console.log(initialQuestion)
    console.log(initialOption)

    const { control, register, handleSubmit, setValue } = useForm({
        defaultValues: {
            question: initialQuestion,
            options: initialOptions()
        },
        mode: 'onChange'
    });
    const { fields, append, prepend, remove, swap, move, insert, update } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "options", // unique name for your Field Array
    });


    return (
        <Stack gap={4} component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    border: 1,
                    borderColor: grey[400],
                    borderRadius: 2,
                    p: 2
                }}
            >
                Question
                <Controller
                    control={control}
                    name="question"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <QuestionInputForm
                            onChange={onChange}
                            data={value}
                            textAttribute={'question'}
                            placeholder={'Write question...'}
                        />
                    )}
                />
            </Box>

            {
                fields.map((option, index) => {
                    return (
                        <Box
                            sx={{
                                border: 1,
                                borderColor: grey[400],
                                borderRadius: 4,
                                p: 2
                            }}
                        >
                            Option - {index + 1}
                            <Controller
                                control={control}
                                name={`options[${index}]`}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <QuestionInputForm
                                        onChange={onChange}
                                        data={value}
                                        textAttribute={'option'}
                                        placeholder={'Write option...'}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name={`options[${index}].isAnswer`}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={value?.isAnswer}
                                                onChange={onChange}
                                            />
                                        }
                                        label="Is answer?" />
                                )}
                            />




                        </Box>
                    )
                })
            }

            <Box sx={{ display: 'flex', width: 1, justifyContent: 'flex-end', gap: 4 }}>
                <Button type="button" color='error' onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">
                    Save
                </Button>

            </Box>




        </Stack>
    )
}

QuestionForm.propTypes = {
    onSubmit: PropTypes.func,
    data: PropTypes.object,
    onCancel: PropTypes.func,
    optionCount: PropTypes.number,
}

QuestionForm.defaultProps = {
    optionCount: 5
}

const QuestionContainer = props => {
    const { id, question, options, imgSrc, index, onEdit, onDelete, data } = props

    const handleEdit = () => {
        onEdit(data)
    }

    const handleDelete = () => {
        onDelete(id)
    }

    return (
        <React.Fragment>
            <Paper sx={{
                p: 2,
                boxShadow: 2,
                border: 2,
                borderColor: grey[500],

                borderRadius: 4
            }}>
                <Stack gap={3}>
                    <Box sx={{ display: 'flex', width: 1, justifyContent: 'flex-end' }}>
                        <MenuAction tooltip={'Open question menu'}>
                            <MenuItem key={`${index}-edit`} onClick={handleEdit}>
                                <ListItemIcon>
                                    <Edit />
                                </ListItemIcon>
                                <Typography variant='inherit' noWrap>
                                    {`Edit`}
                                </Typography>
                            </MenuItem>
                            <Divider />

                            <MenuItem key={`${index}-delete`} onClick={handleDelete}>
                                <ListItemIcon >
                                    <Delete />
                                </ListItemIcon>
                                <ListItemText>
                                    Delete
                                </ListItemText>
                            </MenuItem>
                        </MenuAction>
                    </Box>



                    <Box>
                        {
                            imgSrc &&
                            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                                <Box
                                    component={'img'}
                                    sx={{
                                        width: 1,
                                        maxHeight: 400,
                                        alignSelf: 'center',
                                        objectFit: 'contain',
                                        border: 1,
                                        borderColor: grey['300']
                                    }}
                                    alt="Question"
                                    src={imgSrc}
                                />
                            </Box>

                        }
                        <RTE hideToolbar={true}
                            value={question}
                            readOnly />
                    </Box>

                    <Divider />

                    {options && options.map(option => {
                        return (
                            <Box sx={{ px: 2, border: 1, borderColor: grey[400], borderRadius: 4, mx: 4 }}>
                                {option.imgUrl &&
                                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                                        <Box
                                            component={'img'}
                                            sx={{
                                                width: 1,
                                                maxHeight: 350,
                                                alignSelf: 'center',
                                                objectFit: 'contain',
                                                border: 1,
                                                borderColor: grey['300']
                                            }}
                                            alt="option"
                                            src={option.imgUrl}
                                        />
                                    </Box>
                                }
                                <RTE hideToolbar={true}
                                    value={option.option}
                                    readOnly />
                            </Box>
                        )
                    })}


                </Stack>

            </Paper>
        </React.Fragment>
    )
}

QuestionContainer.propTypes = {
    id: PropTypes.any,
    question: PropTypes.string,
    index: PropTypes.number,
    imgSrc: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
}



const CbtQuestion = props => {

    const { id, optionCount } = props

    const [openDialog, setOpenDialog] = useState(false)
    const [openUpdateDialog, setUpdateDialog] = useState(false)
    const [updateData, setUpdateData] = useState(null)

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')



    const { data, isLoading, isSuccess, refetch, isFetching } = useGetQuery({
        url: `cbts/${id}/questions`
    })

    const [post, { isLoading: postLoading, isSuccess: postSuccess, isError: postError }] = usePostMutation()
    const [deleteQuesion, { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError }] = useDeleteMutation()

    useEffect(() => {
        if (loading) {
            toast.loading(message, {
                toastId: 'POST TOAST'
            })
            setLoading(true)
        }

        if (error) {
            toast.update('POST TOAST', {
                render: message,
                type: toast.TYPE.ERROR,
                autoClose: 2000,
                closeButton: true,
                isLoading: false
            })
        }

        if (success) {
            toast.update('POST TOAST', {
                render: message,
                type: toast.TYPE.SUCCESS,
                autoClose: 2000,
                closeButton: true,
                isLoading: false
            })
            setOpenDialog(false)
            refetch()
        }
    }, [loading, error, success])


    const handleNewQuestion = () => {
        setOpenDialog(true)
    }

    const handlePost = async (data) => {
        setLoading(true)
        setMessage('Creating question...')
        try {
            const form = new FormData()

            const question = data?.question
            for (var key in question) {
                form.append(key, question[key])
            }

            const questionData = await post({ url: `cbts/${id}/questions`, body: form }).unwrap()

            const questionId = questionData.id

            data.options.map(async (option) => {
                const optionForm = new FormData()
                for (var key in option) {
                    optionForm.append(key, option[key])
                }


                await post({ url: `cbts/${id}/questions/${questionId}/options`, body: optionForm }).unwrap()
            })

            setMessage('Question Created')
            setLoading(false)
            setSuccess(true)
        } catch (error) {
            setLoading(false)
            setError(true)
            setMessage(error.message)
        }

    }

    const hadleDelete = async (questionId) => {
        await deleteQuesion({ url: `cbts/${id}/questions/${questionId}` })

        refetch()
    }

    const handleEdit = (data) => {
        setUpdateData(data)
        setUpdateDialog(true)
    }

    return (
        <React.Fragment>

            <DialogCard
                aria-labelledby="cbt-quesion-1"
                aria-describedby="cbt-quesion-1"
                open={openDialog}
                maxWidth={'lg'}
                title={'Insert new Question'}
                fullWidth
            >
                <QuestionForm
                    onCancel={() => setOpenDialog(false)}
                    onSubmit={handlePost}
                    optionCount={optionCount}
                />

            </DialogCard>

            <DialogCard
                aria-labelledby="cbt-quesion-1"
                aria-describedby="cbt-quesion-1"
                open={openUpdateDialog}
                onClose={() => { setUpdateDialog(false) }}
                maxWidth={'lg'}
                title={'Update Question'}
                fullWidth
            >
                <QuestionForm
                    onCancel={() => setUpdateDialog(false)}
                    onSubmit={(data) => console.log(data)}
                    optionCount={optionCount}
                    data={updateData}
                />

            </DialogCard>

            <Stack gap={6}>
                {
                    data &&
                    data.rows.map((row, index) => {
                        return (
                            <QuestionContainer
                                id={row.id}
                                question={row.question}
                                options={row.options}
                                imgSrc={row.imgUrl}
                                index={index}
                                key={row.id}
                                onDelete={hadleDelete}
                                onEdit={handleEdit}
                                data={row}
                            />
                        )
                    })
                }
            </Stack>



            <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: 16, right: 16 }}>
                <Tooltip title={'Crete new question'}>
                    <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        onClick={handleNewQuestion}
                    >
                        <Add />
                    </Fab>
                </Tooltip>

            </Box>




        </React.Fragment>
    )
}

CbtQuestion.propTypes = {
    optionCount: PropTypes.number
}

export default CbtQuestion