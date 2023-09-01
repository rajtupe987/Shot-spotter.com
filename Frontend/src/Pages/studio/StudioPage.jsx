import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import './StudioPage.css';

const StudioPage = ({ baseURL }) => {

  const [showFilterBox, setShowFilterBox] = useState(false);

  const toggleFilterBox = () => {
    setShowFilterBox(!showFilterBox);
  };

  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Studios';
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, []);

  const categoriesList = ["Weddings", "Babies&Kids", "Travel", "Fashion", "Portfolio", "Commercial", "Birthdays"];

  const locationsList = ["Delhi", "Mumbai", "Nagpur", "Kerala", "Punjab", "Pune", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Chandigarh", "Jaipur", "Ahmedabad", "Lucknow", "Bhopal", "Guwahati", "Kochi"];

  const [photographers, setPhotographers] = useState([]);
  const [page, setPage] = useState(1);
  const [tpage, setTPage] = useState(0);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Function to handle clicking on page numbers
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  // Function to handle clicking on "Prev" button
  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Function to handle clicking on "Next" button
  const handleNextClick = () => {
    if (page < tpage) {
      setPage(page + 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= tpage; i++) {
    pageNumbers.push(i);
  }

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
  };

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
  };

  const handlePriceChange = (event) => {
    const selectedValue = event.target.value;
    const [min, max] = selectedValue.split('-');
    setMinPrice(min);
    setMaxPrice(max);
  };

  useEffect(() => {

    const token = localStorage.getItem('token');
    let url = `${baseURL}/studio?page=${page}`;
    if (location !== "") url += `&location=${location}`;
    if (category !== "") url += `&category=${category}`;
    if (minPrice !== "" && maxPrice !== "") url += `&min=${+minPrice}&max=${+maxPrice}`;
    console.log(url);
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token// Include the token in the Authorization header
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setPhotographers(data.photographers);
        setTPage(data.t_pages);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [page, location, category, minPrice, maxPrice]);

  const handleCardClick = (studioID) => {
    navigate(`/studio/${studioID}`);
  };

  return (
    <div>
      <Navbar />
      <div className={`filter-box2`}>
        {/* Category filter */}
        <div className="filter-section2">
          <select
            name="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location filter */}
        <div className="filter-section2">
          <select
            name="location"
            value={location}
            onChange={handleLocationChange}
          >
            <option value="">Select a location</option>
            {locationsList.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Price filter */}
        <div className="filter-section2">
          <select
            name="price"
            value={`${minPrice}-${maxPrice}`}
            onChange={handlePriceChange}
          >
            <option value="0-0">Select a price range</option>
            <option value="0-5000">Below ₹5,000</option>
            <option value="5000-15000">₹5,000 - ₹15,000</option>
            <option value="15000-35000">₹15,000 - ₹35,000</option>
            <option value="35000-50000">₹35,000 - ₹50,000</option>
            <option value="50000-70000">₹50,000 - ₹70,000</option>
          </select>
        </div>
      </div>

      <div id='container'>
        <div className={`filter-box ${showFilterBox ? 'show' : ''}`}>
          {/* Category filter */}
          <div className="filter-section">
            <h3>Categories</h3>
            {categoriesList.map((cat) => (
              <label key={cat} style={{ display: 'block' }}>
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={handleCategoryChange}
                />
                {cat}
              </label>
            ))}
          </div>

          <hr />

          {/* Location filter */}
          <div className="filter-section">
            <h3>Locations</h3>
            {locationsList.map((loc) => (
              <label key={loc} style={{ display: 'block' }}>
                <input
                  type="radio"
                  name="location"
                  value={loc}
                  checked={location === loc}
                  onChange={handleLocationChange}
                />
                {loc}
              </label>
            ))}
          </div>

          <hr />

          {/* Price filter */}
          <div className="filter-section">
            <h3>Price Range</h3>
            <label style={{ display: 'block' }}>
              <input
                type="radio"
                name="price"
                value="0-5000"
                onChange={handlePriceChange}
                checked={minPrice === '0' && maxPrice === '5000'}
              />
              Below ₹5,000
            </label>

            <label style={{ display: 'block' }}>
              <input
                type="radio"
                name="price"
                value="5000-15000"
                onChange={handlePriceChange}
                checked={minPrice === '5000' && maxPrice === '15000'}
              />
              ₹5,000 - ₹15,000
            </label>

            <label style={{ display: 'block' }}>
              <input
                type="radio"
                name="price"
                value="15000-35000"
                onChange={handlePriceChange}
                checked={minPrice === '15000' && maxPrice === '35000'}
              />
              ₹15,000 - ₹35,000
            </label>

            <label style={{ display: 'block' }}>
              <input
                type="radio"
                name="price"
                value="35000-50000"
                onChange={handlePriceChange}
                checked={minPrice === '35000' && maxPrice === '50000'}
              />
              ₹35,000 - ₹50,000
            </label>

            <label style={{ display: 'block' }}>
              <input
                type="radio"
                name="price"
                value="50000-70000"
                onChange={handlePriceChange}
                checked={minPrice === '50000' && maxPrice === '70000'}
              />
              ₹50,000 - ₹70,000
            </label>
          </div>

        </div>

        <div>
          {/* Studio Listed */}
          <div className="photographers-list">
            {photographers.map((photographer) => (
              <div
                key={photographer._id}
                className="card"
                onClick={() => handleCardClick(photographer._id)}
              >
                <div className="card-header">
                  <div className="studio-info">
                    <img src={photographer.image} alt="Photographer" className="studio-img" />
                    <div className="studio-details">
                      <h3>{photographer.profile}</h3>
                      <div className="locations">
                        {photographer.location.map((loc, ind) => (
                          <span className="loc-bubble" key={ind}>{loc}</span>
                        ))}
                      </div>
                      <div className="categories">
                        {photographer.expertise.map((category, ind) => (
                          <span className="category-bubble" key={ind}>{category}</span>
                        ))}
                      </div>
                      <p className="price-info">Starts from: ₹{photographer.price}</p>
                    </div>
                  </div>
                </div>
                <div className="image-container">

                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {tpage > 0 && (
            <div id="pagination">
              {/* "Prev" button */}
              <button onClick={handlePrevClick}>Prev</button>

              {/* Page numbers */}
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                  className={page === pageNumber ? 'active' : ''}
                >
                  {pageNumber}
                </button>
              ))}

              {/* "Next" button */}
              <button onClick={handleNextClick}>Next</button>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudioPage;
