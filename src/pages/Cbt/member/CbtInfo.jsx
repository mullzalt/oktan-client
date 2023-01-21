import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useGetQuery } from '../../../features/generalSlice'
import { useParams } from 'react-router-dom'
import { Box, Stack } from '@mui/system'
import { grey } from '@mui/material/colors'
import { Button, Chip, Divider, Typography } from '@mui/material'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/auth/authSlice'
import moment from 'moment'
import { io } from 'socket.io-client'
import API_URL from '../../../config'

const CbtInfo = props => {
    const { id } = useParams()
    const [status, setStatus] = useState({
        label: 'Fethcing data...',
        color: 'info'
    })
    const [allowedToJoin, setAllowedToJoin] = useState(false)
    const [joinLabel, setJoinLabel] = useState(null)


    const { data: cbtData } = useGetQuery({ url: `cbts/${id}` })
    const { data: questionData } = useGetQuery({ url: `cbts/${id}/questions` })

    const user = useSelector(selectCurrentUser)

    const { data: memberData } = useGetQuery({ url: `users/${user.id}/cbts/${id}` })


    useEffect(() => {

        if (memberData) {
            setStatus({ label: 'JOINED', color: 'info' })
            setAllowedToJoin(false)
        }

        if (!memberData) {
            setStatus({ label: 'NOT JOINED', color: 'warning' })
            setAllowedToJoin(true)
        }


        if (cbtData) {
            const { startDate, endDate } = cbtData
            const momentNow = moment()

            if (momentNow.isAfter(endDate)) {
                setStatus({ label: 'CLOSED', color: 'error' })
                setAllowedToJoin(false)
            }

            if (momentNow.isBefore(startDate)) {
                setStatus({ label: 'NOT OPEN YET', color: 'info' })
            }


        }


    }, [cbtData, questionData, memberData])


    const handleSendRequest = () => {
        const socket = io(API_URL + '/users')
        socket.emit('cbt:newJoinRequest', { senderId: user.id }, (callback) => {
            console.log(callback)
        })
    }




    return (
        <Box display={'flex'} flexWrap={'wrap'} gap={4} justifyContent={'center'}>
            {cbtData &&
                <>
                    <Box display={'flex'} >
                        <Box
                            component={'img'}
                            src={cbtData.imgUrl}
                            alt={cbtData.imgUrl}
                            sx={{
                                objectFit: 'contain',
                                maxHeight: { xs: 300, sm: 400, md: 500 },
                                border: 1,
                                borderColor: grey[300],
                                borderRadius: 2,
                            }}
                        />
                    </Box>

                    {JSON.stringify(memberData)}


                    <Stack divider={<Divider />} gap={2} sx={{ flexGrow: 1, pr: 6 }}>
                        <Box display={'flex'} gap={2} alignItems={'baseline'} justifyContent={'space-between'}>
                            <Typography variant='h6'>Title</Typography>
                            <Typography fontWeight={'bold'}>{cbtData.title}</Typography>
                        </Box>
                        <Box display={'flex'} gap={2} alignItems={'baseline'} justifyContent={'space-between'}>
                            <Typography fontWeight={'bold'}>Total Questions</Typography>
                            <Typography >{questionData?.totalItems}</Typography>
                        </Box>
                        <Box display={'flex'} gap={2} alignItems={'baseline'} justifyContent={'space-between'}>
                            <Typography fontWeight={'bold'}>Options per Question</Typography>
                            <Typography >{cbtData.optionCount}</Typography>
                        </Box>
                        <Box display={'flex'} gap={2} alignItems={'baseline'} justifyContent={'space-between'}>
                            <Typography fontWeight={'bold'}>Duration</Typography>
                            <Typography >{cbtData.duration} Minutes</Typography>
                        </Box>
                        <Box display={'flex'} gap={2} alignItems={'baseline'} justifyContent={'space-between'}>
                            <Typography fontWeight={'bold'}>Test Open</Typography>
                            <Typography ><Moment local format='dddd, DD MMMM YYYY, hh:mm'>{cbtData.startDate}</Moment></Typography>
                        </Box>
                        <Box display={'flex'} gap={2} alignItems={'baseline'} justifyContent={'space-between'}>
                            <Typography fontWeight={'bold'}>Test Closed</Typography>
                            <Typography ><Moment local format='dddd, DD MMMM YYYY, hh:mm'>{cbtData.endDate}</Moment></Typography>
                        </Box>
                        <Box display={'flex'} gap={2} alignItems={'baseline'} justifyContent={'space-between'}>
                            <Typography fontWeight={'bold'}>Status</Typography>
                            <Typography >
                                {
                                    <Chip size='large' label={status.label} color={status.color} />
                                }

                            </Typography>
                        </Box>
                        {
                            joinLabel &&
                            <Box display={'flex'} gap={2} alignItems={'baseline'} justifyContent={'space-between'}>
                                <Typography fontWeight={'bold'}></Typography>
                                <Typography >{joinLabel}</Typography>
                            </Box>
                        }
                        {
                            allowedToJoin &&
                            <Button fullWidth variant='outlined' onClick={handleSendRequest}>
                                JOIN
                            </Button>
                        }
                    </Stack>
                </>

            }

        </Box>
    )
}

CbtInfo.propTypes = {}

export default CbtInfo