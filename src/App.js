import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Router } from 'react-router-dom';


import './App.css';
import { useTitle } from './components/hooks/useDocumentTitle';
import LayoutMain from './components/Layout/Main/LayoutMain';
import ScrollTop from './components/ScrollTop';
import RequireAuth from './features/auth/RequireAuth';
import UsersAdminPage from './pages/admin/UsersAdminPage';
import Login from './pages/Auths/Login';
import RegisterPage from './pages/Auths/RegisterPage';
import CbtMain from './pages/Cbt/CbtMain';
import CbtPanel from './pages/Cbt/CbtPanel';
import DashboardMain from './pages/DashboardMain';


function App() {
  return (
    <BrowserRouter>
    <ScrollTop>

    <Routes>

      <Route path='/'>
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<RegisterPage/>} />
      </Route>

      <Route path='/dashboard' element={<RequireAuth/>}>
          <Route index element={<DashboardMain/>} />
      </Route>


      <Route path='/moderator' element={<RequireAuth/>}>
          <Route index element={<DashboardMain/>} />
          <Route path='cbts'>
            <Route index element={<CbtMain/>}/>
            <Route path=':id' element={<CbtPanel/>}/>
          </Route>
      </Route>

      <Route path='/admin' element={<RequireAuth/>}>
          <Route index element={<DashboardMain/>} />
          <Route path='users'>
              <Route index element={<UsersAdminPage/>}/>
              <Route path=':username'/>
          </Route>
      </Route>



    </Routes>

    </ScrollTop>
    </BrowserRouter>
  );
}

export default App;
