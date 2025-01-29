import React from 'react';
import { fetchVersesFromChapter } from '../utils/fetch.js';

const VerseDropDown = ({ bible, selectedBook, selectedChapter, selectedVerse, onVerseSelect }) => {

    if (!selectedBook || !selectedChapter) {
        return;
    }

    const verses = fetchVersesFromChapter([selectedBook, selectedChapter], bible);

    const handleChange = (event) => {
        onVerseSelect(event.target.value);
    };

    return (
        <div>
            <label htmlFor="verseDropdown">Select a Verse:</label>
            <select
                id="verseDropdown"
                value={selectedVerse}
                onChange={handleChange}
            >
                {Object.entries(verses).map(([key, verse]) => (
                    <option key={key} value={key}>
                        Verse {parseInt(key, 10).toString()}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default VerseDropDown;