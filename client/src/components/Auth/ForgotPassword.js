import React, { useState } from "react";
import "./Signup.css";
import Axios from "axios";
import {Link, useNavigate} from "react-router-dom";


const ForgotPassword = () => {
     
    const [email, setEmail] = useState("");
  
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      Axios.post("http://localhost:3000/auth/forget", {
        
        email,
       
      })
        .then( response => {
          if(response.data.status) {
            alert("check ur email for resent password link");
            navigate('/login');
          } 
        })
        .catch((err) =>
          console.log("Found problem in request send to server" + err)
        );
    };


    //--------------------
  return (
    <div className="sign-up-container">
      <form className="fullForm" onSubmit={handleSubmit}>
        <h2>Forget Password</h2>
        

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="on"
          placeholder="abc@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        

        <button type="submit">Send</button>
        <p>Already know !! <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default ForgotPassword
