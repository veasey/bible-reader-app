import React  from 'react';
import { fetchBookNameFromBookId } from 'utils/fetch.js';
import { useVerseCoords } from 'context/VerseCoordsContext';

const RandomVerseButton = ({bible}) => {

    const { setSelectedBook, setSelectedChapter, setSelectedVerse, setBookName } = useVerseCoords();

    const handleRandomVerseButtonClick = () => {
        
        const books = Object.keys(bible);
        const randomBook = Number(books[Math.floor(Math.random() * books.length)]);

        const chapters = Object.keys(bible[randomBook]);
        const randomChapter = Number(chapters[Math.floor(Math.random() * chapters.length)]);

        const verses = Object.keys(bible[randomBook][randomChapter]);
        const randomVerse = Number(verses[Math.floor(Math.random() * verses.length)]);

        setBookName(fetchBookNameFromBookId(randomBook));
        setSelectedBook(randomBook);
        setSelectedChapter(randomChapter);
        setSelectedVerse(randomVerse);
    };
    
    return (
        <div className="menu-item">
            <button onClick={handleRandomVerseButtonClick}>🎲Random Verse</button>
        </div>
    );
};

export default RandomVerseButton;