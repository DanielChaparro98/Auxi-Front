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
import Profile from './components/profile/SaveProfile';
import SaveOffer from './components/offer/SaveOffer';
import SaveSupport from './components/support/SaveSupport';

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/save_profile" element={<Profile />} />
          <Route path='/save_offer' element={<SaveOffer />} />
          <Route path='/save_support' element={<SaveSupport />} />
        </Routes>
    </Router>
  );
}

export default App;
