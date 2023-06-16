import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import './Home.css';

const HomePage = () => {
  useEffect(() => {
    document.title = 'ShotSpotter | Capture Moments, Create Memories!';
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [forwards, setForwards] = useState(true);
  const [category, setCategory] = useState('');
  const [sliderImage, setSliderImage] = useState('');

  let images = [
    "https://d3btuubl2bvm9d.cloudfront.net/images/2c9f8d6952b600c30152c4a9bff60025/1552548481006-web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/ebef5f883b2a11e3b6330e2f866a9102/1409833764181_web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/6a90c3b48b1a11e4ae4c0e2f866a9102/1419391423179_web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/89c6667bfeba11e3be570e2f866a9102/1460453036405-web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/2c9f848756a55ba40156c1b2a2860117/1472926761431-web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/dbdc4253eb0d11e3be570e2f866a9102/1488030734959-web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/2c9f84875922ae4c0159254f815a0011/1482499879830-web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/2c9f84875892d5730158961b42ca0023/1479989585463-web.jpg"
    // Add more image URLs as needed
  ];

  const skip_delay = 15;

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderImage(images[currentIndex]);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const categories = ["Wedding", "Babies", "Anniversary", "Commercial", "Events", "Fashion", "Nature", "Travel"];

  useEffect(() => {
    const wordFlick = () => {
      let currentCategory = categories[currentIndex];
      let part;

      if (forwards) {
        if (offset >= currentCategory.length) {
          setOffset((prevOffset) => prevOffset + 1);
          if (offset === skip_delay) {
            setForwards(false);
            setOffset(0);
          }
        }
      } else {
        if (offset === 0) {
          setForwards(true);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
        }
      }

      part = currentCategory.substr(0, offset);
      if (offset === skip_delay) {
        if (forwards) {
          setOffset((prevOffset) => prevOffset + 1);
        } else {
          setOffset((prevOffset) => prevOffset - 1);
        }
      }

      setCategory(part);

      if (offset === currentCategory.length && !forwards) {
        setTimeout(() => {
          wordFlick();
        }, 3000); // Wait for 3 seconds before starting the next word flick
      } else {
        setTimeout(() => {
          wordFlick();
        }, 110);
      }
    };

    wordFlick(); // Start the word flick effect
  }, [currentIndex, offset, forwards]);

  return (
    <div>
      <Navbar />
      <section id="slider">
        <div className="slider-image" style={{ backgroundImage: `url('${sliderImage}')` }}>
          <div className="slider-text">
            <h1 style={{ fontSize: '4rem' }}>SHOTSPOTTER</h1>
            <h3>
              Book <span id="category">{category}</span> PhotoShoot Today
            </h3>
            <div>
              <select name="Category" id="category_select">
                <option value="">Category</option>
                <option value="">Wedding</option>
                <option value="">Babies & Kids</option>
                <option value="">Special Occasion</option>
                <option value="">Commercial</option>
                <option value="">Corporate Events</option>
                <option value="">Fashion & Portfolio</option>
                <option value="">Nature</option>
                <option value="">Travel</option>
              </select>
              <input type="text" id="search_city" placeholder="Search City" />
              <button id="search_city_btn">Search</button>
            </div>
          </div>
        </div>
      </section>
      {/* Add the navbar and footer components here */}
    </div>
  );
};

export default HomePage;
