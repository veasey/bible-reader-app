import React, { useState, useEffect } from 'react';
import './Menu.css';
import { books } from 'constants/books.js';
import BookSelectList from './book/BookSelectList';
import BookSelectButton from './book/BookSelectButton';
import ChapterDropDown from './book/ChapterDropDown';
import VerseDropDown from './book/VerseDropDown';
import SearchBar from './search/SearchBar';
import { fetchVerses } from 'utils/fetch.js';

const Menu = ({ bible, setVerses, verses, setLoading, setQuery, query}) => {

    // coords for specific verses
    const [selectedBook, setSelectedBook] = useState(0);
    const [selectedChapter, setSelectedChapter] = useState(0);
    const [selectedVerse, setSelectedVerse] = useState(0);

    const [isBookSelectMenuOpen, setIsBookSelectMenuOpen] = useState(false);
    const [bookName, setBookName] = useState('');

    const oldTestamentBooks = books.slice(0,40);
    const newTestamentBooks = books.slice(40);

    useEffect(() => {
        let verse = fetchVerses([selectedBook, selectedChapter, selectedVerse], bible);
        if (verse) {
            setVerses(verse);
        }
    }, [selectedBook, selectedChapter, selectedVerse, bible]);

    const toggleOpenSelectBookMenu = () => {
        setIsBookSelectMenuOpen(!isBookSelectMenuOpen);
    };

    const clearBookSelection = () => {
        setSelectedBook(0);
        setBookName('');
    };

    const commonProps = {
        bible,
        setSelectedBook,
        setSelectedChapter,
        setSelectedVerse,
        setBookName,
        setIsBookSelectMenuOpen,
        setVerses,
        query
    };

    return (
        <>
            <div className='menu'>
                <div className='menu-container'>

                    <BookSelectButton 
                        onClearBookSelection={clearBookSelection}
                        onToggleIsOpen={toggleOpenSelectBookMenu}
                        isOpen={isBookSelectMenuOpen}
                        bookName={bookName}
                    />
                    <ChapterDropDown 
                        bible={bible} 
                        selectedBook={selectedBook} 
                        onChapterSelect={setSelectedChapter} 
                        selectedChapter={selectedChapter} 
                        onVerseSelect={setSelectedVerse} 
                    />
                    <VerseDropDown 
                        bible={bible}
                        selectedBook={selectedBook}
                        selectedChapter={selectedChapter}
                        selectedVerse={selectedVerse}
                        onVerseSelect={setSelectedVerse}
                    />

                    <div className="menu-item">&nbsp;</div>

                    <SearchBar 
                        bible={bible} 
                        setSelectedBook={selectedBook}
                        setSelectedChapter={setSelectedChapter}
                        setSelectedVerse={setSelectedVerse}
                        selectedBook={selectedBook}
                        onSearchResult={setVerses} 
                        verses={verses} 
                        query={query}
                        setQuery={setQuery}
                        setLoading={setLoading}
                    />
                </div>

                {/* Drop Down Formatted  Book List */}
                {isBookSelectMenuOpen && (
                    <div className="submenu-book-select-container">
                        <div className="book-menu-lists">
                            <BookSelectList {...commonProps} heading="Old Testament" testament={oldTestamentBooks} prefix="old"  />
                            <BookSelectList {...commonProps} heading="New Testament" testament={newTestamentBooks} prefix="new" />
                        </div>
                    </div>
                )}
            </div>

            
        </>
    );
};

export default Menu;
