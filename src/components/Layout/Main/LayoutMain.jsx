import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FooterMain from './FooterMain'
import NavBarMain from './NavBarMain'
import SidebarMain from './SidebarMain'
import { Box } from '@mui/system'
import { CssBaseline, Toolbar } from '@mui/material'

const drawerWidth = 280

const LayoutMain = props => {
    const { children, lists, user } = props
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleDrawerToogle = () => {
        setDrawerOpen(prevState => !prevState)
    }

    const username = user ? user.username : 'NO_USER'

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <NavBarMain username={username} onDrawerToogle={handleDrawerToogle} drawerWidth={drawerWidth} role={user.roles} />
            <Box
                component={'nav'}
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="sidenav"
            >
                <SidebarMain lists={lists} onToogleDrawer={handleDrawerToogle} isOpen={drawerOpen} drawerWidth={drawerWidth} />
            </Box>

            <Box component={'main'}
                sx={{ width: { md: `calc(100% - ${drawerWidth}px)`, sm: 1, xs: 1 } }}
            >
                <Toolbar />
                <Box sx={{ p: 3, marginY: 2, minHeight: '100vh' }}>
                    {children}

                </Box>
                <FooterMain />
            </Box>

        </Box>
    )
}

LayoutMain.propTypes = {
    children: PropTypes.node,
    lists: PropTypes.node,
    user: PropTypes.object
}

export default LayoutMain