import { useState } from "react"

import FoundWords from "./FoundWords"
import InputContainer from "./InputContainer"

const Container = (props) => {


    return (
        <div className="Container">
            <InputContainer letters={props.letters} centreLetter={props.centreLetter} onEnter={props.onEnter}/>
            <FoundWords words={props.foundWords}/>
        </div>
    )
}

export default Container