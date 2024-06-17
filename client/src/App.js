import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Passwords from './components/passwords';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Passwords />} />
      </Routes>
    </Router>
  );
}

export default App;
