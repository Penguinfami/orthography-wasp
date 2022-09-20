import HoneyComb from "./HoneyComb"

import { useState, useReducer, useRef } from 'react'
import InputField from "./InputField"

const InputContainer = (props) => {

    const inputRef = useRef()


    const onEnter = () => {
        console.log("input is" + input)
        let word = inputRef.current.value
        if (props.onEnter(word)){
            inputRef.current.value = ""
        } else {

        }
    }

    return (
        <div className="InputContainer">
            <InputField ref={inputRef} setInput={inputDispatch}/>
            <HoneyComb centreLetter={props.centreLetter} letters={props.letters}/>
            <button onClick={onEnter}>ENTER</button>
        </div>
    )
}

export default InputContainer