import React, { useCallback } from 'react';
import { handleSearch } from 'utils/search';
import { useVerseCoords } from 'context/VerseCoordsContext';
import debounce from 'lodash/debounce';

const SearchBar = ({bible, onSearchResult, verses, query, setQuery, setLoading}) => {

    const {selectedBook, setSelectedBook, setSelectedChapter, setSelectedVerse} = useVerseCoords();

    const debouncedSearch = useCallback(
        debounce((searchQuery) => {
            let results = handleSearch(searchQuery, bible, selectedBook, setSelectedBook, setSelectedChapter, setSelectedVerse);
            onSearchResult(results);
            setLoading(false);
        }, 1500), // 1500ms debounce delay
        [bible, selectedBook] 
    );

    const onSearchType = (event) => {
        const value = event.target.value;
        setQuery(value);
        if (value.length >= 3) {
            setLoading(true);
            debouncedSearch(value); 
        }       
    }

    const onSearchClick = () => {
        setLoading(true);
        debouncedSearch(query);
    }

    const clearQuery = () => {
        setQuery('');
        setSelectedVerse([]);
    }

    return (
        <>
            <div className="menu-item">
                <input
                    type="text"
                    placeholder="Search for a verse or phrase..."
                    value={query}
                    onChange={onSearchType}
                />
            </div>
            <div className="menu-item">
                <button onClick={clearQuery}>↩️</button>
            </div>
            <div className="menu-item">
                <button onClick={onSearchClick}>🔍 Search</button>
            </div>
        </>
    );
}

export default SearchBar;
