import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const StudioPage = () => {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [photographers, setPhotographers] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend API
    fetch('https://your-api-url/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));

    // Fetch locations from the backend API
    fetch('https://your-api-url/locations')
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.log(error));

    // Fetch photographers from the backend API
    fetch('https://your-api-url/photographers')
      .then((response) => response.json())
      .then((data) => setPhotographers(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="filter-box">
        {/* Category filter */}
        <div className="filter-section">
          <h3>Categories</h3>
          {categories.map((category) => (
            <div key={category.id}>
              <input type="radio" name="category" value={category.name} />
              <label>{category.name}</label>
            </div>
          ))}
        </div>

        {/* Location filter */}
        <div className="filter-section">
          <h3>Locations</h3>
          {locations.map((location) => (
            <div key={location.id}>
              <input type="radio" name="location" value={location.name} />
              <label>{location.name}</label>
            </div>
          ))}
        </div>

        {/* Price filter */}
        <div className="filter-section">
          <h3>Price Range</h3>
          <div>
            <input type="radio" name="price" value="0-100" />
            <label>$0 - $100</label>
          </div>
          <div>
            <input type="radio" name="price" value="100-500" />
            <label>$100 - $500</label>
          </div>
          <div>
            <input type="radio" name="price" value="500-1000" />
            <label>$500 - $1000</label>
          </div>
          <div>
            <input type="radio" name="price" value="1000+" />
            <label>$1000+</label>
          </div>
        </div>
      </div>

      <div className="photographers-list">
        {photographers.map((photographer) => (
          <div key={photographer.id} className="card">
            <div className="card-header">
              <div className="studio-info">
                <div className="studio-image">
                  <img src={photographer.image} alt="Photographer" />
                </div>
                <div className="studio-details">
                  <h4>{photographer.name}</h4>
                  <p>{photographer.address}</p>
                  <p>{photographer.phoneNumber}</p>
                  <div className="categories">
                    {photographer.categories.map((category) => (
                      <span key={category.id} className="category-bubble">
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="price-info">
                <div>
                  <p>Starts from:</p>
                  <p>{photographer.price}</p>
                </div>
                <div>
                  <p>{photographer.votes} Votes</p>
                  <p>
                    Star symbol {photographer.rating}
                  </p>
                </div>
              </div>
            </div>
            <div className="image-container">
              {photographer.images.map((image) => (
                <img key={image.id} src={image.url} alt="Photographer" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudioPage;
