import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectCurrentProfile, selectCurrentUser } from '../../features/auth/authSlice'
import ProfileCard from '../../components/user/ProfileCard'
import useDocumentTitle from '../../components/hooks/useDocumentTitle'

const MyProfile = props => {

    const user = useSelector(selectCurrentUser)
    const profile = useSelector(selectCurrentProfile)

    useDocumentTitle('Profile')

    return (
        <React.Fragment>
            <ProfileCard
                user={user}
                profile={profile}
            />

        </React.Fragment>
    )
}

MyProfile.propTypes = {}

export default MyProfile