import React, { useState, useEffect } from 'react';
import SearchBar from './search/SearchBar';
import BookMenu from './navigation/BookMenu';
import Verses from '../../components/bible/Verses';
import { fetchVerses } from '../../utils/fetch.js';
import '../../App.css';

const BibleApp = () => {

  // bible data
  const [bible, setBible] = useState({});
  const [currentTranslation, setCurrentTranslation] = useState('kjv');

  // coords for specific verses
  const [selectedBook, setSelectedBook] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [selectedVerse, setSelectedVerse] = useState(0);

  const [query, setQuery] = useState('');
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
    let verse = fetchVerses([selectedBook, selectedChapter, selectedVerse], bible);
    if (verse) {
      setVerses(verse);
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
    </div>
  );
};

export default BibleApp;
