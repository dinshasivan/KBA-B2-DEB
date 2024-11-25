import React from 'react';
import { createBrowserRouter , Route,  RouterProvider,createRoutesFromElements } from 'react-router-dom';

import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AddBookingPage from './pages/AddBookingPage';

import ViewBookingPage from './pages/ViewBookingPage';
import DisplayBooking from './pages/SearchBooking';
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage';
import MainLayout from './layout/MainLayout';


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        
          <Route element={<MainLayout/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-booking" element={<AddBookingPage />} />
            <Route path="/view-booking" element={<ViewBookingPage/>} />
            <Route path="/display-booking" element={<DisplayBooking/>} />
          </Route>
      </>
    )
  )
  return (
    <RouterProvider router={router}/>
  )
};

export default App;
