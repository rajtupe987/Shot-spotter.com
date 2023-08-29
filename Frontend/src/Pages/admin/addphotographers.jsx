import "./addphotographers.css";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AddPhotographerForm = ({baseURL}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("");
  const [location, setLocation] = useState("");
  const [expertiese, setExpertiese] = useState("");
  const [availability, setAvailability] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const photographer = {
      name,
      image,
      profile,
      location,
      expertiese,
      availability,
      price
    };

    try {
      const response = await fetch(`${baseURL}/studio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(photographer)
      });

      if (response.ok) {
        Swal.fire("Photographer Added Successfully");
        console.log(photographer);
      } else {
        console.log(photographer);
      }
    } catch (error) {
      alert("BAD REQUEST");
    }
  };

  return (
    <div>
      <div id="after-nav-col-2" className="side-part appointment all-appoint">
        <div id="add-teacher">
          <form className="add-form" onSubmit={handleSubmit}>
            <label className="l" htmlFor="name">
              Name:
            </label>
            <input
              className="in"
              type="text"
              id="name"
              name="name"
              placeholder="Enter the photographer name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <label className="l" htmlFor="image">
              Image:
            </label>
            <input
              className="in"
              type="email"
              id="image"
              name="image"
              placeholder="Enter the photographer image"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              required
            />

            <label className="l" htmlFor="profile">
              Profile:
            </label>
            <input
              className="in"
              type="text"
              id="profile"
              name="profile"
              placeholder="Enter the profile here"
              value={profile}
              onChange={(event) => setProfile(event.target.value)}
              required
            />

            <label className="l" htmlFor="location">
              Location:
            </label>
            <input
              className="in"
              type="text"
              id="location"
              name="location"
              placeholder="Enter the location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
            />

            <label className="l" htmlFor="expertiese">
              Expertiese:
            </label>
            <input
              className="in"
              type="text"
              id="expertiese"
              name="expertiese"
              placeholder="Enter the photographer Expertiese"
              value={expertiese}
              onChange={(event) => setExpertiese(event.target.value)}
              required
            />

            <label className="l" htmlFor="availability">
              Availability:
            </label>
            <input
              className="in"
              type="text"
              id="availability"
              name="availability"
              placeholder="Enter the availability"
              value={availability}
              onChange={(event) => setAvailability(event.target.value)}
              required
            />

            <label className="l" htmlFor="price">
              Price:
            </label>
            <input
              className="in"
              type="text"
              id="price"
              name="price"
              placeholder="Enter the price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />

            <button id="btn1" type="submit">
              Add photographer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPhotographerForm;
