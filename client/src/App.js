import { Registration } from './Registration';
import { Login } from './Login';
import React from "react";
import Dashboard from './Dashboard';
import './util/App.css';


import {  
  BrowserRouter as Router,  
  Routes,  
  Route 
}   
from 'react-router-dom'; 
function App() {
  return (
    <Router>
      <div className='container bg-dark'>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/Registration" element={<Registration/>}  />
          <Route path='/Dashboard/:userId' element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;