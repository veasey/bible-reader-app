import React from 'react';
import { fetchChapter } from '../utils/fetch.js';

const VerseDropDown = ({ bible, selectedBook, selectedChapter, selectedVerse, onVerseSelect }) => {

    if (!selectedBook || !selectedChapter) {
        return;
    }

    const verses = fetchChapter([selectedBook.key, selectedChapter], bible);
    console.log(verses);

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
                    <option key={key} value={verse}>
                        Verse {key}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default VerseDropDown;