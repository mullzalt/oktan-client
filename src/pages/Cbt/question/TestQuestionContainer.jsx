import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { Avatar, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, IconButton, Skeleton, Stack, styled, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material'
import { useGetQuery, useLazyGetQuery } from '../../../features/generalSlice'
import moment from 'moment'
import { Delete, Edit, ExpandMoreOutlined } from '@mui/icons-material'
import { green, grey } from '@mui/material/colors'
import AvatarLink from '../../../components/Navigation/AvatarLink'

const StyledToogleButton = styled(ToggleButton)(({ selectedColor }) => ({

    "&.Mui-selected, &.Mui-selected:hover": {
        color: "white",
        backgroundColor: selectedColor
    }
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.5),
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));





const TestQuestionContainer = props => {
    const { data, onChange, answer, selectedId } = props
    const [selected, setSelected] = useState(selectedId || '')
    const [answerData, setAnswerData] = useState({
        optionId: answer?.optionId || '',
        questionId: answer?.questionId || data.id,
    })

    useEffect(() => {
        onChange(answerData)
    }, [answerData])


    const handleSelected = (e, newData) => {
        setSelected(newData)

        if (!newData) {
            setAnswerData({
                ...answerData,
                optionId: '',
            })
        }
        if (newData) {
            setAnswerData({
                ...answerData,
                optionId: newData,
            })
        }
    }


    return (
        <Card>
            <CardContent>
                <Stack sx={{ px: 4, }}>
                    {
                        data.imgUrl &&
                        <Box display={'flex'} justifyContent={'center'} mb={2}>
                            <Box component={'img'} src={data.imgUrl} alt={data.id} sx={{ maxHeight: { xs: 200, sm: 300, md: 350 }, objectFit: 'contain' }} />
                        </Box>
                    }
                    <Box display={'flex'} justifyContent={'center'}>
                        <Typography textAlign={'center'} fontSize={32}>
                            <div dangerouslySetInnerHTML={{ __html: data.question }} />
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>

            <Divider />

            <CardContent sx={{ px: 8 }}>
                <ToggleButtonGroup
                    value={selected}
                    exclusive
                    onChange={handleSelected}
                    aria-label="QuestionOptions"
                    orientation='vertical'
                    fullWidth
                    sx={{ gap: 4 }}
                >

                    {
                        data.options.map(option => {
                            const thisId = option.id
                            return (

                                <StyledToogleButton sx={{ p: 4 }}
                                    value={thisId}
                                    selectedColor={green[300]}
                                    fullWidth


                                >
                                    <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} w={1}
                                    >
                                        {
                                            option.imgUrl &&
                                            <Box display={'flex'} justifyContent={'center'} mb={2}>
                                                <Box component={'img'} src={option.imgUrl} alt={option.id} sx={{ maxHeight: { xs: 100, sm: 200, md: 250 }, objectFit: 'contain' }} />
                                            </Box>
                                        }
                                        <Typography textAlign={'center'}>
                                            <div dangerouslySetInnerHTML={{ __html: option.option }} />
                                        </Typography>
                                    </Box>

                                </StyledToogleButton>

                            )
                        })
                    }

                </ToggleButtonGroup>
            </CardContent>
        </Card>
    )
}

TestQuestionContainer.propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func,
    answer: PropTypes.object,
    selectedId: PropTypes.number
}

TestQuestionContainer.defaultProps = {
    onChange: (id) => { },
    onEdit: (id) => { }
}

export default TestQuestionContainer