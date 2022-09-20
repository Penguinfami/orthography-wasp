// local storage stuff here


// gameDate

// gameInfo

// 

function sameDay(d1, d2){
    console.log([d1.getMonth(), d1.getDate(), d1.getFullYear()])
    return JSON.stringify([d1.getMonth(), d1.getDate(), d1.getFullYear()]) === JSON.stringify([d2.getMonth(), d2.getDate(), d2.getFullYear()]) 
}

export function dailyAlreadySaved(){
    let today = new Date(Date.now())
    let savedGame = localStorage.getItem("gameInfo")
    console.log(savedGame)
    if (!savedGame) return false
    console.log(JSON.parse(savedGame))
    let savedDate = new Date(JSON.parse(savedGame).gameDate)
    console.log(savedDate)

    if (!savedDate) return false
    console.log(savedDate)
    console.log(today)

    return !(!savedDate || !sameDay(savedDate, today) || sameDay(savedDate, today) && savedDate.getHours() < 8 && today.getHours() > 8 )
}

export function saveDate(){
    let today = Date.now()
    localStorage.setItem("gameDate", today.toLocaleString())
}

export function getSavedGame(){
    let game = localStorage.getItem("gameInfo")
    console.log(game)
    let gameObj = JSON.parse(game)
    return {
        letters: gameObj.letters,
        answersList: gameObj.answersList,
        foundAnswers: gameObj.foundAnswers,
        centreLetter: gameObj.centreLetter,
        geniusScore: gameObj.geniusScore,
        score: gameObj.score,
        date: game.gameDate
    }
}

export function saveGame(gameObj){
    console.log(gameObj)
    let gameStr = JSON.stringify ({
        letters: gameObj.letters,
        answersList: gameObj.answersList,
        foundAnswers: gameObj.foundAnswers,
        centreLetter: gameObj.centreLetter,
        geniusScore: gameObj.geniusScore,
        score: gameObj.score,
        gameDate: gameObj.gameDate ? gameObj.gameDate : Date.now()
    })

    console.log(Date.now())
    console.log(Date.now())

    localStorage.setItem("gameInfo", gameStr)
    console.log("LOCAL STRRG SAVED " + gameStr)
}
