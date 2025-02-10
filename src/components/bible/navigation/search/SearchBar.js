import React, { useCallback } from 'react';
import { handleSearch } from 'utils/search';
import debounce from 'lodash/debounce';

const SearchBar = ({bible, setSelectedBook, setSelectedChapter, setSelectedVerse, selectedBook, onSearchResult, verses, query, setQuery, setLoading}) => {

    const indexState = [setSelectedBook, setSelectedChapter, setSelectedVerse];

    const debouncedSearch = useCallback(
        debounce((searchQuery) => {
            let results = handleSearch(searchQuery, bible, indexState, selectedBook);
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
    }

    return (
        <div className="menu-item">
            <input
                type="text"
                placeholder="Search for a verse or phrase..."
                value={query}
                onChange={onSearchType}
            />
            <button onClick={clearQuery}>↩️</button>
            <button onClick={onSearchClick}>🔍 Search</button>
        </div>
    );
}

export default SearchBar;
