import React, { useState } from "react";
import "./Signup.css";
import Axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
  
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
 
  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    })
      .then( response => {
        if(response.data.status) {
          navigate('/home');
        } 
      })
      .catch((err) =>
        console.log("Found problem in request send to server" + err)
      );
  };

  return (
    <div className="sign-up-container">
      <form className="fullForm" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
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
        <Link to="/forgotPassword">Forget Password</Link>
        <p>Don't Have an Account Create One !! <Link to="/">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;
