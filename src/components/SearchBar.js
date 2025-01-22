import React, { useState, useCallback } from 'react';
import { handleSearch } from '../utils/search';
import debounce from 'lodash/debounce';
import LoadingThrobber from './LoadingThrobber';

const SearchBar = ({bible, selectedBook}) => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line
    const debouncedSearch = useCallback(
        debounce((searchQuery) => {
            const results = handleSearch(searchQuery, bible);
            setResults(results);
            setLoading(false);
        }, 1500), // 1500ms debounce delay
        [bible] 
    );

    const onSearch = (event) => {
        setLoading(true);
        const value = event.target.value;
        setQuery(value);
        if (query.length >= 3) {
            debouncedSearch(value); 
        }       
    }

    const FoundVerses = () => {
        return (
            results && results.length > 0 && (
                <div>
                    {results.map((result, index) => (
                    <p key={index}>
                        <strong>{result.book} {result.chapter}:{result.verse}</strong> - {result.text}
                    </p>
                    ))}
                </div>
            )
        );
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
            {query && query.length > 0 && results?.length === 0 && (
                <div><p>No results found</p></div>
            )}
            {selectedBook && 
                <h2>Selected Book {selectedBook.name}</h2>
            }
            <FoundVerses />
        </>
    );
}

export default SearchBar;
