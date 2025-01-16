/**
 * @note.
 * Can bible / books be global to all methods here?
 * - shared logic between two written methods, findversesbyquery and find verse?
 * - perhaps skip get book, as this will be via menu???
 */

const findVersesByQuery = (query, bible, books) => {
  
  const bookIds = Object.keys(bible);
  let results = [];

  for (const bookId of bookIds) {

    const chapterIds = Object.keys(bible[bookId]);
    for (const chapterId of chapterIds) {

      const verseIds = Object.keys(bible[bookId][chapterId])
      for (const verseId of verseIds) {

        const verseText = bible[bookId][chapterId][verseId];

        if (verseText.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            book: books.find((b) => bookId === b.key)?.name,
            chapter: chapterId,
            verse: verseId,
            text: verseText,
          });
        }
      }
    }
  }

  return results;
}

const findBook  = (query, bible, books) => {
  return [];
}

const findChapter = (query, bible, books) => {
  return [];
}

const findVerse = (query, bible, books) => {

  const regex = /^([a-zA-Z]+)\s(\d+):(\d+)$/i;
  const padDigits = (num, length = 3) => num.toString().padStart(length, '0');

  const match = query.toLowerCase().trim().match(regex);
  
  if (match) {
    const bookName = match[1];
    const bookId = padDigits(books.find(b => b.name.toLowerCase() === bookName.toLowerCase()).key, 2);

    const chapterId = padDigits(match[2]);
    const verseId   = padDigits(match[3]);
    
    return [{
      book: bookName,
      chapter: chapterId,
      verse: verseId,
      text: bible[bookId][chapterId][verseId],
    }];
  }

  return null;
}

export const handleSearch = (query, bible, books) => {

    console.log('handle search');

    if (!query.trim() || !bible) return;

    const bookPattern = books.join("|")
    const normalizedQuery = query.toLowerCase();
    let results = [];

    console.log('test');

    const regexVerse = /^[a-zA-Z]+\s+\d+:\d+$/i;

    // Option 3: Check for "book chapter:verse" (e.g., "1 john 3:1" or "john 3:5")
    if (regexVerse.test(normalizedQuery)) { console.log('opt3');
      results = [...results, ...findVerse(normalizedQuery, bible, books)];
    }

    // Option 2: Check for "book chapter" (e.g., "1 john 3" or "john 3")
    if (new RegExp(`^[1-3]?\\s*(${bookPattern})\\s+\\d+$`).test(normalizedQuery)) { console.log('opt2');
      results = [...results, ...findChapter(normalizedQuery, bible, books)];
    }

    // Option 1: Book name only (e.g., "1 John" or "John")
    if (new RegExp(`^[1-3]?\\s*(${bookPattern})$`).test(normalizedQuery)) { console.log('opt1');
      results = [...results, ...findBook(normalizedQuery, bible, books)];
    }
        
    return [...results, ...findVersesByQuery(normalizedQuery, bible, books)];
  };