import { createContext, useContext, useState } from "react";

/**
 * Context for the "coordinates" of a VerseCoords.
 * This includes what book, chapter and VerseCoords.
 */

const VerseCoordsContext = createContext();

export const VerseCoordsProvider = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [selectedVerse, setSelectedVerse] = useState(0);

  return (
    <VerseCoordsContext.Provider
      value={{
        selectedBook,
        setSelectedBook,
        selectedChapter,
        setSelectedChapter,
        selectedVerse,
        setSelectedVerse,
      }}
    >
      {children}
    </VerseCoordsContext.Provider>
  );
};

export const useVerseCoords = () => useContext(VerseCoordsContext);
