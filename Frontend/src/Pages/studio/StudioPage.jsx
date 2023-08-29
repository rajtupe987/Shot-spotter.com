import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Navbar from '../common/Navbar';
import './StudioPage.css';

const StudioPage = ({baseURL}) => {

  useEffect(() => {
    document.title = 'Studios';
  }, []); 

  const categories = ["Portrait", "Landscape", "Lensmith", "Aperture", "Focalist", "Exposurist", "Shutterpro", "Imagemaker", "Cameralist", "Visualizer", "Lightographer", "Framographer", "Pictor", "Lumino", "Chroma", "Photowizard"];

  const locations = ["Delhi", "Mumbai", "Nagpur", "Kerala", "Punjab", "Pune", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Chandigarh", "Jaipur", "Ahmedabad", "Lucknow", "Bhopal", "Guwahati", "Kochi"];

  const [photographers, setPhotographers] = useState([]);
  const [page,setPage] = useState(1);
  const [tpage,setTPage] = useState(0);

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

  useEffect(() => {
    // Fetch photographers from the backend API
    const token = localStorage.getItem('token')
    fetch(`${baseURL}/studio?page=${page}`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization:  token// Include the token in the Authorization header
      }
    })
      .then((response) => response.json())
      .then((data) =>{ 
              setPhotographers(data.photographers);
              setTPage(data.t_pages);
              console.log(data);
      })
      .catch((error) => console.log(error));
  }, [page]);

  const navigate = useNavigate();
  const handleCardClick = (studioID) => {
    navigate(`/studio/${studioID}`);
  };

  return (
    <div>
      <Navbar />

      <div id='container'>
        <div className="filter-box">
          {/* Category filter */}
          <div className="filter-section">
            <h3>Categories</h3>
            {categories.map((category) => (
              <div key={category}>
                <input type="radio" name="category" value={category} />
                <label>{category}</label>
              </div>
            ))}
          </div>

          <hr />

          {/* Location filter */}
          <div className="filter-section">
            <h3>Locations</h3>
            {locations.map((location) => (
              <div key={location}>
                <input type="radio" name="location" value={location} />
                <label>{location}</label>
              </div>
            ))}
          </div>

          <hr />

          {/* Price filter */}
          <div className="filter-section">
            <h3>Price Range</h3>
            <div>
              <input type="radio" name="price" value="5000" />
              <label>Below ₹5,000</label>
            </div>
            <div>
              <input type="radio" name="price" value="5000-10000" />
              <label>₹5,000 - ₹10,000</label>
            </div>
            <div>
              <input type="radio" name="price" value="10000-20000" />
              <label>₹10,000 - ₹20,000</label>
            </div>
            <div>
              <input type="radio" name="price" value="20000-30000" />
              <label>₹20,000 - ₹30,000</label>
            </div>
            <div>
              <input type="radio" name="price" value="30000-40000" />
              <label>₹30,000 - ₹40,000</label>
            </div>
            <div>
              <input type="radio" name="price" value="40000-50000" />
              <label>₹40,000 - ₹50,000</label>
            </div>
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
                      <h3>{photographer.name}</h3>
                      <p>{photographer.location[0]}</p>
                      <div className="categories">
                        {photographer.expertise.map((category) => (
                          <span className="category-bubble">{category}</span>
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
    </div>
  );
};

export default StudioPage;
