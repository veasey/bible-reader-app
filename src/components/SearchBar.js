import React, { useState, useCallback } from 'react';
import { handleSearch } from '../utils/search';
import debounce from 'lodash/debounce';
import LoadingThrobber from './LoadingThrobber';

const SearchBar = ({bible, books}) => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line
    const debouncedSearch = useCallback(
        debounce((searchQuery) => {
            const results = handleSearch(searchQuery, bible, books);
            setResults(results);
            setLoading(false);
        }, 1500), // 1500ms debounce delay
        [bible, books] 
    );

    const onSearch = (event) => {
        setLoading(true);
        const value = event.target.value;
        setQuery(value);
        if (query.length >= 3) {
            debouncedSearch(value); 
        }       
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
            {loading && <LoadingThrobber message="Searching for verses..." />}
            {query && !results && <div><p>No results found</p></div>}
            {results && 
            <div>
                {results.map((result, index) => (
                <p key={index}>
                    <strong>{result.book} {result.chapter}:{result.verse}</strong> - {result.text}
                </p>
                ))}
            </div>
            }
        </>
    );
}

export default SearchBar;
