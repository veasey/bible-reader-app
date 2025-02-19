import { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

/**
 * Context for the "coordinates" of a VerseCoords.
 * This includes what book, chapter, and verse.
 */

const VerseCoordsContext = createContext();

export const VerseCoordsProvider = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState(() => {
    // Initialize from sessionStorage if available
    const savedBook = Cookies.get('selectedBook');
    return savedBook ? JSON.parse(savedBook) : 0;
  });
  
  const [selectedChapter, setSelectedChapter] = useState(() => {
    const savedChapter = Cookies.get('selectedChapter');
    return savedChapter ? JSON.parse(savedChapter) : 0;
  });
  
  const [selectedVerse, setSelectedVerse] = useState(() => {
    const savedVerse = Cookies.get('selectedVerse');
    return savedVerse ? JSON.parse(savedVerse) : 0;
  });
  
  const [bookName, setBookName] = useState(() => {
    const savedBookName = Cookies.get('bookName');
    return savedBookName ? savedBookName : '';
  });

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    const daysTillExpire = 7;
    Cookies.set('selectedBook', selectedBook, { expires: daysTillExpire });
    Cookies.set('selectedChapter', selectedChapter, { expires: daysTillExpire });
    Cookies.set('selectedVerse', selectedVerse, { expires: daysTillExpire });
    Cookies.set('bookName', bookName, { expires: daysTillExpire });
  }, [selectedBook, selectedChapter, selectedVerse, bookName]);

  return (
    <VerseCoordsContext.Provider
      value={{
        selectedBook,
        setSelectedBook,
        selectedChapter,
        setSelectedChapter,
        selectedVerse,
        setSelectedVerse,
        bookName,
        setBookName
      }}
    >
      {children}
    </VerseCoordsContext.Provider>
  );
};

export const useVerseCoords = () => useContext(VerseCoordsContext);
