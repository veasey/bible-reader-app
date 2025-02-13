import './Verses.css';
import Back from 'components/bible/navigation/book/pagination/Back';
import Next from 'components/bible/navigation/book/pagination/Next';


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

            <Next bible={bible} />

        </div>
    );
}

export default Verses;