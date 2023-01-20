import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Card, CardHeader, CardMedia, Dialog, Paper, Typography } from '@mui/material'
import ImageForm from '../../../components/Files/ImageForm'
import RTE from '../../../components/TextEditor/RTE'
import TextEditor from '../../../components/TextEditor/TextEditor'
import { grey } from '@mui/material/colors'
import { Stack } from '@mui/system'

const QuestionForm = props => {
    const { actionButtons, title, children, textAttribute, onChange, data, imageHeight, ...other } = props

    const initialState = {
        id: data?.id || '',
        [textAttribute]: data ? data[textAttribute] : '',
        file: data?.file || null,
        imgUrl: data?.imgUrl || '',
        isAnswer: data?.isAnswer || false
    }

    const [imgSrc, setImgSrc] = useState(initialState.imgUrl)
    const [file, setFile] = useState(initialState.file)
    const [text, setText] = useState(initialState[textAttribute])
    const [form, setForm] = useState(initialState)


    useEffect(() => {
        onChange(form)
    }, [form])

    const handleSrc = (data) => {
        setImgSrc(data)
        setForm(prev => ({
            ...prev, imgSrc: data
        }))
    }

    const handleFile = (data) => {
        setFile(file)
        setForm(prev => ({
            ...prev, file: data
        }))
    }

    const handleRemove = () => {
        setImgSrc(null)
        setFile(null)
        setForm(prev => ({
            ...prev, file: null, imgSrc: null, removedImage: true
        }))
    }

    const handleText = (data) => {
        setText(data)
        setForm(prev => ({
            ...prev, [textAttribute]: data
        }))
    }

    return (
        <Stack>
            <Typography variant='h6'>{title}</Typography>
            <Box display={'flex'} alignItems={'baseline'} width={1}>
                <Box flexGrow={1}>
                    <TextEditor
                        onChange={handleText}
                        value={text}
                    />
                </Box>
                <Box>
                    {!imgSrc &&
                        <ImageForm
                            variant={'button'}
                            onFileChange={handleFile}
                            onSrcChange={handleSrc}
                            onDelete={handleRemove}
                            title={'Image'}
                            src={imgSrc}
                        />

                    }

                </Box>
            </Box>

            <Box display={'flex'} justifyContent={'center'} width={1}>
                {imgSrc &&

                    <ImageForm
                        variant={'display'}
                        onFileChange={handleFile}
                        onSrcChange={handleSrc}
                        onDelete={handleRemove}
                        title={''}
                        src={imgSrc}
                        maxHeight={imageHeight}
                    />

                }

            </Box>



        </Stack>
    )
}

QuestionForm.propTypes = {
    title: PropTypes.string,
    onChange: PropTypes.func,
    textAttribute: PropTypes.string,
    data: PropTypes.object,
    imageHeight: PropTypes.number
}

QuestionForm.defaultProps = {
    textAttribute: 'text',
    onChange: () => { },
}

export default QuestionForm