import { useRef } from 'react'
import css from './index.css'

const InputField = (props) => {

    return (
        <div style={css} className="InputField">
            <input ref={props.inputRef} list="autocompleteOff" autocomplete="off" ></input>
        </div>
    )
}

export default InputField