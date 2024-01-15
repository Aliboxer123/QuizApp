import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { contextContainer } from "./QuizContext";
import { shuffle } from "../utility";
import he from 'he';
import axios from "axios";
import '../Questions.css'
import { v4 as uuidv4 } from 'uuid';

export default function Questions() {
  const { questions, setQuestions, answer,
    setAnswer, correctAnswers, setCorrectAnswers, score,
  setScore, errorMsg, setErrorMsg, Change} = useContext(contextContainer)
  const history = useNavigate()
  
  function submit() {
    if (Object.values(answer).length == 5) {
      setErrorMsg(false)
      for (let x in answer) {
        if (correctAnswers.includes(answer[x])) {
       setScore(oldValue => oldValue + 1)
     } 
      }
      history('/score')
    }
    else {setErrorMsg(true)}
  }
  
  function clear(id) {
    const answerCopy = { ...answer }
    delete answerCopy[id]
    setAnswer(answerCopy)
 }
  
  useEffect(() => {
    setScore(0)
    setAnswer({})
    axios.get(`https://opentdb.com/api.php?amount=5`)
      .then(data => {
        const shuffledQuestions = data.data.results.map(item => {
          const combined = [item.correct_answer, ...item.incorrect_answers];
          shuffle(combined);
          return { question: item.question, correct: item.correct_answer, options: combined, id:uuidv4()};
        }); 
        setQuestions(shuffledQuestions)
         const onlyCorrect = shuffledQuestions.map(data => data.correct)
        setCorrectAnswers(onlyCorrect)
      })
  }, [])
  
  const elemQuestion = questions ? questions.map((info, index) => {
    return <div key={index} style={{maxWidth: '100%', display: 'block'}} className="container">
      <h5>{he.decode(info.question)}</h5>
      <p>{info.options.map((data, Optionindex) => {
        return <label className={`mx-2 rounded px-2 py-2 ${answer[info.id] === data && 'checked'}`} key={Optionindex}>
        <input
          type="radio"
          name={info.id}
          value={data}
          checked={answer[info.id] === data}
          onChange={() => Change(info.id, data)}
          className="d-none"  
        />
          {he.decode(data)}
      </label>
      })}</p>
      <button onClick={()=> clear(info.id)} className="btn bg-dark text-light">Clear</button>
      <hr/>
  </div>
  }) : 'Loading'
  return <div>{elemQuestion} <button onClick={submit} className="btn btn-dark">Submit answers</button>
  {errorMsg ? <p className="alert rounded alert-danger p3 mt-2">You need to fill them all out</p> : ''}
  </div>
}