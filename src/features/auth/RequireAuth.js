import React from 'react'
import PropTypes from 'prop-types'
import { Outlet, useLocation } from 'react-router-dom'
import LayoutMain from '../../components/Layout/Main/LayoutMain'
import sideBarList from './roleSideBarItem'


const RequireAuth = props => {
    const location = useLocation()
    


  return (
    <LayoutMain lists={sideBarList['admin']}>
        <Outlet/>
    </LayoutMain>
  )
}

RequireAuth.propTypes = {}

export default RequireAuth