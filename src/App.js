import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './App.css';
import { useTitle } from './components/hooks/useDocumentTitle';
import LayoutMain from './components/Layout/Main/LayoutMain';
import ScrollTop from './components/ScrollTop';
import { selectCurrentProfile, selectCurrentUser } from './features/auth/authSlice';
import RequireAuth from './features/auth/RequireAuth';
import UsersAdminPage from './pages/admin/UsersAdminPage';
import Login from './pages/Auths/Login';
import RegisterPage from './pages/Auths/RegisterPage';
import CbtMain from './pages/Cbt/CbtMain';
import CbtPanel from './pages/Cbt/CbtPanel';
import DashboardMain from './pages/DashboardMain';
import MyProfile from './pages/users/MyProfile';
import UserProfile from './pages/users/UserProfile';



function App() {
  const user = useSelector(selectCurrentUser)
  const profile = useSelector(selectCurrentProfile)

  return (
    <BrowserRouter>
    <ToastContainer/>
    <ScrollTop>
    
    <Routes>
      

      <Route path='/'>
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<RegisterPage/>} />
      </Route>

      <Route path='/dashboard' element={<RequireAuth/>}>
          <Route index element={<DashboardMain/>} />
      </Route>


      <Route path='/moderator' element={<RequireAuth requiredRoles={['admin', 'panitia']}/>}>
          <Route index element={<DashboardMain/>} />
          <Route path='cbts'>
            <Route index element={<CbtMain/>}/>
            <Route path=':id' element={<CbtPanel/>}/>
          </Route>
      </Route>

      <Route path='/admin' element={<RequireAuth requiredRoles={['admin']}/>}>
          <Route index element={<DashboardMain/>} />
          <Route path='users'>
              <Route index element={<UsersAdminPage/>}/>
              <Route path=':username'/>
          </Route>
      </Route>

      <Route path='/users' element={<RequireAuth/>}>
          <Route index element={<MyProfile/>} />
            <Route path=':username' element={<UserProfile/>}/>
      </Route>

      <Route path='/profile' element={<RequireAuth/>}>
          <Route index element={<MyProfile/>} />
      </Route>



    </Routes>

    </ScrollTop>
    </BrowserRouter>
  );
}

export default App;
