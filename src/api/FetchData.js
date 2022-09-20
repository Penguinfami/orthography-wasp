import axios from 'axios'
import DOMConverter from './DOMConverter';

class FetchData {

    constructor(){

    }
    
     async scraper () {
        let url = process.env.API_URL
        
        console.log(url)
        let response = await axios.get(url)
        //.then(response => {
           // console.log(response.data)
           if (response.status === 200)
            return response.data;
        console.log("Error status scraper")
        //})
        /*.catch(error => {
            console.log(error);
        });   */
        console.log("scraper end")
    } 
    
    async extractInfo() {
        let dom = new DOMConverter();
        let data = await this.scraper()
            console.log("done scraping " + typeof(data) + data)
            dom.parse(data)
            let answersListElement = dom.getElementById("main-answer-list")
            console.log(answersListElement)
            let answersList = dom.getListByInnerText("", answersListElement.childNodes[1].childNodes)
            answersList = answersList.map((ans) => ans.trim())
            console.log(answersList)
            let letters = answersList.reduce((total, current) => {
                for (let i = 0; i < current.length; i++){
                    console.log(current[i])
                    if (!total.includes(current[i])) total.push(current[i])
                }
                return total
            }, [])

            console.log("letters are " + letters)
        
            let geniusText = dom.getElementByInnerText("Points Needed for Genius:").innerText.trim().split(" ")

            console.log("Genius text " + geniusText)
            let geniusScore = parseInt(geniusText[geniusText.length - 1])
        
            // this is dumb but idk what else to do
            let centreLetter = letters.filter((letter) => answersList.filter((answer) => !answer.includes(letter)).length == 0)[0]
           
            return {
                letters: letters,
                geniusScore: geniusScore,
                answersList: answersList,
                centreLetter: centreLetter
            }
        /** }).catch( err => null)     
        return {
            letters: ["b", "l", "o", "w", "i", "n", "g"],
            geniusScore: 146,
            answersList: ["blow", "bowl", "blowing"],
            centreLetter: "w"
        }**/
    }
}


export default FetchData;