import React from 'react';

const About = ({ photographer }) => {
  const { overview, serviceLocation, services, studioLocation } = photographer;

  return (
    <div id="about" style={{ display: 'flex' }}>
      <div>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3>Service Location</h3>
        <p>{serviceLocation.join(', ')}</p>
        <h3>Services</h3>
        <p>{services.join(', ')}</p>
      </div>
      <div style={{ width: '30%' }}>
        {studioLocation && (
          <iframe
            title="Studio Location"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${studioLocation.lat}!2d${studioLocation.lng}!3d15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDIzJzE1LjAiTiAxNTnCsDQ3JzEwLjgiRQ!5e0!3m2!1sen!2sus!4v1623910691615!5m2!1sen!2sus`}
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default About;
