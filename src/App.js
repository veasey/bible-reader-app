import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import BookMenu from './components/BookMenu';
import Verses from './components/Verses';
import { fetchVerse } from './utils/fetch.js';
import './App.css';

const currentTranslation = 'kjv';

const BibleApp = () => {

  // bible data
  const [bible, setBible] = useState(null);
  
  // coords for specific verses
  const [selectedBook, setSelectedBook] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState(null);

  // results from searches, or specified coors
  const [verses, setVerses] = useState([]);
  
  useEffect(() => {
    fetch('/bibles/' + currentTranslation + '.json')
      .then((response) => response.json())
      .then((data) => setBible(data))
      .catch((error) => console.error('Error loading Bible:', error));
  }, []);  

  useEffect(() => {
    setVerses([fetchVerse([selectedBook, selectedChapter, selectedVerse], bible)]);
  }, [selectedBook, selectedChapter, selectedVerse, bible]);

  return (
    <div>
      <BookMenu 
        bible={bible}
        onBookSelect={setSelectedBook} 
        onChapterSelect={setSelectedChapter} 
        onVerseSelect={setSelectedVerse}
        selectedBook={selectedBook}
        selectedChapter={selectedChapter}
        selectedVerse={selectedVerse}
      />
      <h1>King James Bible</h1>
      <SearchBar bible={bible} onSearchResult={setVerses} verses={verses} />
      <Verses verses={verses} />
    </div>
  );
};

export default BibleApp;
