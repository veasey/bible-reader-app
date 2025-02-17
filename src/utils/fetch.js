import { books } from '../constants/books.js';

/**
 * fetch book name
 * @param {Number} bookId 
 * @returns {String}
 */
export const fetchBookNameFromBookId = (bookId) => {
    return books.find((b) => bookId === b.key)?.name;
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