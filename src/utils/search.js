import { books } from '../constants/books.js';
import { removeLeadingZeros } from '../utils/format.js';
import { fetchVerse, fetchChapter, fetchBook } from '../utils/fetch.js';

const findVersesByQuery = (query, bible) => {
  
  const bookIds = Object.keys(bible);
  let results = [];

  if (!query) {
    return results;
  }

  for (const bookId of bookIds) {

    const chapterIds = Object.keys(bible[bookId]);
    for (const chapterId of chapterIds) {

      const verseIds = Object.keys(bible[bookId][chapterId])
      for (const verseId of verseIds) {

        const ids = [bookId, chapterId, verseId];
        const verse = fetchVerse(ids, bible);

        if (verse) {

          let verseText = verse.text;
          if (verseText.toLowerCase().includes(query.toLowerCase())) {
            results.push({
              book:     books.find((b) => bookId === b.key)?.name,
              chapter:  removeLeadingZeros(chapterId),
              verse:    removeLeadingZeros(verseId),
              text:     verseText
            });
          }
        }
      }
    }
  }

  return results;
}

const findVerse = (query, bible) => {

  const regex = /^(\d*\s?[a-zA-Z]+)\s(\d+):(\d+)$/i;
  const match = query.toLowerCase().trim().match(regex);
  
  if (match) {
    const { key: bookId, name: bookName } = books.find(b => b.name.toLowerCase() === match[1].toLowerCase()) || {};

    const ids = [bookId, bookName, match[3]];
    return fetchVerse(ids, bible);
  }

  return [];
}

export const handleSearch = (query, bible) => {

    if (!query.trim() || !bible) return;

    const bookPattern = books.join("|")
    const normalizedQuery = query.toLowerCase();
    let results = [];

    // Option 3: Check for "book chapter:verse" (e.g., "1 john 3:1" or "john 3:5")
    const regexVerse = /^\d*\s?[a-zA-Z]+\s+\d+:\d+$/i;
    if (regexVerse.test(normalizedQuery)) {
      results = [...results, ...findVerse(normalizedQuery, bible)];
    }

    
    // Option 2: Check for "book chapter" (e.g., "1 john 3" or "john 3")
    // if (new RegExp(`^[1-3]?\\s*(${bookPattern})\\s+\\d+$`).test(normalizedQuery)) {
    //   results = [...results, ...fetchChapter(normalizedQuery, bible, books)];
    // }

    // Option 1: Book name only (e.g., "1 John" or "John")
    // if (new RegExp(`^[1-3]?\\s*(${bookPattern})$`).test(normalizedQuery)) {
    //   results = [...results, ...fetchBook(normalizedQuery, bible, books)];
    // }
        
    return [...results, ...findVersesByQuery(normalizedQuery, bible, books)];
};