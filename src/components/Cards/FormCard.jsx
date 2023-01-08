import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@mui/material'

const FormCard = props => {
    return (
        <Paper sx={{
            p: 4,
            borderRadius: 3
        }}>

        </Paper>
    )
}

FormCard.propTypes = {
    child: PropTypes.node
}

export default FormCard