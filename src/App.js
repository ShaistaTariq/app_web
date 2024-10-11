// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './navbar';
// import './App.css'; // External CSS file
// import back from './pictures/back.jpeg'; // Import your background image
// import Services from './services'; // This imports your Services component from services.js
// import Contact from './contact';
// import About from './about';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import './App.css'; // External CSS file
import back from './pictures/back.jpeg'; // Import your background image
import Services from './services'; // This imports your Services component from services.js
import Contact from './contact';
import About from './about';
import bbb from './pictures/bbb.jpeg';

// Dummy components for Home and other pages
const Home = () => <p>To view recipes List visit our services page.</p>;
<p style={{textAlign:'center'}}>Thanks!</p>

const App = () => {
  return (
    <Router>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${bbb})`, 
          backgroundSize: 'cover', // This ensures the image covers the entire page
          backgroundPosition: 'center center', // Center the image
          backgroundRepeat: 'no-repeat', // Prevent tiling
          minHeight: '100vh', // Ensure it covers the viewport height
          filter: 'blur(0)', // Optional: Ensure no additional blur is applied
        }}
      >
        <div style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/services" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
