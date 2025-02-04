import { books } from '../constants/books.js';

export const fetchVerses = (ids, bible) => {

    let [bookId, chapterId, verseId] = ids;

    // no verses
    if (!bookId || !chapterId) {
        return [];
    }

    let bookName = books.find((b) => bookId === b.key)?.name;

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

export const fetchVerse = (bible, bookName, bookId, chapterId, verseId) => {
    return {
        book:     bookName,
        chapter:  chapterId,
        verse:    verseId ?? undefined,
        text:     bible?.[bookId]?.[chapterId]?.[verseId] ?? undefined
    };
};

export const fetchVersesFromChapter = (bookId, chapterId, bible) => {
    return bible?.[bookId]?.[chapterId] ?? undefined;
};
