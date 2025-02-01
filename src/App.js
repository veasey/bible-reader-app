import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import BookMenu from './components/BookMenu';
import Verses from './components/Verses';
import Footer from './components/Footer';
import { fetchVerse } from './utils/fetch.js';
import './App.css';

const BibleApp = () => {

  // bible data
  const [bible, setBible] = useState({});
  const [currentTranslation, setCurrentTranslation] = useState('kjv');

  // coords for specific verses
  const [selectedBook, setSelectedBook] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [selectedVerse, setSelectedVerse] = useState(0);

  // query
  const [query, setQuery] = useState('');

  // results from searches, or specified coors
  const [verses, setVerses] = useState([]);
  
  useEffect(() => {
    fetch('/bibles/' + currentTranslation + '.json')
      .then((response) => response.json())
      .then((data) => {
        setBible(data);
      })
      .catch((error) => console.error('Error loading Bible:', error));
  }, [currentTranslation]);  

  useEffect(() => {
    let verse = fetchVerse([selectedBook, selectedChapter, selectedVerse], bible);
    if (verse) {
      setVerses([verse]);
    }
  }, [selectedBook, selectedChapter, selectedVerse, bible]);

  const indexState = [setSelectedBook, setSelectedChapter, setSelectedVerse];

  return (
    <div>
      <BookMenu 
        bible={bible}
        indexState={indexState}
        selectedBook={selectedBook}
        selectedChapter={selectedChapter}
        selectedVerse={selectedVerse}
        query={query}
        setVerses={setVerses}
      />
      <h1>King James Bible</h1>
      <SearchBar 
        bible={bible} 
        indexState={indexState}
        selectedBook={selectedBook}
        onSearchResult={setVerses} 
        verses={verses} 
        query={query}
        setQuery={setQuery}
      />
      <Verses verses={verses} />
      <Footer />
    </div>
  );
};

export default BibleApp;
