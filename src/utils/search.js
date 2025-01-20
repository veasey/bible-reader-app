import { books } from '../constants/books.js';

/**
 * @note.
 * Can bible / books be global to all methods here?
 * - shared logic between two written methods, findversesbyquery and find verse?
 * - perhaps skip get book, as this will be via menu???
 */

const getVerseFromBible = (ids, bible) => {

  const padDigits = (num, length = 3) => num.toString().padStart(length, '0');

  let [bookId, chapterId, verseId] = ids;

  bookId    = padDigits(bookId, 2);
  chapterId = padDigits(chapterId);
  verseId   = padDigits(verseId);

  return bible?.[bookId]?.[chapterId]?.[verseId] ?? undefined;
}

const findVersesByQuery = (query, bible) => {

  const removeLeadingZeros = (paddedNum) => {
    if (!paddedNum || isNaN(paddedNum)) {
      return "Invalid input";
    }
    return parseInt(paddedNum, 10);
  }
  
  const bookIds = Object.keys(bible);
  let results = [];

  for (const bookId of bookIds) {

    const chapterIds = Object.keys(bible[bookId]);
    for (const chapterId of chapterIds) {

      const verseIds = Object.keys(bible[bookId][chapterId])
      for (const verseId of verseIds) {

        const ids = [bookId, chapterId, verseId];
        const verseText = getVerseFromBible(ids, bible);
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

  return results;
}

const findBook  = (query, bible) => {
  return [];
}

const findChapter = (query, bible) => {
  return [];
}

const findVerse = (query, bible) => {

  const regex = /^([a-zA-Z]+)\s(\d+):(\d+)$/i;
  const match = query.toLowerCase().trim().match(regex);
  
  if (match) {
    const { key: bookId, name: bookName } = books.find(b => b.name.toLowerCase() === match[1].toLowerCase()) || {};

    const ids = [bookId, match[2], match[3]];
    const verseText = getVerseFromBible(ids, bible);
    
    if (verseText && verseText.length) {
      return [{
        book:     bookName,
        chapter:  match[2],
        verse:    match[3],
        text:     verseText,
      }];
    }
  }

  return [];
}

export const handleSearch = (query, bible) => {

    if (!query.trim() || !bible) return;

    const bookPattern = books.join("|")
    const normalizedQuery = query.toLowerCase();
    let results = [];

    const regexVerse = /^[a-zA-Z]+\s+\d+:\d+$/i;

    // Option 3: Check for "book chapter:verse" (e.g., "1 john 3:1" or "john 3:5")
    if (regexVerse.test(normalizedQuery)) {
      results = [...results, ...findVerse(normalizedQuery, bible, books)];
    }

    // Option 2: Check for "book chapter" (e.g., "1 john 3" or "john 3")
    if (new RegExp(`^[1-3]?\\s*(${bookPattern})\\s+\\d+$`).test(normalizedQuery)) {
      results = [...results, ...findChapter(normalizedQuery, bible, books)];
    }

    // Option 1: Book name only (e.g., "1 John" or "John")
    if (new RegExp(`^[1-3]?\\s*(${bookPattern})$`).test(normalizedQuery)) {
      results = [...results, ...findBook(normalizedQuery, bible, books)];
    }
        
    return [...results, ...findVersesByQuery(normalizedQuery, bible, books)];
  };