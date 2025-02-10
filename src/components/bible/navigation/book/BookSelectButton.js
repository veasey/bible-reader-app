import React from 'react';

const BookSelectButton = ({
    onClearBookSelection,
    onToggleIsOpen,
    isOpen,
    bookName
}) => {
    return (
        <div className="menu-item">
            {/* Select Book Button */}
            <button className="burger-icon" onClick={onToggleIsOpen}>
                {isOpen ? "✕" : "☰"} {bookName ? bookName : ' Select Book'}
            </button>
            {/* Clear Button */}
            {bookName &&
            <button onClick={onClearBookSelection}>
                ↩️ Clear
            </button>
            }
        </div>
    )
}

export default BookSelectButton;