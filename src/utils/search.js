import { books } from '../constants/books.js';
import { fetchVerse } from '../utils/fetch.js';

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
              chapter:  chapterId,
              verse:    verseId,
              text:     verseText
            });
          }
        }
      }
    }
  }

  return results;
}

const findVerse = (query, bible, regex, indexState) => {

  const match = query.toLowerCase().trim().match(regex);
  
  if (match) {
    const { key: bookId } = books.find(b => b.name.toLowerCase() === match[1].toLowerCase()) || {};
    const ids = [bookId, match[2], match[3] ?? 1];
    const verse = fetchVerse(ids, bible);
    
    if (verse) {
    
      const [onBookSelect, onChapterSelect, onVerseSelect] = indexState;
      onBookSelect(bookId);
      onChapterSelect( match[2]);
      onVerseSelect(match[3] ?? 1);

      return [verse];
    }
  }

  return [];
}

const findFirstVerseFromBook = (bible, key, indexState) => {

  const [onBookSelect, onChapterSelect, onVerseSelect] = indexState;

  onBookSelect(key);
  onChapterSelect(1);
  onVerseSelect(1);

  return [fetchVerse([key, 1, 1], bible)];
}

const getBibleScope = (bible, index) => {

  const [bookId] = index;

  if (bookId) {
    return {[bookId]: bible[bookId]};
  }

  return bible;
}

export const handleSearch = (query, bible, indexState, index) => {

    const normalizedQuery = query.toLowerCase().trim();
    let results = [];

    if (normalizedQuery.length === 0 || !bible) return;

    // Option 1: Check for "book chapter:verse" (e.g., "1 john 3:1" or "john 3:5")
    const regexChapterOrVerse = /^(\d*\s?[a-zA-Z]+)\s+(\d+)(?::(\d+))?$/i;
    if (regexChapterOrVerse.test(normalizedQuery)) {
      results = [...results, ...findVerse(normalizedQuery, bible, regexChapterOrVerse, indexState)];
    }

    // Option 2: Book name only (e.g., "1 John" or "John")
    const book = books.find(b => b.name.toLowerCase() === normalizedQuery)?.key;
    if (book) {
      results = [...results, ...findFirstVerseFromBook(bible, book, indexState)];
    }

    bible = getBibleScope(bible, index);
    console.log(bible);
    return [...results, ...findVersesByQuery(normalizedQuery, bible)];
};