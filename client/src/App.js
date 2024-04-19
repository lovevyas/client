import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SearchInputProvider } from './SearchInputProvider';
// Components
import LiveStock from './pages/LiveStock';
import Header from './components/Header';
import About from './pages/About';
import Home from './pages';



function App() {
    return(
      <Router>
        <Header />
        <SearchInputProvider>
        <Routes>
          <Route path="/" element={<LiveStock />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/stock" element={<Home />} />
        </Routes>
        </SearchInputProvider>
        <footer>Love vyas (c)2024 - Chikara</footer>
      </Router>
    );
}

export default App;
