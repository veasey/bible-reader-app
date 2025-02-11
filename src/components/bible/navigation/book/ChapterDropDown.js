import React  from 'react';
import { useVerseCoords } from 'context/VerseCoordsContext';

const ChapterMenu = ({bible}) => {
    
    const {selectedBook, selectedChapter, setSelectedChapter, setSelectedVerse} = useVerseCoords();

    if (!selectedBook) return;

    const chapterNumbers = Object.keys(bible[selectedBook]);
    
    const handleChange = (event) => {
        setSelectedChapter(event.target.value);
        setSelectedVerse(0);
    };

    return (
        <div className="menu-item">
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