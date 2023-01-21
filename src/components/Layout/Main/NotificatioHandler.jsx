import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Badge, Chip, Divider, IconButton, ListItemIcon, ListItemText, MenuItem, Paper, Typography } from '@mui/material'
import { Notifications } from '@mui/icons-material'
import MenuAction from '../../Menu/MenuAction'
import { Box, Stack } from '@mui/system'
import { io } from 'socket.io-client'
import API_URL from '../../../config'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/auth/authSlice'
import { useGetQuery } from '../../../features/generalSlice'


const handelNotification = (action, namespace, payload) => {




}








const useUser = (id) => {
    const { data, isLoading } = useGetQuery({ url: `users/${id}` })
    const [user, setUser] = useState({
        name: '',
        username: '',
        avatar: '',
        id: ''
    })

    useEffect(() => {
        if (data) {
            setUser({
                name: data?.user_profile?.name,
                username: data?.username,
                avatar: data?.user_profile?.avatar,
                id: data?.id
            })
        }
    }, [data])


    return { user, isLoading }
}

const roleConvert = (role) => {
    if (role === 'admin' || role === 'peserta') {
        return '/moderators'
    } else {
        return '/users'
    }
}


const NotificationHandler = props => {
    const { role } = props

    const user = useSelector(selectCurrentUser)
    const [notifCount, setNotfiCount] = useState(0)

    const socket = useRef()





    useEffect(() => {
        socket.current = io(API_URL + roleConvert(role))
        socket.current.on('cbt:requestJoin', (data) => {
            setNotfiCount(notifCount + 1)
        })

    }, [])



    return (
        // <IconButton
        //     color='inherit'
        //     aria-label='open-notification'
        //     edge='start'
        // >

        // </IconButton>
        <MenuAction
            sx={{ color: 'white' }}
            icon={<Badge badgeContent={notifCount} color={'secondary'}>
                <Notifications />
            </Badge>}
            tooltip={'Open notifications'}
            title={'user-notifications'}
        >
            <Stack divider={<Divider />}>

                <MenuItem >
                    <Box display={'flex'} alignItems={'center'} gap={2}>
                        <Avatar />
                        <Typography>
                            Test just request token
                        </Typography>
                    </Box>

                </MenuItem>
            </Stack>

        </MenuAction>
    )
}

NotificationHandler.propTypes = {}

export default NotificationHandler