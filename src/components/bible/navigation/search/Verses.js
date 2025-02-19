import React, { useState } from 'react';


const SearchResultVerses = ({bible, verses}) => {

    const [currentPage, setCurrentPage] = useState(0);

    if (!verses || !Array.isArray(verses) || !verses.length) {
        return;
    }

    const itemsPerPage = 10;
    const lastPage = Math.round(verses.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const currentVerses = verses.slice(startIndex, startIndex + itemsPerPage);

    const handleBackButtonClick = () => { setCurrentPage(currentPage - 1); };
    const handleNextButtonClick = () => { setCurrentPage(currentPage + 1); };

    return (
        <div className='verse-container'>

            {currentPage > 0 && verses.length > itemsPerPage &&
                <button onClick={() => handleBackButtonClick()}>
                    ⬅️
                </button>
            }

            <div className='verse-column'>
                <div className='verse-column-content'>
                    {currentVerses.map((result, index) => (
                        <p key={index}>
                            <strong>{result.book} {result.chapter}:{result.verse}</strong> - {result.text}
                        </p>
                    ))}
                </div>
            </div>

            {currentPage < lastPage && verses.length > itemsPerPage &&
                <button onClick={() => handleNextButtonClick()}>
                    ➡️
                </button>
            }

        </div>
    );
}

export default SearchResultVerses;