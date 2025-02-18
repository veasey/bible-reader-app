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
        <div className='verse-container'>

            <Back bible={bible} />

            <div className='verse-column'>
                <div className='verse-column-content'>
                    {verses.map((result, index) => (
                        <p key={index}>
                            <strong>{result.verse}</strong> - {result.text}
                        </p>
                    ))}
                </div>
            </div>

            <Next bible={bible} />

        </div>
    );
}

export default Verses;