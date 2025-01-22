import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import BookMenu from './components/BookMenu';
import './App.css';

const currentTranslation = 'kjv';

const BibleApp = () => {

  const [bible, setBible] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  
  useEffect(() => {
    fetch('/bibles/' + currentTranslation + '.json')
      .then((response) => response.json())
      .then((data) => setBible(data))
      .catch((error) => console.error('Error loading Bible:', error));
  }, []);  

  return (
    <div>
      <BookMenu onBookSelect={setSelectedBook}/>
      <h1>King James Bible</h1>
      <SearchBar bible={bible} selectedBook={selectedBook} />
    </div>
  );
};

export default BibleApp;
