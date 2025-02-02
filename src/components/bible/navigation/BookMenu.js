import React, { useState } from 'react';
import './BookMenu.css';
import { books } from '../../../constants/books.js';
import ChapterDropDown from './ChapterDropDown.js';
import VerseDropDown from './VerseDropDown.js';
import { findVersesByQuery, getBibleScope } from '../../../utils/search.js';

const BookMenu = ({ bible, indexState, selectedBook, selectedChapter, selectedVerse, query, setVerses}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [bookName, setBookName] = useState('');

    const oldTestamentBooks = books.slice(0,40);
    const newTestamentBooks = books.slice(40);

    const [onBookSelect, onChapterSelect, onVerseSelect] = indexState;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const clearBookSelection = () => {
        onBookSelect(0);
        setBookName('');
    };

    const ClickableBookName = (b) => {

        const [isClicked, setIsClicked] = useState(false);
        const book = b.book; // @hack: unsure why array map puts object under parent of itself

        const handleBookClick = (book) => {

            onBookSelect(book.key);
            setBookName(book.name);
            setIsClicked(!isClicked);
            setIsOpen(false);

            let normalizedQuery = query.toLowerCase().trim();

            if (normalizedQuery.length === 0) {

                // if no query, get entire first chapter
                onChapterSelect(1);
                onVerseSelect(0);
            } else {

                console.log(normalizedQuery);

                // otherwise search for query within current book
                let filteredBible = getBibleScope(bible, book.key);
                let verses = findVersesByQuery(normalizedQuery, filteredBible);
                setVerses(verses);
                onChapterSelect(0);
                onVerseSelect(0);
            }         
        }

        return (
            <li onClick={() => handleBookClick(book)}
                className={isClicked ? "selected" : ""}
            >
                {book.name}
            </li>
        );        
    };

    const BookList = ({heading, testament}) => {
        return (
            <div className="book-menu-list">
                <h2>{heading}</h2>
                <ul>
                    {testament.map((b, i) => (
                        <ClickableBookName book={b} key={i} />
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div>
            <div className='book-menu-container'>
                <div>
                    {/* Select Book Button */}
                    <button className="burger-icon" onClick={toggleMenu}>
                        {isOpen ? "✕" : "☰"} {bookName ? bookName : ' Select Book'}
                    </button>
                    {/* Clear Button */}
                    {bookName &&
                    <button onClick={clearBookSelection}>
                        ↩️ Clear
                    </button>
                    }
                </div>

                {/* Chapter Drop DOwn */}
                <ChapterDropDown bible={bible} selectedBook={selectedBook} onChapterSelect={onChapterSelect} selectedChapter={selectedChapter} onVerseSelect={onVerseSelect} />
                <VerseDropDown bible={bible} selectedBook={selectedBook} selectedChapter={selectedChapter} selectedVerse={selectedVerse} onVerseSelect={onVerseSelect} />
            </div>

            {/* Drop Down Formatted  Book List */}
            {isOpen && (
                <div>
                    <h1>Menu</h1>
                    <div className="book-menu-lists">
                        <BookList heading="Old Testament" testament={oldTestamentBooks} prefix="old" />
                        <BookList heading="New Testament" testament={newTestamentBooks} prefix="new" />
                    </div>
                </div>
            )}

        </div>
    );
};

export default BookMenu;
