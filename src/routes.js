import React, {useEffect } from 'react';

import {
    Routes,
    BrowserRouter,
    Route,
    Navigate,
  } from "react-router-dom";

import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Sva from './pages/svas';
import Telemedicina from './pages/telemedicina';


import PrivateRoute from './utils/privateRoute';

function AllRoutes() {

    const checkRoutes = sessionStorage.getItem("token");

  return (

            <BrowserRouter >
                <Routes >

                  {!checkRoutes && (
                  <Route exact path="/" element={<Login />} />)}

                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/sva" element={<Sva />} />
                  <Route path="/telemedicina" element={<Telemedicina />} />

                    {/* 
                  <Route path="/dashboard" element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute> 
                    } />  */}   

                  <Route path="*" element={<Navigate to ={checkRoutes ? "/dashboard" : "/"} />} />

                </Routes>
            </BrowserRouter>
  )
}

export default AllRoutes;