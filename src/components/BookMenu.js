import React, { useState } from 'react';
import './BookMenu.css';
import { books } from '../constants/books.js';
import ChapterDropDown from './ChapterDropDown';
import VerseDropDown from './VerseDropDown';

const BookMenu = ({ bible, onBookSelect, onChapterSelect, onVerseSelect, selectedBook, selectedChapter, selectedVerse }) => {

    const [isOpen, setIsOpen] = useState(false);

    const oldTestamentBooks = books.slice(0,40);
    const newTestamentBooks = books.slice(40);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const ClickableBookName = (b) => {

        const [isClicked, setIsClicked] = useState(false);
        const book = b.book; // @hack: unsure why array map puts object under parent of itself

        const handleBookClick = (book) => {
            onBookSelect(book);
            setIsClicked(!isClicked);
            setIsOpen(false);
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

                {/* Burger Icon */}
                <div>
                    <button className="burger-icon" onClick={toggleMenu}>
                        {isOpen ? "✕" : "☰"} {selectedBook ? selectedBook.name : 'Select Book'}
                    </button>
                </div>

                {/* Chapter Drop DOwn */}
                <ChapterDropDown bible={bible} selectedBook={selectedBook} onChapterSelect={onChapterSelect} selectedChapter={selectedChapter} />
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
