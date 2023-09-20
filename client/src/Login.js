import React, { useState } from "react";
import Axios from "axios"
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './util/Login.css'

export function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const routeChange = (path) =>{
        navigate(path)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
          };
        Axios.post(`/login`, {email:email, password: password})
        .then((response) => {
          console.log(response)
          routeChange(`/Dashboard/${response.data.uid}`)
        })
        .catch((error) => {
            const data = error.response.data
            if (error.response.status === 400) {
                console.log(error)
                alert("User not found with the given email or password")
            }else {
              alert("An error occured, please log in again!")
            }
          })
        e.target.reset();
    }

    return (
        <div className="Auth">
        <div className="auth-container">
            <div className="logo-container">
                <img src="/samsung-logo.jpeg" alt="Logo" className="logo" />
            </div>
            <h1>Advanced Materials Lab</h1>
            <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="janedoe@gmail.com"
                id="email"
                name="email"
                className="input-field"  // Added a class for styling
            />
            <label htmlFor="password">Password</label>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="********"
                id="password"
                name="password"
                className="input-field"  // Added a class for styling
            />
            <button type="submit" className="button">
                Log In
                </button>
            </form>
            <button className="link-btn" onClick={() => routeChange("/Registration")}>
            Don't have an account? Register here.
            </button>
        </div>
        </div>
    )
}
export default Login;