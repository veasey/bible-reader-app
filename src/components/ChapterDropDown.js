import React  from 'react';

const ChapterMenu = ({ bible, selectedBook, onChapterSelect, selectedChapter, onVerseSelect }) => {
    
    if (!selectedBook) {
        return;
    }

    const chapterNumbers = Object.keys(bible[selectedBook]).map(num => parseInt(num, 10).toString());
    
    const handleChange = (event) => {
        onChapterSelect(event.target.value);
        onVerseSelect(1);
    };

    return (
        <div>
            <label htmlFor="chapterDropdown">Select a Chapter:</label>
                <select
                    id="chapterDropdown"
                    value={selectedChapter}
                    onChange={handleChange}
                >
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