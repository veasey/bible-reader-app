import React, { useState, useCallback } from 'react';
import { handleSearch } from '../utils/search';
import debounce from 'lodash/debounce';
import LoadingThrobber from './LoadingThrobber';

const SearchBar = ({bible, indexState, index, onSearchResult, verses}) => {

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const debouncedSearch = useCallback(
        debounce((searchQuery) => {
            const results = handleSearch(searchQuery, bible, indexState, index);
            onSearchResult(results);
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
            {query && query.length > 0 && verses?.length === 0 && (
                <div><p>No results found</p></div>
            )}
        </>
    );
}

export default SearchBar;
