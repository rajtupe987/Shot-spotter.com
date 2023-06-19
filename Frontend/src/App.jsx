import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/home/Home';
import LoginPage from './Pages/auth/Login';
import RegisterPage from './Pages/auth/Register';
import StudioPage from './Pages/studio/StudioPage';
import InStudio from './Pages/studio/InStudio';
import AccountPage from './Pages/account/Account';
import BookingsPage from './Pages/account/Bookings';
import ShortlistPage from './Pages/account/Shortlist';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/studio/:studio_id" element={<InStudio />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/shortlist" element={<ShortlistPage />} />
      </Routes>
    </Router>
  );
};

export default App;

