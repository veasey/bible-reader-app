import React, { useState } from 'react';

const ChapterMenu = ({ bible, selectedBook, onChapterSelect }) => {
    
    const [selectedChapter, setSelectedChapter] = useState(null);

    if (!selectedBook) {
        return;
    }

    const chapterNumbers = Object.keys(bible[selectedBook.key]).map(num => parseInt(num, 10).toString());
    
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedChapter(selectedValue);
        onChapterSelect(selectedChapter);
    };

    return (
        <div>
            <label htmlFor="chapterDropdown">Select a Chapter:</label>
                <select
                    id="chapterDropdown"
                    value={selectedChapter}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        -- Choose a chapter --
                    </option>
                    {chapterNumbers.map((chapter) => (
                        <option key={chapter} value={chapter}>
                            Chapter {chapter}
                        </option>
                    ))}
            </select>
        </div>
    );
}

export default ChapterMenu;