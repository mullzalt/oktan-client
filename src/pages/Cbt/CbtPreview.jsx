import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useGetQuery, useLazyGetQuery } from '../../features/generalSlice'
import TestQuestionContainer from './question/TestQuestionContainer'
import { Button, Divider, Fab, Grid, IconButton, Paper, SwipeableDrawer, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { NavigateBefore, NavigateNext, Navigation, Send } from '@mui/icons-material'

import { green, grey } from '@mui/material/colors'
import API_URL from '../../config'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/auth/authSlice'



const CbtPreview = props => {
    const { cbtId } = props
    const [questions, setQuestions] = useState(null)
    const [state, setState] = useState({
        openDrawer: false,
        currentIndex: 0,
    })
    const [answerData, setAnswerData] = useState([])
    const user = useSelector(selectCurrentUser)

    const [getQuestion] = useLazyGetQuery({ url: `users/${user.id}/cbts/${cbtId}/questions`, params: { size: 999 } })
    const {data: answerDb} = useGetQuery({ url: `users/${user.id}/cbts/${cbtId}/answers`, params: { size: 999 } })

    const socket = useRef()

    useEffect(() => {
    //     if (!localStorage.getItem(cbtId)) {
    //         if (cbtQuestion) {
    //             localStorage.setItem(cbtId, JSON.stringify(cbtQuestion))
    //             const item = JSON.parse(localStorage.getItem(cbtId))
    //             setQuestions(item)

    //         }
    //     }
    }, [])

    useEffect(async() => {

    }, [answerData])

    // useEffect(() => {

    // }, [answerData])

    // useEffect(() => {

    // }, [])





    const toggleDrawer = (open) => (e) => {
        if (
            e &&
            e.type === 'keydown' &&
            (e.key === 'Tab' || e.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, openDrawer: open });
    };

    const handleAnswer = (data, index) => {
        // let ansDatas = answerData

        // let ans = { ...data }

        // ansDatas[index] = ans

        // localStorage.setItem(`${cbtId}-answers`, JSON.stringify(ansDatas))
        // setAnswerData(ansDatas)

        // socket.current.emit('updateCbtAnswer', {
        //     receiverId: user.id, answers: answerData, senderId: user.id
        // }, (callback) => { })


        // socket.current.emit('sendMessage', { receiverId: '123', text: 'asdfasd', senderId: user.id }, (cb) => {
        //     console.log(cb)
        // })
    }

    return (
        <React.Fragment>
            {
                questions &&
                <React.Fragment>
                    <SwipeableDrawer
                        anchor='right'
                        open={state.openDrawer}
                        onClose={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <Box sx={{ px: 4, py: 8, w: 1 }} maxWidth={'sm'} >
                            <ToggleButtonGroup
                                orientation="vertical"
                                value={state.currentIndex}
                                exclusive
                                fullWidth
                                onChange={(e, nextIndex) => {
                                    if (!nextIndex & nextIndex !== 0) {
                                        return
                                    }
                                    setState({ ...state, currentIndex: nextIndex })
                                }}
                            >
                                {Array.from(Array(questions.totalItems), (e, index) => {
                                    return (
                                        <ToggleButton
                                            fullWidth
                                            value={index}
                                            sx={{
                                                backgroundColor: answerData[index]?.optionId ? green[200] : 'inherit',
                                                "&.Mui-selected , &.Mui-selected:hover": {
                                                    backgroundColor: answerData[index]?.optionId ? green[500] : 'inherit',
                                                }
                                            }}
                                        >
                                            {index + 1}
                                        </ToggleButton>
                                    )

                                })}
                            </ToggleButtonGroup>
                        </Box>
                    </SwipeableDrawer>
                    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: '50%', right: 16 }}>
                        <Tooltip title={'Open Question List'}>
                            <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 0, right: 0 }}
                                variant="extended" onClick={toggleDrawer(true)}
                            >
                                <NavigateBefore />
                            </Fab>
                        </Tooltip>

                    </Box>

                    {questions.rows.map((row, index) => {
                        return (
                            <Box display={state.currentIndex === index ? 'block' : 'none'}>
                                <TestQuestionContainer selectedId={answerData[index].optionId} answer={answerData[index]} key={row.id} data={row} onChange={(data) => { handleAnswer(data, index) }} />
                            </Box>

                        )



                    })}

                    <Box width={1} sx={{ display: 'flex', justifyContent: 'center', p: 4, gap: 3 }}>

                        <Button
                            startIcon={<NavigateBefore />}
                            size={'large'}
                            onClick={() => {
                                setState({ ...state, currentIndex: state.currentIndex - 1 })
                            }}
                            disabled={state.currentIndex === 0}
                        >
                            PREV
                        </Button>
                        <Button
                            endIcon={<NavigateNext />}
                            size={'large'}
                            onClick={() => {
                                setState({ ...state, currentIndex: state.currentIndex + 1 })
                            }}
                            disabled={state.currentIndex === questions.totalItems - 1}
                        >
                            NEXT
                        </Button>
                    </Box>

                    <Box width={1} sx={{ display: state.currentIndex === questions.totalItems - 1 ? 'flex' : 'none', justifyContent: 'center', p: 4, gap: 3 }} >
                        <Button
                            startIcon={<Send />}
                            variant={'outlined'}
                            size={'large'}
                            disabled={state.currentIndex === 0}
                            sx={{
                                px: 4,
                                py: 1
                            }}
                        >
                            SUBMIT
                        </Button>
                    </Box>

                </React.Fragment>
            }



        </React.Fragment >
    )
}

CbtPreview.propTypes = {
    cbtId: PropTypes.string
}

export default CbtPreview