export const handleSearch = (query, bible, books) => {

    console.log(query);

    if (!query.trim() || !bible) return;

    const results = [];
    
    const bookIds = Object.keys(bible);
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
  };