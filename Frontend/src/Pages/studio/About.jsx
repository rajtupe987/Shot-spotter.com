import React from 'react';

const About = ({ photographer }) => {
  const { location, expertise  } = photographer;

  return (
    <div id="about" style={{ display: 'flex' }}>
      <div>
       
        <h3>location</h3>
        <p>{location.join(', ')}</p>
        <h3>expertise</h3>
        <p>{expertise.join(', ')}</p>
      </div>
   
    </div>
  );
};

export default About;
