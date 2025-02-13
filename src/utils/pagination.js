/**
 * Get Last Verse ID
 * @param {Number} bookId 
 * @param {Number} chapterId 
 * @param {Object} bible 
 * @returns {Number}
 */
export const getLastVerse = (bookId, chapterId, bible) => {
        
    if (bible[bookId] && bible[bookId][chapterId]) {
        const verses = Object.keys(bible[bookId][chapterId]);
        return Math.max(...verses.map(Number));
    }
    
    return 0;
};

/**
 * Get Last Chapter ID
 * @param {Number} bookId 
 * @param {Number} chapterId 
 * @param {Object} bible 
 * @returns {Number}
 */
export const getLastChapter = (bookId, chapterId, bible) => {
        
    if (bible[bookId]) {
        const chapters = Object.keys(bible[bookId]);
        return Math.max(...chapters.map(Number));
    }
    
    return 0;
};