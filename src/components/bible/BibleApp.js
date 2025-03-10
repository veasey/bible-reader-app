import React, { useState, useEffect } from 'react';
import { VerseCoordsProvider } from 'context/VerseCoordsContext';
import LoadingThrobber from 'components/bible/navigation/search/LoadingThrobber';
import Menu from 'components/bible/navigation/Menu';
import SearchResultVerses from 'components/bible/navigation/search/Verses';
import Verses from 'components/bible/navigation/book/Verses';
import './Verses.css';

const BibleApp = () => {

  // bible data
  const [bible, setBible] = useState({});
  const [currentTranslation, setCurrentTranslation] = useState('kjv');

  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/bibles/' + currentTranslation + '.json')
      .then((response) => response.json())
      .then((data) => {
        setBible(data);
      })
      .catch((error) => console.error('Error loading Bible:', error));
  }, [currentTranslation]);

  return (
    <VerseCoordsProvider>

        {bible && <>
          <Menu 
            bible={bible} 
            setVerses={setVerses} 
            verses={verses} 
            setLoading={setLoading} 
            setQuery={setQuery}
            query={query}
          />

          <div className="body">

            {/* Feedback */}
            {loading && <LoadingThrobber message="Searching for verses..." />}
            {!loading && query && query.length > 0 && verses?.length === 0 && (
                <div style={{padding: '20px'}}>
                    <p>No results found</p>
                </div>
            )}

            {/* Regular Verses */}
            {!loading && query.length === 0 &&
              <Verses bible={bible} verses={verses} />
            }

            {/* Search Result Verses */}
            {!loading && query.length >= 1 &&
              <SearchResultVerses bible={bible} verses={verses} />
            }
          </div>
        </>}
    </VerseCoordsProvider>
  );
};

export default BibleApp;
