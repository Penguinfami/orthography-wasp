import { useState, useEffect, useReducer } from 'react'

import './App.css';

import Container from './components/Container';
import  Game  from './logic/Game';


import FetchData  from './api/FetchData';

import { dailyAlreadySaved, getSavedGame, saveDate, saveGame} from './logic/Storage'

function App() {

  const [ gameReady, setGameReady ] = useState(false)

  const [ errorMessage, setErrorMessage ] = useState("")
  const [ errorMessageOn, toggleErrorMessage ] = useState(false)

  const [ score, setScore ] = useState(0)

  const game = new Game()

  const saveCurrentGame = () => {
    let gameObj = {
      letters: gameInfo.letters,
      answersList: gameInfo.possibleAnswers,
      foundAnswers: gameInfo.foundAnswers,
      centreLetter: gameInfo.centreLetter,
      geniusScore: gameInfo.geniusScore,
      score: score,
      gameDate: gameInfo.gameDate
    }
    saveGame(gameObj)
  }

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
        console.log("New found answers " + action.payload)
        return {
          ...state,
          foundAnswers: action.payload
        }  

      case "CENTRE_LETTER":
        return {
          ...state,
          centreLetter: action.payload
        }  
      case "DATE":
        return {
          ...state,
          gameDate: action.payload
        }   

      default: return state
    }
  }

  const [ gameInfo, updateGame ] = useReducer(gameReducer, {})

  const fetchData = new FetchData()

  const onEnter = (word) => {
    console.log("word:" + word)
    console.log(game.getScore())
    if (!word) return;
    let result = game.submitAnswer(word, gameInfo)
    if (result.success){
      // check for genius
      console.log([ ...gameInfo.foundAnswers, word])
      updateGame({type: "FOUND_ANSWERS", payload: [ ...gameInfo.foundAnswers, word] })
      setScore(result.payload + score)
      console.log("Valid: " + word)
      saveCurrentGame()
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

  useEffect(()=>{
    if (!gameReady){
      async function getData(){
        let data;
        if (dailyAlreadySaved()){
          data = getSavedGame()
          console.log(" SAVED return is " + data)
          setScore(data.score)
        } else {
          data = await fetchData.extractInfo(); 
          console.log("return is " + data)
        }

        if (!data) {
          setErrorMessage("Fetch data error")
          toggleErrorMessage(true)
          return;
        }

        console.log(game)

        updateGame({ type: "LETTERS", payload: data.letters })
        updateGame({ type: "POSSIBLE_ANSWERS", payload: data.answersList})
        updateGame({ type: "FOUND_ANSWERS", payload: data.foundAnswers ?  data.foundAnswers: []})

        updateGame({ type: "GENIUS_SCORE", payload: data.geniusScore})
        updateGame({ type: "CENTRE_LETTER", payload: data.centreLetter})
        updateGame({ type: "DATE", payload: data.gameDate})

        console.log("done config")
        console.log(data)

        setGameReady(true)
      }
      getData()
    }

  }, [])

  useEffect(()=>{
      if (gameReady)
        saveCurrentGame()
  }, [gameReady, gameInfo.foundAnswers])
  
  return (
    <div className="App">
      {gameReady ?
        <div>
          {gameInfo.geniusScore <= score ? "YOU ARE A GENIUS" : null}
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
