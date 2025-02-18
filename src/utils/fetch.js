import { books } from '../constants/books.js';

/**
 * fetch random coords
 * @param {Object} bible
 * @returns {Object}
 */
export const fetchRandomVerse = (bible) => {

    if (!bible) return false;

    const books = Object.keys(bible);
    const randomBook = Number(books[Math.floor(Math.random() * books.length)]);

    if (!bible[randomBook]) return false;

    const chapters = Object.keys(bible[randomBook]);
    const randomChapter = Number(chapters[Math.floor(Math.random() * chapters.length)]);

    if (!bible[randomBook][randomChapter]) return false;

    const verses = Object.keys(bible[randomBook][randomChapter]);
    const randomVerse = Number(verses[Math.floor(Math.random() * verses.length)]);

    return {
        bookId: randomBook, 
        chapterId: randomChapter, 
        verseId: randomVerse,
        bookname: fetchBookNameFromBookId(randomBook)
    };
}

/**
 * fetch book name
 * @param {Number} bookId 
 * @returns {String}
 */
export const fetchBookNameFromBookId = (bookId) => {
    return books.find((b) => bookId === Number(b.key))?.name;
}

/**
 * Fetch Verses
 * @param {Array<Number>} ids 
 * @param {Object} bible 
 * @returns {Array}
 */
export const fetchVerses = (ids, bible) => {

    let [bookId, chapterId, verseId] = ids;

    // no verses
    if (!bookId || !chapterId) {
        return [];
    }

    let bookName = fetchBookNameFromBookId(bookId);

    // all verses with chapter
    if (!verseId) {

        let chapterVerses = fetchVersesFromChapter(bookId, chapterId, bible);
    
        // Check if `chapterVerses` is a valid object
        if (!chapterVerses || typeof chapterVerses !== "object") {
            console.error("Invalid data format for chapterVerses", chapterVerses);
            return [];
        }

        // return formatted verses in chapter
        return Object.keys(chapterVerses).map((verseId) => (fetchVerse(bible, bookName, bookId, chapterId, verseId)));
    }

    // single verse
    return [fetchVerse(bible, bookName, bookId, chapterId, verseId)];
};

/**
 * Fetch verse
 * @param {Object} bible 
 * @param {String} bookName 
 * @param {Number} bookId 
 * @param {Number} chapterId 
 * @param {Number} verseId 
 * @returns {Object}
 */
export const fetchVerse = (bible, bookName, bookId, chapterId, verseId) => {
    return {
        book:     bookName,
        chapter:  chapterId,
        verse:    verseId ?? undefined,
        text:     bible?.[bookId]?.[chapterId]?.[verseId] ?? undefined
    };
};

/**
 * Fetch verses from chapter
 * @param {Number} bookId 
 * @param {Number} chapterId 
 * @param {Object} bible 
 * @returns {Array<Object>}
 */
export const fetchVersesFromChapter = (bookId, chapterId, bible) => {
    return bible?.[bookId]?.[chapterId] ?? undefined;
};