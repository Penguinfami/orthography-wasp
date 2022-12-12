import { useState } from "react"

import FoundWords from "./FoundWords"
import InputContainer from "./InputContainer"

const Container = (props) => {


    return (
        <div className="Container">
            <InputContainer errorMessageOn={props.errorMessageOn} 
                errorMessage={props.errorMessage} 
                letters={props.letters} 
                centreLetter={props.centreLetter} 
                onShuffle={props.onShuffle} 
                onEnter={props.onEnter}
            />
            <FoundWords words={props.foundWords}/>
        </div>
    )
}

export default Container