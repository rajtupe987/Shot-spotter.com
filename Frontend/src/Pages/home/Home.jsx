import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import './Home.css';
import heartImage from '../images/png/001-heart.png';
import valueImage from '../images/png/001-value.png';
import birthdayCakeImage from '../images/png/002-birthday-cake.png';
import magnifyingGlassImage from '../images/png/002-magnifying-glass.png';
import babyBoyImage from '../images/png/003-baby-boy.png';
import creditCardImage from '../images/png/003-credit-card.png';
import burgerImage from '../images/png/004-burger.png';
import corporateImage from '../images/png/005-corporate.png';
import landscapeImage from '../images/png/006-landscape.png';
import eiffelTowerImage from '../images/png/007-eiffel-tower.png';
import review1Image from '../images/png/review1.jpg';
import review2Image from '../images/png/review2.jpg';
import review3Image from '../images/png/review3.JPG';
import weddingRingsImage from '../images/png/wedding-rings.png';



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
            <h1 style={{ fontSize: '4rem' }}>ShotSpotter</h1>
            {/* <h3>
              Book <span id="category">{category}</span> PhotoShoot Today
            </h3> */}
            <div>
              <select name="Category" id="category_select">
                <option value="">Category</option>
                <option value="Weddings">Weddings</option>
                <option value="Babies&Kids">Babies & Kids</option>
                <option value="Travel">Travel</option>
                <option value="Fashion">Fashion & Portfolio</option>
                <option value="Commercial">Commercial</option>
                <option value="Birthdays">Birthdays</option>
              </select>
              <input type="text" id="search_city" placeholder="Search City" />
              <button id="search_city_btn">Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* TYPES SECTION */}
      <div className="types">
        <div>
          <img src={weddingRingsImage} alt="" />
          <h3>WEDDING</h3>
        </div>
        <div>
          <img src={babyBoyImage} alt="" />
          <h3>BABIES</h3>
        </div>
        <div>
          <img src={birthdayCakeImage} alt="" />
          <h3>SPECIAL OCCASIONS</h3>
        </div>
        <div>
          <img src={burgerImage} alt="" />
          <h3>COMMERCIAL</h3>
        </div>
        <div>
          <img src={corporateImage} alt="" />
          <h3>CORPORATE EVENTS</h3>
        </div>
        <div>
          <img src={landscapeImage} alt="" />
          <h3>NATURE</h3>
        </div>
        <div>
          <img src={eiffelTowerImage} alt="" />
          <h3>TRAVEL</h3>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="works">
        <h2>How It Works</h2>
        <div>
          <div>
            <img src={magnifyingGlassImage} alt="" />
            <h2>Search</h2>
            <p>Search for your perfect Photographer based on your location, category, and price range.</p>
          </div>
          <div>
            <img src={heartImage} alt="" />
            <h2>Shortlist</h2>
            <p>Shortlist Photographers you like based on their albums, packages, and reviews to keep track.</p>
          </div>
          <div>
            <img src={creditCardImage} alt="" />
            <h2>Book</h2>
            <p>Book your finalized Photographer by selecting a package or directly contacting them on Whatsapp.</p>
          </div>
        </div>
      </section>

      {/* wedding section */}
      <section className="wedding"></section>
      {/* babies section */}
      <section className="babies"></section>
      {/* special occasion section */}
      <section className="occasion"></section>
      {/* food section */}
      <section className="food"></section>

      {/* review section */}
      <section className="review">
        <h3>What people are saying…</h3>
        <div>
          <div>
            <img src={review1Image} alt="" />
            <h3>Vyankatesh Gadekar</h3>
            <p>KNOTSBYAMP - WEDDING</p>
            <p>&#9733; 4.5</p>
            <p>Very professional team of photographers. Passionate about their work and very accommodating. Made our wedding memorable. Good with the parents and relatives as well.</p>
          </div>
          <div>
            <img src={review2Image} alt="" />
            <h3>Bandana Maity</h3>
            <p>PHOTOMATIC - WEDDING</p>
            <p>&#9733; 4.5</p>
            <p>Photomatic is a complete solution for wedding photography. This team has got excellent members with huge knowledge. The best part is all the members are calm, decent, and very friendly and highly professional too. All the very best to this lovely team.</p>
          </div>
          <div>
            <img src={review3Image} alt="" />
            <h3>Supriya Mishra</h3>
            <p>VIJAY STUDIO - SPECIAL OCCASION</p>
            <p>&#9733; 4.5</p>
            <p>Best photography best service with lots of creativity made my wedding memorable. These guys did a great job thank you vijay studio you guys are really awesome</p>
          </div>
        </div>
      </section>

      <div className="banner">
        <h1>Are you a Professional Photographer?</h1>
        <button id="reg_studio">Register as Studio</button>
      </div>

      <div className="stats">
        <div>
          <h1>981</h1>
          <p>Total Cities</p>
        </div>
        <div>
          <h1>22,372</h1>
          <p>Total Studios</p>
        </div>
        <div>
          <h1>39,495</h1>
          <p>Total Albums</p>
        </div>
        <div>
          <h1>15,980</h1>
          <p>Total Reviews</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
