
import './adminlogin.css'; // Import the CSS file

import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = { email, password };

    loginUser(user);
  };

  const loginUser = (user) => {
    fetch("http://localhost:4002/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          alert("Login successful");
          window.location.href = "adminpage.html";
        } else {
          alert("Please register first");
        }
      });
  };

  return (
    <div id="login">
      <h4>Login/Admin</h4>
      <form onSubmit={handleSubmit}>
        <p>Email</p>
        <input
          id="email"
          type="text"
          placeholder="Email-Id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div id="login-button">
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
