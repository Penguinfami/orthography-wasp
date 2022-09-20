import HoneyComb from "./HoneyComb"

import { useState, useReducer } from 'react'
import InputField from "./InputField"

const InputContainer = (props) => {

    const inputReducer = (state, action) => {
        switch(action.type){
            case "CHANGE":
                console.log("c")
                return action.payload

            case "CLEAR":
                return ""

            default: return state
        }
    }

    const [input, inputDispatch] = useReducer(inputReducer, "")

    const onEnter = () => {
        console.log("input is" + input)
        if (props.onEnter(input)){
            inputDispatch({ type: "CLEAR" })
        } else {

        }
    }

    return (
        <div className="InputContainer">
            <InputField setInput={inputDispatch}/>
            <HoneyComb centreLetter={props.centreLetter} letters={props.letters}/>
            <button onClick={onEnter}>ENTER</button>
        </div>
    )
}

export default InputContainer