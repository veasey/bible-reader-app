import { books } from '../constants/books.js';

export const fetchVerse = (ids, bible) => {

    let [bookId, chapterId, verseId] = ids;    
    if (!bookId || !chapterId || !verseId) {
        return false;
    }

    return {
        book:     books.find((b) => bookId === b.key)?.name,
        chapter:  chapterId,
        verse:    verseId,
        text:     bible?.[bookId]?.[chapterId]?.[verseId] ?? undefined
    };
};

export const fetchVersesFromChapter = (ids, bible) => {

    let [bookId, chapterId] = ids;
    return bible?.[bookId]?.[chapterId] ?? undefined;
};
