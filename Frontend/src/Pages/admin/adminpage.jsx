import "./adminpage.css";
import React, { useState, useEffect } from "react";

const AdminPage = () => {
  // State variables
  const role="admin";
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGluYSIsInVzZXJJRCI6IjY0OTAwODIzYzFhNTBiZTcyYjQ2MTZiNSIsImlhdCI6MTY4NzE2MTc0N30.xfYF-As4g9atFUQuSn4oQw4LI47hj-RKISMkeF_YE_U"
  
  //const [role,token]=localStorage

  const [data, setData] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  // Fetch data from the server
  const getData = async () => {
    try {
      const res = await fetch("http://localhost:4002/studio", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      });
      const data = await res.json();
      console.log(data); // Log the response to check the data format
      setData(data.photographers);
    } catch (error) {
      console.log(error);
    }
  };

  // Render the component
  return (
    <div>
      <div id="nav">
        <div>
          <a href="../Frontend/frontendHtml/index.html">
            <img src="../images/logo.jpg" alt="" id="logo" />
          </a>
        </div>

        <div id="navbtnDiv">
          <h4>Admin Panel</h4>
        </div>
      </div>

      <div>
        <div id="after-nav">
          <div id="after-nav-col-1">
            <div className="row">
              <a href="">
                <h2>Dashboard</h2>
              </a>
            </div>

            <div className="row">
              <a href="./appointment.html">
                <h2>All Appointments</h2>
              </a>
            </div>
            <div className="row">
              <a href="./addphotographer.html">
                <h2>Add photographer</h2>
              </a>
            </div>
            <div className="row">
              <a href="./remove.html">
                <h2>Remove photographer</h2>
              </a>
            </div>
          </div>

          <div
            id="after-nav-col-2"
            className="side-part appointment all-appoint"
          >
            <div id="search">
              {/* <label id="srch"><h1>Search photographer:</h1></label>
              <input id="searchp" onInput={searchPhotographer} className="searchphotographer" placeholder="search photographer" /> */}
            </div>
            <table id="teachers">
              <thead>
                <tr>
                  <th scope="col">photographer Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">availability</th>
                </tr>
              </thead>
              <tbody id="photographer">
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <h4>{item._id}</h4>
                      </td>
                      <td>
                        <h4>{item.name}</h4>
                      </td>
                      <td>
                        <h4>{item.availability}</h4>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
