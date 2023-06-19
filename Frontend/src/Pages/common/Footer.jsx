// Footer component 
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div>
      {/* footer section */}
    <footer>
      <section className="footer">
        <div>
          <img src="images/logo.jpg" alt="" />
          <div>
            <div>
              <p style={{ color: 'green' }}>Company</p>
              <p>Blog</p>
              <p>About Us</p>
              <p>Contact Us</p>
              <p>Cities</p>
            </div>
            <div>
              <p style={{ color: 'green' }}>Legal</p>
              <p>Terms Of Service</p>
              <p>Privacy Policy</p>
              <p>Content Guidelines</p>
              <p>Community Guidelines</p>
              <p>3rd Party licenses</p>
            </div>
          </div>
        </div>
      </section>
      <div className="line">
        <p>Icons made by Freepik from www.flaticon.com And Font Awesome</p>
      </div>
    </footer>
    </div>
  )
}

export default Footer;