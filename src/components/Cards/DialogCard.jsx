import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const modal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 3,
    rounded: 4,

    pt: 2,
    px: 4,
    pb: 3,
};



const DialogCard = props => {
    const { actionButtons, title, children, open, onClose, ...other } = props
    console.log({ ...other })
    return (
        <Dialog
            open={open}
            onClose={onClose}
            {...other}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                {actionButtons}
            </DialogActions>

        </Dialog>
    )
}

DialogCard.propTypes = {
    actionButtons: PropTypes.node,
    title: PropTypes.string,
    children: PropTypes.node,
    open: PropTypes.bool,
    onClose: PropTypes.func
}

DialogCard.defaultProps = {
    title: 'Enter your title',
}

export default DialogCard