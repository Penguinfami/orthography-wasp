class Game {

    constructor (){
        this.possibleAnswers = []
        this.foundAnswers = []
        this.letters = []
        this.centreLetter = ""
        this.score = 0
        console.log("constructed")
    }

    setup (letters, centreLetter, possibleAnswers, foundAnswers){
        this.possibleAnswers = possibleAnswers
        this.foundAnswers = foundAnswers
        this.letters = letters
        this.centreLetter = centreLetter
        this.score = 0
        console.log(this.foundAnswers)
    }

    isValidAnswer(word){
        return this.possibleAnswers.includes(word)
    }

    containsCorrectLetters(word, lst){
        console.log(lst)
        for (let i = 0; i < word.length; i ++){
            if (!lst.includes(word.charAt(i))) {
                console.log("Doesnt have " + word.charAt(i) + " " + this.letters)
                return false
            }    
        }
        return true
    }

    isPangram(word, letters){
        return (letters.filter((letter) => !word.includes(letter)).length == 0)
    }

    calculateScore(word, letters){
        if ( this.isPangram(word, letters) ) {
            return 7 + word.length
        } else if (word.length == 4) {
            return 1
        }
        return word.length
    }

    getScore(){
        return this.score
    }

    getFoundAnswers(){
        return this.foundAnswers
    }

    submitAnswer(word, info){
        this.setup(info.letters, info.centreLetter, info.possibleAnswers, info.foundAnswers)
        console.log(this.foundAnswers)
        console.log(this.possibleAnswers)

        if (info.foundAnswers.includes(word)){
            return {
                success: false,
                message: "Word already found"               
            }
        }
        if (!this.containsCorrectLetters(word, info.letters)){
            return {
                success: false,
                message: "Invalid letters"
            }           
        } else if (!this.containsCorrectLetters(info.centreLetter, [ ...word ])){
            return {
                success: false,
                message: "Must contain centre letter " + info.centreLetter
            }           
        } else if (word.length < 4){
            return {
                success: false,
                message: "Not enough letters"
            }           
        }
        else if (!this.isValidAnswer(word.toLowerCase())){
            return {
                success: false,
                message: "Invalid word"
            }
        }

        
        return {
            success: true,
            payload: this.calculateScore(word, info.letters)
        }
    }

}

export default Game