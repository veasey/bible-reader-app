import React from 'react';
import { fetchVersesFromChapter } from '../../../utils/fetch.js';

const VerseDropDown = ({ bible, selectedBook, selectedChapter, selectedVerse, onVerseSelect }) => {

    if (!selectedBook) {
        return;
    }

    const verses = fetchVersesFromChapter(selectedBook, selectedChapter, bible);

    const handleChange = (event) => {
        onVerseSelect(Number(event.target.value));
    };

    return (
        <div>
            <label htmlFor="verseDropdown">Select a Verse:</label>
            <select id="verseDropdown" value={selectedVerse} onChange={handleChange}>
                {Object.keys(verses).length === 0 ? (
                    <option disabled>No verses available</option>
                ) : (
                    <>
                        <option key="0" value="0">All Verses</option>
                        {Object.entries(verses).map(([key, verse]) => (
                            <option key={key} value={key}>
                                Verse {key}
                            </option>
                        ))}
                    </>
                )}
            </select>
        </div>
    );    
}

export default VerseDropDown;