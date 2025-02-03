import React, { useState } from 'react';
import BibleApp from './components/bible/BibleApp';
import About from './components/pages/About';
import Footer from './components/Footer';
import './App.css';

const App = () => {

  const [showPage, setShowPage] = useState('BibleApp');

  return (
    <div>
      {/* Title */}
      <h1>Bible Reader</h1>

      {/* Navigation */}
      <div className="main-menu">
        <span onClick={() => setShowPage('BibleApp')}>Read</span> - 
        <span onClick={() => setShowPage('About')}>About</span>
      </div>

      {showPage === 'BibleApp' && <BibleApp />}
      {showPage === 'About' && <About />}
      <Footer />
    </div>
  );
};

export default App;
