import { useState, useReducer } from 'react'
import InputField from "./InputField"

const HoneyComb = (props) => {

    return (
        <div className="HoneyComb">
            {
                props.letters.map((letter) => 
                    <div className={`letter ${letter}`}>
                        {letter !== props.centreLetter ? letter : <strong>{letter}</strong>}
                    </div>
                )
            }
        </div>
    )
}

export default HoneyComb