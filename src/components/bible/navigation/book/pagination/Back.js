import React  from 'react';
import { getLastVerse } from 'utils/pagination.js';
import { useVerseCoords } from 'context/VerseCoordsContext';

const Back = ({bible}) => {

    const {setSelectedBook, selectedBook, setSelectedChapter, selectedChapter, setSelectedVerse, selectedVerse} = useVerseCoords();

    // do not display if at beginning
    if (selectedChapter <= 1 && selectedVerse === 0) return;
    if (selectedBook === 1 && selectedChapter === 1 && selectedVerse === 1) return;

    const handlePreviousButtonClick = () => {

        // go back a chapter
        let previousChapter = selectedChapter - 1;
        if (selectedVerse === 0) {
            return setSelectedChapter(previousChapter);
        }

        // back chapter if verse not set
        let previousVerse = selectedVerse - 1;
        if (previousVerse !== 0) {
            return setSelectedVerse(previousVerse);
        } else if (previousChapter !== 0) {
            setSelectedVerse(getLastVerse(selectedBook, previousChapter, bible));
            setSelectedChapter(previousChapter);
        }

        // page back through verse results from searches
    };

    return (<button onClick={() => handlePreviousButtonClick()}>Back</button>)
};

export default Back;