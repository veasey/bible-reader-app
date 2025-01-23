import React, { useState } from 'react';

const ChapterMenu = ({ book }) => {

    const [selectedChapter, setSelectedChapter] = useState(null);

    if (!book) {
        return;
    }

    const chapters = Object.keys(book).map(num => parseInt(num, 10).toString());
    console.log(chapters);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedChapter(selectedValue);
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
                    {chapters.map((chapter) => (
                        <option key={chapter} value={chapter}>
                            Chapter {chapter}
                        </option>
                    ))}
            </select>
        </div>
    );
}

export default ChapterMenu;