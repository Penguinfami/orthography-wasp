import HoneyComb from "./HoneyComb"

import { useState, useReducer, useRef, useEffect, useCallback } from 'react'
import InputField from "./InputField"

const InputContainer = (props) => {

    const inputRef = useRef()


    const onEnter = () => {
        let word = inputRef.current.value
        if (props.onEnter(word)){
            inputRef.current.value = ""
        } else {

        }
    }

    const handleKeyDown = useCallback((e) => {
        switch(e.key){
            case "Enter":
                console.log("Enter key")
                onEnter()
                return;
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
            <button onClick={onEnter}>ENTER</button>
        </div>
    )
}

export default InputContainer