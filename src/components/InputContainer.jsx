import HoneyComb from "./HoneyComb"

import { useState, useReducer, useRef, useEffect, useCallback } from 'react'
import InputField from "./InputField"
import './style.css'
import InvalidAnswer from "./InvalidAnswer"
const InputContainer = (props) => {

    const inputRef = useRef()

    const [ clearTimer, setClearTimer ] = useState(null)

    const onEnter = () => {
        let word = inputRef.current.value
        props.onEnter(word.toLowerCase())
        setClearTimer(setTimeout(() => { inputRef.current.value = ""; setClearTimer(null)}, 500))
    }

    const onCombClick = (letter) => {
        const selectionStart = inputRef.current.selectionStart;
        const value = inputRef.current.value;
        inputRef.current.value = value.slice(0, selectionStart) + letter + value.slice(selectionStart);
    }

    const handleKeyDown = useCallback((e) => {
        console.log(e.key)
        if ("abcdefghijklmnopqrstuvwxwz".includes(e.key.toLowerCase())){
            if (clearTimer != null) {
                
                clearTimeout(clearTimer)
                inputRef.current.value = ""
                setClearTimer(null)
            }
            inputRef.current.focus()
            return
        }
        switch(e.key){
            case "Enter":
                console.log("Enter key")
                onEnter()
                return;
            case "Backspace":
                inputRef.current.focus()
            default: return
        }
    }, [onEnter])

    useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    return (
        <div className="InputContainer">
            {props.errorMessageOn ? <InvalidAnswer message={props.errorMessage}/> : ""}
            <InputField inputRef={inputRef}/>
            <HoneyComb onClick={onCombClick} centreLetter={props.centreLetter} letters={props.letters}/>
            <div style={{ width: '100%'}}>
                <button role="button" className='optionButton' onClick={ () => inputRef.current.value = ""}>CLEAR</button>
                <button role="button" className='optionButton' onClick={props.onShuffle}>SHUFFLE</button>
                <button role="button" className='optionButton' onClick={onEnter}>ENTER</button>
            </div>
        </div>
    )
}

export default InputContainer