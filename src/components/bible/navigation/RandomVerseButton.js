import React  from 'react';
import Cookies from 'js-cookie';
import { fetchRandomVerse } from 'utils/fetch.js';
import { useVerseCoords } from 'context/VerseCoordsContext';

const RandomVerseButton = ({bible}) => {

    const { setSelectedBook, setSelectedChapter, setSelectedVerse, setBookName } = useVerseCoords();

    const setRandomVerse = () => {
        const randomVerseData = fetchRandomVerse(bible);
        if (!randomVerseData) return false;

        setBookName(randomVerseData.bookname);
        setSelectedBook(randomVerseData.bookId);
        setSelectedChapter(randomVerseData.chapterId);
        setSelectedVerse(randomVerseData.verseId);
        return true;
    };
    
    const handleRandomVerseButtonClick = () => {
        return setRandomVerse();
    };

    // set random verse, if first time
    if (!Cookies.get('firstTimeVisitor')) {
        setRandomVerse();
        Cookies.set('firstTimeVisitor', 1, { expires: 7 });
    } 
    
    return (
        <div className="menu-item">
            <button onClick={handleRandomVerseButtonClick}>🎲Random Verse</button>
        </div>
    );
};

export default RandomVerseButton;