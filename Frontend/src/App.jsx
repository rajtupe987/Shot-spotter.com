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
const baseURL = "https://bright-garb-eel.cyclic.cloud/";
// const baseURL = "http://localhost:4002";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage baseURL={baseURL} />} />
        <Route path="/login" element={<LoginPage baseURL={baseURL} />} />
        <Route path="/register" element={<RegisterPage baseURL={baseURL} />} />
        <Route path="/studio" element={<StudioPage baseURL={baseURL} />} />
        <Route path="/studio/:studio_id" element={<InStudio baseURL={baseURL} />} />
        <Route path="/account" element={<AccountPage baseURL={baseURL} />} />
        <Route path="/bookings" element={<BookingsPage baseURL={baseURL} />} />
        <Route path="/shortlist" element={<ShortlistPage baseURL={baseURL} />} />
      </Routes>
    </Router>
  );
};

export default App;

