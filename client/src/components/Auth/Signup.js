import React, { useState } from "react";
import "./Signup.css";
import Axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/signup", {
      username,
      email,
      password,
    })
      .then( response => {
        if(response.data.status) {
          navigate('/login');
        } 
      })
      .catch((err) =>
        console.log("Found problem in request send to server" + err)
      );
  };

  return (
    <div className="sign-up-container">
      <form className="fullForm" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="UserName"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="on"
          placeholder="abc@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          autoComplete="on"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
        <p>Already registerd !! <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
