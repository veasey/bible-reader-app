import React, { useState } from 'react';
import { findVersesByQuery, getBibleScope } from 'utils/search.js';
import { useVerseCoords } from 'context/VerseCoordsContext';

const BookSelectListItem = ({
    bible, 
    setBookName, 
    setIsBookSelectMenuOpen, 
    setVerses, 
    query, 
    book
}) => {

    const [isClicked, setIsClicked] = useState(false);
    const {setSelectedBook, setSelectedChapter, setSelectedVerse} = useVerseCoords();

    const handleBookClick = () => {

        setSelectedBook(book.key);
        setBookName(book.name);
        setIsClicked(!isClicked);
        setIsBookSelectMenuOpen(false);

        let normalizedQuery = query.toLowerCase().trim();

        if (normalizedQuery.length === 0) {

            // if no query, get entire first chapter
            setSelectedChapter(1);
            setSelectedVerse(0);
        } else {

            // otherwise search for query within current book
            let filteredBible = getBibleScope(bible, book.key);
            let verses = findVersesByQuery(normalizedQuery, filteredBible);
            setVerses(verses);
            setSelectedChapter(0);
            setSelectedVerse(0);
        }         
    }

    return (
        <li onClick={() => handleBookClick()}
            className={isClicked ? "selected" : ""}
        >
            {book.name}
        </li>
    );        
};

export default BookSelectListItem;