import React  from 'react';
import { getLastVerse, getLastChapter } from 'utils/pagination.js';
import { fetchBookNameFromBookId } from 'utils/fetch.js';
import { useVerseCoords } from 'context/VerseCoordsContext';

const Back = ({bible}) => {

    const {setSelectedBook, selectedBook, setSelectedChapter, selectedChapter, setSelectedVerse, selectedVerse, setBookName} = useVerseCoords();

    // do not display if at beginning
    if (selectedBook == 1 && selectedChapter == 1 && (!selectedVerse || selectedVerse === 1)) return;

    const handlePreviousButtonClick = () => {

        // go back a book
        if (selectedChapter === 1 && (selectedVerse === 0 || selectedVerse === 1)) {

            let previousBookId = selectedBook - 1;

            let lastChapterId = getLastChapter(previousBookId, bible);
            let lastVerseId = getLastVerse(previousBookId, lastChapterId, bible);            

            if (selectedVerse !== 0) setSelectedVerse(lastVerseId);
            setSelectedChapter(lastChapterId);
            setSelectedBook(previousBookId);
            
            let bookName = fetchBookNameFromBookId(previousBookId);
            console.log(bookName);
            setBookName(bookName);
            return;
        }

        // go back a chapter
        let previousChapterId = selectedChapter - 1;
        if (selectedVerse === 0) {
            setSelectedChapter(previousChapterId);
            return;
        }

        // back chapter if verse not set
        let previousVerseId = selectedVerse - 1;
        if (previousVerseId !== 0) {
            setSelectedVerse(previousVerseId);
            return;
        } else if (previousChapterId !== 0) {
            setSelectedVerse(getLastVerse(selectedBook, previousChapterId, bible));
            setSelectedChapter(previousChapterId);
            return;
        }
    };

    return (<button onClick={() => handlePreviousButtonClick()}>Back</button>)
};

export default Back;