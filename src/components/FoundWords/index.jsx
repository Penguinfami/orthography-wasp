import css from './FoundWords.css'

const FoundWords = (props) => {
  return (
    <div style={css} className="FoundWords">
        <h4>Found words</h4>
        <ul>
            {props.words.map((word) => 
                <li key={word}>{word}</li>
            )}
        </ul>
    </div>
  )
}

export default FoundWords