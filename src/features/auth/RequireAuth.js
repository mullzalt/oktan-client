import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import LayoutMain from '../../components/Layout/Main/LayoutMain'
import sideBarList from './roleSideBarItem'
import { useGetMeQuery } from '../users/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser, setCredentials } from './authSlice'

import { io } from 'socket.io-client'
import  API_URL  from '../../config';
import { useRef } from 'react';

const RequireAuth = props => {

  const {requiredRoles} = props

  const [role, setRole] = useState()

  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const socket = useRef()

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
      socket.current = io(API_URL)
      dispatch(setCredentials({ ...data, accessToken: token }))
      socket.current.emit('addUser', data.user.id)
      socket.current.on('getUsers', (users) => {
      })
      
      setRole(data.user.roles)

      if(!requiredRoles.includes(data.user.roles)){
        navigate('/login', {replace: true})
      }
    }
    return
  }, [isSuccess, data, token])

  const user = useSelector(selectCurrentUser)

  return (
    <>
      {
        !isError ?
          <LayoutMain lists={sideBarList[role]} user={user} >
            <Outlet />
          </LayoutMain >
          :
          <Navigate to="/dashboard" state={{ from: location }} replace ></Navigate>
      }
    </>


  )
}

RequireAuth.propTypes = {
  requiredRoles: PropTypes.arrayOf(PropTypes.string)
}

RequireAuth.defaultProps = {
  requiredRoles: ['admin', 'peserta', 'panitia']
}

export default RequireAuth