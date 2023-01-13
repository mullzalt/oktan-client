import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, Grid, IconButton, Paper, Radio, Stack, Tooltip, Typography } from '@mui/material'
import { Edit, EditOff } from '@mui/icons-material'
import { Box } from '@mui/system'
import TextEditor from '../../components/TextEditor/TextEditor'
import DialogCard from '../../components/Cards/DialogCard'
import { useParams } from 'react-router-dom'
import { grey } from '@mui/material/colors'
import moment, { now } from 'moment'

import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { useGetQuery, useLazyGetQuery } from '../../features/generalSlice'
import ImageForm from '../../components/Files/ImageForm'
import RTE from '../../components/TextEditor/RTE'

const QuestionInputForm = props => {
    const { data, onChange, title, ...other } = props

    const initialState = {
        text: '',
        imgUrl: '',
        file: ''
    }


    const [hideToolbar, sethideToolbar] = useState(true)
    const [hide, setHide] = useState(true)
    const [file, setFile] = useState()
    const [src, setSrc] = useState(data?.imgUrl || null)
    const [text, setText] = useState(data?.text || null)
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
            text: data
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
                            subheader={'Insert text'}
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
                            border: 1,
                            borderColor: grey[700],
                        }}>
                            <RTE
                                onChange={hadleText}
                                hideToolbar={hideToolbar}
                                value={text}
                                placeholder={'write something...'}
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
    const { data, onSubmit } = props
    const optionCount = 5

    const initialValue = {
        text: '',
        file: '',
        imgUrl: '',
        isAnswer: false
    }

    const initialOptions = () => {
        let option = []
        for (let i = 0; i < optionCount; i++) {
            option.push(initialValue)
        }

        return option
    }


    const { control, register, handleSubmit, setValue } = useForm({
        defaultValues: {
            question: initialValue,
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
                            ref={ref}
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
                                        ref={ref}
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

            <Button type="submit">
                Save
            </Button>


        </Stack>
    )
}



const CbtQuestion = props => {
    const { id } = useParams()

    const [openDialog, setOpenDialog] = useState(false)
    const [formData, setFormData] = useState(null)

    const { id: cbtId } = useParams()


    const { data, isLoading, isSuccess } = useGetQuery({
        url: `cbts/${id}/questions`
    })

    // const [post, { isLoading, isSuccess, isError }] = useGeneralPostMutation()

    const handleFormChange = (newData) => {
        setFormData(newData)
    }

    // const handleSave = async () => {
    //     const body = new FormData()

    //     body.append('question', formData['text'])
    //     body.append('file', formData['file'], 'QuestionImage.png')
    //     body.append('imgUrl', formData['imgUrl'])
    //     body.append('destination', `cbt/${cbtId}`)
    //     body.append('cbtId', cbtId)
    //     body.append('filename', moment().format('[QUESTION]YYYY_MM_DD_hh_mm_ss_SSS'))

    //     console.log(body)

    //     const { id } = await post({ model: 'CbtQuestion', body: body }).unwrap()

    //     alert(id)
    //     setOpenDialog(false)
    // }

    return (
        <React.Fragment>
            <Button onClick={(e) => {
                setOpenDialog(true)
            }}>
                OK
            </Button>

            <DialogCard
                aria-labelledby="cbt-quesion-1"
                aria-describedby="cbt-quesion-1"
                open={openDialog}
                onClose={(e) => {
                    setOpenDialog(false)
                }}
                maxWidth={'lg'}
                title={'Insert new Question'}
                fullWidth
                actionButtons={
                    <>
                        {/* <Button color='error' onClick={(e) => {
                            setOpenDialog(false)
                        }}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button> */}
                    </>
                }
            >
                <QuestionInputForm

                />

            </DialogCard>


            <QuestionForm
                onSubmit={(data) => {
                    console.log(data)
                }}
            />

        </React.Fragment>
    )
}

CbtQuestion.propTypes = {

}

export default CbtQuestion