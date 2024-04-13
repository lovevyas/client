import React from 'react';
// import { useDispatch } from 'react-redux';

// import { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Components
import LiveStock from './pages/LiveStock';
import Header from './components/Header';
import About from './pages/About';

function App() {
    return(
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<LiveStock />} /> 
          {/* <Route path='/portfolio'>
            <Portfolio /> 
          </Route> */}
          <Route path="/about" element={<About />} />
        </Routes>
        
        <footer>Love vyas (c)2024 - Chikara</footer>
      </Router>
    );
}

export default App;
