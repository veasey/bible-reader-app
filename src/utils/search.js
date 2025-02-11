import { books } from '../constants/books.js';
import { fetchVerses } from '../utils/fetch.js';

export const findVersesByQuery = (query, bible) => {

	const bookIds = Object.keys(bible);
	let results = [];

	if (!query) {
		console.log('no query');
		return results;
	}

	for (const bookId of bookIds) {

		const chapterIds = Object.keys(bible[bookId]);
		for (const chapterId of chapterIds) {

			const verseIds = Object.keys(bible[bookId][chapterId])
			for (const verseId of verseIds) {

				let verse = bible[bookId][chapterId][verseId];

				if (verse.toLowerCase().includes(query.toLowerCase())) {
					results.push({
						book:     books.find((b) => bookId === b.key)?.name,
						chapter:  chapterId,
						verse:    verseId,
						text:     verse
					});
				}
			}
		}
	}
	
	return results;
}

const findVerse = (query, bible, regex, setSelectedBook, setSelectedChapter, setSelectedVerse) => {

  const match = query.toLowerCase().trim().match(regex);
  
  if (match) {
    const { key: bookId } = books.find(b => b.name.toLowerCase() === match[1].toLowerCase()) || {};
    const ids = [bookId, match[2], match[3] ?? 1];
    const verse = fetchVerses(ids, bible);
    
    if (verse) {
    
      setSelectedBook(bookId);
      setSelectedChapter( match[2]);
      setSelectedVerse(match[3] ?? 1);

      return [verse];
    }
  }

  return [];
}

const findFirstVerseFromBook = (bible, key, setSelectedBook, setSelectedChapter, setSelectedVerse) => {

  setSelectedBook(key);
  setSelectedChapter(1);
  setSelectedVerse(1);

  return [fetchVerses([key, 1, 1], bible)];
}

export const getBibleScope = (bible, selectedBook) => {

  if (selectedBook) {
    return {[selectedBook]: bible[selectedBook]};
  }

  return bible;
}

export const handleSearch = (query, bible, selectedBook, setSelectedBook, setSelectedChapter, setSelectedVerse) => {

    const normalizedQuery = query.toLowerCase().trim();
    let results = [];

    if (normalizedQuery.length === 0 || !bible) return;

    // Option 1: Check for "book chapter:verse" (e.g., "1 john 3:1" or "john 3:5")
    const regexChapterOrVerse = /^(\d*\s?[a-zA-Z]+)\s+(\d+)(?::(\d+))?$/i;
    if (regexChapterOrVerse.test(normalizedQuery)) {
      results = [...results, ...findVerse(normalizedQuery, bible, regexChapterOrVerse, setSelectedBook, setSelectedChapter, setSelectedVerse)];
    }

    // Option 2: Book name only (e.g., "1 John" or "John")
    const book = books.find(b => b.name.toLowerCase() === normalizedQuery)?.key;
    if (book) {
      results = [...results, ...findFirstVerseFromBook(bible, book, setSelectedBook, setSelectedChapter, setSelectedVerse)];
    }

    let filteredBible = getBibleScope(bible, selectedBook);
    return [...results, ...findVersesByQuery(normalizedQuery, filteredBible)];
};