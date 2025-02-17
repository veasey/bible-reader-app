import Back from 'components/bible/navigation/search/pagination/Back';
import Next from 'components/bible/navigation/search/pagination/Next';

const SearchResultVerses = ({bible, verses, currentPage, setCurrentPage}) => {

    if (!verses || !Array.isArray(verses) || !verses.length) {
        return;
    }

    const pageSize = 10;
    const lastPage = Math.round(verses.length / pageSize);

    return (
        <div className = 'verse-results'>

            {currentPage > 0 && verses.length > pageSize &&
                <Back bible={bible} />
            }

            {verses.map((result, index) => (
            <p key={index} className=''>
                <strong>{result.book} {result.chapter}:{result.verse}</strong> - {result.text}
            </p>
            ))}

            {currentPage < lastPage && verses.length > pageSize &&
                <Next bible={bible} />
            }

        </div>
    );
}

export default SearchResultVerses;