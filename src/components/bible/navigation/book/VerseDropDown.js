import React from 'react';
import { fetchVersesFromChapter } from 'utils/fetch.js';
import { useVerseCoords } from 'context/VerseCoordsContext';

const VerseDropDown = ({bible, setQuery}) => {

    const {selectedBook, selectedChapter, selectedVerse, setSelectedVerse} = useVerseCoords();

    if (!selectedBook) return;

    const verses = fetchVersesFromChapter(selectedBook, selectedChapter, bible);

    const handleChange = (event) => {
        setSelectedVerse(Number(event.target.value));
        setQuery('');
    };

    if (!verses || Object.keys(verses).length === 0) return;

    return (
        <div className="menu-item">
            <select id="verseDropdown" value={selectedVerse} onChange={handleChange}>
                <option key="0" value="0">All Verses</option>
                {Object.entries(verses).map(([key, verse]) => (
                    <option key={key} value={key}>
                        Verse {key}
                    </option>
                ))}    
            </select>
        </div>
    );    
}

export default VerseDropDown;