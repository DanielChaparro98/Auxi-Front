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
import Profile from './components/Profile/SaveProfile';
import SaveOffer from './components/Offer/SaveOffer';

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/save_offer' element={<SaveOffer />} />
        </Routes>
    </Router>
  );
}

export default App;
