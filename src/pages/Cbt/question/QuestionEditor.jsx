import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Box, Stack } from '@mui/system'
import QuestionForm from './QuestionForm'
import { Button, Checkbox, Divider, FormControlLabel, Radio, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

const QuestionEditor = (props) => {
    const { data, onSubmit, onCancel, optionCount } = props
    const initialQuestion = {
        id: data?.id || '',
        question: data?.question || '',
        file: null,
        imgUrl: data?.imgUrl || '',
    }

    const initialOption = {
        option: '',
        file: null,
        imgUrl: '',
        isAnswer: false
    }

    const [selectedOptions, setSelectedOptions] = useState(null)

    const initialOptions = () => {
        let option = []


        if (data?.options) {
            data.options.map(op => {
                option = [...option, Object.assign({}, { isAnswer: op.isAnswer }, { ...op, })]
            })
        } else {
            for (let i = 1; i <= optionCount; i++) {
                option = [...option, Object.assign({}, { id: i, ...initialOption })]
            }
        }

        return option
    }

    const { control, handleSubmit } = useForm({
        defaultValues: {
            question: initialQuestion,
            options: initialOptions()
        },
        mode: 'onChange'
    });
    const { fields, replace, update } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "options", // unique name for your Field Array
    });


    return (
        <Stack gap={4} component={'form'} onSubmit={handleSubmit(onSubmit)} divider={<Divider />}>
            <Box
                sx={{
                    borderRadius: 2,
                    p: 4,
                }}
            >
                <Controller
                    control={control}
                    name="question"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <QuestionForm
                            onChange={onChange}
                            data={value}
                            textAttribute={'question'}
                            title={'Question'}

                        />
                    )}
                />
            </Box>

            <Box display={'flex'} alignItems={'center'} gap={4} px={6}>

                <Typography fontWeight={'bold'}> Options</Typography>

            </Box>


            <Stack gap={2} divider={<Divider />} sx={{ px: 6 }}>
                {
                    fields.map((option, index) => {
                        return (
                            <Box key={option?.id || `index-${index}`}
                                sx={{
                                    borderRadius: 4,
                                    py: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2
                                }}
                            >
                                <Box display={'flex'} alignItems={'center'}>
                                    <Controller
                                        control={control}
                                        name={`options[${index}].isAnswer`}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={value === true}
                                                        onChange={onChange}
                                                    />
                                                }
                                                labelPlacement={'start'}
                                                label="Answer" />
                                        )}
                                    />

                                </Box>
                                <Box flexGrow={1} >
                                    <Controller
                                        control={control}
                                        name={`options[${index}]`}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <QuestionForm
                                                onChange={onChange}
                                                data={value}
                                                textAttribute={'option'}
                                                imageHeight={200}
                                            />
                                        )}
                                    />
                                </Box>
                            </Box>
                        )
                    })
                }
            </Stack>


            <Box sx={{ display: 'flex', width: 1, justifyContent: 'flex-end', gap: 4 }}>
                <Button type="button" color='error' onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" variant='contained'>
                    Save
                </Button>

            </Box>




        </Stack>
    )
}

QuestionEditor.propTypes = {
    onSubmit: PropTypes.func,
    data: PropTypes.object,
    onCancel: PropTypes.func,
    optionCount: PropTypes.number,
}

QuestionEditor.defaultProps = {
    optionCount: 5,
    onSubmit: (e) => { }
}

export default QuestionEditor


