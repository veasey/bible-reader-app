import React  from 'react';
import { getLastVerse, getLastChapter, getLastBook } from 'utils/pagination.js';
import { useVerseCoords } from 'context/VerseCoordsContext';

const Next = ({bible}) => {

    const {setSelectedBook, selectedBook, setSelectedChapter, selectedChapter, setSelectedVerse, selectedVerse} = useVerseCoords();

    let nextBookId = selectedBook + 1;
    let nextChapterId = selectedChapter + 1;
    let nextVerseId = selectedVerse + 1;

    let lastBookId = getLastBook(bible);
    let lastChapterId = getLastChapter(selectedBook, bible);
    let lastVerseId = getLastVerse(selectedBook, selectedChapter, bible);

    if (nextVerseId === lastVerseId && nextChapterId === lastChapterId && nextBookId === lastBookId) return;

    const handleNextButtonClick = () => {

        // if at end of book, proceed to next one
        if (selectedChapter === lastChapterId && (selectedVerse === 0 || selectedVerse === lastVerseId)) {
            if (selectedVerse !== 0) setSelectedVerse(1);
            setSelectedChapter(1);
            setSelectedBook(nextBookId);
        }

        // if showing all verses, proceed to next chapter
        if (selectedVerse === 0) {
            setSelectedChapter(nextChapterId);
            return;
        }

        // if viewing last verse in chapter, continnue to next chapter
        if (nextVerseId >= lastVerseId) {
            setSelectedVerse(1);    
            setSelectedChapter(nextChapterId);
            return;
        } 
        
        // increase verse
        setSelectedVerse(nextVerseId);
    };

    return (<button onClick={() => handleNextButtonClick()}>Next</button>)
};

export default Next;