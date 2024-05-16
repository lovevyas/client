import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SearchInputProvider } from './SearchInputProvider';
// Components
import LiveStock from './pages/LiveStock';
import Header from './components/Header';
import About from './pages/About';
import Home from './pages';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';



function App() {
    return(
      <Router>
        <Header />
        <SearchInputProvider>
        <Routes>
          <Route path="/" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/home" element={<LiveStock />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/stock" element={<Home />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
        </SearchInputProvider>
        <footer>Love vyas (c)2024 - Chikara</footer>
      </Router>
    );
}

export default App;
