import { useState, useReducer } from 'react'
import { ReactComponent as Hexagon } from '../../assets/hexagon.svg';
import css from './HoneyComb.css'
const HoneyComb = (props) => {

    const centreLetter = props.centreLetter;
    console.log(centreLetter)
    const otherLetters = props.letters.filter(letter => letter !== centreLetter);
    console.log(props)
    return (
        <div style={css} className="HoneyComb">
            {
                otherLetters.map((letter, index) => 
                    <div className={`Comb Comb-${index} ${letter}`}>
                        <Hexagon style={{width: 110, height: 110}} />
                        <div onClick={() => props.onClick(letter)} className='letter'>{letter !== props.centreLetter ? letter : <strong>{letter}</strong>}</div>
                    </div>
                )
            }
            <div className={`Comb Comb-centre ${centreLetter}`}>
                <Hexagon style={{width: 110, height: 110}} />
                <div onClick={() => props.onClick(centreLetter)} className='letter'>{centreLetter}</div>
            </div>
        </div>
    )
}

export default HoneyComb