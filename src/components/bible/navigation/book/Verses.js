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

            {verses.map((result, index) => (
                <p className='verse' key={index}>
                    <strong>{result.verse}</strong> - {result.text}
                </p>
            ))}
            
            <div class="button-container">
                <Back bible={bible} />
                <Next bible={bible} />
            </div>

        </div>
    );
}

export default Verses;