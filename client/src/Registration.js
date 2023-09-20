import React, { useState } from 'react';
import './util/Login.css'
import Axios from "axios"
import { useNavigate } from "react-router-dom";
export function Registration(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const routeChange = (path) =>{
      navigate(path)
  }
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('/register', {name: name, email:email, password: password})
        .then((response) => {
          console.log(response)
          routeChange("/")
          alert("User created, please login.")
        })
        .catch((error) => {
            if (error.response.status === 400) {
                alert("Please enter all fields correctly")
            }
          })
        e.target.reset();
    }

    return (
      <div className = "Auth">
        <div className="auth-container">
        <div className="logo-container">
            <img src="/samsung-logo.jpeg" alt="Logo" className="logo" />
        </div>
        <h1>Advanced Materials Lab</h1>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="full Name" className="input-field"/>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="janedoe@gmail.com" id="email" name="email" className="input-field"/>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password"className="input-field"/>
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => routeChange("/")}>Have an account already? Login here.</button>
    </div>
    </div>
    )
}

export default Registration;