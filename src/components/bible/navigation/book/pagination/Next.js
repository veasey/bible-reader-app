import React  from 'react';
import { getLastVerse, getLastChapter } from 'utils/pagination.js';
import { useVerseCoords } from 'context/VerseCoordsContext';

const Next = ({bible}) => {

    const {setSelectedBook, selectedBook, setSelectedChapter, selectedChapter, setSelectedVerse, selectedVerse} = useVerseCoords();

    let nextChapterId = selectedChapter + 1;
    let nextVerseId = selectedVerse + 1;
    let isNextChapterExist = (bible[nextChapterId]) ? true : false;
    let isNextVerseExist = (bible[nextChapterId][nextVerseId]) ? true : false;

    let lastChapterId = getLastChapter(selectedBook, bible);
    let lastVerseId = getLastVerse(selectedBook, selectedChapter, bible);

    if (nextVerseId === lastVerseId && nextChapterId === lastChapterId) return;

    const handleNextButtonClick = () => {

        if (selectedVerse === 0) {
            setSelectedChapter(nextChapterId);
            return;
        }

        if (nextVerseId >= lastVerseId) {
            setSelectedVerse(1);    
            setSelectedChapter(nextChapterId);
            return;
        } 
        
        setSelectedVerse(nextVerseId);
                
        // page back through verse results from searches
    };

    return (<button onClick={() => handleNextButtonClick()}>Next</button>)
};

export default Next;