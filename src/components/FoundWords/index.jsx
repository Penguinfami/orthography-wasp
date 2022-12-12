import css from './FoundWords.css'

const FoundWords = (props) => {
  return (
    <div style={css} className="FoundWords">
        <h4>You have found {props.words.length} words</h4>
        <ul>
            {props.words.map((word) => 
                <li key={word}><div>{word}</div></li>
            )}
        </ul>
    </div>
  )
}

export default FoundWords