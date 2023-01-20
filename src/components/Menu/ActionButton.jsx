import React from 'react'
import PropTypes from 'prop-types'
import { Box, Fab, Tooltip } from '@mui/material'
import { Add } from '@mui/icons-material'

const ActionButton = props => {
    const { tooltip, onClick } = props
    return (
        <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: 16, right: 16 }}>
            <Tooltip title={tooltip}>
                <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    onClick={onClick}
                >
                    <Add />
                </Fab>
            </Tooltip>

        </Box>

    )
}

ActionButton.propTypes = {
    tooltip: PropTypes.string,
    onClick: PropTypes.func
}

ActionButton.defaultProps = {
    tooltip: 'Insert new data',
    onClick: () => { }
}

export default ActionButton