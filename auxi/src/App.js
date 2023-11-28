import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  Redirect
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './layout/navbar';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </Router>
  );
}

export default App;
