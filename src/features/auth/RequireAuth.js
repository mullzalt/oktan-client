import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LayoutMain from '../../components/Layout/Main/LayoutMain'
import sideBarList from './roleSideBarItem'
import { useGetMeQuery } from '../users/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser, setCredentials } from './authSlice'


const RequireAuth = props => {
  const location = useLocation()

  const dispatch = useDispatch()

  const token = useSelector(selectCurrentToken)

  const { data, isLoading, isSuccess, isError } = useGetMeQuery({},
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  )

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials({ ...data, accessToken: token }))
    }
    return
  }, [isSuccess, data, token])

  const user = useSelector(selectCurrentUser)

  return (
    <>
      {
        !isError ?
          <LayoutMain lists={sideBarList['admin']} user={user} >
            <Outlet />
          </LayoutMain >
          :
          <Navigate to="/login" state={{ from: location }} replace ></Navigate>
      }
    </>


  )
}

RequireAuth.propTypes = {}

export default RequireAuth