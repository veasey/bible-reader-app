import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import './App.css';
import { books } from './constants/books.js';

const currentTranslation = 'kjv';

const BibleApp = () => {

  const [bible, setBible] = useState(null);
  
  useEffect(() => {
    fetch('/bibles/' + currentTranslation + '.json')
      .then((response) => response.json())
      .then((data) => setBible(data))
      .catch((error) => console.error('Error loading Bible:', error));
  }, []);  

  return (
    <div>
      <h1>King James Bible</h1>
      <SearchBar bible={bible} books={books}  />
    </div>
  );
};

export default BibleApp;
