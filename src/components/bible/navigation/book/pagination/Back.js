import React  from 'react';
import { useVerseCoords } from 'context/VerseCoordsContext';

const Back = () => {

    const {selectedChapter, selectedVerse} = useVerseCoords();

    if (selectedChapter <= 1 || selectedVerse <= 1) return;

    const handlePreviousButtonClick = () => {
        
        // back chapter if verse not set

        // back verse if verse is set

        // page back through verse results from searches
    };

    return (<button onClick={handlePreviousButtonClick()}>Back</button>)
};

export default Back;