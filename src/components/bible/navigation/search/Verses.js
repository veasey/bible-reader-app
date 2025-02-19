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

            {currentVerses.map((result, index) => (
                <p className='verse' key={index}>
                    <strong>{result.book} {result.chapter}:{result.verse}</strong> - {result.text}
                </p>
            ))}

            <div class="button-container">
                {currentPage > 0 && verses.length > itemsPerPage &&
                    <button className='prev' onClick={() => handleBackButtonClick()}>
                        ⬅️
                    </button>
                }
                {currentPage < lastPage && verses.length > itemsPerPage &&
                    <button className='next' onClick={() => handleNextButtonClick()}>
                        ➡️
                    </button>
                }
            </div>           
        </div>
    );
}

export default SearchResultVerses;