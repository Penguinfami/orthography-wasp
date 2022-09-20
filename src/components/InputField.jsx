import { useRef } from 'react'

const InputField = (props) => {

    const onChange = (e) =>{
        console.log("changing" + e.target.value)
        props.setInput(
            {
                type: "CHANGE",
                payload: e.target.value
            }
        )
    }

    return (
        <div className="InputField">
            <input onChange={onChange}></input>
        </div>
    )
}

export default InputField