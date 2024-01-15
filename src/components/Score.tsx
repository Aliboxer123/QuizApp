import { useContext } from "react"
import { Link } from "react-router-dom"
import { contextContainer } from "./QuizContext"
import he from 'he'
export default function Score() {
    const { score, answer, correctAnswers, questions } = useContext(contextContainer)
    const answers = Object.values(answer)
    const correction = questions.map((info, index) => {
        return <div key={index} className="container"><h5>{he.decode(info.question)}</h5>
            {info.options.map((data, index) => {
                return <><label key={index} className={`${correctAnswers.includes(data) && answers.includes(data) ? 'bg-primary text-light' : 
                correctAnswers.includes(data) ? 'bg-success text-light' : answers.includes(data) ? 'bg-danger text-light': ''}
                 mx-2 rounded px-2 py-2`}
                >{he.decode(data)}</label>{correctAnswers.includes(data) && answers.includes(data) && <span>✔️</span>}</>
            })} 
            <hr/>
        </div>   
    })

    let result
    if (score == 0) {
        result = <div className="d-flex flex-column align-items-center vh-100 mt-5">
        <h1 className="text-center">Unfortunately,🤔 You got {score} out of 5. Time to brush up your knowledge!</h1>
            <img className="img-fluid w-90 rounded d-block mb-4" alt="celebrating gif" src='./src/images/sad gif.gif' />
            {correction}    
            <Link to={'/'} className="btn btn-primary">Go back home</Link>
        </div>   
    }
    else if (score == 5) {
        return <div className="d-flex flex-column align-items-center vh-100 mt-5">
        <h1 className="text-center">You got {score} out of 5! This is exceptional work! You are quite smart</h1> 
            <img className="img-fluid w-70 rounded mb-4" alt="Celebration gif" src='./src/images/Office celebration.gif' />
            {correction}
         <Link to={'/'} className="btn btn-primary">Go back home</Link>    
        </div>     
    }
    else {
        return <div className="d-flex flex-column  vh-100 mt-5">
            <h1 className="text-center">You got {score} out of 5!</h1>
            {correction}
             <Link to={'/'} className="btn btn-primary">Go back home</Link>
        </div>    
    }
return result   
}