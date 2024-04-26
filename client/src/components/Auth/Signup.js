import React from 'react'
import './Signup.css';
const Signup = () => {
  return (
    <div className="sign-up-conatiner"> 
      <h2>Sign Up</h2>
      <form className="sign-up-form">
        <label htmlFor="username">Username</label>
        <input type="text" placeholder='UserName' />

        <label htmlFor="email">Email:</label>
        <input type="email" autoComplete='on' placeholder='abc@email.com'/>

        <label htmlFor="password">Email:</label>
        <input type="password" autoComplete='off' placeholder='********'/>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
