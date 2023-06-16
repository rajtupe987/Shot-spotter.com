import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/home/Home';
import LoginPage from './Pages/auth/Login';
import RegisterPage from './Pages/auth/Register';
import StudioPage from './Pages/studio/StudioPage';
import AboutPage from './Pages/studio/StudioAbout';
import AlbumsPage from './Pages/studio/StudioAlbums';
import PackagesPage from './Pages/studio/StudioPackages';
import ReviewsPage from './Pages/studio/StudioReviews';
import AccountPage from './Pages/account/Account';  //review folder nameCase
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
        <Route path="/studio/:studio_id/about" element={<AboutPage />} />
        <Route path="/studio/:studio_id/albums" element={<AlbumsPage />} />
        <Route path="/studio/:studio_id/packages" element={<PackagesPage />} />
        <Route path="/studio/:studio_id/reviews" element={<ReviewsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/shortlist" element={<ShortlistPage />} />
      </Routes>
    </Router>
  );
};

export default App;

