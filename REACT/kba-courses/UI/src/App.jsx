import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
}from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Authlayout from './layouts/Authlayout'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Contact from './pages/Contact'
import AddCourse from './pages/AddCourse'
import UpdateCourse from './pages/UpdateCourse'
import CoursePage,{courseLoader} from './pages/CoursePage'
import NotFound from './pages/NotFound'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      {/*Piblic Routes*/}
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      {/*Protected Routes*/}
      <Route element={<Authlayout/>}>
        <Route element={<MainLayout/>}>
        <Route path='/home' element={<Home/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/add-course' element={<AddCourse/>}/>

        <Route path='/edit-course/:id' element={<UpdateCourse/>} loader={courseLoader}/>

        <Route path='/course/:id' element={<CoursePage/>} loader={courseLoader} />
      </Route>
      </Route>
      {/* Notfound */}
      <Route path='#' element={<NotFound/>}/>

      </>
    )
  )
  return (
   <RouterProvider router={router} />
  )
}

export default App