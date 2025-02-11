import React from 'react';
import BookSelectListItem from './BookSelectListItem';

const BookList = ({
    bible,
    setBookName,
    setIsBookSelectMenuOpen,
    setVerses,
    query, 
    heading, 
    testament
}) => {
    return (
        <div className="book-menu-list">
            <h2>{heading}</h2>
            <ul>
                {testament.map((b) => (
                    <BookSelectListItem 
                        bible={bible}
                        setBookName={setBookName}
                        setIsBookSelectMenuOpen={setIsBookSelectMenuOpen}
                        setVerses={setVerses}
                        query={query}
                        book={b}
                    />)
                )}                    
            </ul>
        </div>
    );
}

export default BookList;