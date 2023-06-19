import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet, Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './InStudio.css';
import Navbar from '../common/Navbar';
import About from './About';
import Albums from './Albums';
import Packages from './Packages';
import Reviews from './Reviews';

const InStudio = () => {

  const { studioID } = useParams();
  const navigate = useNavigate();
  const [photographer, setPhotographer] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  useEffect(() => {
    // photographer.name
    document.title = { photographer };
  }, []);

  useEffect(() => {
    const baseServerURL = "https://api.example.com";
    const fetchPhotographerData = async () => {
      try {
        const response = await fetch(`${baseServerURL}/studio/${studioID}`);
        const data = await response.json();
        setPhotographer(data);
      } catch (error) {
        console.error('Error fetching photographer data:', error);
      }
    };

    fetchPhotographerData();
  }, [studioID]);

  const handleBook = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://your-api-url/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date1, date2 })
      });

      if (response.ok) {
        // Login successful, navigate to studio page
        alert("Booking Successful");
        navigate('/');
      } else {
        // Login failed, display error message
        const errorData = await response.json();
        setErrorMessage(errorData.msg);
        alert(errorMessage);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('An error occurred during booking. Please try again.');
      alert(errorMessage);
    }

  }

  if (!photographer) {
    return <div id='loading'>Loading...</div>; // Show a loading indicator while fetching the data
  }

  return (
    <div>
      <Navbar />
      <div id="photographer-info" style={{ display: 'flex' }}>
        <div>
          {/* Photographer image */}
          <img src={photographer.image} alt="Photographer" style={{ borderRadius: '50%', width: '150px', height: '150px' }} />
        </div>
        <div>
          {/* Photographer details */}
          <h1>{photographer.name}</h1>
          <p>{photographer.city} - {photographer.address}</p>
          <p>Phone: {photographer.phoneNumber}</p>
          <div>
            {/* Render categories as bubbles */}
            {photographer.categories.map((category, index) => (
              <span key={index} style={{ display: 'inline-block', padding: '5px', margin: '5px', backgroundColor: '#ccc', borderRadius: '5px' }}>{category}</span>
            ))}
          </div>
          <p>
            Rating: {photographer.rating} <span>&#10084;</span>
            Followers: {photographer.followers} <span>&#128172;</span>
            Reviews: {photographer.reviews} <span>&#128172;</span>
          </p>
        </div>
      </div>

      <div className="booking-form-container">
      <form onSubmit={handleBook} className="booking-form">
        <div className="form-group">
          <label htmlFor="startDate" className="form-label">Start Date:</label>
          <input type="date" name="date1" id="date1" onChange={(e) => setDate1(e.target.value)} className="form-input" />
        </div>

        <div className="form-group">
          <label htmlFor="endDate" className="form-label">End Date:</label>
          <input type="date" name="date2" id="date2" onChange={(e) => setDate2(e.target.value)} className="form-input" />
        </div>

        <button type="submit" className="book-button">Book</button>
      </form>
    </div>

      <div id="buttons">
        <Link to={`/studio/${studioID}/about`}>
          <button>About</button>
        </Link>
        <Link to={`/studio/${studioID}/albums`}>
          <button>Albums</button>
        </Link>
        <Link to={`/studio/${studioID}/packages`}>
          <button>Packages</button>
        </Link>
        <Link to={`/studio/${studioID}/reviews`}>
          <button>Reviews</button>
        </Link>
      </div>

      <Routes>
        <Route path="about" element={<About />} />
        <Route path="albums" element={<Albums />} />
        <Route path="packages" element={<Packages />} />
        <Route path="reviews" element={<Reviews />} />
      </Routes>
      <Outlet /> {/* This will render the nested component based on the current route */}
    </div>
  );
};

export default InStudio;
