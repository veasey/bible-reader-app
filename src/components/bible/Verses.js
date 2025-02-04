import './Verses.css';

/**
 * Show results
 */
const Verses = ({verses}) => {

    if (!verses || !Array.isArray(verses) || !verses.length) {
        return;
    }

    return (
        <div className = 'verse-results'>
            {verses.map((result, index) => (
            <p key={index} className=''>
                <strong>{result.book} {result.chapter}:{result.verse}</strong> - {result.text}
            </p>
            ))}
        </div>
    );
}

export default Verses;