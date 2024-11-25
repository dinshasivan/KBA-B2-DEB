import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AddBookingPage from './pages/AddBookingPage';
import Navebar from './components/Navebar';
import ViewBookingPage from './pages/ViewBookingPage';
import DisplayBooking from './pages/DisplayBooking';


const App = () => {
  return (
    <Router>
      <Navebar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-booking" element={<AddBookingPage />} />
        <Route path="/view-booking" element={<ViewBookingPage/>} />
        <Route path="/display-booking" element={<DisplayBooking/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
