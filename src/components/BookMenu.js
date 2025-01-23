import React, { useState } from 'react';
import './BookMenu.css';
import { books } from '../constants/books.js';

const BookMenu = ({ onBookSelect }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const oldTestamentBooks = books.slice(0,40);
    const newTestamentBooks = books.slice(40);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const ClickableBookName = (book, index, key) => {

        const [isClicked, setIsClicked] = useState(false);

        const handleBookClick = (book) => {
            onBookSelect(book);
            setSelectedBook(book);
            setIsClicked(!isClicked);
        }

        return (
            <li key={key}
                onClick={() => handleBookClick(book.book)}
                className={isClicked ? "selected" : ""}
            >
                {book.book.name}
            </li>
        );        
    };

    const BookList = ({heading, books, prefix}) => {

        return (
            <div className="book-menu-list">
                <h2>{heading}</h2>
                <ul>
                    {books.map((book, index) => (
                        <ClickableBookName book={book} index={index} key={prefix + index} />
                    ))}
                </ul>
            </div>
        );
    }   

    return (
        <div className='book-menu-container'>

        {/* Burger Icon */}
        <button className="burger-icon" onClick={toggleMenu}>
            {isOpen ? "✕" : "☰"} {selectedBook ? selectedBook.name : 'Select Book'}
        </button>

        {isOpen && (
            <div>
                <h1>Menu</h1>
                <div className="book-menu-lists">
                    <BookList heading="Old Testament" books={oldTestamentBooks} prefix="old" />
                    <BookList heading="New Testament" books={newTestamentBooks} prefix="new" />
                </div>
            </div>
        )}
        </div>
    );
};

export default BookMenu;
