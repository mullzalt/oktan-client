import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom'

const AvatarLink = props => {
    const { user, ...other } = props
    return (
        <Avatar component={Link} alt={user.name} src={user.avatar} to={'/users/' + user.username} {...other} />
    )
}

AvatarLink.propTypes = {
    user: PropTypes.object
}

export default AvatarLink