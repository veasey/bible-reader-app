/**
 * Show results
 */
const Verses = ({verses}) => {

    if (!verses || !Array.isArray(verses)) {
        return null; // Ensure the component gracefully handles invalid input
    }

    console.log(verses);

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