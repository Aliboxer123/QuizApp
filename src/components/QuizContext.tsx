import { createContext, useState } from "react";

export const contextContainer = createContext()
export default function QuizContext({ children }) {
  function Change(info, data) {
      setAnswer(prev => {
        return { ...prev, [info]: data }
      })
  }
  const [questions, setQuestions] = useState([])
  const [answer, setAnswer] = useState({})
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [errorMsg, setErrorMsg] = useState(false)

    return <contextContainer.Provider value={{
         questions, setQuestions,
        answer, setAnswer,
        correctAnswers, setCorrectAnswers,
        score, setScore,
      errorMsg, setErrorMsg,
        Change
    }}>{children}</contextContainer.Provider>
} 