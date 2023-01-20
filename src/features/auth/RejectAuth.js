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
import { useCookies } from 'react-cookie'

const RequireAuth = props => {
    const navigate = useNavigate()
    const [cookies] = useCookies(['refreshToken'])

  useEffect(() => {
    console.log(cookies)

    if(cookies){
        navigate('/dashboard', {replace: true})
    }
    
  }, [cookies])


  return (
    <>
        <Outlet />
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