import React, { useState, useEffect } from 'react';
import './Menu.css';
import { books } from 'constants/books.js';
import BookSelectList from './book/BookSelectList';
import BookSelectButton from './book/BookSelectButton';
import ChapterDropDown from './book/ChapterDropDown';
import RandomVerseButton from 'components/bible/navigation/RandomVerseButton';
import SearchBar from './search/SearchBar';
import VerseDropDown from './book/VerseDropDown';
import { fetchVerses } from 'utils/fetch.js';
import { useVerseCoords } from 'context/VerseCoordsContext';
import { motion } from "framer-motion";

const Menu = ({ bible, setVerses, verses, setLoading, setQuery, query}) => {

    const { selectedBook, setSelectedBook, selectedChapter, selectedVerse, bookName, setBookName } = useVerseCoords();

    const [isBookSelectMenuOpen, setIsBookSelectMenuOpen] = useState(false);

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
        setBookName,
        setIsBookSelectMenuOpen,
        setVerses,
        query
    };

    const MenuSpacer = () => {
        return (<div className="menu-item">&nbsp;</div>);
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
                    <ChapterDropDown bible={bible} setQuery={setQuery} />
                    <VerseDropDown bible={bible} setQuery={setQuery} />

                    <MenuSpacer />

                    <SearchBar 
                        bible={bible} 
                        onSearchResult={setVerses} 
                        verses={verses} 
                        query={query}
                        setQuery={setQuery}
                        setLoading={setLoading}
                    />

                    <MenuSpacer />
                    <RandomVerseButton bible={bible} />
                </div>

                {/* Drop Down Formatted  Book List */}
                {isBookSelectMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="submenu-book-select-container"
                    >
                        <div className="book-menu-lists">
                            <BookSelectList {...commonProps} heading="Old Testament" testament={oldTestamentBooks} prefix="old"  />
                            <BookSelectList {...commonProps} heading="New Testament" testament={newTestamentBooks} prefix="new" />
                        </div>
                    </motion.div>
                )}
            </div>

            
        </>
    );
};

export default Menu;
