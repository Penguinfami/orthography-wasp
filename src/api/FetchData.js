import axios from 'axios'
import DOMConverter from './DOMConverter';

class FetchData {

    constructor(){

    }
    
     async scraper () {
        let url = ""
        try {
            let api = require('./api.json')
            url = api.url
        } catch (e){
            console.log("Env url")
            url = process.env.REACT_APP_API_URL
            console.log(url)
        }

        console.log(url)

        let response = await axios.get(url)
        //.then(response => {
           // console.log(response.data)
            return response.data;
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
            const alpha = new RegExp("[a-z]+")
            answersList = answersList.map((ans) => alpha.exec(ans)[0]).filter(s => s)
            console.log(answersList)
            let letters = answersList.reduce((total, current) => {
                for (let i = 0; i < current.length; i++){
                    if (!total.includes(current[i]) && alpha.test(current[i])) total.push(current[i])
                }
                return total
            }, [])

            console.log("letters are " + letters)
        
            let geniusText = dom.getElementByInnerText("Points Needed for Genius:").innerText.trim().split(" ")

            console.log("Genius text " + geniusText)
            let geniusScore = parseInt(geniusText[geniusText.length - 1])
        
            // this is dumb but idk what else to do
            let centreLetter = letters.filter((letter) => answersList.filter((answer) => !answer.includes(letter)).length === 0)[0]
           
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