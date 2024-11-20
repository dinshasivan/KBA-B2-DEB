import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import 
getuserType from '../utils/auth'

const Authlayout = () => {
    const userType = getuserType();
    if(userType){
        return <Navigate to='/' />
    }
  return <Outlet />
};

export default Authlayout