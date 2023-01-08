import React from 'react'
import PropTypes from 'prop-types'
import { Backdrop, CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

const Spinner = props => {
    const { open } = props

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color='inherit' />
        </Backdrop>
    )
}

Spinner.propTypes = {
    open: PropTypes.bool
}

export default Spinner