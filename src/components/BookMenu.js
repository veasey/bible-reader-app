import React, { useState } from 'react';
import './BookMenu.css';
import { books } from '../constants/books.js';

const BookMenu = ({ onBookSelect }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const oldTestamentBooks = books.slice(0,40);
    const newTestamentBooks = books.slice(40);

    return (
        <div className='book-menu-container'>

        {/* Burger Icon */}
        <button className="burger-icon" onClick={toggleMenu}>
            {isOpen ? "✕" : "☰"}
        </button>

        {isOpen && (
            <div>
                <h1>Menu</h1>
                <div className="book-menu-lists">
                    <div>
                        <h2>Old Testament</h2>
                        <ul>
                            {oldTestamentBooks.map((book, index) => (
                                <li key={`old-${index}`} onClick={() => onBookSelect(book)}>
                                    {book.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2>New Testament</h2>
                        <ul>
                            {newTestamentBooks.map((item, index) => (
                                <li key={`new-${index}`}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
};

export default BookMenu;
