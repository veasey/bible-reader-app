/**
 * Show results
 */
const Verses = ({verses}) => {

    if (!verses) {
        return;
    }

    return (
        <div>
            {verses.map((result, index) => (
            <p key={index}>
                <strong>{result.book} {result.chapter}:{result.verse}</strong> - {result.text}
            </p>
            ))}
        </div>
    );
}

export default Verses;