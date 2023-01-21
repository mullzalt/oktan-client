import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Avatar, IconButton, MenuItem, Toolbar, Tooltip, Typography, Menu, ListItemIcon, ListItemText, Divider } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Box } from '@mui/system'
import MenuAction from '../../Menu/MenuAction'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'
import { destroyCredentials } from '../../../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import NotificationHandler from './NotificatioHandler'

const NavBarMain = props => {
    const { username, userAvatarUrl, onDrawerToogle, drawerWidth, title, role } = props
    const nameInitial = username.slice(0, 1).toUpperCase()

    const [anchorElUser, setAnchorElUser] = useState(null);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const [cookies, removeCookies] = useCookies(['refreshToken'])

    const handleLogout = () => {
        console.log(cookies)
        dispatch(destroyCredentials())
        removeCookies()
        navigate('/login', { replace: true })
    }

    return (
        <AppBar
            position='fixed'
            sx={{
                py: 1,
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
            }}

        >
            <Toolbar>

                <IconButton
                    color='inherit'
                    aria-label='open-drawer'
                    edge='start'
                    onClick={onDrawerToogle}
                    sx={{ mr: 2, display: { md: 'none' }, flexGrow: 0 }}
                >
                    <MenuIcon />
                </IconButton>

                <Box sx={{ flexGrow: 0 }}>
                    <Toolbar>
                        <Typography variant='h6'>{ }</Typography>
                    </Toolbar>
                </Box>
                <Box sx={{ flexGrow: 1 }}>

                </Box>


                <Box sx={{ flexGrow: 0, display: 'flex', gap: 2 }}>
                    <NotificationHandler role={role} />
                    <MenuAction
                        icon={<Avatar alt={username} src={userAvatarUrl}>{nameInitial}</Avatar >}
                        tooltip={'Open user setting'}
                        title={'user-setting'}
                    >
                        <MenuItem onClick={() => { navigate('/profile') }}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Profile
                            </ListItemText>
                        </MenuItem>
                        <MenuItem >
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Account
                            </ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout} >
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText >
                                Logout
                            </ListItemText>
                        </MenuItem>

                    </MenuAction>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

NavBarMain.propTypes = {
    username: PropTypes.string,
    userAvatarUrl: PropTypes.string,
    onDrawerToogle: PropTypes.func,
    drawerWidth: PropTypes.number,
    title: PropTypes.string,
    role: PropTypes.string
}

export default NavBarMain