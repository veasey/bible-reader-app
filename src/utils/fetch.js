import { books } from '../constants/books.js';
import { removeLeadingZeros, padDigits } from '../utils/format.js';

/**
 * @note.
 * Can bible / books be global to all methods here?
 * - shared logic between two written methods, findversesbyquery and find verse?
 * - perhaps skip get book, as this will be via menu???
 */
export const fetchVerse = (ids, bible) => {
  
    let [bookId, chapterId, verseId] = ids;
  
    bookId    = padDigits(bookId, 2);
    chapterId = padDigits(chapterId);
    verseId   = padDigits(verseId);
  
    return bible?.[bookId]?.[chapterId]?.[verseId] ?? undefined;
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