import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import Landingpage from './components/pages/Landingpage';
import Home from './components/pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
      </Routes>
    </Router>
  );
};

export default App;
