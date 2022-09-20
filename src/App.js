import { useState, useEffect, useReducer } from 'react'

import './App.css';

import Container from './components/Container';
import  Game  from './logic/Game';


import FetchData  from './api/FetchData';

function App() {

  const [ gameReady, setGameReady ] = useState(false)

  const [ foundAnswers, setFoundAnswers ] = useState([[]])

  const [ errorMessage, setErrorMessage ] = useState("")
  const [ errorMessageOn, toggleErrorMessage ] = useState(false)

  const [ letters, setLetters ] = useState([])
  const [ centreLetter, setCentreLetter ] = useState("")
  const [ possibleAnswers, setPossibleAnswers ] = useState([])
  const [ geniusScore, setGeniusScore ] = useState(0)
  const [ score, setScore ] = useState(0)

  const game = new Game()

  const gameReducer = (state, action) => {
    switch(action.type){
      case "LETTERS":
        return {
          ...state,
          letters: action.payload
        }
      case "GENIUS_SCORE":
        return {
          ...state,
          geniusScore: action.payload
        }

      case "POSSIBLE_ANSWERS":
        return {
          ...state,
          possibleAnswers: action.payload
        }

      case "FOUND_ANSWERS":
        return {
          ...state,
          foundAnswers: action.payload
        }  

      case "CENTRE_LETTER":
        return {
          ...state,
          centreLetter: action.payload
        }  
  

      default: return state
    }
  }

  const [ gameInfo, updateGame ] = useReducer(gameReducer, {})

  const fetchData = new FetchData()

  useEffect(()=>{
    if (!gameReady){
      async function getData(){
        let data = await fetchData.extractInfo(); 
        console.log("return is " + data)
        if (data == null) {
          setErrorMessage("Fetch data error")
          toggleErrorMessage(true)
        }

        console.log(game)


        updateGame({ type: "LETTERS", payload: data.letters })
        updateGame({ type: "POSSIBLE_ANSWERS", payload: data.answersList})

        updateGame({ type: "FOUND_ANSWERS", payload: []})
        updateGame({ type: "GENIUS_SCORE", payload: data.geniusScore})
        updateGame({ type: "CENTRE_LETTER", payload: data.centreLetter})

        console.log("done config")
        console.log(data)
        setGameReady(true)
      }
      getData()
    }
  }, [])

  useEffect(()=>{
    if (score >= gameInfo.geniusScore){
      toggleErrorMessage(true)
      setErrorMessage("YOU ARE A GENIUS")
    }
  }, [score])
  
  const onEnter = (word) => {
    console.log("word:" + word)
    console.log(game.getScore())
    if (!word) return;
    let result = game.submitAnswer(word, gameInfo)
    if (result.success){
      // check for genius
      updateGame({type: "FOUND_ANSWERS", payload: [ ...gameInfo.foundAnswers , word] })

      setScore(result.payload + score)
      console.log("Valid: " + word)

    } else {
      console.log("Invalid: " + word + " " + result.message)
      setErrorMessage(result.message)
      toggleErrorMessage(true)
      setTimeout(()=>{
        toggleErrorMessage(false)
      }, 3000)
    }

    return result.success
  }



  return (
    <div className="App">
      {gameReady ?
        <div>
            <div>Score: {  score }</div>
            <div>Genius Score: {  gameInfo.geniusScore }</div>
            <div>{ errorMessageOn ? errorMessage : " " }</div>  

                <Container letters={gameInfo.letters} centreLetter={gameInfo.centreLetter} onEnter={onEnter} foundWords={gameInfo.foundAnswers}/>
        
        </div>


        : "<game not ready..."
      }
    </div>
  );
}

export default App;
