import React from 'react'
import PropTypes from 'prop-types'
import { Drawer, List, ListItem, Toolbar, Typography } from '@mui/material'
import logo from '../../../assets/img/logo.png'

const SidebarMain = props => {
    const { lists, isOpen, onToogleDrawer, drawerWidth } = props

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                <ListItem button sx={{ p: 2 }}>
                    <img src={logo} alt='mainLogo' style={{ maxWidth: 56 }} />
                    <Typography variant='h6' sx={{ ml: 2, fontWeight: 'bold' }}>
                        OKTAN ITB 2023
                    </Typography>
                </ListItem>

                <List>
                    {lists}
                </List>
            </Drawer>

            <Drawer
                variant="temporary"
                open={isOpen}
                onClose={onToogleDrawer}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                <Toolbar sx={{ p: 2 }}>
                    <img src={logo} alt='mainLogo' style={{ maxWidth: 56 }} />
                    <Typography variant='h6' sx={{ ml: 2, fontWeight: 'bold' }}>
                        OKTAN ITB 2023
                    </Typography>
                </Toolbar>

                <List>
                    {lists}
                </List>
            </Drawer>
        </>

    )
}

SidebarMain.propTypes = {
    lists: PropTypes.node,
    isOpen: PropTypes.bool,
    onToogleDrawer: PropTypes.func,
    drawerWidth: PropTypes.number
}

export default SidebarMain