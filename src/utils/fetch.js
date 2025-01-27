import { padDigits, removeLeadingZeros } from '../utils/format.js';
import { books } from '../constants/books.js';

/**
 * @note.
 * Can bible / books be global to all methods here?
 * - shared logic between two written methods, findversesbyquery and find verse?
 * - perhaps skip get book, as this will be via menu???
 */
export const fetchVerse = (ids, bible) => {

    let [bookId, chapterId, verseId] = ids;    
    if (!bookId || !chapterId || !verseId) {
        return false;
    }
  
    bookId    = padDigits(bookId, 2);
    chapterId = padDigits(chapterId);
    verseId   = padDigits(verseId);

    return {
        book:     books.find((b) => bookId === b.key)?.name,
        chapter:  removeLeadingZeros(chapterId),
        verse:    removeLeadingZeros(verseId),
        text:     bible?.[bookId]?.[chapterId]?.[verseId] ?? undefined
    };
};

export const fetchChapter = (ids, bible) => {

    let [bookId, chapterId] = ids;
  
    bookId    = padDigits(bookId, 2);
    chapterId = padDigits(chapterId);

    return bible?.[bookId]?.[chapterId] ?? undefined;
};

export const fetchBook = (ids, bible) => {
    return undefined;
};