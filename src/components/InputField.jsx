import { useRef } from 'react'

const InputField = (props) => {

    return (
        <div className="InputField">
            <input ref={props.ref} ></input>
        </div>
    )
}

export default InputField