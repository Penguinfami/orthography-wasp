import HoneyComb from "./HoneyComb"

import { useState, useReducer, useRef, useEffect, useCallback } from 'react'
import InputField from "./InputField"

const InputContainer = (props) => {

    const inputRef = useRef()


    const onEnter = () => {
        let word = inputRef.current.value
        if (props.onEnter(word.toLowerCase())){
            inputRef.current.value = ""
        } else {

        }
    }

    const handleKeyDown = useCallback((e) => {
        console.log(e.key)
        if ("abcdefghijklmnopqrstuvwxwz".includes(e.key.toLowerCase())){
            inputRef.current.focus()
            return
        }
        switch(e.key){
            case "Enter":
                console.log("Enter key")
                onEnter()
                return;
            case "Backspace":
                inputRef.current.value = inputRef.current.value.slice(0, inputRef.current.value.length - 1)
            default: return
        }
    }, [onEnter])

    useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    return (
        <div className="InputContainer">
            <InputField inputRef={inputRef}/>
            <HoneyComb centreLetter={props.centreLetter} letters={props.letters}/>
            <div>
                <button onClick={onEnter}>ENTER</button>
                <button onClick={ () => inputRef.current.value = ""}>CLEAR</button>
            </div>
        </div>
    )
}

export default InputContainer