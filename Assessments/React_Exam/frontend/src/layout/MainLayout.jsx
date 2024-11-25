import React from 'react'
import Navebar from '../components/Navebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
        <Navebar/>
        <Outlet/>
    </>
  )
}

export default MainLayout