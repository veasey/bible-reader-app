import { createContext, useContext, useState, useEffect } from "react";

/**
 * Context for the "coordinates" of a VerseCoords.
 * This includes what book, chapter, and verse.
 */

const VerseCoordsContext = createContext();

export const VerseCoordsProvider = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState(() => {
    // Initialize from sessionStorage if available
    const savedBook = sessionStorage.getItem('selectedBook');
    return savedBook ? JSON.parse(savedBook) : 0;
  });
  
  const [selectedChapter, setSelectedChapter] = useState(() => {
    const savedChapter = sessionStorage.getItem('selectedChapter');
    return savedChapter ? JSON.parse(savedChapter) : 0;
  });
  
  const [selectedVerse, setSelectedVerse] = useState(() => {
    const savedVerse = sessionStorage.getItem('selectedVerse');
    return savedVerse ? JSON.parse(savedVerse) : 0;
  });
  
  const [bookName, setBookName] = useState(() => {
    const savedBookName = sessionStorage.getItem('bookName');
    return savedBookName ? savedBookName : '';
  });

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('selectedBook', JSON.stringify(selectedBook));
    sessionStorage.setItem('selectedChapter', JSON.stringify(selectedChapter));
    sessionStorage.setItem('selectedVerse', JSON.stringify(selectedVerse));
    sessionStorage.setItem('bookName', bookName);
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
