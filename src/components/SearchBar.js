import React, { useState, useCallback } from 'react';
import { handleSearch } from '../utils/search';
import debounce from 'lodash/debounce';

const SearchBar = ({bible, books}) => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    // eslint-disable-next-line
    const debouncedSearch = useCallback(
        debounce((searchQuery) => {
            const results = handleSearch(searchQuery, bible, books);
            setResults(results);
        }, 1500), // 1500ms debounce delay
        [bible, books] 
    );

    const onSearch = (event) => {
        const value = event.target.value;
        setQuery(value);
        debouncedSearch(value);        
    }

    return (
        <>
            <input
                type="text"
                placeholder="Search for a verse or phrase..."
                value={query}
                onChange={onSearch}
                style={{ marginRight: '10px' }}
            />
            <div>
                {results.map((result, index) => (
                <p key={index}>
                    <strong>{result.book} {result.chapter}:{result.verse}</strong> - {result.text}
                </p>
                ))}
            </div>
        </>
    );
}

export default SearchBar;
