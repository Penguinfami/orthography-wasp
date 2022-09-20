import css from './InvalidAnswer.css'

const InvalidAnswer = (props) => {
  return (
    <div style={css} className="InvalidAnswer">
        {props.message}
    </div>
  )
}

export default InvalidAnswer