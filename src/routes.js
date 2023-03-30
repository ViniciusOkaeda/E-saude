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


import PrivateRoute from './utils/privateRoute';

function AllRoutes() {

    const checkRoutes = sessionStorage.getItem("token");

  return (

            <BrowserRouter >
                <Routes >

                  {!checkRoutes && (
                  <Route exact path="/" element={<Login />} />)}

                  <Route path="/produtodigital" element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute> 
                    } />     
                  <Route path="/sva" element={
                        <PrivateRoute>
                          <Sva />
                        </PrivateRoute> 
                    } />    

                  <Route path="*" element={<Navigate to ={checkRoutes ? "/dashboard" : "/"} />} />

                </Routes>
            </BrowserRouter>
  )
}

export default AllRoutes;