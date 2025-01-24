import React from 'react';

const VerseDropDown = ({ bible, selectedBook, selectedChapter, onVerseSelect, selectedVerse }) => {

    if (!selectedChapter) {
        return;
    }

    const verses = Object.keys(bible[selectedBook.key][selectedChapter.key]).map(num => parseInt(num, 10).toString());

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        onVerseSelect(selectedValue);
    };

    return (
        <div>
            <label htmlFor="verseDropdown">Select a Verse:</label>
                <select
                    id="verseDropdown"
                    value={selectedVerse}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        -- Choose a verse --
                    </option>
                    {verses.map((verse, index) => (
                        <option key={index} value={verse}>
                            Verse {index}
                        </option>
                    ))}
            </select>
        </div>
    );
}

export default VerseDropDown;