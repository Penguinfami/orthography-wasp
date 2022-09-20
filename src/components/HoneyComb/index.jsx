import { useState, useReducer } from 'react'

import css from './HoneyComb.css'
const HoneyComb = (props) => {

    return (
        <div style={css} className="HoneyComb">
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