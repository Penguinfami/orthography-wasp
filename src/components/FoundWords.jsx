const FoundWords = (props) => {
  return (
    <div className="FoundWords">
        <h4>Found words</h4>
        <ul>
            {props.words.map((word) => 
                <li>{word}</li>
            )}
        </ul>
    </div>
  )
}

export default FoundWords