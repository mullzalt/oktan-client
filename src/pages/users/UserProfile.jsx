import React from 'react'
import PropTypes from 'prop-types'
import { useGetQuery } from '../../features/generalSlice'
import { useParams } from 'react-router-dom'
import { Avatar, Typography } from '@mui/material'
import Spinner from '../../components/Spinner'
import { Box, Stack } from '@mui/system'
import useDocumentTitle from '../../components/hooks/useDocumentTitle'
import ProfileCard from '../../components/user/ProfileCard'

const UserProfile = props => {
    const { username } = useParams()

    useDocumentTitle('')

    const { data, isLoading } = useGetQuery({
        url: `users/${username}`
    })

    return (
        <React.Fragment>
            <Spinner
                open={isLoading}
            />
            {
                data &&
                <ProfileCard
                    user={data}
                    profile={data.user_profile}
                />
            }

        </React.Fragment>
    )
}

UserProfile.propTypes = {}

export default UserProfile