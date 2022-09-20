import css from './BeginPage.css'
const BeginPage = (props) => {
  return (
    <div style={css} className="BeginPage">
        <h1>ATTEMPT AT SPELLING BEE</h1>
        <button onClick={props.startGame}>Play</button>
    </div>
  )
}

export default BeginPage