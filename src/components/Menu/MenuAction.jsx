import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, Menu, MenuItem, Paper, Tooltip } from '@mui/material'
import { MoreVert } from '@mui/icons-material'

const MenuList = props => {
    const { open, anchorEl, handleClose, children } = props

    return (

        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}

            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            sx={{
                width: 240
            }}
        >
            {children}
        </Menu>

    )

}

const MenuAction = props => {
    const { title, children, icon, tooltip } = props

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <Tooltip title={tooltip}>
                <IconButton aria-label={`${title}-setting`} onClick={handleClick}>
                    {icon ? icon : <MoreVert />}
                </IconButton>
            </Tooltip>

            <MenuList open={open} anchorEl={anchorEl} handleClose={handleClose}>
                {children}
            </MenuList>
        </>

    )
}

MenuAction.propTypes = {
    title: PropTypes.string,
    tooltip: PropTypes.string,
    icon: PropTypes.node,
    children: PropTypes.node

}

MenuList.propTypes = {
    open: PropTypes.bool,
    anchorEl: PropTypes.object,
    handleClose: PropTypes.func,
    children: PropTypes.node
}

export default MenuAction