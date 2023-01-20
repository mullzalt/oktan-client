import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const ConfirmDialog = props => {
    const { onClose, open, children, actions, title } = props

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {actions}
            </DialogActions>
        </Dialog>
    )
}

ConfirmDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    children: PropTypes.node,
    actions: PropTypes.node,
    title: PropTypes.string
}

ConfirmDialog.defaultProps = {
    onClose: () => { },
    open: false
}

export default ConfirmDialog