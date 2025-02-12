import './Verses.css';
import Back from 'components/bible/navigation/book/pagination/Back';

/**
 * Show results
 */
const Verses = ({bible, verses}) => {

    if (!verses || !Array.isArray(verses) || !verses.length) {
        return;
    }

    return (
        <div className = 'verse-results'>

            <Back bible={bible} />

            {verses.map((result, index) => (
            <p key={index} className=''>
                <strong>{result.book} {result.chapter}:{result.verse}</strong> - {result.text}
            </p>
            ))}

        </div>
    );
}

export default Verses;